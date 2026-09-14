import type { User } from '@/features/users/types';
import { fetchAllUsers } from './reqres';

export function matchesAssessmentFilter(user: Pick<User, 'first_name' | 'last_name'>) {
  const firstName = user.first_name.trim().toLocaleLowerCase();
  const lastName = user.last_name.trim().toLocaleLowerCase();
  return firstName.startsWith('g') || lastName.startsWith('w');
}

export async function getFilteredUsers(): Promise<User[]> {
  const users = await fetchAllUsers();
  return users.filter(matchesAssessmentFilter);
}

export async function getUserEmail(id: string): Promise<string | null> {
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId < 1) return null;
  const users = await fetchAllUsers();
  return users.find((user) => user.id === numericId)?.email ?? null;
}
