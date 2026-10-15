import React from 'react';
import { CheckCircle2, Clock, Calendar, Award, XCircle, AlertCircle } from 'lucide-react';

export const StatusBadge = ({ status, size = "md" }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'Accepted':
        return {
          icon: <Award className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />,
          label: 'Selected & Offer Sent',
          className: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-600/10'
        };
      case 'Interview Scheduled':
        return {
          icon: <Calendar className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />,
          label: 'Interview Round',
          className: 'bg-purple-50 text-purple-700 border-purple-200 ring-purple-600/10'
        };
      case 'Under Review':
        return {
          icon: <Clock className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />,
          label: 'Under Review',
          className: 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-600/10'
        };
      case 'Rejected':
        return {
          icon: <XCircle className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />,
          label: 'Not Selected',
          className: 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-600/10'
        };
      case 'Applied':
      default:
        return {
          icon: <CheckCircle2 className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />,
          label: 'Applied',
          className: 'bg-sky-50 text-sky-700 border-sky-200 ring-sky-600/10'
        };
    }
  };

  const config = getBadgeConfig();
  const padding = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-xs font-semibold";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ring-1 ring-inset ${padding} ${config.className}`}
    >
      {config.icon}
      <span>{config.label}</span>
    </span>
  );
};
