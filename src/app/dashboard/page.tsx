'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useUser, useAuth, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  const userDocRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userData, isLoading: isUserDataLoading } = useDoc(userDocRef);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.assign('/login');
  };

  if (isUserLoading || isUserDataLoading || !user) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="mt-2 h-5 w-1/2" />
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const isPremium = userData?.plan === 'PREMIUM';

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tighter">Dashboard</h1>
        <p className="text-muted-foreground">Manage your account and subscription.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Status</CardTitle>
            <CardDescription>Your current plan details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">Current Plan</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <Badge
                variant={isPremium ? 'default' : 'secondary'}
                className={isPremium ? 'bg-accent text-accent-foreground' : ''}
              >
                {userData?.plan}
              </Badge>
            </div>
            {!isPremium && (
              <Button asChild className="w-full">
                <Link href="/pricing">Upgrade to Premium</Link>
              </Button>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Usage</CardTitle>
            <CardDescription>Your daily excuse generation count.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <p className="font-medium">Today's Usage</p>
              <p className="font-mono text-lg font-semibold">
                {isPremium ? 'Unlimited' : `${userData?.dailyUsage ?? 0} / 5`}
              </p>
            </div>
            {!isPremium && (
              <div className="text-center text-sm text-muted-foreground">Resets daily.</div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Button variant="ghost" onClick={handleLogout}>Log Out</Button>
      </div>
    </div>
  );
}
