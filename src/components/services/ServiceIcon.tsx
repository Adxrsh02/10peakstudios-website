import {
  BarChart3,
  Brain,
  Briefcase,
  Building2,
  CheckCircle2,
  Cloud,
  EyeOff,
  Factory,
  FileEdit,
  Gauge,
  Globe,
  GraduationCap,
  KeyRound,
  Layers,
  Lock,
  MailCheck,
  MessageCircleQuestion,
  MessageSquare,
  MousePointerClick,
  RefreshCw,
  Rocket,
  Search,
  SearchCheck,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Stethoscope,
  Utensils,
  Zap,
} from 'lucide-react';
import type { ServiceAccentTone, ServiceIconName } from '@/content/services/types';

const ICON_MAP = {
  globe: Globe,
  layers: Layers,
  gauge: Gauge,
  'eye-off': EyeOff,
  'mouse-pointer-click': MousePointerClick,
  smartphone: Smartphone,
  'search-check': SearchCheck,
  'message-square': MessageSquare,
  'file-edit': FileEdit,
  lock: Lock,
  'bar-chart-3': BarChart3,
  search: Search,
  brain: Brain,
  'message-circle-question': MessageCircleQuestion,
  sparkles: Sparkles,
  rocket: Rocket,
  'building-2': Building2,
  utensils: Utensils,
  'shopping-bag': ShoppingBag,
  stethoscope: Stethoscope,
  'graduation-cap': GraduationCap,
  briefcase: Briefcase,
  factory: Factory,
  'shield-check': ShieldCheck,
  cloud: Cloud,
  'mail-check': MailCheck,
  'key-round': KeyRound,
  'refresh-cw': RefreshCw,
  'check-circle-2': CheckCircle2,
  zap: Zap,
} as const;

export function ServiceIcon({ name, className }: { name: ServiceIconName; className?: string }) {
  const Icon = ICON_MAP[name];
  return <Icon className={className} strokeWidth={1.6} aria-hidden="true" />;
}

const ACCENT_STYLES: Record<
  ServiceAccentTone,
  { badge: string; text: string; bar: string; dot: string; border: string }
> = {
  violet: {
    badge: 'bg-[rgb(142_33_252/0.2)] border-[rgb(195_139_255/0.35)] text-[#c38bff]',
    text: 'text-[#c38bff]',
    bar: 'from-[#480bb4] to-[#a743f8]',
    dot: 'bg-[#c38bff] border-[#c38bff]',
    border: 'border-[#c38bff]/40',
  },
  lilac: {
    badge: 'bg-[rgb(167_67_248/0.2)] border-[rgb(167_67_248/0.38)] text-[#e1c4ff]',
    text: 'text-[#e1c4ff]',
    bar: 'from-[#8e21fc] to-[#c38bff]',
    dot: 'bg-[#a743f8] border-[#a743f8]',
    border: 'border-[#a743f8]/40',
  },
  cyan: {
    badge: 'bg-[rgb(76_215_246/0.16)] border-[rgb(76_215_246/0.35)] text-[#4cd7f6]',
    text: 'text-[#4cd7f6]',
    bar: 'from-[#8e21fc] via-[#a743f8] to-[#4cd7f6]',
    dot: 'bg-[#4cd7f6] border-[#4cd7f6]',
    border: 'border-[#4cd7f6]/40',
  },
};

export function getServiceAccent(tone: ServiceAccentTone) {
  return ACCENT_STYLES[tone];
}
