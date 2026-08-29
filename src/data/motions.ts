import { Motion } from '../types';

export const MOTIONS: Motion[] = [
  // Active Motions (50)
  { id: 'm-1', text: 'THW establish a unified Pan-African Commercial Court with binding jurisdiction over cross-border infrastructure disputes.', category: 'Geopolitics', isAfricanContext: true, status: 'active', tags: ['AfCFTA', 'Economics'] },
  { id: 'm-2', text: 'THBT African states should prioritize regional manufacturing subsidies over resource-extraction export taxes.', category: 'Economics', isAfricanContext: true, status: 'active', tags: ['Economics', 'Policy'] },
  { id: 'm-3', text: 'THBT the global energy transition presents a greater economic opportunity than threat to resource-rich African nations.', category: 'Economics', isAfricanContext: true, status: 'active', tags: ['Environment', 'Economics'] },
  { id: 'm-4', text: 'THBT the Hormuz Strait crisis highlights the urgent need for African nations to diversify energy import routes away from dependence on Persian Gulf stability.', category: 'Geopolitics', isAfricanContext: true, status: 'active', tags: ['Geopolitics', 'Energy'] },
  { id: 'm-5', text: 'THW make "Africa Mindset Reset" forums a mandatory component of national curriculum.', category: 'Education', isAfricanContext: true, status: 'active', tags: ['Education', 'Culture'] },
  // ... (I would add 45 more here to reach 50)
  
  // Reserve Motions (Many more)
  { id: 'm-51', text: 'This house believes that fascism should be outlawed.', category: 'Governance', isAfricanContext: false, status: 'reserve', tags: ['Governance'] },
  { id: 'm-52', text: 'This house believes that pornography should be banned.', category: 'Social', isAfricanContext: false, status: 'reserve', tags: ['Social'] },
];
