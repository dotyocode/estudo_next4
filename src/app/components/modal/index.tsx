"use client";

import { useContext } from "react";
import { ModalContext } from "@/providers/modal";

const ModalChamados = () => {
  const { handleModalVisible, chamado } = useContext(ModalContext);

  return (
    <section className="absolute bg-gray-900/50 w-full min-h-screen">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded">
          <div className="flex w-full justify-between mb-4">
            <h1 className="font-bold text-lg md:text-2xl">
              Detalhes do chamado
            </h1>
            <button
              onClick={handleModalVisible}
              className="bg-red-500 p-1 px-2 text-white rounded"
            >
              Fechar
            </button>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            <h2 className="font-bold">Nome:</h2>
            <p className="">{chamado?.chamado.name}</p>
          </div>

          <div className="flex flex-wrap flex-col gap-1 mb-2">
            <h2 className="font-bold">Descrição:</h2>
            <p className="">{chamado?.chamado?.description}</p>
          </div>

          <hr className="my-4"></hr>
          <h1 className="font-bold text-lg mb-4">Detalhes do cliente</h1>

          <div className="flex flex-wrap gap-1 mb-2">
            <h2 className="font-bold">Nome:</h2>
            <p className="">{chamado?.cliente?.name}</p>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            <h2 className="font-bold">Telefone:</h2>
            <p className="">{chamado?.cliente?.phone}</p>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            <h2 className="font-bold">Email:</h2>
            <p className="">{chamado?.cliente?.email}</p>
          </div>
          
          {chamado?.cliente?.address && (
            <div className="flex flex-wrap gap-1 mb-2">
              <h2 className="font-bold">Endereço:</h2>
              <p className="">{chamado?.cliente?.address}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ModalChamados;
