// =============================================================================
// Greg Moore Construction — Command Center Demo Data
// =============================================================================

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type ProjectStatus = 'permitting' | 'building' | 'complete' | 'on_hold';
export type ProjectType = 'Custom Home' | 'Remodel' | 'Commercial TI';
export type BudgetStatus = 'complete' | 'in_progress' | 'pending';
export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';
export type ActivityType = 'update' | 'milestone' | 'budget' | 'file' | 'message';
export type ChangeOrderStatus = 'pending' | 'approved' | 'rejected';

export interface Project {
  id: string;
  name: string;
  client: string;
  type: ProjectType;
  status: ProjectStatus;
  phase: string;
  budget: number;
  spent: number;
  pm: string;
  startDate: string;
  targetDate: string;
  progress: number;
  address: string;
}

export interface BudgetCategory {
  name: string;
  estimated: number;
  actual: number;
  status: BudgetStatus;
}

export interface Milestone {
  id: string;
  name: string;
  date: string;
  completed: boolean;
  projectId: string;
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  assignee: string;
  projectId: string;
  priority: TaskPriority;
}

export interface Activity {
  id: string;
  message: string;
  user: string;
  timestamp: string;
  type: ActivityType;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

export interface FileItem {
  id: string;
  name: string;
  category: string;
  date: string;
  size: string;
  projectId: string;
}

export interface ChangeOrder {
  id: string;
  title: string;
  amount: number;
  status: ChangeOrderStatus;
  projectId: string;
  date: string;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
}

// -----------------------------------------------------------------------------
// Projects
// -----------------------------------------------------------------------------

export const projects: Project[] = [
  {
    id: 'bloemhof',
    name: 'Bloemhof Residence',
    client: 'The Bloemhof Family',
    type: 'Custom Home',
    status: 'building',
    phase: 'Rough-In',
    budget: 1200000,
    spent: 780000,
    pm: 'Ryan Ouimette',
    startDate: '2025-06-15',
    targetDate: '2026-08-30',
    progress: 65,
    address: 'San Luis Obispo, CA',
  },
  {
    id: 'crestmont',
    name: '380 Crestmont Drive',
    client: 'Anderson Family',
    type: 'Custom Home',
    status: 'building',
    phase: 'Framing',
    budget: 890000,
    spent: 445000,
    pm: 'Ryan Ouimette',
    startDate: '2025-09-01',
    targetDate: '2026-11-15',
    progress: 50,
    address: '380 Crestmont Dr, SLO',
  },
  {
    id: 'ventura',
    name: 'Ventura Whole-Home Remodel',
    client: 'Rick & Tracie Ventura',
    type: 'Remodel',
    status: 'building',
    phase: 'Finish Work',
    budget: 420000,
    spent: 357000,
    pm: 'Greg Moore',
    startDate: '2025-03-10',
    targetDate: '2026-04-15',
    progress: 85,
    address: 'San Luis Obispo, CA',
  },
  {
    id: 'commercial-ti',
    name: 'SLO Downtown TI',
    client: 'Pacific Coast Properties',
    type: 'Commercial TI',
    status: 'permitting',
    phase: 'Permitting',
    budget: 185000,
    spent: 18500,
    pm: 'Ryan Ouimette',
    startDate: '2025-12-01',
    targetDate: '2026-06-30',
    progress: 10,
    address: 'Downtown SLO',
  },
];

// -----------------------------------------------------------------------------
// Archived / Completed Projects
// -----------------------------------------------------------------------------

export interface ArchivedProject {
  id: string;
  name: string;
  client: string;
  type: ProjectType;
  budget: number;
  completedDate: string;
  duration: string;
  testimonial?: string;
  address: string;
}

export const archivedProjects: ArchivedProject[] = [
  {
    id: 'arch-1',
    name: 'Edna Valley Estate',
    client: 'The Harrison Family',
    type: 'Custom Home',
    budget: 1450000,
    completedDate: '2024-11-20',
    duration: '14 months',
    testimonial: 'Greg and his team exceeded every expectation. The attention to detail on the finish carpentry alone was worth every penny.',
    address: 'Edna Valley, CA',
  },
  {
    id: 'arch-2',
    name: 'Pismo Beach Remodel',
    client: 'Mark & Susan Chen',
    type: 'Remodel',
    budget: 385000,
    completedDate: '2024-08-15',
    duration: '8 months',
    testimonial: 'We lived in the house during the remodel and Greg\'s crew made it as painless as possible. Professional, clean, and on schedule.',
    address: 'Pismo Beach, CA',
  },
  {
    id: 'arch-3',
    name: 'SLO Dental Office TI',
    client: 'Dr. Patricia Wells',
    type: 'Commercial TI',
    budget: 220000,
    completedDate: '2024-05-30',
    duration: '4 months',
    testimonial: 'They finished ahead of schedule, which meant we could start seeing patients sooner. The quality of work is outstanding.',
    address: 'San Luis Obispo, CA',
  },
  {
    id: 'arch-4',
    name: 'Los Osos Kitchen & Bath',
    client: 'The Reyes Family',
    type: 'Remodel',
    budget: 165000,
    completedDate: '2024-02-10',
    duration: '5 months',
    testimonial: 'Our kitchen went from a 1980s time capsule to a modern showpiece. Greg\'s budgeting system kept us informed every step of the way.',
    address: 'Los Osos, CA',
  },
  {
    id: 'arch-5',
    name: 'Avila Beach Custom Home',
    client: 'Jim & Carol Patterson',
    type: 'Custom Home',
    budget: 980000,
    completedDate: '2023-09-25',
    duration: '16 months',
    testimonial: 'Building our dream retirement home with Greg was a wonderful experience. His integrity and desire to do every job well always comes through.',
    address: 'Avila Beach, CA',
  },
  {
    id: 'arch-6',
    name: 'Templeton Ranch Addition',
    client: 'The O\'Brien Family',
    type: 'Custom Home',
    budget: 520000,
    completedDate: '2023-04-12',
    duration: '10 months',
    address: 'Templeton, CA',
  },
  {
    id: 'arch-7',
    name: 'Downtown SLO Restaurant TI',
    client: 'Coastal Bites LLC',
    type: 'Commercial TI',
    budget: 310000,
    completedDate: '2023-01-18',
    duration: '6 months',
    testimonial: 'Greg\'s team handled all the permitting headaches and delivered a beautiful space. We\'ve already recommended them to two other business owners.',
    address: 'Downtown SLO',
  },
  {
    id: 'arch-8',
    name: 'Morro Bay Earthquake Retrofit',
    client: 'The Nakamura Family',
    type: 'Remodel',
    budget: 95000,
    completedDate: '2022-10-05',
    duration: '3 months',
    address: 'Morro Bay, CA',
  },
];

// -----------------------------------------------------------------------------
// Budget Categories (Bloemhof Residence)
// -----------------------------------------------------------------------------

export const bloemhofBudget: BudgetCategory[] = [
  { name: 'Site Work',         estimated:  85000, actual:  82000, status: 'complete' },
  { name: 'Foundation',        estimated: 145000, actual: 148500, status: 'complete' },
  { name: 'Framing',           estimated: 195000, actual: 190000, status: 'complete' },
  { name: 'Roofing',           estimated:  65000, actual:  63500, status: 'complete' },
  { name: 'Plumbing',          estimated:  78000, actual:  72000, status: 'in_progress' },
  { name: 'Electrical',        estimated:  72000, actual:  65000, status: 'in_progress' },
  { name: 'HVAC',              estimated:  55000, actual:  48000, status: 'in_progress' },
  { name: 'Insulation',        estimated:  32000, actual:      0, status: 'pending' },
  { name: 'Drywall',           estimated:  48000, actual:      0, status: 'pending' },
  { name: 'Finish Carpentry',  estimated:  95000, actual:      0, status: 'pending' },
  { name: 'Flooring',          estimated:  68000, actual:      0, status: 'pending' },
  { name: 'Paint',             estimated:  35000, actual:      0, status: 'pending' },
  { name: 'Fixtures',          estimated:  42000, actual:      0, status: 'pending' },
  { name: 'Appliances',        estimated:  38000, actual:      0, status: 'pending' },
  { name: 'Landscaping',       estimated:  65000, actual:      0, status: 'pending' },
  { name: 'Permits & Fees',    estimated:  82000, actual:  78000, status: 'complete' },
];

// -----------------------------------------------------------------------------
// Team Members
// -----------------------------------------------------------------------------

export const team: TeamMember[] = [
  { name: 'Greg Moore',         role: 'Owner / Founder',  avatar: 'GM' },
  { name: 'Ryan Ouimette',      role: 'Project Manager',  avatar: 'RO' },
  { name: 'Tyler Cameron',      role: 'Finish Carpenter', avatar: 'TC' },
  { name: 'Pam Montgomery',     role: 'Office Admin',     avatar: 'PM' },
  { name: 'Allison Klintworth', role: 'Office Manager',   avatar: 'AK' },
];

// -----------------------------------------------------------------------------
// Activities (10 Recent)
// -----------------------------------------------------------------------------

export const activities: Activity[] = [
  {
    id: 'act-1',
    message: 'Plumbing rough-in inspection passed at Bloemhof Residence',
    user: 'Ryan Ouimette',
    timestamp: '2 hours ago',
    type: 'milestone',
  },
  {
    id: 'act-2',
    message: 'Uploaded updated electrical plans for Bloemhof Residence',
    user: 'Pam Montgomery',
    timestamp: '4 hours ago',
    type: 'file',
  },
  {
    id: 'act-3',
    message: 'HVAC ductwork 60% complete at Bloemhof — on schedule',
    user: 'Ryan Ouimette',
    timestamp: '6 hours ago',
    type: 'update',
  },
  {
    id: 'act-4',
    message: 'Change order #CO-102 approved for Ventura kitchen backsplash upgrade',
    user: 'Greg Moore',
    timestamp: 'Yesterday',
    type: 'budget',
  },
  {
    id: 'act-5',
    message: 'Framing crew started second floor at 380 Crestmont Drive',
    user: 'Ryan Ouimette',
    timestamp: 'Yesterday',
    type: 'update',
  },
  {
    id: 'act-6',
    message: 'New message from The Bloemhof Family regarding tile selections',
    user: 'Allison Klintworth',
    timestamp: '2 days ago',
    type: 'message',
  },
  {
    id: 'act-7',
    message: 'Submitted TI permit application for SLO Downtown to city planning',
    user: 'Pam Montgomery',
    timestamp: '2 days ago',
    type: 'update',
  },
  {
    id: 'act-8',
    message: 'Ventura master bath vanity installation complete',
    user: 'Tyler Cameron',
    timestamp: '3 days ago',
    type: 'milestone',
  },
  {
    id: 'act-9',
    message: 'Budget update: Bloemhof electrical actuals tracking $7K under estimate',
    user: 'Allison Klintworth',
    timestamp: '3 days ago',
    type: 'budget',
  },
  {
    id: 'act-10',
    message: 'Uploaded progress photos for 380 Crestmont Drive framing',
    user: 'Ryan Ouimette',
    timestamp: '4 days ago',
    type: 'file',
  },
];

// -----------------------------------------------------------------------------
// Milestones (Bloemhof Residence)
// -----------------------------------------------------------------------------

export const bloemhofMilestones: Milestone[] = [
  {
    id: 'ms-1',
    name: 'Permits Approved',
    date: '2025-06-20',
    completed: true,
    projectId: 'bloemhof',
  },
  {
    id: 'ms-2',
    name: 'Site Prep Complete',
    date: '2025-07-15',
    completed: true,
    projectId: 'bloemhof',
  },
  {
    id: 'ms-3',
    name: 'Foundation Poured',
    date: '2025-08-25',
    completed: true,
    projectId: 'bloemhof',
  },
  {
    id: 'ms-4',
    name: 'Framing Complete',
    date: '2025-11-10',
    completed: true,
    projectId: 'bloemhof',
  },
  {
    id: 'ms-5',
    name: 'Roof Installed',
    date: '2025-12-18',
    completed: true,
    projectId: 'bloemhof',
  },
  {
    id: 'ms-6',
    name: 'Rough-In Inspection',
    date: '2026-03-15',
    completed: false,
    projectId: 'bloemhof',
  },
  {
    id: 'ms-7',
    name: 'Drywall Complete',
    date: '2026-04-20',
    completed: false,
    projectId: 'bloemhof',
  },
  {
    id: 'ms-8',
    name: 'Final Walkthrough',
    date: '2026-08-15',
    completed: false,
    projectId: 'bloemhof',
  },
];

// -----------------------------------------------------------------------------
// Tasks (Bloemhof Residence)
// -----------------------------------------------------------------------------

export const bloemhofTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Complete electrical rough-in for second floor',
    status: 'in_progress',
    assignee: 'Ryan Ouimette',
    projectId: 'bloemhof',
    priority: 'high',
  },
  {
    id: 'task-2',
    title: 'Finish HVAC ductwork in master suite',
    status: 'in_progress',
    assignee: 'Ryan Ouimette',
    projectId: 'bloemhof',
    priority: 'high',
  },
  {
    id: 'task-3',
    title: 'Plumbing pressure test — all zones',
    status: 'in_progress',
    assignee: 'Ryan Ouimette',
    projectId: 'bloemhof',
    priority: 'medium',
  },
  {
    id: 'task-4',
    title: 'Schedule rough-in inspection with county',
    status: 'todo',
    assignee: 'Pam Montgomery',
    projectId: 'bloemhof',
    priority: 'high',
  },
  {
    id: 'task-5',
    title: 'Order insulation materials',
    status: 'todo',
    assignee: 'Allison Klintworth',
    projectId: 'bloemhof',
    priority: 'medium',
  },
  {
    id: 'task-6',
    title: 'Confirm drywall subcontractor start date',
    status: 'todo',
    assignee: 'Ryan Ouimette',
    projectId: 'bloemhof',
    priority: 'medium',
  },
  {
    id: 'task-7',
    title: 'Review tile and flooring selections with client',
    status: 'todo',
    assignee: 'Greg Moore',
    projectId: 'bloemhof',
    priority: 'low',
  },
  {
    id: 'task-8',
    title: 'Foundation waterproofing inspection',
    status: 'done',
    assignee: 'Ryan Ouimette',
    projectId: 'bloemhof',
    priority: 'high',
  },
  {
    id: 'task-9',
    title: 'Install roof flashing and gutters',
    status: 'done',
    assignee: 'Ryan Ouimette',
    projectId: 'bloemhof',
    priority: 'medium',
  },
  {
    id: 'task-10',
    title: 'Frame garage and ADU walls',
    status: 'done',
    assignee: 'Tyler Cameron',
    projectId: 'bloemhof',
    priority: 'high',
  },
];

// -----------------------------------------------------------------------------
// Files (Bloemhof Residence)
// -----------------------------------------------------------------------------

export const bloemhofFiles: FileItem[] = [
  {
    id: 'file-1',
    name: 'Bloemhof_Architectural_Plans_v3.pdf',
    category: 'Plans',
    date: '2025-06-10',
    size: '14.2 MB',
    projectId: 'bloemhof',
  },
  {
    id: 'file-2',
    name: 'Bloemhof_Structural_Engineering.pdf',
    category: 'Plans',
    date: '2025-06-12',
    size: '8.7 MB',
    projectId: 'bloemhof',
  },
  {
    id: 'file-3',
    name: 'Building_Permit_SLO_2025-4821.pdf',
    category: 'Permits',
    date: '2025-06-20',
    size: '1.3 MB',
    projectId: 'bloemhof',
  },
  {
    id: 'file-4',
    name: 'CO-101_Window_Upgrade.pdf',
    category: 'Change Orders',
    date: '2025-10-05',
    size: '420 KB',
    projectId: 'bloemhof',
  },
  {
    id: 'file-5',
    name: 'Bloemhof_Construction_Contract.pdf',
    category: 'Contracts',
    date: '2025-05-28',
    size: '2.1 MB',
    projectId: 'bloemhof',
  },
  {
    id: 'file-6',
    name: 'Framing_Completion_Photos.zip',
    category: 'Photos',
    date: '2025-11-10',
    size: '48.5 MB',
    projectId: 'bloemhof',
  },
  {
    id: 'file-7',
    name: 'Electrical_Plans_Rev2.pdf',
    category: 'Plans',
    date: '2026-02-18',
    size: '5.6 MB',
    projectId: 'bloemhof',
  },
  {
    id: 'file-8',
    name: 'Bloemhof_Spec_Sheet_Finishes.xlsx',
    category: 'Contracts',
    date: '2025-09-14',
    size: '780 KB',
    projectId: 'bloemhof',
  },
];

// -----------------------------------------------------------------------------
// Change Orders
// -----------------------------------------------------------------------------

export const changeOrders: ChangeOrder[] = [
  {
    id: 'CO-101',
    title: 'Upgrade to triple-pane windows throughout',
    amount: 18500,
    status: 'approved',
    projectId: 'bloemhof',
    date: '2025-10-05',
  },
  {
    id: 'CO-103',
    title: 'Add built-in shelving to office and great room',
    amount: 12800,
    status: 'pending',
    projectId: 'bloemhof',
    date: '2026-02-10',
  },
  {
    id: 'CO-102',
    title: 'Kitchen backsplash upgrade to handmade zellige tile',
    amount: 4200,
    status: 'approved',
    projectId: 'ventura',
    date: '2026-02-14',
  },
];

// -----------------------------------------------------------------------------
// Monthly Revenue (Mar 2025 — Feb 2026)
// -----------------------------------------------------------------------------

export const monthlyRevenue: MonthlyRevenue[] = [
  { month: 'Mar 2025', revenue: 165000 },
  { month: 'Apr 2025', revenue: 198000 },
  { month: 'May 2025', revenue: 215000 },
  { month: 'Jun 2025', revenue: 245000 },
  { month: 'Jul 2025', revenue: 278000 },
  { month: 'Aug 2025', revenue: 310000 },
  { month: 'Sep 2025', revenue: 295000 },
  { month: 'Oct 2025', revenue: 325000 },
  { month: 'Nov 2025', revenue: 285000 },
  { month: 'Dec 2025', revenue: 190000 },
  { month: 'Jan 2026', revenue: 235000 },
  { month: 'Feb 2026', revenue: 348000 },
];
