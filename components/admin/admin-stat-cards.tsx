"use client";

import { Users, GraduationCap, LayoutGrid, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type AdminStat } from "./admin-dashboard-data";

const ICON_MAP = {
  students: { Icon: Users,          bg: "bg-primary/10",    text: "text-primary" },
  teachers: { Icon: GraduationCap,  bg: "bg-blue-50",       text: "text-blue-600" },
  classes:  { Icon: LayoutGrid,     bg: "bg-emerald-50",    text: "text-emerald-600" },
  approval: { Icon: TrendingUp,     bg: "bg-amber-50",      text: "text-amber-600" },
};

export function AdminStatCards({ stats }: { stats: AdminStat[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const { Icon, bg, text } = ICON_MAP[stat.icon];
        return (
          <Card key={stat.label} className="rounded-xl border border-zinc-200 shadow-none">
            <CardContent className="p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide leading-tight">
                  {stat.label}
                </p>
                <span className={cn("flex size-9 items-center justify-center rounded-xl shrink-0", bg)}>
                  <Icon className={cn("size-4", text)} />
                </span>
              </div>

              <div>
                <p className="text-3xl font-bold text-zinc-900 leading-none">{stat.value}</p>
                <p className="text-xs text-zinc-400 mt-1 leading-snug">{stat.sub}</p>
              </div>

              <div className={cn(
                "flex items-center gap-1 text-xs font-medium",
                stat.trend.up ? "text-emerald-600" : "text-red-500"
              )}>
                {stat.trend.up
                  ? <ArrowUp className="size-3 shrink-0" />
                  : <ArrowDown className="size-3 shrink-0" />
                }
                {stat.trend.value}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}