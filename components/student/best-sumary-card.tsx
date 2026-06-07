"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import type { PieSectorShapeProps } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const disciplinaData = [
  { disciplina: "quimica", valor: 19, fill: "var(--color-quimica)" },
  { disciplina: "fisica", valor: 16, fill: "var(--color-fisica)" },
  { disciplina: "matematica", valor: 17, fill: "var(--color-matematica)" },
];

const chartConfig = {
  valor: { label: "Valor" },
  quimica: { label: "Química", color: "#D4A017" },
  fisica: { label: "Física", color: "#C0392B" },
  matematica: { label: "Matemática", color: "#1A9E8F" },
} satisfies ChartConfig;

export function MelhoresDisciplinasCard() {
  const id = "pie-melhores-disciplinas";
  const [activeDisciplina, setActiveDisciplina] = React.useState(
    disciplinaData[0].disciplina,
  );

  const activeIndex = React.useMemo(
    () =>
      disciplinaData.findIndex((item) => item.disciplina === activeDisciplina),
    [activeDisciplina],
  );

  const disciplinas = React.useMemo(
    () => disciplinaData.map((item) => item.disciplina),
    [],
  );

  const renderPieShape = React.useCallback(
    ({ index, outerRadius = 0, ...props }: PieSectorShapeProps) => {
      if (index === activeIndex) {
        return (
          <g>
            <Sector {...props} outerRadius={outerRadius + 10} />
            <Sector
              {...props}
              outerRadius={outerRadius + 25}
              innerRadius={outerRadius + 12}
            />
          </g>
        );
      }
      return <Sector {...props} outerRadius={outerRadius} />;
    },
    [activeIndex],
  );

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Três Melhores Disciplinas</CardTitle>
          <CardDescription>2025-2026</CardDescription>
        </div>
        <Select value={activeDisciplina} onValueChange={setActiveDisciplina}>
          <SelectTrigger
            className="ml-auto h-7 w-[140px] rounded-lg pl-2.5"
            aria-label="Selecionar disciplina"
          >
            <SelectValue placeholder="Selecionar" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {disciplinas.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig];
              if (!config) return null;
              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-xs"
                      style={{ backgroundColor: `var(--color-${key})` }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={disciplinaData}
              dataKey="valor"
              nameKey="disciplina"
              innerRadius={60}
              strokeWidth={5}
              shape={renderPieShape}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {disciplinaData[activeIndex].valor.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {chartConfig[
                            activeDisciplina as keyof typeof chartConfig
                          ]?.label ?? ""}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
