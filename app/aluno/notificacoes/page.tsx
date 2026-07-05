"use client";

import { useState } from "react";
import { DashPage } from "@/components/layouts/dash-page";
import {
  NotificacoesList,
  NOTIFICACOES_MOCK,
} from "@/components/shared/notificacoes";

export default function AlunoNotificacoesPage() {
  const [notificacoes, setNotificacoes] = useState(NOTIFICACOES_MOCK);

  const handleToggleLida = (id: string) => {
    setNotificacoes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, lida: !n.lida } : n)),
    );
  };

  return (
    <DashPage title="Notificações">
      <NotificacoesList
        notificacoes={notificacoes}
        onToggleLida={handleToggleLida}
      />
    </DashPage>
  );
}
