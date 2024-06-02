"use client";
import Link from "next/link";
import React from "react";
import Container from "@/app/components/Container";

const HeaderDashboard = () => {
  return (
    <Container>
      <header className="w-full bg-gray-900 my-4 p-3 rounded flex gap-4 items-center">
        <Link
          href="/dashboard"
          className="text-white hover:font-bold duration-100"
        >
          Chamados
        </Link>
        <Link
          href="/dashboard/clientes"
          className="text-white hover:font-bold duration-100"
        >
          Clientes
        </Link>
      </header>
    </Container>
  );
};

export default HeaderDashboard;
