import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex min-h-[calc(100%-168px)] flex-col items-center justify-center text-white">
      <Image
        src="/coming-soon.svg"
        alt="Coming Soon"
        width={612}
        height={368}
        priority
        className="h-auto w-[300px] md:w-[450px] xl:w-[612px]"
      />
    </main>
  );
}
