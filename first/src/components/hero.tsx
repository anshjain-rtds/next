import type { StaticImageData } from "next/image";
import Image from "next/image";
import React from "react";
import Link from "next/link";
interface HeroProps {
  imgData: StaticImageData;
  imgAlt: string;
  title: string;
}

function Hero({ imgData, imgAlt, title }: HeroProps) {
  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={imgData}
          alt={imgAlt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="text-center px-6">
        <h1 className="text-white text-5xl sm:text-6xl md:text-7xl font-extrabold drop-shadow-lg">
          {title}
        </h1>
        <p className="mt-6 text-gray-300 text-lg sm:text-xl max-w-xl mx-auto">
          Craft, share, and manage your snippets with ease.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/snippets/new"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition shadow-md"
          >
            Get Started
          </Link>
          <Link
            href="/snippets/all-snips"
            className="px-6 py-3 rounded-xl bg-gray-800 text-gray-200 font-semibold hover:bg-gray-700 transition shadow-md"
          >
            View Snippets
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
