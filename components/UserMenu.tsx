"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const UserMenu = () => {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }
  const { id, email, image, name } = session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-9 w-9">
          <AvatarImage src={image!} />
          <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="lg:w-80 rounded-2xl p-4 bg-gray-50 dark:bg-gray-900"
        align="end"
        sideOffset={10}
      >
        <div className="flex items-center gap-4 mb-2">
          <Avatar className="h-12 w-12">
            <AvatarImage src={image!} />
            <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
          </Avatar>

          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 -mt-1">
              {email}
            </p>
          </div>
        </div>

        <Button
          className="w-full"
          variant="ghost"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="mr-4" size={20} />
          Logout
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
