import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  Circle,
  Camera,
  DollarSign,
  Hammer,
  MessageSquare,
  Phone,
  Mail,
  ArrowRight,
  LayoutDashboard,
  Receipt,
  Image,
  Bell,
  Download,
  ChevronRight,
  Send,
  FilePlus,
  Paperclip,
  X,
} from 'lucide-react';
import { projects, bloemhofBudget, bloemhofMilestones, type BudgetCategory, type Milestone } from '../data/demo-data';
import ProgressBar from '../components/ProgressBar';

const venturaProject =
  projects.find((p) => p.name.toLowerCase().includes('ventura')) || projects[0];

const allCategories: BudgetCategory[] = bloemhofBudget;

const totalEstimated = allCategories.reduce((sum: number, c: BudgetCategory) => sum + c.estimated, 0);
const totalActual = allCategories.reduce((sum: number, c: BudgetCategory) => sum + c.actual, 0);
const totalRemaining = totalEstimated - totalActual;

const displayMilestones: Milestone[] = bloemhofMilestones;

type Tab = 'overview' | 'budget' | 'photos' | 'updates' | 'messages';

const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'budget', label: 'Budget', icon: Receipt },
  { id: 'photos', label: 'Photos', icon: Image },
  { id: 'updates', label: 'Updates', icon: Bell },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
];

const messages = [
  {
    id: 1,
    from: 'Greg Moore',
    initials: 'GM',
    isOwner: true,
    text: 'Countertops arriving Thursday. We\'ll have the kitchen usable by end of next week. Let me know if you have any questions about the stone selection.',
    timestamp: 'Feb 17, 2:30 PM',
  },
  {
    id: 2,
    from: 'Rick & Tracie',
    initials: 'R&T',
    isOwner: false,
    text: 'That\'s great news! We went with the Calacatta quartz, right? Also wondering if we can add under-cabinet lighting while the electrician is still on site.',
    timestamp: 'Feb 17, 3:15 PM',
  },
  {
    id: 3,
    from: 'Greg Moore',
    initials: 'GM',
    isOwner: true,
    text: 'Yes, Calacatta quartz — confirmed. Under-cabinet lighting is easy to add now. I\'ll put together a quick change order for the additional electrical. Probably around $600-800.',
    timestamp: 'Feb 17, 4:00 PM',
  },
  {
    id: 4,
    from: 'Rick & Tracie',
    initials: 'R&T',
    isOwner: false,
    text: 'Perfect, go ahead and submit that change order. Totally worth it while everything is open.',
    timestamp: 'Feb 17, 5:10 PM',
  },
  {
    id: 5,
    from: 'Greg Moore',
    initials: 'GM',
    isOwner: true,
    text: 'Done — change order submitted for your approval. You can review and approve it right from the Budget tab. Crew is on track for tomorrow morning.',
    timestamp: 'Feb 17, 5:25 PM',
  },
  {
    id: 6,
    from: 'Ryan Ouimette',
    initials: 'RO',
    isOwner: true,
    text: 'Hi Rick & Tracie — just a heads up, we\'re moving the master bath vanity install to Monday. Tile needs one more day to cure. Everything else on schedule.',
    timestamp: 'Feb 16, 10:00 AM',
  },
];

const progressPhotos = [
  { id: 1, title: 'Kitchen tile installation', date: 'Feb 15, 2026', count: 6 },
  { id: 2, title: 'Hardwood flooring — living room', date: 'Feb 10, 2026', count: 4 },
  { id: 3, title: 'Master bath vanity install', date: 'Feb 5, 2026', count: 8 },
  { id: 4, title: 'Cabinet installation — kitchen', date: 'Jan 28, 2026', count: 5 },
  { id: 5, title: 'Drywall finishing — all rooms', date: 'Jan 15, 2026', count: 12 },
  { id: 6, title: 'Electrical rough-in inspection', date: 'Dec 20, 2025', count: 3 },
  { id: 7, title: 'Framing complete — aerial view', date: 'Nov 30, 2025', count: 7 },
  { id: 8, title: 'Foundation pour', date: 'Sep 10, 2025', count: 4 },
];

const updates = [
  {
    icon: Camera,
    title: 'New photos uploaded',
    description: 'Kitchen tile installation — 6 new photos from today\'s work.',
    timestamp: '2 hours ago',
    type: 'photo' as const,
  },
  {
    icon: CheckCircle,
    title: 'Milestone reached',
    description: 'Finish carpentry is now complete. Moving to paint and fixtures next week.',
    timestamp: '1 day ago',
    type: 'milestone' as const,
  },
  {
    icon: DollarSign,
    title: 'Budget update',
    description: 'Electrical phase closed $7,000 under budget. Running total updated.',
    timestamp: '3 days ago',
    type: 'budget' as const,
  },
  {
    icon: Hammer,
    title: 'Work in progress',
    description: 'Hardwood flooring installation started in living areas and hallway. Expect 5-7 days.',
    timestamp: '5 days ago',
    type: 'update' as const,
  },
  {
    icon: MessageSquare,
    title: 'Message from Greg',
    description: '"Countertops arriving Thursday. We\'ll have the kitchen usable by end of next week."',
    timestamp: '1 week ago',
    type: 'message' as const,
  },
  {
    icon: DollarSign,
    title: 'Change order approved',
    description: 'Upgraded kitchen backsplash tile — additional $2,400 approved and added to budget.',
    timestamp: '1 week ago',
    type: 'budget' as const,
  },
  {
    icon: CheckCircle,
    title: 'Inspection passed',
    description: 'Plumbing rough-in inspection passed with no corrections needed.',
    timestamp: '2 weeks ago',
    type: 'milestone' as const,
  },
  {
    icon: Camera,
    title: 'Weekly report',
    description: 'Your weekly progress summary for Jan 27 – Feb 2 is ready. 4 new photos included.',
    timestamp: '2 weeks ago',
    type: 'photo' as const,
  },
];

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return '$' + (value / 1_000_000).toFixed(2) + 'M';
  return '$' + value.toLocaleString();
}

export default function ClientPortal() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [msgText, setMsgText] = useState('');
  const [showChangeOrder, setShowChangeOrder] = useState(false);
  const [coTitle, setCoTitle] = useState('');
  const [coDescription, setCoDescription] = useState('');
  const [coSubmitted, setCoSubmitted] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <span className="text-white font-serif font-bold text-sm">GM</span>
            </div>
            <h1 className="text-lg font-serif font-semibold text-text-primary">
              Ventura Remodel
            </h1>
            <button
              onClick={() => navigate('/')}
              className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center hover:bg-accent/30 transition-colors"
              title="Switch view"
            >
              <span className="text-accent font-semibold text-sm">R&T</span>
            </button>
          </div>

          {/* Tab navigation */}
          <nav className="flex gap-1 -mb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-accent text-accent'
                      : 'border-transparent text-text-muted hover:text-text-secondary hover:border-border'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto p-8 space-y-8">

        {/* ==================== OVERVIEW TAB ==================== */}
        {activeTab === 'overview' && (
          <>
            {/* Welcome */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-text-primary">
                Welcome, Rick &amp; Tracie
              </h2>
              <p className="text-text-secondary mt-1">
                Here's the latest on your remodel.
              </p>
            </div>

            {/* Progress card */}
            <div className="bg-white border border-border rounded-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h3 className="text-lg font-serif font-semibold text-text-primary">
                    {venturaProject.name}
                  </h3>
                  <p className="text-sm text-text-muted mt-0.5">
                    Current Phase: <span className="text-accent font-medium">Finish Work</span>
                  </p>
                </div>
                <p className="text-sm text-text-muted mt-2 sm:mt-0">
                  Target Completion: <span className="font-medium text-text-primary">{venturaProject.targetDate}</span>
                </p>
              </div>
              <ProgressBar value={85} label="Overall Progress" showPercent />
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => setActiveTab('budget')}
                className="bg-white border border-border rounded-xl p-5 text-left hover:border-accent/30 hover:shadow-sm transition group"
              >
                <DollarSign className="w-5 h-5 text-accent mb-2" />
                <p className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">Live Budget</p>
                <p className="text-xs text-text-muted mt-1">See where every dollar is going</p>
                <ChevronRight className="w-4 h-4 text-text-muted mt-2 group-hover:text-accent transition-colors" />
              </button>
              <button
                onClick={() => setActiveTab('photos')}
                className="bg-white border border-border rounded-xl p-5 text-left hover:border-accent/30 hover:shadow-sm transition group"
              >
                <Camera className="w-5 h-5 text-accent mb-2" />
                <p className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">Progress Photos</p>
                <p className="text-xs text-text-muted mt-1">{progressPhotos.reduce((s, p) => s + p.count, 0)} photos across {progressPhotos.length} sets</p>
                <ChevronRight className="w-4 h-4 text-text-muted mt-2 group-hover:text-accent transition-colors" />
              </button>
              <button
                onClick={() => setActiveTab('updates')}
                className="bg-white border border-border rounded-xl p-5 text-left hover:border-accent/30 hover:shadow-sm transition group"
              >
                <Bell className="w-5 h-5 text-accent mb-2" />
                <p className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">Updates</p>
                <p className="text-xs text-text-muted mt-1">{updates.length} updates this month</p>
                <ChevronRight className="w-4 h-4 text-text-muted mt-2 group-hover:text-accent transition-colors" />
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className="bg-white border border-border rounded-xl p-5 text-left hover:border-accent/30 hover:shadow-sm transition group"
              >
                <MessageSquare className="w-5 h-5 text-accent mb-2" />
                <p className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">Messages</p>
                <p className="text-xs text-text-muted mt-1">Message Greg or submit a change order</p>
                <ChevronRight className="w-4 h-4 text-text-muted mt-2 group-hover:text-accent transition-colors" />
              </button>
            </div>

            {/* Milestones */}
            <div className="bg-white border border-border rounded-xl p-6">
              <h3 className="text-lg font-serif font-semibold text-text-primary mb-4">
                Milestones
              </h3>
              <div className="space-y-3">
                {displayMilestones.map((ms: Milestone) => (
                  <div key={ms.id} className="flex items-start gap-3">
                    {ms.completed ? (
                      <CheckCircle className="w-5 h-5 text-success mt-0.5 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-text-muted mt-0.5 shrink-0" />
                    )}
                    <div className="flex-1 min-w-0 flex items-center justify-between">
                      <p className={`text-sm font-medium ${ms.completed ? 'text-text-muted line-through' : 'text-text-primary'}`}>
                        {ms.name}
                      </p>
                      <p className="text-xs text-text-muted ml-4 shrink-0">{ms.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ==================== BUDGET TAB ==================== */}
        {activeTab === 'budget' && (
          <>
            <div>
              <h2 className="text-2xl font-serif font-bold text-text-primary">
                Live Budget
              </h2>
              <p className="text-text-secondary mt-1">
                Real-time view of your project finances, broken down by building category.
              </p>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-border rounded-xl p-5">
                <p className="text-xs text-text-muted uppercase tracking-wider">Total Budget</p>
                <p className="text-2xl font-bold text-text-primary mt-1">{formatCurrency(totalEstimated)}</p>
              </div>
              <div className="bg-white border border-border rounded-xl p-5">
                <p className="text-xs text-text-muted uppercase tracking-wider">Spent to Date</p>
                <p className="text-2xl font-bold text-text-primary mt-1">{formatCurrency(totalActual)}</p>
                <p className="text-xs text-text-muted mt-1">{((totalActual / totalEstimated) * 100).toFixed(1)}% of budget</p>
              </div>
              <div className="bg-white border border-border rounded-xl p-5">
                <p className="text-xs text-text-muted uppercase tracking-wider">Remaining</p>
                <p className="text-2xl font-bold text-success mt-1">{formatCurrency(totalRemaining)}</p>
                <p className="text-xs text-success mt-1">On track</p>
              </div>
            </div>

            {/* Full category breakdown */}
            <div className="bg-white border border-border rounded-xl p-6">
              <h3 className="text-lg font-serif font-semibold text-text-primary mb-5">
                Budget by Category
              </h3>
              <div className="space-y-5">
                {allCategories.map((cat: BudgetCategory) => {
                  const ratio = cat.estimated > 0 ? (cat.actual / cat.estimated) * 100 : 0;
                  const isOver = cat.actual > cat.estimated;
                  const isComplete = cat.status === 'complete';
                  const isActive = cat.status === 'in_progress';
                  return (
                    <div key={cat.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-text-primary">{cat.name}</span>
                          {isComplete && (
                            <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success uppercase">Complete</span>
                          )}
                          {isActive && (
                            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent uppercase">In Progress</span>
                          )}
                        </div>
                        <span className="text-xs text-text-muted">
                          {formatCurrency(cat.actual)} <span className="text-text-muted/60">of</span> {formatCurrency(cat.estimated)}
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(ratio, 100)}%`,
                            backgroundColor: isOver ? '#B54A4A' : isComplete ? '#4A7C59' : '#8B7355',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total */}
              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-sm font-bold text-text-primary">Total</span>
                <span className="text-sm font-bold text-text-primary">
                  {formatCurrency(totalActual)} of {formatCurrency(totalEstimated)}
                </span>
              </div>
            </div>

            {/* Change orders */}
            <div className="bg-white border border-border rounded-xl p-6">
              <h3 className="text-lg font-serif font-semibold text-text-primary mb-4">
                Change Orders
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-bg-secondary">
                  <div>
                    <p className="text-sm font-medium text-text-primary">Upgraded kitchen backsplash tile</p>
                    <p className="text-xs text-text-muted">Approved Feb 8, 2026</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-text-primary">+$2,400</p>
                    <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">Approved</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-bg-secondary">
                  <div>
                    <p className="text-sm font-medium text-text-primary">Additional outlet locations — kitchen island</p>
                    <p className="text-xs text-text-muted">Approved Jan 15, 2026</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-text-primary">+$850</p>
                    <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">Approved</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ==================== PHOTOS TAB ==================== */}
        {activeTab === 'photos' && (
          <>
            <div>
              <h2 className="text-2xl font-serif font-bold text-text-primary">
                Progress Photos
              </h2>
              <p className="text-text-secondary mt-1">
                Photos from the job site, organized by date. New photos appear automatically as work progresses.
              </p>
            </div>

            <div className="space-y-4">
              {progressPhotos.map((set) => (
                <div
                  key={set.id}
                  className="bg-white border border-border rounded-xl p-5 hover:border-accent/30 hover:shadow-sm transition cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Photo grid placeholder */}
                      <div className="w-16 h-16 rounded-lg bg-bg-secondary flex items-center justify-center shrink-0">
                        <Camera className="w-6 h-6 text-text-muted" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-text-primary">{set.title}</h3>
                        <p className="text-xs text-text-muted mt-0.5">{set.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                        {set.count} photo{set.count !== 1 ? 's' : ''}
                      </span>
                      <button className="rounded-lg p-2 text-text-muted hover:bg-bg-secondary hover:text-accent transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Placeholder image strip */}
                  <div className="mt-3 flex gap-2">
                    {Array.from({ length: Math.min(set.count, 4) }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 h-20 rounded-lg bg-bg-secondary"
                        style={{
                          background: `linear-gradient(135deg, #F7F5F2 0%, #E5E0DA ${40 + i * 15}%, #F7F5F2 100%)`,
                        }}
                      />
                    ))}
                    {set.count > 4 && (
                      <div className="flex-1 h-20 rounded-lg bg-bg-secondary flex items-center justify-center">
                        <span className="text-xs font-semibold text-text-muted">+{set.count - 4}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-text-muted text-center">
              Photos are uploaded by the crew from the job site and appear here automatically.
              You can download any set to share with friends and family.
            </p>
          </>
        )}

        {/* ==================== UPDATES TAB ==================== */}
        {activeTab === 'updates' && (
          <>
            <div>
              <h2 className="text-2xl font-serif font-bold text-text-primary">
                Project Updates
              </h2>
              <p className="text-text-secondary mt-1">
                Everything happening on your project — milestones, budget changes, photos, and messages from the team.
              </p>
            </div>

            <div className="space-y-4">
              {updates.map((update, idx) => {
                const Icon = update.icon;
                const dotColor =
                  update.type === 'milestone' ? 'bg-success' :
                  update.type === 'budget' ? 'bg-warning' :
                  update.type === 'photo' ? 'bg-blue-500' :
                  update.type === 'message' ? 'bg-purple-500' :
                  'bg-accent';
                return (
                  <div key={idx} className="bg-white border border-border rounded-xl p-5 flex items-start gap-4">
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 rounded-xl bg-bg-secondary flex items-center justify-center">
                        <Icon className="w-5 h-5 text-text-secondary" />
                      </div>
                      <div className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ${dotColor} ring-2 ring-white`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-text-primary">{update.title}</h3>
                        <span className="text-xs text-text-muted ml-3 shrink-0">{update.timestamp}</span>
                      </div>
                      <p className="text-sm text-text-secondary mt-1 leading-relaxed">{update.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-xl p-5 text-center">
              <Bell className="w-5 h-5 text-accent mx-auto mb-2" />
              <p className="text-sm font-medium text-text-primary">You're all caught up</p>
              <p className="text-xs text-text-secondary mt-1">
                You'll get an email and notification here whenever there's a new update on your project.
                Weekly summaries are sent every Friday.
              </p>
            </div>
          </>
        )}

        {/* ==================== MESSAGES TAB ==================== */}
        {activeTab === 'messages' && (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-serif font-bold text-text-primary">
                  Messages
                </h2>
                <p className="text-text-secondary mt-1">
                  Direct line to the Greg Moore Construction team.
                </p>
              </div>
              <button
                onClick={() => { setShowChangeOrder(true); setCoSubmitted(false); setCoTitle(''); setCoDescription(''); }}
                className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
              >
                <FilePlus className="w-4 h-4" />
                Submit Change Order
              </button>
            </div>

            {/* Message thread */}
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${!msg.isOwner ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                      msg.isOwner
                        ? 'bg-accent text-white'
                        : 'bg-accent/20 text-accent'
                    }`}
                  >
                    {msg.initials}
                  </div>
                  <div className={`max-w-[75%] ${!msg.isOwner ? 'text-right' : ''}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-text-primary">{msg.from}</span>
                      <span className="text-xs text-text-muted">{msg.timestamp}</span>
                    </div>
                    <div
                      className={`rounded-xl p-4 text-sm leading-relaxed ${
                        msg.isOwner
                          ? 'bg-white border border-border text-text-primary'
                          : 'bg-accent text-white'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message input */}
            <div className="bg-white border border-border rounded-xl p-4">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={msgText}
                    onChange={(e) => setMsgText(e.target.value)}
                    placeholder="Type a message to Greg Moore Construction..."
                    className="w-full rounded-lg border border-border bg-bg-secondary px-4 py-3 pr-10 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-accent transition-colors">
                    <Paperclip className="w-4 h-4" />
                  </button>
                </div>
                <button className="rounded-lg bg-accent px-4 py-3 text-white hover:bg-accent-hover transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-text-muted mt-2">
                Messages go directly to Greg and his team. Typical response time: within a few hours.
              </p>
            </div>
          </>
        )}

        {/* Change Order Modal */}
        {showChangeOrder && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={() => setShowChangeOrder(false)}
          >
            <div
              className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowChangeOrder(false)}
                className="absolute top-4 right-4 rounded-lg p-1.5 text-text-muted hover:bg-bg-secondary hover:text-text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {!coSubmitted ? (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <FilePlus className="w-5 h-5 text-accent" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                      Change Order Request
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-text-primary mt-2 mb-1">
                    Submit a Change Order
                  </h2>
                  <p className="text-sm text-text-secondary mb-6">
                    Want to add or modify something on your project? Describe the change below and Greg's team will review it and provide a cost estimate.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1.5">
                        What would you like to change?
                      </label>
                      <input
                        type="text"
                        value={coTitle}
                        onChange={(e) => setCoTitle(e.target.value)}
                        placeholder="e.g., Add under-cabinet lighting in kitchen"
                        className="w-full rounded-lg border border-border px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1.5">
                        Details
                      </label>
                      <textarea
                        value={coDescription}
                        onChange={(e) => setCoDescription(e.target.value)}
                        rows={4}
                        placeholder="Any specifics — materials, brands, placement, budget range, etc."
                        className="w-full rounded-lg border border-border px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none"
                      />
                    </div>
                    <div className="rounded-lg bg-bg-secondary p-3">
                      <p className="text-xs text-text-muted">
                        <strong className="text-text-primary">How it works:</strong> Greg's team will review your request, estimate the cost, and send it back for your approval before any work begins. No surprises.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setCoSubmitted(true)}
                      className="flex-1 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
                    >
                      Submit Request
                    </button>
                    <button
                      onClick={() => setShowChangeOrder(false)}
                      className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-text-secondary hover:bg-bg-secondary transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-success" />
                  </div>
                  <h2 className="text-xl font-bold text-text-primary mb-2">Request Submitted</h2>
                  <p className="text-sm text-text-secondary mb-6">
                    Greg's team has been notified. You'll receive a cost estimate and approval request
                    within 1-2 business days — usually sooner.
                  </p>
                  <button
                    onClick={() => setShowChangeOrder(false)}
                    className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contact card — always visible */}
        <div className="bg-white border border-border rounded-xl p-6 text-center">
          <h3 className="text-lg font-serif font-semibold text-text-primary mb-2">
            Questions?
          </h3>
          <p className="text-sm text-text-secondary mb-4">
            Reach out to the Greg Moore Construction team anytime.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <a
              href="tel:+18055412828"
              className="flex items-center gap-2 text-accent hover:text-accent-hover transition-colors"
            >
              <Phone className="w-4 h-4" />
              (805) 541-2828
            </a>
            <a
              href="mailto:greg@gregmooreconstruction.com"
              className="flex items-center gap-2 text-accent hover:text-accent-hover transition-colors"
            >
              <Mail className="w-4 h-4" />
              greg@gregmooreconstruction.com
            </a>
          </div>
        </div>

        {/* Switch view link */}
        <div className="text-center pb-4">
          <Link
            to="/"
            className="text-xs text-text-muted hover:text-accent transition-colors inline-flex items-center gap-1"
          >
            Switch View <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </main>
    </div>
  );
}
