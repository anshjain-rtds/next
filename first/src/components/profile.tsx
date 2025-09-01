"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { Avatar } from "@heroui/react";
export default function Profile() {
  const { data: session } = useSession();
  if (!session)
    return (
      <div className="flex items-center gap-2">
        <span className="text-gray-400 text-sm">Not signed in</span>
      </div>
    );
  return (
    <div className="flex items-center gap-3">
      <Avatar
        src={session.user?.image || "/default-avatar.png"}
        alt="avatar"
        className=" border-blue-500 shadow"
      />
      <span className="text-white font-semibold text-base">
        {session.user?.name || "User"}
      </span>
    </div>
  );
}