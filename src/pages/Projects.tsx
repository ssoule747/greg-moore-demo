import { useState } from 'react';
import { Search, Archive, Star, Quote, X, Calendar, DollarSign, Clock } from 'lucide-react';
import { projects, archivedProjects, type ArchivedProject } from '../data/demo-data';
import ProjectCard from '../components/ProjectCard';

const STATUS_FILTERS = ['All', 'Building', 'Permitting', 'Complete'] as const;

function formatCurrency(amount: number): string {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(2)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${amount}`;
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [selectedArchived, setSelectedArchived] = useState<ArchivedProject | null>(null);

  const showArchived = activeFilter === 'Complete';

  const filteredProjects = projects.filter((project) => {
    const matchesStatus =
      activeFilter === 'All' || project.status === activeFilter.toLowerCase();
    const matchesSearch =
      search === '' ||
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.client.toLowerCase().includes(search.toLowerCase()) ||
      project.address.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredArchived = archivedProjects.filter((project) => {
    if (!search) return true;
    return (
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.client.toLowerCase().includes(search.toLowerCase()) ||
      project.address.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Projects</h1>
        <p className="text-text-secondary mt-1">
          {activeFilter === 'Complete'
            ? `${filteredArchived.length} completed project${filteredArchived.length !== 1 ? 's' : ''}`
            : `${filteredProjects.length} active project${filteredProjects.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {STATUS_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setSelectedArchived(null);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? 'bg-accent text-white'
                  : 'bg-bg-secondary text-text-secondary border border-border hover:bg-border'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="relative ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-lg border border-border bg-bg-card text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent w-64"
          />
        </div>
      </div>

      {/* Active Projects Grid */}
      {!showArchived && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12 text-text-muted">
              <p className="text-lg">No projects found</p>
              <p className="text-sm mt-1">Try adjusting your filters or search</p>
            </div>
          )}
        </>
      )}

      {/* Archived / Completed Projects */}
      {showArchived && (
        <>
          {/* Archive explainer */}
          <div className="flex items-start gap-3 rounded-xl border border-accent/20 bg-accent/5 p-4">
            <Archive className="w-5 h-5 text-accent mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-text-primary">Project Archive</p>
              <p className="text-sm text-text-secondary mt-0.5">
                Completed projects live here — a permanent record of every build. Click any project to view details, pull testimonials for your website, or share with prospective clients.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredArchived.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedArchived(project)}
                className="text-left rounded-xl border border-border bg-white p-5 shadow-sm transition hover:shadow-md hover:border-accent/30 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors">
                    {project.name}
                  </h3>
                  <span className="shrink-0 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    Complete
                  </span>
                </div>
                <p className="mt-1 text-sm text-text-secondary">{project.client}</p>
                <div className="mt-3 flex items-center gap-4 text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    {formatCurrency(project.budget)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {project.duration}
                  </span>
                </div>
                <p className="mt-2 text-xs text-text-muted">{project.address}</p>
                {project.testimonial && (
                  <div className="mt-3 flex items-center gap-1 text-xs text-accent font-medium">
                    <Star className="w-3 h-3 fill-current" />
                    Has testimonial
                  </div>
                )}
              </button>
            ))}
          </div>

          {filteredArchived.length === 0 && (
            <div className="text-center py-12 text-text-muted">
              <p className="text-lg">No completed projects found</p>
              <p className="text-sm mt-1">Try adjusting your search</p>
            </div>
          )}
        </>
      )}

      {/* Archived Project Detail Modal */}
      {selectedArchived && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedArchived(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedArchived(null)}
              className="absolute top-4 right-4 rounded-lg p-1.5 text-text-muted hover:bg-bg-secondary hover:text-text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <Archive className="w-5 h-5 text-accent" />
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">Archived Project</span>
            </div>

            <h2 className="text-xl font-bold text-text-primary mt-2">
              {selectedArchived.name}
            </h2>
            <p className="text-text-secondary text-sm mt-1">{selectedArchived.client}</p>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-bg-secondary p-3">
                <p className="text-xs text-text-muted flex items-center gap-1">
                  <DollarSign className="w-3 h-3" /> Budget
                </p>
                <p className="text-lg font-bold text-text-primary mt-1">
                  {formatCurrency(selectedArchived.budget)}
                </p>
              </div>
              <div className="rounded-lg bg-bg-secondary p-3">
                <p className="text-xs text-text-muted flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Duration
                </p>
                <p className="text-lg font-bold text-text-primary mt-1">
                  {selectedArchived.duration}
                </p>
              </div>
              <div className="rounded-lg bg-bg-secondary p-3">
                <p className="text-xs text-text-muted flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Completed
                </p>
                <p className="text-sm font-medium text-text-primary mt-1">
                  {new Date(selectedArchived.completedDate).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div className="rounded-lg bg-bg-secondary p-3">
                <p className="text-xs text-text-muted">Type</p>
                <p className="text-sm font-medium text-text-primary mt-1">
                  {selectedArchived.type}
                </p>
              </div>
            </div>

            {selectedArchived.testimonial && (
              <div className="mt-6 rounded-xl border border-accent/20 bg-accent/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Quote className="w-4 h-4 text-accent" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">Client Testimonial</span>
                </div>
                <p className="text-sm text-text-primary italic leading-relaxed">
                  "{selectedArchived.testimonial}"
                </p>
                <p className="text-xs text-text-muted mt-3">— {selectedArchived.client}</p>
              </div>
            )}

            {!selectedArchived.testimonial && (
              <div className="mt-6 rounded-xl border border-border border-dashed p-5 text-center">
                <Star className="w-5 h-5 text-text-muted mx-auto mb-2" />
                <p className="text-sm text-text-muted">No testimonial yet</p>
                <p className="text-xs text-text-muted mt-1">Send a review request to this client</p>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button className="flex-1 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-hover transition-colors">
                Share as Testimonial
              </button>
              <button className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-text-secondary hover:bg-bg-secondary transition-colors">
                View Full Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
