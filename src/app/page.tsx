import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex h-full flex-1 flex-col items-center justify-center text-white">
      <div className="flex w-full flex-col items-center gap-8 md:flex-row md:justify-between">
        <div className="flex max-w-2xl flex-col gap-6">
          <h1 className="flex flex-col text-4xl font-bold md:text-5xl lg:text-6xl">
            <span>Effortless Tracking</span>
            <span className="text-blue-600">Clear Insights</span>
          </h1>
          <p className="text-lg text-gray-300 md:text-xl max-w-[60ch]">
            Simplify your tracking journey with a user-friendly platform that transforms your data into meaningful charts. No technical skills or spreadsheets required.
          </p>
          <div className="flex">
            <Button>
              Start Tracking Now
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
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
    </main>
  );
}
