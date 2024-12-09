import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth, signOut, signIn } from "@/auth";
import { LogOut } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-2 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="Pitch App Logo" width={144} height={30} />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden text-red-500 font-medium">
                    Logout
                  </span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>
              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image ?? "https://placehold.co/40x40"}
                    alt={session?.user?.name ?? ""}
                  />
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit"> Login </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
