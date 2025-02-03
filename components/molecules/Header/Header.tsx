import type { FC } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { Logo } from "@/components/atoms/Avatar/Logo/Logo";

export const Header: FC = () => {
  return (
    <header className="bg-white shadow-sm text-gray-800 flex justify-between p-5 items-center">
      <Link href="/" className="flex items-center font-bold uppercase gap-x-2">
        <Logo />
      </Link>

      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </header>
  );
};
