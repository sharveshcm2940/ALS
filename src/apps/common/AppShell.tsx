import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  ArrowLeft,
  RotateCcw,
  Bell,
  Search,
  CheckCircle2,
  ExternalLink,
  Shield,
  User,
  ChevronDown,
} from 'lucide-react';
import { ALSLogo, ALSSymbol } from '../../components/ALSLogo';
import { EASINGS } from '../../components/animations/motionVariants';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string | number;
}

interface AppShellProps {
  appName: string;
  appNameShort?: string;
  appCategory: string;
  appVersion?: string;
  navItems: NavItem[];
  activeTab: string;
  onTabChange: (id: string) => void;
  onResetData: () => void;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ComponentType<{ size?: number; className?: string }>;
  };
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  appName,
  appNameShort,
  appCategory,
  appVersion = 'v2.4.0',
  navItems,
  activeTab,
  onTabChange,
  onResetData,
  primaryAction,
  children,
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Automated Ledger Sync Verified',
      time: '12m ago',
      read: false,
    },
    {
      id: '2',
      title: 'Monthly Snapshot Generated',
      time: '2h ago',
      read: true,
    },
    {
      id: '3',
      title: 'Scheduled Audit Protocol Passed',
      time: '1d ago',
      read: true,
    },
  ]);

  const activeNavItem = navItems.find((item) => item.id === activeTab) || navItems[0];

  const handleResetConfirm = () => {
    onResetData();
    setResetModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111111] font-sans flex flex-col antialiased selection:bg-black selection:text-white">
      {/* Top Demo Banner */}
      <aside aria-label="Demo Environment Banner" className="bg-black text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between border-b border-neutral-800 gap-2 font-mono">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="uppercase tracking-wider text-[11px] font-medium text-neutral-300">
            ALS INFONET INTERACTIVE PRODUCT DEMO &middot; {appName.toUpperCase()}
          </span>
          <span className="hidden sm:inline text-neutral-600">|</span>
          <span className="hidden sm:inline text-neutral-400 text-[11px]">
            Commercial Software Architecture &middot; Local State Active
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setResetModalOpen(true)}
            className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-neutral-300 hover:text-white transition-colors border border-neutral-700 hover:border-neutral-500 px-2 py-0.5 cursor-pointer font-mono"
            title="Reset demonstration data to factory defaults"
          >
            <RotateCcw size={11} />
            <span>Reset Demo Data</span>
          </button>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 px-2.5 py-0.5 transition-colors font-mono cursor-pointer"
          >
            <ArrowLeft size={11} />
            <span>Back to Corporate Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Layout Shell */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Left Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[#EAEAEA] shrink-0 justify-between">
          <div>
            {/* Sidebar Brand Header */}
            <div className="p-5 border-b border-[#EAEAEA]">
              <Link to="/" className="flex items-center gap-3 group focus:outline-none">
                <ALSSymbol size={28} inverted={false} />
                <div>
                  <div className="text-sm font-serif font-normal tracking-tight text-black leading-tight">
                    {appName}
                  </div>
                  <div className="text-[10px] text-[#777777] uppercase tracking-wider font-mono">
                    {appCategory}
                  </div>
                </div>
              </Link>
            </div>

            {/* Sidebar Navigation */}
            <nav className="p-3 space-y-1">
              <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#888888]">
                Modules
              </div>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-sans transition-colors rounded-none cursor-pointer ${
                      isActive
                        ? 'bg-black text-white font-medium shadow-xs'
                        : 'text-[#444444] hover:bg-[#F2F2F2] hover:text-black'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} className={isActive ? 'text-white' : 'text-[#777777]'} />
                      <span className="text-left">{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 ${
                          isActive
                            ? 'bg-neutral-800 text-white'
                            : 'bg-[#EAEAEA] text-[#333333]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer User & System Status */}
          <div className="p-4 border-t border-[#EAEAEA] bg-[#FAFAFA]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-mono text-xs font-bold">
                ALS
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-sans font-medium text-black truncate">
                  Enterprise Operator
                </div>
                <div className="text-[10px] text-[#777777] font-mono truncate">
                  Chennai &middot; {appVersion}
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-[#EAEAEA] flex items-center justify-between text-[10px] font-mono text-[#777777]">
              <span>System SLA: 99.98%</span>
              <span className="text-emerald-700 font-semibold">Healthy</span>
            </div>
          </div>
        </aside>

        {/* Right Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Application Header */}
          <header className="bg-white border-b border-[#EAEAEA] sticky top-0 z-30 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
            {/* Mobile Menu Button & Breadcrumb */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                className="md:hidden p-1.5 border border-[#EAEAEA] hover:border-black text-black cursor-pointer"
                aria-label="Open Navigation Drawer"
              >
                <Menu size={18} />
              </button>

              <div className="flex items-center gap-2 text-xs font-sans">
                <span className="text-[#777777] hidden sm:inline">{appName}</span>
                <span className="text-[#777777] hidden sm:inline">/</span>
                <span className="text-black font-semibold uppercase tracking-wider text-[11px] font-mono">
                  {activeNavItem.label}
                </span>
              </div>
            </div>

            {/* Top Bar Actions */}
            <div className="flex items-center gap-3">
              {/* Notifications Toggle */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 border border-[#EAEAEA] hover:border-black text-[#555555] hover:text-black transition-colors relative cursor-pointer"
                  aria-label="View system alerts"
                >
                  <Bell size={15} />
                  {notifications.some((n) => !n.read) && (
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-black rounded-full" />
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white border border-[#EAEAEA] shadow-xl p-3 z-50 text-xs font-sans">
                    <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-2 mb-2 font-mono uppercase text-[10px] tracking-wider text-[#777777]">
                      <span>System Activity Feed</span>
                      <button
                        type="button"
                        onClick={() => setNotificationsOpen(false)}
                        className="text-black hover:underline cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                    <div className="space-y-2">
                      {notifications.map((n) => (
                        <div key={n.id} className="p-2 bg-[#FAFAFA] border border-[#EAEAEA]">
                          <div className="font-medium text-black text-xs">{n.title}</div>
                          <div className="text-[10px] font-mono text-[#777777] mt-0.5">{n.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Contextual Primary Action Button */}
              {primaryAction && (
                <button
                  type="button"
                  onClick={primaryAction.onClick}
                  className="bg-black text-white hover:bg-neutral-800 border border-black px-4 py-2 text-xs font-sans uppercase tracking-[0.14em] font-medium transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  {primaryAction.icon && <primaryAction.icon size={13} />}
                  <span>{primaryAction.label}</span>
                </button>
              )}
            </div>
          </header>

          {/* Animated Page Body Content */}
          <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto space-y-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: EASINGS.smoothOut }}
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>

      {/* Mobile Drawer Navigation with Slide Entrance */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: EASINGS.smoothOut }}
              className="relative w-72 max-w-[85vw] bg-white h-full flex flex-col justify-between z-10 shadow-2xl p-5 border-r border-[#EAEAEA]"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <ALSSymbol size={24} inverted={false} />
                    <div className="text-sm font-serif font-bold text-black">{appName}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1.5 border border-[#EAEAEA] hover:border-black cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          onTabChange(item.id);
                          setMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-sans rounded-none cursor-pointer ${
                          isActive
                            ? 'bg-black text-white font-medium'
                            : 'text-[#444444] hover:bg-[#F2F2F2]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={16} />
                          <span>{item.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-[#EAEAEA] space-y-2 font-sans">
                <button
                  type="button"
                  onClick={() => {
                    setMobileSidebarOpen(false);
                    setResetModalOpen(true);
                  }}
                  className="w-full py-2 text-xs border border-[#EAEAEA] text-[#555555] hover:border-black hover:text-black flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw size={13} />
                  <span>Reset Demo Records</span>
                </button>
                <Link
                  to="/"
                  className="w-full py-2 text-xs bg-black text-white text-center flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft size={13} />
                  <span>Corporate Website</span>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reset Demo Data Confirmation Modal with Spring Entrance */}
      <AnimatePresence>
        {resetModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: EASINGS.smoothOut }}
              className="bg-white border border-[#EAEAEA] max-w-md w-full p-6 shadow-2xl text-black font-sans"
            >
              <div className="flex items-center gap-2.5 text-black mb-3">
                <RotateCcw size={18} />
                <h3 className="text-xl font-normal font-serif">Reset Demonstration Data?</h3>
              </div>
              <p className="text-sm text-[#555555] font-light leading-relaxed mb-6">
                This will restore all sample records (sales, invoices, products, contacts, and tasks)
                to their initial state. Any new entries created during this session will be replaced.
              </p>
              <div className="flex justify-end gap-3 pt-3 border-t border-[#EAEAEA]">
                <button
                  type="button"
                  onClick={() => setResetModalOpen(false)}
                  className="px-4 py-2 border border-[#EAEAEA] hover:border-black text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleResetConfirm}
                  className="px-4 py-2 bg-black text-white hover:bg-neutral-800 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer"
                >
                  Confirm Reset
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
