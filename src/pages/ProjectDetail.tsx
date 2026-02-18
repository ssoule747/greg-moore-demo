import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  User,
  FileText,
  Image,
  File,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';
import {
  projects,
  bloemhofBudget,
  bloemhofMilestones,
  bloemhofTasks,
  bloemhofFiles,
  changeOrders,
  activities,
} from '../data/demo-data';
import StatusBadge from '../components/StatusBadge';
import ProgressBar from '../components/ProgressBar';
import BudgetChart from '../components/BudgetChart';
import Timeline from '../components/Timeline';
import ActivityFeed from '../components/ActivityFeed';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------

const TABS = ['Overview', 'Timeline', 'Tasks', 'Budget', 'Files'] as const;
type Tab = (typeof TABS)[number];

// ---------------------------------------------------------------------------
// File icon helper
// ---------------------------------------------------------------------------

function fileIcon(category: string) {
  switch (category) {
    case 'Photos':
      return <Image className="h-4 w-4 text-accent" />;
    case 'Plans':
    case 'Permits':
    case 'Contracts':
    case 'Change Orders':
      return <FileText className="h-4 w-4 text-accent" />;
    default:
      return <File className="h-4 w-4 text-text-muted" />;
  }
}

// ---------------------------------------------------------------------------
// Priority badge
// ---------------------------------------------------------------------------

const priorityStyles: Record<string, string> = {
  high: 'bg-danger/10 text-danger',
  medium: 'bg-warning/10 text-warning',
  low: 'bg-success/10 text-success',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<Tab>('Overview');

  const project = projects.find((p) => p.id === id);

  // 404 state
  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <AlertCircle className="h-12 w-12 text-text-muted mb-4" />
        <h2 className="text-xl font-bold text-text-primary">
          Project Not Found
        </h2>
        <p className="mt-2 text-text-secondary">
          The project you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link
          to="/projects"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>
      </div>
    );
  }

  // Data scoped to this project
  const projectMilestones =
    project.id === 'bloemhof' ? bloemhofMilestones : [];
  const projectTasks =
    project.id === 'bloemhof' ? bloemhofTasks : [];
  const projectFiles =
    project.id === 'bloemhof' ? bloemhofFiles : [];
  const projectBudget =
    project.id === 'bloemhof' ? bloemhofBudget : [];
  const projectChangeOrders = changeOrders.filter(
    (co) => co.projectId === project.id,
  );
  const projectActivities = activities.slice(0, 5);

  // Budget roll-ups
  const totalEstimated = projectBudget.reduce((s, c) => s + c.estimated, 0);
  const totalActual = projectBudget.reduce((s, c) => s + c.actual, 0);
  const remaining = project.budget - project.spent;
  const variancePct =
    totalEstimated > 0
      ? (((totalEstimated - totalActual) / totalEstimated) * 100).toFixed(1)
      : '0.0';

  // Tasks grouped by status
  const todoTasks = projectTasks.filter((t) => t.status === 'todo');
  const inProgressTasks = projectTasks.filter((t) => t.status === 'in_progress');
  const doneTasks = projectTasks.filter((t) => t.status === 'done');

  // Files grouped by category
  const fileCategories = projectFiles.reduce<Record<string, typeof projectFiles>>(
    (acc, file) => {
      if (!acc[file.category]) acc[file.category] = [];
      acc[file.category].push(file);
      return acc;
    },
    {},
  );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="space-y-6">
      {/* ------ Header ------ */}
      <div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-text-primary">
            {project.name}
          </h1>
          <StatusBadge status={project.status} />
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-text-secondary">
          <span className="inline-flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            {project.client}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {project.address}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            PM: {project.pm}
          </span>
        </div>
      </div>

      {/* ------ Tab Navigation ------ */}
      <div className="border-b border-border">
        <div className="flex gap-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-accent text-accent'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ------ Tab Content ------ */}

      {/* ========== OVERVIEW ========== */}
      {activeTab === 'Overview' && (
        <div className="space-y-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-4">
            <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
              <p className="text-xs text-text-muted">Budget</p>
              <p className="mt-1 text-xl font-bold text-text-primary">
                {formatCurrency(project.budget)}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
              <p className="text-xs text-text-muted">Spent</p>
              <p className="mt-1 text-xl font-bold text-text-primary">
                {formatCurrency(project.spent)}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
              <p className="text-xs text-text-muted">Progress</p>
              <p className="mt-1 text-xl font-bold text-text-primary">
                {project.progress}%
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
              <p className="text-xs text-text-muted">Target Date</p>
              <p className="mt-1 text-xl font-bold text-text-primary">
                {formatDate(project.targetDate)}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <ProgressBar value={project.progress} label="Overall Completion" />

          {/* Two-column: Details + Activity */}
          <div className="grid grid-cols-2 gap-6">
            {/* Key Details */}
            <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-text-primary mb-4">
                Key Details
              </h3>
              <dl className="space-y-3 text-sm">
                {[
                  ['Type', project.type],
                  ['Phase', project.phase],
                  ['Project Manager', project.pm],
                  ['Start Date', formatDate(project.startDate)],
                  ['Target Date', formatDate(project.targetDate)],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <dt className="text-text-secondary">{label}</dt>
                    <dd className="font-medium text-text-primary">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Recent Activity */}
            <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-text-primary mb-4">
                Recent Activity
              </h3>
              <ActivityFeed activities={projectActivities} />
            </div>
          </div>
        </div>
      )}

      {/* ========== TIMELINE ========== */}
      {activeTab === 'Timeline' && (
        <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-text-primary mb-6">
            Project Milestones
          </h3>
          {projectMilestones.length > 0 ? (
            <Timeline milestones={projectMilestones} />
          ) : (
            <div className="py-12 text-center text-text-muted">
              <Calendar className="mx-auto h-10 w-10 mb-3" />
              <p className="text-sm">
                Timeline milestones coming soon for this project.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ========== TASKS ========== */}
      {activeTab === 'Tasks' && (
        <>
          {projectTasks.length > 0 ? (
            <div className="grid grid-cols-3 gap-6">
              {/* To Do */}
              <div className="rounded-xl border border-border bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                  <h3 className="text-sm font-semibold text-text-primary">
                    To Do
                  </h3>
                  <span className="rounded-full bg-bg-secondary px-2.5 py-0.5 text-xs font-medium text-text-secondary">
                    {todoTasks.length}
                  </span>
                </div>
                <div className="space-y-3 p-4">
                  {todoTasks.map((task) => (
                    <div
                      key={task.id}
                      className="rounded-lg border border-border bg-bg-secondary p-3"
                    >
                      <p className="text-sm font-medium text-text-primary">
                        {task.title}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-text-muted">
                          {task.assignee}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityStyles[task.priority]}`}
                        >
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* In Progress */}
              <div className="rounded-xl border border-border bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                  <h3 className="text-sm font-semibold text-text-primary">
                    In Progress
                  </h3>
                  <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                    {inProgressTasks.length}
                  </span>
                </div>
                <div className="space-y-3 p-4">
                  {inProgressTasks.map((task) => (
                    <div
                      key={task.id}
                      className="rounded-lg border border-accent/20 bg-accent/5 p-3"
                    >
                      <p className="text-sm font-medium text-text-primary">
                        {task.title}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-text-muted">
                          {task.assignee}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityStyles[task.priority]}`}
                        >
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Done */}
              <div className="rounded-xl border border-border bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                  <h3 className="text-sm font-semibold text-text-primary">
                    Done
                  </h3>
                  <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
                    {doneTasks.length}
                  </span>
                </div>
                <div className="space-y-3 p-4">
                  {doneTasks.map((task) => (
                    <div
                      key={task.id}
                      className="rounded-lg border border-border bg-bg-secondary p-3 opacity-75"
                    >
                      <p className="text-sm font-medium text-text-primary line-through">
                        {task.title}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-text-muted">
                          {task.assignee}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityStyles[task.priority]}`}
                        >
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-white py-12 text-center shadow-sm">
              <CheckCircle2 className="mx-auto h-10 w-10 text-text-muted mb-3" />
              <p className="text-sm text-text-muted">
                No tasks have been created for this project yet.
              </p>
            </div>
          )}
        </>
      )}

      {/* ========== BUDGET ========== */}
      {activeTab === 'Budget' && (
        <div className="space-y-6">
          {/* Summary Row */}
          <div className="grid grid-cols-4 gap-4">
            <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs text-text-muted mb-1">
                <DollarSign className="h-3.5 w-3.5" />
                Total Budget
              </div>
              <p className="text-xl font-bold text-text-primary">
                {formatCurrency(project.budget)}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs text-text-muted mb-1">
                <TrendingUp className="h-3.5 w-3.5" />
                Total Spent
              </div>
              <p className="text-xl font-bold text-text-primary">
                {formatCurrency(project.spent)}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs text-text-muted mb-1">
                <DollarSign className="h-3.5 w-3.5" />
                Remaining
              </div>
              <p
                className={`text-xl font-bold ${
                  remaining >= 0 ? 'text-success' : 'text-danger'
                }`}
              >
                {formatCurrency(remaining)}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs text-text-muted mb-1">
                <TrendingUp className="h-3.5 w-3.5" />
                Variance
              </div>
              <p
                className={`text-xl font-bold ${
                  Number(variancePct) >= 0 ? 'text-success' : 'text-danger'
                }`}
              >
                {Number(variancePct) >= 0 ? '+' : ''}
                {variancePct}%
              </p>
            </div>
          </div>

          {/* Budget Chart */}
          {projectBudget.length > 0 ? (
            <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-text-primary mb-4">
                Budget by Category
              </h3>
              <BudgetChart categories={projectBudget} />
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-white py-12 text-center shadow-sm">
              <DollarSign className="mx-auto h-10 w-10 text-text-muted mb-3" />
              <p className="text-sm text-text-muted">
                Detailed budget breakdown not yet available for this project.
              </p>
            </div>
          )}

          {/* Change Orders */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-text-primary mb-4">
              Change Orders
            </h3>
            {projectChangeOrders.length > 0 ? (
              <div className="overflow-hidden rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-bg-secondary text-text-secondary">
                      <th className="px-4 py-3 text-left font-medium">ID</th>
                      <th className="px-4 py-3 text-left font-medium">
                        Title
                      </th>
                      <th className="px-4 py-3 text-right font-medium">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left font-medium">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {projectChangeOrders.map((co) => (
                      <tr key={co.id} className="hover:bg-bg-secondary/50">
                        <td className="px-4 py-3 font-medium text-text-primary">
                          {co.id}
                        </td>
                        <td className="px-4 py-3 text-text-primary">
                          {co.title}
                        </td>
                        <td className="px-4 py-3 text-right font-medium text-text-primary">
                          {formatCurrency(co.amount)}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={co.status} />
                        </td>
                        <td className="px-4 py-3 text-text-secondary">
                          {formatDate(co.date)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="py-6 text-center text-sm text-text-muted">
                No change orders for this project.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ========== FILES ========== */}
      {activeTab === 'Files' && (
        <div className="space-y-6">
          {Object.keys(fileCategories).length > 0 ? (
            Object.entries(fileCategories).map(([category, categoryFiles]) => (
              <div
                key={category}
                className="rounded-xl border border-border bg-white p-6 shadow-sm"
              >
                <h3 className="text-sm font-semibold text-text-primary mb-4">
                  {category}
                </h3>
                <div className="divide-y divide-border">
                  {categoryFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                    >
                      {fileIcon(file.category)}
                      <span className="flex-1 text-sm font-medium text-text-primary">
                        {file.name}
                      </span>
                      <span className="text-xs text-text-muted">
                        {formatDate(file.date)}
                      </span>
                      <span className="text-xs text-text-muted w-20 text-right">
                        {file.size}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-border bg-white py-12 text-center shadow-sm">
              <File className="mx-auto h-10 w-10 text-text-muted mb-3" />
              <p className="text-sm text-text-muted">
                No files have been uploaded for this project yet.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
