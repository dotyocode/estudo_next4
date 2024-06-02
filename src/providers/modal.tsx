"use client";

import { createContext, ReactNode, useState } from "react";
import { ChamadosProps } from "@/utils/chamados.type";
import { ClientesProps } from "@/utils/clientes.type";
import ModalChamados from "@/app/components/modal";

interface ModalContextData {
  visible: boolean;
  handleModalVisible: () => void;
  chamado: ChamadoInfo | undefined;
  setDetailChamado: (detalhe: ChamadoInfo) => void;
}

interface ChamadoInfo {
  chamado: ChamadosProps;
  cliente: ClientesProps | null;
}

export const ModalContext = createContext({} as ModalContextData);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [chamado, setChamado] = useState<ChamadoInfo>();

  const handleModalVisible = () => {
    setVisible(!visible);
  };

  const setDetailChamado = (detalhe: ChamadoInfo) => {
    setChamado(detalhe);
  };

  return (
    <ModalContext.Provider value={{ visible, handleModalVisible, chamado, setDetailChamado }}>
      {visible && <ModalChamados />}
      {children}
    </ModalContext.Provider>
  );
};
