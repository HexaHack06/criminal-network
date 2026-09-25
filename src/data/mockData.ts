// ============================================================
// NETRA INTELLIGENCE — Comprehensive Mock Data
// All data is completely fictional and for demonstration only
// ============================================================

export interface Person {
  id: string;
  name: string;
  aliases: string[];
  age: number;
  gender: string;
  occupation: string;
  address: string;
  phones: string[];
  vehicles: string[];
  organizations: string[];
  cases: string[];
  status: 'Active' | 'Inactive' | 'Unknown';
  lastSeen: string;
  connections: number;
  indicators: number;
  avatar?: string;
}

export interface PhoneRecord {
  id: string;
  number: string;
  operator: string;
  registeredTo: string;
  status: string;
  cases: string[];
  connections: number;
  lastActivity: string;
}

export interface Vehicle {
  id: string;
  plate: string;
  make: string;
  model: string;
  year: number;
  color: string;
  registeredOwner: string;
  cases: string[];
  lastSeen: string;
  locations: string[];
}

export interface Location {
  id: string;
  name: string;
  type: string;
  address: string;
  lat: number;
  lng: number;
  cases: string[];
  entities: string[];
  visits: number;
  lastEvent: string;
}

export interface Organization {
  id: string;
  name: string;
  type: string;
  registrationNo: string;
  address: string;
  persons: string[];
  cases: string[];
  status: string;
  indicators: number;
}

export interface Transaction {
  id: string;
  sender: string;
  receiver: string;
  amount: number;
  currency: string;
  date: string;
  method: string;
  accountFrom: string;
  accountTo: string;
  cases: string[];
  flagged: boolean;
  reference: string;
}

export interface Case {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Under Review' | 'Monitoring' | 'Closed';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  assignedTo: string;
  created: string;
  lastUpdated: string;
  entities: number;
  relationships: number;
  indicators: number;
  evidence: number;
  people: number;
  phones: number;
  vehicles: number;
  locations: number;
  organizations: number;
  transactions: number;
}

export interface Evidence {
  id: string;
  type: 'FIR' | 'CDR' | 'Transaction' | 'Vehicle Record' | 'Surveillance' | 'Social Media' | 'Intelligence Report';
  caseId: string;
  source: string;
  date: string;
  relatedEntities: string[];
  status: 'Processed' | 'Pending' | 'Under Review';
  summary: string;
  extractedEntities: number;
  relationships: number;
}

export interface Relationship {
  id: string;
  sourceId: string;
  targetId: string;
  type: string;
  weight: number;
  cases: string[];
  since: string;
  evidence: string[];
}

export interface Alert {
  id: string;
  type: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  caseId: string;
  entities: string[];
  date: string;
  reason: string;
  source: string;
  reviewed: boolean;
}

export interface TimelineEvent {
  id: string;
  type: 'Call' | 'Transaction' | 'Location' | 'Vehicle' | 'FIR' | 'Case Event' | 'Meeting';
  date: string;
  time: string;
  entities: string[];
  description: string;
  caseId: string;
  location?: string;
  amount?: number;
}

// ============================================================
// CASES
// ============================================================
export const cases: Case[] = [
  {
    id: 'CASE-1024',
    name: 'Operation Crimson Ledger',
    description: 'Investigation into suspected financial irregularities and associated network of individuals across three districts.',
    status: 'Active',
    priority: 'Critical',
    assignedTo: 'Supt. Priya Menon',
    created: '2026-03-12',
    lastUpdated: '2026-09-24',
    entities: 87,
    relationships: 234,
    indicators: 18,
    evidence: 42,
    people: 23,
    phones: 14,
    vehicles: 8,
    locations: 12,
    organizations: 7,
    transactions: 23,
  },
  {
    id: 'CASE-1031',
    name: 'Operation Silk Route',
    description: 'Cross-border smuggling network intelligence. Multiple entities linked through transit locations and financial records.',
    status: 'Active',
    priority: 'High',
    assignedTo: 'Insp. Rajesh Nair',
    created: '2026-04-20',
    lastUpdated: '2026-09-23',
    entities: 62,
    relationships: 178,
    indicators: 14,
    evidence: 31,
    people: 18,
    phones: 10,
    vehicles: 6,
    locations: 9,
    organizations: 5,
    transactions: 14,
  },
  {
    id: 'CASE-1044',
    name: 'Operation Blue Horizon',
    description: 'Digital financial fraud investigation. Suspected layering of funds through shell entities and multiple accounts.',
    status: 'Under Review',
    priority: 'High',
    assignedTo: 'SI. Kavitha Reddy',
    created: '2026-05-08',
    lastUpdated: '2026-09-21',
    entities: 44,
    relationships: 112,
    indicators: 9,
    evidence: 28,
    people: 12,
    phones: 8,
    vehicles: 3,
    locations: 6,
    organizations: 4,
    transactions: 11,
  },
  {
    id: 'CASE-1059',
    name: 'Operation Iron Net',
    description: 'Investigation of suspected hawala and informal money transfer channels between multiple cities.',
    status: 'Monitoring',
    priority: 'Medium',
    assignedTo: 'Insp. Amitabh Sinha',
    created: '2026-06-15',
    lastUpdated: '2026-09-18',
    entities: 38,
    relationships: 95,
    indicators: 6,
    evidence: 19,
    people: 10,
    phones: 7,
    vehicles: 4,
    locations: 5,
    organizations: 3,
    transactions: 9,
  },
  {
    id: 'CASE-1067',
    name: 'Operation Silver Web',
    description: 'Emerging network analysis of coordinated communication patterns across multiple individuals and entities.',
    status: 'Active',
    priority: 'High',
    assignedTo: 'Supt. Priya Menon',
    created: '2026-07-01',
    lastUpdated: '2026-09-25',
    entities: 51,
    relationships: 141,
    indicators: 11,
    evidence: 24,
    people: 15,
    phones: 9,
    vehicles: 5,
    locations: 8,
    organizations: 4,
    transactions: 10,
  },
  {
    id: 'CASE-1078',
    name: 'Operation Dark Tide',
    description: 'Closed investigation. Network of entities involved in coordinated procurement and distribution activities.',
    status: 'Closed',
    priority: 'Medium',
    assignedTo: 'Insp. Rajesh Nair',
    created: '2025-11-10',
    lastUpdated: '2026-08-30',
    entities: 29,
    relationships: 74,
    indicators: 3,
    evidence: 16,
    people: 8,
    phones: 5,
    vehicles: 3,
    locations: 4,
    organizations: 2,
    transactions: 7,
  },
];

// ============================================================
// PERSONS
// ============================================================
export const persons: Person[] = [
  {
    id: 'ENT-P001',
    name: 'Ahmed Rahman',
    aliases: ['A. Rahman', 'Rahu', 'Ahmed R.'],
    age: 38,
    gender: 'Male',
    occupation: 'Textile Trader',
    address: '14-B, Silk Mills Road, Ahmedabad, GJ',
    phones: ['PH-001', 'PH-007'],
    vehicles: ['VH-001'],
    organizations: ['ORG-001', 'ORG-003'],
    cases: ['CASE-1024', 'CASE-1031'],
    status: 'Active',
    lastSeen: '2026-09-20',
    connections: 14,
    indicators: 4,
  },
  {
    id: 'ENT-P002',
    name: 'Ravi Kumar',
    aliases: ['Ravi K.', 'RK'],
    age: 44,
    gender: 'Male',
    occupation: 'Transport Contractor',
    address: '7, Industrial Area Phase II, Ludhiana, PB',
    phones: ['PH-002'],
    vehicles: ['VH-002', 'VH-005'],
    organizations: ['ORG-002'],
    cases: ['CASE-1024', 'CASE-1059'],
    status: 'Active',
    lastSeen: '2026-09-22',
    connections: 11,
    indicators: 3,
  },
  {
    id: 'ENT-P003',
    name: 'Imran Shaikh',
    aliases: ['Imru', 'I. Shaikh'],
    age: 31,
    gender: 'Male',
    occupation: 'Mobile Accessories Dealer',
    address: '88, Bazaar Street, Hyderabad, TS',
    phones: ['PH-003', 'PH-008'],
    vehicles: [],
    organizations: [],
    cases: ['CASE-1024', 'CASE-1067'],
    status: 'Active',
    lastSeen: '2026-09-19',
    connections: 9,
    indicators: 2,
  },
  {
    id: 'ENT-P004',
    name: 'Deepika Verma',
    aliases: ['D. Verma'],
    age: 29,
    gender: 'Female',
    occupation: 'Accounts Manager',
    address: '22, MG Road, Bengaluru, KA',
    phones: ['PH-004'],
    vehicles: ['VH-003'],
    organizations: ['ORG-001'],
    cases: ['CASE-1044'],
    status: 'Active',
    lastSeen: '2026-09-21',
    connections: 7,
    indicators: 2,
  },
  {
    id: 'ENT-P005',
    name: 'Suresh Pillai',
    aliases: ['Suresh P.', 'SP'],
    age: 52,
    gender: 'Male',
    occupation: 'Real Estate Broker',
    address: '5, Pattom Layout, Thiruvananthapuram, KL',
    phones: ['PH-005'],
    vehicles: ['VH-004'],
    organizations: ['ORG-004', 'ORG-005'],
    cases: ['CASE-1031', 'CASE-1044'],
    status: 'Active',
    lastSeen: '2026-09-18',
    connections: 12,
    indicators: 3,
  },
  {
    id: 'ENT-P006',
    name: 'Farida Begum',
    aliases: ['F. Begum'],
    age: 35,
    gender: 'Female',
    occupation: 'Boutique Owner',
    address: '33, Civil Lines, Lucknow, UP',
    phones: ['PH-006'],
    vehicles: [],
    organizations: ['ORG-003'],
    cases: ['CASE-1059'],
    status: 'Unknown',
    lastSeen: '2026-09-10',
    connections: 6,
    indicators: 1,
  },
  {
    id: 'ENT-P007',
    name: 'Harish Nanda',
    aliases: ['Harry', 'H. Nanda'],
    age: 47,
    gender: 'Male',
    occupation: 'Logistics Manager',
    address: '12, Nehru Nagar, Delhi, DL',
    phones: ['PH-009'],
    vehicles: ['VH-006'],
    organizations: ['ORG-002', 'ORG-006'],
    cases: ['CASE-1024', 'CASE-1067'],
    status: 'Active',
    lastSeen: '2026-09-24',
    connections: 15,
    indicators: 5,
  },
  {
    id: 'ENT-P008',
    name: 'Nisha Rawat',
    aliases: ['N. Rawat'],
    age: 26,
    gender: 'Female',
    occupation: 'Data Entry Operator',
    address: '9, Rajpur Road, Dehradun, UK',
    phones: ['PH-010'],
    vehicles: [],
    organizations: [],
    cases: ['CASE-1044'],
    status: 'Inactive',
    lastSeen: '2026-08-30',
    connections: 4,
    indicators: 1,
  },
  {
    id: 'ENT-P009',
    name: 'Karim Ansari',
    aliases: ['Kari', 'K. Ansari'],
    age: 41,
    gender: 'Male',
    occupation: 'Jewellery Trader',
    address: '66, Zaveri Bazaar, Mumbai, MH',
    phones: ['PH-011', 'PH-012'],
    vehicles: ['VH-007'],
    organizations: ['ORG-007'],
    cases: ['CASE-1031', 'CASE-1059'],
    status: 'Active',
    lastSeen: '2026-09-23',
    connections: 10,
    indicators: 3,
  },
  {
    id: 'ENT-P010',
    name: 'Preethi Sharma',
    aliases: ['P. Sharma'],
    age: 33,
    gender: 'Female',
    occupation: 'Fashion Designer',
    address: '4, Koregaon Park, Pune, MH',
    phones: ['PH-013'],
    vehicles: ['VH-008'],
    organizations: ['ORG-005'],
    cases: ['CASE-1067'],
    status: 'Active',
    lastSeen: '2026-09-20',
    connections: 5,
    indicators: 1,
  },
  {
    id: 'ENT-P011',
    name: 'Vijay Tiwari',
    aliases: ['VT', 'Vijay T.'],
    age: 39,
    gender: 'Male',
    occupation: 'Freight Forwarder',
    address: '28, Port Trust Colony, Chennai, TN',
    phones: ['PH-014'],
    vehicles: ['VH-009'],
    organizations: ['ORG-006'],
    cases: ['CASE-1031'],
    status: 'Active',
    lastSeen: '2026-09-17',
    connections: 8,
    indicators: 2,
  },
  {
    id: 'ENT-P012',
    name: 'Sunita Jain',
    aliases: ['S. Jain'],
    age: 45,
    gender: 'Female',
    occupation: 'Finance Consultant',
    address: '15, C-Scheme, Jaipur, RJ',
    phones: ['PH-015'],
    vehicles: [],
    organizations: ['ORG-004'],
    cases: ['CASE-1044', 'CASE-1059'],
    status: 'Active',
    lastSeen: '2026-09-22',
    connections: 9,
    indicators: 2,
  },
  {
    id: 'ENT-P013',
    name: 'Mohd. Bashir',
    aliases: ['M. Bashir', 'Bashir Bhai'],
    age: 55,
    gender: 'Male',
    occupation: 'Retired Government Servant',
    address: '3, Gandhi Colony, Patna, BR',
    phones: ['PH-001'],
    vehicles: [],
    organizations: [],
    cases: ['CASE-1059'],
    status: 'Unknown',
    lastSeen: '2026-09-01',
    connections: 6,
    indicators: 1,
  },
  {
    id: 'ENT-P014',
    name: 'Anita Krishnan',
    aliases: ['A. Krishnan'],
    age: 37,
    gender: 'Female',
    occupation: 'Chartered Accountant',
    address: '21, T Nagar, Chennai, TN',
    phones: ['PH-005'],
    vehicles: ['VH-010'],
    organizations: ['ORG-007'],
    cases: ['CASE-1044'],
    status: 'Active',
    lastSeen: '2026-09-24',
    connections: 7,
    indicators: 2,
  },
  {
    id: 'ENT-P015',
    name: 'Rohit Mehta',
    aliases: ['R. Mehta', 'Rohit M.'],
    age: 32,
    gender: 'Male',
    occupation: 'Software Developer',
    address: '8, Whitefield, Bengaluru, KA',
    phones: ['PH-007'],
    vehicles: [],
    organizations: ['ORG-001'],
    cases: ['CASE-1067'],
    status: 'Active',
    lastSeen: '2026-09-25',
    connections: 3,
    indicators: 1,
  },
];

// ============================================================
// PHONE RECORDS
// ============================================================
export const phones: PhoneRecord[] = [
  { id: 'PH-001', number: '+91-98456-12301', operator: 'Airtel', registeredTo: 'Ahmed Rahman', status: 'Active', cases: ['CASE-1024', 'CASE-1031'], connections: 8, lastActivity: '2026-09-24' },
  { id: 'PH-002', number: '+91-99001-45678', operator: 'Jio', registeredTo: 'Ravi Kumar', status: 'Active', cases: ['CASE-1024', 'CASE-1059'], connections: 7, lastActivity: '2026-09-22' },
  { id: 'PH-003', number: '+91-70123-98765', operator: 'Vi', registeredTo: 'Imran Shaikh', status: 'Active', cases: ['CASE-1024', 'CASE-1067'], connections: 6, lastActivity: '2026-09-19' },
  { id: 'PH-004', number: '+91-80045-23456', operator: 'BSNL', registeredTo: 'Deepika Verma', status: 'Active', cases: ['CASE-1044'], connections: 5, lastActivity: '2026-09-21' },
  { id: 'PH-005', number: '+91-98765-43210', operator: 'Airtel', registeredTo: 'Suresh Pillai', status: 'Active', cases: ['CASE-1031', 'CASE-1044'], connections: 9, lastActivity: '2026-09-18' },
  { id: 'PH-006', number: '+91-91234-56789', operator: 'Jio', registeredTo: 'Farida Begum', status: 'Unknown', cases: ['CASE-1059'], connections: 4, lastActivity: '2026-09-10' },
  { id: 'PH-007', number: '+91-77890-12345', operator: 'Vi', registeredTo: 'Ahmed Rahman (Alt)', status: 'Active', cases: ['CASE-1024', 'CASE-1067'], connections: 6, lastActivity: '2026-09-23' },
  { id: 'PH-008', number: '+91-98112-34567', operator: 'Airtel', registeredTo: 'Imran Shaikh (Alt)', status: 'Inactive', cases: ['CASE-1024'], connections: 3, lastActivity: '2026-09-05' },
  { id: 'PH-009', number: '+91-99887-65432', operator: 'Jio', registeredTo: 'Harish Nanda', status: 'Active', cases: ['CASE-1024', 'CASE-1067'], connections: 11, lastActivity: '2026-09-24' },
  { id: 'PH-010', number: '+91-88001-23456', operator: 'BSNL', registeredTo: 'Nisha Rawat', status: 'Inactive', cases: ['CASE-1044'], connections: 3, lastActivity: '2026-08-28' },
  { id: 'PH-011', number: '+91-93456-78901', operator: 'Airtel', registeredTo: 'Karim Ansari', status: 'Active', cases: ['CASE-1031', 'CASE-1059'], connections: 8, lastActivity: '2026-09-23' },
  { id: 'PH-012', number: '+91-97654-32109', operator: 'Vi', registeredTo: 'Karim Ansari (Alt)', status: 'Active', cases: ['CASE-1031'], connections: 5, lastActivity: '2026-09-20' },
  { id: 'PH-013', number: '+91-81234-56789', operator: 'Jio', registeredTo: 'Preethi Sharma', status: 'Active', cases: ['CASE-1067'], connections: 4, lastActivity: '2026-09-20' },
  { id: 'PH-014', number: '+91-94321-09876', operator: 'Airtel', registeredTo: 'Vijay Tiwari', status: 'Active', cases: ['CASE-1031'], connections: 6, lastActivity: '2026-09-17' },
  { id: 'PH-015', number: '+91-79087-65432', operator: 'Jio', registeredTo: 'Sunita Jain', status: 'Active', cases: ['CASE-1044', 'CASE-1059'], connections: 7, lastActivity: '2026-09-22' },
];

// ============================================================
// VEHICLES
// ============================================================
export const vehicles: Vehicle[] = [
  { id: 'VH-001', plate: 'GJ-01-AB-1234', make: 'Toyota', model: 'Fortuner', year: 2022, color: 'White', registeredOwner: 'Ahmed Rahman', cases: ['CASE-1024', 'CASE-1031'], lastSeen: '2026-09-20', locations: ['LOC-001', 'LOC-005'] },
  { id: 'VH-002', plate: 'PB-10-CD-5678', make: 'Mahindra', model: 'Scorpio', year: 2020, color: 'Black', registeredOwner: 'Ravi Kumar', cases: ['CASE-1024'], lastSeen: '2026-09-22', locations: ['LOC-003', 'LOC-007'] },
  { id: 'VH-003', plate: 'KA-05-EF-9012', make: 'Honda', model: 'City', year: 2023, color: 'Silver', registeredOwner: 'Deepika Verma', cases: ['CASE-1044'], lastSeen: '2026-09-21', locations: ['LOC-002'] },
  { id: 'VH-004', plate: 'KL-07-GH-3456', make: 'Mercedes', model: 'E-Class', year: 2021, color: 'Black', registeredOwner: 'Suresh Pillai', cases: ['CASE-1031', 'CASE-1044'], lastSeen: '2026-09-18', locations: ['LOC-004', 'LOC-009'] },
  { id: 'VH-005', plate: 'PB-65-IJ-7890', make: 'Tata', model: 'Tiago', year: 2019, color: 'Red', registeredOwner: 'Ravi Kumar (Alt)', cases: ['CASE-1059'], lastSeen: '2026-09-15', locations: ['LOC-010'] },
  { id: 'VH-006', plate: 'DL-04-KL-2345', make: 'Ford', model: 'Endeavour', year: 2022, color: 'Grey', registeredOwner: 'Harish Nanda', cases: ['CASE-1024', 'CASE-1067'], lastSeen: '2026-09-24', locations: ['LOC-001', 'LOC-006'] },
  { id: 'VH-007', plate: 'MH-02-MN-6789', make: 'Audi', model: 'A6', year: 2023, color: 'Blue', registeredOwner: 'Karim Ansari', cases: ['CASE-1031', 'CASE-1059'], lastSeen: '2026-09-23', locations: ['LOC-008', 'LOC-011'] },
  { id: 'VH-008', plate: 'MH-14-OP-0123', make: 'Hyundai', model: 'Creta', year: 2021, color: 'White', registeredOwner: 'Preethi Sharma', cases: ['CASE-1067'], lastSeen: '2026-09-20', locations: ['LOC-002'] },
  { id: 'VH-009', plate: 'TN-09-QR-4567', make: 'Toyota', model: 'Innova Crysta', year: 2020, color: 'Pearl White', registeredOwner: 'Vijay Tiwari', cases: ['CASE-1031'], lastSeen: '2026-09-17', locations: ['LOC-012', 'LOC-015'] },
  { id: 'VH-010', plate: 'TN-04-ST-8901', make: 'Maruti', model: 'Swift', year: 2022, color: 'Orange', registeredOwner: 'Anita Krishnan', cases: ['CASE-1044'], lastSeen: '2026-09-24', locations: ['LOC-013'] },
];

// ============================================================
// LOCATIONS
// ============================================================
export const locations: Location[] = [
  { id: 'LOC-001', name: 'Silk Mills Warehouse', type: 'Commercial', address: 'Plot 14-B, Silk Mills Road, Ahmedabad', lat: 23.0225, lng: 72.5714, cases: ['CASE-1024', 'CASE-1031'], entities: ['ENT-P001', 'ENT-P007'], visits: 18, lastEvent: '2026-09-20' },
  { id: 'LOC-002', name: 'Koregaon Park Office', type: 'Commercial', address: 'Suite 4, Viman Nagar, Pune', lat: 18.5204, lng: 73.8567, cases: ['CASE-1044', 'CASE-1067'], entities: ['ENT-P004', 'ENT-P010'], visits: 12, lastEvent: '2026-09-21' },
  { id: 'LOC-003', name: 'Ludhiana Industrial Hub', type: 'Industrial', address: 'Industrial Area Phase II, Ludhiana', lat: 30.9010, lng: 75.8573, cases: ['CASE-1024'], entities: ['ENT-P002'], visits: 9, lastEvent: '2026-09-22' },
  { id: 'LOC-004', name: 'Pattom Business Centre', type: 'Commercial', address: 'Pattom Layout, Thiruvananthapuram', lat: 8.5241, lng: 76.9366, cases: ['CASE-1031', 'CASE-1044'], entities: ['ENT-P005'], visits: 14, lastEvent: '2026-09-18' },
  { id: 'LOC-005', name: 'Gujarat Border Check', type: 'Transit', address: 'NH-8, Gujarat-Rajasthan Border', lat: 24.5854, lng: 72.9602, cases: ['CASE-1031'], entities: ['ENT-P001', 'ENT-P009'], visits: 7, lastEvent: '2026-09-15' },
  { id: 'LOC-006', name: 'Delhi NCR Storage Unit', type: 'Warehouse', address: 'Sector 18, Noida, UP', lat: 28.5701, lng: 77.3219, cases: ['CASE-1024', 'CASE-1067'], entities: ['ENT-P007'], visits: 11, lastEvent: '2026-09-24' },
  { id: 'LOC-007', name: 'Bhiwandi Freight Depot', type: 'Logistics', address: 'Bhiwandi, Thane, MH', lat: 19.3009, lng: 73.0643, cases: ['CASE-1024', 'CASE-1031'], entities: ['ENT-P002', 'ENT-P011'], visits: 15, lastEvent: '2026-09-19' },
  { id: 'LOC-008', name: 'Zaveri Bazaar Exchange', type: 'Commercial', address: 'Zaveri Bazaar, Mumbai, MH', lat: 18.9488, lng: 72.8350, cases: ['CASE-1031', 'CASE-1059'], entities: ['ENT-P009'], visits: 22, lastEvent: '2026-09-23' },
  { id: 'LOC-009', name: 'Kochi Port Area', type: 'Port', address: 'Willingdon Island, Kochi, KL', lat: 9.9639, lng: 76.2780, cases: ['CASE-1031'], entities: ['ENT-P005', 'ENT-P011'], visits: 8, lastEvent: '2026-09-16' },
  { id: 'LOC-010', name: 'Ludhiana Safe House', type: 'Residential', address: 'Shivpuri Colony, Ludhiana, PB', lat: 30.8938, lng: 75.8519, cases: ['CASE-1059'], entities: ['ENT-P002'], visits: 5, lastEvent: '2026-09-12' },
  { id: 'LOC-011', name: 'Mumbai Finance District', type: 'Commercial', address: 'BKC Complex, Mumbai, MH', lat: 19.0649, lng: 72.8625, cases: ['CASE-1044', 'CASE-1059'], entities: ['ENT-P009', 'ENT-P012'], visits: 16, lastEvent: '2026-09-22' },
  { id: 'LOC-012', name: 'Chennai Port Trust', type: 'Port', address: 'Port Trust Colony, Chennai, TN', lat: 13.0849, lng: 80.2853, cases: ['CASE-1031'], entities: ['ENT-P011'], visits: 10, lastEvent: '2026-09-17' },
  { id: 'LOC-013', name: 'Jaipur Finance Hub', type: 'Commercial', address: 'C-Scheme, Jaipur, RJ', lat: 26.9124, lng: 75.7873, cases: ['CASE-1044', 'CASE-1059'], entities: ['ENT-P012', 'ENT-P014'], visits: 13, lastEvent: '2026-09-22' },
  { id: 'LOC-014', name: 'Hyderabad Bazaar Street', type: 'Commercial', address: 'Bazaar Street, Hyderabad, TS', lat: 17.3850, lng: 78.4867, cases: ['CASE-1024', 'CASE-1067'], entities: ['ENT-P003'], visits: 9, lastEvent: '2026-09-19' },
  { id: 'LOC-015', name: 'Chennai Logistics Park', type: 'Logistics', address: 'Ambattur Industrial Estate, Chennai', lat: 13.1143, lng: 80.1548, cases: ['CASE-1031'], entities: ['ENT-P011'], visits: 6, lastEvent: '2026-09-17' },
];

// ============================================================
// ORGANIZATIONS
// ============================================================
export const organizations: Organization[] = [
  { id: 'ORG-001', name: 'Rahul Textiles Pvt. Ltd.', type: 'Private Company', registrationNo: 'CIN-L17110GJ2018PTC101234', address: '14-B, Silk Mills Road, Ahmedabad, GJ', persons: ['ENT-P001', 'ENT-P004', 'ENT-P015'], cases: ['CASE-1024', 'CASE-1031'], status: 'Under Review', indicators: 3 },
  { id: 'ORG-002', name: 'Sunrise Logistics & Transport', type: 'Partnership', registrationNo: 'PAN-AABCS1234D', address: 'Industrial Area Phase II, Ludhiana, PB', persons: ['ENT-P002', 'ENT-P007'], cases: ['CASE-1024', 'CASE-1059'], status: 'Under Review', indicators: 2 },
  { id: 'ORG-003', name: 'Crescent Import-Export', type: 'Sole Proprietorship', registrationNo: 'IEC-0304012345', address: '33, Civil Lines, Lucknow, UP', persons: ['ENT-P001', 'ENT-P006'], cases: ['CASE-1031', 'CASE-1059'], status: 'Active', indicators: 2 },
  { id: 'ORG-004', name: 'Pillai Real Estate Holdings', type: 'Private Company', registrationNo: 'CIN-L45200KL2015PTC203456', address: '5, Pattom Layout, Thiruvananthapuram, KL', persons: ['ENT-P005', 'ENT-P012'], cases: ['CASE-1031', 'CASE-1044'], status: 'Active', indicators: 1 },
  { id: 'ORG-005', name: 'South Coast Ventures LLP', type: 'LLP', registrationNo: 'AAJ-1234', address: 'Koregaon Park, Pune, MH', persons: ['ENT-P005', 'ENT-P010'], cases: ['CASE-1044', 'CASE-1067'], status: 'Active', indicators: 1 },
  { id: 'ORG-006', name: 'Intercargo Freight Services', type: 'Private Company', registrationNo: 'CIN-L63090TN2012PTC304567', address: 'Port Trust Colony, Chennai, TN', persons: ['ENT-P007', 'ENT-P011'], cases: ['CASE-1024', 'CASE-1031'], status: 'Under Review', indicators: 3 },
  { id: 'ORG-007', name: 'Global Gems Trading Co.', type: 'Partnership', registrationNo: 'PAN-AACFG5678E', address: 'Zaveri Bazaar, Mumbai, MH', persons: ['ENT-P009', 'ENT-P014'], cases: ['CASE-1031', 'CASE-1059'], status: 'Under Review', indicators: 2 },
];

// ============================================================
// TRANSACTIONS
// ============================================================
export const transactions: Transaction[] = [
  { id: 'TXN-001', sender: 'Ahmed Rahman', receiver: 'Harish Nanda', amount: 95000, currency: 'INR', date: '2026-09-10', method: 'RTGS', accountFrom: 'ACC-AR-001', accountTo: 'ACC-HN-001', cases: ['CASE-1024'], flagged: true, reference: 'TXN-REF-001' },
  { id: 'TXN-002', sender: 'Harish Nanda', receiver: 'Ravi Kumar', amount: 92000, currency: 'INR', date: '2026-09-11', method: 'NEFT', accountFrom: 'ACC-HN-001', accountTo: 'ACC-RK-001', cases: ['CASE-1024'], flagged: true, reference: 'TXN-REF-002' },
  { id: 'TXN-003', sender: 'Ravi Kumar', receiver: 'Imran Shaikh', amount: 89000, currency: 'INR', date: '2026-09-12', method: 'IMPS', accountFrom: 'ACC-RK-001', accountTo: 'ACC-IS-001', cases: ['CASE-1024'], flagged: true, reference: 'TXN-REF-003' },
  { id: 'TXN-004', sender: 'Imran Shaikh', receiver: 'Unknown Account', amount: 87000, currency: 'INR', date: '2026-09-12', method: 'Cash', accountFrom: 'ACC-IS-001', accountTo: 'ACC-UNK-01', cases: ['CASE-1024'], flagged: true, reference: 'TXN-REF-004' },
  { id: 'TXN-005', sender: 'Suresh Pillai', receiver: 'Karim Ansari', amount: 150000, currency: 'INR', date: '2026-09-05', method: 'RTGS', accountFrom: 'ACC-SP-001', accountTo: 'ACC-KA-001', cases: ['CASE-1031'], flagged: true, reference: 'TXN-REF-005' },
  { id: 'TXN-006', sender: 'Karim Ansari', receiver: 'Global Gems Trading Co.', amount: 145000, currency: 'INR', date: '2026-09-06', method: 'NEFT', accountFrom: 'ACC-KA-001', accountTo: 'ACC-GG-001', cases: ['CASE-1031'], flagged: true, reference: 'TXN-REF-006' },
  { id: 'TXN-007', sender: 'Deepika Verma', receiver: 'Nisha Rawat', amount: 45000, currency: 'INR', date: '2026-08-25', method: 'UPI', accountFrom: 'ACC-DV-001', accountTo: 'ACC-NR-001', cases: ['CASE-1044'], flagged: false, reference: 'TXN-REF-007' },
  { id: 'TXN-008', sender: 'Sunita Jain', receiver: 'Karim Ansari', amount: 75000, currency: 'INR', date: '2026-09-08', method: 'NEFT', accountFrom: 'ACC-SJ-001', accountTo: 'ACC-KA-001', cases: ['CASE-1059'], flagged: true, reference: 'TXN-REF-008' },
  { id: 'TXN-009', sender: 'Harish Nanda', receiver: 'Intercargo Freight', amount: 210000, currency: 'INR', date: '2026-09-14', method: 'RTGS', accountFrom: 'ACC-HN-001', accountTo: 'ACC-IF-001', cases: ['CASE-1024', 'CASE-1067'], flagged: true, reference: 'TXN-REF-009' },
  { id: 'TXN-010', sender: 'Ahmed Rahman', receiver: 'Crescent Import-Export', amount: 320000, currency: 'INR', date: '2026-09-16', method: 'RTGS', accountFrom: 'ACC-AR-002', accountTo: 'ACC-CI-001', cases: ['CASE-1031'], flagged: true, reference: 'TXN-REF-010' },
  { id: 'TXN-011', sender: 'Vijay Tiwari', receiver: 'Suresh Pillai', amount: 55000, currency: 'INR', date: '2026-09-09', method: 'IMPS', accountFrom: 'ACC-VT-001', accountTo: 'ACC-SP-001', cases: ['CASE-1031'], flagged: false, reference: 'TXN-REF-011' },
  { id: 'TXN-012', sender: 'Anita Krishnan', receiver: 'Sunita Jain', amount: 68000, currency: 'INR', date: '2026-09-15', method: 'NEFT', accountFrom: 'ACC-AK-001', accountTo: 'ACC-SJ-001', cases: ['CASE-1044'], flagged: true, reference: 'TXN-REF-012' },
  { id: 'TXN-013', sender: 'Farida Begum', receiver: 'Mohd. Bashir', amount: 30000, currency: 'INR', date: '2026-09-03', method: 'Cash', accountFrom: 'Unknown', accountTo: 'Unknown', cases: ['CASE-1059'], flagged: true, reference: 'TXN-REF-013' },
  { id: 'TXN-014', sender: 'Rahul Textiles Pvt. Ltd.', receiver: 'Ahmed Rahman', amount: 480000, currency: 'INR', date: '2026-09-18', method: 'RTGS', accountFrom: 'ACC-RT-001', accountTo: 'ACC-AR-001', cases: ['CASE-1024'], flagged: true, reference: 'TXN-REF-014' },
  { id: 'TXN-015', sender: 'Ravi Kumar', receiver: 'Sunrise Logistics', amount: 125000, currency: 'INR', date: '2026-09-20', method: 'NEFT', accountFrom: 'ACC-RK-002', accountTo: 'ACC-SL-001', cases: ['CASE-1024', 'CASE-1059'], flagged: false, reference: 'TXN-REF-015' },
];

// ============================================================
// EVIDENCE
// ============================================================
export const evidence: Evidence[] = [
  { id: 'EVD-001', type: 'FIR', caseId: 'CASE-1024', source: 'Ahmedabad Police Station', date: '2026-03-12', relatedEntities: ['ENT-P001', 'ENT-P007'], status: 'Processed', summary: 'FIR lodged regarding suspected irregular financial transactions at textile premises.', extractedEntities: 8, relationships: 12 },
  { id: 'EVD-002', type: 'CDR', caseId: 'CASE-1024', source: 'Airtel Network Records', date: '2026-04-01', relatedEntities: ['ENT-P001', 'ENT-P003', 'ENT-P007'], status: 'Processed', summary: 'Call Detail Records for 90-day period. 284 calls between identified entities.', extractedEntities: 5, relationships: 18 },
  { id: 'EVD-003', type: 'Transaction', caseId: 'CASE-1024', source: 'SBI Bank Records', date: '2026-04-15', relatedEntities: ['ENT-P001', 'ENT-P002', 'ENT-P007'], status: 'Processed', summary: 'Bank statement analysis showing sequential transfers within 48-hour window.', extractedEntities: 6, relationships: 9 },
  { id: 'EVD-004', type: 'Vehicle Record', caseId: 'CASE-1024', source: 'RTO Records, Gujarat', date: '2026-05-02', relatedEntities: ['ENT-P001'], status: 'Processed', summary: 'Vehicle movement records for GJ-01-AB-1234 showing repeated border crossings.', extractedEntities: 2, relationships: 4 },
  { id: 'EVD-005', type: 'Surveillance', caseId: 'CASE-1031', source: 'Field Intelligence Unit', date: '2026-05-18', relatedEntities: ['ENT-P005', 'ENT-P009', 'ENT-P011'], status: 'Processed', summary: 'Surveillance report documenting meetings at Kochi port facility over 3 visits.', extractedEntities: 4, relationships: 7 },
  { id: 'EVD-006', type: 'Intelligence Report', caseId: 'CASE-1031', source: 'State Intelligence Bureau', date: '2026-06-01', relatedEntities: ['ENT-P001', 'ENT-P005', 'ENT-P009'], status: 'Processed', summary: 'Intelligence brief on suspected cross-border network connectivity.', extractedEntities: 9, relationships: 14 },
  { id: 'EVD-007', type: 'CDR', caseId: 'CASE-1031', source: 'Jio Network Records', date: '2026-06-15', relatedEntities: ['ENT-P005', 'ENT-P011'], status: 'Under Review', summary: 'CDR analysis showing coordinated communication patterns around transit events.', extractedEntities: 3, relationships: 6 },
  { id: 'EVD-008', type: 'Transaction', caseId: 'CASE-1044', source: 'HDFC Bank Records', date: '2026-06-20', relatedEntities: ['ENT-P004', 'ENT-P012', 'ENT-P014'], status: 'Processed', summary: 'Multiple structured deposits and transfers suggesting financial layering pattern.', extractedEntities: 7, relationships: 11 },
  { id: 'EVD-009', type: 'Social Media', caseId: 'CASE-1067', source: 'Open Source Intelligence', date: '2026-07-10', relatedEntities: ['ENT-P003', 'ENT-P007', 'ENT-P015'], status: 'Under Review', summary: 'Social media analysis revealing coordinated posting and contact patterns.', extractedEntities: 5, relationships: 8 },
  { id: 'EVD-010', type: 'FIR', caseId: 'CASE-1059', source: 'Delhi Police Headquarters', date: '2026-07-25', relatedEntities: ['ENT-P006', 'ENT-P013'], status: 'Pending', summary: 'Complaint regarding suspected informal money transfer activities.', extractedEntities: 3, relationships: 4 },
  { id: 'EVD-011', type: 'Intelligence Report', caseId: 'CASE-1024', source: 'IB Field Report', date: '2026-08-05', relatedEntities: ['ENT-P001', 'ENT-P002', 'ENT-P007', 'ENT-P003'], status: 'Processed', summary: 'Updated field intelligence on network expansion and new entity connections.', extractedEntities: 11, relationships: 19 },
  { id: 'EVD-012', type: 'Vehicle Record', caseId: 'CASE-1031', source: 'RTO Records, Maharashtra', date: '2026-08-15', relatedEntities: ['ENT-P009', 'ENT-P011'], status: 'Processed', summary: 'Vehicle movement log showing overlap between port and exchange visits.', extractedEntities: 3, relationships: 5 },
];

// ============================================================
// ALERTS / INDICATORS
// ============================================================
export const alerts: Alert[] = [
  { id: 'ALT-001', type: 'Rapid Transaction Chain', severity: 'Critical', caseId: 'CASE-1024', entities: ['Ahmed Rahman', 'Harish Nanda', 'Ravi Kumar', 'Imran Shaikh'], date: '2026-09-12', reason: 'Four sequential transfers detected within 48 hours, total value ₹3,63,000, showing decreasing amounts consistent with layering patterns.', source: 'AI Transaction Analysis', reviewed: false },
  { id: 'ALT-002', type: 'Shared Phone Association', severity: 'High', caseId: 'CASE-1024', entities: ['Ahmed Rahman', 'Imran Shaikh'], date: '2026-09-15', reason: 'Phone PH-007 (+91-77890-12345) shows call patterns between two entities across multiple cases, totaling 47 calls in 30 days.', source: 'CDR Analysis Engine', reviewed: false },
  { id: 'ALT-003', type: 'Repeated Location Overlap', severity: 'High', caseId: 'CASE-1031', entities: ['Suresh Pillai', 'Karim Ansari', 'Vijay Tiwari'], date: '2026-09-16', reason: 'Three entities co-located at Kochi Port facility on 5 separate occasions within 60 days without documented business relationship.', source: 'Location Intelligence', reviewed: true },
  { id: 'ALT-004', type: 'Cross-Case Relationship', severity: 'Critical', caseId: 'CASE-1024', entities: ['Ahmed Rahman', 'Karim Ansari'], date: '2026-09-18', reason: 'Entity network overlap detected between CASE-1024 and CASE-1031 through shared financial channels and intermediate entities.', source: 'Cross-Case Analysis', reviewed: false },
  { id: 'ALT-005', type: 'Unusual Communication Pattern', severity: 'Medium', caseId: 'CASE-1067', entities: ['Harish Nanda', 'Imran Shaikh', 'Rohit Mehta'], date: '2026-09-20', reason: 'Communication spike of 340% above baseline detected across three entities over a 72-hour period, correlated with financial event.', source: 'Behavioral Analysis', reviewed: false },
  { id: 'ALT-006', type: 'Network Expansion', severity: 'Medium', caseId: 'CASE-1024', entities: ['Ahmed Rahman'], date: '2026-09-22', reason: 'Primary entity node added 6 new connections within 14 days, expanding network depth by 2 hops to previously unknown entities.', source: 'Network Change Detection', reviewed: false },
  { id: 'ALT-007', type: 'Vehicle Association', severity: 'Low', caseId: 'CASE-1031', entities: ['Ravi Kumar', 'Suresh Pillai'], date: '2026-09-14', reason: 'Two vehicles from different entities detected at the same location on 3 occasions, without documented relationship between owners.', source: 'ANPR Cross-Reference', reviewed: true },
  { id: 'ALT-008', type: 'Financial Structuring Pattern', severity: 'High', caseId: 'CASE-1044', entities: ['Deepika Verma', 'Anita Krishnan', 'Sunita Jain'], date: '2026-09-21', reason: 'Multiple deposits detected just below ₹50,000 threshold across three accounts over a 7-day period, suggesting possible structuring.', source: 'AI Financial Analysis', reviewed: false },
];

// ============================================================
// TIMELINE EVENTS
// ============================================================
export const timelineEvents: TimelineEvent[] = [
  { id: 'TL-001', type: 'FIR', date: '2026-03-12', time: '09:30', entities: ['Ahmed Rahman'], description: 'Initial FIR filed at Ahmedabad. Case opened as CASE-1024.', caseId: 'CASE-1024' },
  { id: 'TL-002', type: 'Call', date: '2026-04-02', time: '14:22', entities: ['Ahmed Rahman', 'Harish Nanda'], description: 'Recorded call between ENT-P001 and ENT-P007, duration 18 minutes.', caseId: 'CASE-1024' },
  { id: 'TL-003', type: 'Location', date: '2026-04-10', time: '10:15', entities: ['Ahmed Rahman', 'Ravi Kumar'], description: 'Both entities co-located at Silk Mills Warehouse. Duration: ~2 hours.', caseId: 'CASE-1024', location: 'Silk Mills Warehouse' },
  { id: 'TL-004', type: 'Transaction', date: '2026-04-20', time: '11:00', entities: ['Suresh Pillai', 'Karim Ansari'], description: 'RTGS transfer of ₹1,50,000 from Pillai to Ansari. Case CASE-1031 opened.', caseId: 'CASE-1031', amount: 150000 },
  { id: 'TL-005', type: 'Vehicle', date: '2026-05-01', time: '08:45', entities: ['Ahmed Rahman'], description: 'Vehicle GJ-01-AB-1234 detected at Gujarat border checkpoint heading towards Rajasthan.', caseId: 'CASE-1031', location: 'Gujarat Border Check' },
  { id: 'TL-006', type: 'Meeting', date: '2026-05-18', time: '16:00', entities: ['Suresh Pillai', 'Vijay Tiwari', 'Karim Ansari'], description: 'Surveillance documented meeting at Kochi Port facility. Duration: ~90 minutes.', caseId: 'CASE-1031', location: 'Kochi Port Area' },
  { id: 'TL-007', type: 'Case Event', date: '2026-05-25', time: '09:00', entities: [], description: 'Cross-case link identified between CASE-1024 and CASE-1031. Joint investigation protocol initiated.', caseId: 'CASE-1024' },
  { id: 'TL-008', type: 'Transaction', date: '2026-06-05', time: '13:30', entities: ['Karim Ansari', 'Global Gems Trading'], description: 'Transfer of ₹1,45,000 from Ansari to Global Gems Trading Co.', caseId: 'CASE-1031', amount: 145000 },
  { id: 'TL-009', type: 'Call', date: '2026-07-10', time: '20:15', entities: ['Harish Nanda', 'Imran Shaikh', 'Rohit Mehta'], description: 'Three-way communication detected via shared relay number. Identified as communication spike event.', caseId: 'CASE-1067' },
  { id: 'TL-010', type: 'Transaction', date: '2026-09-10', time: '10:00', entities: ['Ahmed Rahman', 'Harish Nanda'], description: 'RTGS transfer ₹95,000. First transaction in identified rapid transfer chain.', caseId: 'CASE-1024', amount: 95000 },
  { id: 'TL-011', type: 'Transaction', date: '2026-09-11', time: '09:45', entities: ['Harish Nanda', 'Ravi Kumar'], description: 'NEFT transfer ₹92,000. Second link in rapid transaction chain.', caseId: 'CASE-1024', amount: 92000 },
  { id: 'TL-012', type: 'Transaction', date: '2026-09-12', time: '11:20', entities: ['Ravi Kumar', 'Imran Shaikh'], description: 'IMPS transfer ₹89,000. Third link in rapid transaction chain.', caseId: 'CASE-1024', amount: 89000 },
  { id: 'TL-013', type: 'Call', date: '2026-09-15', time: '22:10', entities: ['Ahmed Rahman', 'Imran Shaikh'], description: 'Late-night call between entities via shared secondary phone number PH-007.', caseId: 'CASE-1024' },
  { id: 'TL-014', type: 'Location', date: '2026-09-20', time: '14:30', entities: ['Ahmed Rahman', 'Harish Nanda'], description: 'Both entities detected at Delhi NCR Storage Unit. Third co-location event this month.', caseId: 'CASE-1024', location: 'Delhi NCR Storage Unit' },
  { id: 'TL-015', type: 'Case Event', date: '2026-09-24', time: '08:00', entities: [], description: 'AI Pattern Detection flagged Critical alert for rapid transaction chain in CASE-1024.', caseId: 'CASE-1024' },
];

// ============================================================
// NETWORK GRAPH DATA (for Cytoscape)
// ============================================================
export const networkNodes = [
  // Case 1024 main entities
  { id: 'ENT-P001', label: 'Ahmed\nRahman', type: 'person', group: 'community-1', x: 100, y: 300 },
  { id: 'ENT-P002', label: 'Ravi\nKumar', type: 'person', group: 'community-1', x: 300, y: 200 },
  { id: 'ENT-P003', label: 'Imran\nShaikh', type: 'person', group: 'community-1', x: 200, y: 100 },
  { id: 'ENT-P007', label: 'Harish\nNanda', type: 'person', group: 'community-1', x: 300, y: 400 },
  // Case 1031 entities
  { id: 'ENT-P005', label: 'Suresh\nPillai', type: 'person', group: 'community-2', x: 600, y: 200 },
  { id: 'ENT-P009', label: 'Karim\nAnsari', type: 'person', group: 'community-2', x: 700, y: 350 },
  { id: 'ENT-P011', label: 'Vijay\nTiwari', type: 'person', group: 'community-2', x: 500, y: 400 },
  // Case 1044 entities
  { id: 'ENT-P004', label: 'Deepika\nVerma', type: 'person', group: 'community-3', x: 400, y: 600 },
  { id: 'ENT-P012', label: 'Sunita\nJain', type: 'person', group: 'community-3', x: 600, y: 600 },
  { id: 'ENT-P014', label: 'Anita\nKrishnan', type: 'person', group: 'community-3', x: 700, y: 500 },
  // Bridge entities
  { id: 'ENT-P006', label: 'Farida\nBegum', type: 'person', group: 'community-1', x: 100, y: 500 },
  { id: 'ENT-P013', label: 'Mohd.\nBashir', type: 'person', group: 'community-1', x: 50, y: 400 },
  // Phone nodes
  { id: 'PH-001', label: '+91-98456\n12301', type: 'phone', group: 'community-1', x: 150, y: 200 },
  { id: 'PH-007', label: '+91-77890\n12345', type: 'phone', group: 'community-1', x: 200, y: 300 },
  { id: 'PH-009', label: '+91-99887\n65432', type: 'phone', group: 'community-1', x: 400, y: 350 },
  // Vehicle nodes
  { id: 'VH-001', label: 'GJ-01\nAB-1234', type: 'vehicle', group: 'community-1', x: 100, y: 150 },
  { id: 'VH-006', label: 'DL-04\nKL-2345', type: 'vehicle', group: 'community-1', x: 400, y: 250 },
  // Location nodes
  { id: 'LOC-001', label: 'Silk Mills\nWarehouse', type: 'location', group: 'community-1', x: 200, y: 400 },
  { id: 'LOC-007', label: 'Bhiwandi\nFreight', type: 'location', group: 'community-1', x: 350, y: 300 },
  { id: 'LOC-009', label: 'Kochi\nPort', type: 'location', group: 'community-2', x: 600, y: 450 },
  // Organization nodes
  { id: 'ORG-001', label: 'Rahul\nTextiles', type: 'organization', group: 'community-1', x: 50, y: 250 },
  { id: 'ORG-006', label: 'Intercargo\nFreight', type: 'organization', group: 'community-1', x: 450, y: 450 },
  // Transaction nodes
  { id: 'TXN-001', label: '₹95,000', type: 'transaction', group: 'community-1', x: 220, y: 350 },
  { id: 'TXN-005', label: '₹1,50,000', type: 'transaction', group: 'community-2', x: 650, y: 280 },
];

export const networkEdges = [
  { id: 'E-001', source: 'ENT-P001', target: 'ENT-P007', label: 'CALLS', weight: 5 },
  { id: 'E-002', source: 'ENT-P001', target: 'ENT-P002', label: 'KNOWS', weight: 3 },
  { id: 'E-003', source: 'ENT-P001', target: 'ENT-P003', label: 'CALLS', weight: 4 },
  { id: 'E-004', source: 'ENT-P002', target: 'ENT-P003', label: 'TRANSFERRED_TO', weight: 3 },
  { id: 'E-005', source: 'ENT-P007', target: 'ENT-P002', label: 'TRANSFERRED_TO', weight: 4 },
  { id: 'E-006', source: 'ENT-P001', target: 'PH-001', label: 'OWNS', weight: 1 },
  { id: 'E-007', source: 'ENT-P001', target: 'PH-007', label: 'OWNS', weight: 1 },
  { id: 'E-008', source: 'ENT-P003', target: 'PH-007', label: 'USES', weight: 2 },
  { id: 'E-009', source: 'ENT-P007', target: 'PH-009', label: 'OWNS', weight: 1 },
  { id: 'E-010', source: 'ENT-P001', target: 'VH-001', label: 'OWNS', weight: 1 },
  { id: 'E-011', source: 'ENT-P007', target: 'VH-006', label: 'OWNS', weight: 1 },
  { id: 'E-012', source: 'ENT-P001', target: 'LOC-001', label: 'VISITED', weight: 4 },
  { id: 'E-013', source: 'ENT-P007', target: 'LOC-001', label: 'VISITED', weight: 3 },
  { id: 'E-014', source: 'ENT-P002', target: 'LOC-007', label: 'VISITED', weight: 3 },
  { id: 'E-015', source: 'ENT-P001', target: 'ORG-001', label: 'WORKS_FOR', weight: 2 },
  { id: 'E-016', source: 'ENT-P007', target: 'ORG-006', label: 'WORKS_FOR', weight: 2 },
  { id: 'E-017', source: 'ENT-P001', target: 'TXN-001', label: 'INITIATED', weight: 3 },
  { id: 'E-018', source: 'TXN-001', target: 'ENT-P007', label: 'RECEIVED', weight: 3 },
  // Community 2 edges
  { id: 'E-019', source: 'ENT-P005', target: 'ENT-P009', label: 'KNOWS', weight: 4 },
  { id: 'E-020', source: 'ENT-P005', target: 'ENT-P011', label: 'ASSOCIATED_WITH', weight: 3 },
  { id: 'E-021', source: 'ENT-P009', target: 'ENT-P011', label: 'CALLS', weight: 3 },
  { id: 'E-022', source: 'ENT-P005', target: 'LOC-009', label: 'VISITED', weight: 4 },
  { id: 'E-023', source: 'ENT-P009', target: 'LOC-009', label: 'VISITED', weight: 3 },
  { id: 'E-024', source: 'ENT-P005', target: 'TXN-005', label: 'INITIATED', weight: 3 },
  { id: 'E-025', source: 'TXN-005', target: 'ENT-P009', label: 'RECEIVED', weight: 3 },
  // Cross-community edges (important!)
  { id: 'E-026', source: 'ENT-P002', target: 'ENT-P011', label: 'ASSOCIATED_WITH', weight: 2 },
  { id: 'E-027', source: 'ENT-P007', target: 'ENT-P005', label: 'KNOWS', weight: 2 },
  { id: 'E-028', source: 'ENT-P007', target: 'ORG-006', label: 'WORKS_FOR', weight: 2 },
  { id: 'E-029', source: 'ENT-P011', target: 'ORG-006', label: 'WORKS_FOR', weight: 2 },
  // Community 3 edges
  { id: 'E-030', source: 'ENT-P004', target: 'ENT-P012', label: 'CALLS', weight: 2 },
  { id: 'E-031', source: 'ENT-P012', target: 'ENT-P014', label: 'TRANSFERRED_TO', weight: 3 },
  { id: 'E-032', source: 'ENT-P004', target: 'ENT-P014', label: 'KNOWS', weight: 2 },
  // Bridge edges
  { id: 'E-033', source: 'ENT-P001', target: 'ENT-P006', label: 'ASSOCIATED_WITH', weight: 2 },
  { id: 'E-034', source: 'ENT-P006', target: 'ENT-P013', label: 'KNOWS', weight: 1 },
];

// ============================================================
// ACTIVITY CHART DATA
// ============================================================
export const activityChartData = [
  { date: 'Sep 1', events: 12, entities: 4, transactions: 3 },
  { date: 'Sep 4', events: 18, entities: 6, transactions: 5 },
  { date: 'Sep 7', events: 9, entities: 3, transactions: 2 },
  { date: 'Sep 10', events: 34, entities: 12, transactions: 8 },
  { date: 'Sep 13', events: 28, entities: 9, transactions: 6 },
  { date: 'Sep 16', events: 41, entities: 15, transactions: 11 },
  { date: 'Sep 19', events: 22, entities: 7, transactions: 4 },
  { date: 'Sep 22', events: 51, entities: 18, transactions: 14 },
  { date: 'Sep 25', events: 38, entities: 13, transactions: 9 },
];

// ============================================================
// COMMUNITY DATA
// ============================================================
export const communities = [
  {
    id: 'COMM-01',
    name: 'Financial Transfer Network',
    entities: 12,
    relationships: 28,
    cases: ['CASE-1024', 'CASE-1059'],
    coreEntities: ['Ahmed Rahman', 'Harish Nanda', 'Ravi Kumar'],
    color: '#3B82F6',
  },
  {
    id: 'COMM-02',
    name: 'Trade & Logistics Group',
    entities: 9,
    relationships: 19,
    cases: ['CASE-1031'],
    coreEntities: ['Suresh Pillai', 'Karim Ansari', 'Vijay Tiwari'],
    color: '#8B5CF6',
  },
  {
    id: 'COMM-03',
    name: 'Financial Services Network',
    entities: 7,
    relationships: 14,
    cases: ['CASE-1044'],
    coreEntities: ['Deepika Verma', 'Sunita Jain', 'Anita Krishnan'],
    color: '#10B981',
  },
];

// ============================================================
// CENTRALITY METRICS
// ============================================================
export const centralityData = [
  { name: 'Harish Nanda', degree: 15, betweenness: 0.42, pagerank: 0.18, community: 'COMM-01' },
  { name: 'Ahmed Rahman', degree: 14, betweenness: 0.38, pagerank: 0.16, community: 'COMM-01' },
  { name: 'Karim Ansari', degree: 10, betweenness: 0.29, pagerank: 0.13, community: 'COMM-02' },
  { name: 'Suresh Pillai', degree: 12, betweenness: 0.31, pagerank: 0.14, community: 'COMM-02' },
  { name: 'Ravi Kumar', degree: 11, betweenness: 0.25, pagerank: 0.12, community: 'COMM-01' },
  { name: 'Sunita Jain', degree: 9, betweenness: 0.21, pagerank: 0.11, community: 'COMM-03' },
  { name: 'Imran Shaikh', degree: 9, betweenness: 0.19, pagerank: 0.10, community: 'COMM-01' },
  { name: 'Vijay Tiwari', degree: 8, betweenness: 0.16, pagerank: 0.09, community: 'COMM-02' },
];

// ============================================================
// CROSS-CASE CONNECTIONS
// ============================================================
export const crossCaseConnections = [
  {
    case1: 'CASE-1024',
    case2: 'CASE-1031',
    sharedEntities: ['Ahmed Rahman'],
    sharedPhones: ['PH-007'],
    sharedVehicles: ['VH-001'],
    sharedLocations: ['LOC-007'],
    strength: 'High',
    detectedDate: '2026-05-25',
  },
  {
    case1: 'CASE-1031',
    case2: 'CASE-1059',
    sharedEntities: ['Karim Ansari', 'Suresh Pillai'],
    sharedPhones: ['PH-011'],
    sharedVehicles: [],
    sharedLocations: ['LOC-008'],
    strength: 'Medium',
    detectedDate: '2026-07-10',
  },
  {
    case1: 'CASE-1044',
    case2: 'CASE-1059',
    sharedEntities: ['Sunita Jain'],
    sharedPhones: ['PH-015'],
    sharedVehicles: [],
    sharedLocations: ['LOC-011', 'LOC-013'],
    strength: 'Medium',
    detectedDate: '2026-08-05',
  },
  {
    case1: 'CASE-1024',
    case2: 'CASE-1067',
    sharedEntities: ['Harish Nanda', 'Imran Shaikh'],
    sharedPhones: ['PH-003', 'PH-009'],
    sharedVehicles: ['VH-006'],
    sharedLocations: ['LOC-006'],
    strength: 'High',
    detectedDate: '2026-08-20',
  },
];

// ============================================================
// INVESTIGATORS
// ============================================================
export const investigators = [
  { id: 'INV-001', name: 'Supt. Priya Menon', rank: 'Superintendent', unit: 'Special Investigation Unit', avatar: 'PM' },
  { id: 'INV-002', name: 'Insp. Rajesh Nair', rank: 'Inspector', unit: 'Financial Crimes Division', avatar: 'RN' },
  { id: 'INV-003', name: 'SI. Kavitha Reddy', rank: 'Sub Inspector', unit: 'Cyber Crime Unit', avatar: 'KR' },
  { id: 'INV-004', name: 'Insp. Amitabh Sinha', rank: 'Inspector', unit: 'Intelligence Wing', avatar: 'AS' },
];
