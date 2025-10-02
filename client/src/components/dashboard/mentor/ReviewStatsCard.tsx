import { Card } from "@/components/ui/card"
import { TrendingUp, Clock, CheckCircle2, Calendar } from "lucide-react"

export default function ReviewStatsCard({
  revenue,
  todayCount,
  totalReviewCount,
  pendingCount,
  completedCount,
  rescheduledCount,
}: {
  revenue:number,
  todayCount: number
  totalReviewCount: number
  pendingCount: number
  completedCount: number
  rescheduledCount: number
}) {
  return (
    <Card className="bg-card border-border w-full  rounded-lg overflow-hidden mb-6">
      {/* Header Section */}
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Today's Scheduled Reviews</h3>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-bold text-foreground tabular-nums">{todayCount}</span>
              <span className="text-sm text-muted-foreground">reviews</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Revenue</h3>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-bold text-foreground tabular-nums">{revenue}</span>
              <span className="text-sm text-muted-foreground">Rs</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-accent rounded-md">
            <TrendingUp className="w-4 h-4 text-chart-3" />
            <span className="text-sm font-medium text-accent-foreground">Active</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {/* Total Reviews */}
        <div className="group px-6 py-5 border-r border-b lg:border-b-0 border-border hover:bg-accent/50 transition-colors duration-200">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total</span>
            <TrendingUp className="w-4 h-4 text-chart-1 opacity-60" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground tabular-nums">{totalReviewCount}</span>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">All reviews</div>
        </div>

        {/* Pending */}
        <div className="group px-6 py-5 border-b lg:border-r lg:border-b-0 border-border hover:bg-accent/50 transition-colors duration-200">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Pending</span>
            <Clock className="w-4 h-4 text-chart-2 opacity-60" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-chart-2 tabular-nums">{pendingCount}</span>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">Awaiting review</div>
        </div>

        {/* Completed */}
        <div className="group px-6 py-5 border-r border-border hover:bg-accent/50 transition-colors duration-200">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-chart-3 opacity-60" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-chart-3 tabular-nums">{completedCount}</span>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">Finished today</div>
        </div>

        {/* Rescheduled */}
        <div className="group px-6 py-5 hover:bg-accent/50 transition-colors duration-200">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Rescheduled</span>
            <Calendar className="w-4 h-4 text-chart-4 opacity-60" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-chart-4 tabular-nums">{rescheduledCount}</span>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">Moved to later</div>
        </div>
      </div>
    </Card>
  )
}
