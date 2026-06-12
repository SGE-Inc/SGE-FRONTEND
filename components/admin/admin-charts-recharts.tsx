"use client";

import {
  PieChart, Pie, Cell, Tooltip as RTooltip, Legend, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend as LineLegend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type CursoDistribuicao, type MatriculaEvolucao } from "./admin-dashboard-data";

// ── Distribuição por curso — Pie chart ────────────────────────────────────────

interface DistribuicaoPieProps { data: CursoDistribuicao[] }

interface LabelProps {
  cx: number; cy: number; midAngle: number; innerRadius: number;
  outerRadius: number; percent: number; name: string;
}

const renderCustomLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent,
}: LabelProps) => {
  if (percent < 0.08) return null;
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function DistribuicaoCursosChart({ data }: DistribuicaoPieProps) {
  const total = data.reduce((s, d) => s + d.total, 0);
  return (
    <Card className="rounded-xl border border-zinc-200 shadow-none">
      <CardHeader className="pb-2 pt-5 px-5">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-zinc-900">
          <span className="inline-block size-2.5 rounded-full bg-primary shrink-0" />
          Distribuição por Curso
        </CardTitle>
        <p className="text-xs text-zinc-400 mt-0.5">{total} estudantes · ano lectivo 2025-2026</p>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={95}
              dataKey="total"
              nameKey="abrev"
              labelLine={false}
              label={renderCustomLabel}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.fill} stroke="white" strokeWidth={2} />
              ))}
            </Pie>
            <RTooltip
              formatter={(value: number, name: string) => [`${value} alunos`, name]}
              contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span style={{ fontSize: 11, color: "#6b7280" }}>
                  {data.find((d) => d.abrev === value)?.curso ?? value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// ── Evolução de matrículas — Line chart ───────────────────────────────────────

interface EvolucaoProps { data: MatriculaEvolucao[] }

const LINE_COLORS = { "2024": "#d1d5db", "2025": "#3b82f6", "2026": "#D2691E" };

export function EvolucaoMatriculasChart({ data }: EvolucaoProps) {
  return (
    <Card className="rounded-xl border border-zinc-200 shadow-none">
      <CardHeader className="pb-2 pt-5 px-5">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-zinc-900">
          <span className="inline-block size-2.5 rounded-full bg-primary shrink-0" />
          Evolução de Matrículas
        </CardTitle>
        <p className="text-xs text-zinc-400 mt-0.5">comparativo anual por mês</p>
      </CardHeader>
      <CardContent className="px-2 pb-5">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} margin={{ top: 5, right: 16, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="mes"
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
              domain={[150, 320]}
            />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }}
              formatter={(v: number) => [v > 0 ? v : "—", ""]}
            />
            <LineLegend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: "#6b7280" }} />
            {(["2024", "2025", "2026"] as const).map((yr) => (
              <Line
                key={yr}
                type="monotone"
                dataKey={yr}
                stroke={LINE_COLORS[yr]}
                strokeWidth={yr === "2026" ? 2.5 : 1.5}
                dot={yr === "2026" ? { r: 3, fill: LINE_COLORS[yr] } : false}
                strokeDasharray={yr === "2026" ? undefined : undefined}
                connectNulls={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}