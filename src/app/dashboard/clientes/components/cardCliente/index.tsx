"use client";

import { api } from "@/lib/api";
import { ClientesProps } from "@/utils/clientes.type";
import { useRouter } from "next/navigation";
import React from "react";

const CardCliente = ({ cliente }: { cliente: ClientesProps }) => {
  const router = useRouter();

  const handledeleteCliente = async () => {
    try {
      await api.delete(`/api/clientes`, {
        params: {
          id: cliente.id,
        },
      });
      router.refresh()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="flex flex-col bg-gray-100 boder-2 p-2 rounded gap-2 hover:scale-105 duration-300">
      <h2>
        <a className="font-bold">Nome:</a> {cliente.name}
      </h2>

      <p>
        <a className="font-bold">Email:</a> {cliente.email}
      </p>

      <p>
        <a className="font-bold">Telefone:</a> {cliente.phone}
      </p>

      <button
        onClick={handledeleteCliente}
        className="bg-red-500 px-4 rounded text-white mt-2 self-start"
      >
        Deletar
      </button>
    </article>
  );
};

export default CardCliente;
