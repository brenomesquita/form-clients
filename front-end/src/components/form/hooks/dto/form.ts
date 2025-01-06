import { Dispatch, ReactNode, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";

export interface IFormDataContextData {
  formProps: UseFormReturn<
    {
      name: string;
      cpf: string;
      email: string;
      colorId: string;
      observation?: string;
      apiError?: string;
    },
    any,
    undefined
  >;
  handleCreate: () => void;
}

export interface IFormDataProviderProps {
  children: ReactNode;
}
