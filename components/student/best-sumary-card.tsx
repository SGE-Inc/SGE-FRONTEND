"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Lock } from "lucide-react";

type Period = "todos" | "i-trimestre" | "ii-trimestre" | "iii-trimestre";

interface Disciplina {
  abbr: string; // short label shown in center
  name: string; // full name for dropdown
  color: string; // fill color
  value: number; // score/media
}

const DISCIPLINAS: Disciplina[] = [
  { abbr: "QUI", name: "Química", color: "#D4A017", value: 19 },
  { abbr: "FIS", name: "Física", color: "#C0392B", value: 16 },
  { abbr: "MAT", name: "Matemática", color: "#1A9E8F", value: 17 },
];

const PERIODS: { key: Period; label: string; locked?: boolean }[] = [
  { key: "todos", label: "TODOS" },
  { key: "i-trimestre", label: "I TRIMESTRE" },
  { key: "ii-trimestre", label: "II TRIMESTRE" },
  { key: "iii-trimestre", label: "III TRIMESTRE", locked: true },
];

// SVG donut helpers
const polarToCartesian = (
  cx: number,
  cy: number,
  r: number,
  angleDeg: number,
) => {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

const describeArc = (
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
) => {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
};

function DonutChart({ selected }: { selected: string }) {
  const cx = 90;
  const cy = 90;
  const outerR = 72;
  const innerR = 46;
  const strokeWidth = outerR - innerR;
  const midR = (outerR + innerR) / 2;
  const total = DISCIPLINAS.reduce((s, d) => s + d.value, 0);

  // Build segments
  const segments: { d: Disciplina; startAngle: number; endAngle: number }[] =
    [];
  let cursor = 0;
  for (const d of DISCIPLINAS) {
    const sweep = (d.value / total) * 360;
    segments.push({ d, startAngle: cursor, endAngle: cursor + sweep });
    cursor += sweep;
  }

  const active = DISCIPLINAS.find((d) => d.name === selected) ?? DISCIPLINAS[0];

  return (
    <svg width="180" height="180" viewBox="0 0 180 180">
      {segments.map(({ d, startAngle, endAngle }, i) => {
        // gap between segments
        const gap = 3;
        const path = describeArc(
          cx,
          cy,
          midR,
          startAngle + gap / 2,
          endAngle - gap / 2,
        );
        const isSelected = d.name === selected;
        return (
          <path
            key={i}
            d={path}
            fill="none"
            stroke={d.color}
            strokeWidth={isSelected ? strokeWidth + 6 : strokeWidth}
            strokeLinecap="round"
            opacity={isSelected ? 1 : 0.85}
          />
        );
      })}

      {/* Center white circle */}
      <circle cx={cx} cy={cy} r={innerR - 4} fill="white" />

      {/* Center text */}
      <text
        x={cx}
        y={cy - 10}
        textAnchor="middle"
        fontSize="11"
        fill="#71717a"
        fontWeight="500"
      >
        {active.abbr}
      </text>
      <text
        x={cx}
        y={cy + 14}
        textAnchor="middle"
        fontSize="28"
        fontWeight="700"
        fill="#18181b"
      >
        {active.value}
      </text>
      <text x={cx} y={cy + 28} textAnchor="middle" fontSize="11" fill="#71717a">
        Média
      </text>
    </svg>
  );
}

export function MelhoresDisciplinasCard() {
  const [activePeriod, setActivePeriod] = useState<Period>("todos");
  const [selectedDisciplina, setSelectedDisciplina] = useState(
    DISCIPLINAS[0].name,
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selected =
    DISCIPLINAS.find((d) => d.name === selectedDisciplina) ?? DISCIPLINAS[0];

  return (
    <div className="relative flex flex-col rounded-lg border border-zinc-200 bg-white p-5 gap-3">
      {/* Top row: title + dropdown */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-zinc-900">
            Três Melhores Disciplinas
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">2025-2026</p>
        </div>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            <span
              className="inline-block size-3 rounded-sm shrink-0"
              style={{ backgroundColor: selected.color }}
            />
            {selected.name}
            <ChevronDown className="size-4 text-zinc-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-1 z-20 min-w-[130px] rounded-md border border-zinc-200 bg-white shadow-lg overflow-hidden">
              {DISCIPLINAS.map((d) => (
                <button
                  key={d.name}
                  onClick={() => {
                    setSelectedDisciplina(d.name);
                    setDropdownOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-zinc-50 transition-colors",
                    d.name === selectedDisciplina && "bg-zinc-50 font-medium",
                  )}
                >
                  <span
                    className="inline-block size-3 rounded-sm shrink-0"
                    style={{ backgroundColor: d.color }}
                  />
                  {d.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Donut chart centered */}
      <div className="flex justify-center">
        <DonutChart selected={selectedDisciplina} />
      </div>

      {/* Period filters */}
      <div className="flex items-center gap-2 justify-center flex-wrap mt-1">
        {PERIODS.map(({ key, label, locked }) => (
          <button
            key={key}
            onClick={() => !locked && setActivePeriod(key)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-sm px-3 py-1 text-[11px] font-semibold tracking-wide transition-colors",
              activePeriod === key
                ? "bg-primary text-white"
                : "bg-zinc-600 text-white hover:bg-zinc-500",
              locked && "opacity-70 cursor-not-allowed",
            )}
          >
            {label}
            {locked && <Lock className="size-3" />}
          </button>
        ))}
      </div>
    </div>
  );
}
