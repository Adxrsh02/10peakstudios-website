export interface ClientLogo {
  id: string;
  name: string;
  logoUrl: string;
  width: number;
  height: number;
  href?: string;
  description?: string;
}

export interface MarqueeRowProps {
  clients: ClientLogo[];
  direction?: 'left' | 'right';
  speedSeconds?: number;
  pauseOnHover?: boolean;
}
