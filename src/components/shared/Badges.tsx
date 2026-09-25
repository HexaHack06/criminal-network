import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getClass = () => {
    switch (status) {
      case 'Active': return 'status-active';
      case 'Under Review': return 'status-review';
      case 'Monitoring': return 'status-monitoring';
      case 'Closed': return 'status-closed';
      default: return 'status-closed';
    }
  };
  const px = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';
  return (
    <span className={`${getClass()} ${px} rounded-full font-semibold`}>{status}</span>
  );
};

interface SeverityBadgeProps {
  severity: string;
  size?: 'sm' | 'md';
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity, size = 'md' }) => {
  const getClass = () => {
    switch (severity) {
      case 'Critical': return 'severity-critical';
      case 'High': return 'severity-high';
      case 'Medium': return 'severity-medium';
      case 'Low': return 'severity-low';
      default: return 'severity-low';
    }
  };
  const px = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';
  return (
    <span className={`${getClass()} ${px} rounded-full font-semibold`}>{severity}</span>
  );
};

interface PriorityBadgeProps {
  priority: string;
  size?: 'sm' | 'md';
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, size = 'md' }) => {
  const getClass = () => {
    switch (priority) {
      case 'Critical': return 'priority-critical';
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return 'priority-low';
    }
  };
  const px = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';
  return (
    <span className={`${getClass()} ${px} rounded-full font-semibold`}>{priority}</span>
  );
};

interface EntityTypeBadgeProps {
  type: string;
  size?: string;
}

export const EntityTypeBadge: React.FC<EntityTypeBadgeProps> = ({ type }) => {
  const styles: Record<string, string> = {
    person: 'bg-blue-50 text-blue-700 border border-blue-200',
    phone: 'bg-green-50 text-green-700 border border-green-200',
    vehicle: 'bg-orange-50 text-orange-700 border border-orange-200',
    location: 'bg-purple-50 text-purple-700 border border-purple-200',
    organization: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
    transaction: 'bg-red-50 text-red-700 border border-red-200',
    'bank account': 'bg-teal-50 text-teal-700 border border-teal-200',
    'digital identifier': 'bg-pink-50 text-pink-700 border border-pink-200',
  };
  const cls = styles[type.toLowerCase()] || 'bg-gray-100 text-gray-600 border border-gray-200';
  return (
    <span className={`${cls} px-2 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wide`}>{type}</span>
  );
};
