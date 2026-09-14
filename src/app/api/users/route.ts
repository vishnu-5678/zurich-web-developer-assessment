import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getFilteredUsers } from '@/services/users';

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const users = await getFilteredUsers();
    return NextResponse.json({ users });
  } catch {
    return NextResponse.json({ message: 'Unable to load users' }, { status: 502 });
  }
}
