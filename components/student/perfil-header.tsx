"use client";

import { Calendar, Phone, Mail, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { type PerfilData } from "./perfil-data";

interface PerfilHeaderProps {
  perfil: PerfilData;
}

export function PerfilHeader({ perfil }: PerfilHeaderProps) {
  const initials = perfil.nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
      {/* Top orange accent bar */}
      <div className="h-1 w-full bg-primary" />

      <div className="px-6 py-5 flex flex-col gap-5">
        {/* Avatar row */}
        <div className="flex items-center gap-5">
          {/* Avatar with orange ring */}
          <div className="relative shrink-0">
            <div
              className="rounded-full p-[3px]"
              style={{
                background: "conic-gradient(#D2691E 0% 76%, #e5e7eb 76% 100%)",
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

          {/* Name + meta */}
          <div className="flex flex-col gap-0.5">
            <p className="text-xs font-bold text-primary tracking-wide uppercase">
              DADOS PREENCHIDOS À {perfil.dadosPreenchidos}%
            </p>
            <p className="text-base font-bold text-zinc-900">{perfil.nome}</p>
            <p className="text-sm text-zinc-500">
              {perfil.role} - {perfil.turma}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-sm font-medium text-zinc-700">
                {perfil.numero}
              </span>
              {/* QR / barcode icon */}
              <span
                className="inline-flex items-center justify-center size-5 rounded bg-red-500 text-white text-[9px] font-bold cursor-pointer shrink-0"
                title="QR Code"
              >
                QR
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bio + contacts row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Biografia */}
          <div>
            <p className="text-xs font-semibold text-zinc-700 mb-1">
              Biografia
            </p>
            <p className="text-sm text-zinc-400">{perfil.biografia ?? "-"}</p>
          </div>

          {/* Contactos */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <Calendar className="size-4 text-zinc-400 shrink-0" />
              <span>
                {perfil.dataNascimento ? (
                  perfil.dataNascimento
                ) : (
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
                {perfil.email ? (
                  perfil.email
                ) : (
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
