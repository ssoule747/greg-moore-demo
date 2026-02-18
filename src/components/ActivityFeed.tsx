interface Activity {
  id: string;
  message: string;
  user: string;
  timestamp: string;
  type: "update" | "milestone" | "budget" | "file" | "message";
}

interface ActivityFeedProps {
  activities: Activity[];
}

const dotColors: Record<Activity["type"], string> = {
  update: "bg-accent",
  milestone: "bg-success",
  budget: "bg-warning",
  file: "bg-blue-500",
  message: "bg-purple-500",
};

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="divide-y divide-border">
      {activities.map((activity) => (
        <div key={activity.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
          <div className="mt-1.5 shrink-0">
            <div
              className={`h-2.5 w-2.5 rounded-full ${dotColors[activity.type] ?? "bg-bg-secondary"}`}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm text-text-primary">
              <span className="font-medium">{activity.user}</span>{" "}
              {activity.message}
            </p>
            <p className="mt-0.5 text-xs text-text-muted">
              {activity.timestamp}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
