"use client";

import React from "react";
import { useCustomSession } from "@/components/SessionProvider";
import { signOut } from "next-auth/react";
import { signOutAction } from "@/actions/auth-actions";
import { Avatar } from "@heroui/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CustomSession } from "@/lib/session";
import { useRouter } from "next/navigation";

interface ClientHeaderProps {
  initialSession?: CustomSession | null;
}

export default function ClientHeader({ initialSession }: ClientHeaderProps) {
  const { session, user, isLoading } = useCustomSession();
  const router = useRouter();

  // Use the session from context, fallback to initial session
  const currentSession = session || initialSession;
  const currentUser = user || initialSession?.user;

  const handleSignOut = async () => {
    try {
      if (currentUser?.authType === "github") {
        await signOut({ callbackUrl: "/auth", redirect: false });
      } else {
        await signOutAction();
      }
      router.push("/auth");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-4">
        <div className="animate-pulse bg-white/20 rounded-full w-8 h-8"></div>
        <div className="animate-pulse bg-white/20 rounded w-20 h-6"></div>
      </div>
    );
  }

  if (!currentSession?.user) {
    return (
      <Link href="/auth">
        <Button
          variant="secondary"
          size="sm"
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Sign In
        </Button>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3">
        <Link
          href="/profile"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <Avatar
            src={currentUser!.image || "/default-avatar.jpg"}
            alt="avatar"
            className="border-white/30 shadow-sm"
            size="sm"
          />
          <div className="hidden md:flex flex-col">
            <span className="text-white font-medium text-sm">
              {currentUser!.name?.toUpperCase() ||
                currentUser!.username?.toUpperCase() ||
                "User"}
            </span>
          </div>
        </Link>
      </div>

      <Button
        onClick={handleSignOut}
        variant="secondary"
        size="sm"
        className="bg-red-500 hover:bg-red-600 text-white"
      >
        Sign Out
      </Button>
    </div>
  );
}
