import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="unauthorized-title">
        <p className="eyebrow">Access denied</p>
        <h1 id="unauthorized-title">You must be signed in</h1>
        <p className="muted">Your session is missing or has expired. Please sign in to continue.</p>
        <Link className="primary-button" href="/login">Go to sign in</Link>
      </section>
    </main>
  );
}
