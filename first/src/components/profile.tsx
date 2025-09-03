"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { Avatar } from "@heroui/react";

export default function Profile() {
  const { data: session } = useSession();
  
  if (!session) {
    return null;
  }
  
  return (
    <div className="flex items-center gap-3">
      <Avatar
        src={session.user?.image || "/default-avatar.png"}
        alt="avatar"
        className="border-white/30 shadow-sm"
        size="sm"
      />
      <span className="text-white font-medium text-sm hidden md:inline">
        {session.user?.name || "User"}
      </span>
    </div>
  );
}