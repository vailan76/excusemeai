import AuthForm from '@/components/auth/auth-form';

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-57px)] items-center justify-center p-4">
      <AuthForm mode="login" />
    </div>
  );
}
