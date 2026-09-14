import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    error: '/login',
  },
} satisfies Omit<NextAuthConfig, 'providers'>;