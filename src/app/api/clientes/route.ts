import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { name, email, phone, address, userId } = await req.json();

  try {
    await prismaClient.cliente.create({
      data: {
        name,
        email,
        phone,
        address: address ? address : "",
        userId: userId,
      },
    });

    return NextResponse.json(
      { message: "Cliente cadastrado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao cadastrar um novo usuario" },
      { status: 401 }
    );
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json(
      { error: "Falha ao deletar o cliente, ID não encontrado" },
      { status: 401 }
    );
  }

  const findChamados = await prismaClient.chamados.findFirst({
    where: {
      clienteId: userId,
    },
  });

  if (findChamados) {
    return NextResponse.json(
      { error: "Falha ao deletar o cliente" },
      { status: 401 }
    );
  }

  try {
    await prismaClient.cliente.delete({
      where: {
        id: userId as string,
      },
    });

    return NextResponse.json(
      { message: "Cliente deletado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao deletar o cliente" },
      { status: 401 }
    );
  }
}
