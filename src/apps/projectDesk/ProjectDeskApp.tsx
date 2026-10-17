import React, { useState, useEffect } from 'react';
import {
  FolderKanban,
  CheckSquare,
  Calendar,
  Layers,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  User,
  Building,
  Flag,
  X,
  Check,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { AppShell, NavItem } from '../common/AppShell';
import {
  ProjectRecord,
  ProjectTask,
  TaskStatus,
  ProjectStatus,
  PriorityLevel,
  loadProjectDeskData,
  saveProjectDeskData,
  resetProjectDeskData,
  INITIAL_PROJECTS,
  INITIAL_TASKS,
} from './projectDeskData';

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Workspace Overview', icon: Layers },
  { id: 'projects', label: 'Project Engagements', icon: FolderKanban },
  { id: 'taskboard', label: 'Task Execution Board', icon: CheckSquare },
  { id: 'calendar', label: 'Milestones & Deadlines', icon: Calendar },
];

const TASK_STATUSES: TaskStatus[] = ['To Do', 'In Progress', 'In Review', 'Completed'];

export const ProjectDeskApp: React.FC = () => {
  const [data, setData] = useState(() => loadProjectDeskData());
  const [activeTab, setActiveTab] = useState('overview');

  // Selected project for deep-dive detail view
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Modals
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

  // Search & filter
  const [projectSearch, setProjectSearch] = useState('');
  const [projectStatusFilter, setProjectStatusFilter] = useState('ALL');
  const [taskBoardProjectFilter, setTaskBoardProjectFilter] = useState('ALL');

  // New Project Form
  const [projectForm, setProjectForm] = useState({
    name: '',
    client: '',
    projectManager: 'S. Ramanathan',
    startDate: new Date().toISOString().split('T')[0],
    dueDate: '2026-12-31',
    priority: 'High' as PriorityLevel,
    budget: '1800000',
    description: '',
  });

  // New Task Form
  const [taskForm, setTaskForm] = useState({
    projectId: data.projects[0]?.id || '',
    title: '',
    description: '',
    assignee: 'R. Anand',
    priority: 'High' as PriorityLevel,
    dueDate: '2026-10-30',
  });

  useEffect(() => {
    saveProjectDeskData(data);
  }, [data]);

  // Dynamic progress calculation helper
  const calculateProjectProgress = (projId: string) => {
    const projTasks = data.tasks.filter((t) => t.projectId === projId);
    if (projTasks.length === 0) return 60; // baseline if no tasks yet
    const completed = projTasks.filter((t) => t.status === 'Completed').length;
    return Math.round((completed / projTasks.length) * 100);
  };

  // Workspace derived metrics
  const activeProjectsCount = data.projects.filter((p) => p.status !== 'Completed').length;
  const completedProjectsCount = data.projects.filter((p) => p.status === 'Completed').length;
  const completedTasksCount = data.tasks.filter((t) => t.status === 'Completed').length;
  const overdueTasksCount = data.tasks.filter(
    (t) => t.status !== 'Completed' && new Date(t.dueDate) < new Date('2026-10-18')
  ).length;
  const overallCompletionRate = Math.round(
    (completedTasksCount / (data.tasks.length || 1)) * 100
  );

  const selectedProject = data.projects.find((p) => p.id === selectedProjectId) || null;

  const handleReset = () => {
    resetProjectDeskData();
    setData({
      projects: INITIAL_PROJECTS,
      tasks: INITIAL_TASKS,
    });
    setSelectedProjectId(null);
  };

  // Move task status
  const handleUpdateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setData((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
    }));
  };

  // Toggle milestone completion
  const handleToggleMilestone = (projId: string, milestoneId: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => {
        if (p.id !== projId) return p;
        return {
          ...p,
          milestones: p.milestones.map((m) =>
            m.id === milestoneId ? { ...m, completed: !m.completed } : m
          ),
        };
      }),
    }));
  };

  // Create Project
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.name.trim() || !projectForm.client.trim()) return;

    const newProj: ProjectRecord = {
      id: `PRJ-${Math.floor(100 + Math.random() * 900)}`,
      name: projectForm.name.trim(),
      client: projectForm.client.trim(),
      projectManager: projectForm.projectManager,
      startDate: projectForm.startDate,
      dueDate: projectForm.dueDate,
      priority: projectForm.priority,
      status: 'In Progress',
      budget: parseFloat(projectForm.budget) || 1000000,
      description: projectForm.description || 'Custom Enterprise Engineering Engagement',
      milestones: [
        { id: `M-${Date.now()}-1`, title: 'Architecture & Technical Blueprint', targetDate: projectForm.startDate, completed: true },
        { id: `M-${Date.now()}-2`, title: 'Core Implementation & UAT', targetDate: projectForm.dueDate, completed: false },
      ],
      teamMembers: [projectForm.projectManager, 'R. Anand (Lead)'],
    };

    // Also add a starter task for this project
    const starterTask: ProjectTask = {
      id: `TSK-${Math.floor(200 + Math.random() * 800)}`,
      projectId: newProj.id,
      title: 'Initial Architecture Scoping & Kickoff',
      description: 'Formalize system boundaries, database schemas, and delivery timeline.',
      assignee: projectForm.projectManager,
      priority: 'High',
      dueDate: projectForm.dueDate,
      status: 'In Progress',
    };

    setData((prev) => ({
      ...prev,
      projects: [newProj, ...prev.projects],
      tasks: [starterTask, ...prev.tasks],
    }));

    setIsCreateProjectOpen(false);
    setProjectForm({
      name: '',
      client: '',
      projectManager: 'S. Ramanathan',
      startDate: new Date().toISOString().split('T')[0],
      dueDate: '2026-12-31',
      priority: 'High',
      budget: '1800000',
      description: '',
    });
  };

  // Create Task
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskForm.title.trim()) return;

    const newTask: ProjectTask = {
      id: `TSK-${Math.floor(200 + Math.random() * 800)}`,
      projectId: taskForm.projectId || data.projects[0]?.id || 'PRJ-101',
      title: taskForm.title.trim(),
      description: taskForm.description || 'Deliverable engineering work order item',
      assignee: taskForm.assignee,
      priority: taskForm.priority,
      dueDate: taskForm.dueDate,
      status: 'To Do',
    };

    setData((prev) => ({
      ...prev,
      tasks: [newTask, ...prev.tasks],
    }));

    setIsCreateTaskOpen(false);
    setTaskForm({
      projectId: data.projects[0]?.id || '',
      title: '',
      description: '',
      assignee: 'R. Anand',
      priority: 'High',
      dueDate: '2026-10-30',
    });
  };

  return (
    <AppShell
      appName="ALS Project Desk"
      appNameShort="Project Desk"
      appCategory="Workspace & Milestone Delivery"
      appVersion="v2.4.0"
      navItems={NAV_ITEMS}
      activeTab={activeTab}
      onTabChange={(tab) => {
        setActiveTab(tab);
        if (tab !== 'projects') setSelectedProjectId(null);
      }}
      onResetData={handleReset}
      primaryAction={
        activeTab === 'taskboard'
          ? {
              label: 'New Task',
              onClick: () => setIsCreateTaskOpen(true),
              icon: Plus,
            }
          : {
              label: 'New Project',
              onClick: () => setIsCreateProjectOpen(true),
              icon: Plus,
            }
      }
    >
      {/* TAB 1: WORKSPACE OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EAEAEA] gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif text-black font-normal">
                Engineering Workspace &amp; Delivery Progress
              </h1>
              <p className="text-xs text-[#777777] font-light mt-0.5">
                Multi-project milestone health, task velocity, and team allocations.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsCreateProjectOpen(true)}
              className="px-3.5 py-1.5 bg-black text-white hover:bg-neutral-800 text-xs font-serif uppercase tracking-wider font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus size={13} />
              <span>Launch Project</span>
            </button>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-[#EAEAEA] p-5 shadow-xs">
              <div className="text-xs font-mono text-[#777777] uppercase tracking-wider">
                Active Engagements
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-normal text-black mt-2">
                {activeProjectsCount} Projects
              </div>
              <div className="text-[11px] text-[#777777] mt-1 font-mono">
                {completedProjectsCount} Handed over to production
              </div>
            </div>

            <div className="bg-white border border-[#EAEAEA] p-5 shadow-xs">
              <div className="text-xs font-mono text-[#777777] uppercase tracking-wider">
                Overall Task Completion
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-normal text-black mt-2">
                {overallCompletionRate}%
              </div>
              <div className="text-[11px] text-emerald-700 mt-1 font-mono font-medium">
                {completedTasksCount} of {data.tasks.length} tasks completed
              </div>
            </div>

            <div className="bg-white border border-[#EAEAEA] p-5 shadow-xs">
              <div className="text-xs font-mono text-[#777777] uppercase tracking-wider">
                Overdue Action Items
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-normal text-black mt-2">
                {overdueTasksCount} Tasks
              </div>
              <div className="text-[11px] text-[#777777] mt-1 font-mono">
                Assigned across Chennai &amp; Bangalore leads
              </div>
            </div>

            <div className="bg-white border border-[#EAEAEA] p-5 shadow-xs">
              <div className="text-xs font-mono text-[#777777] uppercase tracking-wider">
                Active Task Backlog
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-normal text-black mt-2">
                {data.tasks.filter((t) => t.status !== 'Completed').length} Items
              </div>
              <div className="text-[11px] text-[#777777] mt-1 font-mono">
                {data.tasks.filter((t) => t.status === 'In Progress').length} in active execution
              </div>
            </div>
          </div>

          {/* Project Progress Strip & Upcoming Milestones */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Active Projects Status Snapshot */}
            <div className="lg:col-span-7 bg-white border border-[#EAEAEA] p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3 mb-4">
                <h3 className="font-serif font-medium text-base text-black">
                  Active Project Delivery Progress
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('projects')}
                  className="text-xs uppercase font-mono text-black hover:underline cursor-pointer"
                >
                  View Directory &rarr;
                </button>
              </div>

              <div className="space-y-4">
                {data.projects.map((proj) => {
                  const progress = calculateProjectProgress(proj.id);
                  return (
                    <div
                      key={proj.id}
                      onClick={() => {
                        setSelectedProjectId(proj.id);
                        setActiveTab('projects');
                      }}
                      className="p-3 border border-[#EAEAEA] hover:border-black cursor-pointer transition-colors bg-[#FAFAFA]"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-sm font-serif font-medium text-black">
                            {proj.name}
                          </div>
                          <div className="text-[10px] text-[#777777] font-mono">
                            Client: {proj.client} &middot; Lead: {proj.projectManager}
                          </div>
                        </div>
                        <span
                          className={`text-[9px] uppercase font-mono px-2 py-0.5 border ${
                            proj.status === 'Completed'
                              ? 'bg-black text-white border-black'
                              : proj.status === 'At Risk'
                              ? 'bg-neutral-900 text-white border-neutral-900 font-bold'
                              : 'bg-white text-black border-black font-semibold'
                          }`}
                        >
                          {proj.status}
                        </span>
                      </div>

                      <div className="mt-3">
                        <div className="flex justify-between text-[10px] font-mono mb-1 text-[#555]">
                          <span>Progress: {progress}%</span>
                          <span>Due: {proj.dueDate}</span>
                        </div>
                        <div className="w-full bg-[#EAEAEA] h-1.5">
                          <div className="bg-black h-1.5 transition-all duration-300" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Task Deadlines */}
            <div className="lg:col-span-5 bg-white border border-[#EAEAEA] p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3 mb-3">
                  <h3 className="font-serif font-medium text-base text-black">
                    Upcoming Task Deadlines
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('taskboard')}
                    className="text-xs uppercase font-mono text-black hover:underline cursor-pointer"
                  >
                    Taskboard &rarr;
                  </button>
                </div>

                <div className="divide-y divide-[#EAEAEA]">
                  {data.tasks
                    .filter((t) => t.status !== 'Completed')
                    .slice(0, 4)
                    .map((t) => (
                      <div key={t.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="pr-2">
                          <div className="font-serif font-medium text-black">{t.title}</div>
                          <div className="text-[10px] text-[#777777] font-mono">
                            Assignee: {t.assignee} &middot; Priority: {t.priority}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-mono text-[10px] text-black font-medium">{t.dueDate}</div>
                          <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 bg-[#FAFAFA] border">
                            {t.status}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-[#EAEAEA] text-[11px] font-mono text-[#777777] flex justify-between">
                <span>Agile Iteration Sprint 14</span>
                <span className="text-black font-semibold">100% Velocity Tracking</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROJECTS DIRECTORY & DETAIL VIEW */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          {/* If a project is selected for deep dive */}
          {selectedProject ? (
            <div className="space-y-6">
              {/* Breadcrumb Back */}
              <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEA]">
                <button
                  type="button"
                  onClick={() => setSelectedProjectId(null)}
                  className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#777777] hover:text-black cursor-pointer"
                >
                  &larr; Back to All Projects
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase text-[#777777]">Status:</span>
                  <span className="px-2 py-0.5 bg-black text-white text-[10px] font-mono uppercase">
                    {selectedProject.status}
                  </span>
                </div>
              </div>

              {/* Project Header Banner */}
              <div className="bg-white border border-[#EAEAEA] p-6 shadow-xs">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#EAEAEA] pb-4 mb-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#777777] uppercase tracking-widest">
                      {selectedProject.id} &middot; CLIENT: {selectedProject.client.toUpperCase()}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-normal text-black mt-1">
                      {selectedProject.name}
                    </h2>
                    <p className="text-xs text-[#555] font-light mt-1 max-w-2xl leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono text-[#777777] uppercase">Allocated Budget</div>
                    <div className="text-xl font-mono font-bold text-black">
                      ₹{selectedProject.budget.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-[#777777] font-mono mt-0.5">
                      Target Handover: {selectedProject.dueDate}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span>
                      Milestone Execution Progress ({calculateProjectProgress(selectedProject.id)}%)
                    </span>
                    <span className="text-[#777777]">
                      {data.tasks.filter((t) => t.projectId === selectedProject.id && t.status === 'Completed').length} of{' '}
                      {data.tasks.filter((t) => t.projectId === selectedProject.id).length} Tasks Done
                    </span>
                  </div>
                  <div className="w-full bg-[#EAEAEA] h-2">
                    <div
                      className="bg-black h-2 transition-all duration-300"
                      style={{ width: `${calculateProjectProgress(selectedProject.id)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Milestones & Tasks Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Milestones checklist */}
                <div className="lg:col-span-5 bg-white border border-[#EAEAEA] p-5 shadow-xs">
                  <h3 className="font-serif font-medium text-base text-black border-b border-[#EAEAEA] pb-3 mb-4">
                    Architectural Milestones Gate
                  </h3>
                  <div className="space-y-3">
                    {selectedProject.milestones.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => handleToggleMilestone(selectedProject.id, m.id)}
                        className={`p-3 border cursor-pointer transition-colors flex items-start gap-3 ${
                          m.completed
                            ? 'bg-[#FAFAFA] border-[#EAEAEA] text-[#777]'
                            : 'bg-white border-black text-black'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 mt-0.5 border flex items-center justify-center shrink-0 ${
                            m.completed ? 'bg-black text-white border-black' : 'border-black'
                          }`}
                        >
                          {m.completed && <Check size={11} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            className={`text-xs font-serif ${
                              m.completed ? 'line-through text-[#777]' : 'font-medium text-black'
                            }`}
                          >
                            {m.title}
                          </div>
                          <div className="text-[10px] font-mono text-[#888] mt-0.5">
                            Gate Target: {m.targetDate}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Team Members */}
                  <div className="mt-6 pt-4 border-t border-[#EAEAEA]">
                    <span className="text-[10px] uppercase font-mono text-[#777777] block mb-2 font-semibold">
                      Assigned Engineering Pod
                    </span>
                    <div className="space-y-1.5 text-xs font-serif">
                      {selectedProject.teamMembers.map((member, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-black">
                          <span className="w-1.5 h-1.5 bg-black rounded-full" />
                          <span>{member}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tasks for this Project */}
                <div className="lg:col-span-7 bg-white border border-[#EAEAEA] p-5 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3 mb-4">
                    <h3 className="font-serif font-medium text-base text-black">
                      Project Tasks Ledger
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setTaskForm((prev) => ({ ...prev, projectId: selectedProject.id }));
                        setIsCreateTaskOpen(true);
                      }}
                      className="px-2.5 py-1 bg-black text-white hover:bg-neutral-800 text-[10px] font-mono uppercase flex items-center gap-1"
                    >
                      <Plus size={11} />
                      <span>Add Task</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {data.tasks
                      .filter((t) => t.projectId === selectedProject.id)
                      .map((task) => (
                        <div
                          key={task.id}
                          className="p-3 border border-[#EAEAEA] hover:border-black bg-[#FAFAFA] flex items-start justify-between gap-3 text-xs"
                        >
                          <div>
                            <div className="font-serif font-medium text-black">{task.title}</div>
                            <div className="text-[11px] text-[#555] font-light mt-0.5">
                              {task.description}
                            </div>
                            <div className="text-[10px] font-mono text-[#777777] mt-1">
                              Assignee: {task.assignee} &middot; Due: {task.dueDate} &middot; Priority: {task.priority}
                            </div>
                          </div>

                          <div className="shrink-0 flex items-center gap-2">
                            <select
                              value={task.status}
                              onChange={(e) =>
                                handleUpdateTaskStatus(task.id, e.target.value as TaskStatus)
                              }
                              className="font-mono text-[10px] uppercase bg-white border border-[#CCC] px-1.5 py-0.5"
                            >
                              {TASK_STATUSES.map((st) => (
                                <option key={st} value={st}>
                                  {st}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Projects Directory Table
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EAEAEA] gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-serif text-black font-normal">
                    Project Engagements Directory
                  </h1>
                  <p className="text-xs text-[#777777] font-light mt-0.5">
                    Click any project engagement to inspect architectural blueprint, milestones, and tasks.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreateProjectOpen(true)}
                  className="px-3.5 py-1.5 bg-black text-white hover:bg-neutral-800 text-xs font-serif uppercase tracking-wider font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus size={13} />
                  <span>New Project</span>
                </button>
              </div>

              {/* Search & Filter */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 border border-[#EAEAEA]">
                <div className="relative flex-1 min-w-[240px]">
                  <Search size={14} className="absolute left-2.5 top-2.5 text-[#777777]" />
                  <input
                    type="text"
                    placeholder="Search by project name, client, or manager..."
                    value={projectSearch}
                    onChange={(e) => setProjectSearch(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] pl-8 pr-3 py-1.5 text-xs font-serif focus:outline-none focus:border-black"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-mono text-[#777777]">Status:</span>
                  {(['ALL', 'In Progress', 'On Track', 'At Risk', 'Completed'] as const).map(
                    (st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setProjectStatusFilter(st)}
                        className={`px-2.5 py-1 text-[10px] uppercase font-mono border cursor-pointer ${
                          projectStatusFilter === st
                            ? 'bg-black text-white border-black font-semibold'
                            : 'bg-white text-black border-[#EAEAEA] hover:border-black'
                        }`}
                      >
                        {st}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.projects
                  .filter((p) => {
                    const matchesSearch =
                      p.name.toLowerCase().includes(projectSearch.toLowerCase()) ||
                      p.client.toLowerCase().includes(projectSearch.toLowerCase()) ||
                      p.projectManager.toLowerCase().includes(projectSearch.toLowerCase());
                    const matchesStatus =
                      projectStatusFilter === 'ALL' || p.status === projectStatusFilter;
                    return matchesSearch && matchesStatus;
                  })
                  .map((project) => {
                    const progress = calculateProjectProgress(project.id);
                    return (
                      <div
                        key={project.id}
                        onClick={() => setSelectedProjectId(project.id)}
                        className="bg-white border border-[#EAEAEA] hover:border-black p-5 shadow-xs cursor-pointer transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between text-[10px] font-mono text-[#777777] uppercase">
                            <span>{project.id} &middot; {project.client}</span>
                            <span
                              className={`px-1.5 py-0.2 border ${
                                project.status === 'Completed'
                                  ? 'bg-black text-white border-black'
                                  : 'bg-white text-black border-black font-semibold'
                              }`}
                            >
                              {project.status}
                            </span>
                          </div>

                          <h3 className="text-xl font-serif font-normal text-black mt-2 leading-snug">
                            {project.name}
                          </h3>
                          <p className="text-xs text-[#555] font-light mt-1 line-clamp-2">
                            {project.description}
                          </p>
                        </div>

                        <div className="mt-6 pt-3 border-t border-[#EAEAEA]">
                          <div className="flex justify-between text-[10px] font-mono text-[#555] mb-1">
                            <span>Progress ({progress}%)</span>
                            <span>Target: {project.dueDate}</span>
                          </div>
                          <div className="w-full bg-[#EAEAEA] h-1.5 mb-3">
                            <div className="bg-black h-1.5" style={{ width: `${progress}%` }} />
                          </div>

                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-[#777777]">PM: {project.projectManager}</span>
                            <span className="text-black font-semibold flex items-center gap-1 group-hover:underline">
                              <span>Inspect Details</span>
                              <ChevronRight size={13} />
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: TASK EXECUTION BOARD */}
      {activeTab === 'taskboard' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EAEAEA] gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif text-black font-normal">
                Task Execution Kanban Board
              </h1>
              <p className="text-xs text-[#777777] font-light mt-0.5">
                Move tasks across execution phases; completed tasks dynamically update project progress.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsCreateTaskOpen(true)}
              className="px-3.5 py-1.5 bg-black text-white hover:bg-neutral-800 text-xs font-serif uppercase tracking-wider font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus size={13} />
              <span>Create Task</span>
            </button>
          </div>

          {/* Kanban Columns */}
          <div className="flex gap-4 overflow-x-auto pb-4 items-start">
            {TASK_STATUSES.map((status) => {
              const statusTasks = data.tasks.filter((t) => t.status === status);

              return (
                <div
                  key={status}
                  className="w-72 shrink-0 bg-[#F2F2F2] border border-[#EAEAEA] p-3 flex flex-col max-h-[75vh]"
                >
                  <div className="flex items-center justify-between border-b border-[#DDD] pb-2 mb-3">
                    <span className="text-xs font-serif font-bold uppercase tracking-wider text-black">
                      {status}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 bg-white text-black border border-[#DDD]">
                      {statusTasks.length}
                    </span>
                  </div>

                  <div className="space-y-3 overflow-y-auto pr-1">
                    {statusTasks.map((task) => {
                      const proj = data.projects.find((p) => p.id === task.projectId);
                      const currentIdx = TASK_STATUSES.indexOf(task.status);
                      const prevStatus = currentIdx > 0 ? TASK_STATUSES[currentIdx - 1] : null;
                      const nextStatus =
                        currentIdx < TASK_STATUSES.length - 1 ? TASK_STATUSES[currentIdx + 1] : null;

                      return (
                        <div
                          key={task.id}
                          className="bg-white border border-[#DDD] hover:border-black p-3.5 shadow-xs transition-all"
                        >
                          <div className="flex items-start justify-between">
                            <span className="text-[9px] font-mono text-[#777777] uppercase">
                              {task.id} &middot; {proj?.client || 'Internal'}
                            </span>
                            <span
                              className={`text-[8.5px] font-mono uppercase px-1.5 py-0.2 border ${
                                task.priority === 'High'
                                  ? 'bg-neutral-900 text-white border-neutral-900'
                                  : 'bg-white text-black border-[#CCC]'
                              }`}
                            >
                              {task.priority}
                            </span>
                          </div>

                          <h4 className="font-serif font-medium text-sm text-black mt-1 leading-snug">
                            {task.title}
                          </h4>
                          <p className="text-xs text-[#555] font-light mt-1 line-clamp-2">
                            {task.description}
                          </p>

                          <div className="mt-2.5 pt-2 border-t border-[#EAEAEA] flex items-center justify-between text-[10px] text-[#777777] font-mono">
                            <span>Assignee: {task.assignee}</span>
                            <span>Due: {task.dueDate}</span>
                          </div>

                          {/* Quick Advance Controls */}
                          <div className="mt-3 pt-2 border-t border-[#EAEAEA] flex items-center justify-between gap-1">
                            {prevStatus ? (
                              <button
                                type="button"
                                onClick={() => handleUpdateTaskStatus(task.id, prevStatus)}
                                className="px-2 py-0.5 border border-[#DDD] hover:border-black text-[9px] font-mono uppercase cursor-pointer"
                              >
                                &larr; {prevStatus}
                              </button>
                            ) : <div />}

                            {nextStatus && (
                              <button
                                type="button"
                                onClick={() => handleUpdateTaskStatus(task.id, nextStatus)}
                                className="px-2 py-0.5 bg-black text-white hover:bg-neutral-800 text-[9px] font-mono uppercase flex items-center gap-1 cursor-pointer"
                              >
                                <span>{nextStatus}</span>
                                <span>&rarr;</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {statusTasks.length === 0 && (
                      <div className="py-6 text-center text-[#888] text-xs font-serif italic border border-dashed border-[#DDD]">
                        No tasks in this lane
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: CALENDAR & DEADLINES */}
      {activeTab === 'calendar' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EAEAEA] gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif text-black font-normal">
                Milestones &amp; Scheduled Delivery Deadlines
              </h1>
              <p className="text-xs text-[#777777] font-light mt-0.5">
                Chronological timeline of task deadlines and architectural gate deliverables.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#EAEAEA] p-5 shadow-xs">
            <h3 className="font-serif font-medium text-base text-black border-b border-[#EAEAEA] pb-3 mb-4">
              Chronological Sprint Milestones Schedule (Q4 2026)
            </h3>

            <div className="space-y-4">
              {data.tasks
                .slice()
                .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                .map((task) => {
                  const proj = data.projects.find((p) => p.id === task.projectId);
                  return (
                    <div
                      key={task.id}
                      className="p-3.5 border border-[#EAEAEA] bg-[#FAFAFA] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-16 shrink-0 font-mono text-[11px] text-[#777777] pt-0.5">
                          {task.dueDate}
                        </div>
                        <div>
                          <div className="font-serif font-medium text-black text-sm">{task.title}</div>
                          <div className="text-[10px] text-[#777777] font-mono">
                            Project: {proj?.name} &middot; Lead: {task.assignee}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span
                          className={`px-2 py-0.5 text-[9px] uppercase font-mono border ${
                            task.status === 'Completed'
                              ? 'bg-black text-white border-black'
                              : 'bg-white text-black border-black'
                          }`}
                        >
                          {task.status}
                        </span>
                        {task.status !== 'Completed' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateTaskStatus(task.id, 'Completed')}
                            className="px-2 py-1 bg-black text-white hover:bg-neutral-800 text-[10px] font-mono uppercase"
                          >
                            Mark Done
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CREATE PROJECT */}
      {isCreateProjectOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EAEAEA] max-w-lg w-full p-6 shadow-2xl text-black font-serif">
            <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3 mb-4">
              <h3 className="text-xl font-normal">Initiate Project Engagement</h3>
              <button
                type="button"
                onClick={() => setIsCreateProjectOpen(false)}
                className="p-1 hover:bg-[#EAEAEA]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Automated Yard Telemetry & Gate Automation Hub"
                  value={projectForm.name}
                  onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                  className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    Client Organization *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Titan Logistics Ltd"
                    value={projectForm.client}
                    onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    Project Manager
                  </label>
                  <select
                    value={projectForm.projectManager}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, projectManager: e.target.value })
                    }
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                  >
                    <option value="S. Ramanathan">S. Ramanathan (Chennai Lead)</option>
                    <option value="C. M. Sharvesh">C. M. Sharvesh (Principal)</option>
                    <option value="R. Anand">R. Anand (Engineering Lead)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    Target Handover Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={projectForm.dueDate}
                    onChange={(e) => setProjectForm({ ...projectForm, dueDate: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs font-mono focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    Contract Budget (INR)
                  </label>
                  <input
                    type="number"
                    value={projectForm.budget}
                    onChange={(e) => setProjectForm({ ...projectForm, budget: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs font-mono focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                  Architecture Overview / Scope
                </label>
                <textarea
                  rows={2}
                  placeholder="Summary of engineering scope and deliverables..."
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#EAEAEA]">
                <button
                  type="button"
                  onClick={() => setIsCreateProjectOpen(false)}
                  className="px-4 py-2 border border-[#EAEAEA] hover:border-black text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white hover:bg-neutral-800 text-xs uppercase font-medium"
                >
                  Initiate Engagement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE TASK */}
      {isCreateTaskOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EAEAEA] max-w-md w-full p-6 shadow-2xl text-black font-serif">
            <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3 mb-4">
              <h3 className="text-xl font-normal">Add Deliverable Task</h3>
              <button
                type="button"
                onClick={() => setIsCreateTaskOpen(false)}
                className="p-1 hover:bg-[#EAEAEA]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                  Parent Project Engagement
                </label>
                <select
                  value={taskForm.projectId}
                  onChange={(e) => setTaskForm({ ...taskForm, projectId: e.target.value })}
                  className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                >
                  {data.projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SQLite offline queue sync benchmark"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                  Task Description
                </label>
                <input
                  type="text"
                  placeholder="Details of technical deliverables..."
                  value={taskForm.description}
                  onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                  className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    Assignee
                  </label>
                  <select
                    value={taskForm.assignee}
                    onChange={(e) => setTaskForm({ ...taskForm, assignee: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                  >
                    <option value="R. Anand">R. Anand</option>
                    <option value="S. Ramanathan">S. Ramanathan</option>
                    <option value="C. M. Sharvesh">C. M. Sharvesh</option>
                    <option value="V. Sundaram">V. Sundaram</option>
                    <option value="P. Meenakshi">P. Meenakshi</option>
                    <option value="K. Rajan">K. Rajan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={taskForm.dueDate}
                    onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs font-mono focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#EAEAEA]">
                <button
                  type="button"
                  onClick={() => setIsCreateTaskOpen(false)}
                  className="px-4 py-2 border border-[#EAEAEA] hover:border-black text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white hover:bg-neutral-800 text-xs uppercase font-medium"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
};
