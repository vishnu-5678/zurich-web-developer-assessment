'use client';

import { signOut } from 'next-auth/react';

export function Header({ title, userName = 'Customer' }: { title: string; userName?: string }) {
  return (
    <header className="header">
      <div>
        <strong>{title}</strong>
        <span className="header-user">{userName}</span>
      </div>
      <button className="secondary-button" onClick={() => signOut({ callbackUrl: '/login' })}>
        Sign out
      </button>
    </header>
  );
}
