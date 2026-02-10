'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function UserNav() {
  // This is a placeholder for auth state.
  // In a full implementation, this would use a hook like `useAuth()`
  // to get the current user and display a dropdown menu with dashboard/logout links.
  const user = null;

  if (user) {
    return <div>User Menu</div>;
  }

  return (
    <div className="flex items-center gap-2">
      <Button asChild variant="ghost">
        <Link href="/login">Log In</Link>
      </Button>
      <Button asChild>
        <Link href="/signup">Sign Up</Link>
      </Button>
    </div>
  );
}
