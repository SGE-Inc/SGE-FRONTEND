"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { DashPage } from "@/components/layouts/dash-page";
import { Informacao, INFORMACOES } from "@/components/student/informacoes-data";
import { InformacoesTable } from "@/components/student/informacoes-table";
import { InformacaoModal } from "@/components/student/informacao-modal";

export default function InformacoesPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Informacao | null>(null);

  const filtered = INFORMACOES.filter(
    (info) =>
      info.titulo.toLowerCase().includes(search.toLowerCase()) ||
      info.descricao.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <DashPage title="Informações">
      {/* Filter section */}
      <div className="rounded-md border border-zinc-200 bg-white p-4">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-2">
          Filtros
        </p>
        <div className="relative w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Pesquisar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-zinc-200 bg-white pl-9 pr-3 py-2 text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
          />
        </div>
      </div>

      {/* Table */}
      <InformacoesTable
        informacoes={filtered}
        onSelect={(info) => setSelected(info)}
      />

      {/* Modal */}
      <InformacaoModal
        informacao={selected}
        total={INFORMACOES.length}
        open={selected !== null}
        onClose={() => setSelected(null)}
      />
    </DashPage>
  );
}
