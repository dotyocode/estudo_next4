"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/app/components/input";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório"),
  email: z
    .string()
    .email("Digite um email valido")
    .min(1, "O email é obrigatório"),
  phone: z.string().refine(
    (value) => {
      return (
        /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) ||
        /^\d{2}\s\d{9}$/.test(value) ||
        /^\d{11}$/.test(value)
      );
    },
    { message: "O número de telefone deve estar (DD) 999999999" }
  ),
  address: z.string(),
});

type FormData = z.infer<typeof schema>;

const FormClient = ({ userId }: { userId: string }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const cadastrarCliente = async (data: FormData) => {
    const payload = {
      name: data.name,
      phone: data.phone,
      address: data.address,
      email: data.email,
      userId: userId,
    };
    await api.post("/api/clientes", payload);

    // router.refresh();
    router.replace("/dashboard/clientes");
  };

  return (
    <form
      className="flex flex-col mt-6"
      onSubmit={handleSubmit(cadastrarCliente)}
    >
      <label className="mb-1 text-lg font-medium">Nome completo</label>
      <Input
        type="text"
        name="name"
        placehoolder="Digite o nome completo"
        error={errors.name?.message}
        register={register}
      />
      <div className="flex w-full gap-5 items-center justify-between my-5 flex-col sm:flex-row">
        <div className="w-full">
          <label className="mb-1 text-lg font-medium">Email</label>
          <Input
            type="email"
            name="email"
            placehoolder="Digite o seu email"
            error={errors.email?.message}
            register={register}
          />
        </div>

        <div className="w-full">
          <label className="mb-1 text-lg font-medium">Telefone</label>
          <Input
            type="number"
            name="phone"
            placehoolder="Digite o seu telefone"
            error={errors.phone?.message}
            register={register}
          />
        </div>
      </div>

      <div className="w-full gap-5 items-center justify-between mb-5">
        <label className="mb-1 text-lg font-medium">Endereço</label>
        <Input
          type="text"
          name="address"
          placehoolder="Digite o seu endereço"
          error={errors.address?.message}
          register={register}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold hover:bg-blue-400 duration-100"
      >
        Cadastrar
      </button>
    </form>
  );
};

export default FormClient;
