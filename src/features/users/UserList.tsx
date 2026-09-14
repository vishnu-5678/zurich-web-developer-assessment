'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { fetchUsers } from './usersSlice';
import type { User } from './types';

function maskEmail(email: string) {
  const [local, domain] = email.split('@');
  if (!local || !domain) return '••••••••';
  const visible = local.slice(0, 2);
  return `${visible}${'•'.repeat(Math.max(4, local.length - visible.length))}@${domain}`;
}

function UserRow({ user }: { user: User }) {
  const [revealed, setRevealed] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReveal = async () => {
    if (revealed || email) {
      setRevealed((value) => !value);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/users/${user.id}/email`);
      if (!response.ok) throw new Error('Unable to reveal email');
      const payload: { email: string } = await response.json();
      setEmail(payload.email);
      setRevealed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <li className="user-row">
      <div className="user-avatar" aria-hidden="true">{user.first_name[0]}{user.last_name[0]}</div>
      <div className="user-details">
        <strong>{user.first_name} {user.last_name}</strong>
        <span>{revealed && email ? email : maskEmail(user.email)}</span>
      </div>
      <button className="link-button" onClick={handleReveal} disabled={loading} aria-label={`${revealed ? 'Hide' : 'Show'} email for ${user.first_name} ${user.last_name}`}>
        {loading ? 'Loading…' : revealed ? 'Hide email' : 'Show email'}
      </button>
    </li>
  );
}

export function UserList() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchUsers());
  }, [dispatch, status]);

  if (status === 'loading') return <div className="panel" role="status">Loading users…</div>;
  if (status === 'failed') return <div className="panel error" role="alert">{error}</div>;
  if (!items.length) return <div className="panel">No matching users found.</div>;

  return (
    <section className="panel" aria-label="Filtered users">
      <ul className="user-list">
        {items.map((user) => <UserRow key={user.id} user={user} />)}
      </ul>
    </section>
  );
}
