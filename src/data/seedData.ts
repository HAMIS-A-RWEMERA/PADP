import {
  Tournament,
  DebateSociety,
  DebateFormat,
  Resource,
  PracticeSession,
  Opportunity,
  CountryHub,
  Course,
  Submission,
  User,
} from '../types';

export const SEED_COUNTRIES: CountryHub[] = [
  {
    id: 'rwa',
    name: 'Rwanda',
    isoCode: 'RWA',
    region: 'East Africa',
    flagEmoji: '🇷🇼',
    slug: 'rwanda',
    capitalCity: 'Kigali',
    description: 'A rapidly rising hub for African youth debate, high school WSDC training, and host to major university debate opens across East Africa.',
    activeSocietiesCount: 14,
    upcomingTournamentsCount: 4,
    popularFormats: ['BP', 'WSDC'],
    nationalBodies: ['Rwanda Debate Association (RDA)', 'Kigali Debate League', 'iDebate Rwanda'],
    highlightedDebateEvents: ['Kigali Debate Open', 'East Africa Schools Championship', 'Rwanda National Universities Open']
  },
  {
    id: 'ken',
    name: 'Kenya',
    isoCode: 'KEN',
    region: 'East Africa',
    flagEmoji: '🇰🇪',
    slug: 'kenya',
    capitalCity: 'Nairobi',
    description: 'One of the most decorated competitive circuits in Africa, home to the Great Debaters Contest and top PAUDC champion institutions.',
    activeSocietiesCount: 28,
    upcomingTournamentsCount: 6,
    popularFormats: ['BP', 'WSDC', 'AP'],
    nationalBodies: ['Kenya National Debate Council', 'Nairobi Universities Debating Circuit', 'Great Debaters Initiative'],
    highlightedDebateEvents: ['Nairobi Open', 'East Africa Debate Open', 'Kenya National Universities Championship']
  },
  {
    id: 'uga',
    name: 'Uganda',
    isoCode: 'UGA',
    region: 'East Africa',
    flagEmoji: '🇺🇬',
    slug: 'uganda',
    capitalCity: 'Kampala',
    description: 'A powerhouse of parliamentary debating and historical debating unions with robust institutional support and high competitive rigor.',
    activeSocietiesCount: 22,
    upcomingTournamentsCount: 3,
    popularFormats: ['BP', 'WSDC'],
    nationalBodies: ['Uganda Debate Society', 'National Debate Council Uganda'],
    highlightedDebateEvents: ['Makerere Open', 'Uganda National Debate Championship (UNDC)', 'Kampala Schools Debate League']
  },
  {
    id: 'nga',
    name: 'Nigeria',
    isoCode: 'NGA',
    region: 'West Africa',
    flagEmoji: '🇳🇬',
    slug: 'nigeria',
    capitalCity: 'Abuja / Lagos',
    description: 'The largest university debate circuit in West Africa, with dozens of active university unions and multiple PAUDC championship finalists.',
    activeSocietiesCount: 45,
    upcomingTournamentsCount: 8,
    popularFormats: ['BP', 'AP', 'WSDC'],
    nationalBodies: ['All-Nigeria Universities Debating Championship (ANUDC) Council', 'Nigeria Debate Community'],
    highlightedDebateEvents: ['All-Nigeria Universities Debating Championship', 'Lagos BP Open', 'Calabar Debate Festival']
  },
  {
    id: 'gha',
    name: 'Ghana',
    isoCode: 'GHA',
    region: 'West Africa',
    flagEmoji: '🇬🇭',
    slug: 'ghana',
    capitalCity: 'Accra',
    description: 'Renowned for world-class adjudication standards, high-level high school speech circuits, and top PAUDC championship winning squads.',
    activeSocietiesCount: 20,
    upcomingTournamentsCount: 4,
    popularFormats: ['BP', 'WSDC'],
    nationalBodies: ['Ghana Debate Association', 'Speech & Debate Ghana'],
    highlightedDebateEvents: ['Ghana Universities Debate Championship (GUDC)', 'Legon Open', 'Accra High Schools Cup']
  },
  {
    id: 'zaf',
    name: 'South Africa',
    isoCode: 'ZAF',
    region: 'Southern Africa',
    flagEmoji: '🇿🇦',
    slug: 'south-africa',
    capitalCity: 'Pretoria / Cape Town / Johannesburg',
    description: 'One of the oldest and most established debate ecosystems in the continent, consistently ranking among top teams at WUDC and WSDC.',
    activeSocietiesCount: 35,
    upcomingTournamentsCount: 5,
    popularFormats: ['BP', 'WSDC'],
    nationalBodies: ['South African National Universities Debating Council (SANUDC)', 'South African Schools Debating Board (SASDB)'],
    highlightedDebateEvents: ['SANUDC National Championship', 'UCT Open', 'Wits Debate IV', 'Jozi Open']
  },
  {
    id: 'egy',
    name: 'Egypt',
    isoCode: 'EGY',
    region: 'North Africa',
    flagEmoji: '🇪🇬',
    slug: 'egypt',
    capitalCity: 'Cairo',
    description: 'The premier hub for North African and Arab world debate, bridging English BP and Arabic Parliamentary debate formats.',
    activeSocietiesCount: 16,
    upcomingTournamentsCount: 3,
    popularFormats: ['BP', 'AP', 'WSDC'],
    nationalBodies: ['Egypt Debate Society', 'Cairo Debating Union'],
    highlightedDebateEvents: ['Cairo International Open', 'AUC Debate Tournament', 'Alexandria Novice Cup']
  },
  {
    id: 'tza',
    name: 'Tanzania',
    isoCode: 'TZA',
    region: 'East Africa',
    flagEmoji: '🇹🇿',
    slug: 'tanzania',
    capitalCity: 'Dodoma / Dar es Salaam',
    description: 'An expanding debate landscape engaging universities and schools with strong civic and economic policy debate programs.',
    activeSocietiesCount: 12,
    upcomingTournamentsCount: 2,
    popularFormats: ['BP', 'WSDC'],
    nationalBodies: ['Tanzania Youth Debate Initiative', 'Dar es Salaam Debate Society'],
    highlightedDebateEvents: ['Dar Open', 'Tanzania National Debate Championship']
  },
  {
    id: 'cmr',
    name: 'Cameroon',
    isoCode: 'CMR',
    region: 'Central Africa',
    flagEmoji: '🇨🇲',
    slug: 'cameroon',
    capitalCity: 'Yaoundé',
    description: 'A bilingual debate community active in both Anglophone and Francophone debate tournaments across Central Africa.',
    activeSocietiesCount: 9,
    upcomingTournamentsCount: 2,
    popularFormats: ['BP', 'WSDC'],
    nationalBodies: ['Cameroon Debate Association'],
    highlightedDebateEvents: ['Central Africa Debate Open', 'Yaoundé Youth Cup']
  },
  {
    id: 'zwe',
    name: 'Zimbabwe',
    isoCode: 'ZWE',
    region: 'Southern Africa',
    flagEmoji: '🇿🇼',
    slug: 'zimbabwe',
    capitalCity: 'Harare',
    description: 'Celebrated for powerhouse high school WSDC teams and a passionate parliamentary debate circuit.',
    activeSocietiesCount: 14,
    upcomingTournamentsCount: 3,
    popularFormats: ['WSDC', 'BP'],
    nationalBodies: ['Zimbabwe National Debate Association'],
    highlightedDebateEvents: ['Harare Open', 'Zimbabwe National Schools Championship']
  }
];

export const SEED_FORMATS: DebateFormat[] = [
  {
    id: 'fmt-bp',
    name: 'British Parliamentary (BP)',
    shortCode: 'BP',
    slug: 'british-parliamentary',
    summary: 'The official format of the World Universities Debating Championship (WUDC) and the Pan-African Universities Debating Championship (PAUDC). 4 teams of 2 debaters compete on a 1-to-4 ranking system.',
    speakerCount: 8,
    speechDurationMins: 7,
    poiAllowed: true,
    teamStructure: '4 Teams of 2: Opening Government (OG), Opening Opposition (OO), Closing Government (CG), Closing Opposition (CO).',
    preparationTimeMins: 15,
    scoringScale: 'Standard 50-100 speaker scale with a 75 median. Team ranks: 1st (3 pts), 2nd (2 pts), 3rd (1 pt), 4th (0 pts).',
    adjudicationRules: [
      'Motions are announced 15 minutes prior to the round without internet assistance.',
      'Points of Information (POIs) may be offered between minute 1:00 and minute 6:00 (protected time in minutes 0-1 and 6-7).',
      'Closing teams must deliver a distinct "Extension" that brings new analysis or metrics without contradicting their opening half.',
      'Whips (GW, OW) cannot introduce entirely new constructive arguments; their role is comparative crystallization and weighing.'
    ],
    speakers: [
      { role: 'Prime Minister (PM)', side: 'Gov / Prop', durationMins: 7, description: 'Defines the motion, outlines government model, and sets the primary framework & constructive cases.', keyResponsibilities: ['Define terms & setup context', 'Present initial model/policy', 'Deliver first substantive arguments'] },
      { role: 'Leader of Opposition (LO)', side: 'Opp', durationMins: 7, description: 'Rebuts the PM, establishes the opposition stance/counter-model, and builds the core opposition burden.', keyResponsibilities: ['Direct rebuttal of PM setup', 'Present opposition stance/counter-prop', 'Deliver core opposition substantive'] },
      { role: 'Deputy Prime Minister (DPM)', side: 'Gov / Prop', durationMins: 7, description: 'Defends PM arguments from LO attacks and introduces secondary constructive layers for Opening Government.', keyResponsibilities: ['Rebut LO constructive', 'Rebuild and deepen PM analysis', 'Add second layer of OG substantive'] },
      { role: 'Deputy Leader of Opposition (DLO)', side: 'Opp', durationMins: 7, description: 'Defends LO case, rebuts DPM, and concludes the opening opposition clash.', keyResponsibilities: ['Rebut DPM extensions', 'Rebuild OO case', 'Conclude Opening Opposition comparative'] },
      { role: 'Member of Government (MG)', side: 'Gov / Prop', durationMins: 7, description: 'Delivers the Government Extension: brand new analysis, deeper mechanism, or unique stakeholder perspective.', keyResponsibilities: ['Rebut Opening Opposition', 'Deliver distinctive Government Extension', 'Prove why CG matters most'] },
      { role: 'Member of Opposition (MO)', side: 'Opp', durationMins: 7, description: 'Delivers the Opposition Extension: new counter-narrative, unique impact mitigation, or strategic weighing mechanism.', keyResponsibilities: ['Rebut MG and Opening Gov', 'Deliver distinctive Opposition Extension', 'Prove why CO wins the debate'] },
      { role: 'Government Whip (GW)', side: 'Gov / Prop', durationMins: 7, description: 'Synthesizes the debate into major clash themes, weighing CG contribution over all other 3 tables.', keyResponsibilities: ['Comparative clash breakdown', 'Defend MG extension', 'NO new substantive arguments'] },
      { role: 'Opposition Whip (OW)', side: 'Opp', durationMins: 7, description: 'Final speech of the debate: crystallizes clashes, proves why CO extension overrides Government half and Opening Opp.', keyResponsibilities: ['Comparative clash crystallization', 'Weigh CO extension as debate-winning', 'NO new substantive arguments'] }
    ],
    commonTerms: [
      { term: 'Extension', definition: 'New analysis, new arguments, or a deeper analytical layer provided by Closing teams.' },
      { term: 'POI (Point of Information)', definition: 'A short (up to 15 seconds) question or remark offered by the opposing side during unprotected time.' },
      { term: 'Clash', definition: 'The core conceptual disagreements or conflicting burdens that adjudicators use to compare teams.' },
      { term: 'Characterization', definition: 'The realistic portrayal of how stakeholders, governments, or institutions behave in the real world.' }
    ],
    guideMarkdown: 'BP debate tests analytical depth, principled reasoning, and real-time comparative weighing. Teams do not merely show an argument is true; they must prove why their outcome matters most.'
  },
  {
    id: 'fmt-wsdc',
    name: 'World Schools Debating Championship (WSDC)',
    shortCode: 'WSDC',
    slug: 'world-schools',
    summary: 'The global standard for high school debate competitions (PAWSDC, WSDC). Two teams of 3 speakers debate prepared or impromptu motions, concluding with 4-minute Reply Speeches.',
    speakerCount: 6,
    speechDurationMins: 8,
    poiAllowed: true,
    teamStructure: '2 Teams of 3: Proposition (1st, 2nd, 3rd, Reply) vs Opposition (1st, 2nd, 3rd, Reply).',
    preparationTimeMins: 60,
    scoringScale: 'Substantive speeches: 60-80 (median 70). Reply speeches: 30-40 (median 35). Total team score out of 275 per judge.',
    adjudicationRules: [
      'Motions can be Prepared (weeks in advance) or Impromptu (1 hour prep with dictionary/almanac only).',
      'Speeches are 8 minutes long; Reply speeches are 4 minutes given by either 1st or 2nd speaker.',
      'POIs allowed between minute 1:00 and 7:00 of 8-minute speeches (not allowed during Reply speeches).',
      'Scoring is split: Content (40%), Style / Delivery (40%), Strategy (20%).'
    ],
    speakers: [
      { role: '1st Proposition', side: 'Gov / Prop', durationMins: 8, description: 'Introduces definition, context, team split, and presents first 2 substantive arguments.', keyResponsibilities: ['Define motion', 'Establish team case line', 'Deliver first substantive arguments'] },
      { role: '1st Opposition', side: 'Opp', durationMins: 8, description: 'Responds to Prop setup, accepts/challenges definition, sets Opp team line and first constructive arguments.', keyResponsibilities: ['Rebut 1st Prop', 'Establish Opp counter-case', 'Deliver first Opp substantive'] },
      { role: '2nd Proposition', side: 'Gov / Prop', durationMins: 8, description: 'Defends team line from Opp attacks, provides rebuttal, and introduces the remaining substantive case.', keyResponsibilities: ['Rebut 1st Opp', 'Rebuild 1st Prop', 'Deliver second substantive split'] },
      { role: '2nd Opposition', side: 'Opp', durationMins: 8, description: 'Deepens attack on Prop, defends Opp case, and presents the remaining opposition substantive split.', keyResponsibilities: ['Rebut Prop constructive', 'Rebuild Opp case', 'Deliver final Opp substantive arguments'] },
      { role: '3rd Proposition', side: 'Gov / Prop', durationMins: 8, description: 'Comprehensive rebuttal of entire Opp case, theme synthesis, and rebuilding. NO new arguments.', keyResponsibilities: ['Comprehensive rebuttal', 'Thematic clash analysis', 'Rebuild Proposition case'] },
      { role: '3rd Opposition', side: 'Opp', durationMins: 8, description: 'Comprehensive attack on Prop case, proving failure of Prop burdens. Final substantive rebuttal speech.', keyResponsibilities: ['Detailed technical rebuttal', 'Weighing opposing impacts', 'Final defense of Opp world'] },
      { role: 'Opposition Reply', side: 'Opp', durationMins: 4, description: 'Delivered by 1st or 2nd Opp speaker: a bird’s-eye perspective comparing the two worlds and why Opp wins.', keyResponsibilities: ['Holistic narrative comparison', 'Key questions/clashes overview', 'No new evidence or arguments'] },
      { role: 'Proposition Reply', side: 'Gov / Prop', durationMins: 4, description: 'Delivered by 1st or 2nd Prop speaker: the final word of the debate showing why the Proposition world stands.', keyResponsibilities: ['Final synthesis', 'Why Prop impacts outweigh Opp', 'Inspiring conclusion of team case'] }
    ],
    commonTerms: [
      { term: 'Team Split', definition: 'The strategic distribution of arguments between the 1st and 2nd speaker.' },
      { term: 'Reply Speech', definition: 'A 4-minute holistic comparative speech delivered as an impartial adjudicator summary.' },
      { term: 'Strategy Score', definition: 'Assessing time allocation, structure, and tactical focus on key clashes.' }
    ],
    guideMarkdown: 'WSDC emphasizes rhetorical persuasion, impeccable structure, and deep teamwork across 8-minute speeches and reply crystallization.'
  },
  {
    id: 'fmt-ap',
    name: 'Asian Parliamentary (AP)',
    shortCode: 'AP',
    slug: 'asian-parliamentary',
    summary: 'A widely popular 3-on-3 parliamentary debate format practiced across several African, Asian, and Australasian university circuits with 7-minute speeches and a 4-minute reply.',
    speakerCount: 6,
    speechDurationMins: 7,
    poiAllowed: true,
    teamStructure: '2 Teams of 3: Government (Prime Minister, Deputy PM, Gov Whip, Reply) vs Opposition (Leader of Opp, Deputy LO, Opp Whip, Reply).',
    preparationTimeMins: 30,
    scoringScale: 'Speaker scores: 68-82 (median 75). Reply speeches: 34-41 (median 37.5).',
    adjudicationRules: [
      'Motions are selected through a veto/ranking system from a release of 3 motions.',
      'Preparation time is typically 30 minutes without electronic assistance.',
      'POIs allowed between 1:00 and 6:00 minute marks in 7-minute speeches.',
      'Reply speech is given by either the 1st or 2nd speaker.'
    ],
    speakers: [
      { role: 'Prime Minister (PM)', side: 'Gov / Prop', durationMins: 7, description: 'Introduces model, background context, and first arguments.', keyResponsibilities: ['Contextualize motion', 'Deliver first arguments', 'Set criteria for victory'] },
      { role: 'Leader of Opposition (LO)', side: 'Opp', durationMins: 7, description: 'Direct rebuttal and opposition constructive case.', keyResponsibilities: ['Rebuttal of PM', 'Counter-philosophy', 'Opp substantive'] },
      { role: 'Deputy Prime Minister (DPM)', side: 'Gov / Prop', durationMins: 7, description: 'Rebuttal and second substantive split.', keyResponsibilities: ['Rebuild PM', 'Deliver second split'] },
      { role: 'Deputy Leader of Opposition (DLO)', side: 'Opp', durationMins: 7, description: 'Rebuttal and final Opp substantive arguments.', keyResponsibilities: ['Rebuild LO', 'Final Opp constructive'] },
      { role: 'Government Whip (GW)', side: 'Gov / Prop', durationMins: 7, description: 'Crystallizes major themes and clashes; no new arguments.', keyResponsibilities: ['Clash analysis', 'Summary of victory'] },
      { role: 'Opposition Whip (OW)', side: 'Opp', durationMins: 7, description: 'Crystallizes major themes and clashes from Opposition angle.', keyResponsibilities: ['Opposition summary', 'Weighing impacts'] }
    ],
    commonTerms: [
      { term: 'Motion Veto', definition: 'The process of eliminating motions among 3 proposed choices.' },
      { term: 'Gov Whip Rebuttal', definition: 'The defensive and thematic crystallization required in 3v3 formats.' }
    ],
    guideMarkdown: 'AP debate offers clear 3v3 team dynamics, allowing squads to build intricate layered policy and value cases.'
  },
  {
    id: 'fmt-pf',
    name: 'Public Forum (PF)',
    shortCode: 'PF',
    slug: 'public-forum',
    summary: 'A fast-paced 2-on-2 evidence-driven format popular for community and school debaters focusing on real-world domestic and international current affairs with Crossfire rounds.',
    speakerCount: 4,
    speechDurationMins: 4,
    poiAllowed: false,
    teamStructure: '2 Teams of 2: Pro vs Con with dedicated Crossfire examination rounds.',
    preparationTimeMins: 0,
    scoringScale: '20-30 points per speaker based on clarity, evidence quality, and crossfire agility.',
    adjudicationRules: [
      'Uses monthly topics published in advance with deep empirical research.',
      'Features unique "Crossfire" periods where both opposing debaters interact directly.',
      'Concludes with "Grand Crossfire" and final "Final Focus" speeches.'
    ],
    speakers: [
      { role: 'Speaker 1 (Constructive)', side: 'Gov / Prop', durationMins: 4, description: 'Presents pre-written case with evidence.', keyResponsibilities: ['Present contention 1 and 2 with citations'] },
      { role: 'Speaker 2 (Rebuttal)', side: 'Opp', durationMins: 4, description: 'Attacks the opponent case directly.', keyResponsibilities: ['Refute all points in opposing constructive'] }
    ],
    commonTerms: [
      { term: 'Crossfire', definition: 'A 3-minute interactive question-and-answer period.' },
      { term: 'Final Focus', definition: 'The final 2-minute speech highlighting the decisive voting issues.' }
    ],
    guideMarkdown: 'Public Forum is accessible to citizen judges and emphasizes empirical evidence and concise public speaking.'
  }
];

export const SEED_SOCIETIES: DebateSociety[] = [
  {
    id: 'soc-rda',
    name: 'Rwanda Debate Association (RDA)',
    slug: 'rwanda-debate-association',
    orgType: 'National Association',
    country: 'Rwanda',
    city: 'Kigali',
    region: 'East Africa',
    institution: 'Independent National Body',
    logo: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=200&q=80',
    description: 'The premier national umbrella organization fostering competitive debate, youth leadership, and adjudication accreditation across Rwandan universities and high schools.',
    foundedYear: 2012,
    formats: ['BP', 'WSDC'],
    websiteUrl: 'https://rwandadebate.org',
    socialLinks: {
      twitter: 'https://twitter.com/RwandaDebate',
      instagram: 'https://instagram.com/rwandadebate',
      linkedin: 'https://linkedin.com/company/rwanda-debate-association',
      whatsapp: 'https://chat.whatsapp.com/padp-rda-community',
      facebook: 'https://facebook.com/RwandaDebateAssociation'
    },
    contactEmail: 'info@rwandadebate.org',
    memberCount: 450,
    verificationStatus: 'verified',
    upcomingActivities: [
      'National Schools Debate Championship 2026',
      'Monthly Kigali BP Sparring League',
      'Adjudicator Level 1 Training Camp'
    ],
    achievements: [
      'Host of East Africa Debate Open 2024',
      'Trained 2,000+ high school debaters in 30 districts',
      'Semi-finalists at Pan-African Universities Championship'
    ]
  },
  {
    id: 'soc-uon',
    name: 'University of Nairobi Debate Club (UoNDC)',
    slug: 'university-of-nairobi-debate-club',
    orgType: 'University Society',
    country: 'Kenya',
    city: 'Nairobi',
    region: 'East Africa',
    institution: 'University of Nairobi',
    logo: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=200&q=80',
    description: 'One of East Africa’s oldest and most decorated university debate societies. Multiple-time national champions and PAUDC continental finalists.',
    foundedYear: 1988,
    formats: ['BP', 'WSDC', 'AP'],
    websiteUrl: 'https://uonbi.ac.ke/debate',
    socialLinks: {
      twitter: 'https://twitter.com/UoNDebate',
      instagram: 'https://instagram.com/uon_debaters',
      facebook: 'https://facebook.com/UoNDebateClub',
      whatsapp: 'https://chat.whatsapp.com/uon-debate-circuit',
      discord: 'https://discord.gg/uon-debater-hub'
    },
    contactEmail: 'debate@uonbi.ac.ke',
    memberCount: 180,
    verificationStatus: 'verified',
    upcomingActivities: [
      'Nairobi Mini Open 2026',
      'Weekly Wednesday BP Practice Rounds',
      'High School Mentorship Clinic'
    ],
    achievements: [
      'Champions: Kenya National Universities Championship 2023, 2024',
      'Top Speaker Award: East Africa Open 2025'
    ]
  },
  {
    id: 'soc-mak',
    name: 'Makerere University Debating Union (MUDU)',
    slug: 'makerere-university-debating-union',
    orgType: 'University Society',
    country: 'Uganda',
    city: 'Kampala',
    region: 'East Africa',
    institution: 'Makerere University',
    logo: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=200&q=80',
    description: 'An intellectual pillar of Ugandan parliamentary debate, renowned for producing continental best speakers and champion adjudicators.',
    foundedYear: 1972,
    formats: ['BP', 'WSDC'],
    socialLinks: {
      twitter: 'https://twitter.com/MUDUDebate',
      facebook: 'https://facebook.com/MakerereDebatingUnion',
      whatsapp: 'https://chat.whatsapp.com/makerere-debate-squad'
    },
    contactEmail: 'mudu@mak.ac.ug',
    memberCount: 220,
    verificationStatus: 'verified',
    upcomingActivities: [
      'Makerere Debate Open 2026',
      'Inter-Faculty Championship'
    ],
    achievements: [
      '3-time Pan-African Universities Championship Finalists',
      'Uganda National Debate Champions'
    ]
  },
  {
    id: 'soc-legon',
    name: 'University of Ghana Debate Society (Legon)',
    slug: 'university-of-ghana-debate-society',
    orgType: 'University Society',
    country: 'Ghana',
    city: 'Accra',
    region: 'West Africa',
    institution: 'University of Ghana, Legon',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=200&q=80',
    description: 'The reigning powerhouse of West African parliamentary debating, 4-time PAUDC Continental Champions and WUDC ESL breaking society.',
    foundedYear: 2004,
    formats: ['BP', 'WSDC'],
    websiteUrl: 'https://ug.edu.gh/debate',
    socialLinks: {
      twitter: 'https://twitter.com/LegonDebate',
      instagram: 'https://instagram.com/legondebatesociety',
      facebook: 'https://facebook.com/UniversityOfGhanaDebate',
      discord: 'https://discord.gg/legon-debate',
      whatsapp: 'https://chat.whatsapp.com/legon-sparrers'
    },
    contactEmail: 'debate@ug.edu.gh',
    memberCount: 310,
    verificationStatus: 'verified',
    upcomingActivities: [
      'Legon Open 2026 (International Edition)',
      'West Africa BP Boot Camp'
    ],
    achievements: [
      'Pan-African Universities Champions (2019, 2021, 2023)',
      'World Universities Debating Championship (WUDC) Open Octo-finalists'
    ]
  },
  {
    id: 'soc-uct',
    name: 'University of Cape Town Debating Union (UCTDU)',
    slug: 'uct-debating-union',
    orgType: 'University Society',
    country: 'South Africa',
    city: 'Cape Town',
    region: 'Southern Africa',
    institution: 'University of Cape Town',
    logo: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=200&q=80',
    description: 'The oldest active debating union in Southern Africa, consistently competing at the highest tiers of WUDC and SANUDC with strong coaching clinics.',
    foundedYear: 1918,
    formats: ['BP', 'WSDC'],
    websiteUrl: 'https://uctdebating.co.za',
    socialLinks: {
      twitter: 'https://twitter.com/UCTDebate',
      instagram: 'https://instagram.com/uct_debating',
      facebook: 'https://facebook.com/UCTDebatingUnion',
      discord: 'https://discord.gg/uct-sparring'
    },
    contactEmail: 'exec@uctdebating.co.za',
    memberCount: 260,
    verificationStatus: 'verified',
    upcomingActivities: [
      'UCT Invitational 2026',
      'Cape Schools Development Program'
    ],
    achievements: [
      'WUDC Open Finalists',
      '8-time SANUDC National Champions'
    ]
  },
  {
    id: 'soc-covenant',
    name: 'Covenant University Debating Society (CUDS)',
    slug: 'covenant-university-debating-society',
    orgType: 'University Society',
    country: 'Nigeria',
    city: 'Ota / Lagos',
    region: 'West Africa',
    institution: 'Covenant University',
    logo: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=200&q=80',
    description: 'A dynamic, high-achieving Nigerian debating institution known for rigorous analytical training and top rankings in national opens.',
    foundedYear: 2010,
    formats: ['BP', 'AP'],
    socialLinks: {
      twitter: 'https://twitter.com/CUDebateSociety',
      instagram: 'https://instagram.com/cudebate',
      whatsapp: 'https://chat.whatsapp.com/covenant-debaters-hub',
      facebook: 'https://facebook.com/CovenantDebate'
    },
    contactEmail: 'debate@covenantuniversity.edu.ng',
    memberCount: 190,
    verificationStatus: 'verified',
    upcomingActivities: [
      'Covenant National Novice Tournament',
      'Weekly Motion Bank Discussions'
    ],
    achievements: [
      'All-Nigeria Universities Championship Finalists (2024)',
      'Lagos Open Champions'
    ]
  },
  {
    id: 'soc-idebate',
    name: 'iDebate Rwanda',
    slug: 'idebate-rwanda',
    orgType: 'Debate Academy',
    country: 'Rwanda',
    city: 'Kigali',
    region: 'East Africa',
    institution: 'Youth NGO / Academy',
    logo: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=200&q=80',
    description: 'A pioneering social enterprise teaching young Rwandans how to think critically and express themselves through the power of debate.',
    foundedYear: 2012,
    formats: ['WSDC', 'BP', 'PF'],
    websiteUrl: 'https://debaterwanda.org',
    socialLinks: {
      twitter: 'https://twitter.com/iDebateRwanda',
      instagram: 'https://instagram.com/idebaterwanda',
      youtube: 'https://youtube.com/@idebaterwanda',
      facebook: 'https://facebook.com/idebaterwanda',
      whatsapp: 'https://chat.whatsapp.com/idebate-community'
    },
    contactEmail: 'team@debaterwanda.org',
    memberCount: 500,
    verificationStatus: 'verified',
    upcomingActivities: [
      'Kigali Debate Camp 2026',
      'Voices of a New Generation Tour'
    ],
    achievements: [
      'Trained over 5,000 students in Rwanda and East Africa',
      'Organized international USA tours for African student debaters'
    ]
  },
  {
    id: 'soc-aspire-rwanda',
    name: 'Aspire Debate Rwanda',
    slug: 'aspire-debate-rwanda',
    orgType: 'Community Org',
    country: 'Rwanda',
    city: 'Kigali',
    region: 'East Africa',
    institution: 'Independent Non-profit',
    logo: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=200&q=80',
    description: 'A youth-led organization empowering young Rwandans through critical thinking, life skills education, and advocacy platforms.',
    foundedYear: 2014,
    formats: ['BP', 'WSDC'],
    websiteUrl: 'https://aspiredebaterwanda.org',
    socialLinks: {
      facebook: 'https://facebook.com/AspireDebateRwanda'
    },
    contactEmail: 'info@aspiredebaterwanda.org',
    memberCount: 300,
    verificationStatus: 'verified',
    upcomingActivities: ['National Schools Debate Championship', 'University Debate Workshops'],
    achievements: ['Organized Commonwealth Universities Debating Championship']
  },
  {
    id: 'soc-rising-voices-rwanda',
    name: 'Rising Voices Rwanda',
    slug: 'rising-voices-rwanda',
    orgType: 'Community Org',
    country: 'Rwanda',
    city: 'Kigali',
    region: 'East Africa',
    institution: 'Independent Initiative',
    logo: 'https://images.unsplash.com/photo-1543269664-7634f19b1686?auto=format&fit=crop&w=200&q=80',
    description: 'Empowering individuals, especially youth, through digital tools, storytelling, and community-focused advocacy.',
    foundedYear: 2014,
    formats: ['WSDC'],
    socialLinks: {
      facebook: 'https://facebook.com/RisingVoicesRwanda'
    },
    contactEmail: 'info@risingvoicesrwanda.org',
    memberCount: 150,
    verificationStatus: 'verified',
    upcomingActivities: ['Youth Storytelling Workshops'],
    achievements: ['Supported microgrant projects in Rwanda']
  },
  {
    id: 'soc-youth-contest-rwanda',
    name: 'The Youth Contest Rwanda',
    slug: 'the-youth-contest-rwanda',
    orgType: 'Community Org',
    country: 'Rwanda',
    city: 'Kigali',
    region: 'East Africa',
    institution: 'Governmental Initiative',
    logo: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=200&q=80',
    description: 'An initiative identifying and supporting young innovators, entrepreneurs, and creative talents through competitions and mentorship.',
    foundedYear: 2024,
    formats: ['BP'],
    socialLinks: {
      websiteUrl: 'https://nyc.gov.rw'
    },
    contactEmail: 'info@nyc.gov.rw',
    memberCount: 200,
    verificationStatus: 'verified',
    upcomingActivities: ['YouthConnekt Awards', 'TVET Youth Challenge'],
    achievements: ['Provided grants and mentorship to youth innovators']
  },
  {
    id: 'soc-algeria-fadilia',
    name: 'Fadilia Debate Clubs',
    slug: 'fadilia-debate-clubs',
    orgType: 'Community Org',
    country: 'Algeria',
    city: 'Various',
    region: 'North Africa',
    institution: 'Independent Initiative',
    logo: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=200&q=80',
    description: 'Youth-led community focusing on capacity building, public debates, and creative community solutions.',
    foundedYear: 2018,
    formats: ['BP', 'AP'],
    websiteUrl: 'https://fadilia.org',
    contactEmail: 'info@fadilia.org',
    memberCount: 200,
    verificationStatus: 'verified'
  },
  {
    id: 'soc-angola-ndl',
    name: 'National Debating League (NDL)',
    slug: 'national-debating-league-angola',
    orgType: 'Educational Org',
    country: 'Angola',
    city: 'Luanda',
    region: 'Southern Africa',
    institution: 'Educational Initiative',
    logo: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=200&q=80',
    description: 'Operates debating leagues across various schools and facilitates international participation.',
    foundedYear: 2015,
    formats: ['BP'],
    websiteUrl: 'https://ndl.org.za',
    contactEmail: 'info@ndl.org.za',
    memberCount: 500,
    verificationStatus: 'verified'
  },

  {
    id: 'soc-cairo',
    name: 'Cairo Debating Society',
    slug: 'cairo-debating-society',
    orgType: 'Community Org',
    country: 'Egypt',
    city: 'Cairo',
    region: 'North Africa',
    institution: 'Independent Inter-Collegiate',
    logo: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=200&q=80',
    description: 'The core hub for English-language BP and Arabic debate in Cairo, hosting regional sparring with debaters across North Africa and the Middle East.',
    foundedYear: 2015,
    formats: ['BP', 'AP'],
    websiteUrl: 'https://cairodebate.org',
    socialLinks: {
      facebook: 'https://facebook.com/CairoDebate',
      instagram: 'https://instagram.com/cairodebate',
      discord: 'https://discord.gg/cairo-spar'
    },
    contactEmail: 'contact@cairodebate.org',
    memberCount: 140,
    verificationStatus: 'verified',
    upcomingActivities: ['Nile Sparring Series', 'Adjudicator Certification Workshop']
  },
  {
    id: 'soc-uz-zim',
    name: 'University of Zimbabwe Debate Society',
    slug: 'university-of-zimbabwe-debate-society',
    orgType: 'University Society',
    country: 'Zimbabwe',
    city: 'Harare',
    region: 'Southern Africa',
    institution: 'University of Zimbabwe',
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=200&q=80',
    description: 'A historic debating powerhouse in Southern Africa with a deep legacy of producing national champions, high school mentors, and top PAUDC orators.',
    foundedYear: 1994,
    formats: ['BP', 'WSDC'],
    socialLinks: {
      twitter: 'https://twitter.com/UZDebate',
      facebook: 'https://facebook.com/UZDebateSociety',
      whatsapp: 'https://chat.whatsapp.com/uz-debate-union'
    },
    contactEmail: 'debate@uz.ac.zw',
    memberCount: 160,
    verificationStatus: 'verified',
    upcomingActivities: ['Harare Open 2026', 'Inter-Varsity Sparring'],
    achievements: ['Southern Africa Universities Finalists', 'Zimbabwe National Champions']
  },
  {
    id: 'soc-ub-bots',
    name: 'University of Botswana Debating Society (UBDS)',
    slug: 'university-of-botswana-debating-society',
    orgType: 'University Society',
    country: 'Botswana',
    city: 'Gaborone',
    region: 'Southern Africa',
    institution: 'University of Botswana',
    logo: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=200&q=80',
    description: 'A premier competitive society in Gaborone known for hosting prestigious regional tournaments, fostering novice talent, and SANUDC outround breaks.',
    foundedYear: 1999,
    formats: ['BP', 'WSDC'],
    socialLinks: {
      facebook: 'https://facebook.com/UBDebatingSociety',
      instagram: 'https://instagram.com/ub_debaters',
      whatsapp: 'https://chat.whatsapp.com/ub-debate-squad'
    },
    contactEmail: 'ubdebating@ub.ac.bw',
    memberCount: 130,
    verificationStatus: 'verified',
    upcomingActivities: ['Gaborone Invitational', 'Novice Coaching Clinics']
  },
  {
    id: 'soc-kyuds-uga',
    name: 'Kyambogo University Debate Society (KYUDS)',
    slug: 'kyambogo-university-debate-society',
    orgType: 'University Society',
    country: 'Uganda',
    city: 'Kampala',
    region: 'East Africa',
    institution: 'Kyambogo University',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=200&q=80',
    description: 'Home of the prestigious KYUDO (Endowooza) Open. One of Uganda\'s most active parliamentary debating unions, championing open critical dialogue and inter-varsity camaraderie.',
    foundedYear: 2003,
    formats: ['BP', 'WSDC'],
    websiteUrl: 'https://forms.gle/ppXNB6hP2S7vy8gk9',
    socialLinks: {
      whatsapp: 'https://chat.whatsapp.com/G1tmFQTIRd5Jv2GMSxkQ3q?s=cl&p=a&mlu=4',
      twitter: 'https://twitter.com/KyambogoDebate',
      facebook: 'https://facebook.com/KYUDS'
    },
    contactEmail: 'kyuds@kyu.ac.ug',
    memberCount: 175,
    verificationStatus: 'verified',
    upcomingActivities: ['KYUDO 2026 (Endowooza)', 'Weekly Sparring Sessions', 'Teammate Matchmaking'],
    achievements: ['Host of KYUDO Open', 'National Debate Council Finalists']
  },
  {
    id: 'soc-wits-zaf',
    name: 'Wits Debating Union (WDU)',
    slug: 'wits-debating-union',
    orgType: 'University Society',
    country: 'South Africa',
    city: 'Johannesburg',
    region: 'Southern Africa',
    institution: 'University of the Witwatersrand',
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=200&q=80',
    description: 'A continental giant in African collegiate debate, Wits Debating Union hosts the Wits International Open and has produced multiple PAUDC & WUDC breaking teams.',
    foundedYear: 1922,
    formats: ['BP', 'WSDC'],
    socialLinks: {
      twitter: 'https://twitter.com/WitsDebate',
      instagram: 'https://instagram.com/witsdebating',
      facebook: 'https://facebook.com/WitsDebatingUnion',
      whatsapp: 'https://chat.whatsapp.com/wits-debate-hub'
    },
    contactEmail: 'debating@wits.ac.za',
    memberCount: 290,
    verificationStatus: 'verified',
    upcomingActivities: ['Wits International Open 2026', 'SANUDC Squad Training'],
    achievements: ['PAUDC Continental Champions', 'WUDC Outround Breaks', 'SANUDC National Champions']
  }
];

export const SEED_TOURNAMENTS: Tournament[] = [
  {
    id: 'tourn-formosa-bp-2026',
    title: 'Formosa BP Open',
    slug: 'formosa-bp-open-2026',
    organizer: 'TBA',
    country: 'Taiwan',
    city: 'Taipei',
    region: 'Asia',
    deliveryMode: 'In-Person',
    startDate: '2026-12-05',
    endDate: '2026-12-06',
    format: 'BP',
    formatFullName: 'British Parliamentary (BP)',
    eligibility: 'Open',
    teamCap: 40,
    status: 'Upcoming',
    isFeatured: false,
    verificationStatus: 'unverified',
    description: 'BP tournament in Taipei.',
    contactEmail: 'TBA'
  },
  {
    id: 'tourn-japan-bp-2026',
    title: 'Japan BP 2026',
    slug: 'japan-bp-2026',
    organizer: 'TBA',
    country: 'Japan',
    city: 'Online',
    region: 'Asia',
    deliveryMode: 'Online',
    startDate: '2026-12-05',
    endDate: '2026-12-06',
    format: 'BP',
    formatFullName: 'British Parliamentary (BP)',
    eligibility: 'Open',
    registrationFee: '¥7,500 (≒18 USD) per missing judge',
    teamCap: 9999,
    status: 'Upcoming',
    isFeatured: false,
    verificationStatus: 'unverified',
    description: 'Online BP tournament.',
    contactEmail: 'TBA'
  },
  {
    id: 'tourn-indonesia-pre-wudc-2026',
    title: 'Indonesia pre-WUDC Open',
    slug: 'indonesia-pre-wudc-open-2026',
    organizer: 'TBA',
    country: 'Indonesia',
    city: 'Online',
    region: 'Asia',
    deliveryMode: 'Online',
    startDate: '2026-12-05',
    endDate: '2026-12-06',
    format: 'BP',
    formatFullName: 'British Parliamentary (BP)',
    eligibility: 'Open',
    registrationFee: '45 USD per team, 15 USD per judge',
    teamCap: 120,
    status: 'Upcoming',
    isFeatured: false,
    verificationStatus: 'unverified',
    description: 'Pre-WUDC tournament.',
    contactEmail: 'TBA'
  },
  {
    id: 'tourn-scotland-pre-wudc-2026',
    title: 'Scotland Pre-WUDC 2026',
    slug: 'scotland-pre-wudc-2026',
    organizer: 'TBA',
    country: 'UK',
    city: 'Online',
    region: 'Europe',
    deliveryMode: 'Online',
    startDate: '2026-12-05',
    endDate: '2026-12-06',
    format: 'BP',
    formatFullName: 'British Parliamentary (BP)',
    eligibility: 'Open',
    registrationFee: '£35 per team',
    teamCap: 120,
    status: 'Upcoming',
    isFeatured: false,
    verificationStatus: 'unverified',
    description: 'Pre-WUDC tournament.',
    contactEmail: 'TBA'
  },
  {
    id: 'tourn-manila-pre-wudc-2026',
    title: 'Manila Pre-WUDC',
    slug: 'manila-pre-wudc-2026',
    organizer: 'TBA',
    country: 'Philippines',
    city: 'Online',
    region: 'Asia',
    deliveryMode: 'Online',
    startDate: '2026-12-12',
    endDate: '2026-12-13',
    format: 'BP',
    formatFullName: 'British Parliamentary (BP)',
    eligibility: 'Open',
    registrationFee: '15 USD per participant / 800 PHP',
    teamCap: 120,
    status: 'Upcoming',
    isFeatured: false,
    verificationStatus: 'unverified',
    description: 'Pre-WUDC tournament.',
    contactEmail: 'TBA'
  },
  {
    id: 'tourn-st-andrews-pre-wudc-2026',
    title: 'St Andrews Pre-WUDC',
    slug: 'st-andrews-pre-wudc-2026',
    organizer: 'TBA',
    country: 'UK',
    city: 'Online',
    region: 'Europe',
    deliveryMode: 'Online',
    startDate: '2026-12-12',
    endDate: '2026-12-13',
    format: 'BP',
    formatFullName: 'British Parliamentary (BP)',
    eligibility: 'Open',
    registrationFee: '£50/team or £45/team for institutions that reg 3 teams or more',
    teamCap: 120,
    status: 'Upcoming',
    isFeatured: false,
    verificationStatus: 'unverified',
    description: 'Pre-WUDC tournament.',
    contactEmail: 'TBA'
  },
  {
    id: 'tourn-mit-pre-wudc-2026',
    title: 'MIT Pre-WUDC 2026',
    slug: 'mit-pre-wudc-2026',
    organizer: 'TBA',
    country: 'USA',
    city: 'Online',
    region: 'North America',
    deliveryMode: 'Online',
    startDate: '2026-12-12',
    endDate: '2026-12-13',
    format: 'BP',
    formatFullName: 'British Parliamentary (BP)',
    eligibility: 'Open',
    registrationFee: '$40 per team',
    teamCap: 120,
    status: 'Upcoming',
    isFeatured: false,
    verificationStatus: 'unverified',
    description: 'Pre-WUDC tournament.',
    contactEmail: 'TBA'
  },
  {
    id: 'tourn-asia-pre-worlds-2026',
    title: 'ASIA PRE-WORLDS 2026',
    slug: 'asia-pre-worlds-2026',
    organizer: 'TBA',
    country: 'TBA',
    city: 'Online',
    region: 'Asia',
    deliveryMode: 'Online',
    startDate: '2026-12-12',
    endDate: '2026-12-13',
    format: 'BP',
    formatFullName: 'British Parliamentary (BP)',
    eligibility: 'Open',
    registrationFee: '$40 per team, $15 per judge',
    teamCap: 9999,
    status: 'Upcoming',
    isFeatured: false,
    verificationStatus: 'unverified',
    description: 'Pre-WUDC tournament.',
    contactEmail: 'TBA'
  },
  {
    id: 'tourn-warwick-pre-wudc-2026',
    title: 'Warwick Pre-WUDC 2026',
    slug: 'warwick-pre-wudc-2026',
    organizer: 'TBA',
    country: 'UK',
    city: 'Online',
    region: 'Europe',
    deliveryMode: 'Online',
    startDate: '2026-12-12',
    endDate: '2026-12-13',
    format: 'BP',
    formatFullName: 'British Parliamentary (BP)',
    eligibility: 'Open',
    teamCap: 120,
    status: 'Upcoming',
    isFeatured: false,
    verificationStatus: 'unverified',
    description: 'Pre-WUDC tournament.',
    contactEmail: 'TBA'
  },
  {
    id: 'tourn-christmas-holidays-iv-2026',
    title: 'Christmas Holidays IV 2026',
    slug: 'christmas-holidays-iv-2026',
    organizer: 'TBA',
    country: 'TBA',
    city: 'Online',
    region: 'TBA',
    deliveryMode: 'Online',
    startDate: '2026-12-19',
    endDate: '2026-12-20',
    format: 'BP',
    formatFullName: 'British Parliamentary (BP)',
    eligibility: 'Open',
    registrationFee: '$10 per participant',
    teamCap: 9999,
    status: 'Upcoming',
    isFeatured: false,
    verificationStatus: 'unverified',
    description: 'Holiday IV tournament.',
    contactEmail: 'TBA'
  },
  {
    id: 'tourn-ottawa-wudc-2027',
    title: 'Ottawa WUDC 2027',
    slug: 'ottawa-wudc-2027',
    organizer: 'TBA',
    country: 'Canada',
    city: 'Ottawa',
    region: 'North America',
    deliveryMode: 'In-Person',
    startDate: '2027-01-01',
    endDate: '2027-01-07',
    format: 'BP',
    formatFullName: 'British Parliamentary (BP)',
    eligibility: 'Open',
    status: 'Upcoming',
    isFeatured: false,
    verificationStatus: 'unverified',
    description: 'World Universities Debating Championship.',
    contactEmail: 'TBA'
  },

  {
    id: 'tourn-pawsdc-2026',
    title: 'Pan-African World Schools Debating Championship (PAWSDC 2026)',
    slug: 'pan-african-world-schools-debating-championship-2026',
    organizer: 'African Schools Debate Federation & iDebate',
    country: 'Rwanda',
    city: 'Kigali',
    region: 'East Africa',
    deliveryMode: 'In-Person',
    venue: 'Kigali Convention Centre & Green Hills Academy',
    startDate: '2026-09-18',
    endDate: '2026-09-24',
    registrationDeadline: '2026-08-30',
    format: 'WSDC',
    formatFullName: 'World Schools (WSDC)',
    eligibility: 'High School',
    registrationLink: 'https://pawsdc.org/apply',
    registrationFee: '$90 USD per student',
    teamCap: 48,
    roundsCount: 6,
    chiefAdjudicators: ['Jean-Paul Ndoli (Rwanda)', 'Faith Chebet (Kenya)', 'Oluwaseun Adeleke (Nigeria)'],
    tabSoftware: 'Tabbycat',
    status: 'Upcoming',
    isFeatured: true,
    verificationStatus: 'verified',
    description: 'The continent’s premier high school championship bringing together national teams and top school delegations across Africa to debate critical international and regional questions.',
    scheduleHighlights: [
      'Sep 18: Welcome & Adjudication Briefing',
      'Sep 19-21: Impromptu and Prepared Rounds',
      'Sep 22: High School Leadership Forum',
      'Sep 23: Outrounds & Grand Final at Kigali Convention Centre'
    ],
    contactEmail: 'contact@pawsdc.org',
    websiteOrSocial: 'https://pawsdc.org',
    bannerImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    tags: ['High School', 'WSDC', 'Continental', 'National Teams']
  },
  {
    id: 'tourn-eado-2026',
    title: 'East Africa Debate Open (EADO 2026)',
    slug: 'east-africa-debate-open-2026',
    organizer: 'Rwanda Debate Association & Makerere Debating Union',
    country: 'Uganda',
    city: 'Kampala',
    region: 'East Africa',
    deliveryMode: 'In-Person',
    venue: 'Makerere University Main Hall',
    startDate: '2026-10-09',
    endDate: '2026-10-12',
    registrationDeadline: '2026-09-25',
    format: 'BP',
    formatFullName: 'British Parliamentary (BP)',
    eligibility: 'Open',
    registrationLink: 'https://eado2026.org',
    registrationFee: 'UGX 150,000 / $40 USD per debater',
    teamCap: 64,
    roundsCount: 5,
    chiefAdjudicators: ['Brian Ochieng (Uganda)', 'Divine Mukamana (Rwanda)'],
    tabSoftware: 'Tabbycat',
    status: 'Registration Open',
    isFeatured: true,
    verificationStatus: 'verified',
    description: 'The biggest regional open in East Africa. Open to high school veterans, university debaters, and alumni cross-teams.',
    contactEmail: 'secretariat@eado2026.org',
    tags: ['Regional', 'East Africa', 'Open']
  },
  {
    id: 'tourn-waudl-2026',
    title: 'West Africa Universities Debate League (WAUDL)',
    slug: 'west-africa-universities-debate-league-2026',
    organizer: 'Legon Debate Society & ANUDC',
    country: 'Ghana',
    city: 'Accra',
    region: 'West Africa',
    deliveryMode: 'Hybrid',
    venue: 'University of Ghana Campus + Zoom Online Portal',
    startDate: '2026-11-14',
    endDate: '2026-11-17',
    registrationDeadline: '2026-10-20',
    format: 'BP',
    formatFullName: 'British Parliamentary (BP)',
    eligibility: 'University',
    registrationLink: 'https://waudl.org/register',
    registrationFee: '$35 USD (Online) / $60 USD (In-Person)',
    teamCap: 80,
    roundsCount: 6,
    chiefAdjudicators: ['Kofi Boakye (Ghana)', 'Chidinma Okafor (Nigeria)'],
    tabSoftware: 'Tabbycat',
    status: 'Registration Open',
    isFeatured: false,
    verificationStatus: 'verified',
    description: 'A prestigious league bringing together Ghana, Nigeria, Senegal, Côte d’Ivoire, and Sierra Leone in high-intensity hybrid debate rounds.',
    contactEmail: 'waudl@ug.edu.gh',
    tags: ['West Africa', 'Hybrid', 'University']
  },
  {
    id: 'tourn-sanudc-2026',
    title: 'South African National Universities Debating Championship (SANUDC 2026)',
    slug: 'south-african-national-universities-debating-championship-2026',
    organizer: 'South African National Universities Council',
    country: 'South Africa',
    city: 'Johannesburg',
    region: 'Southern Africa',
    deliveryMode: 'In-Person',
    venue: 'University of the Witwatersrand (Wits)',
    startDate: '2026-07-04',
    endDate: '2026-07-10',
    registrationDeadline: '2026-05-30',
    format: 'BP',
    formatFullName: 'British Parliamentary (BP)',
    eligibility: 'University',
    registrationLink: 'https://sanudc.co.za',
    registrationFee: 'ZAR 1,200 per debater',
    teamCap: 90,
    roundsCount: 8,
    chiefAdjudicators: ['Sipho Zulu (Wits)', 'Zoe Van Zyl (Stellenbosch)'],
    tabSoftware: 'Tabbycat',
    status: 'Upcoming',
    isFeatured: false,
    verificationStatus: 'verified',
    description: 'South Africa’s premier national championship deciding the national squad and top institutional rankings across Southern Africa.',
    contactEmail: 'info@sanudc.co.za',
    tags: ['National', 'South Africa', 'BP']
  },
  {
    id: 'tourn-kigali-mini-open',
    title: 'Kigali Debate Mini Open & Novice Showcase',
    slug: 'kigali-debate-mini-open-2026',
    organizer: 'Rwanda Debate Association',
    country: 'Rwanda',
    city: 'Kigali',
    region: 'East Africa',
    deliveryMode: 'In-Person',
    venue: 'University of Rwanda, Gikondo Campus',
    startDate: '2026-09-05',
    endDate: '2026-09-06',
    registrationDeadline: '2026-08-28',
    format: 'BP',
    formatFullName: 'British Parliamentary (BP)',
    eligibility: 'Novice',
    registrationLink: 'https://rwandadebate.org/kigali-mini',
    registrationFee: 'RWF 15,000 per team',
    teamCap: 32,
    roundsCount: 4,
    chiefAdjudicators: ['Gaston Mugisha (UR)', 'Clarisse Isimbi (RDA)'],
    tabSoftware: 'Tabbycat',
    status: 'Registration Open',
    isFeatured: false,
    verificationStatus: 'verified',
    description: 'A dedicated development open for first- and second-year university debaters to prepare for continental majors.',
    contactEmail: 'novice@rwandadebate.org',
    tags: ['Novice', 'Development', 'Rwanda']
  },
  {
    id: 'tourn-pan-africa-online-spar',
    title: 'Pan-African Continental Online Sparring Series (Round 3)',
    slug: 'pan-african-continental-online-sparring-series-round-3',
    organizer: 'PADP Community Initiative',
    country: 'Pan-African',
    city: 'Online (Discord / Zoom)',
    region: 'Pan-African & Global',
    deliveryMode: 'Online',
    startDate: '2026-09-12',
    endDate: '2026-09-12',
    registrationDeadline: '2026-09-10',
    format: 'BP',
    formatFullName: 'British Parliamentary (BP)',
    eligibility: 'Open',
    registrationLink: 'https://padp.africa/sparring-signup',
    registrationFee: 'Free / 0 USD',
    teamCap: 40,
    roundsCount: 3,
    chiefAdjudicators: ['Tariq Mansoor (Egypt)', 'Nadege Umutoni (Rwanda)'],
    status: 'Registration Open',
    isFeatured: true,
    verificationStatus: 'verified',
    description: 'A 1-day 3-round online sparring tournament designed to connect West, East, North, and Southern African debaters with expert adjudication feedback.',
    contactEmail: 'sparring@padp.africa',
    tags: ['Online', 'Free', 'Sparring', 'Pan-African']
  },
  {
    id: 'tourn-cairo-open-2026',
    title: 'Cairo International Debate Open 2026',
    slug: 'cairo-international-debate-open-2026',
    organizer: 'Cairo Debating Society',
    country: 'Egypt',
    city: 'Cairo',
    region: 'North Africa',
    deliveryMode: 'Hybrid',
    venue: 'American University in Cairo (AUC) New Cairo Campus',
    startDate: '2026-11-20',
    endDate: '2026-11-22',
    registrationDeadline: '2026-11-01',
    format: 'BP',
    formatFullName: 'British Parliamentary (BP)',
    eligibility: 'Open',
    registrationLink: 'https://cairodebate.org/open2026',
    registrationFee: '$45 USD',
    teamCap: 48,
    roundsCount: 5,
    chiefAdjudicators: ['Farida Hassan (Egypt)', 'Mustafa Al-Khatib (AUC)'],
    tabSoftware: 'Tabbycat',
    status: 'Upcoming',
    isFeatured: false,
    verificationStatus: 'verified',
    description: 'An international open bridging North African, Middle Eastern, and sub-Saharan African debaters with high-quality motions on geopolitical economy.',
    contactEmail: 'open@cairodebate.org',
    tags: ['North Africa', 'International', 'Hybrid']
  },
  {
    id: 'tourn-uhuru-worlds-2026',
    title: 'Uhuru Worlds 2026 (6th Edition)',
    slug: 'uhuru-worlds-2026',
    organizer: 'Uhuru Worlds Organising Committee',
    country: 'South Africa',
    city: 'Online (Global)',
    region: 'Pan-African & Global',
    deliveryMode: 'Online',
    startDate: '2026-10-02',
    endDate: '2026-10-04',
    registrationDeadline: '2026-09-22',
    format: 'BP',
    formatFullName: 'British Parliamentary (BP)',
    eligibility: 'Open',
    registrationLink: 'https://forms.gle/wM9vK8QTynCjy984A',
    registrationFee: 'Team Cap: 500 Teams (Closes Sep 22 at 00:00 UTC+1)',
    teamCap: 500,
    roundsCount: 6,
    chiefAdjudicators: [
      'Umar Buckus (Convenor)',
      'Maison Pieterson Maphosa (Tournament Director)',
      'Ré Àn (Shadow Convenor)'
    ],
    tabSoftware: 'Tabbycat',
    status: 'Registration Open',
    isFeatured: true,
    verificationStatus: 'verified',
    description: 'Entering its sixth year, Uhuru Worlds expands globally as one of the premier international and African online parliamentary debate tournaments. Judge Registration: https://forms.gle/Y9uCju9sQ2Djynns9',
    scheduleHighlights: [
      'Sep 22: Team and Judge Registration Closes (00:00 UTC+1 / 500 Team Cap)',
      'Oct 2: Briefing & Preliminary Rounds 1-3',
      'Oct 3: Preliminary Rounds 4-6 & Open/ESL Outround Breaks',
      'Oct 4: Elimination Outrounds & Grand Finals'
    ],
    contactEmail: 'uhuruworlds@gmail.com',
    websiteOrSocial: 'https://forms.gle/wM9vK8QTynCjy984A',
    bannerImage: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80',
    tags: ['Uhuru Worlds', 'BP', 'Global', 'Online', 'Prestigious', '500 Teams']
  },
  {
    id: 'tourn-kyudo-2026',
    title: 'Kyambogo University Debate Open 2026 (KYUDO\'26 / Endowooza)',
    slug: 'kyambogo-university-debate-open-kyudo-2026',
    organizer: 'Kyambogo University Debate Society (KYUDS)',
    country: 'Uganda',
    city: 'Kampala',
    region: 'East Africa',
    deliveryMode: 'In-Person',
    venue: 'Kyambogo University Main Campus, Kampala, Uganda',
    startDate: '2026-09-04',
    endDate: '2026-09-06',
    registrationDeadline: '2026-08-30',
    format: 'BP',
    formatFullName: 'British Parliamentary (BP)',
    eligibility: 'Open',
    registrationLink: 'https://forms.gle/ppXNB6hP2S7vy8gk9',
    registrationFee: 'Phase 2 Registration Closing Aug 30',
    teamCap: 48,
    roundsCount: 5,
    chiefAdjudicators: ['KYUDS Adjudication Core'],
    tabSoftware: 'Tabbycat',
    status: 'Registration Open',
    isFeatured: true,
    verificationStatus: 'verified',
    description: '"Every Side Has A Story." KYUDO\'26 (Endowooza) brings together top East African collegiate debaters, high school standouts, and independent cross-teams for high-caliber parliamentary competition. Looking for a teammate hub: https://chat.whatsapp.com/G1tmFQTIRd5Jv2GMSxkQ3q?s=cl&p=a&mlu=4',
    scheduleHighlights: [
      'Aug 30: Final Phase 2 Registration Deadline',
      'Sep 4: Check-in, Tournament Briefings & Round 1',
      'Sep 5: Preliminary Rounds 2 to 5 & Tab Release',
      'Sep 6: Semi-Finals, Grand Finals & Awards Gala'
    ],
    contactEmail: 'kyuds@kyu.ac.ug',
    websiteOrSocial: 'https://forms.gle/ppXNB6hP2S7vy8gk9',
    bannerImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    tags: ['KYUDS', 'KYUDO26', 'Uganda', 'East Africa', 'BP', 'Endowooza']
  },
  {
    id: 'tourn-nsda-toc-opener-2026',
    title: 'National Speech & Debate Season Opener (TOC Opener 2026)',
    slug: 'national-speech-debate-season-opener-toc-2026',
    organizer: 'University of Kentucky Intercollegiate Debate & NSDA',
    country: 'Pan-African',
    city: 'Online (NSDA Campus, KY/US)',
    region: 'Pan-African & Global',
    deliveryMode: 'Online',
    startDate: '2026-09-11',
    endDate: '2026-09-13',
    registrationDeadline: '2026-09-08',
    format: 'WSDC',
    formatFullName: 'World Schools (WSDC) & Public Forum (PF)',
    eligibility: 'High School',
    registrationLink: 'https://www.tabroom.com',
    registrationFee: 'Online Tabroom Payment (Bid Levels: WSDC Semifinals, PF Octafinals)',
    teamCap: 160,
    roundsCount: 6,
    chiefAdjudicators: ['Kelsey Johnson (Tournament Director)', 'University of Kentucky Debate Program'],
    tabSoftware: 'Tabroom',
    status: 'Registration Open',
    isFeatured: true,
    verificationStatus: 'verified',
    description: 'The official launch of the TOC competitive season hosted entirely online. Features international breakout elimination rounds in World Schools Debate and Public Forum. World Schools judges receive pre-tournament accreditation clinics.',
    scheduleHighlights: [
      'Sep 8: Registration & Judge Info Closes (11:59 PM ET)',
      'Sep 11: International Check-in & Preliminary Rounds 1-2',
      'Sep 12: Preliminary Rounds 3-6 & International Breakouts',
      'Sep 13: Elimination Outrounds & TOC Bid Awards'
    ],
    contactEmail: 'tournamentofchampions@uky.edu',
    websiteOrSocial: 'https://www.tabroom.com',
    bannerImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    tags: ['TOC', 'NSDA', 'WSDC', 'Public Forum', 'Online', 'Global', 'Bid Tournament']
  },
  {
    id: 'tourn-wits-open-2026',
    title: 'Wits International Open 2026',
    slug: 'wits-international-open-2026',
    organizer: 'Wits Debating Union',
    country: 'South Africa',
    city: 'Online (Johannesburg / GMT+2)',
    region: 'Southern Africa',
    deliveryMode: 'Online',
    startDate: '2026-09-12',
    endDate: '2026-09-13',
    registrationDeadline: '2026-09-05',
    format: 'BP',
    formatFullName: 'British Parliamentary (BP)',
    eligibility: 'Open',
    registrationLink: 'https://witsdebating.co.za/open2026',
    registrationFee: '$15 USD per team (Free for judges, N=1)',
    teamCap: 80,
    roundsCount: 5,
    chiefAdjudicators: ['Wits Adjudication Team'],
    tabSoftware: 'Tabbycat',
    status: 'Registration Open',
    isFeatured: true,
    verificationStatus: 'verified',
    description: 'Premier collegiate online open hosted by Wits Debating Union. 80 teams, top continental adjudicators, and intensive outrounds in South African standard time (GMT+2).',
    contactEmail: 'debating@wits.ac.za',
    tags: ['Wits', 'South Africa', 'BP', 'Online', 'Southern Africa']
  },
  {
    id: 'tourn-cape-coast-open-ii-2026',
    title: 'Cape Coast Open II (Ghana)',
    slug: 'cape-coast-open-ii-2026',
    organizer: 'University of Cape Coast Debate Society',
    country: 'Ghana',
    city: 'Cape Coast',
    region: 'West Africa',
    deliveryMode: 'In-Person',
    venue: 'University of Cape Coast Campus, Ghana',
    startDate: '2026-08-27',
    endDate: '2026-08-31',
    registrationDeadline: '2026-08-26',
    format: 'BP',
    formatFullName: 'British Parliamentary (BP)',
    eligibility: 'University',
    registrationLink: 'https://uccdebate.org/cape-coast-open-2',
    registrationFee: '$27 USD per participant',
    teamCap: 60,
    roundsCount: 5,
    chiefAdjudicators: ['UCC Adjudication Core'],
    tabSoftware: 'Tabbycat',
    status: 'Ongoing',
    isFeatured: false,
    verificationStatus: 'verified',
    description: 'A flagship in-person West African university open bringing together teams from across Ghana, Nigeria, and neighboring circuits in coastal Ghana.',
    contactEmail: 'uccdebate@ucc.edu.gh',
    tags: ['Ghana', 'West Africa', 'In-Person', 'BP']
  },
  {
    id: 'tourn-tarkash-bpd-2026',
    title: 'TARKASH BPD 2026',
    slug: 'tarkash-bpd-2026',
    organizer: 'Tarkash Debate Community',
    country: 'Pan-African',
    city: 'Online (GMT+5:30)',
    region: 'Pan-African & Global',
    deliveryMode: 'Online',
    startDate: '2026-08-29',
    endDate: '2026-08-30',
    registrationDeadline: '2026-08-28',
    format: 'BP',
    formatFullName: 'British Parliamentary (BP)',
    eligibility: 'Open',
    registrationLink: 'https://forms.gle/tarkash2026',
    registrationFee: '₹600 / $10 USD per participant (N=N Flexible)',
    teamCap: 100,
    roundsCount: 5,
    status: 'Registration Open',
    isFeatured: false,
    verificationStatus: 'verified',
    description: '100-team international BP tournament with wide participation across African and Asian debate contingents.',
    contactEmail: 'contact@tarkashdebate.org',
    tags: ['Online', 'BP', 'Global', '100 Teams']
  },
  {
    id: 'tourn-eurowgm-2026',
    title: 'EuroWGM 2026 (Copenhagen)',
    slug: 'eurowgm-copenhagen-2026',
    organizer: 'European WGM Debating Network',
    country: 'Pan-African',
    city: 'Copenhagen, Denmark (GMT+1)',
    region: 'Pan-African & Global',
    deliveryMode: 'In-Person',
    startDate: '2026-09-04',
    endDate: '2026-09-06',
    registrationDeadline: '2026-08-31',
    format: 'BP',
    formatFullName: 'British Parliamentary (BP)',
    eligibility: 'Open',
    registrationLink: 'https://eurowgm.org/register',
    registrationFee: 'N-1 Rule',
    status: 'Registration Open',
    isFeatured: false,
    verificationStatus: 'verified',
    description: 'International Women & Gender Minorities championship in Copenhagen welcoming international and African delegates.',
    contactEmail: 'info@eurowgm.org',
    tags: ['WGM', 'In-Person', 'BP', 'International']
  },
  {
    id: 'tourn-tabserver-turkey-2026',
    title: 'TabServerofTurkey Online Pre-WUDC 2026',
    slug: 'tabserver-turkey-online-pre-wudc-2026',
    organizer: 'TabServer Turkey & Pre-WUDC Initiative',
    country: 'Pan-African',
    city: 'Online (GMT+3)',
    region: 'Pan-African & Global',
    deliveryMode: 'Online',
    startDate: '2026-09-05',
    endDate: '2026-09-06',
    registrationDeadline: '2026-09-01',
    format: 'BP',
    formatFullName: 'British Parliamentary (BP)',
    eligibility: 'Open',
    registrationLink: 'https://tabserver.org/turkey-pre-wudc',
    registrationFee: '15 EUR per team (N-1)',
    teamCap: 60,
    roundsCount: 5,
    status: 'Registration Open',
    isFeatured: false,
    verificationStatus: 'verified',
    description: 'High-intensity 60-team online Pre-WUDC preparation tournament with certified international and African adjudicators.',
    contactEmail: 'prewudc@tabserver.org',
    tags: ['Pre-WUDC', 'BP', 'Online', 'Global']
  },
  {
    id: 'tourn-borneo-uk-2026',
    title: 'BORNEO-UK BP Open 2026',
    slug: 'borneo-uk-bp-open-2026',
    organizer: 'Borneo & UK Debating Circuits',
    country: 'Pan-African',
    city: 'Online (UTC+1)',
    region: 'Pan-African & Global',
    deliveryMode: 'Online',
    startDate: '2026-09-12',
    endDate: '2026-09-13',
    registrationDeadline: '2026-09-08',
    format: 'BP',
    formatFullName: 'British Parliamentary (BP)',
    eligibility: 'Open',
    registrationLink: 'https://borneo-uk.org/register',
    registrationFee: 'Early Bird: $20 USD | Regular: $30 USD (N=0)',
    teamCap: 80,
    roundsCount: 5,
    status: 'Registration Open',
    isFeatured: false,
    verificationStatus: 'verified',
    description: 'International 80-team open bridging Asian, European, and African university debaters with zero judge burden (N=0).',
    contactEmail: 'borneo.uk.debate@gmail.com',
    tags: ['BP', 'Online', 'Global', 'N=0']
  },
  {
    id: 'tourn-vacationspars-2026',
    title: 'Vacationspars Pre-WUDC 2026',
    slug: 'vacationspars-pre-wudc-2026',
    organizer: 'VacationSpars Global Network',
    country: 'Pan-African',
    city: 'Online (GMT+0)',
    region: 'Pan-African & Global',
    deliveryMode: 'Online',
    startDate: '2026-09-19',
    endDate: '2026-09-20',
    registrationDeadline: '2026-09-15',
    format: 'BP',
    formatFullName: 'British Parliamentary (BP)',
    eligibility: 'Open',
    registrationLink: 'https://vacationspars.org/apply',
    registrationFee: '$10 USD per participant (Judges not required)',
    roundsCount: 5,
    status: 'Registration Open',
    isFeatured: false,
    verificationStatus: 'verified',
    description: 'Pre-WUDC sparring tournament with comprehensive feedback loops, motion analysis, and flexible continental timing.',
    contactEmail: 'sparring@vacationspars.org',
    tags: ['Sparring', 'Pre-WUDC', 'BP', 'Online']
  }
];

export const SEED_RESOURCES: Resource[] = [
  {
    id: 'res-bp-primer',
    title: 'The African BP Primer: Principles, Mechanisms, and Comparative Weighing',
    slug: 'african-bp-primer-principles-mechanisms',
    category: 'BP Masterclass',
    difficulty: 'Intermediate',
    format: 'BP',
    authorName: 'Kwame Mensah',
    authorAffiliation: 'Past PAUDC Chief Adjudicator / University of Ghana',
    contentType: 'Guide',
    readTimeMins: 12,
    summary: 'A definitive guide on how African debaters can win closing tables with robust extensions, characterize local stakeholders realistically, and execute world comparisons.',
    contentBody: `### 1. The Core Philosophy of BP Debate
In British Parliamentary debate, proving an outcome is positive or negative is only the first 30% of the battle. The remaining 70% of victory comes from **comparative weighing**: proving why your impact matters *more* than the alternative outcomes presented by the other three tables.

### 2. The Anatomy of a Bulletproof Closing Extension
When speaking from Closing Government (CG) or Closing Opposition (CO), debaters frequently fall into the trap of "knifing" their opening half or merely repeating opening half points with louder delivery.
* **Vertical Extension:** Taking an argument mentioned briefly by Opening and providing the deep psychological, economic, or logistical *mechanisms* that Opening missed.
* **Horizontal Extension:** Introducing a completely distinct stakeholder group, moral principle, or long-term geopolitical consequence that alters the framework of the round.

### 3. Stakeholder Characterization in the African Context
When debating development, debt restructuring, or environmental conservation in the Global South, avoid cartoonish abstractions. Detail:
1. **Incentive Structures:** Why does a local bureaucrat or community elder act in their rational self-interest?
2. **Resource Constraints:** What is the real-world friction of enforcement, mobile network coverage, or regional trade corridors?
3. **Counterfactual Reality:** What does the world look like if the policy is *not* passed?`,
    downloadUrl: '#',
    tags: ['BP Debate', 'Closing Half', 'Weighing', 'Adjudication'],
    publishedDate: '2026-06-15',
    featured: true
  },
  {
    id: 'res-wsdc-reply',
    title: 'Winning the Reply Speech: The 4-Minute Art of Strategic Crystallization',
    slug: 'winning-the-wsdc-reply-speech',
    category: 'WSDC Strategy',
    difficulty: 'Advanced',
    format: 'WSDC',
    authorName: 'Faith Chebet',
    authorAffiliation: 'Kenya National Schools Debate Coach',
    contentType: 'Cheatsheet',
    readTimeMins: 8,
    summary: 'Master the structure of the WSDC reply speech. Learn how to present an objective judge summary that frames the entire debate around your team’s decisive burdens.',
    contentBody: `### The Reply Speech Philosophy
A reply speech is **not** a fourth speech of line-by-line rebuttal. The reply speaker steps outside the debate like an impartial adjudicator writing a justification for why their side achieved victory.

### The 2-Clash Structure
Structure your 4 minutes around two fundamental questions:
1. **Question 1 (Principle / Rights):** "Which world better upholds fundamental sovereignty or individual moral autonomy?"
2. **Question 2 (Practical Outcomes):** "In which world do vulnerable communities actually receive tangible protections?"

### Key Rules to Never Break
* Do not introduce new examples or new evidentiary claims.
* Directly compare the deepest point of Prop with the deepest point of Opp.
* End with a resonant, memorable 20-second distillation of your team's core narrative.`,
    downloadUrl: '#',
    tags: ['WSDC', 'Reply Speech', 'High School', 'Strategy'],
    publishedDate: '2026-05-20',
    featured: true
  },
  {
    id: 'res-motions-2026',
    title: '100 High-Yield African Policy & Economics Practice Motions (2025/2026)',
    slug: '100-high-yield-african-policy-economics-motions',
    category: 'Motion Bank',
    difficulty: 'Beginner',
    format: 'Universal',
    authorName: 'PADP Editorial Board',
    authorAffiliation: 'Pan-African Debate Platform',
    contentType: 'Motion Bank',
    readTimeMins: 15,
    summary: 'A curated repository of 100 motions spanning the African Continental Free Trade Area (AfCFTA), energy transition, judicial independence, education reform, and pan-African governance.',
    contentBody: `### Category A: Continental Integration & AfCFTA
1. *THR the pace of tariff liberalization under the AfCFTA in favor of bilateral agricultural protection pacts.*
2. *THW establish a unified Pan-African Commercial Court with binding jurisdiction over cross-border infrastructure disputes.*
3. *THS the unilateral adoption of regional currency pegs in East and West Africa.*
4. *THBT African states should prioritize regional manufacturing subsidies over resource-extraction export taxes.*

### Category B: Education, Youth & Labor
5. *THW make critical thinking and formal debate a mandatory national curriculum requirement in secondary schools across Africa.*
6. *THBT African universities should eliminate tuition fees for STEM and agricultural engineering programs at the expense of non-vocational humanities.*
7. *THR the glorification of tech entrepreneurship as the primary solution to African youth unemployment.*

### Category C: Added Motions
8. *This house will prioritize providing students in rural areas with online access to top schools classes over developing actual top schools in their areas.*
9. *This house would require universities to write-off the student debt of any student who graduates in good academic standing but is unable to find a job despite actively seeking employment.*
10. *This house believes that government should abandon universal Secondary education (USE) financing in preference of free TVET education for willing students.*
11. *This House Believes that governments should prioritise the average student over the highest-performing students when designing education policy.*
12. *THBT the drive for universal access to education has come at an unacceptable cost to quality.*
13. *THBT Rwanda's decision to switch the language of instruction from French to English was justified.*
14. *As the Government of Ghana, THW redirect funding from expanding Free SHS access toward teacher recruitment and training.*
15. *In areas of historic economic and academic neglect this house believes that educational charities should prioritise helping exceptional students over all students.*
16. *This house believes that governments in developing nations should prioritize funding for early childhood development to the exclusion of funding for tertiary education.*
17. *This house believes that post colonial states should shape their curricula to focus on locally written Literature to the exclusion of Western authored Literature.*
18. *This House Believes that education systems should be judged primarily by their completion rates, rather than their enrollment rates.*
19. *This House believes that there is no place for censorship in a democracy.*
20. *This House would ban websites that glorify eating disorders.*
21. *This House believes that pornography should be banned.*
22. *This House believes that freedom of expression should not extend to flag burning.*
23. *This House believes that hate speech should be outlawed.*
24. *This House believes that racial vilification should be a crime.*
25. *This House believes that Holocaust denial should be a crime.*
26. *This House believes that fascism should be outlawed.*
27. *This House believes that defamation law is a remedy for the rich.*
28. *This House believes that we should legislate for tolerance.*
29. *This House believes that we are too soft on crime.*
30. *This House believes that we should understand less and condemn more.*
31. *This House believes that we care too much about criminals and not enough about victims.*
32. *This House believes that we should criminalize the payment of ransom.*
33. *This House believes that all illegal immigrants should receive amnesty.*
34. *This House believes that the sexual history of rape victims should be admissible in court.*
35. *This House believes that criminal trials should never be televised.*
36. *This House believes that capital punishment is never justified.*
37. *This House believes that executions should be televised.*
38. *This House believes that following orders should be no excuse.*
39. *This House believes that international crimes should always be tried before an international court.*
40. *This House believes that the United States should ratify the Rome Statute for the International Criminal Court.*
41. *This House believes that old dictators should not have to face the music.*
42. *This House believes that the International Criminal Court will ultimately fail.*
43. *This House believes that the International Criminal Court should prosecute crimes against the democratic process.*
44. *This House believes that we should continue to prosecute World War II war criminals.*
45. *This House believes that juvenile criminals should be strictly punished.*
46. *This House believes that strict punishment is the best way to decrease juvenile crime.*
47. *This House believes that we are too soft on juvenile crime.*
48. *This House believes that criminal trials should be televised.*
49. *This House believes that drunk drivers should lose their licenses for life.*
50. *This House believes that convicted criminals should never lose their right to vote.*
51. *This House believes that the sentences for any attempted violent crime should be the same as if the crime had been completed.*
52. *This House believes that prisoners should be banned from publishing accounts of their crimes.*
53. *This House believes that we should bring back the boot camp.*
54. *This House believes that banning handguns gives criminals the upper hand.*
55. *This House believes that we should abolish trial by jury.*
56. *This House believes that illegal immigrants should be treated like criminals.*
57. *This House believes that teenage criminals should be prosecuted as adults.*
58. *This House believes that judges should be elected.*
59. *This House believes that the judiciary should not be a tool for social change.*
60. *This House believes that there is a different law for the rich.*
61. *This House believes that a language that needs protecting isn’t worth protecting.*
62. *This House believes that cultural treasures should be returned to their places of origin.*
63. *This House believes that governments should subsidize the traditional arts of minority cultures.*
64. *This House believes that the arts should fund themselves.*
65. *This House believes that governments should subsidize the arts.*
66. *This House believes that we should regret the influence of Hollywood.*
67. *This House believes that Hollywood should stop trying to teach history.*
68. *This House believes that the blockbuster has ruined the art of cinema.*
69. *This House believes that democracy is the best system of government for every nation.*
70. *This House believes that democracy is so good that everyone should be made to have it.*
71. *This House believes that democracy should never be compromised for progress.*
72. *This House believes that democracy has failed the developing world.*
73. *This House believes that developing nations need strong dictatorship.*
74. *This House believes that dictatorship is justifiable.*
75. *This House believes that strong dictatorship is better than weak democracy.*
76. *This House believes that alcohol is a greater problem than cigarettes.*
77. *This House believes that marijuana should be treated the same as alcohol and cigarettes.*
78. *This House believes that the war on drugs is not worth the fight.*
79. *This House believes that the war on drugs is a war on the poor.*
80. *This House would fight the war on drugs at home and not abroad.*
81. *This House believes that we should legalize all drugs.*
82. *This House believes that we should legalize soft drugs.*
83. *This House believes that governments should provide heroin addicts with safe injection facilities.*
84. *This House believes that we should ban alcohol.*
85. *This House believes that we should ban the advertising of alcohol.*
86. *This House believes that smoking should be banned in public places.*
87. *This House believes that the government should ban smoking.*
88. *This House believes that tobacco companies should compensate individual smokers.*
89. *This House believes that we should ban all tobacco advertising.*
90. *This House believes that tobacco companies should not be allowed to sponsor sports.*
91. *This House believes that the costs of capitalism outweigh the benefits.*
92. *This House believes that we should ban discretionary bonuses for corporate executives.*
93. *This House believes that we should blame the regulators for the financial crisis rather than the banks.*
94. *This House believes that we should blame the financial crisis on Main Street, not Wall Street.*
95. *This House believes that the resignation of senior management without severance pay should be a prerequisite for receiving government bailouts.*
96. *This House would refuse to bail out failed banks.*
97. *This House believes that the euro will ultimately fail.*
98. *This House believes that trading hours should be unrestricted.*
99. *This House believes that the only fair trade is free trade.*
100. *This House believes that we have gone too far down the path of free trade.*
101. *This House believes that we still need trade barriers.*
102. *This House believes that we should subsidize traditional industries.*
103. *This House believes that we should support free trade.*
104. *This House believes that we should regret the existence of trade blocs.*
105. *This House believes that the World Trade Organization is a friend of the developing world.*
106. *This House believes that free trade harms the developing world.*
107. *This House believes that we should support absolutely free movement of labor across national borders.*
108. *This House believes that we need a single world currency.*
109. *This House believes that banking should be nationalized.*
110. *This House believes that the government should buy back major public utilities.*
111. *This House believes that we should privatize the lot.*
112. *This House believes that all education should be free.*
113. *This House believes that all school exams should be replaced by other forms of assessment.*
114. *This House believes that money spent on sending students to foreign countries is money well spent.*
115. *This House believes that the government should spend more on education.*
116. *This House believes that corporatization of universities harms the cause of knowledge.*
117. *This House believes that homeschooling should be banned.*
118. *This House believes that all schools should be coeducational.*
119. *This House believes that homework should be banned for primary students.*
120. *This House believes that interschool competitive sports do more harm than good.*
121. *This House believes that school attendance should be voluntary.*
122. *This House believes that school days are the best days of our lives.*
123. *This House believes that school days should be longer and fewer.*
124. *This House believes that school uniforms should be compulsory.*
125. *This House believes that school uniforms should be scrapped.*
126. *This House believes that schools should focus on preparing students for jobs.*
127. *This House believes that schools should not give assignments over the school holidays.*
128. *This House believes that high school students’ right to privacy is more important than their parents’ right to know.*
129. *This House believes that all high schools should be required to install condom machines.*
130. *This House believes that high school should be optional.*
131. *This House believes that high school proms should be banned.*
132. *This House believes that there is a crisis is boys’ education.*
133. *This House believes that we should abolish public funding for private schools.*
134. *This House believes that we should bring back corporal punishment in schools.*
135. *This House believes that we should have to learn a foreign language at school.*
136. *This House believes that schools should focus more on reading, writing, and arithmetic.*
137. *This House believes that schools should be prohibited from selecting students on the basis of academic ability.*
138. *This House believes that schools should never be allowed to use faith-based admissions policies.*
139. *This House believes that we should support the right to strike.*
140. *This House believes that strikers should be sacked.*
141. *This House believes that the strike is a fair weapon.*
142. *This House believes that providers of essential services should have the right to strike.*
143. *This House believes that trade unionism threatens democracy.*
144. *This House believes that trade unions have become irrelevant.*
145. *This House believes that trade unions have too much power.*
146. *This House believes that we should support compulsory unionism.*
147. *This House believes that trade unions impede progress.*
148. *This House believes that we should abolish the minimum wage.*
149. *This House believes that we should support a maximum wage.*
150. *This House believes that the minimum working age should be increased.*
151. *This House believes that there should be a mandatory retirement age.*
152. *This House believes that we should be required to work for unemployment benefits.*
153. *This House would require people to work in return for welfare payments.*
154. *This House believes that dams should be damned.*
155. *This House believes that environmental treaties do more harm than good.*
156. *This House believes that recreational fishing and hunting should be banned.*
157. *This House believes that there is not enough gold to go green.*
158. *This House believes that economic growth is the solution to climate change.*
159. *This House believes that we should sacrifice economic growth for the good of the environment.*
160. *This House believes that modern agriculture is bad for local communities.*
161. *This House would make the development of clean industry a condition for receiving nonemergency aid.*
162. *This House believes that we should still support the Kyoto agreement.*
163. *This House believes that the United States was justified in abandoning Kyoto.*
164. *This House believes that we should support international trading of pollution permits.*
165. *This House believes that global warming should be our No. 1 priority.*
166. *This House believes that we should abandon fossil fuels.*
167. *This House believes that we should pay developing countries not to log their rainforests.*
168. *This House believes that eco-tourism has failed.*
169. *This House believes that we should not allow commercial tourism in national parks.*
170. *This House believes that feminism has failed.*
171. *This House believes that feminism is corrupting the family.*
172. *This House believes that feminism is dead.*
173. *This House believes that the West should treat state-sponsored sexism as apartheid.*
174. *This House believes that we should regret feminism.*
175. *This House believes that we should reserve seats in Congress for women.*
176. *This House believes that women should fight in the front line.*
177. *This House believes that large companies should be required to implement gender quotas for executive positions.*
178. *This House believes that housewives should be paid for their work by the government.*
179. *This House believes that marriage is an outdated institution.*
180. *This House believes that the law should treat married couples and unmarried couples in exactly the same way.*
181. *This House believes that the bride should wear black.*
182. *This House believes that we should make divorce easier.*
183. *This House believes that every company should be required to provide paid parental leave.*
184. *This House believes that the government should pay women to have babies.*
185. *This House believes that parents should have the final say on medical treatment of their children.*
186. *This House believes that we should “out” gay celebrities.*
187. *This House believes that we should legalize same-sex marriage.*
188. *This House believes that same-sex couples should be allowed to adopt children.*
189. *This House believes that all borders should be open.*
190. *This House believes that globalization is killing local cultures.*
191. *This House believes that globalization marginalizes the poor.*
192. *This House believes that it would be better to live on a desert island than in the global village.*
193. *This House believes that high fences make good neighbors.*
194. *This House believes that multinational corporations are the new imperialists.*
195. *This House believes that multinational corporations do more harm than good.*
196. *This House believes that we should protest against McDonald’s.*
197. *This House believes that the nation-state is out of date.*
198. *This House believes that there are no such things as universal human rights.*
199. *This House believes that we should pay compensation for the injustices of past generations.*
200. *This House believes that torture is justified.*
201. *This House would refuse to see any intelligence that may have been obtained through torture.*
202. *This House believes that aid to developing nations should be tied to human rights.*
203. *This House believes that child labor is justifiable in the developing world.*
204. *This House believes that human rights are a luxury the developing world cannot afford.*
205. *This House believes that “economic, social, and cultural rights” should not be recognized as human rights at all.*
206. *This House believes that rice is more important than rights.*
207. *This House believes that the only human right is the right to good governance.*
208. *This House believes that the one-child policy is justifiable.*
209. *This House believes that we should boycott companies that use child labor.*
210. *This House believes that capitalism provides for a better society than socialism does.*
211. *This House believes that we should regret the demise of communism.*
212. *This House believes that the nation’s problems are better solved by the private sector than by government.*
213. *This House believes that we should give Marxism another try.*
214. *This House believes that public services are best run by private companies.*
215. *This House believes that we should have universal health care.*
216. *This House believes that a fairer society needs higher taxation.*
217. *This House believes that the government that governs least governs best.*
218. *This House believes that equality is the benchmark of society.*
219. *This House believes that equity is more important than efficiency.*
220. *This House believes that low taxes are preferable to extensive government services.*
221. *This House believes that “equal opportunity” is unfair.*
222. *This House believes that taxation is theft.*
223. *This House believes that the welfare state is a right.*
224. *This House believes that there must always be the poor.*
225. *This House believes that we should abolish direct taxation.*
226. *This House believes that we should support affirmative action.*
227. *This House believes that wealth is the only legitimate basis for affirmative action.*
228. *This House believes that civil disobedience is justifiable in a democracy.*
229. *This House believes that private organizations should not be allowed to exclude members on the basis of race.*
230. *This House believes that the Boy Scouts of America should be prohibited from excluding members on the basis of sexuality or religious belief.*
231. *This House would ban homosexual “re-education” camps and publications.*
232. *This House believes that national security concerns justify the restriction of civil liberties.*
233. *This House believes that we should not compromise civil liberties in the interests of security.*
234. *This House believes that victimless crimes should not be crimes at all.*
235. *This House believes that prostitution should be legalized.*
236. *This House believes that the government should stop protecting citizens from themselves.*
237. *This House believes that polygamy should be legal.*
238. *This House believes that all gambling should be banned.*
239. *This House would ban smoking in public places.*
240. *This House believes that we should reintroduce national service.*
241. *This House believes that governments should not be allowed to use prisoners as laborers in the community.*
242. *This House believes that individualism is dead.*
243. *This House believes that national service should be compulsory.*
244. *This House believes that we should break a bad law.*
245. *This House believes that extremism in the defense of liberty is justifiable.*
246. *This House believes that we should break the law in the interests of justice.*
247. *This House believes that we should break the law to protect the rights of animals.*
248. *This House supports the “Responsibility to Protect”.*
249. *This House believes that a government has no duty to protect the citizens of other nations.*
250. *This House believes than an ethical foreign policy is no foreign policy.*
251. *This House believes that might is right.*
252. *This House believes that we should ban all landmines immediately.*
253. *This House believes that we should plan for peace by preparing for war.*
254. *This House believes that we should support missile defense.*
255. *This House believes that we should trade land for peace.*
256. *This House believes that espionage is immoral.*
257. *This House believes that funding insurgencies in totalitarian regimes is a legitimate tool of foreign policy.*
258. *This House believes that the world is facing a clash of civilizations.*
259. *This House believes that economic sanctions are preferable to war.*
260. *This House believes that economic sanctions do more harm than good.*
261. *This House believes that NATO is no longer necessary.*
262. *This House believes that Russia should join NATO.*
263. *This House believes that the NATO bombing of Yugoslavia was justified.*
264. *This House believes that the world was better with the Berlin Wall.*
265. *This House believes that two superpowers are better than one.*
266. *This House believes that the United Nations should take a greater role as a global enforcer.*
267. *This House believes that the United Nations has failed.*
268. *This House believes that the United Nations should have a standing army.*
269. *This House believes that political assassinations are a legitimate tool of foreign policy.*
270. *This House believes that the assassination of dictators is justifiable.*
271. *This House believes that the second war with Iraq was justified.*
272. *This House would partition Iraq.*
273. *This House believes that President Karzai is part of the problem.*
274. *This House believes that NATO will go the way of the Soviets in Afghanistan.*
275. *This House would arm local militias to fight the Taliban in Afghanistan.*
276. *This House believes that the world needs America to be its policeman.*
277. *This House believes that the United States is not needed in Southeast Asia.*
278. *This House believes that we should support United States military bases in Asia.*
279. *This House believes that we should intervene militarily in other people’s wars.*
280. *This House believes that we should invade in the interests of democracy.*
281. *This House believes that we should never bomb for human rights.*
282. *This House believes that we should keep peacekeepers out of civil wars.*
283. *This House believes that Marx would approve of the Internet.*
284. *This House believes that kids spend too much time on the Internet.*
285. *This House believes that the Internet will be the death of intellectual property.*
286. *This House believes that we should welcome big business to the Internet.*
287. *This House believes that we’re caught in the web.*
288. *This House believes that Internet search engines should boycott China until it allows its citizens unrestricted access to the web.*
289. *This House believes that Google is too powerful.*
290. *This House believes that we should fear Google.*
291. *This House supports Google’s policy on China.*
292. *This House believes that there should be no right to privacy on the web.*
293. *This House believes that Microsoft is too big.*
294. *This House believes that Microsoft should be broken up.*
295. *This House believes that the media has become too powerful.*
296. *This House believes that the media is more powerful than government.*
297. *This House believes that the media is more powerful than the church.*
298. *This House believes that we should tame the tabloids.*
299. *This House believes that we should trust the media.*
300. *This House believes that freedom of the press is limited to those who own one.*
301. *This House believes that television news coverage is too violent.*
302. *This House believes that the right to a free press is more important than the right to a fair trial.*
303. *This House believes that reality TV reinforces demeaning social stereotypes.*
304. *This House believes that governments should regulate the media.*
305. *This House believes that the state should have no formal role in broadcasting.*
306. *This House believes that the media plays too great a role in modern politics.*
307. *This House believes that the media exerts too much influence over young people.*
308. *This House believes that Hollywood celebrities are a poor role model for our youth.*
309. *This House believes that advertising does more harm than good.*
310. *This House believes that advertising is a curse.*
311. *This House believes that there is too much advertising in our society.*
312. *This House believes that public figures have the right to private lives.*
313. *This House believes that the private lives of politicians should be public business.*
314. *This House believes that the private lives of public figures should not be public property.*
315. *This House believes that the public’s right to know outweighs a candidate’s right to privacy.*
316. *This House believes that non-nuclear nations should stay that way.*
317. *This House believes that we should regret the nuclear age.*
318. *This House believes that every nation should have the right to defend itself with nuclear weapons.*
319. *This House believes that we should abolish the Nuclear NonProliferation Treaty.*
320. *This House believes that we should ban all nuclear weapons.*
321. *This House believes that we should support the nuclear deterrent.*
322. *This House believes that coal and oil are a greater danger than nuclear power.*
323. *This House believes that we should support the use of nuclear energy.*
324. *This House believes that we should abandon civilian use of nuclear energy.*
325. *This House believes that small parties and independents impede the parliamentary process.*
326. *This House believes that the two-party system has failed us.*
327. *This House believes that there is too much secrecy in government.*
328. *This House believes that politicians should follow popular opinion over personal judgment.*
329. *This House believes that a good political leader is more decisive than responsive.*
330. *This House believes that parliaments should have only one chamber.*
331. *This House believes that election campaigns should be fully financed by the state.*
332. *This House believes that the media should be required to limit political advertising during election campaigns.*
333. *This House believes that voting should be compulsory.*
334. *This House believes that “parliamentary privilege” should be abolished.*
335. *This House believes that proportional representation serves better than “first past the post”.*
336. *This House believes that presidential nominees should be elected through a single, one-day primary.*
337. *This House believes that our leaders are not equal to the challenges of tomorrow.*
338. *This House believes that our leaders have failed us.*
339. *This House believes that political courage is dead.*
340. *This House believes that our politicians deserve more respect.*
341. *This House believes that we should regret the rise of career politicians.*
342. *This House believes that our political leaders worry too much about the next election.*
343. *This House believes that we should regret the influence of political polls.*
344. *This House believes that politicians should only be allowed to serve in office for a limited period of time.*
345. *This House believes that politicians who lie should always lose their jobs.*
346. *This House would allow special interest groups to sue political parties for broken electoral promises.*
347. *This House believes that politicians should be paid more.*
348. *This House believes that political correctness has gone too far.*
349. *This House believes that political correctness is necessary to achieve social justice.*
350. *This House believes that developing nations should not follow the western model.*
351. *This House believes that sustainable development is a myth.*
352. *This House believes that developing nations should nationalize their energy resources.*
353. *This House believes that the World Bank is part of the problem.*
354. *This House believes that trade is better than aid.*
355. *This House believes that foreign aid is a barrier to development.*
356. *This House believes that we should forgive third-world debt.*
357. *This House believes that we should remove patents on pharmaceutical drugs for the developing world.*
358. *This House believes that we should regret the end of the population explosion.*
359. *This House believes that we should support increased population control.*
360. *This House believes that we should support population control by legislation.*
361. *This House believes that population control should be a prerequisite of foreign aid.*
362. *This House believes that universal primary education in developing economies is a waste of money.*
363. *This House believes that we should allow more immigration.*
364. *This House believes that multiculturalism is a mirage.*
365. *This House believes that the melting pot has failed.*
366. *This House believes that we should support indigenous claims to selfdetermination.*
367. *This House believes that hunting without licenses should be allowed for indigenous people.*
368. *This House believes that racial minorities should have reserved seats in Congress.*
369. *This House believes that religion has no place in schools.*
370. *This House believes that all schools should be required to teach the theory of evolution.*
371. *This House would not allow “intelligent design” in any school science curriculum.*
372. *This House believes that the church should pay more attention to the opinion polls.*
373. *This House believes that the Pope should get married.*
374. *This House believes that science has made god redundant.*
375. *This House believes that governments should leave cults alone.*
376. *This House would ban government funding of religious schools.*
377. *This House would ban religious symbols in state schools.*
378. *This House believes that the church should stay out of politics.*
379. *This House would require all those in positions of religious authorities to be licensed by the state.*
380. *This House believes that religious believers should be allowed to submit to the binding jurisdiction of religious courts.*
381. *This House believes that science and technology are advancing at a rate too fast for the good of society.*
382. *This House believes that science is the enemy of the people.*
383. *This House believes that we let technology do too much.*
384. *This House believes that medical technology has outstripped morality.*
385. *This House believes that governments should not place limits on which questions scientists may research.*
386. *This House believes that intellectual property should not be property at all.*
387. *This House believes that patenting of gene technology should be banned.*
388. *This House believes that patenting of medical findings is justified.*
389. *This House believes that the results of scientific research should be free for use by everyone.*
390. *This House believes that companies and researchers should not recognize clinical trials conducted with poor participants in developing nations.*
391. *This House would legalize current technologies for choosing human embryos on the basis of their genetic characteristics.*
392. *This House believes that genetic screening should be banned.*
393. *This House believes that insurance companies should be able to do genetic testing.*
394. *This House believes that we should support compulsory AIDS testing.*
395. *This House believes that employers should be allowed to drug-test their employees.*
396. *This House believes that we should allow surrogacy for profit.*
397. *This House believes that we should allow surrogate motherhood.*
398. *This House believes that cosmetic surgery should be banned.*
399. *This House would ban the use of models who are below a healthy weight.*
400. *This House would permit the sale of medical organs for profit.*
401. *This House would prioritize organ donations to those who have lived a healthy lifestyle.*
402. *This House believes that we should ban reproductive technology.*
403. *This House believes that the father should always be present at conception.*
404. *This House believes that we should clone humans.*
405. *This House believes that we should send in the clones.*
406. *This House believes that we should genetically engineer farm animals.*
407. *This House believes that we should support genetic engineering.*
408. *This House believes that the benefits of genetic engineering outweigh the risks.*
409. *This House believes that we should ban genetically modified products.*
410. *This House would make use of genetically modified crops to feed the world.*
411. *This House believes that the sanctity of life ought to be valued over the quality of life.*
412. *This House believes that we place too much faith in the medical profession.*
413. *This House believes that we should allow research on fetal stem cell tissue.*
414. *This House believes that we should have a comprehensive DNA database.*
415. *This House believes that we should legalize voluntary euthanasia.*
416. *This House believes that there is no such thing as a right to die.*
417. *This House believes that we should outlaw genetic discrimination.*
418. *This House believes that we should ban all experimentation on animals.*
419. *This House believes that abortion is justifiable.*
420. *This House would ban abortion except in cases where the mother’s health is at risk.*
421. *This House believes that every woman has an absolute right to an abortion.*
422. *This House believes that Mars should wait.*
423. *This House believes that space exploration should be left to private enterprise.*
424. *This House believes that the cost of space exploration is justified.*
425. *This House believes that the international space station should never have been built.*
426. *This House believes that we should go back to the moon.*
427. *This House believes that we should support space exploration.*
428. *This House believes that we should welcome space tourism.*
429. *This House believes that the United States of Africa would be a good idea.*
430. *This House believes that all development aid for Africa should be provided through the African Union.*
431. *This House believes that Australia has a shameful human rights record.*
432. *This House believes that Australasia should have a court of human rights.*
433. *This House believes that Asia should take the liberal path.*
434. *This House believes that ASEAN should adopt East Timor.*
435. *This House believes that ASEAN should have its own parliament.*
436. *This House believes that Australia should play policeman in the South Pacific.*
437. *This House believes that Australia should stop being Uncle Sam’s nephew.*
438. *This House believes that East Timor’s blood is on Australia’s hands.*
439. *This House believes that the world has failed East Timor.*
440. *This House believes that Indonesia should turn its back on democracy.*
441. *This House believes that West Papua should be independent.*
442. *This House believes that China should free Tibet.*
443. *This House believes that we should recognize an independent Taiwan.*
444. *This House believes that democracy has failed India.*
445. *This House believes that we should condemn Singapore’s human rights record.*
446. *This House believes that we should fear China.*
447. *This House believes that we should fear Pakistan.*
448. *This House believes that the West should end military cooperation with Pakistan.*
449. *This House believes that Japan should have a permanent seat on the United Nations Security Council.*
450. *This House believes that the European Union should have its own army.*
451. *This House believes that the European Union is a triumph for bureaucracy over democracy.*
452. *This House believes that Europe should have a single foreign policy.*
453. *This House believes that Israeli incursions into Gaza are justified.*
454. *This House believes that the United States should match is military aid to Israel with an equal amount of humanitarian aid to Palestine.*
455. *This House believes that the Middle East peace process will never succeed.*
456. *This House believes that the West should stop excusing Israel.*
457. *This House believes that the West should leave the Middle East alone.*
458. *This House believes that the United States should bomb Iran now.*
459. *This House believes that democracy is the best way forward for Russia.*
460. *This House believes that Canada should become the 51st state.*
461. *This House believes that Canada should not be fighting America’s wars.*
462. *This House believes that NAFTA should be abolished.*
463. *This House believes that the American dream has become a nightmare.*
464. *This House believes that the Statue of Liberty is anything but.*
465. *This House believes that the United States should be condemned for its human rights record.*
466. *This House believes that Obama will fail.*
467. *This House believes that the United States is in decline.*
468. *This House believes that Uncle Sam is a bad relative.*
469. *This House believes that the United States should withdraw from its military bases in Asia.*
470. *This House believes that the United States should immediately end its embargo on Cuba.*
471. *This House believes that the sun is sinking on the West.*
472. *This House believes that we are too obsessed with sports.*
473. *This House believes that we pay too much attention to sports.*
474. *This House believes that our sporting heroes don’t deserve our admiration.*
475. *This House believes that sports and politics should not mix.*
476. *This House believes that sports teams should be responsible for the illegal actions of their players.*
477. *This House believes that ice-hockey players who fight on the ice should be more severely punished.*
478. *This House believes that television networks should be required to broadcast men’s and women’s sports equally.*
479. *This House believes that sport has become too competitive.*
480. *This House believes that salary caps should be prohibited in professional sports.*
481. *This House believes that one city should be designated to host the Olympics permanently.*
482. *This House believes that only democratic countries should be allowed to host the Olympics.*
483. *This House believes that the Olympic ideal is dead.*
484. *This House believes that we should do away with the Olympic Games.*
485. *This House believes that professionalism has ruined the Olympic Games.*
486. *This House believes that commercialism has ruined sports.*
487. *This House believes that there is too much money in sports.*
488. *This House believes that sponsorship is ruining sports.*
489. *This House believes that we should ban boxing.*
490. *This House believes that we should ban hunting with hounds.*
491. *This House believes that we should legalize performance-enhancing drugs in sports.*
492. *This House believes that the world has changed for the better since September 11.*
493. *This House believes that United States foreign policy deserves to be blamed for September 11.*
494. *This House believes that we should limit the reporting of terrorist attacks.*
495. *This House believes that the world has learned nothing from September 11.*
496. *This House believes that social injustice justifies political violence.*
497. *This House believes that terrorism is never justified.*
498. *This House believes that there is a time for terrorism.*
499. *This House believes that environmentalists should use terrorism in support of their goals.*
500. *This House believes that long-term negotiation is the best response to terrorism.*
501. *This House believes that negotiation with terrorists is justified.*
502. *This House believes that we should talk to terrorists.*
503. *This House believes that the war on terror is Al-Qaeda’s greatest victory.*
504. *This House believes that the best war on terror is the war on poverty.*
505. *This House believes that children should play less and study more.*
506. *This House believes that kids today have it too easy.*
507. *This House believes that parents should have the right to spank their children.*
508. *This House believes that the voting age should be lowered.*
509. *This House believes that parents should be allowed to cast proxy votes for their children.*
510. *This House believes that youth icons make poor role models.*
511. *This House believes that child beauty pageants should be banned.*
512. *This House believes that we are the lost generation.*
513. *This House would ban all physical punishment of children by their parents.*
514. *This House believes that country life is better than city life.*
515. *This House believes that it’s not whether you win or lose but how you play the game.*
516. *This House believes that the government should do more to support traditional families.*
517. *This House believes that we should restrict vehicle access to the city.*
518. *This House believes that zoos should be closed.*`,
    downloadUrl: '#',
    tags: ['Motions', 'AfCFTA', 'Economics', 'Practice'],
    publishedDate: '2026-07-01',
    featured: true
  },
  {
    id: 'res-adjudication-scale',
    title: 'The Continental Adjudicator Rubric: Breaking Down the 50-100 Speaker Scale',
    slug: 'continental-adjudicator-rubric-speaker-scale',
    category: 'Adjudication',
    difficulty: 'Intermediate',
    format: 'BP',
    authorName: 'Brian Ochieng',
    authorAffiliation: 'East Africa Debate Council',
    contentType: 'Guide',
    readTimeMins: 10,
    summary: 'An adjudication handbook explaining how to objectively evaluate speaker marks from 70 (average/flawed) to 80+ (world-class), avoiding regional accents or stylistic bias.',
    contentBody: `### Speaker Scale Anchors in African Circuits
* **75 (The Benchmark Average):** A speech that provides logically sound arguments, reasonable time allocation, and basic rebuttal, but lacks deep comparative weighing or complex mechanistic proofs.
* **78-79 (Very Good / Breaking Standard):** Consistently identifies the most critical clashes in the round, answers opposing best-case scenarios, and constructs robust vertical/horizontal analysis.
* **82-84 (World-Class / Flagship Outround):** Outstanding conceptual clarity, flawless structural prioritization, anticipates nuanced counterfactuals, and leaves no logical gaps.`,
    downloadUrl: '#',
    tags: ['Adjudication', 'Speaker Scale', 'Judging', 'Fairness'],
    publishedDate: '2026-04-10',
    featured: false
  }
];

export const SEED_PRACTICE_SESSIONS: PracticeSession[] = [
  {
    id: 'prac-pan-african-sunday',
    title: 'Pan-African Sunday BP Sparring Round',
    slug: 'pan-african-sunday-bp-sparring-round',
    hostOrg: 'Rwanda Debate Association',
    hostName: 'Yvette Uwase',
    sessionType: 'Online Sparring',
    format: 'BP',
    sessionDate: '2026-08-30',
    timeUTC: '14:00 UTC (16:00 CAT / 17:00 EAT)',
    durationMins: 90,
    platform: 'Discord',
    meetingLink: 'https://discord.gg/padp-africa',
    slotsAvailable: 8,
    slotsFilled: 5,
    skillLevel: 'All Levels',
    motionPrompt: 'Motion will be released 15 mins prior to debate (Focus: African Geopolitics / Economics)',
    contactEmail: 'sparring@rwandadebate.org',
    notes: 'Please join Discord 10 minutes early. Adjudication feedback will be provided by certified judges.',
    region: 'Pan-African & Global',
    rsvps: ['rwemera30@gmail.com', 'debater_ke@gmail.com']
  },
  {
    id: 'prac-west-africa-novice',
    title: 'West Africa Novice BP Motion Breakdown & Mock Round',
    slug: 'west-africa-novice-bp-motion-breakdown',
    hostOrg: 'Legon Debate Society',
    hostName: 'Kofi Boakye',
    sessionType: 'Novice Training',
    format: 'BP',
    sessionDate: '2026-09-02',
    timeUTC: '17:00 UTC (17:00 GMT / 18:00 WAT)',
    durationMins: 120,
    platform: 'Google Meet',
    meetingLink: 'https://meet.google.com/padp-novice-spar',
    slotsAvailable: 12,
    slotsFilled: 8,
    skillLevel: 'Novice',
    motionPrompt: 'THBT African governments should nationalize critical critical-mineral mining concessions.',
    contactEmail: 'training@legondebate.org',
    notes: 'Includes a 30-minute masterclass on Opening Half modeling before the debate round begins.',
    region: 'West Africa',
    rsvps: ['novice_gh@gmail.com']
  },
  {
    id: 'prac-schools-wsdc-spar',
    title: 'East Africa High Schools WSDC Scrimmage',
    slug: 'east-africa-high-schools-wsdc-scrimmage',
    hostOrg: 'iDebate Rwanda',
    hostName: 'Jean-Paul Ndoli',
    sessionType: 'Online Sparring',
    format: 'WSDC',
    sessionDate: '2026-09-06',
    timeUTC: '12:00 UTC (14:00 CAT / 15:00 EAT)',
    durationMins: 90,
    platform: 'Zoom',
    meetingLink: 'https://zoom.us/j/padp-wsdc-scrimmage',
    slotsAvailable: 6,
    slotsFilled: 4,
    skillLevel: 'Intermediate',
    motionPrompt: 'Prepared Motion: THBT developing nations should eliminate intellectual property protections on climate adaptation technology.',
    contactEmail: 'schools@debaterwanda.org',
    notes: 'Open to secondary school debaters in Kenya, Rwanda, Uganda, Tanzania.',
    region: 'East Africa',
    rsvps: []
  },
  {
    id: 'prac-eaudc-timeline-meeting',
    title: 'EAUDC 2026 Timeline Planning & Regional Council Meeting',
    slug: 'eaudc-timeline-planning-meeting-2026',
    hostOrg: 'East Africa Universities Debating Championship (EAUDC) Council',
    hostName: 'EAUDC Executive Secretariat',
    sessionType: 'Novice Training',
    format: 'BP',
    sessionDate: '2026-08-31',
    timeUTC: '16:00 UTC (19:00 – 19:45 EAT / GMT+3)',
    durationMins: 45,
    platform: 'Google Meet',
    meetingLink: 'https://meet.google.com/hqs-uftn-vfx',
    slotsAvailable: 100,
    slotsFilled: 38,
    skillLevel: 'All Levels',
    motionPrompt: 'Continental & Regional Agenda: Finalizing 2026 EAUDC tournament dates, bidding timeline, regional circuit coordination, and institutional registrations.',
    contactEmail: 'secretariat@eaudc.org',
    notes: 'Open to all university society leaders, council representatives, debaters, and prospective hosts across East Africa. Join Google Meet promptly at 19:00 EAT.',
    region: 'East Africa',
    rsvps: ['rwemera30@gmail.com']
  },
  {
    id: 'prac-nsda-wsdc-judge-clinic',
    title: 'TOC Season Opener: WSDC & PF Judge Accreditation Clinic',
    slug: 'toc-season-opener-wsdc-judge-accreditation-clinic',
    hostOrg: 'University of Kentucky Intercollegiate Debate & TOC',
    hostName: 'Kelsey Johnson',
    sessionType: 'Adjudication Workshop',
    format: 'WSDC',
    sessionDate: '2026-09-09',
    timeUTC: '18:00 UTC (14:00 ET / 20:00 CAT / 21:00 EAT)',
    durationMins: 90,
    platform: 'Zoom',
    meetingLink: 'https://www.tabroom.com',
    slotsAvailable: 80,
    slotsFilled: 26,
    skillLevel: 'All Levels',
    motionPrompt: 'Comprehensive adjudication masterclass covering World Schools Debate ballot calibration, content/style/strategy rubrics, and managing international breakout judging.',
    contactEmail: 'tournamentofchampions@uky.edu',
    notes: 'Judges in World Schools Debate will receive pre-tournament accreditation and certification prior to the online TOC Season Opener.',
    region: 'Pan-African & Global',
    rsvps: []
  }
];

export const SEED_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-uhuru-worlds-judge-call',
    title: 'Uhuru Worlds 2026 Judge Registration & Subsidy Call',
    slug: 'uhuru-worlds-2026-judge-registration-subsidy-call',
    organizationName: 'Uhuru Worlds Organising Committee',
    opportunityType: 'Adjudicator Subsidy',
    countryScope: 'Pan-African & International',
    country: 'South Africa',
    region: 'Pan-African & Global',
    deliveryMode: 'Online',
    format: 'BP',
    deadline: '2026-09-22',
    eligibilityCriteria: 'Certified and developing parliamentary adjudicators across Africa and globally. Reg closes Sep 22 at 00:00 UTC+1.',
    fundingAmount: 'Waived Registration + Outround Adjudication Honorarium',
    description: 'Uhuru Worlds enters its 6th edition with a 500-team cap. Adjudicators can register for international judging pools, panel chairs, and training opportunities.',
    applicationLink: 'https://forms.gle/Y9uCju9sQ2Djynns9',
    isFunded: true,
    tags: ['Uhuru Worlds', 'Adjudication', 'Subsidy', 'BP', 'Online', 'Global']
  },
  {
    id: 'opp-kyudo-teammate-hub',
    title: 'KYUDO\'26 Teammate & Adjudicator Matchmaking Hub',
    slug: 'kyudo-2026-teammate-adjudicator-matchmaking-hub',
    organizationName: 'Kyambogo University Debate Society (KYUDS)',
    opportunityType: 'Coaching Call',
    countryScope: 'East Africa (Uganda, Kenya, Rwanda, Tanzania)',
    country: 'Uganda',
    region: 'East Africa',
    deliveryMode: 'Hybrid',
    format: 'BP',
    deadline: '2026-08-30',
    eligibilityCriteria: 'Debaters seeking composite teammates or institutional adjudicators looking for accredited judging spots at KYUDO\'26.',
    fundingAmount: 'Teammate Matching + Registration Support',
    description: 'Official matching community for teams and individual debaters needing a sparring partner or composite teammate before Phase 2 closes on August 30.',
    applicationLink: 'https://chat.whatsapp.com/G1tmFQTIRd5Jv2GMSxkQ3q?s=cl&p=a&mlu=4',
    isFunded: false,
    tags: ['KYUDO26', 'KYUDS', 'Teammate Match', 'Uganda', 'East Africa']
  },
  {
    id: 'opp-paudc-subsidy',
    title: 'PAUDC 2026 Adjudication Equity & Travel Subsidy',
    slug: 'paudc-2026-adjudication-equity-travel-subsidy',
    organizationName: 'Pan-African Debate Council',
    opportunityType: 'Adjudicator Subsidy',
    countryScope: 'Pan-African (All African Nations)',
    country: 'Kenya',
    region: 'East Africa',
    deliveryMode: 'In-Person',
    format: 'BP',
    deadline: '2026-09-15',
    eligibilityCriteria: 'Certified independent adjudicators from emerging debate societies or underrepresented regions across Africa.',
    fundingAmount: 'Full Accommodation + $300 Travel Stipend',
    description: 'Provides full or partial accommodation and travel assistance to qualified adjudicators to ensure equitable representation on adjudication panels at PAUDC 2026 in Nairobi.',
    applicationLink: 'https://paudc2026.org/adjudication-subsidy',
    isFunded: true,
    tags: ['Funded', 'PAUDC', 'Adjudication', 'Travel Grant']
  },
  {
    id: 'opp-young-debater-fellowship',
    title: 'African Youth Debate & Civic Leadership Fellowship 2026',
    slug: 'african-youth-debate-civic-leadership-fellowship-2026',
    organizationName: 'Pan-African Debate Platform Initiative',
    opportunityType: 'Fellowship',
    countryScope: 'Pan-African',
    country: 'Pan-African',
    region: 'Pan-African & Global',
    deliveryMode: 'Hybrid',
    format: 'All Formats',
    deadline: '2026-10-01',
    eligibilityCriteria: 'Young debaters and coaches aged 18-28 actively running or founding debate societies in African universities or high schools.',
    fundingAmount: '$1,500 Society Grant + Mentorship',
    description: 'A 6-month intensive leadership and debate curriculum including mentorship from world championship debaters, resource grants, and society incubation support.',
    applicationLink: 'https://padp.africa/fellowship',
    isFunded: true,
    tags: ['Fellowship', 'Leadership', 'Mentorship', 'Grant']
  },
  {
    id: 'opp-kigali-camp-volunteer',
    title: 'Volunteer Debate Trainers & Mentors (Kigali Debate Camp)',
    slug: 'volunteer-debate-trainers-kigali-debate-camp',
    organizationName: 'iDebate Rwanda',
    opportunityType: 'Debate Camp',
    countryScope: 'East Africa / Global',
    country: 'Rwanda',
    region: 'East Africa',
    deliveryMode: 'In-Person',
    format: 'WSDC',
    deadline: '2026-08-31',
    eligibilityCriteria: 'Experienced university debaters with at least 2 years of competitive BP or WSDC experience and a passion for youth mentorship.',
    fundingAmount: 'Lodging & Meals Provided in Kigali',
    description: 'Join a team of 20 international and regional coaches teaching 200+ high school students public speaking, case construction, and leadership in Kigali.',
    applicationLink: 'https://debaterwanda.org/coach-call',
    isFunded: false,
    tags: ['Volunteering', 'Coaching', 'Kigali', 'High School']
  },
  {
    id: 'opp-west-africa-circuit-grant',
    title: 'West Africa High School Circuit Development Grant',
    slug: 'west-africa-high-school-circuit-development-grant',
    organizationName: 'Legon Speech & Debate Society',
    opportunityType: 'Grant',
    countryScope: 'West Africa (Ghana, Nigeria, Sierra Leone, Liberia, Gambia)',
    country: 'Ghana',
    region: 'West Africa',
    deliveryMode: 'Online',
    format: 'WSDC',
    deadline: '2026-10-15',
    eligibilityCriteria: 'Secondary school teachers and student captains initiating newly registered debate clubs.',
    fundingAmount: '$500 Starter Grant + Rulebooks & Training Materials',
    description: 'Direct micro-grants for school clubs to acquire debate materials, subsidize internet data for online scrimmages, and host local invitationals.',
    applicationLink: 'https://legondebate.org/grants',
    isFunded: true,
    tags: ['Grant', 'West Africa', 'Schools', 'Development']
  },
  {
    id: 'opp-south-africa-masters-scholarship',
    title: 'Southern Africa Parliamentary Adjudication Masters Scholarship',
    slug: 'southern-africa-parliamentary-adjudication-masters-scholarship',
    organizationName: 'SANUDC Council & UCT Debating Union',
    opportunityType: 'Scholarship',
    countryScope: 'Southern Africa (South Africa, Zimbabwe, Botswana, Namibia)',
    country: 'South Africa',
    region: 'Southern Africa',
    deliveryMode: 'In-Person',
    format: 'BP',
    deadline: '2026-11-05',
    eligibilityCriteria: 'Debaters with top 10 speaker rankings or breaking records in national or continental opens.',
    fundingAmount: '100% Registration & Flight Subsidies',
    description: 'Fully funded scholar spots for outround adjudicators and debaters to attend the Southern Africa National Debating Championships (SANUDC).',
    applicationLink: 'https://sanudc.org/scholarships',
    isFunded: true,
    tags: ['Scholarship', 'SANUDC', 'BP', 'Outrounds']
  },
  {
    id: 'opp-north-africa-coaching-call',
    title: 'Pan-Arab & North Africa Online Debate Coaching Roster',
    slug: 'pan-arab-north-africa-online-debate-coaching-roster',
    organizationName: 'Cairo Debating Society',
    opportunityType: 'Coaching Call',
    countryScope: 'North Africa (Egypt, Tunisia, Morocco, Algeria)',
    country: 'Egypt',
    region: 'North Africa',
    deliveryMode: 'Online',
    format: 'BP',
    deadline: '2026-09-30',
    eligibilityCriteria: 'Bilingual (Arabic/English) debate coaches and experienced university debaters.',
    fundingAmount: '$35/hour Paid Coaching Sessions',
    description: 'Paid virtual coaching engagements for university debate societies preparing for the Cairo Open and World Universities Debating Championship.',
    applicationLink: 'https://cairodebate.org/coaching-roster',
    isFunded: true,
    tags: ['Coaching', 'Bilingual', 'North Africa', 'Paid']
  }
];

export const SEED_COURSES: Course[] = [
  {
    id: 'course-bp-fundamentals',
    title: 'Competitive BP Debate Fundamentals: From Novice to Continental Outrounds',
    slug: 'competitive-bp-debate-fundamentals',
    instructor: 'Amina Mwangi & Kwame Mensah',
    instructorRole: 'WUDC ESL Finalist & PAUDC Best Speaker',
    instructorAffiliation: 'Oxford / University of Ghana',
    thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
    price: 0,
    currency: 'USD',
    difficulty: 'Beginner',
    durationWeeks: 4,
    rating: 4.9,
    enrollmentCount: 640,
    isFree: true,
    status: 'Open for Enrollment',
    overview: 'A comprehensive 4-week introductory course designed for African student debaters. Master motion parsing,Opening Half modeling, closing extensions, and delivery confidence.',
    modules: [
      {
        title: 'Week 1: Motion Parsing & Case Construction',
        lessons: [
          'Deconstructing Motion Types (THW, THR, THBT, THS, THP)',
          'Setting the Model & Characterizing the Status Quo',
          'First Principles in African Policy & Economics'
        ]
      },
      {
        title: 'Week 2: The Art of Refutation & Engagement',
        lessons: [
          'Direct vs Indirect Rebuttal',
          'Turning Arguments & Mitigating Impacts',
          'Handling Points of Information (POIs) with Poise'
        ]
      },
      {
        title: 'Week 3: Closing Tables & The Winning Extension',
        lessons: [
          'Vertical vs Horizontal Extensions',
          'Avoiding the "Knifing" Trap',
          'Whip Speeches: The Definitive Comparative Weighing Matrix'
        ]
      },
      {
        title: 'Week 4: Adjudication Logic & Tournament Psychology',
        lessons: [
          'How Adjudicators Compare Clashes',
          'Managing 15-Minute Prep Time Effectively',
          'Mock Round Breakdown & Video Case Studies'
        ]
      }
    ]
  },
  {
    id: 'course-advanced-rebuttal',
    title: 'Advanced Argumentative Modeling & Impact Weighing',
    slug: 'advanced-argumentative-modeling-impact-weighing',
    instructor: 'Thabo Sithole',
    instructorRole: 'Chief Adjudicator & SANUDC Champion',
    instructorAffiliation: 'University of Cape Town',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
    price: 0,
    currency: 'USD',
    difficulty: 'Advanced',
    durationWeeks: 3,
    rating: 4.8,
    enrollmentCount: 380,
    isFree: true,
    status: 'Open for Enrollment',
    overview: 'An advanced seminar focusing on sophisticated geopolitical, economic, and moral framework construction in high-stakes outround debates.',
    modules: [
      {
        title: 'Module 1: Sovereign Debt, Monetary Policy & Trade Economics',
        lessons: ['Deconstructing Macroeconomic Motions', 'Central Bank Autonomy & Currency Dynamics']
      },
      {
        title: 'Module 2: Post-Colonial Theory & International Law',
        lessons: ['Sovereignty vs Humanitarian Intervention', 'International Criminal Jurisprudence']
      }
    ]
  }
];

export const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: 'sub-001',
    type: 'tournament',
    submitterName: 'Emmanuel Kwizera',
    submitterEmail: 'emmanuel@kigalidebate.org',
    submitterRole: 'Tournament Convenor',
    status: 'pending',
    submittedAt: '2026-08-25T14:30:00Z',
    adminNotes: 'Submitted for review. Links checked. Awaiting approval.',
    payload: {
      title: 'Rwanda National High School Debate Championship 2026',
      organizer: 'Rwanda Debate Association',
      country: 'Rwanda',
      city: 'Kigali',
      deliveryMode: 'In-Person',
      venue: 'Lycee de Kigali',
      startDate: '2026-10-24',
      endDate: '2026-10-25',
      registrationDeadline: '2026-10-10',
      format: 'WSDC',
      eligibility: 'High School',
      registrationLink: 'https://rwandadebate.org/nationals',
      registrationFee: 'Free for public schools',
      teamCap: 32,
      roundsCount: 5,
      description: 'The national showdown determining Team Rwanda for PAWSDC 2027.'
    }
  },
  {
    id: 'sub-002',
    type: 'organization',
    submitterName: 'Fatima Zahra',
    submitterEmail: 'fatima@alexdebates.org',
    submitterRole: 'President',
    status: 'pending',
    submittedAt: '2026-08-26T09:15:00Z',
    adminNotes: 'New society application from Alexandria, Egypt.',
    payload: {
      name: 'Alexandria University Debate Union',
      country: 'Egypt',
      city: 'Alexandria',
      orgType: 'University Society',
      institution: 'Alexandria University',
      foundedYear: 2020,
      formats: ['BP', 'AP'],
      contactEmail: 'contact@alexdebates.org',
      memberCount: 65,
      description: 'An enthusiastic coastal debating society hosting Arabic and English parliamentary sparring matches.'
    }
  }
];

export const DEMO_USERS: User[] = [
  {
    id: 'usr-admin',
    name: 'Jean-Luc Rutayisire',
    email: 'admin@padp.africa',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    country: 'Rwanda',
    city: 'Kigali',
    institution: 'Pan-African Debate Platform / RDA',
    bio: 'Lead coordinator for PADP. Dedicated to democratizing debate tools and tournament discovery across Africa.',
    primaryFormat: 'BP',
    experienceLevel: 'Veteran',
    bookmarkedTournaments: ['tourn-paudc-2026', 'tourn-pawsdc-2026'],
    bookmarkedResources: ['res-bp-primer', 'res-motions-2026'],
    createdSubmissions: ['sub-001']
  },
  {
    id: 'usr-debater',
    name: 'Samuel Rwemera',
    email: 'rwemera30@gmail.com',
    role: 'debater',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    country: 'Rwanda',
    city: 'Kigali',
    institution: 'University of Rwanda',
    bio: 'Competitive university debater and adjudicator passionate about economics and developmental policy motions.',
    primaryFormat: 'BP',
    experienceLevel: 'Intermediate',
    bookmarkedTournaments: ['tourn-paudc-2026', 'tourn-eado-2026'],
    bookmarkedResources: ['res-bp-primer'],
    createdSubmissions: []
  }
];
