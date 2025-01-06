import "./../styles/globals.css";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import { FormDataProvider } from "@/components/form/hooks/form.hook";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "600", "900"],
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Form App",
  description: "Form App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <Toaster />
        <FormDataProvider>{children}</FormDataProvider>
      </body>
    </html>
  );
}
