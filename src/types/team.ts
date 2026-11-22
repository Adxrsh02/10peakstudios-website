export type TeamDiscipline = 'business' | 'engineering' | 'finance-legal';

export interface TeamMemberLinks {
  linkedin?: string;
  portfolio?: string;
  twitter?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  discipline: TeamDiscipline;
  bio: string;
  shortBio: string;
  image: string;
  links: TeamMemberLinks;
  order: number;
}
