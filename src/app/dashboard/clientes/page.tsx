import Container from "@/app/components/Container";
import { authOptions } from "@/lib/auth";

import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import CardCliente from "./components/cardCliente";

export default async function Clientes() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <Container>
      <main className="mt-9 mb-2">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Meus clientes</h1>
        <Link
          href="/dashboard/clientes/new"
          className="bg-blue-500 px-4 py-1 rounded text-white"
        >
          Novo cliente
        </Link>
      </div>

      <section className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
      <CardCliente />
      <CardCliente />
      <CardCliente />
      </section>
      </main>

    </Container>
  );
}
