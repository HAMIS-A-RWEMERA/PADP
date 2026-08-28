import React from 'react';
import { ShieldCheck, Sparkles, Globe, MapPin, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { TournamentStatus, VerificationStatus, DebateFormatCode } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'neutral' | 'amber' | 'emerald' | 'blue' | 'purple' | 'rose' | 'slate';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  icon,
  className = '',
}) => {
  const variantStyles = {
    neutral: 'bg-stone-100 text-stone-700 border-stone-200',
    amber: 'bg-amber-50 text-amber-800 border-amber-200/80 font-medium',
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200/80 font-medium',
    blue: 'bg-blue-50 text-blue-800 border-blue-200/80 font-medium',
    purple: 'bg-purple-50 text-purple-800 border-purple-200/80 font-medium',
    rose: 'bg-rose-50 text-rose-800 border-rose-200/80 font-medium',
    slate: 'bg-slate-900 text-slate-100 border-slate-700 font-medium',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 rounded-md gap-1.5',
    md: 'text-xs px-3 py-1 rounded-lg gap-1.5',
  };

  return (
    <span
      className={`inline-flex items-center border font-sans tracking-tight ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="whitespace-nowrap">{children}</span>
    </span>
  );
};

export const FormatBadge: React.FC<{ format: DebateFormatCode | string }> = ({ format }) => {
  const formatMap: Record<string, { label: string; variant: 'blue' | 'amber' | 'purple' | 'emerald' | 'neutral' }> = {
    BP: { label: 'BP (British Parl.)', variant: 'blue' },
    WSDC: { label: 'WSDC (World Schools)', variant: 'emerald' },
    AP: { label: 'AP (Asian Parl.)', variant: 'purple' },
    PF: { label: 'Public Forum', variant: 'amber' },
  };

  const config = formatMap[format] || { label: format, variant: 'neutral' };

  return <Badge variant={config.variant}>{config.label}</Badge>;
};

export const StatusBadge: React.FC<{ status: TournamentStatus }> = ({ status }) => {
  switch (status) {
    case 'Registration Open':
      return (
        <Badge variant="emerald" icon={<Sparkles className="w-3 h-3 text-emerald-600 animate-pulse" />}>
          Registration Open
        </Badge>
      );
    case 'Upcoming':
      return (
        <Badge variant="blue" icon={<Clock className="w-3 h-3" />}>
          Upcoming
        </Badge>
      );
    case 'Registration Closed':
      return (
        <Badge variant="rose" icon={<AlertCircle className="w-3 h-3" />}>
          Reg. Closed
        </Badge>
      );
    case 'Ongoing':
      return (
        <Badge variant="amber" icon={<Sparkles className="w-3 h-3" />}>
          Live / Ongoing
        </Badge>
      );
    case 'Completed':
      return (
        <Badge variant="neutral" icon={<CheckCircle className="w-3 h-3" />}>
          Completed
        </Badge>
      );
    default:
      return <Badge variant="neutral">{status}</Badge>;
  }
};

export const VerifiedBadge: React.FC<{ status: VerificationStatus }> = ({ status }) => {
  if (status === 'verified') {
    return (
      <Badge variant="amber" icon={<ShieldCheck className="w-3.5 h-3.5 text-amber-600 fill-amber-100" />}>
        Verified
      </Badge>
    );
  }
  if (status === 'pending') {
    return (
      <Badge variant="neutral" icon={<Clock className="w-3 h-3 text-stone-500" />}>
        Pending
      </Badge>
    );
  }
  return null;
};
