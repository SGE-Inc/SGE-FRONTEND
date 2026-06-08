"use client";

import {
  BookOpen,
  Users,
  CalendarDays,
  TrendingUp,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { type StatCard } from "./professor-dashboard-data";
import { cn } from "@/lib/utils";

const ICONS = {
  book: BookOpen,
  users: Users,
  calendar: CalendarDays,
  chart: TrendingUp,
};

const ICON_COLORS = {
  book: "bg-primary/10 text-primary",
  users: "bg-blue-50 text-blue-600",
  calendar: "bg-amber-50 text-amber-600",
  chart: "bg-emerald-50 text-emerald-600",
};

interface StatCardsProps {
  stats: StatCard[];
}

export function ProfessorStatCards({ stats }: StatCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = ICONS[stat.icon];
        return (
          <Card
            key={stat.label}
            className="rounded-xl border border-zinc-200 shadow-none"
          >
            <CardContent className="p-5 flex flex-col gap-3">
              {/* Icon + label */}
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                  {stat.label}
                </p>
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-lg",
                    ICON_COLORS[stat.icon],
                  )}
                >
                  <Icon className="size-4" />
                </span>
              </div>

              {/* Value */}
              <div>
                <p className="text-3xl font-bold text-zinc-900 leading-none">
                  {stat.value}
                </p>
                <p className="text-xs text-zinc-400 mt-1">{stat.sub}</p>
              </div>

              {/* Trend */}
              {stat.trend && (
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs font-medium",
                    stat.trend.up ? "text-emerald-600" : "text-amber-600",
                  )}
                >
                  {stat.trend.up ? (
                    <ArrowUp className="size-3" />
                  ) : (
                    <ArrowDown className="size-3" />
                  )}
                  {stat.trend.value}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
