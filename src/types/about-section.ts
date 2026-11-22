export interface TabContent {
  id: string;
  tabLabel: string;
  heading: string;
  description: string;
  bulletPoints: string[];
  bannerType: 'orbital-dome' | 'network-matrix' | 'isometric-stack';
}
