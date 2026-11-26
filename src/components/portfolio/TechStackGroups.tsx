import {
  BrainCircuit,
  Cloud,
  Database,
  Monitor,
  Rocket,
  Server,
  Settings2,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import type { TechStackGroup } from '@/lib/portfolio/schema';

type GroupMeta = {
  key: keyof TechStackGroup;
  label: string;
  icon: LucideIcon;
};

const GROUPS: GroupMeta[] = [
  { key: 'frontend', label: 'Frontend', icon: Monitor },
  { key: 'backend', label: 'Backend', icon: Server },
  { key: 'aiMl', label: 'AI / ML', icon: BrainCircuit },
  { key: 'database', label: 'Database & Data', icon: Database },
  { key: 'cloud', label: 'Cloud', icon: Cloud },
  { key: 'deployment', label: 'Deployment', icon: Rocket },
  { key: 'devops', label: 'DevOps', icon: Settings2 },
  { key: 'tools', label: 'Tools & Methods', icon: Wrench },
];

export function TechStackGroups({ techStack }: { techStack: TechStackGroup }) {
  const populated = GROUPS.filter((g) => techStack[g.key].length > 0);
  if (populated.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {populated.map(({ key, label, icon: Icon }) => (
        <div
          key={key}
          className="flex flex-col gap-3 rounded-md border border-border bg-surface-sunken p-5"
        >
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="grid size-8 place-items-center rounded-sm border border-border bg-background text-brand-accent"
            >
              <Icon className="size-4" strokeWidth={1.75} />
            </span>
            <h3 className="font-heading text-small font-semibold text-foreground">{label}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {techStack[key].map((item) => (
              <span
                key={item}
                className="rounded-pill border border-border bg-background px-3 py-1 text-caption font-medium text-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
