import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="px-2 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="Pitch App Logo" width={144} height={30} />
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
