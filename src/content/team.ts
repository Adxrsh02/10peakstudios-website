import type { TeamMember } from '@/types/team';

export const DISCIPLINE_LABELS: Record<string, string> = {
  all: 'All',
  business: 'Business',
  engineering: 'Engineering',
  'finance-legal': 'Finance & Legal',
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'adarsh-korade',
    name: 'Adarsh Korade',
    role: 'AI & ML Specialist | Tech Team Lead',
    discipline: 'engineering',
    bio: 'Specializes in artificial intelligence and machine learning, building intelligent solutions that automate processes, improve user experiences and help businesses use emerging technologies to work smarter. Also leads the full-stack technology team at 10PeakStudio.',
    shortBio:
      'Architects production AI/ML systems and leads the full-stack technology team at 10PeakStudio.',
    image:
      'https://res.cloudinary.com/lta722n4/image/upload/c_fill,g_face,ar_4:5/v1795339160/Adarsh_AI.png',
    links: {
      linkedin: 'https://www.linkedin.com/in/adarshkorade/',
      portfolio: 'https://adarsh-korade-portfolio.vercel.app/',
    },
    order: 1,
  },
  {
    id: 'rutik-bhoir',
    name: 'Rutik Bhoir',
    role: 'Sales & Marketing Specialist',
    discipline: 'business',
    bio: 'Leads business strategy, marketing and operations at 10PeakStudio. Focuses on understanding client requirements, building growth strategies, generating opportunities and making sure every project delivers meaningful business results.',
    shortBio:
      'Drives marketing, business strategy, and client growth across every studio engagement.',
    image:
      'https://res.cloudinary.com/lta722n4/image/upload/c_fill,g_face,ar_4:5/v1795339156/Rutik_marketing.jpg',
    links: {
      linkedin: 'https://www.linkedin.com/in/rutik-bhoir-ab34a3254/',
    },
    order: 2,
  },
  {
    id: 'gaurish-kale',
    name: 'Gaurish Kale',
    role: 'AI & Machine Learning Engineer',
    discipline: 'engineering',
    bio: 'Builds and trains machine learning models and the data pipelines behind them. Turns AI prototypes into reliable, production-ready features that integrate cleanly with client products.',
    shortBio:
      'Builds, trains, and integrates reliable machine learning models and data pipelines for client products.',
    image:
      'https://res.cloudinary.com/lta722n4/image/upload/c_fill,g_face,ar_4:5/v1795340221/Gaurish_ML.png',
    links: {
      linkedin: 'https://www.linkedin.com/in/gaurishkale16/',
    },
    order: 3,
  },
  {
    id: 'om-kshirsagar',
    name: 'Om Kshirsagar',
    role: 'Software Engineer | Frontend Specialist',
    discipline: 'engineering',
    bio: 'Builds fast, accessible and polished user interfaces at 10PeakStudio. Turns designs into responsive, production-ready frontends with clean code, smooth interactions and strong performance on every device.',
    shortBio:
      'Crafts high-performance, polished, and accessible user interfaces across web and mobile platforms.',
    image:
      'https://res.cloudinary.com/lta722n4/image/upload/c_fill,g_face,ar_4:5/v1795339156/Om_software.jpg',
    links: {
      linkedin: 'https://www.linkedin.com/in/om-kshirsagar-27575a252/',
    },
    order: 4,
  },
  {
    id: 'aditya-solunke',
    name: 'Aditya Solunke',
    role: 'Finance & Accounts Manager',
    discipline: 'finance-legal',
    bio: 'Oversees financial planning, budgeting and accounting at 10PeakStudio. Manages project finances, tracks expenses, monitors cash flow and keeps financial coordination smooth to support the company’s growth.',
    shortBio:
      'Directs financial planning, budgeting, and accounting operations to ensure sustainable studio growth.',
    image:
      'https://res.cloudinary.com/lta722n4/image/upload/c_fill,g_face,ar_4:5/v1795339159/Aditya_Finance.png',
    links: {
      linkedin: 'https://www.linkedin.com/in/adityasolunke17/',
    },
    order: 5,
  },
  {
    id: 'shruti-vichare',
    name: 'Shruti Vichare',
    role: 'Legal & Compliance Advisor',
    discipline: 'finance-legal',
    bio: 'Oversees legal matters and compliance at 10PeakStudio, making sure operations, client agreements, contracts and partnerships meet applicable legal requirements. Handles legal documentation, regulatory coordination and risk assessment.',
    shortBio:
      'Advises on corporate governance, client agreements, and legal compliance across all studio operations.',
    image:
      'https://res.cloudinary.com/lta722n4/image/upload/c_fill,g_face,ar_4:5/v1795339159/Shruti_legal.png',
    links: {
      linkedin: 'https://www.linkedin.com/in/shruti-vichare-b918851ba/',
    },
    order: 6,
  },
];
