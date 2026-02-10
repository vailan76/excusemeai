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

export default function DashboardPage() {
  // Mock user data. In a real application, this would be fetched for the logged-in user.
  const user = {
    email: 'user@example.com',
    plan: 'FREE',
    dailyUsage: 2,
  };

  const isPremium = user.plan === 'PREMIUM';

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
                {user.plan}
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
                {isPremium ? 'Unlimited' : `${user.dailyUsage} / 5`}
              </p>
            </div>
            {!isPremium && (
              <div className="text-center text-sm text-muted-foreground">Resets daily.</div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Button variant="ghost">Log Out</Button>
      </div>
    </div>
  );
}
