"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { type CalendarioData } from "./horario-provas-data";

interface ProvasTableProps {
  data: CalendarioData;
}

export function ProvasTable({ data }: ProvasTableProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 300 : -300, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Period label */}
      <div className="flex items-center gap-2">
        <span className="text-primary text-base">📅</span>
        <p className="text-sm font-semibold text-primary">
          {data.label} ({data.periodo})
        </p>
      </div>

      {/* Scroll container with arrows */}
      <div className="relative">
        {/* Left arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex size-9 items-center justify-center rounded-full bg-zinc-700 text-white shadow-lg hover:bg-zinc-600 transition-colors"
            aria-label="Scroll esquerda"
          >
            <ChevronLeft className="size-5" />
          </button>
        )}

        {/* Right arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex size-9 items-center justify-center rounded-full bg-zinc-700 text-white shadow-lg hover:bg-zinc-600 transition-colors"
            aria-label="Scroll direita"
          >
            <ChevronRight className="size-5" />
          </button>
        )}

        {/* Scrollable table */}
        <div
          ref={scrollRef}
          className=" w-full overflow-x-auto rounded-lg border border-zinc-200 shadow-inner pb-2 p-1 custom-scroll"
          style={{ scrollbarWidth: "thin" }}
        >
          <table className="w-full border-collapse text-sm overflow-hidden rounded-md">
            <thead>
              <tr className="bg-primary text-white text-center text-xs font-semibold">
                <th className="border border-primary/20 px-4 py-3 text-left min-w-[110px] sticky left-0 bg-primary z-10">
                  Horário
                </th>
                {data.dias.map((dia, i) => (
                  <th
                    key={i}
                    className="border border-primary/20 px-3 py-3 min-w-[130px] whitespace-nowrap"
                  >
                    {dia}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.rows.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="border-b border-zinc-100 hover:bg-zinc-50/60 transition-colors"
                >
                  {/* Sticky horário column */}
                  <td className="border border-zinc-200 px-4 py-3 text-xs font-semibold text-zinc-700 bg-white sticky left-0 z-10 whitespace-nowrap">
                    {row.horario}
                  </td>

                  {row.dias.map((slot, dayIdx) => {
                    const hasDisciplina =
                      slot?.disciplina !== null &&
                      slot?.disciplina !== undefined;
                    return (
                      <td
                        key={dayIdx}
                        className={cn(
                          "border border-zinc-200 px-3 py-3 text-center text-xs min-w-[130px]",
                          hasDisciplina && slot?.highlighted
                            ? "bg-zinc-200 text-zinc-800 font-semibold"
                            : hasDisciplina
                              ? "bg-white text-zinc-800 font-semibold"
                              : "bg-white text-zinc-400",
                        )}
                      >
                        {hasDisciplina ? slot!.disciplina : "—"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
