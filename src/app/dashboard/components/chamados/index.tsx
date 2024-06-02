"use client";
import { api } from "@/lib/api";
import { ChamadosProps } from "@/utils/chamados.type";
import { ClientesProps } from "@/utils/clientes.type";
import React, { useContext } from "react";
import { FiCheckSquare, FiFile, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { ModalContext } from "@/providers/modal";
interface ChamadosItensProps {
  chamado: ChamadosProps;
  cliente: ClientesProps | null;
}

const Chamados = ({ cliente, chamado }: ChamadosItensProps) => {
  const router = useRouter();
  const { handleModalVisible, setDetailChamado } = useContext(ModalContext);

  const handleChangeStatus = async () => {
    try {
      await api.patch("/api/chamados", {
        id: chamado.id,
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = () => {
    handleModalVisible();
    setDetailChamado({
      cliente: cliente,
      chamado: chamado,
    });
  };

  return (
    <>
      <tr className="border-b-2 boder-b-slate-200 h-16 last:border-b-0 hover:bg-gray-50 duration-300">
        <td className="text-left">{cliente?.name}</td>
        <td className="text-left hidden sm:table-cell">
          {chamado?.created_at?.toLocaleDateString("pt-br")}
        </td>
        <td className="text-left">
          <span className="bg-green-400 px-2 py-1 rounded">
            {chamado?.status}
          </span>
        </td>
        <td className="text-left">
          <button className="mr-2" onClick={handleChangeStatus}>
            <FiCheckSquare size={18} color="#59927a" />
          </button>
          <button onClick={handleOpenModal}>
            <FiFile size={18} color="blue" />
          </button>
        </td>
      </tr>
    </>
  );
};

export default Chamados;
