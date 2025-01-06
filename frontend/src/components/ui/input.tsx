import * as React from "react";
import { cn } from "@/lib/utils";

const formatCPF = (value: string) => {
  const cleaned = value.replace(/\D/g, "");
  const formatted = cleaned.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    "$1.$2.$3-$4"
  );
  return formatted.substring(0, 14);
};
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  maskFormatter?: (value: string) => string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onChange, maskFormatter, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      if (maskFormatter) {
        value = maskFormatter(value);
        e.target.value = value;
      }

      if (onChange) {
        onChange(e);
      }
    };

    return (
      <input
        type={type}
        className={cn(
          "flex h-[46px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        onChange={handleChange}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
