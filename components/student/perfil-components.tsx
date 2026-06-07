"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface InfoRowProps {
  label: string;
  value: string | null | undefined;
  valueClassName?: string;
}

export function InfoRow({ label, value, valueClassName }: InfoRowProps) {
  const display = value ?? "-";
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <span className="text-sm font-semibold text-zinc-800 shrink-0">
        {label}
      </span>
      <span
        className={cn(
          "text-sm text-right",
          display === "-" ? "text-zinc-400" : "text-zinc-600",
          valueClassName,
        )}
      >
        {display}
      </span>
    </div>
  );
}

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

export function SectionCard({ title, children }: SectionCardProps) {
  return (
    <Card className="rounded-xl border border-zinc-200 shadow-none">
      <CardHeader className="pb-2 pt-5 px-5">
        <CardTitle className="flex items-center gap-2 text-lg font-bold text-zinc-900">
          <span className="inline-block size-2.5 rounded-full bg-primary shrink-0" />
          {title}
        </CardTitle>
      </CardHeader>
      <Separator className="mx-5 mb-1" style={{ width: "calc(100% - 40px)" }} />
      <CardContent className="px-5 pb-5 pt-0 divide-y divide-zinc-100">
        {children}
      </CardContent>
    </Card>
  );
}
