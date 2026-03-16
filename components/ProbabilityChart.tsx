"use client";

import { useMemo, useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";
import { generateProbDistribution } from "@/lib/pityCalc";
import { GAME_CONFIG } from "@/lib/gameConfig";

interface Props {
  currentPulls: number;
}

export default function ProbabilityChart({ currentPulls }: Props) {
  const [mounted, setMounted] = useState(false);
  const data = useMemo(() => generateProbDistribution(currentPulls), [currentPulls]);

  const chartData = useMemo(() => {
    return data.filter(
      (d) =>
        d.pull % 5 === 0 ||
        d.pull === currentPulls ||
        d.pull === GAME_CONFIG.softPityStart ||
        d.pull === GAME_CONFIG.hardPity
    );
  }, [data, currentPulls]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-[#2a2a4a]">
        <h2 className="text-xl font-bold text-[#FFD700] mb-2">Probability Distribution</h2>
        <div className="w-full h-[250px] sm:h-[300px] flex items-center justify-center text-gray-500">
          Loading chart...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-[#2a2a4a]">
      <h2 className="text-xl font-bold text-[#FFD700] mb-2">
        Probability Distribution
      </h2>
      <p className="text-gray-500 text-sm mb-4">
        Per-pull SSR probability (%) within the 80-pull pity cycle
      </p>

      <div className="w-full h-[250px] sm:h-[300px]" style={{ minWidth: 300, minHeight: 250 }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={250}>
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
          >
            <XAxis
              dataKey="pull"
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              axisLine={{ stroke: "#2a2a4a" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              unit="%"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f0f1a",
                border: "1px solid #2a2a4a",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value: number) => [`${value}%`, "Probability"]}
              labelFormatter={(label: number) => `Pull #${label}`}
            />
            <ReferenceLine
              x={GAME_CONFIG.softPityStart}
              stroke="#FFD700"
              strokeDasharray="3 3"
              label={{
                value: `Soft ~${GAME_CONFIG.softPityStart}`,
                fill: "#FFD700",
                fontSize: 10,
                position: "top",
              }}
            />
            <Bar dataKey="probability" radius={[2, 2, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.pull === currentPulls
                      ? "#FFD700"
                      : entry.pull >= GAME_CONFIG.softPityStart
                        ? "#FF6B35"
                        : "#6366f1"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-400">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-[#6366f1]" />
          <span>Normal</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-[#FF6B35]" />
          <span>Soft Pity ({GAME_CONFIG.softPityStart}+)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-[#FFD700]" />
          <span>Your Position</span>
        </div>
      </div>

      {/* Pity system summary below chart */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="bg-[#0f0f1a] rounded-lg p-2">
          <p className="text-[#FFD700] font-bold">80 pulls</p>
          <p className="text-gray-500">SSR guaranteed</p>
        </div>
        <div className="bg-[#0f0f1a] rounded-lg p-2">
          <p className="text-[#FF6B35] font-bold">120 pulls</p>
          <p className="text-gray-500">Rate-up guaranteed</p>
        </div>
        <div className="bg-[#0f0f1a] rounded-lg p-2">
          <p className="text-[#EF4444] font-bold">160 pulls</p>
          <p className="text-gray-500">Absolute worst case</p>
        </div>
      </div>
    </div>
  );
}
