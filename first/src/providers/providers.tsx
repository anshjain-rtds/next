"use client";
import { HeroUIProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";
import { CustomSessionProvider } from "@/components/SessionProvider";
import { CustomSession } from "@/lib/session";

interface ProvidersProps {
  children: React.ReactNode;
  initialSession?: CustomSession | null;
}

export function Providers({ children, initialSession }: ProvidersProps) {
  return (
    <SessionProvider>
      <CustomSessionProvider initialSession={initialSession}>
        <HeroUIProvider>
          {children}
        </HeroUIProvider>
      </CustomSessionProvider>
    </SessionProvider>
  );
}