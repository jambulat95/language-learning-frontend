import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DailyActivity } from "@/types";

interface ActivityHeatmapProps {
  days: DailyActivity[];
}

const LEVEL_COLORS = [
  "bg-muted",
  "bg-green-200 dark:bg-green-900",
  "bg-green-300 dark:bg-green-700",
  "bg-green-500 dark:bg-green-500",
  "bg-green-700 dark:bg-green-400",
];

function getLevel(xp: number): number {
  if (xp === 0) return 0;
  if (xp < 20) return 1;
  if (xp < 50) return 2;
  if (xp < 100) return 3;
  return 4;
}

const WEEKDAYS = ["Пн", "", "Ср", "", "Пт", "", ""];

export function ActivityHeatmap({ days }: ActivityHeatmapProps) {
  const { grid, months } = useMemo(() => {
    if (days.length === 0) {
      return { grid: [], months: [] };
    }

    // We need to align to start on a Monday (row 0 = Mon)
    const firstDate = new Date(days[0].date + "T00:00:00");
    const firstDayOfWeek = (firstDate.getDay() + 6) % 7; // 0=Mon

    // Build lookup
    const lookup = new Map<string, DailyActivity>();
    for (const d of days) {
      lookup.set(d.date, d);
    }

    // Build grid: array of columns (weeks), each column has 7 cells
    const columns: { date: string; level: number; xp: number; tooltip: string }[][] = [];
    const monthLabels: { label: string; col: number }[] = [];

    let currentDate = new Date(firstDate);
    // Go back to previous Monday if needed
    currentDate.setDate(currentDate.getDate() - firstDayOfWeek);

    const lastDate = new Date(days[days.length - 1].date + "T00:00:00");
    let prevMonth = -1;

    while (currentDate <= lastDate) {
      const week: typeof columns[0] = [];
      for (let dow = 0; dow < 7; dow++) {
        const dateStr = currentDate.toISOString().slice(0, 10);
        const activity = lookup.get(dateStr);
        const xp = activity?.xp ?? 0;

        if (currentDate > lastDate || currentDate < firstDate) {
          week.push({ date: dateStr, level: -1, xp: 0, tooltip: "" });
        } else {
          const reviews = activity?.reviews ?? 0;
          const cards = activity?.cards_learned ?? 0;
          week.push({
            date: dateStr,
            level: getLevel(xp),
            xp,
            tooltip: `${dateStr}: ${xp} XP, ${reviews} повторений, ${cards} новых карточек`,
          });
        }

        // Track month labels on Monday (dow=0)
        if (dow === 0 && currentDate.getMonth() !== prevMonth && currentDate <= lastDate && currentDate >= firstDate) {
          prevMonth = currentDate.getMonth();
          monthLabels.push({
            label: currentDate.toLocaleString("ru", { month: "short" }),
            col: columns.length,
          });
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }
      columns.push(week);
    }

    return { grid: columns, months: monthLabels };
  }, [days]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Активность</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {/* Month labels */}
          <div className="flex ml-8 mb-1 text-xs text-muted-foreground">
            {months.map((m, i) => (
              <span
                key={i}
                className="absolute"
                style={{ marginLeft: `${m.col * 14}px` }}
              >
                {m.label}
              </span>
            ))}
          </div>
          <div className="relative mt-5">
            <div className="flex gap-0.5">
              {/* Weekday labels */}
              <div className="flex flex-col gap-0.5 mr-1">
                {WEEKDAYS.map((label, i) => (
                  <div
                    key={i}
                    className="h-[12px] w-6 text-[10px] leading-[12px] text-muted-foreground"
                  >
                    {label}
                  </div>
                ))}
              </div>
              {/* Grid */}
              {grid.map((week, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-0.5">
                  {week.map((cell, rowIdx) => (
                    <div
                      key={rowIdx}
                      className={`h-[12px] w-[12px] rounded-sm ${
                        cell.level === -1
                          ? "bg-transparent"
                          : LEVEL_COLORS[cell.level]
                      }`}
                      title={cell.tooltip}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          {/* Legend */}
          <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground justify-end">
            <span>Меньше</span>
            {LEVEL_COLORS.map((color, i) => (
              <div key={i} className={`h-[12px] w-[12px] rounded-sm ${color}`} />
            ))}
            <span>Больше</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
