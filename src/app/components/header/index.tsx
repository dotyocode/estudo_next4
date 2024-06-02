"use client";
import Link from "next/link";
import React from "react";
import { FiUser, FiLogOut, FiLock, FiLoader } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { status, data } = useSession();

  const handleLogin = async () => {
    await signIn();
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm">
      <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/">
          <h1 className="font-bold text-2xl pl-1 hover:tracking-widest duration-300">
            DEV <span className="text-blue-500">CONTROLE</span>
          </h1>
        </Link>

        {status === "loading" && (
          <button className="animate-spin">
            <FiLoader size={24} color="#4b5563" />
          </button>
        )}

        {status === "unauthenticated" && (
          <button onClick={handleLogin}>
            <FiLock size={24} color="#4b5563" />
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex gap-5 items-baseline">
            <Link href="/dashboard">
              <FiUser size={26} color="#4b5563" />
            </Link>

            <button onClick={handleLogout}>
              <FiLogOut size={26} color="#4b5563" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
