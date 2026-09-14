import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getUserEmail } from '@/services/users';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const email = await getUserEmail(id);
    if (!email) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ email });
  } catch {
    return NextResponse.json({ message: 'Unable to load email' }, { status: 502 });
  }
}
