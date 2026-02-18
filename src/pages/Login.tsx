import { useNavigate } from 'react-router-dom';
import {
  Home,
  Shield,
  ArrowRight,
} from 'lucide-react';

const roles = [
  {
    id: 'admin',
    title: 'Greg Moore',
    subtitle: 'Owner / Admin View',
    description:
      'Full access to the Command Center — dashboard, all projects, analytics, budgets, and team management.',
    icon: Shield,
    path: '/dashboard',
    badge: 'Admin',
  },
  {
    id: 'client',
    title: 'Rick & Tracie',
    subtitle: 'Homeowner / Client View',
    description:
      'See what your clients see — project progress, live budget, photos, updates, messages, and change orders.',
    icon: Home,
    path: '/portal',
    badge: 'Client',
  },
];

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-secondary flex flex-col items-center justify-center p-6">
      {/* Logo & Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-2xl bg-sidebar flex items-center justify-center mx-auto mb-5">
          <span className="text-white font-serif font-bold text-2xl">GM</span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-text-primary">
          Command Center
        </h1>
        <p className="text-text-secondary mt-2 text-sm max-w-md mx-auto">
          Greg Moore Construction — Interactive Demo
        </p>
        <div className="w-12 h-0.5 bg-accent mx-auto mt-4" />
      </div>

      {/* Role cards */}
      <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-5">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <button
              key={role.id}
              onClick={() => navigate(role.path)}
              className="group relative text-left rounded-2xl border border-border bg-white p-7 shadow-sm transition-all hover:shadow-lg hover:border-accent/40 hover:-translate-y-0.5"
            >
              {/* Badge */}
              <span className="absolute top-5 right-5 rounded-full bg-accent/10 px-3 py-1 text-[11px] font-semibold text-accent uppercase tracking-wider">
                {role.badge}
              </span>

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Icon className="w-5 h-5 text-accent" />
              </div>

              {/* Content */}
              <h2 className="text-lg font-serif font-bold text-text-primary group-hover:text-accent transition-colors">
                {role.title}
              </h2>
              <p className="text-xs font-medium text-accent mt-0.5">
                {role.subtitle}
              </p>
              <p className="text-sm text-text-secondary mt-3 leading-relaxed">
                {role.description}
              </p>

              {/* Arrow */}
              <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                Enter <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <p className="text-xs text-text-muted mt-10">
        This is a live demo — no real data is stored or transmitted.
      </p>
    </div>
  );
}
