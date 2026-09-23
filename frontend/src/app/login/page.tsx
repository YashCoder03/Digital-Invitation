"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/site/SiteHeader";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/lib/api/client";

export default function LoginPage() {
  const { language } = useLanguage();
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      await login(email, password);
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
          {language === "mr" ? "पुन्हा स्वागत आहे" : "Welcome back"}
        </h1>
        <p className="mt-2 text-center font-body text-sm text-foreground/60">
          {language === "mr"
            ? "आपल्या आमंत्रणांमध्ये प्रवेश करण्यासाठी लॉगिन करा."
            : "Log in to manage your invitations."}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gold/30 bg-cream px-4 py-2.5 font-body text-foreground focus:border-wine focus:outline-none"
            />
          </div>

          {error && <p className="font-body text-sm text-red">{error}</p>}

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-2 rounded-full bg-wine px-6 py-3 font-body text-sm uppercase tracking-widest text-cream transition-colors hover:bg-wine/90 disabled:opacity-70"
          >
            {status === "loading" ? "Logging in…" : language === "mr" ? "लॉगिन" : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center font-body text-sm text-foreground/60">
          {language === "mr" ? "खाते नाही? " : "Don't have an account? "}
          <Link href="/register" className="text-wine underline">
            {language === "mr" ? "खाते तयार करा" : "Create an account"}
          </Link>
        </p>
      </section>
    </div>
  );
}
