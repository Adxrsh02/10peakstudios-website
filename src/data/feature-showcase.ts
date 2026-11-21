import {
  Code2,
  Sparkles,
  ShieldCheck,
  Workflow,
  Cpu,
  Layers,
  Database,
  Search,
} from 'lucide-react';
import type { OrbitalNode, FeatureBadge, ClientCaseStudy } from '@/types/feature-showcase';

export const PILL_BADGES: FeatureBadge[] = [
  { id: 'custom-code', label: 'Bespoke Architecture', icon: Code2 },
  { id: 'ai-workflows', label: 'AI-Powered Workflows', icon: Sparkles },
  { id: 'enterprise-sec', label: 'Enterprise Security', icon: ShieldCheck },
  { id: 'scalable-crm', label: 'Custom CRM & SaaS', icon: Layers },
];

export const ORBITAL_NODES: OrbitalNode[] = [
  { id: 'node-1', label: 'Next.js & React 19', icon: Code2 },
  { id: 'node-2', label: 'Intelligent AI Agents', icon: Cpu },
  { id: 'node-3', label: 'Automated Pipelines', icon: Workflow },
  { id: 'node-4', label: 'Custom CRM Engines', icon: Database },
  { id: 'node-5', label: 'Smart Search & Vector DB', icon: Search },
];

export const CASE_STUDIES: ClientCaseStudy[] = [
  {
    id: 'case-1',
    title: 'Fintech Capital Portal',
    category: 'Custom CRM & SaaS',
    metric: '4.2x Faster Onboarding',
    gradient: 'from-purple-600 via-indigo-600 to-blue-500',
  },
  {
    id: 'case-2',
    title: 'HealthAI Diagnostics',
    category: 'AI Agent System',
    metric: '99.4% Extraction Accuracy',
    gradient: 'from-violet-600 via-purple-500 to-fuchsia-500',
  },
  {
    id: 'case-3',
    title: 'Luxe Real Estate Platform',
    category: 'Full-Stack Web App',
    metric: '+140% Qualified Inquiries',
    gradient: 'from-indigo-600 via-blue-500 to-cyan-400',
  },
  {
    id: 'case-4',
    title: 'Autonomous Supply Flow',
    category: 'Workflow Automation',
    metric: '22 hrs/wk Saved per Rep',
    gradient: 'from-fuchsia-600 via-pink-500 to-rose-400',
  },
  {
    id: 'case-5',
    title: 'Global Mobility Network',
    category: 'Enterprise App',
    metric: 'Sub-40ms Global P99',
    gradient: 'from-purple-700 via-indigo-700 to-violet-600',
  },
  {
    id: 'case-6',
    title: 'Creator Studio Suite',
    category: 'Digital Product Design',
    metric: '$1.8M ARR in 6 Months',
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
  },
];
