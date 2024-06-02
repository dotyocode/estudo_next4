import React from "react";
import { FiFile, FiTrash2 } from "react-icons/fi";

const Chamados = ({}) => {
  return (
    <>
      <tr className="border-b-2 boder-b-slate-200 h-16 last:border-b-0 hover:bg-gray-50 duration-300">
        <td className="text-left">Mercado silva</td>
        <td className="text-left hidden sm:table-cell">01/04/2024</td>
        <td className="text-left">
          <span className="bg-green-400 px-2 py-1 rounded">Aberto</span>
        </td>
        <td className="text-left">
          <button className="mr-2">
            <FiTrash2 size={18} color="red" />
          </button>
          <button>
            <FiFile size={18} color="blue" />
          </button>
        </td>
      </tr>
    </>
  );
};

export default Chamados;
