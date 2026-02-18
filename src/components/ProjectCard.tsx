import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import ProgressBar from "./ProgressBar";

interface Project {
  id: string;
  name: string;
  client: string;
  type: string;
  status: string;
  phase: string;
  progress: number;
  budget: number;
  pm: string;
}

interface ProjectCardProps {
  project: Project;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link to={`/projects/${project.id}`}>
      <div className="rounded-xl border border-border bg-white p-5 shadow-sm transition hover:shadow-md">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-text-primary">{project.name}</h3>
          <StatusBadge status={project.status} />
        </div>

        <p className="mt-1 text-sm text-text-secondary">{project.client}</p>

        <div className="mt-4">
          <ProgressBar value={project.progress} />
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
          <span>{formatCurrency(project.budget)}</span>
          <span>{project.pm}</span>
          <span>{project.phase}</span>
        </div>
      </div>
    </Link>
  );
}
