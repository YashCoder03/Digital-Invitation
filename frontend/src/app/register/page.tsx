"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/site/SiteHeader";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/lib/api/client";

export default function RegisterPage() {
  const { language } = useLanguage();
  const { register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setStatus("error");
      setError(language === "mr" ? "पासवर्ड जुळत नाहीत." : "Passwords do not match.");
      return;
    }

    setStatus("loading");
    try {
      await register(name, email, password);
      router.push("/dashboard");
    } catch (err) {
      setStatus("error");
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="flex flex-1 flex-col bg-ivory">
      <SiteHeader />

      <section className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-6 py-20">
        <h1 className="text-center font-serif text-3xl text-wine">
          {language === "mr" ? "खाते तयार करा" : "Create your account"}
        </h1>
        <p className="mt-2 text-center font-body text-sm text-foreground/60">
          {language === "mr"
            ? "आपले सुंदर आमंत्रण तयार करण्यास सुरुवात करा."
            : "Start creating your beautiful invitation."}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div>
            <label className="mb-1 block font-body text-sm text-foreground/70">
              {language === "mr" ? "नाव" : "Name"}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gold/30 bg-cream px-4 py-2.5 font-body text-foreground focus:border-wine focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block font-body text-sm text-foreground/70">
              {language === "mr" ? "ईमेल" : "Email"}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gold/30 bg-cream px-4 py-2.5 font-body text-foreground focus:border-wine focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block font-body text-sm text-foreground/70">
              {language === "mr" ? "पासवर्ड" : "Password"}
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gold/30 bg-cream px-4 py-2.5 font-body text-foreground focus:border-wine focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block font-body text-sm text-foreground/70">
              {language === "mr" ? "पासवर्डची पुष्टी करा" : "Confirm Password"}
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-md border border-gold/30 bg-cream px-4 py-2.5 font-body text-foreground focus:border-wine focus:outline-none"
            />
          </div>

          {error && <p className="font-body text-sm text-red">{error}</p>}

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-2 rounded-full bg-wine px-6 py-3 font-body text-sm uppercase tracking-widest text-cream transition-colors hover:bg-wine/90 disabled:opacity-70"
          >
            {status === "loading" ? "Creating account…" : language === "mr" ? "खाते तयार करा" : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center font-body text-sm text-foreground/60">
          {language === "mr" ? "आधीपासून खाते आहे? " : "Already have an account? "}
          <Link href="/login" className="text-wine underline">
            {language === "mr" ? "लॉगिन" : "Log in"}
          </Link>
        </p>
      </section>
    </div>
  );
}
