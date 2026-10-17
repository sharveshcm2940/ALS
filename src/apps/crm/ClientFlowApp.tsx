import React, { useState, useEffect } from 'react';
import {
  Users,
  GitPullRequest,
  Contact2,
  PieChart,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Phone,
  Mail,
  Building,
  User,
  Clock,
  MessageSquare,
  AlertCircle,
  X,
  Check,
} from 'lucide-react';
import { AppShell, NavItem } from '../common/AppShell';
import {
  CrmContact,
  LeadStage,
  loadCrmData,
  saveCrmData,
  resetCrmData,
  INITIAL_CONTACTS,
} from './crmData';

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'CRM Executive Overview', icon: Users },
  { id: 'pipeline', label: 'Deal Pipeline Board', icon: GitPullRequest },
  { id: 'contacts', label: 'Contact Directory', icon: Contact2 },
  { id: 'analytics', label: 'Sales Velocity & Analytics', icon: PieChart },
];

const STAGES: LeadStage[] = [
  'New',
  'Contacted',
  'Qualified',
  'Proposal',
  'Negotiation',
  'Won',
  'Lost',
];

export const ClientFlowApp: React.FC = () => {
  const [data, setData] = useState(() => loadCrmData());
  const [activeTab, setActiveTab] = useState('overview');

  // Modals & detail drawer
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<CrmContact | null>(null);

  // Filters & search
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('ALL');
  const [sourceFilter, setSourceFilter] = useState<string>('ALL');

  // New Contact form
  const [newContactForm, setNewContactForm] = useState({
    name: '',
    title: 'Operations Director',
    company: '',
    email: '',
    phone: '',
    city: 'Chennai',
    source: 'Inbound Web' as CrmContact['source'],
    assignedRep: 'S. Ramanathan',
    stage: 'New' as LeadStage,
    dealTitle: '',
    dealValue: '1200000',
  });

  // Note text input
  const [noteInput, setNoteInput] = useState('');
  // Followup form input
  const [followupTitle, setFollowupTitle] = useState('');
  const [followupDate, setFollowupDate] = useState('2026-10-24');

  useEffect(() => {
    saveCrmData(data);
  }, [data]);

  // Derived metrics
  const totalContacts = data.contacts.length;
  const newLeadsCount = data.contacts.filter((c) => c.stage === 'New').length;
  const qualifiedCount = data.contacts.filter((c) => c.stage === 'Qualified').length;
  const wonCount = data.contacts.filter((c) => c.stage === 'Won').length;
  const lostCount = data.contacts.filter((c) => c.stage === 'Lost').length;
  const activeOpportunities = data.contacts.filter(
    (c) => c.stage !== 'Won' && c.stage !== 'Lost'
  ).length;

  const totalPipelineValue = data.contacts
    .filter((c) => c.stage !== 'Lost')
    .reduce((sum, c) => sum + c.dealValue, 0);

  const activePipelineValue = data.contacts
    .filter((c) => c.stage !== 'Won' && c.stage !== 'Lost')
    .reduce((sum, c) => sum + c.dealValue, 0);

  const wonDealValue = data.contacts
    .filter((c) => c.stage === 'Won')
    .reduce((sum, c) => sum + c.dealValue, 0);

  const conversionRate =
    wonCount + lostCount > 0 ? Math.round((wonCount / (wonCount + lostCount)) * 100) : 75;

  const handleReset = () => {
    resetCrmData();
    setData({ contacts: INITIAL_CONTACTS });
    setSelectedContact(null);
  };

  // Move deal to next or previous stage
  const handleUpdateStage = (contactId: string, newStage: LeadStage) => {
    setData((prev) => ({
      ...prev,
      contacts: prev.contacts.map((c) => {
        if (c.id !== contactId) return c;
        const updated = {
          ...c,
          stage: newStage,
          lastContact: new Date().toISOString().split('T')[0],
        };
        // Add automatic system note
        updated.notes = [
          {
            id: `NOTE-${Date.now()}`,
            author: 'System Workflow Engine',
            text: `Opportunity stage updated to "${newStage}".`,
            timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          },
          ...updated.notes,
        ];
        return updated;
      }),
    }));

    if (selectedContact && selectedContact.id === contactId) {
      setSelectedContact((prev) => (prev ? { ...prev, stage: newStage } : null));
    }
  };

  // Add Contact
  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactForm.name.trim() || !newContactForm.company.trim()) return;

    const valNum = parseFloat(newContactForm.dealValue) || 500000;

    const newEntry: CrmContact = {
      id: `LEAD-${Math.floor(100 + Math.random() * 900)}`,
      name: newContactForm.name.trim(),
      title: newContactForm.title.trim(),
      company: newContactForm.company.trim(),
      email: newContactForm.email || 'lead@enterprise.in',
      phone: newContactForm.phone || '+91 98400 00000',
      city: newContactForm.city,
      source: newContactForm.source,
      assignedRep: newContactForm.assignedRep,
      stage: newContactForm.stage,
      dealValue: valNum,
      dealTitle:
        newContactForm.dealTitle ||
        `${newContactForm.company} Custom Software Deployment`,
      lastContact: new Date().toISOString().split('T')[0],
      notes: [
        {
          id: `NOTE-${Date.now()}`,
          author: newContactForm.assignedRep,
          text: `Contact enrolled in ALS ClientFlow pipeline via ${newContactForm.source}.`,
          timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        },
      ],
      followUps: [],
    };

    setData((prev) => ({
      ...prev,
      contacts: [newEntry, ...prev.contacts],
    }));

    setIsAddContactOpen(false);
    setNewContactForm({
      name: '',
      title: 'Operations Director',
      company: '',
      email: '',
      phone: '',
      city: 'Chennai',
      source: 'Inbound Web',
      assignedRep: 'S. Ramanathan',
      stage: 'New',
      dealTitle: '',
      dealValue: '1200000',
    });
  };

  // Add note to selected contact
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContact || !noteInput.trim()) return;

    const newNote = {
      id: `NOTE-${Date.now()}`,
      author: 'Enterprise Rep',
      text: noteInput.trim(),
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    const updated = {
      ...selectedContact,
      notes: [newNote, ...selectedContact.notes],
    };

    setData((prev) => ({
      ...prev,
      contacts: prev.contacts.map((c) => (c.id === selectedContact.id ? updated : c)),
    }));

    setSelectedContact(updated);
    setNoteInput('');
  };

  // Add follow-up reminder
  const handleAddFollowup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContact || !followupTitle.trim()) return;

    const newFup = {
      id: `FUP-${Date.now()}`,
      title: followupTitle.trim(),
      dueDate: followupDate,
      priority: 'High' as const,
      status: 'Pending' as const,
    };

    const updated = {
      ...selectedContact,
      nextFollowUp: followupDate,
      followUps: [newFup, ...selectedContact.followUps],
    };

    setData((prev) => ({
      ...prev,
      contacts: prev.contacts.map((c) => (c.id === selectedContact.id ? updated : c)),
    }));

    setSelectedContact(updated);
    setFollowupTitle('');
  };

  return (
    <AppShell
      appName="ALS ClientFlow"
      appCategory="CRM & Sales Pipeline"
      appVersion="v2.4.0"
      navItems={NAV_ITEMS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onResetData={handleReset}
      primaryAction={{
        label: 'New Opportunity',
        onClick: () => setIsAddContactOpen(true),
        icon: Plus,
      }}
    >
      {/* TAB 1: EXECUTIVE OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EAEAEA] gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif text-black font-normal">
                Sales Pipeline &amp; Customer Relationship Overview
              </h1>
              <p className="text-xs text-[#777777] font-light mt-0.5">
                B2B deal pipeline velocity, qualification stages, and account engagements.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsAddContactOpen(true)}
              className="px-3.5 py-1.5 bg-black text-white hover:bg-neutral-800 text-xs font-serif uppercase tracking-wider font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus size={13} />
              <span>Add Opportunity</span>
            </button>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-[#EAEAEA] p-5 shadow-xs">
              <div className="text-xs font-mono text-[#777777] uppercase tracking-wider">
                Total Pipeline Value
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-normal text-black mt-2">
                ₹{totalPipelineValue.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-[#777777] mt-1 font-mono">
                {totalContacts} Total Client Accounts
              </div>
            </div>

            <div className="bg-white border border-[#EAEAEA] p-5 shadow-xs">
              <div className="text-xs font-mono text-[#777777] uppercase tracking-wider">
                Active Opportunity Volume
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-normal text-black mt-2">
                ₹{activePipelineValue.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-emerald-700 mt-1 font-mono font-medium">
                {activeOpportunities} Active deals in flight
              </div>
            </div>

            <div className="bg-white border border-[#EAEAEA] p-5 shadow-xs">
              <div className="text-xs font-mono text-[#777777] uppercase tracking-wider">
                Closed &amp; Won Revenue
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-normal text-black mt-2">
                ₹{wonDealValue.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-[#777777] mt-1 font-mono">
                {wonCount} Won Deals &middot; {conversionRate}% Win Rate
              </div>
            </div>

            <div className="bg-white border border-[#EAEAEA] p-5 shadow-xs">
              <div className="text-xs font-mono text-[#777777] uppercase tracking-wider">
                New Inbound Inquiries
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-normal text-black mt-2">
                {newLeadsCount} Leads
              </div>
              <div className="text-[11px] text-[#777777] mt-1 font-mono">
                {qualifiedCount} Qualified for Proposal
              </div>
            </div>
          </div>

          {/* Quick Grids: Follow-ups Schedule & Stage Funnel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Upcoming Follow-ups */}
            <div className="lg:col-span-6 bg-white border border-[#EAEAEA] p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <Calendar size={15} className="text-black" />
                  <h3 className="font-serif font-medium text-base text-black">
                    Scheduled Follow-ups &amp; Action Items
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#777777]">SLA: 24h</span>
              </div>

              <div className="divide-y divide-[#EAEAEA]">
                {data.contacts
                  .filter((c) => c.nextFollowUp)
                  .slice(0, 4)
                  .map((c) => (
                    <div key={c.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-serif font-medium text-black">
                          {c.company} &middot; {c.name}
                        </div>
                        <div className="text-[10px] text-[#777777] font-mono">
                          {c.dealTitle} &middot; Stage: {c.stage}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-medium text-black px-2 py-0.5 bg-[#FAFAFA] border border-[#EAEAEA]">
                          {c.nextFollowUp}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedContact(c);
                          }}
                          className="px-2 py-1 bg-black text-white hover:bg-neutral-800 text-[10px] font-mono uppercase"
                        >
                          Open
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Pipeline Stage Distribution Breakdown */}
            <div className="lg:col-span-6 bg-white border border-[#EAEAEA] p-5 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-medium text-base text-black border-b border-[#EAEAEA] pb-3 mb-4">
                  Pipeline Stage Breakdown
                </h3>
                <div className="space-y-3">
                  {STAGES.map((st) => {
                    const count = data.contacts.filter((c) => c.stage === st).length;
                    const val = data.contacts
                      .filter((c) => c.stage === st)
                      .reduce((sum, c) => sum + c.dealValue, 0);
                    const percent = Math.round((count / (totalContacts || 1)) * 100);

                    return (
                      <div key={st} className="text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-serif text-[#222222] font-medium">
                            {st} ({count} deals)
                          </span>
                          <span className="font-mono text-[#555555]">
                            ₹{(val / 100000).toFixed(1)}L ({percent}%)
                          </span>
                        </div>
                        <div className="w-full bg-[#EAEAEA] h-1.5">
                          <div
                            className={`h-1.5 ${
                              st === 'Won'
                                ? 'bg-black'
                                : st === 'Lost'
                                ? 'bg-neutral-400'
                                : 'bg-neutral-800'
                            }`}
                            style={{ width: `${Math.max(percent, 2)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#EAEAEA] flex justify-between text-[11px] font-mono text-[#777777]">
                <span>Total Account Touchpoints</span>
                <span className="text-black font-semibold">100% Pipeline Visibility</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DEAL PIPELINE BOARD */}
      {activeTab === 'pipeline' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EAEAEA] gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif text-black font-normal">
                Enterprise Opportunity Pipeline Board
              </h1>
              <p className="text-xs text-[#777777] font-light mt-0.5">
                Drag or advance deal stages with deterministic probability updates.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsAddContactOpen(true)}
              className="px-3.5 py-1.5 bg-black text-white hover:bg-neutral-800 text-xs font-serif uppercase tracking-wider font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus size={13} />
              <span>Add Opportunity</span>
            </button>
          </div>

          {/* Kanban Columns Horizontal Overflow */}
          <div className="flex gap-4 overflow-x-auto pb-4 items-start">
            {STAGES.map((stage) => {
              const stageDeals = data.contacts.filter((c) => c.stage === stage);
              const stageValue = stageDeals.reduce((sum, c) => sum + c.dealValue, 0);

              return (
                <div
                  key={stage}
                  className="w-72 shrink-0 bg-[#F2F2F2] border border-[#EAEAEA] p-3 flex flex-col max-h-[75vh]"
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between border-b border-[#DDD] pb-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-serif font-bold uppercase tracking-wider text-black">
                        {stage}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 bg-white text-black border border-[#DDD]">
                        {stageDeals.length}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#555]">
                      ₹{(stageValue / 100000).toFixed(1)}L
                    </span>
                  </div>

                  {/* Deals List */}
                  <div className="space-y-3 overflow-y-auto pr-1">
                    {stageDeals.map((deal) => {
                      const currentIdx = STAGES.indexOf(deal.stage);
                      const prevStage = currentIdx > 0 ? STAGES[currentIdx - 1] : null;
                      const nextStage = currentIdx < STAGES.length - 1 ? STAGES[currentIdx + 1] : null;

                      return (
                        <div
                          key={deal.id}
                          onClick={() => setSelectedContact(deal)}
                          className="bg-white border border-[#DDD] hover:border-black p-3.5 shadow-xs cursor-pointer transition-all"
                        >
                          <div className="flex items-start justify-between">
                            <span className="text-[9px] font-mono text-[#777777] uppercase">
                              {deal.id} &middot; {deal.city}
                            </span>
                            <span className="font-mono text-xs font-bold text-black">
                              ₹{(deal.dealValue / 100000).toFixed(2)}L
                            </span>
                          </div>

                          <h4 className="font-serif font-medium text-sm text-black mt-1 leading-snug">
                            {deal.dealTitle}
                          </h4>
                          <div className="text-xs text-[#555] mt-1 font-serif">
                            {deal.company} &middot; {deal.name}
                          </div>

                          <div className="mt-2.5 pt-2 border-t border-[#EAEAEA] flex items-center justify-between text-[10px] text-[#777777] font-mono">
                            <span>Rep: {deal.assignedRep.split(' ')[0]}</span>
                            <span>{deal.source}</span>
                          </div>

                          {/* Quick Stage Controls */}
                          <div
                            className="mt-3 pt-2 border-t border-[#EAEAEA] flex items-center justify-between gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {prevStage ? (
                              <button
                                type="button"
                                onClick={() => handleUpdateStage(deal.id, prevStage)}
                                className="px-2 py-0.5 border border-[#DDD] hover:border-black text-[9px] font-mono uppercase"
                                title={`Move back to ${prevStage}`}
                              >
                                &larr; {prevStage}
                              </button>
                            ) : <div />}

                            {nextStage && (
                              <button
                                type="button"
                                onClick={() => handleUpdateStage(deal.id, nextStage)}
                                className="px-2 py-0.5 bg-black text-white hover:bg-neutral-800 text-[9px] font-mono uppercase flex items-center gap-1"
                                title={`Advance to ${nextStage}`}
                              >
                                <span>{nextStage}</span>
                                <span>&rarr;</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {stageDeals.length === 0 && (
                      <div className="py-6 text-center text-[#888] text-xs font-serif italic border border-dashed border-[#DDD]">
                        No deals in this stage
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: CONTACT DIRECTORY */}
      {activeTab === 'contacts' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EAEAEA] gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif text-black font-normal">
                Account &amp; Stakeholder Directory
              </h1>
              <p className="text-xs text-[#777777] font-light mt-0.5">
                Complete corporate contacts with interaction history and engagement notes.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsAddContactOpen(true)}
              className="px-3.5 py-1.5 bg-black text-white hover:bg-neutral-800 text-xs font-serif uppercase tracking-wider font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus size={13} />
              <span>Add Stakeholder</span>
            </button>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 border border-[#EAEAEA]">
            <div className="relative flex-1 min-w-[240px]">
              <Search size={14} className="absolute left-2.5 top-2.5 text-[#777777]" />
              <input
                type="text"
                placeholder="Search by stakeholder name, company, city, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAFAFA] border border-[#EAEAEA] pl-8 pr-3 py-1.5 text-xs font-serif focus:outline-none focus:border-black"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono text-[#777777]">Stage:</span>
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="bg-[#FAFAFA] border border-[#EAEAEA] px-2 py-1 text-xs font-serif focus:outline-none focus:border-black"
              >
                <option value="ALL">All Stages</option>
                {STAGES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Contacts Table */}
          <div className="bg-white border border-[#EAEAEA] overflow-x-auto shadow-xs">
            <table className="w-full text-left text-xs font-serif">
              <thead className="bg-[#FAFAFA] border-b border-[#EAEAEA] text-[10px] font-mono uppercase tracking-wider text-[#777777]">
                <tr>
                  <th className="p-3">Stakeholder</th>
                  <th className="p-3">Enterprise Client</th>
                  <th className="p-3">Channel Source</th>
                  <th className="p-3">Assigned Lead</th>
                  <th className="p-3 text-right">Deal Value (INR)</th>
                  <th className="p-3">Stage</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA]">
                {data.contacts
                  .filter((c) => {
                    const matchesSearch =
                      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      c.city.toLowerCase().includes(searchQuery.toLowerCase());
                    const matchesStage = stageFilter === 'ALL' || c.stage === stageFilter;
                    return matchesSearch && matchesStage;
                  })
                  .map((contact) => (
                    <tr key={contact.id} className="hover:bg-[#FAFAFA] transition-colors">
                      <td className="p-3 font-medium text-black">
                        <div>{contact.name}</div>
                        <div className="text-[10px] text-[#777777] font-normal font-mono">
                          {contact.title} &middot; {contact.email}
                        </div>
                      </td>
                      <td className="p-3 font-medium text-black">
                        <div>{contact.company}</div>
                        <div className="text-[10px] text-[#777777] font-normal">{contact.city}</div>
                      </td>
                      <td className="p-3 text-[#555]">{contact.source}</td>
                      <td className="p-3 text-[#555]">{contact.assignedRep}</td>
                      <td className="p-3 text-right font-mono font-medium text-black">
                        ₹{contact.dealValue.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-block px-2 py-0.5 text-[9px] uppercase font-mono border ${
                            contact.stage === 'Won'
                              ? 'bg-black text-white border-black'
                              : contact.stage === 'Lost'
                              ? 'bg-neutral-800 text-white border-neutral-800'
                              : 'bg-white text-black border-black font-semibold'
                          }`}
                        >
                          {contact.stage}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedContact(contact)}
                          className="px-2.5 py-1 border border-[#EAEAEA] hover:border-black text-[10px] font-mono uppercase cursor-pointer"
                        >
                          Open Profile
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: SALES VELOCITY & ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EAEAEA] gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif text-black font-normal">
                Sales Velocity, Lead Attribution &amp; Conversion Analytics
              </h1>
              <p className="text-xs text-[#777777] font-light mt-0.5">
                Deterministic attribution metrics derived from active CRM contact records.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: Opportunity Value by Stage */}
            <div className="bg-white border border-[#EAEAEA] p-5 shadow-xs">
              <h3 className="font-serif font-medium text-base text-black border-b border-[#EAEAEA] pb-3 mb-4">
                Deal Capital by Funnel Stage (INR Lakhs)
              </h3>
              <div className="space-y-3">
                {STAGES.map((s) => {
                  const val = data.contacts
                    .filter((c) => c.stage === s)
                    .reduce((sum, c) => sum + c.dealValue, 0);
                  const lakhs = (val / 100000).toFixed(1);
                  const maxLakhs = Math.max(
                    1,
                    ...STAGES.map((st) =>
                      data.contacts
                        .filter((c) => c.stage === st)
                        .reduce((sum, c) => sum + c.dealValue, 0) / 100000
                    )
                  );
                  const widthPercent = Math.round(((val / 100000) / maxLakhs) * 100);

                  return (
                    <div key={s} className="text-xs">
                      <div className="flex justify-between mb-1 font-mono">
                        <span className="font-serif font-medium text-black">{s}</span>
                        <span className="text-[#555]">₹{lakhs} Lakhs</span>
                      </div>
                      <div className="w-full bg-[#EAEAEA] h-2">
                        <div className="bg-black h-2 transition-all duration-300" style={{ width: `${widthPercent}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chart 2: Attribution by Channel Source */}
            <div className="bg-white border border-[#EAEAEA] p-5 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-medium text-base text-black border-b border-[#EAEAEA] pb-3 mb-4">
                  Lead Channel Attribution
                </h3>
                <div className="space-y-3">
                  {(['Referral', 'Inbound Web', 'Conference', 'Direct Outreach', 'Partner Network'] as const).map(
                    (src) => {
                      const count = data.contacts.filter((c) => c.source === src).length;
                      const percent = Math.round((count / (totalContacts || 1)) * 100);
                      return (
                        <div key={src} className="text-xs">
                          <div className="flex justify-between mb-1">
                            <span className="font-serif text-black">{src}</span>
                            <span className="font-mono text-[#555]">
                              {count} contacts ({percent}%)
                            </span>
                          </div>
                          <div className="w-full bg-[#EAEAEA] h-2">
                            <div className="bg-neutral-800 h-2" style={{ width: `${percent}%` }} />
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-[#EAEAEA] text-[11px] font-mono text-[#777777] flex justify-between">
                <span>Enterprise Win Rate: {conversionRate}%</span>
                <span className="text-black font-semibold">Average Sales Cycle: 24 Days</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD CONTACT OPPORTUNITY */}
      {isAddContactOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EAEAEA] max-w-lg w-full p-6 shadow-2xl text-black font-serif">
            <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3 mb-4">
              <h3 className="text-xl font-normal">Add Opportunity / Client Stakeholder</h3>
              <button
                type="button"
                onClick={() => setIsAddContactOpen(false)}
                className="p-1 hover:bg-[#EAEAEA]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddContact} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    Stakeholder Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand R."
                    value={newContactForm.name}
                    onChange={(e) =>
                      setNewContactForm({ ...newContactForm, name: e.target.value })
                    }
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    Designation / Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. VP Operations"
                    value={newContactForm.title}
                    onChange={(e) =>
                      setNewContactForm({ ...newContactForm, title: e.target.value })
                    }
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    Enterprise Organization *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Coromandel Logistics Ltd"
                    value={newContactForm.company}
                    onChange={(e) =>
                      setNewContactForm({ ...newContactForm, company: e.target.value })
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
                    value={newContactForm.city}
                    onChange={(e) =>
                      setNewContactForm({ ...newContactForm, city: e.target.value })
                    }
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
                    placeholder="name@company.in"
                    value={newContactForm.email}
                    onChange={(e) =>
                      setNewContactForm({ ...newContactForm, email: e.target.value })
                    }
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
                    value={newContactForm.phone}
                    onChange={(e) =>
                      setNewContactForm({ ...newContactForm, phone: e.target.value })
                    }
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    Deal Value (INR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newContactForm.dealValue}
                    onChange={(e) =>
                      setNewContactForm({ ...newContactForm, dealValue: e.target.value })
                    }
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs font-mono focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                    Pipeline Stage
                  </label>
                  <select
                    value={newContactForm.stage}
                    onChange={(e) =>
                      setNewContactForm({
                        ...newContactForm,
                        stage: e.target.value as LeadStage,
                      })
                    }
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                  >
                    {STAGES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-[#777777] mb-1">
                  Opportunity Title / Scope
                </label>
                <input
                  type="text"
                  placeholder="e.g. Fleet Gate Dispatch Architecture Implementation"
                  value={newContactForm.dealTitle}
                  onChange={(e) =>
                    setNewContactForm({ ...newContactForm, dealTitle: e.target.value })
                  }
                  className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-2 text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#EAEAEA]">
                <button
                  type="button"
                  onClick={() => setIsAddContactOpen(false)}
                  className="px-4 py-2 border border-[#EAEAEA] hover:border-black text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white hover:bg-neutral-800 text-xs uppercase font-medium"
                >
                  Save Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAIL DRAWER / MODAL: CONTACT PROFILE & NOTES */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-end">
          <div className="bg-white border-l border-[#EAEAEA] max-w-xl w-full h-full p-6 sm:p-8 shadow-2xl text-black font-serif flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-start justify-between border-b border-[#EAEAEA] pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono text-[#777777] uppercase tracking-widest">
                    STAKEHOLDER PROFILE &middot; {selectedContact.id}
                  </span>
                  <h3 className="text-2xl font-serif font-normal text-black mt-1">
                    {selectedContact.name}
                  </h3>
                  <div className="text-xs text-[#555] font-serif">
                    {selectedContact.title} &middot; {selectedContact.company}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedContact(null)}
                  className="p-1 hover:bg-[#EAEAEA]"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Contact Meta Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-[#FAFAFA] border border-[#EAEAEA] text-xs mb-6">
                <div>
                  <span className="text-[10px] text-[#777777] uppercase font-mono block">Email:</span>
                  <span className="font-mono text-black">{selectedContact.email}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#777777] uppercase font-mono block">Phone:</span>
                  <span className="font-mono text-black">{selectedContact.phone}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#777777] uppercase font-mono block">Deal Value:</span>
                  <span className="font-mono font-bold text-black">
                    ₹{selectedContact.dealValue.toLocaleString('en-IN')}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#777777] uppercase font-mono block">Stage:</span>
                  <select
                    value={selectedContact.stage}
                    onChange={(e) =>
                      handleUpdateStage(selectedContact.id, e.target.value as LeadStage)
                    }
                    className="font-mono uppercase text-[11px] bg-white border border-[#CCC] px-1 py-0.5"
                  >
                    {STAGES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Scheduled Follow-ups */}
              <div className="mb-6">
                <h4 className="text-xs uppercase font-mono text-[#777777] tracking-wider mb-2 font-semibold">
                  Scheduled Follow-up Reminders
                </h4>
                {selectedContact.followUps.length > 0 ? (
                  <div className="space-y-2 mb-3">
                    {selectedContact.followUps.map((fup) => (
                      <div
                        key={fup.id}
                        className="p-2.5 bg-white border border-[#EAEAEA] flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-serif font-medium text-black">{fup.title}</div>
                          <div className="text-[10px] font-mono text-[#777777]">
                            Due: {fup.dueDate} &middot; Priority: {fup.priority}
                          </div>
                        </div>
                        <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 bg-neutral-100 border">
                          {fup.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-[#777777] italic mb-3">
                    No active follow-up scheduled.
                  </div>
                )}

                {/* Add Followup Form */}
                <form onSubmit={handleAddFollowup} className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Add follow-up action..."
                    value={followupTitle}
                    onChange={(e) => setFollowupTitle(e.target.value)}
                    className="flex-1 bg-[#FAFAFA] border border-[#EAEAEA] px-2.5 py-1 text-xs font-serif focus:outline-none focus:border-black"
                  />
                  <input
                    type="date"
                    required
                    value={followupDate}
                    onChange={(e) => setFollowupDate(e.target.value)}
                    className="bg-[#FAFAFA] border border-[#EAEAEA] px-2 py-1 text-xs font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 bg-black text-white hover:bg-neutral-800 text-[10px] uppercase font-mono"
                  >
                    Add
                  </button>
                </form>
              </div>

              {/* Notes Timeline */}
              <div>
                <h4 className="text-xs uppercase font-mono text-[#777777] tracking-wider mb-2 font-semibold">
                  Engagement Notes &amp; Activity Log
                </h4>
                <div className="space-y-2.5 mb-4 max-h-56 overflow-y-auto">
                  {selectedContact.notes.map((note) => (
                    <div key={note.id} className="p-3 bg-[#FAFAFA] border border-[#EAEAEA] text-xs">
                      <div className="flex items-center justify-between text-[10px] text-[#777777] font-mono mb-1">
                        <span>{note.author}</span>
                        <span>{note.timestamp}</span>
                      </div>
                      <p className="font-serif text-[#111] leading-relaxed">{note.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddNote} className="space-y-2">
                  <textarea
                    rows={2}
                    required
                    placeholder="Log client phone conversation, requirement update, or meeting summary..."
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-[#EAEAEA] p-2 text-xs font-serif focus:outline-none focus:border-black"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-black text-white hover:bg-neutral-800 text-xs font-mono uppercase"
                    >
                      Log Note
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EAEAEA] flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedContact(null)}
                className="px-4 py-2 border border-[#EAEAEA] hover:border-black text-xs uppercase"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
};
