"use client";

import { type BoletimData } from "./boletim-data";

interface EstatisticaCardProps {
  data: BoletimData;
}

// Map disciplina nome → chart label
const CHART_MAP: { label: string; key: string }[] = [
  { label: "FIS", key: "FÍSICA" },
  { label: "FAI", key: "FORMAÇÃO DE ATITUDES INTEGRADORAS" },
  { label: "PORT", key: "PORTUGUÊS" },
  { label: "QUI", key: "QUÍMICA" },
  { label: "ING", key: "INGLÊS" },
  { label: "INF", key: "INFORMÁTICA" },
  { label: "MAT", key: "MATEMÁTICA" },
  { label: "Q.ANAL", key: "QUÍMICA ANALÍTICA" },
  { label: "ED.FIS", key: "EDUCAÇÃO FÍSICA" },
];

export function EstatisticaCard({ data }: EstatisticaCardProps) {
  // Resolve MT values per discipline
  const points = CHART_MAP.map(({ label, key }) => {
    const found = data.disciplinas.find((d) => d.nome === key);
    const mt = found && found.mt !== "-" ? Number(found.mt) : 0;
    const pp = found && found.pp !== "-" ? Number(found.pp) : 0;
    return { label, mt, pp };
  });

  const maxVal = 20;
  const W = 340;
  const H = 160;
  const padL = 28;
  const padR = 12;
  const padT = 10;
  const padB = 36;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const n = points.length;
  const step = chartW / (n - 1);

  const yPos = (val: number) => padT + chartH - (val / maxVal) * chartH;
  const xPos = (i: number) => padL + i * step;

  // Build SVG path for area
  const buildPath = (vals: number[]) => {
    const pts = vals.map((v, i) => `${xPos(i)},${yPos(v)}`);
    const line = pts.join(" L ");
    const area =
      `M ${xPos(0)},${yPos(vals[0])} L ${line} ` +
      `L ${xPos(n - 1)},${padT + chartH} L ${xPos(0)},${padT + chartH} Z`;
    return area;
  };

  const mtPath = buildPath(points.map((p) => p.mt));
  const ppPath = buildPath(points.map((p) => p.pp));

  // Y axis labels
  const yTicks = [0, 1, 2, 3, 4];

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-5">
      <h3 className="text-base font-bold text-zinc-900">
        Estatística de notas por disciplina
      </h3>

      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
        <defs>
          <linearGradient id="gradBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="gradRed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Y axis grid lines + labels */}
        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={padL}
              x2={W - padR}
              y1={yPos(tick)}
              y2={yPos(tick)}
              stroke="#e5e7eb"
              strokeDasharray="3 3"
              strokeWidth="1"
            />
            <text
              x={padL - 4}
              y={yPos(tick) + 4}
              textAnchor="end"
              fontSize="9"
              fill="#9ca3af"
            >
              {tick}
            </text>
          </g>
        ))}

        {/* PP area (red) - below */}
        <path
          d={ppPath}
          fill="url(#gradRed)"
          stroke="#ef4444"
          strokeWidth="1.5"
        />

        {/* MT area (blue) - above */}
        <path
          d={mtPath}
          fill="url(#gradBlue)"
          stroke="#3b82f6"
          strokeWidth="1.5"
        />

        {/* X axis labels */}
        {points.map((p, i) => (
          <text
            key={p.label}
            x={xPos(i)}
            y={padT + chartH + 14}
            textAnchor="middle"
            fontSize="9"
            fill="#6b7280"
          >
            {p.label}
          </text>
        ))}

        {/* X axis baseline */}
        <line
          x1={padL}
          x2={W - padR}
          y1={padT + chartH}
          y2={padT + chartH}
          stroke="#d1d5db"
          strokeWidth="1"
        />
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-4 justify-center text-xs text-zinc-600">
        <span className="flex items-center gap-1.5">
          <span className="inline-block size-2.5 rounded-sm bg-blue-500" />
          Positivas
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block size-2.5 rounded-sm bg-red-500" />
          Negativas
        </span>
      </div>
    </div>
  );
}
