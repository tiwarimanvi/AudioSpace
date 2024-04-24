"use client";

import React from "react";
import Image from "next/image";
import HomePage from "@/components/wallet/HomePage";
import ConnectWalletButton from "@/components/wallet/ConnectWalletButton";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <header className="border-b border-custom-1 w-full absolute top-0 left-0 h-16 flex items-center px-4 sm:px-10 z-10 text-slate-100 justify-between">
      <Image
        src="/images/Logo1.png"
        alt="logo"
        width={180}
        height={180}
        className="object-contain"
        quality={100}
        priority
      />
       <div className="flex items-center">
       <ConnectWalletButton>
      <HomePage/>
      </ConnectWalletButton>
       </div>
      
    </header>
  );
};
export default Navbar;
