"use client";

import { ClientOnly } from "@/components/ClientOnly";
import { Button } from "@/components/ui/button";
import { isUserLoggedIn } from "@/utils/supabase/user";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <ClientOnly>
      <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-8 md:flex-row md:justify-between">
        <div className="flex max-w-2xl flex-col gap-6">
          <h1 className="flex flex-col text-4xl font-bold md:text-5xl lg:text-6xl">
            <span>Effortless Tracking</span>
            <span className="text-blue-600">Clear Insights</span>
          </h1>
          <p className="max-w-[60ch] text-lg text-gray-300 md:text-xl">
            Simplify your tracking journey with a user-friendly platform that transforms your data
            into meaningful charts. No technical skills or spreadsheets required.
          </p>
          <div className="flex">
            <Button
              onClick={async () =>
                (await isUserLoggedIn()) ? router.push("/dashboard") : router.push("/signin")
              }
            >
              Start Tracking Now
            </Button>
          </div>
        </div>
        <div className="hidden items-center justify-center md:flex">
          <Image
            src="/hero-chart.svg"
            alt="Hero Chart"
            width={612}
            height={368}
            priority
            className="h-auto w-[300px] md:w-[450px] xl:w-[612px]"
          />
        </div>
      </div>
    </ClientOnly>
  );
}
