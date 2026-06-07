"use client";

import { useState } from "react";
import { DashPage } from "@/components/layouts/dash-page";
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

export default function BoletinsPage() {
  const [trimestre, setTrimestre] = useState<Trimestre>("I TRIMESTRE");
  const data = BOLETIM_DATA[trimestre];

  return (
    <DashPage title="Boletins">
      {/* Page title */}
      <div className="flex items-center gap-2 -mt-1">
        <span className="inline-block size-2.5 rounded-full bg-primary shrink-0" />
        <h1 className="text-2xl font-bold text-zinc-900">Meu Boletim</h1>
      </div>

      {/* Trimestre selector */}
      <div className="flex flex-col gap-1.5">
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

      {/* Main 3-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px_300px] gap-4 items-start">
        {/* Left: Boletim table */}
        <BoletimTable data={data} />

        {/* Center: Sua Média */}
        <MediaCard media={data.media} />

        {/* Right: Estatística */}
        <EstatisticaCard data={data} />
      </div>
    </DashPage>
  );
}
