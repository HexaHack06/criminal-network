import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  FolderOpen,
  Network,
  Users,
  FileText,
  Clock,
  Map,
  Database,
  Bell,
  Activity,
  Settings,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: number;
}

const mainNav: NavItem[] = [
  { label: 'Overview', path: '/dashboard', icon: <Home size={18} /> },
  { label: 'Cases', path: '/cases', icon: <FolderOpen size={18} />, badge: 4 },
  { label: 'Network Analysis', path: '/network', icon: <Network size={18} /> },
  { label: 'Entities', path: '/entities', icon: <Users size={18} /> },
  { label: 'Evidence', path: '/evidence', icon: <FileText size={18} /> },
  { label: 'Timeline', path: '/timeline', icon: <Clock size={18} /> },
  { label: 'Map Intelligence', path: '/map', icon: <Map size={18} /> },
  { label: 'Data Sources', path: '/data-ingestion', icon: <Database size={18} /> },
  { label: 'Patterns & Alerts', path: '/patterns', icon: <Bell size={18} />, badge: 6 },
];

const systemNav: NavItem[] = [
  { label: 'Activity Log', path: '/audit', icon: <Activity size={18} /> },
  { label: 'Settings', path: '/settings', icon: <Settings size={18} /> },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 68 : 220 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="bg-white border-r border-slate-100/90 flex flex-col h-full sticky top-0 overflow-hidden z-20 flex-shrink-0 select-none shadow-[1px_0_4px_0_rgba(0,0,0,0.015)]"
    >
      {/* Main Navigation starting directly below Topbar */}
      <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-1">
        {mainNav.map((item) => {
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-150 ${
                active
                  ? 'bg-blue-50/80 text-blue-600 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              } ${isCollapsed ? 'justify-center px-0' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              {/* Left active vertical indicator bar matching image */}
              {active && (
                <div className="absolute left-0 top-2 bottom-2 w-1 bg-blue-600 rounded-r-md" />
              )}

              <span className={`flex-shrink-0 ${active ? 'text-blue-600' : 'text-slate-500'}`}>
                {item.icon}
              </span>

              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex items-center justify-between truncate"
                  >
                    <span>{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="bg-blue-100/70 text-blue-600 text-[11px] font-bold rounded-full px-2 py-0.5 min-w-[20px] text-center">
                        {item.badge}
                      </span>
                    )}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}

        {/* SYSTEM Category Section */}
        <div className="pt-5 pb-1">
          {!isCollapsed && (
            <div className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
              SYSTEM
            </div>
          )}
        </div>

        {systemNav.map((item) => {
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-150 ${
                active
                  ? 'bg-blue-50/80 text-blue-600 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              } ${isCollapsed ? 'justify-center px-0' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              {active && (
                <div className="absolute left-0 top-2 bottom-2 w-1 bg-blue-600 rounded-r-md" />
              )}

              <span className={`flex-shrink-0 ${active ? 'text-blue-600' : 'text-slate-500'}`}>
                {item.icon}
              </span>

              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="truncate"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle at Bottom */}
      <div className="p-3 border-t border-slate-100">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors text-[12px] cursor-pointer"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronRight size={15} className={`transition-transform duration-200 ${isCollapsed ? '' : 'rotate-180'}`} />
          {!isCollapsed && <span>Collapse</span>}
        </button>
      </div>
    </motion.aside>
  );
};
