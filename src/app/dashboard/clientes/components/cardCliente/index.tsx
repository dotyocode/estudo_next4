import React from "react";

const CardCliente = () => {
  return (
    <article className="flex flex-col bg-gray-100 boder-2 p-2 rounded gap-2 hover:scale-105 duration-300">
      <h2>
        <a className="font-bold">Nome:</a> Jhonathan Peres
      </h2>

      <p>
        <a className="font-bold">Email:</a> dotyomusic@gmail.com
      </p>

      <p>
        <a className="font-bold">Telefone:</a> 31998571830
      </p>

      <button className="bg-red-500 px-4 rounded text-white mt-2 self-start">
        Deletar
      </button>
    </article>
  );
};

export default CardCliente;
