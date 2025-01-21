"use client";

import { useRouter } from "next/navigation";

interface LoginDialogProps {
  trigger: React.ReactNode;
}

export function LoginDialog({ trigger }: LoginDialogProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/signin");
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {trigger}
    </div>
  );
}
