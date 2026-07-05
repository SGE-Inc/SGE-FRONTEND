"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { DashPage } from "@/components/layouts/dash-page";
import { ESTUDANTES_MOCK } from "@/components/admin/student/estudantes-data";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BoletimTable } from "@/components/student/boletim-table";
import { MediaCard } from "@/components/student/media-card";
import { EstatisticaCard } from "@/components/student/stats-card";
import { BOLETIM_DATA, Trimestre } from "@/components/student/boletim-data";

const TRIMESTRES: Trimestre[] = [
  "I TRIMESTRE",
  "II TRIMESTRE",
  "III TRIMESTRE",
];

export default function AdminStudentBoletimPage() {
  const params = useParams();
  const router = useRouter();
  const estudante = ESTUDANTES_MOCK.find((e) => e.id === params.id);
  const [trimestre, setTrimestre] = useState<Trimestre>("I TRIMESTRE");

  if (!estudante) {
    return (
      <DashPage title="Estudante não encontrado">
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <p className="text-zinc-500">Estudante não encontrado.</p>
          <Button
            variant="secondary"
            onClick={() => router.push("/admin/estudantes/informatica")}
          >
            Voltar
          </Button>
        </div>
      </DashPage>
    );
  }

  const data = BOLETIM_DATA[trimestre];

  return (
    <DashPage
      parent={{
        label: estudante.nome,
        href: `/admin/estudantes/${estudante.id}`,
      }}
      title="Boletim"
    >
      <div className="flex items-center gap-3 mb-2">
        <button
          onClick={() => router.back()}
          className="flex size-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800 transition-colors"
        >
          <ArrowLeft className="size-4" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block size-2.5 rounded-full bg-primary shrink-0" />
            <h2 className="text-xl font-bold text-zinc-900 uppercase">
              Boletim — {estudante.nome}
            </h2>
          </div>
          <p className="text-xs text-zinc-400 ml-4.5">
            {estudante.curso} · {estudante.turma} · {estudante.numeroProcesso}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 mb-4">
        <label className="text-sm text-zinc-500">Trimestre</label>
        <Select
          value={trimestre}
          onValueChange={(v) => setTrimestre(v as Trimestre)}
        >
          <SelectTrigger className="w-44 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TRIMESTRES.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px_300px] gap-4 items-start">
        <BoletimTable data={data} />
        <MediaCard media={data.media} />
        <EstatisticaCard data={data} />
      </div>
    </DashPage>
  );
}
