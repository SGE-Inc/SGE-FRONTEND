"use client";

import { LoginForm } from "@/components/login-form";
import { useAuth } from "@/hooks/use-auth";
import { mockLogin } from "@/lib/mock-auth";
import { GalleryVerticalEndIcon } from "lucide-react";
import { useRouter } from "next/dist/client/components/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = (data: { id: string; password: string }) => {
    const user = mockLogin(data.id, data.password);
    if (user?.role === "admin") {
      login(user);
      router.push("/admin/dashboard");
    } else {
      alert("Credenciais inválidas!");
    }
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
              idLabel="ID Admin"
              idPlaceholder="admin001"
              title="Bem-vindo, Admin"
              subtitle="Acesse o painel de administração"
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
