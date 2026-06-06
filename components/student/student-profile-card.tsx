"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface StudentInfo {
  name: string;
  number: string;
  class: string;
  grade: string;
  avatarUrl?: string;
}

interface StudentProfileCardProps {
  student?: StudentInfo;
}

const DEFAULT_STUDENT: StudentInfo = {
  name: "Igor Francisco Pedro",
  number: "20",
  class: "Informática - Sala 01 - ID",
  grade: "12 Classe",
};

export function StudentProfileCard({
  student = DEFAULT_STUDENT,
}: StudentProfileCardProps) {
  return (
    <div className="flex items-center gap-8 rounded-lg border border-zinc-200 bg-white p-6 min-h-47.5">
      {/* Avatar */}
      <div className="shrink-0">
        <Avatar className="size-40 rounded-md">
          <AvatarImage
            // src={student.avatarUrl}
            src="/me.png"
            alt={student.name}
            className="object-cover rounded-md"
          />
          <AvatarFallback className="rounded-md text-2xl font-bold bg-zinc-100 text-zinc-500">
            {student.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-bold tracking-wide text-zinc-900 uppercase">
          {student.name} - {student.number}
        </p>
        <p className="text-sm text-zinc-600">{student.class}</p>
        <p className="text-sm text-zinc-600">{student.grade}</p>
      </div>
    </div>
  );
}
