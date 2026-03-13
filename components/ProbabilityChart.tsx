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

  // Sample every 5 pulls for cleaner display, but keep key points
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
        Per-pull 5★ probability (%) across the pity cycle
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
                value: "Soft Pity",
                fill: "#FFD700",
                fontSize: 11,
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
          <span>Soft Pity Zone</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-[#FFD700]" />
          <span>Your Position</span>
        </div>
      </div>
    </div>
  );
}
