'use client';

import { signIn } from 'next-auth/react';

export function LoginButton() {
  return (
    <button className="google-button" onClick={() => signIn('google', { callbackUrl: '/users' })}>
      Continue with Google
    </button>
  );
}
