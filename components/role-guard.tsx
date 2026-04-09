"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import type { Role } from "@/lib/mock-auth";

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole: Role;
  fallbackUrl?: string;
}

export function RoleGuard({
  children,
  requiredRole,
  fallbackUrl = "/login",
}: RoleGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // Não logado → vai para login
    if (!user) {
      router.replace(fallbackUrl);
      return;
    }

    // Role errado → redireciona para o dashboard correto dele
    if (user.role !== requiredRole) {
      const roleDashboard =
        user.role === "admin"
          ? "/admin/dashboard"
          : user.role === "aluno"
          ? "/aluno/dashboard"
          : "/professor/dashboard";

      router.replace(roleDashboard);
    }
  }, [user, loading, router, requiredRole, fallbackUrl]);

  // Enquanto carrega ou não tem permissão, mostra tela de loading
  if (loading || !user || user.role !== requiredRole) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-sm text-muted-foreground">Verificando permissões...</p>
      </div>
    );
  }

  return <>{children}</>;
}