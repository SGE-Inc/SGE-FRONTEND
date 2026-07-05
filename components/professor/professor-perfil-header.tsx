"use client";

import { Calendar, Phone, Mail, MapPin, BookOpen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { type ProfessorPerfilData } from "./professor-perfil-data";

interface ProfessorPerfilHeaderProps {
  perfil: ProfessorPerfilData;
}

export function ProfessorPerfilHeader({ perfil }: ProfessorPerfilHeaderProps) {
  const initials = perfil.nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
      <div className="h-1 w-full bg-primary" />

      <div className="px-6 py-5 flex flex-col gap-5">
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            <div
              className="rounded-full p-[3px]"
              style={{
                background: `conic-gradient(#D2691E 0% ${perfil.dadosPreenchidos}%, #e5e7eb ${perfil.dadosPreenchidos}% 100%)`,
              }}
            >
              <div className="rounded-full p-[2px] bg-white">
                <Avatar className="size-20 rounded-full">
                  <AvatarImage
                    src={perfil.avatarUrl}
                    alt={perfil.nome}
                    className="object-cover rounded-full"
                  />
                  <AvatarFallback className="rounded-full text-lg font-bold bg-zinc-100 text-zinc-600">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-0.5">
            <p className="text-xs font-bold text-primary tracking-wide uppercase">
              DADOS PREENCHIDOS À {perfil.dadosPreenchidos}%
            </p>
            <p className="text-base font-bold text-zinc-900">{perfil.nome}</p>
            <p className="text-sm text-zinc-500">
              {perfil.role} - {perfil.departamento}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-sm font-medium text-zinc-700">
                {perfil.funcionarioId}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-semibold">
                <BookOpen className="size-3" />
                {perfil.disciplinas.length} disciplinas
              </span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-semibold text-zinc-700 mb-1">
              Biografia
            </p>
            <p className="text-sm text-zinc-400">{perfil.biografia ?? "-"}</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <Calendar className="size-4 text-zinc-400 shrink-0" />
              <span>
                {perfil.dataNascimento ?? (
                  <span className="italic text-zinc-400">
                    - data de nascimento indefinida -
                  </span>
                )}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-700">
              <Phone className="size-4 text-zinc-400 shrink-0" />
              <span>
                {perfil.telefone ?? (
                  <span className="text-zinc-400 italic">-</span>
                )}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <Mail className="size-4 text-zinc-400 shrink-0" />
              <span>
                {perfil.email ?? (
                  <span className="italic text-zinc-400">
                    - email indefinido -
                  </span>
                )}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-zinc-800">
              <MapPin className="size-4 text-zinc-400 shrink-0" />
              <span>
                {perfil.morada ?? (
                  <span className="text-zinc-400 font-normal italic">-</span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
