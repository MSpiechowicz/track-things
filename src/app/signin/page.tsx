import { LoginForm } from "@/components/auth/LoginForm";

export default function SignInPage() {
  return (
    <div className="w-full max-w-md text-black">
      <div className="rounded-xl border bg-white p-8 shadow-lg">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Welcome!</h2>
            <p className="text-muted-foreground">
              To continue using the service, please sign in using your existing account.
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
