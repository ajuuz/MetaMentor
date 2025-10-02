import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import {
  TIME_PERIOD,
  TIME_PERIOD_GROUP_BY,
  type TimePeriod,
  type TimePeriodGroupBy,
} from "@/utils/constants";
import {  type SetURLSearchParams } from "react-router-dom";
import { addDays, endOfDay, isBefore, startOfDay, subMonths } from "date-fns";
import { isEqual } from "lodash";

const timePeriodLabels: Record<TimePeriod, string> = {
  all: "All",
  today: "Today",
  "7days": "Last 7 Days",
  month: "Last Month",
  "3months": "Last 3 Months",
  year: "Last Year",
};

const groupByLabels: Record<TimePeriodGroupBy, string> = {
  hour: "Hourly",
  day: "Daily",
  week: "Weekly",
  month: "Monthly",
  year: "Yearly",
};

// Get available grouping options based on time period
function getAvailableGroupings(period: TimePeriod): TimePeriodGroupBy[] {
  switch (period) {
    case "all":
      return ["year"];
    case "today":
      return ["hour"];
    case "7days":
      return ["day"];
    case "month":
      return ["day", "week"];
    case "3months":
      return ["week", "month"];
    case "year":
      return ["month", "year"];
    default:
      return ["day"];
  }
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type Props = {
  data:
    | {
        name: string;
        revenue: number;
        reviewCount: number;
      }[]
    | undefined;
  isError: boolean;
  isPending: boolean;
  timePeriod: TimePeriod;
  setTimePeriod: React.Dispatch<React.SetStateAction<TimePeriod>>;
  groupBy: TimePeriodGroupBy;
  setGroupBy: React.Dispatch<React.SetStateAction<TimePeriodGroupBy>>;
  setRevenue: React.Dispatch<React.SetStateAction<number>>;
  setSearchParams: SetURLSearchParams;
};
export default function ReviewGrowthChart({
  data,
  isError,
  isPending,
  timePeriod,
  setTimePeriod,
  groupBy,
  setGroupBy,
  setRevenue,
  setSearchParams,
}: Props) {
  const [weeksGroup, setWeeksGroup] = useState<Record<string, string>>({});

  function groupWeeksWithName(startDate: Date, endDate: Date) {
    const weeks: Record<string, string> = {};

    // Normalize startDate to start of day (to ignore time portion)
    let currentDate = startOfDay(startDate);

    // Find the first Sunday on or after currentDate
    const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday ... 6 = Saturday
    if (dayOfWeek !== 0) {
      // Days to add to reach Sunday (7 - dayOfWeek)
      const daysUntilSunday = 7 - dayOfWeek;
      currentDate = addDays(currentDate, daysUntilSunday);
    }

    let weekNum = 1;
    while (isBefore(currentDate, endDate) || isEqual(currentDate, endDate)) {
      const weekLabel = `week${weekNum}`;
      const iso = currentDate.toISOString();
      weeks[iso] = weekLabel;
      currentDate = addDays(currentDate, 7);
      weekNum++;
    }
    setWeeksGroup(weeks);
  }

  function nameFormatter(dateStr: string, groupBy: TimePeriodGroupBy): string {
    const date = new Date(dateStr);

    switch (groupBy) {
      case "hour": {
        // Format as '2:00', '3:00', etc.
        const hour = date.getHours();
        return `${hour}:00`;
      }

      case "day": {
        // Format as 'DD/MM' (e.g., 30/09)
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are 0-indexed
        return `${monthNames[month]} ${day} `;
      }

      case "week": {
        // Optional: Week number or day name
        return weeksGroup[dateStr];
      }

      case "month": {
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${month} ${year}`;
      }

      case "year": {
        return date.getFullYear().toString();
      }

      default:
        return dateStr;
    }
  }

  useEffect(() => {
    if (groupBy === TIME_PERIOD_GROUP_BY.WEEK) {
      const now = new Date();

      let start: Date;
      const end = endOfDay(now);
      if (timePeriod === TIME_PERIOD.MONTH) {
        start = startOfDay(subMonths(now, 1));
      } else {
        start = startOfDay(subMonths(now, 3));
      }
      groupWeeksWithName(start, end);
    }
    setSearchParams({
      timePeriod,
      timePeriodGroupBy: groupBy,
    });
  }, [timePeriod, groupBy, setSearchParams]);

  const availableGroupings = getAvailableGroupings(timePeriod);

  const handleTimePeriodChange = (newPeriod: TimePeriod) => {
    setTimePeriod(newPeriod);
    const newAvailableGroupings = getAvailableGroupings(newPeriod);
    if (!newAvailableGroupings.includes(groupBy)) {
      setGroupBy(newAvailableGroupings[0]);
    }
  };

  const chartConfig = {
    revenue: {
      label: "Total Revenue",
      color: "hsl(var(--chart-1))",
    },
    reviewCount: {
      label: "Review Count",
      color: "hsl(var(--chart-2))",
    },
  };

  if (isPending) {
    return <div>Loading</div>;
  }
  if (isError || !data) {
    return <div>Error</div>;
  }

  let revenue = 0;
  const chartData = data.map((d) => {
    revenue += d.revenue;
    return { ...d, name: nameFormatter(d.name, groupBy) };
  });
  setRevenue(revenue);

  return (
    <Card className="bg-card border-border w-full rounded-lg overflow-hidden">
      {/* Header with filters */}
      <div className="border-b border-border px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-chart-1" />
            <h3 className="text-lg font-semibold text-foreground">
              Review Growth
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Time Period Filter */}
            <div className="flex gap-1 bg-muted p-1 rounded-md">
              {(Object.keys(timePeriodLabels) as TimePeriod[]).map((period) => (
                <button
                  key={period}
                  onClick={() => handleTimePeriodChange(period)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                    timePeriod === period
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {timePeriodLabels[period]}
                </button>
              ))}
            </div>

            {/* Group By Filter */}
            {availableGroupings.length > 1 && (
              <div className="flex gap-1 bg-muted p-1 rounded-md">
                {availableGroupings.map((group) => (
                  <button
                    key={group}
                    onClick={() => setGroupBy(group)}
                    className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                      groupBy === group
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {groupByLabels[group]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-6">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart
            data={chartData!}
            margin={{ top: 20, right: 40, bottom: 20, left: 0 }}
          >
            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff0000" />
                <stop offset="100%" stopColor="#000" />
              </linearGradient>

              <linearGradient id="reviewGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0387ce" />
                <stop offset="100%" stopColor="#00" />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-muted"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />

            {/* Dual Y-Axis */}
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />

            <Tooltip content={<ChartTooltipContent />} />

            {/* Revenue Bar */}
            <Bar
              yAxisId="left"
              dataKey="revenue"
              fill="url(#revenueGradient)"
              radius={[4, 4, 0, 0]}
            />
            {/* Review Count Bar */}
            <Bar
              yAxisId="right"
              dataKey="reviewCount"
              fill="url(#reviewGradient)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-chart-1" />
            <span className="text-sm text-muted-foreground">Total Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-chart-3" />
            <span className="text-sm text-muted-foreground">Review Count</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
