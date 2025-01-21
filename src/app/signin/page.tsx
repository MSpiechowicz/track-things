import { LoginForm } from "@/components/auth/LoginForm";

export default function SignInPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-0 md:px-4">
      <div className="w-full max-w-md py-14 sm:py-0">
        <div className="rounded-none sm:rounded-xl border bg-white shadow-lg p-8">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <h2 className="text-2xl font-bold tracking-tight">Welcome!</h2>
              <p className="text-sm text-muted-foreground">
                Sign in to your account to continue
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
