export type LeadStage =
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'Proposal'
  | 'Negotiation'
  | 'Won'
  | 'Lost';

export interface CrmNote {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface CrmFollowUp {
  id: string;
  title: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Completed';
}

export interface CrmContact {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  source: 'Referral' | 'Inbound Web' | 'Conference' | 'Direct Outreach' | 'Partner Network';
  assignedRep: string;
  stage: LeadStage;
  dealValue: number;
  dealTitle: string;
  lastContact: string;
  nextFollowUp?: string;
  notes: CrmNote[];
  followUps: CrmFollowUp[];
}

export const INITIAL_CONTACTS: CrmContact[] = [
  {
    id: 'LEAD-101',
    name: 'K. Rajendran',
    title: 'Director of Logistics Operations',
    company: 'Titan Logistics Corridors Ltd',
    email: 'k.rajendran@titanlogistics.in',
    phone: '+91 98401 22910',
    city: 'Chennai',
    source: 'Referral',
    assignedRep: 'S. Ramanathan',
    stage: 'Negotiation',
    dealValue: 2450000,
    dealTitle: 'Enterprise Yard Dispatch System & IoT Checkpoint Gates',
    lastContact: '2026-10-14',
    nextFollowUp: '2026-10-18',
    notes: [
      {
        id: 'NOTE-1',
        author: 'S. Ramanathan',
        text: 'Client requested revised SLA terms for high-availability offline yard failover. Drafted and sent.',
        timestamp: '2026-10-14 11:20 IST',
      },
      {
        id: 'NOTE-2',
        author: 'S. Ramanathan',
        text: 'Conducted live architectural walkthrough with VP Engineering. Security checklist approved.',
        timestamp: '2026-10-09 15:45 IST',
      },
    ],
    followUps: [
      {
        id: 'FUP-1',
        title: 'Final Master Services Agreement (MSA) sign-off call',
        dueDate: '2026-10-18',
        priority: 'High',
        status: 'Pending',
      },
    ],
  },
  {
    id: 'LEAD-102',
    name: 'P. Meenakshi',
    title: 'VP Technology & Settlement',
    company: 'Bangalore FinEdge Capital Pvt Ltd',
    email: 'meenakshi@finedgecap.com',
    phone: '+91 99800 48192',
    city: 'Bangalore',
    source: 'Inbound Web',
    assignedRep: 'C. M. Sharvesh',
    stage: 'Won',
    dealValue: 3800000,
    dealTitle: 'Automated Financial Settlement & Clearing Ledger Engine',
    lastContact: '2026-10-12',
    nextFollowUp: '2026-10-25',
    notes: [
      {
        id: 'NOTE-3',
        author: 'C. M. Sharvesh',
        text: 'Contract finalized. Phase 1 deployment kick-off scheduled with engineering leads.',
        timestamp: '2026-10-12 16:30 IST',
      },
    ],
    followUps: [
      {
        id: 'FUP-2',
        title: 'Phase 1 Production Go-Live Verification',
        dueDate: '2026-10-25',
        priority: 'Medium',
        status: 'Pending',
      },
    ],
  },
  {
    id: 'LEAD-103',
    name: 'V. Sundaram',
    title: 'Chief Compliance & Legal Officer',
    company: 'Apex Health Systems India',
    email: 'sundaram@apexhealth.org',
    phone: '+91 98840 19482',
    city: 'Chennai',
    source: 'Conference',
    assignedRep: 'S. Ramanathan',
    stage: 'Proposal',
    dealValue: 1850000,
    dealTitle: 'Encrypted Records Storage & Zero-Knowledge Vault',
    lastContact: '2026-10-10',
    nextFollowUp: '2026-10-19',
    notes: [
      {
        id: 'NOTE-4',
        author: 'S. Ramanathan',
        text: 'Proposal delivered outlining ISO 27001 zero-knowledge encryption architecture.',
        timestamp: '2026-10-10 10:15 IST',
      },
    ],
    followUps: [
      {
        id: 'FUP-3',
        title: 'Review proposal feedback with legal committee',
        dueDate: '2026-10-19',
        priority: 'High',
        status: 'Pending',
      },
    ],
  },
  {
    id: 'LEAD-104',
    name: 'S. Ramanathan',
    title: 'Managing Director',
    company: 'Coimbatore Foundry & Machining Works',
    email: 'ramanathan@cbe-foundry.co.in',
    phone: '+91 94432 88410',
    city: 'Coimbatore',
    source: 'Partner Network',
    assignedRep: 'C. M. Sharvesh',
    stage: 'Qualified',
    dealValue: 1200000,
    dealTitle: 'Shop-Floor Touch Terminals & CAD Revision Lockout',
    lastContact: '2026-10-08',
    nextFollowUp: '2026-10-20',
    notes: [
      {
        id: 'NOTE-5',
        author: 'C. M. Sharvesh',
        text: 'Initial needs assessment conducted. 14 machine bays identified for touch console retrofit.',
        timestamp: '2026-10-08 14:00 IST',
      },
    ],
    followUps: [],
  },
  {
    id: 'LEAD-105',
    name: 'G. Balasubramanian',
    title: 'Fleet Operations Head',
    company: 'Deccan Maritime Freight Carriers',
    email: 'bala@deccanmaritime.in',
    phone: '+91 97909 33019',
    city: 'Tuticorin',
    source: 'Direct Outreach',
    assignedRep: 'S. Ramanathan',
    stage: 'Contacted',
    dealValue: 850000,
    dealTitle: 'Maritime Port Cargo Manifest Integration',
    lastContact: '2026-10-05',
    nextFollowUp: '2026-10-22',
    notes: [
      {
        id: 'NOTE-6',
        author: 'S. Ramanathan',
        text: 'Sent introductory technical overview and case studies on port gate clearance.',
        timestamp: '2026-10-05 09:30 IST',
      },
    ],
    followUps: [],
  },
  {
    id: 'LEAD-106',
    name: 'Anand R.',
    title: 'Head of Infrastructure',
    company: 'Coromandel Logistics Hub',
    email: 'anand@coromandel-hub.in',
    phone: '+91 98402 11984',
    city: 'Chennai',
    source: 'Inbound Web',
    assignedRep: 'C. M. Sharvesh',
    stage: 'New',
    dealValue: 1400000,
    dealTitle: 'Multi-Yard Gate Dispatch SaaS Deployment',
    lastContact: '2026-10-15',
    nextFollowUp: '2026-10-17',
    notes: [],
    followUps: [
      {
        id: 'FUP-4',
        title: 'Initial Discovery Call',
        dueDate: '2026-10-17',
        priority: 'High',
        status: 'Pending',
      },
    ],
  },
];

const CRM_STORAGE_KEY_PREFIX = 'als_clientflow_crm_';

export const loadCrmData = () => {
  try {
    const c = localStorage.getItem(`${CRM_STORAGE_KEY_PREFIX}contacts`);
    return {
      contacts: c ? (JSON.parse(c) as CrmContact[]) : INITIAL_CONTACTS,
    };
  } catch {
    return {
      contacts: INITIAL_CONTACTS,
    };
  }
};

export const saveCrmData = (data: { contacts: CrmContact[] }) => {
  try {
    localStorage.setItem(`${CRM_STORAGE_KEY_PREFIX}contacts`, JSON.stringify(data.contacts));
  } catch (err) {
    console.error('Failed to save CRM data', err);
  }
};

export const resetCrmData = () => {
  try {
    localStorage.removeItem(`${CRM_STORAGE_KEY_PREFIX}contacts`);
  } catch {}
};
