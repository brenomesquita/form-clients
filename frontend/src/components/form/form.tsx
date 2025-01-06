"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormProvider,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormHook } from "./hooks/form.hook";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { fetchWrapper } from "@/utils/fetchWrapper";
import { Button } from "../ui/button";
import { formatCPF } from "@/utils/formatCPF";
import { Loader2 } from "lucide-react";

interface IColorsData {
  id: string;
  name: string;
  value: string;
}

export default function Form() {
  const { formProps, handleCreate } = useFormHook();
  const [colors, setColors] = useState<IColorsData[] | null>(null);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const { colors }: { colors: IColorsData[] } = await fetchWrapper(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/colors`
        );
        setColors(colors);
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };

    fetchColors();
    return formProps.reset({
      name: "",
      cpf: "",
      email: "",
      colorId: "",
      observation: "",
    });
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <FormProvider {...formProps}>
        <form
          onSubmit={formProps.handleSubmit(handleCreate)}
          className="w-full max-w-md p-8 bg-white rounded-lg shadow-md"
        >
          <h2 className="text-center text-2xl font-semibold text-indigo-600 mb-6">
            Formulário de Cadastro
          </h2>

          <div className="mb-4">
            <FormField
              control={formProps.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Nome
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="mt-2 px-4 py-2 border rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Digite o seu nome"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mb-4">
            <FormField
              control={formProps.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    CPF
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="mt-2 px-4 py-2 border rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
                      maskFormatter={formatCPF}
                      placeholder="Digite o seu CPF"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mb-4">
            <FormField
              control={formProps.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    E-mail
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="mt-2 px-4 py-2 border rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Digite o seu e-mail"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mb-4">
            <FormLabel className="text-sm font-medium text-gray-700">
              Escolha sua cor favorita
            </FormLabel>
            <FormField
              control={formProps.control}
              name={`colorId`}
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={formProps.watch(`colorId`)}
                  >
                    <FormControl>
                      <SelectTrigger className="mt-2 px-4 py-2 border rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-56 overflow-y-auto bg-white">
                      {colors?.length &&
                        colors.map(({ id, name, value }: any) => (
                          <SelectItem
                            key={id}
                            value={id}
                            className="cursor-pointer hover:bg-gray-200 focus:bg-gray-300"
                          >
                            <div className="flex items-center">
                              <div
                                className="w-4 h-4 rounded"
                                style={{ backgroundColor: value }}
                              ></div>
                              <p className="ml-2 text-sm text-gray-700">
                                {name}
                              </p>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mb-6">
            <FormField
              control={formProps.control}
              name="observation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Observação
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="mt-2 px-4 py-2 border rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Digite sua observação aqui."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mb-6">
            <FormField
              control={formProps.control}
              name="apiError"
              render={() => (
                <FormItem>
                  {formProps.formState.errors.apiError && (
                    <p className="text-red-500 text-sm">
                      {formProps.formState.errors.apiError.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md focus:ring-2 focus:ring-indigo-500 hover:bg-indigo-700"
              disabled={formProps.formState.isSubmitting}
            >
              {formProps.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                "Salvar Formulário"
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
