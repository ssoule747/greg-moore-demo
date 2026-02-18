import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  ExternalLink,
  Search,
  Bell,
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/projects", icon: FolderKanban, label: "Projects" },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
];

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden bg-bg-primary">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col bg-sidebar">
        {/* Brand */}
        <div className="flex items-center gap-3 px-5 py-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">
            GM
          </div>
          <span className="text-sm font-semibold tracking-wide text-sidebar-active">
            Command Center
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-hover text-sidebar-active"
                    : "text-sidebar-text hover:bg-sidebar-hover hover:text-sidebar-active"
                }`
              }
            >
              <Icon className="h-[18px] w-[18px]" />
              {label}
            </NavLink>
          ))}

          {/* Divider */}
          <div className="!my-4 border-t border-white/10" />

          {/* Client Portal Link */}
          <NavLink
            to="/portal"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sidebar-hover text-sidebar-active"
                  : "text-sidebar-text hover:bg-sidebar-hover hover:text-sidebar-active"
              }`
            }
          >
            <ExternalLink className="h-[18px] w-[18px]" />
            Client Portal
          </NavLink>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-white/10 px-5 py-4">
          <p className="text-xs text-sidebar-text">
            Greg Moore Construction, Inc.
          </p>
          <span className="mt-1.5 inline-block rounded-full bg-accent/20 px-2.5 py-0.5 text-[11px] font-medium text-accent">
            Demo Mode
          </span>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-bg-primary px-8">
          {/* Search */}
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search projects, tasks..."
              className="h-9 w-full rounded-lg border border-border bg-bg-secondary pl-9 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
            />
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-5">
            {/* Notifications */}
            <button className="relative rounded-lg p-2 text-text-secondary transition-colors hover:bg-bg-secondary">
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>

            {/* User */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                GM
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium leading-tight text-text-primary">
                  Greg Moore
                </p>
                <p className="text-xs text-text-muted">Owner</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
