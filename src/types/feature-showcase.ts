import type { LucideIcon } from 'lucide-react';

export interface OrbitalNode {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface FeatureBadge {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface ClientCaseStudy {
  id: string;
  title: string;
  category: string;
  metric: string;
  gradient: string;
}

export type VaultSecurityState = 'locked' | 'scanning' | 'unlocked';
