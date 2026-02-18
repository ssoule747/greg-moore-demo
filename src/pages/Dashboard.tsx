import { FolderKanban, DollarSign, Clock, FileText } from 'lucide-react';
import { projects, activities } from '../data/demo-data';
import StatCard from '../components/StatCard';
import ProjectCard from '../components/ProjectCard';
import ActivityFeed from '../components/ActivityFeed';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary mt-1">Welcome back, Greg</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Active Projects"
          value="4"
          icon={FolderKanban}
          subtitle="2 on schedule"
        />
        <StatCard
          title="Total Budget"
          value="$2.70M"
          icon={DollarSign}
          subtitle="Across all projects"
        />
        <StatCard
          title="On Schedule"
          value="75%"
          icon={Clock}
          trend="up"
          subtitle="3 of 4 projects"
        />
        <StatCard
          title="Change Orders"
          value="2"
          icon={FileText}
          subtitle="1 pending approval"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Active Projects */}
        <div className="col-span-2">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Active Projects
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Recent Activity
          </h2>
          <ActivityFeed activities={activities.slice(0, 8)} />
        </div>
      </div>
    </div>
  );
}
