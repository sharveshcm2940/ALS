import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  Check,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { fadeInUpVariants, lineExpandVariants, EASINGS } from './animations/motionVariants';

export interface CommercialProduct {
  id: string;
  number: string;
  name: string;
  route: string;
  category: string;
  tagline: string;
  description: string;
  highlights: string[];
  techStack: string[];
}

export const COMMERCIAL_PRODUCTS: CommercialProduct[] = [
  {
    id: 'business-management',
    number: '01',
    name: 'ALS Business Suite',
    route: '/projects/business-management',
    category: 'Business Operations & ERP',
    tagline: 'Financial accounting, billing management, and operational balance sheet',
    description:
      'Engineered for Indian mid-market enterprises requiring complete visibility across sales receipts, operating expenditures, GST-compliant invoicing, and receivables aging.',
    highlights: [
      'Real-time cash flow and operating burn visualizer',
      'GSTIN tax invoice generation with settlement tracking',
      'Client accounts directory with receivables aging',
    ],
    techStack: ['React 19', 'TypeScript', 'Deterministic Ledger', 'GST Compliance'],
  },
  {
    id: 'inventory-management',
    number: '02',
    name: 'ALS Inventory Control',
    route: '/projects/inventory-management',
    category: 'Warehouse & Stock Logistics',
    tagline: 'Multi-warehouse stock tracking, SKU cataloging, and PO fulfillment',
    description:
      'A dedicated supply-chain hub providing live product catalog management across Peenya and Guindy depots, automatic reorder threshold warnings, and purchase order receiving.',
    highlights: [
      'Product SKU catalog with duplicate code prevention',
      'Immutable stock movement ledger with zero-negative rules',
      'Vendor purchase order tracking with dock receiving',
    ],
    techStack: ['React 19', 'TypeScript', 'FIFO Ledger', 'Barcode Sync'],
  },
  {
    id: 'crm',
    number: '03',
    name: 'ALS ClientFlow',
    route: '/projects/crm',
    category: 'Enterprise Sales & CRM',
    tagline: 'B2B relationship management, sales velocity, and account intelligence',
    description:
      'Designed around high-value enterprise accounts. Features an interactive 7-stage Kanban pipeline, stakeholder profiles, client engagement timelines, and deal attribution analytics.',
    highlights: [
      'Interactive 7-stage Kanban pipeline with live valuation',
      'Stakeholder timeline with historical notes and logs',
      'Lead source attribution and conversion reporting',
    ],
    techStack: ['React 19', 'TypeScript', 'Kanban Engine', 'Telemetry'],
  },
  {
    id: 'project-management',
    number: '04',
    name: 'ALS Project Desk',
    route: '/projects/project-management',
    category: 'Workspace & Delivery',
    tagline: 'Engineering delivery workspace, agile task Kanban, and milestone gates',
    description:
      'Purpose-built for engineering teams in Chennai and Bangalore delivering complex custom software. Combines project directories, 4-lane Kanban boards, and milestone verification.',
    highlights: [
      'Project engagement directory with budget tracking',
      'Interactive 4-lane task execution board',
      'Dynamic progress calculated from live completed tasks',
    ],
    techStack: ['React 19', 'TypeScript', 'Agile Calculus', 'Milestones'],
  },
];

interface SelectedWorkSectionProps {
  onDiscussSimilarProject: (projectTitle: string) => void;
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({
  onDiscussSimilarProject,
}) => {
  // Interactive micro-states for live previews
  const [businessRevenue, setBusinessRevenue] = useState(14850000);
  const [reconciledInvoice, setReconciledInvoice] = useState(false);

  const [inventoryCount, setInventoryCount] = useState(2400);
  const [hasReceivedShipment, setHasReceivedShipment] = useState(false);

  const [crmStage, setCrmStage] = useState<'Proposal' | 'Negotiation' | 'Won'>('Proposal');
  const [crmValuation, setCrmValuation] = useState(38200000);

  const [taskStatus, setTaskStatus] = useState<'In Progress' | 'Review' | 'Completed'>('In Progress');

  const handleReconcileDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!reconciledInvoice) {
      setReconciledInvoice(true);
      setBusinessRevenue((prev) => prev + 890000);
    } else {
      setReconciledInvoice(false);
      setBusinessRevenue((prev) => prev - 890000);
    }
  };

  const handleShipmentDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!hasReceivedShipment) {
      setHasReceivedShipment(true);
      setInventoryCount((prev) => prev + 500);
    } else {
      setHasReceivedShipment(false);
      setInventoryCount((prev) => prev - 500);
    }
  };

  const handleCrmDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (crmStage === 'Proposal') {
      setCrmStage('Negotiation');
    } else if (crmStage === 'Negotiation') {
      setCrmStage('Won');
      setCrmValuation((prev) => prev + 6500000);
    } else {
      setCrmStage('Proposal');
      setCrmValuation(38200000);
    }
  };

  const handleTaskDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (taskStatus === 'In Progress') {
      setTaskStatus('Review');
    } else if (taskStatus === 'Review') {
      setTaskStatus('Completed');
    } else {
      setTaskStatus('In Progress');
    }
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="bg-white text-black py-32 sm:py-40 lg:py-48 px-6 sm:px-8 lg:px-12 border-b border-[#EAEAEA] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Animated Line */}
        <div className="relative pb-10 mb-20 sm:mb-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.1}
            >
              <span className="text-xs font-serif tracking-[0.3em] uppercase text-[#777777] block mb-4">
                04 / INTERACTIVE SOFTWARE PRODUCTS
              </span>
              <h2
                id="projects-heading"
                className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal tracking-tight text-black max-w-2xl"
              >
                Enterprise software. Built to operate.
              </h2>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.2}
              className="mt-6 md:mt-0 max-w-md"
            >
              <p className="text-base sm:text-lg text-[#666666] font-light leading-relaxed">
                Explore four commercial software applications built with ALS Infonet architectural
                discipline. Each demonstration features live controls, data persistence, and working workflows.
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={lineExpandVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0.25}
            className="absolute bottom-0 left-0 right-0 h-px bg-[#EAEAEA]"
          />
        </div>

        {/* Spacious Alternating Projects Layout with Animatic Living Previews */}
        <div className="space-y-28 sm:space-y-36 lg:space-y-44">
          {COMMERCIAL_PRODUCTS.map((product, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <motion.article
                key={product.id}
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                custom={0.1}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
              >
                {/* Text Content Column */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="font-mono text-xs uppercase tracking-widest text-[#888888]">
                    {product.number} &middot; {product.category}
                  </div>

                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-black leading-tight">
                    {product.name}
                  </h3>

                  <div className="text-[11px] uppercase tracking-[0.14em] text-[#777777] font-sans font-medium">
                    {product.tagline}
                  </div>

                  <p className="text-base text-[#555555] font-light leading-relaxed pt-2">
                    {product.description}
                  </p>

                  {/* Highlights list */}
                  <ul className="space-y-2.5 pt-4 border-t border-[#EAEAEA]">
                    {product.highlights.map((highlight, hIdx) => (
                      <li
                        key={hIdx}
                        className="text-xs sm:text-sm text-[#333333] font-sans font-light flex items-start gap-3"
                      >
                        <Check size={14} className="text-black shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {product.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 text-[11px] font-mono text-[#666666] border border-[#EAEAEA]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Group */}
                  <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <Link
                      to={product.route}
                      className="px-6 py-3.5 bg-black text-white hover:bg-neutral-800 text-xs uppercase tracking-[0.16em] font-sans font-medium inline-flex items-center justify-center gap-2.5 transition-colors cursor-pointer group"
                    >
                      <Play size={12} className="fill-white" />
                      <span>Explore Demo</span>
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>

                    <button
                      type="button"
                      onClick={() => onDiscussSimilarProject(product.name)}
                      className="text-xs uppercase tracking-[0.14em] font-sans font-medium text-[#777777] hover:text-black transition-colors py-2 text-center cursor-pointer"
                    >
                      Inquire About Customization
                    </button>
                  </div>
                </div>

                {/* Living Animatic Dashboard Preview Column */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <motion.div
                    whileHover={{ y: -4, transition: { duration: 0.25, ease: EASINGS.smoothOut } }}
                    className="border border-[#EAEAEA] hover:border-black bg-[#FAFAFA] p-6 sm:p-8 transition-colors duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.03)] relative group"
                  >
                    {/* Mockup Window Header */}
                    <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-4 mb-6">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-black" />
                        <span className="font-mono text-xs uppercase tracking-wider text-[#333333] font-medium ml-2">
                          {product.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-[#888888] uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Interactive Prototype Active</span>
                      </div>
                    </div>

                    {/* Render Specific Living Interactive Preview */}
                    {product.id === 'business-management' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-white p-4 border border-[#EAEAEA]">
                            <div className="text-[10px] font-mono uppercase text-[#777777]">Revenue (Paid)</div>
                            <motion.div
                              key={businessRevenue}
                              initial={{ scale: 1.05 }}
                              animate={{ scale: 1 }}
                              className="text-lg sm:text-xl font-serif text-black mt-1"
                            >
                              ₹{businessRevenue.toLocaleString('en-IN')}
                            </motion.div>
                          </div>
                          <div className="bg-white p-4 border border-[#EAEAEA]">
                            <div className="text-[10px] font-mono uppercase text-[#777777]">Net Profit</div>
                            <div className="text-lg sm:text-xl font-serif text-black mt-1">₹64,20,000</div>
                          </div>
                          <div className="bg-white p-4 border border-[#EAEAEA]">
                            <div className="text-[10px] font-mono uppercase text-[#777777]">Receivables</div>
                            <div className="text-lg sm:text-xl font-serif text-black mt-1">₹34,80,000</div>
                          </div>
                        </div>

                        <div className="bg-white border border-[#EAEAEA] p-4 text-xs font-serif">
                          <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-2 mb-3">
                            <span className="font-mono text-[10px] uppercase text-[#777777]">
                              Live Transaction Ledger
                            </span>
                            <button
                              type="button"
                              onClick={handleReconcileDemo}
                              className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border border-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                            >
                              {reconciledInvoice ? 'Revert Simulation' : 'Click to Reconcile Invoice'}
                            </button>
                          </div>
                          <div className="divide-y divide-[#F0F0F0]">
                            <div className="py-2.5 flex justify-between items-center">
                              <div>
                                <span className="font-medium text-black">TVS Supply Chain Logistics</span>
                                <span className="text-[11px] text-[#888888] ml-2 font-mono">INV-8492</span>
                              </div>
                              <span className="font-mono text-emerald-700 font-medium">₹18,50,000 &middot; Paid</span>
                            </div>
                            <div className="py-2.5 flex justify-between items-center">
                              <div>
                                <span className="font-medium text-black">Ather Energy Infrastructure</span>
                                <span className="text-[11px] text-[#888888] ml-2 font-mono">INV-8493</span>
                              </div>
                              <span className="font-mono text-emerald-700 font-medium">₹12,40,000 &middot; Paid</span>
                            </div>
                            <motion.div
                              animate={{ backgroundColor: reconciledInvoice ? '#f0fdf4' : '#ffffff' }}
                              className="py-2.5 px-2 flex justify-between items-center rounded-xs transition-colors"
                            >
                              <div>
                                <span className="font-medium text-black">Titan Precision Parts</span>
                                <span className="text-[11px] text-[#888888] ml-2 font-mono">INV-8494</span>
                              </div>
                              <span className={`font-mono font-medium ${reconciledInvoice ? 'text-emerald-700' : 'text-amber-700'}`}>
                                ₹8,90,000 &middot; {reconciledInvoice ? 'Reconciled & Paid' : 'Pending Settlement'}
                              </span>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    )}

                    {product.id === 'inventory-management' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-white p-4 border border-[#EAEAEA]">
                            <div className="text-[10px] font-mono uppercase text-[#777777]">Warehouse SKU Total</div>
                            <motion.div
                              key={inventoryCount}
                              initial={{ scale: 1.05 }}
                              animate={{ scale: 1 }}
                              className="text-lg sm:text-xl font-serif text-black mt-1"
                            >
                              {inventoryCount.toLocaleString()} Units
                            </motion.div>
                          </div>
                          <div className="bg-white p-4 border border-[#EAEAEA]">
                            <div className="text-[10px] font-mono uppercase text-[#777777]">Accuracy Rate</div>
                            <div className="text-lg sm:text-xl font-serif text-black mt-1">99.98%</div>
                          </div>
                          <div className="bg-white p-4 border border-[#EAEAEA]">
                            <div className="text-[10px] font-mono uppercase text-[#777777]">Stock Valuation</div>
                            <div className="text-lg sm:text-xl font-serif text-black mt-1">₹4.28 Cr</div>
                          </div>
                        </div>

                        <div className="bg-white border border-[#EAEAEA] p-4 text-xs font-serif">
                          <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-2 mb-3">
                            <span className="font-mono text-[10px] uppercase text-[#777777]">
                              Peenya Hub Real-time Stock
                            </span>
                            <button
                              type="button"
                              onClick={handleShipmentDemo}
                              className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border border-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                            >
                              {hasReceivedShipment ? 'Revert Dock Docking' : 'Click to Dock Inbound PO (+500)'}
                            </button>
                          </div>
                          <div className="divide-y divide-[#F0F0F0]">
                            <motion.div
                              animate={{ backgroundColor: hasReceivedShipment ? '#f0fdf4' : '#ffffff' }}
                              className="py-2.5 px-2 flex justify-between items-center rounded-xs transition-colors"
                            >
                              <div>
                                <span className="font-medium text-black">STM32 Microcontroller Unit</span>
                                <span className="text-[11px] text-[#888888] ml-2 font-mono">SKU-MCU-01</span>
                              </div>
                              <span className="font-mono text-black font-medium">{inventoryCount} in Stock</span>
                            </motion.div>
                            <div className="py-2.5 flex justify-between items-center">
                              <div>
                                <span className="font-medium text-black">Aerospace Aluminum Billet</span>
                                <span className="text-[11px] text-[#888888] ml-2 font-mono">SKU-ALU-08</span>
                              </div>
                              <span className="font-mono text-black font-medium">450 in Stock</span>
                            </div>
                            <div className="py-2.5 flex justify-between items-center">
                              <div>
                                <span className="font-medium text-black">Industrial DIN Rail Connector</span>
                                <span className="text-[11px] text-[#888888] ml-2 font-mono">SKU-DIN-42</span>
                              </div>
                              <span className="font-mono text-emerald-700 font-medium">Optimal Level</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {product.id === 'crm' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-white p-4 border border-[#EAEAEA]">
                            <div className="text-[10px] font-mono uppercase text-[#777777]">Pipeline Value</div>
                            <motion.div
                              key={crmValuation}
                              initial={{ scale: 1.05 }}
                              animate={{ scale: 1 }}
                              className="text-lg sm:text-xl font-serif text-black mt-1"
                            >
                              ₹{(crmValuation / 10000000).toFixed(2)} Cr
                            </motion.div>
                          </div>
                          <div className="bg-white p-4 border border-[#EAEAEA]">
                            <div className="text-[10px] font-mono uppercase text-[#777777]">Win Rate</div>
                            <div className="text-lg sm:text-xl font-serif text-black mt-1">74.2%</div>
                          </div>
                          <div className="bg-white p-4 border border-[#EAEAEA]">
                            <div className="text-[10px] font-mono uppercase text-[#777777]">Accounts</div>
                            <div className="text-lg sm:text-xl font-serif text-black mt-1">42 Enterprise</div>
                          </div>
                        </div>

                        <div className="bg-white border border-[#EAEAEA] p-4 text-xs font-serif">
                          <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-2 mb-3">
                            <span className="font-mono text-[10px] uppercase text-[#777777]">
                              Active Deal Pipeline Progression
                            </span>
                            <button
                              type="button"
                              onClick={handleCrmDemo}
                              className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border border-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                            >
                              Advance Deal &rarr; ({crmStage})
                            </button>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="p-2.5 bg-[#FAFAFA] border border-[#EAEAEA]">
                              <div className="text-[9px] font-mono uppercase text-[#777777]">Qualified</div>
                              <div className="font-medium text-black text-xs mt-1">TVS Logistics</div>
                              <div className="text-[10px] font-mono text-[#555555]">₹24.0 Lakhs</div>
                            </div>
                            <div className={`p-2.5 border transition-colors ${crmStage === 'Proposal' ? 'border-black bg-white shadow-xs' : 'border-[#EAEAEA] bg-[#FAFAFA]'}`}>
                              <div className="text-[9px] font-mono uppercase text-[#777777]">Proposal</div>
                              <div className="font-medium text-black text-xs mt-1">Ather Fleet</div>
                              <div className="text-[10px] font-mono text-[#555555]">₹42.0 Lakhs</div>
                            </div>
                            <motion.div
                              animate={{
                                backgroundColor: crmStage === 'Won' ? '#f0fdf4' : crmStage === 'Negotiation' ? '#ffffff' : '#fafafa',
                                borderColor: crmStage === 'Won' || crmStage === 'Negotiation' ? '#000000' : '#eaeaea',
                              }}
                              className="p-2.5 border transition-colors"
                            >
                              <div className="text-[9px] font-mono uppercase text-[#777777]">
                                {crmStage === 'Won' ? 'Closed Won' : 'Negotiation'}
                              </div>
                              <div className="font-medium text-black text-xs mt-1">Titan Precision</div>
                              <div className="text-[10px] font-mono font-bold text-black">
                                {crmStage === 'Won' ? 'Won · ₹65.0L' : '₹65.0 Lakhs'}
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    )}

                    {product.id === 'project-management' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-white p-4 border border-[#EAEAEA]">
                            <div className="text-[10px] font-mono uppercase text-[#777777]">Sprint Velocity</div>
                            <div className="text-lg sm:text-xl font-serif text-black mt-1">38 Points</div>
                          </div>
                          <div className="bg-white p-4 border border-[#EAEAEA]">
                            <div className="text-[10px] font-mono uppercase text-[#777777]">Active Sprint</div>
                            <div className="text-lg sm:text-xl font-serif text-black mt-1">Sprint 14</div>
                          </div>
                          <div className="bg-white p-4 border border-[#EAEAEA]">
                            <div className="text-[10px] font-mono uppercase text-[#777777]">On-Time SLA</div>
                            <div className="text-lg sm:text-xl font-serif text-black mt-1">98.5%</div>
                          </div>
                        </div>

                        <div className="bg-white border border-[#EAEAEA] p-4 text-xs font-serif">
                          <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-2 mb-3">
                            <span className="font-mono text-[10px] uppercase text-[#777777]">
                              Agile Task Execution Board
                            </span>
                            <button
                              type="button"
                              onClick={handleTaskDemo}
                              className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border border-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                            >
                              Advance Task &rarr; ({taskStatus})
                            </button>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <motion.div
                              animate={{
                                opacity: taskStatus === 'In Progress' ? 1 : 0.6,
                                borderColor: taskStatus === 'In Progress' ? '#000000' : '#eaeaea',
                              }}
                              className="p-2.5 bg-white border"
                            >
                              <div className="text-[9px] font-mono uppercase text-[#777777]">In Progress</div>
                              <div className="font-medium text-black text-xs mt-1">Database Sharding</div>
                              <div className="text-[10px] font-mono text-[#555555]">Critical &middot; 8 pts</div>
                            </motion.div>
                            <motion.div
                              animate={{
                                opacity: taskStatus === 'Review' ? 1 : 0.6,
                                borderColor: taskStatus === 'Review' ? '#000000' : '#eaeaea',
                              }}
                              className="p-2.5 bg-white border"
                            >
                              <div className="text-[9px] font-mono uppercase text-[#777777]">In Review</div>
                              <div className="font-medium text-black text-xs mt-1">WAI-ARIA Audit</div>
                              <div className="text-[10px] font-mono text-[#555555]">High &middot; 5 pts</div>
                            </motion.div>
                            <motion.div
                              animate={{
                                opacity: taskStatus === 'Completed' ? 1 : 0.6,
                                backgroundColor: taskStatus === 'Completed' ? '#f0fdf4' : '#ffffff',
                                borderColor: taskStatus === 'Completed' ? '#000000' : '#eaeaea',
                              }}
                              className="p-2.5 border"
                            >
                              <div className="text-[9px] font-mono uppercase text-[#777777]">Completed</div>
                              <div className="font-medium text-black text-xs mt-1">Barcode Sync</div>
                              <div className="text-[10px] font-mono text-emerald-700">Verified &middot; 13 pts</div>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bottom Launch Banner */}
                    <div className="mt-4 pt-3 border-t border-[#EAEAEA] flex items-center justify-between text-xs font-serif">
                      <span className="text-[#777777] font-light">
                        Click below to launch full standalone console
                      </span>
                      <Link
                        to={product.route}
                        className="text-black font-medium hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Open Full Screen Application</span>
                        <ArrowUpRight size={13} />
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
