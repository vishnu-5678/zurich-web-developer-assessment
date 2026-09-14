import { LoginButton } from '@/features/auth/LoginButton';

export default function LoginPage() {
  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="login-title">
        <div className="brand-mark" aria-hidden="true">Z</div>
        <p className="eyebrow">Customer Portal</p>
        <h1 id="login-title">Sign in to Zurich</h1>
        <p className="muted">Use your Google account to securely access the customer portal.</p>
        <LoginButton />
      </section>
    </main>
  );
}
