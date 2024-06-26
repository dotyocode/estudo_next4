import { authOptions } from "@/lib/auth";
import Container from "../components/Container";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Chamados from "./components/chamados";
import prismaCliente from "@/lib/prisma"

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const chamados = await prismaCliente.chamados.findMany({
    where: {
      userId: session.user.id,
      status: "ABERTO"
    },
    include: {
      cliente: true
    }
  })

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Chamados</h1>
          <Link
            href="/dashboard/new"
            className="bg-blue-500 px-4 py-1 rounded text-white"
          >
            Abrir Chamado
          </Link>
        </div>
        <table className="min-w-full my-2">
            <thead>
                <tr>
                <th className="font-medium text-left pl-1">CLIENTE</th>
                <th className="font-medium text-left  hidden sm:block">DATA CADASTRO</th>
                <th className="font-medium text-left">STATUS</th>
                <th className="font-medium text-left">#</th>
                </tr>
            </thead>
            <tbody>
              {chamados.map(item => (
                <Chamados key={item.id}  cliente={item.cliente} chamado={item}/>
              ))}
  
            </tbody>
        </table>

        {chamados.length <= 0 && (
          <h1 className="px-2 md:px-0 text-gray-600">Nenhum chamado encontrado</h1>
        )} 
      </main>
    </Container>
  );
}
