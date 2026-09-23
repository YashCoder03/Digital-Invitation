package com.shubhinvite.auth.service;

import com.shubhinvite.auth.dto.AuthResponse;
import com.shubhinvite.auth.dto.LoginRequest;
import com.shubhinvite.auth.dto.RegisterRequest;
import com.shubhinvite.auth.dto.UserSummary;
import com.shubhinvite.common.exception.DuplicateResourceException;
import com.shubhinvite.common.exception.UnauthorizedException;
import com.shubhinvite.security.JwtService;
import com.shubhinvite.user.entity.User;
import com.shubhinvite.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String email = request.email().trim().toLowerCase();

        if (userRepository.existsByEmail(email)) {
            throw new DuplicateResourceException("An account with this email already exists");
        }

        User user = new User();
        user.setName(request.name().trim());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(request.password()));
        user = userRepository.save(user);

        String token = jwtService.generateToken(user.getId(), user.getEmail());
        return new AuthResponse(token, UserSummary.from(user));
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        String email = request.email().trim().toLowerCase();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new UnauthorizedException("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getId(), user.getEmail());
        return new AuthResponse(token, UserSummary.from(user));
    }
}
