import Container from "@/app/components/Container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";

export default async function newTicket() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const clientes = await prismaClient.cliente.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const handleRegisterChamado = async (formData: FormData) => {
    "use server";
    const name = formData.get("name");
    const description = formData.get("description");
    const cliente = formData.get("cliente");

    if (!name || !description || !cliente) {
      return;
    }

    await prismaClient.chamados.create({
      data: {
        name: name as string,
        description: description as string,
        clienteId: cliente as string,
        status: "ABERTO",
        userId: session?.user.id,
      },
    });

    redirect("/dashboard");
  };

  return (
    <Container>
      <main className="flex flex-col mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="bg-gray-900 px-4 py-1 text-white rounded"
          >
            Voltar
          </Link>
          <h1 className="text-3xl font-bold">Novo chamado</h1>
        </div>

        <form className="flex flex-col mt-6" action={handleRegisterChamado}>
          <label className="mb-1 font-medium text-lg">Nome do chamado</label>
          <input
            name="name"
            type="text"
            placeholder="Digite o nome do chamado"
            required
            className="w-full border-2 rounded-md px-2 mb-2 h-11"
          />

          <label className="mb-1 font-medium text-lg">
            Descreva o problema
          </label>
          <textarea
            name="description"
            placeholder="Descreva o problema"
            required
            className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none"
          ></textarea>

          {clientes.length !== 0 && (
            <>
              <label className="mb-1 font-medium text-lg">
                Selecione o cliente
              </label>
              <select
                name="cliente"
                className="w-full border-2 rounded-md px-2 mb-2 h-11 resize-none bg-white"
              >
                {clientes.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </>
          )}
          {clientes.length === 0 && (
            <Link href="/dashboard/clientes/new">
              Você ainda não tem nenhum cliente,{" "}
              <span className="text-blue-500 font-medium">
                Cadastrar cliente
              </span>
            </Link>
          )}

          <button
            type="submit"
            disabled={clientes.length <= 0}
            className="bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold hover:bg-blue-400 duration-100 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Cadastrar chamado
          </button>
        </form>
      </main>
    </Container>
  );
}
