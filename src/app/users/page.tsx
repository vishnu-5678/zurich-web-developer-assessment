import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { UserList } from '@/features/users/UserList';

export default async function UsersPage() {
  const session = await auth();

  if (!session) {
    redirect('/unauthorized');
  }

  return (
    <div className="shell">
      <Header title="Customer Portal" userName={session.user?.name ?? undefined} />
      <main className="content" aria-labelledby="users-title">
        <div className="content-heading">
          <div>
            <p className="eyebrow">Secure directory</p>
            <h1 id="users-title">Users</h1>
            <p className="muted">Showing users whose first name starts with G or last name starts with W.</p>
          </div>
        </div>
        <UserList />
      </main>
      <Footer text="Zurich Customer Portal" />
    </div>
  );
}
