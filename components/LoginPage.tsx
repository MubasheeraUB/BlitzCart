import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client"; // adjust if needed
import "./LoginPage.css";

export interface LoginPayload {
  identifier: string;
  password: string;
  remember: boolean;
}

interface LoginPageProps {
  /** Called on submit. Return a promise to show the loading state until it settles. */
  onLogin?: (data: LoginPayload) => Promise<void> | void;
  onGoogle?: () => void;
  onApple?: () => void;
  /* Time of the next flash drop. Defaults to 2h 14m 37s from mount. */
  nextDropAt?: Date;
  forgotHref?: string;
  signupHref?: string;
  termsHref?: string;
  privacyHref?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

function useCountdown(target: Date | null) {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (!target) return;

    const update = () => {
      setLeft(Math.max(0, Math.floor((target.getTime() - Date.now()) / 1000)));
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [target]);

  return {
    hh: pad(Math.floor(left / 3600)),
    mm: pad(Math.floor((left % 3600) / 60)),
    ss: pad(left % 60),
  };
}

const BoltIcon = ({
  size = 16,
  color = "#0A1A44",
}: {
  size?: number;
  color?: string;
}) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M13 2 L4 14 H11 L10 22 L20 9 H13 Z" fill={color} />
  </svg>
);

const CheckIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="#FFC21A"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M7.5 12.5l3 3 6-6.5" />
  </svg>
);

const EyeIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3l18 18" />
      <path d="M10.6 5.1A9.8 9.8 0 0 1 12 5c6 0 10 7 10 7a17 17 0 0 1-3.2 3.9M6.6 6.6C3.9 8.4 2 12 2 12s4 7 10 7a9.6 9.6 0 0 0 5.4-1.6" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  ) : (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

const GoogleIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
    <path
      d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z"
      fill="#4285F4"
    />
    <path
      d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z"
      fill="#34A853"
    />
    <path
      d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 0 0 0 9.2L6.4 14z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.4L6.4 10c.8-2.3 3-4.1 5.6-4.1z"
      fill="#EA4335"
    />
  </svg>
);

const AppleIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="#0A1A44"
  >
    <path d="M16.4 12.6c0-2.4 2-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.9-.9-3.1-.8a4.6 4.6 0 0 0-3.9 2.4c-1.7 2.9-.4 7.2 1.2 9.5.8 1.1 1.7 2.4 2.9 2.4 1.2-.1 1.6-.8 3-.8s1.8.8 3.1.8 2-1.2 2.8-2.3a10 10 0 0 0 1.3-2.6c-.1 0-2.4-.9-2.4-4.1zM14.1 5.6c.6-.8 1.1-1.8 1-2.9-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-1 2.8 1 .1 2-.5 2.7-1.3z" />
  </svg>
);

const BENEFITS = [
  "Early access alerts for flash drops",
  "Saved addresses for one-tap checkout",
  "Track orders and returns in one place",
];

export default function LoginPage({
  onLogin,
  onGoogle,
  onApple,
  nextDropAt,
  forgotHref = "/forgot-password",
  signupHref = "/register",
  termsHref = "/terms",
  privacyHref = "/privacy",
}: LoginPageProps) {
  const [target, setTarget] = useState<Date | null>(nextDropAt ?? null);

  const [currentYear, setCurrentYear] = useState(2024);

  useEffect(() => {
    if (!target) {
      setTarget(new Date(Date.now() + (2 * 3600 + 14 * 60 + 37) * 1000));
    }
    setCurrentYear(new Date().getFullYear());
  }, [target]);

  const { hh, mm, ss } = useCountdown(target);
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setBusy(true);

    try {
      const { error } = await authClient.signIn.email({
        email: identifier,
        password,
      });

      if (error) {
        setError(error.message ?? "Sign in failed.");
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="bc-login">
      {/* Brand panel */}
      <section className="bc-brand">
        <div className="bc-brand__lines" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <svg
          className="bc-brand__bolt"
          aria-hidden="true"
          viewBox="0 0 100 160"
        >
          <path d="M62 0 L8 92 H46 L34 160 L92 62 H54 Z" fill="#FFC21A" />
        </svg>
        <div className="bc-brand__top">
          <span className="bc-pill">
            <BoltIcon /> Flash drop is live
          </span>
        </div>
        <div className="bc-brand__body">
          <h1 className="bc-brand__title">
            Deals that
            <br />
            <span>don’t wait.</span>
          </h1>
          <p className="bc-brand__lead">
            Sign in to grab limited-time drops before they’re gone. Your cart,
            wishlist and alerts — ready the second a sale starts.
          </p>
          <div className="bc-countdown">
            <span className="bc-countdown__label">Next drop starts in</span>
            <div
              className="bc-countdown__row"
              role="timer"
              aria-label="Countdown to next drop"
            >
              <div className="bc-countdown__box">
                <strong>{hh}</strong>
                <small>hours</small>
              </div>
              <span className="bc-countdown__sep" aria-hidden="true">
                :
              </span>
              <div className="bc-countdown__box">
                <strong>{mm}</strong>
                <small>minutes</small>
              </div>
              <span className="bc-countdown__sep" aria-hidden="true">
                :
              </span>
              <div className="bc-countdown__box bc-countdown__box--accent">
                <strong>{ss}</strong>
                <small>seconds</small>
              </div>
            </div>
          </div>
          <ul className="bc-benefits">
            {BENEFITS.map((b) => (
              <li key={b}>
                <CheckIcon /> {b}
              </li>
            ))}
          </ul>
        </div>
        <p className="bc-brand__foot">
          {currentYear} BlitzCart. All rights reserved.
        </p>
      </section>

      {/* Form panel */}
      <main className="bc-form-panel">
        <div className="bc-form-wrap">
          <img
            className="bc-logo"
            src="/images/blitzcart-logo.png"
            alt="BlitzCart — Deals That Don’t Wait"
          />
          <div className="bc-heading">
            <h2>Welcome back</h2>
            <p>Sign in to your account to keep shopping.</p>
          </div>
          <form className="bc-form" onSubmit={handleSubmit} noValidate>
            <div className="bc-field">
              <label htmlFor="bc-email">Email or mobile number</label>
              <input
                id="bc-email"
                type="text"
                autoComplete="username"
                placeholder="you@example.com"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
            <div className="bc-field">
              <div className="bc-field__row">
                <label htmlFor="bc-pass">Password</label>
                <a href={forgotHref} className="bc-link">
                  Forgot password?
                </a>
              </div>
              <div className="bc-input-wrap">
                <input
                  id="bc-pass"
                  type={showPw ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="bc-eye"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  <EyeIcon open={showPw} />
                </button>
              </div>
            </div>
            <label className="bc-check">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Keep me signed in
            </label>
            {error && (
              <p className="bc-error" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="bc-submit" disabled={busy}>
              {busy ? (
                "Signing in…"
              ) : (
                <>
                  Sign in <BoltIcon size={18} color="#FFC21A" />
                </>
              )}
            </button>
          </form>
          <div className="bc-divider">
            <span />
            or continue with
            <span />
          </div>
          <div className="bc-social">
            <button type="button" onClick={onGoogle}>
              <GoogleIcon /> Google
            </button>
            <button type="button" onClick={onApple}>
              <AppleIcon /> Apple
            </button>
          </div>
          <p className="bc-signup">
            New to BlitzCart?{" "}
            <a href={signupHref} className="bc-link bc-link--bold">
              Create an account
            </a>
          </p>
          <p className="bc-legal">
            By continuing, you agree to our{" "}
            <a href={termsHref} className="bc-link">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href={privacyHref} className="bc-link">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
