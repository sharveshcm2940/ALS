export type TaskStatus = 'To Do' | 'In Progress' | 'In Review' | 'Completed';
export type ProjectStatus = 'In Progress' | 'On Track' | 'At Risk' | 'Completed';
export type PriorityLevel = 'High' | 'Medium' | 'Low';

export interface ProjectTask {
  id: string;
  projectId: string;
  title: string;
  description: string;
  assignee: string;
  priority: PriorityLevel;
  dueDate: string;
  status: TaskStatus;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  targetDate: string;
  completed: boolean;
}

export interface ProjectRecord {
  id: string;
  name: string;
  client: string;
  projectManager: string;
  startDate: string;
  dueDate: string;
  priority: PriorityLevel;
  status: ProjectStatus;
  budget: number;
  description: string;
  milestones: ProjectMilestone[];
  teamMembers: string[];
}

export const INITIAL_PROJECTS: ProjectRecord[] = [
  {
    id: 'PRJ-101',
    name: 'Transit Yard Telemetry & Gate Automation Hub',
    client: 'Titan Logistics Corridors Ltd',
    projectManager: 'S. Ramanathan',
    startDate: '2026-08-01',
    dueDate: '2026-11-30',
    priority: 'High',
    status: 'In Progress',
    budget: 2450000,
    description:
      'Centralized dispatch console with offline check-in caching and cryptographic manifest verification across regional hubs.',
    milestones: [
      { id: 'M-1', title: 'Architecture Blueprint & Offline SQLite Schema', targetDate: '2026-08-25', completed: true },
      { id: 'M-2', title: 'Checkpoint Gate Scanning & E-BOL Generator', targetDate: '2026-09-30', completed: true },
      { id: 'M-3', title: 'Multi-Yard Staging & High-Availability Telemetry', targetDate: '2026-10-31', completed: false },
      { id: 'M-4', title: 'Production Handover & Driver Training Walkthrough', targetDate: '2026-11-30', completed: false },
    ],
    teamMembers: ['S. Ramanathan (PM)', 'R. Anand (Lead Engineer)', 'V. Sundaram (Systems)'],
  },
  {
    id: 'PRJ-102',
    name: 'Financial Settlement & Audit Clearing Engine',
    client: 'Bangalore FinEdge Capital Pvt Ltd',
    projectManager: 'C. M. Sharvesh',
    startDate: '2026-07-15',
    dueDate: '2026-10-31',
    priority: 'High',
    status: 'On Track',
    budget: 3800000,
    description:
      'Deterministic batch reconciliation engine matching payment gateway journals against clearing house ledgers in under 45 seconds.',
    milestones: [
      { id: 'M-5', title: 'Rule-Matching Engine & Fee Tolerance Rules', targetDate: '2026-08-15', completed: true },
      { id: 'M-6', title: 'Immutable SHA-256 Audit Digest Archival', targetDate: '2026-09-15', completed: true },
      { id: 'M-7', title: 'Regulatory Export & Statutory Tax Filing API', targetDate: '2026-10-25', completed: true },
    ],
    teamMembers: ['C. M. Sharvesh (PM)', 'P. Meenakshi (Data Engineer)', 'M. Selvam (QA)'],
  },
  {
    id: 'PRJ-103',
    name: 'Work-Order & Quality Inspection Touch Hub',
    client: 'Coimbatore Foundry & Machining Works',
    projectManager: 'S. Ramanathan',
    startDate: '2026-09-01',
    dueDate: '2026-12-15',
    priority: 'Medium',
    status: 'In Progress',
    budget: 1280000,
    description:
      'Touch-optimized terminal application with drawing revision lockout preventing the use of obsolete blueprints on the production floor.',
    milestones: [
      { id: 'M-8', title: 'Drawing Revision Lockout Cloud API', targetDate: '2026-09-25', completed: true },
      { id: 'M-9', title: 'Multi-Point Quality Gate & Gauge Calibration', targetDate: '2026-10-30', completed: false },
      { id: 'M-10', title: 'Shop Floor Tablet Hardware Deployment', targetDate: '2026-11-30', completed: false },
    ],
    teamMembers: ['S. Ramanathan (PM)', 'K. Rajan (Firmware Engineer)'],
  },
  {
    id: 'PRJ-104',
    name: 'Encrypted Document & Legal Records Vault',
    client: 'Apex Health Systems India',
    projectManager: 'C. M. Sharvesh',
    startDate: '2026-08-10',
    dueDate: '2026-11-15',
    priority: 'High',
    status: 'At Risk',
    budget: 1850000,
    description:
      'Zero-knowledge field-level encrypted repository indexing 250,000+ compliance documents with role-gated redaction controls.',
    milestones: [
      { id: 'M-11', title: 'PostgreSQL Full-Text GIN Index Optimization', targetDate: '2026-09-10', completed: true },
      { id: 'M-12', title: 'Field-Level AES-256 Dynamic Redaction Lens', targetDate: '2026-10-15', completed: true },
      { id: 'M-13', title: 'Statutory 7-Year Tax Lock Immutability Audit', targetDate: '2026-11-10', completed: false },
    ],
    teamMembers: ['C. M. Sharvesh (PM)', 'Dr. V. Sundaram (Advisor)', 'R. Anand (Security Lead)'],
  },
];

export const INITIAL_TASKS: ProjectTask[] = [
  {
    id: 'TSK-201',
    projectId: 'PRJ-101',
    title: 'Offline yard checkpoint cache sync validation',
    description: 'Ensure SQLite queue flushes transactions upon telecom reconnect with zero manifest loss.',
    assignee: 'R. Anand',
    priority: 'High',
    dueDate: '2026-10-22',
    status: 'In Progress',
  },
  {
    id: 'TSK-202',
    projectId: 'PRJ-101',
    title: 'Electronic Bill of Lading cryptographic barcode seal',
    description: 'Generate tamper-evident verification token for outward transport trucks.',
    assignee: 'V. Sundaram',
    priority: 'Medium',
    dueDate: '2026-10-24',
    status: 'To Do',
  },
  {
    id: 'TSK-203',
    projectId: 'PRJ-101',
    title: 'Yard 14 Hub sensor calibration',
    description: 'Verify weigh-bridge serial interface telemetry latency is under 150ms.',
    assignee: 'R. Anand',
    priority: 'Medium',
    dueDate: '2026-10-10',
    status: 'Completed',
  },
  {
    id: 'TSK-204',
    projectId: 'PRJ-102',
    title: 'NEFT direct clearing statement parser',
    description: 'Automate MT940 bank statement ingestion format with deterministic ID matching.',
    assignee: 'P. Meenakshi',
    priority: 'High',
    dueDate: '2026-10-18',
    status: 'In Review',
  },
  {
    id: 'TSK-205',
    projectId: 'PRJ-102',
    title: 'Reconciliation batch runtime profiling benchmark',
    description: 'Ensure 10,000 transaction batch completes in under 45 seconds.',
    assignee: 'C. M. Sharvesh',
    priority: 'High',
    dueDate: '2026-10-14',
    status: 'Completed',
  },
  {
    id: 'TSK-206',
    projectId: 'PRJ-103',
    title: 'CAD revision lockout security interceptor',
    description: 'Prevent assembly lines from opening superseded drawings if an approved ECO exists.',
    assignee: 'K. Rajan',
    priority: 'High',
    dueDate: '2026-10-26',
    status: 'In Progress',
  },
  {
    id: 'TSK-207',
    projectId: 'PRJ-103',
    title: 'Touch terminal low-power test on 10-inch hardware',
    description: 'Verify 60fps responsiveness on industrial touch panels under factory ambient temperature.',
    assignee: 'K. Rajan',
    priority: 'Low',
    dueDate: '2026-10-28',
    status: 'To Do',
  },
  {
    id: 'TSK-208',
    projectId: 'PRJ-104',
    title: 'Field-level AES-256 redaction benchmark test',
    description: 'Validate sub-100ms query retrieval while dynamically masking tax and bank numbers.',
    assignee: 'R. Anand',
    priority: 'High',
    dueDate: '2026-10-20',
    status: 'In Progress',
  },
  {
    id: 'TSK-209',
    projectId: 'PRJ-104',
    title: 'External regulator audit trail test sign-off',
    description: 'Third party independent audit penetration test sign-off document assembly.',
    assignee: 'C. M. Sharvesh',
    priority: 'High',
    dueDate: '2026-10-15',
    status: 'Completed',
  },
];

const PROJECT_STORAGE_KEY_PREFIX = 'als_project_desk_';

export const loadProjectDeskData = () => {
  try {
    const p = localStorage.getItem(`${PROJECT_STORAGE_KEY_PREFIX}projects`);
    const t = localStorage.getItem(`${PROJECT_STORAGE_KEY_PREFIX}tasks`);
    return {
      projects: p ? (JSON.parse(p) as ProjectRecord[]) : INITIAL_PROJECTS,
      tasks: t ? (JSON.parse(t) as ProjectTask[]) : INITIAL_TASKS,
    };
  } catch {
    return {
      projects: INITIAL_PROJECTS,
      tasks: INITIAL_TASKS,
    };
  }
};

export const saveProjectDeskData = (data: {
  projects: ProjectRecord[];
  tasks: ProjectTask[];
}) => {
  try {
    localStorage.setItem(`${PROJECT_STORAGE_KEY_PREFIX}projects`, JSON.stringify(data.projects));
    localStorage.setItem(`${PROJECT_STORAGE_KEY_PREFIX}tasks`, JSON.stringify(data.tasks));
  } catch (err) {
    console.error('Failed to save Project Desk data', err);
  }
};

export const resetProjectDeskData = () => {
  try {
    localStorage.removeItem(`${PROJECT_STORAGE_KEY_PREFIX}projects`);
    localStorage.removeItem(`${PROJECT_STORAGE_KEY_PREFIX}tasks`);
  } catch {}
};
