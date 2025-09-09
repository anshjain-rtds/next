import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CustomSession } from "@/lib/session";

interface ProfileProps {
  session: CustomSession;
}

export default function Profile({ session }: ProfileProps) {
  if (!session?.user) {
    return null;
  }

  const { user } = session;

  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage
          src={user.image || "/default-avatar.jpg"}
          alt="avatar"
          className="border-white/30 shadow-sm"
        />
        <AvatarFallback>
          {user.name?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="hidden md:flex flex-col">
        <span className="text-white font-medium text-sm">
          {user.name || user.username || "User"}
        </span>
      </div>
    </div>
  );
}
