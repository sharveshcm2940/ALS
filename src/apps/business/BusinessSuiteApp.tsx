import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  FileText,
  Users,
  BarChart3,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Download,
  Eye,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  X,
  CreditCard,
  Building,
} from 'lucide-react';
import { AppShell, NavItem } from '../common/AppShell';
import {
  SaleTransaction,
  Invoice,
  Customer,
  ExpenseItem,
  loadBusinessData,
  saveBusinessData,
  resetBusinessData,
  INITIAL_SALES,
  INITIAL_INVOICES,
  INITIAL_CUSTOMERS,
  INITIAL_EXPENSES,
} from './businessData';

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
  { id: 'sales', label: 'Sales & Receipts', icon: TrendingUp },
  { id: 'invoices', label: 'Invoices & Billing', icon: FileText },
  { id: 'customers', label: 'Client Accounts', icon: Users },
  { id: 'reports', label: 'Financial Reports', icon: BarChart3 },
];

export const BusinessSuiteApp: React.FC = () => {
  const [data, setData] = useState(() => loadBusinessData());
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState<'month' | 'quarter' | 'year'>('month');

  // Modal states
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // New sale form
  const [saleForm, setSaleForm] = useState({
    customerName: data.customers[0]?.companyName || '',
    amount: '',
    paymentStatus: 'Paid' as SaleTransaction['paymentStatus'],
    paymentMethod: 'Wire Transfer' as SaleTransaction['paymentMethod'],
    category: 'Software License' as SaleTransaction['category'],
    notes: '',
  });

  // New invoice form
  const [invoiceForm, setInvoiceForm] = useState({
    customerName: data.customers[0]?.companyName || '',
    amount: '',
    dueDate: '',
    itemDesc: 'Custom Enterprise Software Delivery',
    gstin: data.customers[0]?.gstin || '33AABCT1284P1Z3',
  });

  // New customer form
  const [customerForm, setCustomerForm] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    city: 'Chennai',
    gstin: '',
  });

  // Search & Filters
  const [salesSearch, setSalesSearch] = useState('');
  const [salesFilterStatus, setSalesFilterStatus] = useState<string>('ALL');
  const [invoiceSearch, setInvoiceSearch] = useState('');
  const [invoiceFilterStatus, setInvoiceFilterStatus] = useState<string>('ALL');
  const [customerSearch, setCustomerSearch] = useState('');

  // Persist whenever state changes
  useEffect(() => {
    saveBusinessData(data);
  }, [data]);

  // Derived metrics
  const totalRevenue = data.sales
    .filter((s) => s.paymentStatus === 'Paid')
    .reduce((sum, s) => sum + s.amount, 0);

  const totalExpenses = data.expenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = totalRevenue - totalExpenses;

  const outstandingInvoicesTotal = data.invoices
    .filter((i) => i.status === 'Pending' || i.status === 'Overdue')
    .reduce((sum, i) => sum + i.amount, 0);

  const overdueInvoicesCount = data.invoices.filter((i) => i.status === 'Overdue').length;

  const handleResetData = () => {
    resetBusinessData();
    setData({
      sales: INITIAL_SALES,
      invoices: INITIAL_INVOICES,
      customers: INITIAL_CUSTOMERS,
      expenses: INITIAL_EXPENSES,
    });
  };

  // Actions
  const handleCreateSale = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(saleForm.amount);
    if (!amountNum || amountNum <= 0) return;

    const newSale: SaleTransaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: saleForm.customerName,
      date: new Date().toISOString().split('T')[0],
      amount: amountNum,
      paymentStatus: saleForm.paymentStatus,
      paymentMethod: saleForm.paymentMethod,
      category: saleForm.category,
      notes: saleForm.notes || 'Recorded via ALS Business Suite Console',
    };

    setData((prev) => ({
      ...prev,
      sales: [newSale, ...prev.sales],
      customers: prev.customers.map((c) =>
        c.companyName === saleForm.customerName
          ? { ...c, totalBilled: c.totalBilled + amountNum }
          : c
      ),
    }));

    setIsSaleModalOpen(false);
    setSaleForm({
      customerName: data.customers[0]?.companyName || '',
      amount: '',
      paymentStatus: 'Paid',
      paymentMethod: 'Wire Transfer',
      category: 'Software License',
      notes: '',
    });
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(invoiceForm.amount);
    if (!amountNum || amountNum <= 0) return;

    const newInvoice: Invoice = {
      id: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      customerName: invoiceForm.customerName,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: invoiceForm.dueDate || '2026-11-15',
      amount: amountNum,
      status: 'Pending',
      gstin: invoiceForm.gstin,
      items: [
        {
          description: invoiceForm.itemDesc || 'Engineering Deliverables SLA',
          quantity: 1,
          unitPrice: amountNum,
        },
      ],
    };

    setData((prev) => ({
      ...prev,
      invoices: [newInvoice, ...prev.invoices],
      customers: prev.customers.map((c) =>
        c.companyName === invoiceForm.customerName
          ? {
              ...c,
              totalBilled: c.totalBilled + amountNum,
              outstandingBalance: c.outstandingBalance + amountNum,
            }
          : c
      ),
    }));

    setIsInvoiceModalOpen(false);
    setInvoiceForm({
      customerName: data.customers[0]?.companyName || '',
      amount: '',
      dueDate: '',
      itemDesc: 'Custom Enterprise Software Delivery',
      gstin: data.customers[0]?.gstin || '',
    });
  };

  const handleMarkInvoiceAsPaid = (invoiceId: string) => {
    const targetInvoice = data.invoices.find((i) => i.id === invoiceId);
    if (!targetInvoice || targetInvoice.status === 'Paid') return;

    // Create a matching sale record to reflect real ledger reconciliation
    const matchingSale: SaleTransaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: targetInvoice.customerName,
      date: new Date().toISOString().split('T')[0],
      amount: targetInvoice.amount,
      paymentStatus: 'Paid',
      paymentMethod: 'Wire Transfer',
      category: 'Software License',
      notes: `Settlement for Invoice #${targetInvoice.id}`,
    };

    setData((prev) => ({
      ...prev,
      invoices: prev.invoices.map((inv) =>
        inv.id === invoiceId ? { ...inv, status: 'Paid' as const } : inv
      ),
      sales: [matchingSale, ...prev.sales],
      customers: prev.customers.map((c) =>
        c.companyName === targetInvoice.customerName
          ? {
              ...c,
              outstandingBalance: Math.max(0, c.outstandingBalance - targetInvoice.amount),
            }
          : c
      ),
    }));

    if (selectedInvoice && selectedInvoice.id === invoiceId) {
      setSelectedInvoice((prev) => (prev ? { ...prev, status: 'Paid' } : null));
    }
  };

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerForm.companyName.trim()) return;

    const newCustomer: Customer = {
      id: `CUST-${Math.floor(100 + Math.random() * 900)}`,
      companyName: customerForm.companyName.trim(),
      contactPerson: customerForm.contactPerson || 'Authorized Lead',
      email: customerForm.email || 'contact@client.in',
      phone: customerForm.phone || '+91 98400 00000',
      city: customerForm.city || 'Chennai',
      gstin: customerForm.gstin || '33AABCT9999P1Z1',
      totalBilled: 0,
      outstandingBalance: 0,
      status: 'Active',
    };

    setData((prev) => ({
      ...prev,
      customers: [newCustomer, ...prev.customers],
    }));

    setIsCustomerModalOpen(false);
    setCustomerForm({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      city: 'Chennai',
      gstin: '',
    });
  };

  const handleExportCSV = () => {
    const headers = 'TransactionID,Customer,Date,Amount,Status,Method,Category\n';
    const rows = data.sales
      .map(
        (s) =>
          `"${s.id}","${s.customerName}","${s.date}",${s.amount},"${s.paymentStatus}","${s.paymentMethod}","${s.category}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ALS_BusinessSuite_Sales_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell
      appName="ALS Business Suite"
      appCategory="Enterprise ERP & Operations"
      appVersion="v2.4.0"
      navItems={NAV_ITEMS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onResetData={handleResetData}
      primaryAction={
        activeTab === 'invoices'
          ? {
              label: 'Create Invoice',
              onClick: () => setIsInvoiceModalOpen(true),
              icon: Plus,
            }
          : activeTab === 'sales'
          ? {
              label: 'Record Sale',
              onClick: () => setIsSaleModalOpen(true),
              icon: Plus,
            }
          : activeTab === 'customers'
          ? {
              label: 'Add Client',
              onClick: () => setIsCustomerModalOpen(true),
              icon: Plus,
            }
          : {
              label: 'New Invoice',
              onClick: () => setIsInvoiceModalOpen(true),
              icon: Plus,
            }
      }
    >
      {/* TAB 1: EXECUTIVE OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Header Strip with Date Range Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EAEAEA] gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif text-black font-normal">
                Business Operations &amp; Financial Overview
              </h1>
              <p className="text-xs text-[#777777] font-light mt-0.5">
                Consolidated balance sheet, operational revenue flow, and receivables telemetry.
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-white border border-[#EAEAEA] p-1 font-mono text-[11px]">
              <span className="text-[#777777] px-2 uppercase tracking-wider">Period:</span>
              <button
                type="button"
                onClick={() => setDateRange('month')}
                className={`px-2.5 py-1 transition-colors ${
                  dateRange === 'month' ? 'bg-black text-white font-medium' : 'text-[#555] hover:text-black'
                }`}
              >
                Oct 2026
              </button>
              <button
                type="button"
                onClick={() => setDateRange('quarter')}
                className={`px-2.5 py-1 transition-colors ${
                  dateRange === 'quarter' ? 'bg-black text-white font-medium' : 'text-[#555] hover:text-black'
                }`}
              >
                Q3 FY26
              </button>
              <button
                type="button"
                onClick={() => setDateRange('year')}
                className={`px-2.5 py-1 transition-colors ${
                  dateRange === 'year' ? 'bg-black text-white font-medium' : 'text-[#555] hover:text-black'
                }`}
              >
                Full Year
              </button>
            </div>
          </div>

          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-[#EAEAEA] p-5 shadow-xs">
              <div className="flex items-center justify-between text-xs font-mono text-[#777777] uppercase tracking-wider">
                <span>Total Revenue (Paid)</span>
                <ArrowUpRight size={14} className="text-black" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-normal text-black mt-2">
                ₹{totalRevenue.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-[#777777] mt-1 font-mono flex items-center gap-1">
                <span className="text-emerald-700 font-semibold">+18.4%</span> vs prior cycle
              </div>
            </div>

            <div className="bg-white border border-[#EAEAEA] p-5 shadow-xs">
              <div className="flex items-center justify-between text-xs font-mono text-[#777777] uppercase tracking-wider">
                <span>Operational Expenses</span>
                <ArrowDownRight size={14} className="text-[#777777]" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-normal text-black mt-2">
                ₹{totalExpenses.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-[#777777] mt-1 font-mono">
                {data.expenses.length} Expense line items reconciled
              </div>
            </div>

            <div className="bg-white border border-[#EAEAEA] p-5 shadow-xs">
              <div className="flex items-center justify-between text-xs font-mono text-[#777777] uppercase tracking-wider">
                <span>Net Operational Profit</span>
                <CheckCircle2 size={14} className="text-black" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-normal text-black mt-2">
                ₹{netProfit.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-[#777777] mt-1 font-mono">
                Margin: {((netProfit / (totalRevenue || 1)) * 100).toFixed(1)}% operating net
              </div>
            </div>

            <div className="bg-white border border-[#EAEAEA] p-5 shadow-xs">
              <div className="flex items-center justify-between text-xs font-mono text-[#777777] uppercase tracking-wider">
                <span>Receivables Outstanding</span>
                <Clock size={14} className="text-[#777777]" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-normal text-black mt-2">
                ₹{outstandingInvoicesTotal.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-[#777777] mt-1 font-mono">
                {overdueInvoicesCount > 0 ? (
                  <span className="text-red-700 font-semibold">{overdueInvoicesCount} Overdue Invoices</span>
                ) : (
                  <span>All accounts current</span>
                )}
              </div>
            </div>
          </div>

          {/* Revenue Trend Visualizer & Category Expense Allocation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Monthly Revenue & Expense Comparison Chart (Clean SVG) */}
            <div className="lg:col-span-8 bg-white border border-[#EAEAEA] p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3 mb-5">
                <div>
                  <h3 className="text-base font-serif font-medium text-black">
                    Fiscal Trajectory &middot; Inward Receipts vs Outward Operating Burn
                  </h3>
                  <div className="text-[10px] text-[#777777] font-mono mt-0.5">
                    Data calibrated in INR (Lakhs)
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-wider text-[#777777]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-black" /> Receipts (₹)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-[#CCCCCC]" /> Burn (₹)
                  </span>
                </div>
              </div>

              {/* Bar Chart SVG */}
              <div className="h-60 w-full">
                <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <line x1="0" y1="160" x2="600" y2="160" stroke="#EAEAEA" strokeWidth="1" />
                  <line x1="0" y1="110" x2="600" y2="110" stroke="#EAEAEA" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="60" x2="600" y2="60" stroke="#EAEAEA" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="10" x2="600" y2="10" stroke="#EAEAEA" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Y Axis Labels */}
                  <text x="5" y="15" fill="#999" fontSize="9" fontFamily="monospace">₹40L</text>
                  <text x="5" y="65" fill="#999" fontSize="9" fontFamily="monospace">₹30L</text>
                  <text x="5" y="115" fill="#999" fontSize="9" fontFamily="monospace">₹20L</text>
                  <text x="5" y="155" fill="#999" fontSize="9" fontFamily="monospace">₹0</text>

                  {/* Month Data Bars */}
                  {[
                    { m: 'May', rev: 95, exp: 60, x: 50 },
                    { m: 'Jun', rev: 110, exp: 65, x: 140 },
                    { m: 'Jul', rev: 130, exp: 70, x: 230 },
                    { m: 'Aug', rev: 115, exp: 72, x: 320 },
                    { m: 'Sep', rev: 145, exp: 80, x: 410 },
                    { m: 'Oct', rev: 160, exp: 86, x: 500 },
                  ].map((bar) => (
                    <g key={bar.m}>
                      {/* Revenue Bar */}
                      <rect
                        x={bar.x}
                        y={160 - bar.rev}
                        width="24"
                        height={bar.rev}
                        fill="#000000"
                      />
                      {/* Expense Bar */}
                      <rect
                        x={bar.x + 26}
                        y={160 - bar.exp}
                        width="24"
                        height={bar.exp}
                        fill="#CCCCCC"
                      />
                      {/* Label */}
                      <text
                        x={bar.x + 25}
                        y="180"
                        fill="#555555"
                        fontSize="10"
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        {bar.m}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* Right: Operational Expense Distribution */}
            <div className="lg:col-span-4 bg-white border border-[#EAEAEA] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-serif font-medium text-black border-b border-[#EAEAEA] pb-3 mb-4">
                  Expense Line Allocations
                </h3>
                <div className="space-y-3.5">
                  {data.expenses.map((exp) => {
                    const percent = Math.round((exp.amount / (totalExpenses || 1)) * 100);
                    return (
                      <div key={exp.id} className="text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-serif text-[#222222]">{exp.category}</span>
                          <span className="font-mono text-[#555555]">
                            ₹{(exp.amount / 1000).toFixed(0)}k ({percent}%)
                          </span>
                        </div>
                        <div className="w-full bg-[#EAEAEA] h-1.5">
                          <div className="bg-black h-1.5" style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-[#EAEAEA] text-[11px] text-[#777777] font-mono flex items-center justify-between">
                <span>Audited Under GST Rules</span>
                <span className="text-black font-semibold">100% Tax Compliant</span>
              </div>
            </div>
          </div>

          {/* Quick Ledger Snapshots */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Sales Ledger */}
            <div className="bg-white border border-[#EAEAEA] p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3 mb-3">
                <h3 className="font-serif font-medium text-base text-black">
                  Recent Inward Sales Settlements
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('sales')}
                  className="text-xs uppercase tracking-wider font-mono text-black hover:underline cursor-pointer"
                >
                  View All &rarr;
                </button>
              </div>

              <div className="divide-y divide-[#EAEAEA]">
                {data.sales.slice(0, 4).map((s) => (
                  <div key={s.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-serif font-medium text-black">{s.customerName}</div>
                      <div className="text-[10px] text-[#777777] font-mono">
                        {s.id} &middot; {s.date} &middot; {s.paymentMethod}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-medium text-black">
                        ₹{s.amount.toLocaleString('en-IN')}
                      </div>
                      <span
                        className={`inline-block px-1.5 py-0.2 text-[9px] uppercase font-mono border ${
                          s.paymentStatus === 'Paid'
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black border-black'
                        }`}
                      >
                        {s.paymentStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Invoices Status & Pending Collections */}
            <div className="bg-white border border-[#EAEAEA] p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3 mb-3">
                <h3 className="font-serif font-medium text-base text-black">
                  Invoice Receivables Monitor
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('invoices')}
                  className="text-xs uppercase tracking-wider font-mono text-black hover:underline cursor-pointer"
                >
                  Manage Invoices &rarr;
                </button>
              </div>

              <div className="divide-y divide-[#EAEAEA]">
                {data.invoices.slice(0, 4).map((inv) => (
                  <div key={inv.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-serif font-medium text-black">{inv.customerName}</div>
                      <div className="text-[10px] text-[#777777] font-mono">
                        {inv.id} &middot; Due {inv.dueDate}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-mono font-medium text-black">
                          ₹{inv.amount.toLocaleString('en-IN')}
                        </div>
                        <span
                          className={`inline-block px-1.5 py-0.2 text-[9px] uppercase font-mono border ${
                            inv.status === 'Paid'
                              ? 'bg-black text-white border-black'
                              : inv.status === 'Overdue'
                              ? 'bg-neutral-900 text-white border-neutral-900 font-semibold'
                              : 'bg-neutral-100 text-black border-[#CCCCCC]'
                          }`}
                        >
                          {inv.status}
                        </span>
                      </div>
                      {inv.status !== 'Paid' && (
                        <button
                          type="button"
                          onClick={() => handleMarkInvoiceAsPaid(inv.id)}
                          className="px-2 py-1 bg-black text-white hover:bg-neutral-800 text-[10px] uppercase font-mono cursor-pointer"
                        >
                          Mark Paid
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SALES & RECEIPTS */}
      {activeTab === 'sales' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EAEAEA] gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif text-black font-normal">
                Sales Ledger &amp; Inward Receipts
              </h1>
              <p className="text-xs text-[#777777] font-light mt-0.5">
                Real-time commercial transaction logs and settlement tracking.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleExportCSV}
                className="px-3 py-1.5 border border-[#EAEAEA] hover:border-black text-xs font-serif uppercase tracking-wider flex items-center gap-1.5 bg-white cursor-pointer"
              >
                <Download size={13} />
                <span>Export CSV</span>
              </button>
              <button
                type="button"
                onClick={() => setIsSaleModalOpen(true)}
                className="px-3.5 py-1.5 bg-black text-white hover:bg-neutral-800 text-xs font-serif uppercase tracking-wider font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus size={13} />
                <span>Record New Sale</span>
              </button>
            </div>
          </div>

          {/* Search & Filter Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 border border-[#EAEAEA]">
            <div className="relative flex-1 min-w-[240px]">
              <Search size={14} className="absolute left-2.5 top-2.5 text-[#777777]" />
              <input
                type="text"
                placeholder="Search by customer name, transaction ID, or notes..."
                value={salesSearch}
                onChange={(e) => setSalesSearch(e.target.value)}
                className="w-full bg-[#FAFAFA] border border-[#EAEAEA] pl-8 pr-3 py-1.5 text-xs font-serif focus:outline-none focus:border-black"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono text-[#777777]">Status:</span>
              {(['ALL', 'Paid', 'Pending'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSalesFilterStatus(st)}
                  className={`px-2.5 py-1 text-[10px] uppercase font-mono border cursor-pointer ${
                    salesFilterStatus === st
                      ? 'bg-black text-white border-black font-semibold'
                      : 'bg-white text-black border-[#EAEAEA] hover:border-black'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Sales Table */}
          <div className="bg-white border border-[#EAEAEA] overflow-x-auto shadow-xs">
            <table className="w-full text-left text-xs font-serif">
              <thead className="bg-[#FAFAFA] border-b border-[#EAEAEA] text-[10px] font-mono uppercase tracking-wider text-[#777777]">
                <tr>
                  <th className="p-3">Txn ID</th>
                  <th className="p-3">Customer Entity</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Payment Method</th>
                  <th className="p-3 text-right">Amount (INR)</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA]">
                {data.sales
                  .filter((s) => {
                    const matchesSearch =
                      s.customerName.toLowerCase().includes(salesSearch.toLowerCase()) ||
                      s.id.toLowerCase().includes(salesSearch.toLowerCase()) ||
                      (s.notes && s.notes.toLowerCase().includes(salesSearch.toLowerCase()));
                    const matchesStatus =
                      salesFilterStatus === 'ALL' || s.paymentStatus === salesFilterStatus;
                    return matchesSearch && matchesStatus;
                  })
                  .map((sale) => (
                    <tr key={sale.id} className="hover:bg-[#FAFAFA] transition-colors">
                      <td className="p-3 font-mono font-medium text-black">{sale.id}</td>
                      <td className="p-3 font-medium text-black">
                        <div>{sale.customerName}</div>
                        {sale.notes && (
                          <div className="text-[10px] text-[#777777] font-normal truncate max-w-xs">
                            {sale.notes}
                          </div>
                        )}
                      </td>
                      <td className="p-3 font-mono text-[#555555]">{sale.date}</td>
                      <td className="p-3 text-[#444444]">{sale.category}</td>
                      <td className="p-3 font-mono text-[#555555]">{sale.paymentMethod}</td>
                      <td className="p-3 font-mono text-black text-right font-medium">
                        ₹{sale.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-block px-2 py-0.5 text-[9px] uppercase font-mono border ${
                            sale.paymentStatus === 'Paid'
                              ? 'bg-black text-white border-black'
                              : 'bg-white text-black border-black'
                          }`}
                        >
                          {sale.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: INVOICES & BILLING */}
      {activeTab === 'invoices' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EAEAEA] gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif text-black font-normal">
                Invoices &amp; Accounts Receivable
              </h1>
              <p className="text-xs text-[#777777] font-light mt-0.5">
                Statutory tax invoices, automated milestone billing, and settlement receipts.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsInvoiceModalOpen(true)}
              className="px-3.5 py-1.5 bg-black text-white hover:bg-neutral-800 text-xs font-serif uppercase tracking-wider font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus size={13} />
              <span>Generate Tax Invoice</span>
            </button>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 border border-[#EAEAEA]">
            <div className="relative flex-1 min-w-[240px]">
              <Search size={14} className="absolute left-2.5 top-2.5 text-[#777777]" />
              <input
                type="text"
                placeholder="Search invoice number, client, or GSTIN..."
                value={invoiceSearch}
                onChange={(e) => setInvoiceSearch(e.target.value)}
                className="w-full bg-[#FAFAFA] border border-[#EAEAEA] pl-8 pr-3 py-1.5 text-xs font-serif focus:outline-none focus:border-black"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono text-[#777777]">Filter:</span>
              {(['ALL', 'Pending', 'Overdue', 'Paid'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setInvoiceFilterStatus(st)}
                  className={`px-2.5 py-1 text-[10px] uppercase font-mono border cursor-pointer ${
                    invoiceFilterStatus === st
                      ? 'bg-black text-white border-black font-semibold'
                      : 'bg-white text-black border-[#EAEAEA] hover:border-black'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Invoices Table */}
          <div className="bg-white border border-[#EAEAEA] overflow-x-auto shadow-xs">
            <table className="w-full text-left text-xs font-serif">
              <thead className="bg-[#FAFAFA] border-b border-[#EAEAEA] text-[10px] font-mono uppercase tracking-wider text-[#777777]">
                <tr>
                  <th className="p-3">Invoice #</th>
                  <th className="p-3">Client Entity</th>
                  <th className="p-3">Issue Date</th>
                  <th className="p-3">Due Date</th>
                  <th className="p-3 text-right">Amount (INR)</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA]">
                {data.invoices
                  .filter((i) => {
                    const matches =
                      i.customerName.toLowerCase().includes(invoiceSearch.toLowerCase()) ||
                      i.id.toLowerCase().includes(invoiceSearch.toLowerCase()) ||
                      (i.gstin && i.gstin.toLowerCase().includes(invoiceSearch.toLowerCase()));
                    const matchesStatus =
                      invoiceFilterStatus === 'ALL' || i.status === invoiceFilterStatus;
                    return matches && matchesStatus;
                  })
                  .map((inv) => (
                    <tr key={inv.id} className="hover:bg-[#FAFAFA] transition-colors">
                      <td className="p-3 font-mono font-medium text-black">{inv.id}</td>
                      <td className="p-3 font-medium text-black">
                        <div>{inv.customerName}</div>
                        <div className="text-[10px] text-[#777777] font-mono">
                          GSTIN: {inv.gstin || '33AABCT1284P1Z3'}
                        </div>
                      </td>
                      <td className="p-3 font-mono text-[#555555]">{inv.issueDate}</td>
                      <td className="p-3 font-mono text-[#555555]">{inv.dueDate}</td>
                      <td className="p-3 font-mono text-black text-right font-medium">
                        ₹{inv.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-block px-2 py-0.5 text-[9px] uppercase font-mono border ${
                            inv.status === 'Paid'
                              ? 'bg-black text-white border-black'
                              : inv.status === 'Overdue'
                              ? 'bg-neutral-900 text-white border-neutral-900 font-bold'
                              : 'bg-white text-black border-black font-semibold'
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedInvoice(inv)}
                            className="px-2 py-1 border border-[#EAEAEA] hover:border-black text-[10px] font-mono uppercase cursor-pointer"
                          >
                            Inspect
                          </button>
                          {inv.status !== 'Paid' && (
                            <button
                              type="button"
                              onClick={() => handleMarkInvoiceAsPaid(inv.id)}
                              className="px-2 py-1 bg-black text-white hover:bg-neutral-800 text-[10px] font-mono uppercase cursor-pointer"
                            >
                              Settle (Mark Paid)
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: CLIENT ACCOUNTS */}
      {activeTab === 'customers' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EAEAEA] gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif text-black font-normal">
                Client Organization Directory
              </h1>
              <p className="text-xs text-[#777777] font-light mt-0.5">
                Corporate customer accounts, statutory tax credentials, and billing ledgers.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsCustomerModalOpen(true)}
              className="px-3.5 py-1.5 bg-black text-white hover:bg-neutral-800 text-xs font-serif uppercase tracking-wider font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus size={13} />
              <span>Enroll New Client Account</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="bg-white p-3 border border-[#EAEAEA] flex items-center">
            <Search size={14} className="text-[#777777] mr-2" />
            <input
              type="text"
              placeholder="Search by company name, contact person, city, or GSTIN..."
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
              className="w-full bg-transparent text-xs font-serif focus:outline-none"
            />
          </div>

          {/* Customer Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.customers
              .filter(
                (c) =>
                  c.companyName.toLowerCase().includes(customerSearch.toLowerCase()) ||
                  c.contactPerson.toLowerCase().includes(customerSearch.toLowerCase()) ||
                  c.city.toLowerCase().includes(customerSearch.toLowerCase()) ||
                  c.gstin.toLowerCase().includes(customerSearch.toLowerCase())
              )
              .map((cust) => (
                <div
                  key={cust.id}
                  className="bg-white border border-[#EAEAEA] p-5 shadow-xs flex flex-col justify-between hover:border-black transition-colors"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-[10px] uppercase text-[#777777]">
                        {cust.id} &middot; {cust.city}
                      </span>
                      <span className="px-1.5 py-0.2 bg-[#FAFAFA] border border-[#EAEAEA] text-[9px] uppercase font-mono text-black">
                        {cust.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-normal text-black mt-2 leading-snug">
                      {cust.companyName}
                    </h3>
                    <div className="text-xs text-[#555555] font-light mt-1">
                      Lead: {cust.contactPerson}
                    </div>
                    <div className="text-[11px] font-mono text-[#777777] mt-0.5">
                      {cust.email} &middot; {cust.phone}
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#EAEAEA] space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#777777]">GSTIN:</span>
                        <span className="font-mono text-black">{cust.gstin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#777777]">Total Billed:</span>
                        <span className="font-mono text-black">
                          ₹{cust.totalBilled.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#777777]">Outstanding Balance:</span>
                        <span
                          className={`font-mono font-medium ${
                            cust.outstandingBalance > 0 ? 'text-neutral-900 font-bold' : 'text-emerald-700'
                          }`}
                        >
                          ₹{cust.outstandingBalance.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#EAEAEA] flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setInvoiceForm((prev) => ({
                          ...prev,
                          customerName: cust.companyName,
                          gstin: cust.gstin,
                        }));
                        setIsInvoiceModalOpen(true);
                      }}
                      className="flex-1 py-1.5 border border-[#EAEAEA] hover:border-black text-[10px] font-mono uppercase transition-colors"
                    >
                      Bill Client
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSaleForm((prev) => ({
                          ...prev,
                          customerName: cust.companyName,
                        }));
                        setIsSaleModalOpen(true);
                      }}
                      className="flex-1 py-1.5 bg-black text-white hover:bg-neutral-800 text-[10px] font-mono uppercase transition-colors"
                    >
                      Log Receipt
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* TAB 5: FINANCIAL REPORTS */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EAEAEA] gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif text-black font-normal">
                Statutory Financial Reports &amp; Statements
              </h1>
              <p className="text-xs text-[#777777] font-light mt-0.5">
                Deterministic profit and loss accounting statement and GST compliance ledger.
              </p>
            </div>
            <button
              type="button"
              onClick={handleExportCSV}
              className="px-3 py-1.5 bg-black text-white hover:bg-neutral-800 text-xs font-serif uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download size={13} />
              <span>Download Ledger CSV</span>
            </button>
          </div>

          {/* Statement Table */}
          <div className="bg-white border border-[#EAEAEA] p-6 shadow-xs">
            <div className="text-center pb-6 border-b border-[#EAEAEA] mb-6">
              <div className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#777777]">
                STATEMENT OF OPERATIONS
              </div>
              <h2 className="text-2xl font-serif text-black mt-1">
                ALS Infonet Corporate &middot; Chennai &amp; Bangalore
              </h2>
              <div className="text-xs text-[#777777] font-mono mt-0.5">
                Fictional Demonstration Accounting Ledger &middot; FY 2025-26
              </div>
            </div>

            <div className="space-y-3 font-serif text-xs max-w-3xl mx-auto">
              <div className="flex justify-between py-2 border-b border-[#EAEAEA] font-bold text-sm">
                <span>Total Inward Gross Receipts</span>
                <span className="font-mono">₹{totalRevenue.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1 text-[#555555] pl-4">
                <span>&bull; Software Licenses &amp; Subscriptions</span>
                <span className="font-mono">
                  ₹{(totalRevenue * 0.55).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between py-1 text-[#555555] pl-4">
                <span>&bull; Architecture Consulting &amp; SLAs</span>
                <span className="font-mono">
                  ₹{(totalRevenue * 0.45).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-[#EAEAEA] font-bold text-sm pt-4">
                <span>Less: Total Operating Expenditures</span>
                <span className="font-mono text-neutral-800">
                  (₹{totalExpenses.toLocaleString('en-IN')})
                </span>
              </div>
              {data.expenses.map((exp) => (
                <div key={exp.id} className="flex justify-between py-1 text-[#555555] pl-4">
                  <span>&bull; {exp.category}</span>
                  <span className="font-mono">(₹{exp.amount.toLocaleString('en-IN')})</span>
                </div>
              ))}

              <div className="flex justify-between py-3 border-t-2 border-black font-bold text-base bg-[#FAFAFA] px-4 mt-6">
                <span>Net Operational Earnings Before Tax</span>
                <span className="font-mono text-black">
                  ₹{netProfit.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: RECORD NEW SALE */}
      {isSaleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EAEAEA] max-w-lg w-full p-6 shadow-2xl text-black font-serif">
            <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3 mb-4">
              <h3 className="text-xl font-normal">Record Commercial Sale / Inward Receipt</h3>
              <button
                type="button"
                onClick={() => setIsSaleModalOpen(false)}
                className="p-1 hover:bg-[#EAEAEA]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateSale} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                  Client Account
                </label>
                <select
                  value={saleForm.customerName}
                  onChange={(e) => setSaleForm({ ...saleForm, customerName: e.target.value })}
                  className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                >
                  {data.customers.map((c) => (
                    <option key={c.id} value={c.companyName}>
                      {c.companyName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    Amount (INR) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 250000"
                    value={saleForm.amount}
                    onChange={(e) => setSaleForm({ ...saleForm, amount: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs font-mono focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    Payment Method
                  </label>
                  <select
                    value={saleForm.paymentMethod}
                    onChange={(e) =>
                      setSaleForm({
                        ...saleForm,
                        paymentMethod: e.target.value as SaleTransaction['paymentMethod'],
                      })
                    }
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                  >
                    <option value="Wire Transfer">Wire Transfer</option>
                    <option value="Net Banking">Net Banking</option>
                    <option value="UPI Corporate">UPI Corporate</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    Revenue Category
                  </label>
                  <select
                    value={saleForm.category}
                    onChange={(e) =>
                      setSaleForm({
                        ...saleForm,
                        category: e.target.value as SaleTransaction['category'],
                      })
                    }
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                  >
                    <option value="Software License">Software License</option>
                    <option value="Consulting & SLA">Consulting &amp; SLA</option>
                    <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                    <option value="Implementation">Implementation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    Settlement Status
                  </label>
                  <select
                    value={saleForm.paymentStatus}
                    onChange={(e) =>
                      setSaleForm({
                        ...saleForm,
                        paymentStatus: e.target.value as SaleTransaction['paymentStatus'],
                      })
                    }
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                  Deliverable Notes / Reference
                </label>
                <input
                  type="text"
                  placeholder="e.g. Q4 Deployment Milestone 2 Sign-off"
                  value={saleForm.notes}
                  onChange={(e) => setSaleForm({ ...saleForm, notes: e.target.value })}
                  className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#EAEAEA]">
                <button
                  type="button"
                  onClick={() => setIsSaleModalOpen(false)}
                  className="px-4 py-2 border border-[#EAEAEA] hover:border-black text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white hover:bg-neutral-800 text-xs uppercase font-medium"
                >
                  Record Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE INVOICE */}
      {isInvoiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EAEAEA] max-w-lg w-full p-6 shadow-2xl text-black font-serif">
            <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3 mb-4">
              <h3 className="text-xl font-normal">Generate Tax Invoice</h3>
              <button
                type="button"
                onClick={() => setIsInvoiceModalOpen(false)}
                className="p-1 hover:bg-[#EAEAEA]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                  Client Organization
                </label>
                <select
                  value={invoiceForm.customerName}
                  onChange={(e) => {
                    const cust = data.customers.find((c) => c.companyName === e.target.value);
                    setInvoiceForm({
                      ...invoiceForm,
                      customerName: e.target.value,
                      gstin: cust?.gstin || '',
                    });
                  }}
                  className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                >
                  {data.customers.map((c) => (
                    <option key={c.id} value={c.companyName}>
                      {c.companyName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    Invoice Amount (INR) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 350000"
                    value={invoiceForm.amount}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, amount: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs font-mono focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    Payment Due Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={invoiceForm.dueDate}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, dueDate: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs font-mono focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                  Billable Item Description
                </label>
                <input
                  type="text"
                  value={invoiceForm.itemDesc}
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, itemDesc: e.target.value })}
                  className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                  Recipient GSTIN
                </label>
                <input
                  type="text"
                  value={invoiceForm.gstin}
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, gstin: e.target.value })}
                  className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs font-mono uppercase focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#EAEAEA]">
                <button
                  type="button"
                  onClick={() => setIsInvoiceModalOpen(false)}
                  className="px-4 py-2 border border-[#EAEAEA] hover:border-black text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white hover:bg-neutral-800 text-xs uppercase font-medium"
                >
                  Dispatch Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD CLIENT ACCOUNT */}
      {isCustomerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EAEAEA] max-w-lg w-full p-6 shadow-2xl text-black font-serif">
            <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3 mb-4">
              <h3 className="text-xl font-normal">Enroll New Client Organization</h3>
              <button
                type="button"
                onClick={() => setIsCustomerModalOpen(false)}
                className="p-1 hover:bg-[#EAEAEA]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                  Organization Legal Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Deccan Logistics India Pvt Ltd"
                  value={customerForm.companyName}
                  onChange={(e) =>
                    setCustomerForm({ ...customerForm, companyName: e.target.value })
                  }
                  className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. K. Sundar"
                    value={customerForm.contactPerson}
                    onChange={(e) =>
                      setCustomerForm({ ...customerForm, contactPerson: e.target.value })
                    }
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    City Location
                  </label>
                  <input
                    type="text"
                    value={customerForm.city}
                    onChange={(e) => setCustomerForm({ ...customerForm, city: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="accounts@deccan.in"
                    value={customerForm.email}
                    onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="+91 XXXXX XXXXX"
                    value={customerForm.phone}
                    onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                  Statutory GSTIN
                </label>
                <input
                  type="text"
                  placeholder="33AABCT1284P1Z3"
                  value={customerForm.gstin}
                  onChange={(e) => setCustomerForm({ ...customerForm, gstin: e.target.value })}
                  className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs font-mono uppercase focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#EAEAEA]">
                <button
                  type="button"
                  onClick={() => setIsCustomerModalOpen(false)}
                  className="px-4 py-2 border border-[#EAEAEA] hover:border-black text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white hover:bg-neutral-800 text-xs uppercase font-medium"
                >
                  Save Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW / INSPECT TAX INVOICE */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EAEAEA] max-w-xl w-full p-6 sm:p-8 shadow-2xl text-black font-serif">
            <div className="flex items-start justify-between border-b border-[#EAEAEA] pb-4 mb-6">
              <div>
                <div className="text-[10px] uppercase font-mono text-[#777777] tracking-widest">
                  TAX INVOICE STATEMENT
                </div>
                <h3 className="text-2xl font-serif font-normal mt-0.5">{selectedInvoice.id}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                className="p-1 hover:bg-[#EAEAEA]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#EAEAEA]">
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#777777] block">Billed To:</span>
                  <div className="font-serif font-medium text-sm text-black">
                    {selectedInvoice.customerName}
                  </div>
                  <div className="font-mono text-[10px] text-[#777777] mt-0.5">
                    GSTIN: {selectedInvoice.gstin || '33AABCT1284P1Z3'}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono text-[#777777] block">Issuer:</span>
                  <div className="font-serif font-medium text-black">ALS Infonet Private Limited</div>
                  <div className="font-mono text-[10px] text-[#777777]">Chennai &middot; Tamil Nadu</div>
                  <div className="font-mono text-[10px] text-[#777777]">Due Date: {selectedInvoice.dueDate}</div>
                </div>
              </div>

              <div>
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-[#EAEAEA] text-[10px] font-mono uppercase text-[#777777]">
                    <tr>
                      <th className="py-2">Item Description</th>
                      <th className="py-2 text-right">Qty</th>
                      <th className="py-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAEAEA]">
                    {selectedInvoice.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-2.5">{item.description}</td>
                        <td className="py-2.5 text-right font-mono">{item.quantity}</td>
                        <td className="py-2.5 text-right font-mono">
                          ₹{item.unitPrice.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border-t-2 border-black pt-3 flex justify-between items-center text-sm font-bold">
                <span>Total Payable (INR)</span>
                <span className="font-mono">₹{selectedInvoice.amount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#EAEAEA] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono text-[#777777]">Status:</span>
                <span
                  className={`px-2 py-0.5 text-[9px] uppercase font-mono border ${
                    selectedInvoice.status === 'Paid'
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-black font-semibold'
                  }`}
                >
                  {selectedInvoice.status}
                </span>
              </div>

              <div className="flex gap-2">
                {selectedInvoice.status !== 'Paid' && (
                  <button
                    type="button"
                    onClick={() => handleMarkInvoiceAsPaid(selectedInvoice.id)}
                    className="px-4 py-2 bg-black text-white hover:bg-neutral-800 text-xs uppercase font-mono cursor-pointer"
                  >
                    Record Payment Settlement
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedInvoice(null)}
                  className="px-4 py-2 border border-[#EAEAEA] hover:border-black text-xs uppercase"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
};
