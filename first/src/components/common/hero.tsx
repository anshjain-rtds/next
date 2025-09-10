/* eslint-disable @typescript-eslint/no-unused-vars */
import type { StaticImageData } from "next/image";
// import Image from "next/image";
import React from "react";
import Link from "next/link";

interface HeroProps {
  imgData: StaticImageData;
  imgAlt: string;
  title: string;
}

function Hero({ imgData, imgAlt, title }: HeroProps) {
  return (
    <section className="relative flex items-center justify-center min-h-[60vh] md:min-h-[80vh] w-full overflow-hidden">
      {/* Background Image with overlay */}
      {/* <div className="absolute inset-0 z-0">
        <Image
          src={imgData}
          alt={imgAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
      </div> */}
      
      {/* Hero Content */}
      <div className="relative  text-center px-6 w-full">
        <h1 className="text-foreground text-5xl sm:text-6xl md:text-7xl font-extrabold drop-shadow-lg">
          {title}
        </h1>
        <p className="mt-6 text-muted-foreground text-lg sm:text-xl max-w-xl mx-auto drop-shadow-sm">
          Craft, share, and manage your snippets with ease.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/snippets/new"
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Started
          </Link>
          <Link
            href="/snippets/all-snips"
            className="px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            View Snippets
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;