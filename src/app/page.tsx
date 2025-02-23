import Image from "next/image";

// import {
//   DateLocal
// } from '@/utils'

export default function Home() {
  const date = new Date()  
  const dates = date.toString()
  return (
    <>
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert rounded"
          src="/mukharomdev.png"
          alt="picture "
          width={180}
          height={120}
          priority
        />
        <ul>
          <li className="text-4xl antialiased text-rose-700">Blog</li>
          <li className="text-4xl antialiased text-rose-700">Portfolio</li>
        </ul>

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <h1 className="text-rose-700">{dates}</h1>
      </footer>
    </div>
    </>
  );
}
