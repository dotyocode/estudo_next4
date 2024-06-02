import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await req.json();

  const findChamado = await prismaClient.chamados.findFirst({
    where: {
      id: id as string,
    },
  });

  if (!findChamado) {
    return NextResponse.json(
      { message: "Chamado não encontrado" },
      { status: 400 }
    );
  }

  try {
    await prismaClient.chamados.update({
      where: {
        id: id as string,
      },
      data: {
        status: "FECHADO",
      },
    });
    return NextResponse.json(
      { message: "Chamado atualizado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Falha ao atualizar o chamado" },
      { status: 400 }
    );
  }
}
