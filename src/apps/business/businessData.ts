export interface SaleTransaction {
  id: string;
  customerName: string;
  date: string;
  amount: number;
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  paymentMethod: 'Wire Transfer' | 'UPI Corporate' | 'Net Banking' | 'Cheque';
  category: 'Software License' | 'Cloud Infrastructure' | 'Consulting & SLA' | 'Implementation';
  notes?: string;
}

export interface Invoice {
  id: string;
  customerName: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  items: { description: string; quantity: number; unitPrice: number }[];
  gstin?: string;
}

export interface Customer {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  gstin: string;
  totalBilled: number;
  outstandingBalance: number;
  status: 'Active' | 'Prospect' | 'Dormant';
}

export interface ExpenseItem {
  id: string;
  category: 'Engineering Payroll' | 'Cloud Infrastructure' | 'Office Operations' | 'Audit & Compliance' | 'Sales & Marketing';
  amount: number;
  date: string;
  vendor: string;
}

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'CUST-001',
    companyName: 'Titan Precision Logistics Ltd',
    contactPerson: 'K. Rajendran',
    email: 'k.rajendran@titanlogistics.in',
    phone: '+91 98401 22910',
    city: 'Chennai',
    gstin: '33AABCT1284P1Z3',
    totalBilled: 2450000,
    outstandingBalance: 350000,
    status: 'Active',
  },
  {
    id: 'CUST-002',
    companyName: 'Bangalore FinEdge Capital Pvt Ltd',
    contactPerson: 'P. Meenakshi',
    email: 'meenakshi@finedgecap.com',
    phone: '+91 99800 48192',
    city: 'Bangalore',
    gstin: '29AABCB9041Q1ZP',
    totalBilled: 3820000,
    outstandingBalance: 0,
    status: 'Active',
  },
  {
    id: 'CUST-003',
    companyName: 'Coimbatore Foundry & Machining Works',
    contactPerson: 'S. Ramanathan',
    email: 'ramanathan@cbe-foundry.co.in',
    phone: '+91 94432 88410',
    city: 'Coimbatore',
    gstin: '33AACCC4190M1Z8',
    totalBilled: 1280000,
    outstandingBalance: 180000,
    status: 'Active',
  },
  {
    id: 'CUST-004',
    companyName: 'Apex Health Systems India',
    contactPerson: 'Dr. V. Sundaram',
    email: 'sundaram@apexhealth.org',
    phone: '+91 98840 19482',
    city: 'Chennai',
    gstin: '33AABCA8921J1Z2',
    totalBilled: 4150000,
    outstandingBalance: 520000,
    status: 'Active',
  },
  {
    id: 'CUST-005',
    companyName: 'Deccan Maritime Freight Carriers',
    contactPerson: 'G. Balasubramanian',
    email: 'bala@deccanmaritime.in',
    phone: '+91 97909 33019',
    city: 'Tuticorin',
    gstin: '33AABCD7721K1Z5',
    totalBilled: 890000,
    outstandingBalance: 0,
    status: 'Active',
  },
];

export const INITIAL_SALES: SaleTransaction[] = [
  {
    id: 'TXN-8091',
    customerName: 'Titan Precision Logistics Ltd',
    date: '2026-10-14',
    amount: 350000,
    paymentStatus: 'Paid',
    paymentMethod: 'Wire Transfer',
    category: 'Software License',
    notes: 'Q4 Enterprise Yard Dispatch platform license renewal',
  },
  {
    id: 'TXN-8092',
    customerName: 'Bangalore FinEdge Capital Pvt Ltd',
    date: '2026-10-12',
    amount: 620000,
    paymentStatus: 'Paid',
    paymentMethod: 'Net Banking',
    category: 'Consulting & SLA',
    notes: 'Financial reconciliation batch engine optimization',
  },
  {
    id: 'TXN-8093',
    customerName: 'Apex Health Systems India',
    date: '2026-10-09',
    amount: 520000,
    paymentStatus: 'Pending',
    paymentMethod: 'Wire Transfer',
    category: 'Implementation',
    notes: 'HIPAA & ISO compliance records vault staging',
  },
  {
    id: 'TXN-8094',
    customerName: 'Coimbatore Foundry & Machining Works',
    date: '2026-10-05',
    amount: 180000,
    paymentStatus: 'Paid',
    paymentMethod: 'UPI Corporate',
    category: 'Software License',
    notes: 'Shop-floor touch terminal inspection module',
  },
  {
    id: 'TXN-8095',
    customerName: 'Deccan Maritime Freight Carriers',
    date: '2026-09-28',
    amount: 290000,
    paymentStatus: 'Paid',
    paymentMethod: 'Wire Transfer',
    category: 'Cloud Infrastructure',
    notes: 'Dedicated cloud tenancy host & standby replication',
  },
  {
    id: 'TXN-8096',
    customerName: 'Titan Precision Logistics Ltd',
    date: '2026-09-15',
    amount: 450000,
    paymentStatus: 'Paid',
    paymentMethod: 'Net Banking',
    category: 'Implementation',
    notes: 'Offline gate sync & edge cache deployment',
  },
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'INV-2026-081',
    customerName: 'Titan Precision Logistics Ltd',
    issueDate: '2026-10-01',
    dueDate: '2026-10-31',
    amount: 350000,
    status: 'Pending',
    gstin: '33AABCT1284P1Z3',
    items: [
      { description: 'Fleet Transit Management Software License (Q4)', quantity: 1, unitPrice: 250000 },
      { description: '24/7 Priority SLA & Dedicated Systems Engineer', quantity: 1, unitPrice: 100000 },
    ],
  },
  {
    id: 'INV-2026-082',
    customerName: 'Bangalore FinEdge Capital Pvt Ltd',
    issueDate: '2026-09-15',
    dueDate: '2026-10-15',
    amount: 620000,
    status: 'Paid',
    gstin: '29AABCB9041Q1ZP',
    items: [
      { description: 'Audit Reconciliation Engine Implementation', quantity: 1, unitPrice: 480000 },
      { description: 'Cryptographic Ledger Compliance Module', quantity: 1, unitPrice: 140000 },
    ],
  },
  {
    id: 'INV-2026-083',
    customerName: 'Apex Health Systems India',
    issueDate: '2026-09-10',
    dueDate: '2026-10-10',
    amount: 520000,
    status: 'Overdue',
    gstin: '33AABCA8921J1Z2',
    items: [
      { description: 'Encrypted Records Storage Architecture Phase 2', quantity: 1, unitPrice: 420000 },
      { description: 'Zero-Knowledge Metadata Indexing Service', quantity: 1, unitPrice: 100000 },
    ],
  },
  {
    id: 'INV-2026-084',
    customerName: 'Coimbatore Foundry & Machining Works',
    issueDate: '2026-10-02',
    dueDate: '2026-11-02',
    amount: 180000,
    status: 'Pending',
    gstin: '33AACCC4190M1Z8',
    items: [
      { description: 'Touch Terminal CAD Drawing Revision Lockout Hub', quantity: 1, unitPrice: 180000 },
    ],
  },
  {
    id: 'INV-2026-085',
    customerName: 'Deccan Maritime Freight Carriers',
    issueDate: '2026-09-01',
    dueDate: '2026-09-30',
    amount: 290000,
    status: 'Paid',
    gstin: '33AABCD7721K1Z5',
    items: [
      { description: 'Cloud Infrastructure & High-Availability Tenancy', quantity: 1, unitPrice: 290000 },
    ],
  },
];

export const INITIAL_EXPENSES: ExpenseItem[] = [
  { id: 'EXP-101', category: 'Engineering Payroll', amount: 540000, date: '2026-10-01', vendor: 'Engineering Staff (Chennai & Bangalore)' },
  { id: 'EXP-102', category: 'Cloud Infrastructure', amount: 145000, date: '2026-10-04', vendor: 'GCP & Cloud Run Multi-Region Host' },
  { id: 'EXP-103', category: 'Office Operations', amount: 82000, date: '2026-10-06', vendor: 'Chennai Facility & Leased Line' },
  { id: 'EXP-104', category: 'Audit & Compliance', amount: 45000, date: '2026-10-08', vendor: 'Statutory GST & Corporate Secretarial Services' },
  { id: 'EXP-105', category: 'Sales & Marketing', amount: 52000, date: '2026-10-10', vendor: 'B2B Client Briefing Materials' },
];

const STORAGE_KEY_PREFIX = 'als_business_suite_';

export const loadBusinessData = () => {
  try {
    const s = localStorage.getItem(`${STORAGE_KEY_PREFIX}sales`);
    const i = localStorage.getItem(`${STORAGE_KEY_PREFIX}invoices`);
    const c = localStorage.getItem(`${STORAGE_KEY_PREFIX}customers`);
    const e = localStorage.getItem(`${STORAGE_KEY_PREFIX}expenses`);
    return {
      sales: s ? (JSON.parse(s) as SaleTransaction[]) : INITIAL_SALES,
      invoices: i ? (JSON.parse(i) as Invoice[]) : INITIAL_INVOICES,
      customers: c ? (JSON.parse(c) as Customer[]) : INITIAL_CUSTOMERS,
      expenses: e ? (JSON.parse(e) as ExpenseItem[]) : INITIAL_EXPENSES,
    };
  } catch {
    return {
      sales: INITIAL_SALES,
      invoices: INITIAL_INVOICES,
      customers: INITIAL_CUSTOMERS,
      expenses: INITIAL_EXPENSES,
    };
  }
};

export const saveBusinessData = (data: {
  sales: SaleTransaction[];
  invoices: Invoice[];
  customers: Customer[];
  expenses: ExpenseItem[];
}) => {
  try {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}sales`, JSON.stringify(data.sales));
    localStorage.setItem(`${STORAGE_KEY_PREFIX}invoices`, JSON.stringify(data.invoices));
    localStorage.setItem(`${STORAGE_KEY_PREFIX}customers`, JSON.stringify(data.customers));
    localStorage.setItem(`${STORAGE_KEY_PREFIX}expenses`, JSON.stringify(data.expenses));
  } catch (err) {
    console.error('Failed to save to localStorage', err);
  }
};

export const resetBusinessData = () => {
  try {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}sales`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}invoices`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}customers`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}expenses`);
  } catch {}
};
