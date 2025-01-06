"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { fetchWrapper } from "@/utils/fetchWrapper";
import toast from "react-hot-toast";

import { IFormDataContextData, IFormDataProviderProps } from "./dto/form";
import { z } from "zod";

const FormContext = createContext<IFormDataContextData>(
  {} as IFormDataContextData
);

export function FormDataProvider(props: IFormDataProviderProps) {
  const formSchema = z.object({
    name: z.string().min(3, {
      message: "Nome precisa ser maior que três caracteres",
    }),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
      message: "CPF inválido",
    }),
    email: z.string().email({ message: "Por favor, insira um email válido" }),
    colorId: z.string().min(3, {
      message: "É preciso escolher uma cor",
    }),
    observation: z.string().optional(),
    apiError: z.string().optional(),
  });

  type IformSchema = z.infer<typeof formSchema>;

  const formProps = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
      email: "",
      colorId: "",
      observation: "",
      apiError: "",
    },
  });

  const handleCreate = async (data: IformSchema) => {
    try {
      const { name, cpf, email, colorId, observation } = data;

      await fetchWrapper(`${process.env.NEXT_PUBLIC_BASE_URL}/api/form`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, cpf, email, colorId, observation }),
      });

      toast.success("Formulário enviado com sucesso!", {
        duration: 4000,
        position: "top-right",
      });
      formProps.reset({
        name: "",
        cpf: "",
        email: "",
        colorId: "",
        observation: "",
      });
    } catch (error: any) {
      console.log(error, "error");
      toast.error("Erro ao enviar o formulário. Tente novamente.");
    }
  };

  return (
    <FormContext.Provider
      value={{
        formProps,
        handleCreate: formProps.handleSubmit(handleCreate),
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
}

export function useFormHook() {
  const context = useContext(FormContext);

  return context;
}
