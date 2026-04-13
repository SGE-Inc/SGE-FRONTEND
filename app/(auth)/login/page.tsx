"use client";

import { LoginForm } from "@/components/login-form";
import { useAuth } from "@/hooks/use-auth";
import { mockLogin } from "@/lib/mock-auth";
import { GalleryVerticalEndIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = (data: { id: string; password: string }) => {
    const user = mockLogin(data.id, data.password);
    if (!user) {
      toast.error("Credenciais inválidas!");
      return;
    }

    login(user);

    const roleRoutes = {
      admin: "/admin/dashboard",
      aluno: "/aluno/dashboard",
      professor: "/professor/dashboard",
    } as const;

    router.push(roleRoutes[user.role]);
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEndIcon className="size-4" />
            </div>
            SGE
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm
              idLabel="ID do usuário"
              idPlaceholder="admin001, DL23001 ou PROF001"
              title="Acesse sua conta"
              subtitle="Informe seu ID e senha para entrar"
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
