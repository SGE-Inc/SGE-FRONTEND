"use client";

import { ThumbsUp } from "lucide-react";

interface MediaCardProps {
  media: number;
}

export function MediaCard({ media }: MediaCardProps) {
  // Arc gauge: draws ~270° arc (from ~135° to ~405°), filled proportional to media/20
  const cx = 90;
  const cy = 90;
  const r = 62;

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const polarXY = (deg: number) => ({
    x: cx + r * Math.cos(toRad(deg)),
    y: cy + r * Math.sin(toRad(deg)),
  });

  // Track: 135° → 405° (270° sweep)
  const trackStart = polarXY(135);
  const trackEnd = polarXY(405);
  const trackPath = `M ${trackStart.x} ${trackStart.y} A ${r} ${r} 0 1 1 ${trackEnd.x} ${trackEnd.y}`;

  // Fill: proportion of 20
  const fillSweep = (media / 20) * 270;
  const fillEndDeg = 135 + fillSweep;
  const fillEnd = polarXY(fillEndDeg);
  const fillLargeArc = fillSweep > 180 ? 1 : 0;
  const fillPath = `M ${trackStart.x} ${trackStart.y} A ${r} ${r} 0 ${fillLargeArc} 1 ${fillEnd.x} ${fillEnd.y}`;

  const isGood = media >= 10;

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-5">
      {/* Title row */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-zinc-900">Sua Média</h3>
        {isGood && (
          <span className="flex items-center gap-1.5 text-xs text-blue-500 font-medium">
            <ThumbsUp className="size-4" />
            Bom desempenho!
          </span>
        )}
      </div>

      {/* Gauge */}
      <div className="flex items-center justify-center py-2">
        <svg width="180" height="155" viewBox="0 0 180 155">
          {/* Track */}
          <path
            d={trackPath}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Fill */}
          <path
            d={fillPath}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Center number */}
          <text
            x={cx}
            y={cy + 6}
            textAnchor="middle"
            fontSize="34"
            fontWeight="700"
            fill="#18181b"
          >
            {media}
          </text>
          <text
            x={cx}
            y={cy + 24}
            textAnchor="middle"
            fontSize="11"
            fill="#71717a"
          >
            Média do Aluno
          </text>
        </svg>
      </div>
    </div>
  );
}
