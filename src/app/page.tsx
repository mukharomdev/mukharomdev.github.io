import Image from "next/image";
import Link from 'next/link';
import { List } from "flowbite-react";
import { TiArrowRightOutline } from "react-icons/ti";
import Emoji from "react-emoji-render";
import {
  DateLocal
} from '@/lib'

export default function Home() {
  const date = DateLocal() 
 
  return (
    <>
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] mt-4">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start  ">
        {/* link blog dan portfolio */}
        <div id="linkblog" className="text-center md:text-center">
        <h1 className="text-lime-700" >{date.toString()}</h1>
        <Image
          className="dark:invert rounded-full border-4 border-blue-500 "
          src="/authors/mukharomdev.png"
          alt="picture "
          width={350}
          height={350}
          priority
        />
        
        <h1 className="text-4xl antialiased text-lime-700 space-y-4 mt-4 mb-10">
        <Emoji> with ❤️ Mukharomdev 🚀🚀 </Emoji>
        </h1>
        <List className="text-4xl underline antialiased text-lime-700 space-y-4">
          <List.Item icon={TiArrowRightOutline}>
            <Link href="/blog">Blog</Link>
          </List.Item>
          <List.Item icon={TiArrowRightOutline}>
            <Link href="/portfolio">Portfolio</Link>
          </List.Item>
          <List.Item icon={TiArrowRightOutline}>
            <Link href="/about">About</Link>
          </List.Item>
          <List.Item icon={TiArrowRightOutline}>
            <Link href="/apps">Apps</Link>
          </List.Item>
        </List>

        </div>
         {/* endline link blog dan portfolio */}

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-lime-700">
      <p>&copy; 2025 Mukharomdev. All rights reserved.</p>
      </footer>
    </div>
    </>
  );
}
