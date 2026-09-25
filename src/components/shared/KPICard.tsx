import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface KPICardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
  accentColor?: string; // e.g. '#2563eb', '#9333ea', '#10b981', '#f59e0b', '#06b6d4'
  trend?: number;
  subtitle?: string;
  onClick?: () => void;
}

export const KPICard: React.FC<KPICardProps> = ({
  label,
  value,
  icon,
  iconBg,
  accentColor = '#2563eb',
  trend,
  subtitle,
  onClick,
}) => {
  return (
    <motion.div
      className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_-4px_rgba(15,23,42,0.06)] transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between"
      style={{
        borderLeft: `3.5px solid ${accentColor}`
      }}
      whileHover={{ y: -2 }}
      onClick={onClick}
    >
      {/* Top row: Icon on left, trend badge on right */}
      <div className="flex items-center justify-between">
        <div className={`${iconBg} w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-2xs`}>
          {icon}
        </div>

        {trend !== undefined && (
          <div className={`flex items-center gap-0.5 font-bold text-[11.5px] ${
            trend > 0 ? 'text-emerald-600' : trend < 0 ? 'text-rose-500' : 'text-slate-400'
          }`}>
            {trend > 0 ? <ArrowUpRight size={13} strokeWidth={2.5} /> : trend < 0 ? <ArrowDownRight size={13} strokeWidth={2.5} /> : <Minus size={12} />}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>

      {/* Value and Label */}
      <div className="mt-4">
        <div className="text-[26px] font-extrabold text-slate-900 tracking-tight leading-none">
          {value}
        </div>
        <div className="text-[13px] font-semibold text-slate-700 mt-1.5">
          {label}
        </div>
        {subtitle && (
          <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
            {subtitle}
          </div>
        )}
      </div>
    </motion.div>
  );
};

interface StatRowProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

export const StatRow: React.FC<StatRowProps> = ({ label, value, icon }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
    <div className="flex items-center gap-2 text-sm text-slate-600">
      {icon && <span className="text-slate-400">{icon}</span>}
      {label}
    </div>
    <span className="font-semibold text-slate-900 text-sm">{value}</span>
  </div>
);
