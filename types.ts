export interface SectionContent {
  title: string;
  items?: string[];
  description?: string;
}

export interface CaseStudy {
  challenge: string;
  solution: string[];
  results: string[];
}

export interface ServiceData {
  id: string;
  title: string;
  shortDescription: string;
  iconName: 'ShoppingBag' | 'Truck' | 'Settings' | 'Cpu' | 'Handshake' | 'Users';
  intro: string;
  philosophy: {
    text: string;
    pillars: { title: string; description: string }[];
  };
  methodology: {
    title: string;
    sections: {
      subtitle: string;
      points: { title: string; description: string }[];
    }[];
  };
  caseStudy: CaseStudy;
  whyUs: { title: string; description: string }[];
  conclusion: string;
}