"use client"
import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  type: string;
  placehoolder: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}

const Input = ({
  type,
  placehoolder,
  name,
  register,
  error,
  rules,
}: InputProps) => {
  return (
    <>
      <input
        className="w-full border-2 rounded-md h-11 px-2"
        type={type}
        placeholder={placehoolder}
        {...register(name, rules)}
        id={name}
      />
      {error && (
        <small className="text-red-500 my-1">{error}</small>
      )}
    </>
  );
};

export default Input;
