import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Download,
  ShieldCheck,
  Filter,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { EASINGS } from '../animations/motionVariants';

interface SettlementItem {
  id: string;
  sourceGateway: 'Razorpay' | 'Stripe' | 'NEFT Direct' | 'RTGS Wire';
  merchantAccount: string;
  gatewayAmount: number;
  ledgerAmount: number;
  feeMdr: number;
  variance: number;
  status: 'Matched' | 'Discrepancy (Fee)' | 'Unsettled' | 'Resolved';
  timestamp: string;
  hash: string;
}

export const ReconciliationEngineShowcase: React.FC = () => {
  const initialRecords: SettlementItem[] = [
    {
      id: 'TXN-90421',
      sourceGateway: 'Razorpay',
      merchantAccount: 'ACC-CHENNAI-01',
      gatewayAmount: 142500,
      ledgerAmount: 142500,
      feeMdr: 2850,
      variance: 0,
      status: 'Matched',
      timestamp: '10:42:15 IST',
      hash: 'sha256-e419b...09a1',
    },
    {
      id: 'TXN-90422',
      sourceGateway: 'Stripe',
      merchantAccount: 'ACC-BLR-04',
      gatewayAmount: 89400,
      ledgerAmount: 89400,
      feeMdr: 1788,
      variance: 0,
      status: 'Matched',
      timestamp: '10:44:02 IST',
      hash: 'sha256-78fa2...c319',
    },
    {
      id: 'TXN-90423',
      sourceGateway: 'NEFT Direct',
      merchantAccount: 'ACC-CHENNAI-03',
      gatewayAmount: 310500,
      ledgerAmount: 310450,
      feeMdr: 45,
      variance: 50,
      status: 'Discrepancy (Fee)',
      timestamp: '10:47:30 IST',
      hash: 'sha256-42d81...8bb3',
    },
    {
      id: 'TXN-90424',
      sourceGateway: 'RTGS Wire',
      merchantAccount: 'ACC-BLR-02',
      gatewayAmount: 1250000,
      ledgerAmount: 1250000,
      feeMdr: 120,
      variance: 0,
      status: 'Matched',
      timestamp: '10:50:11 IST',
      hash: 'sha256-c901e...442d',
    },
    {
      id: 'TXN-90425',
      sourceGateway: 'Razorpay',
      merchantAccount: 'ACC-HYD-01',
      gatewayAmount: 48200,
      ledgerAmount: 48200,
      feeMdr: 964,
      variance: 0,
      status: 'Matched',
      timestamp: '10:52:45 IST',
      hash: 'sha256-11da9...77e8',
    },
    {
      id: 'TXN-90426',
      sourceGateway: 'Stripe',
      merchantAccount: 'ACC-CHENNAI-01',
      gatewayAmount: 76000,
      ledgerAmount: 75920,
      feeMdr: 1520,
      variance: 80,
      status: 'Discrepancy (Fee)',
      timestamp: '10:54:19 IST',
      hash: 'sha256-33bb0...f91a',
    },
  ];

  const [records, setRecords] = useState<SettlementItem[]>(initialRecords);
  const [selectedRecordId, setSelectedRecordId] = useState<string>('TXN-90423');
  const [isReconciling, setIsReconciling] = useState(false);
  const [filterMode, setFilterMode] = useState<'all' | 'discrepancy' | 'matched'>('all');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const selectedRecord = records.find((r) => r.id === selectedRecordId) || records[0];

  const filteredRecords = records.filter((r) => {
    if (filterMode === 'discrepancy') return r.status.includes('Discrepancy');
    if (filterMode === 'matched') return r.status === 'Matched' || r.status === 'Resolved';
    return true;
  });

  const totalVolume = records.reduce((acc, curr) => acc + curr.gatewayAmount, 0);
  const matchedVolume = records
    .filter((r) => r.status === 'Matched' || r.status === 'Resolved')
    .reduce((acc, curr) => acc + curr.gatewayAmount, 0);
  const discrepancyCount = records.filter((r) => r.status.includes('Discrepancy')).length;

  const handleRunBatchEngine = () => {
    setIsReconciling(true);
    setTimeout(() => {
      setRecords((prev) =>
        prev.map((r) => {
          if (r.id === 'TXN-90423') {
            return {
              ...r,
              status: 'Resolved',
              variance: 0,
              ledgerAmount: r.gatewayAmount,
            };
          }
          return r;
        })
      );
      setIsReconciling(false);
    }, 1200);
  };

  const handleResolveVariance = (id: string) => {
    setRecords((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return {
            ...r,
            status: 'Resolved',
            variance: 0,
            ledgerAmount: r.gatewayAmount,
          };
        }
        return r;
      })
    );
  };

  const handleExportAuditProof = () => {
    setExportNotice('Cryptographic Audit Certificate (SHA-256) exported to ledger archive.');
    setTimeout(() => setExportNotice(null), 3000);
  };

  return (
    <div className="border border-[#EAEAEA] bg-white text-black text-xs font-serif shadow-xs">
      {/* Top Console Bar */}
      <div className="bg-black text-white px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileSpreadsheet size={15} className="text-white" />
          <span className="font-serif tracking-[0.2em] uppercase font-medium">
            Financial Settlement &amp; Audit Engine · Deterministic Reconciliation
          </span>
        </div>
        <div className="flex items-center gap-4 text-[10px] tracking-widest uppercase text-neutral-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Core Ingestion: 42.4s Runtime
          </span>
          <span className="hidden sm:inline">Idempotent Batch v2.4</span>
        </div>
      </div>

      {/* Metrics Header */}
      <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-[#EAEAEA] bg-[#FAFAFA] divide-x divide-[#EAEAEA]">
        <div className="p-3 text-center">
          <span className="text-[9px] uppercase tracking-widest text-[#777777] block">
            Batch Settlement Volume
          </span>
          <span className="text-base font-serif font-normal text-black">
            ₹{(totalVolume / 100000).toFixed(2)} Lakhs
          </span>
          <span className="text-[9px] text-[#777777] block mt-0.5">6 Gateway Feeds</span>
        </div>
        <div className="p-3 text-center">
          <span className="text-[9px] uppercase tracking-widest text-[#777777] block">
            Automated Match Rate
          </span>
          <span className="text-base font-serif font-normal text-black">
            {(((records.length - discrepancyCount) / records.length) * 100).toFixed(1)}%
          </span>
          <span className="text-[9px] text-emerald-700 block mt-0.5">SLA Target &gt; 99.5%</span>
        </div>
        <div className="p-3 text-center">
          <span className="text-[9px] uppercase tracking-widest text-[#777777] block">
            Variance Discrepancies
          </span>
          <span className="text-base font-serif font-normal text-black">
            {discrepancyCount} Flagged
          </span>
          <span className="text-[9px] text-[#777777] block mt-0.5">Auto-Triage Active</span>
        </div>
        <div className="p-3 text-center">
          <span className="text-[9px] uppercase tracking-widest text-[#777777] block">
            Ledger Reconciled Time
          </span>
          <span className="text-base font-serif font-normal text-black">38.2 Seconds</span>
          <span className="text-[9px] text-[#777777] block mt-0.5">Reduced from 4h manual</span>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="p-3 bg-white border-b border-[#EAEAEA] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-[#777777] font-sans">Filter View:</span>
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-2.5 py-1 text-[10px] uppercase tracking-wider border cursor-pointer transition-colors ${
              filterMode === 'all'
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-[#EAEAEA] hover:border-black'
            }`}
          >
            All Feeds ({records.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('discrepancy')}
            className={`px-2.5 py-1 text-[10px] uppercase tracking-wider border cursor-pointer transition-colors ${
              filterMode === 'discrepancy'
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-[#EAEAEA] hover:border-black'
            }`}
          >
            Discrepancies ({discrepancyCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('matched')}
            className={`px-2.5 py-1 text-[10px] uppercase tracking-wider border cursor-pointer transition-colors ${
              filterMode === 'matched'
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-[#EAEAEA] hover:border-black'
            }`}
          >
            Clean Matches ({records.length - discrepancyCount})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRunBatchEngine}
            disabled={isReconciling}
            className="bg-black text-white hover:bg-neutral-800 disabled:opacity-50 px-3 py-1.5 text-[10px] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Play size={11} className={isReconciling ? 'animate-spin' : ''} />
            <span>{isReconciling ? 'Running Matching Rules...' : 'Execute Batch Engine'}</span>
          </button>
          <button
            type="button"
            onClick={handleExportAuditProof}
            className="border border-[#EAEAEA] hover:border-black text-black px-2.5 py-1.5 text-[10px] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Download size={11} />
            <span>Export Certificate</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="px-4 py-2 bg-[#FAFAFA] border-b border-[#EAEAEA] text-[11px] text-emerald-800 flex items-center gap-2">
          <CheckCircle2 size={13} className="text-emerald-700 shrink-0" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#EAEAEA]">
        {/* Left Column: Settlement Ingestion Ledger */}
        <div className="lg:col-span-7 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] tracking-widest uppercase text-[#777777] font-semibold">
              Live Ingestion Stream ({filteredRecords.length} Transactions)
            </span>
            <span className="text-[9.5px] text-[#777777] font-mono">Dual-Entry Verification</span>
          </div>

          <div className="border border-[#EAEAEA] overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFAFA] border-b border-[#EAEAEA] text-[9px] uppercase tracking-widest text-[#777777]">
                <tr>
                  <th className="p-2.5">Txn ID</th>
                  <th className="p-2.5">Source &amp; Acct</th>
                  <th className="p-2.5 text-right">Gateway Vol</th>
                  <th className="p-2.5 text-right">Ledger Vol</th>
                  <th className="p-2.5">Status</th>
                  <th className="p-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA]">
                {filteredRecords.map((r) => {
                  const isSelected = selectedRecordId === r.id;
                  return (
                    <tr
                      key={r.id}
                      onClick={() => setSelectedRecordId(r.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-neutral-100 font-medium' : 'hover:bg-[#FAFAFA]'
                      }`}
                    >
                      <td className="p-2.5 font-mono text-[11px] font-semibold text-black">{r.id}</td>
                      <td className="p-2.5">
                        <div className="text-black font-serif">{r.sourceGateway}</div>
                        <div className="text-[9px] font-mono text-[#777777]">{r.merchantAccount}</div>
                      </td>
                      <td className="p-2.5 text-right font-mono text-black">
                        ₹{r.gatewayAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="p-2.5 text-right font-mono text-black">
                        ₹{r.ledgerAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="p-2.5">
                        <span
                          className={`inline-block px-1.5 py-0.5 text-[8.5px] uppercase tracking-wider border ${
                            r.status === 'Matched'
                              ? 'bg-black text-white border-black'
                              : r.status === 'Resolved'
                              ? 'bg-neutral-800 text-white border-neutral-800'
                              : 'bg-white text-black border-black font-semibold'
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="p-2.5 text-right">
                        {r.status.includes('Discrepancy') ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleResolveVariance(r.id);
                            }}
                            className="px-2 py-0.5 border border-black text-black hover:bg-black hover:text-white text-[9px] uppercase tracking-wider transition-colors"
                          >
                            Triage →
                          </button>
                        ) : (
                          <span className="text-[9px] text-[#777777] font-mono">Matched</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="text-[9.5px] text-[#777777] mt-2 italic">
            * Click any ledger entry to inspect deterministic hash comparison and audit trail.
          </div>
        </div>

        {/* Right Column: Detailed Discrepancy & Cryptographic Audit Inspection */}
        <div className="lg:col-span-5 p-4 sm:p-5 bg-[#FAFAFA] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-2 mb-3">
              <span className="text-[10px] tracking-widest uppercase text-[#777777] font-semibold">
                Ledger Audit &amp; Settlement Breakdown
              </span>
              <span className="font-mono text-[10px] text-black font-semibold">
                {selectedRecord.id}
              </span>
            </div>

            <div className="space-y-3 bg-white p-3.5 border border-[#EAEAEA]">
              <div className="flex justify-between text-xs">
                <span className="text-[#777777]">Payment Gateway Feed:</span>
                <span className="text-black font-medium">{selectedRecord.sourceGateway}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#777777]">Merchant Clearing Node:</span>
                <span className="text-black font-mono">{selectedRecord.merchantAccount}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#777777]">Gross Inward Amount:</span>
                <span className="text-black font-mono font-medium">
                  ₹{selectedRecord.gatewayAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#777777]">Internal Bank Book Value:</span>
                <span className="text-black font-mono font-medium">
                  ₹{selectedRecord.ledgerAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#777777]">Calculated Gateway Fee (MDR):</span>
                <span className="text-black font-mono">
                  ₹{selectedRecord.feeMdr.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-xs pt-2 border-t border-[#EAEAEA]">
                <span className="text-[#777777]">Current Variance:</span>
                <span
                  className={`font-mono font-bold ${
                    selectedRecord.variance === 0 ? 'text-emerald-700' : 'text-neutral-900'
                  }`}
                >
                  {selectedRecord.variance === 0 ? 'Zero Variance (100% Balanced)' : `₹${selectedRecord.variance} Discrepancy`}
                </span>
              </div>
            </div>

            {/* Cryptographic SHA-256 Stamp */}
            <div className="mt-3 p-3 bg-white border border-[#EAEAEA]">
              <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-[#777777] mb-1">
                <span>Cryptographic Audit Digest</span>
                <ShieldCheck size={13} className="text-black" />
              </div>
              <div className="font-mono text-[10px] text-black break-all">
                {selectedRecord.hash}
              </div>
              <div className="text-[9px] text-[#777777] mt-1">
                Deterministic hash validated against reserve bank clearing settlement timestamps.
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#EAEAEA]">
            {selectedRecord.status.includes('Discrepancy') ? (
              <button
                type="button"
                onClick={() => handleResolveVariance(selectedRecord.id)}
                className="w-full bg-black text-white py-2 px-3 text-[10px] uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Approve ₹{selectedRecord.variance} Adjustment &amp; Auto-Reconcile</span>
                <ArrowRight size={12} />
              </button>
            ) : (
              <div className="w-full py-2 px-3 bg-neutral-100 text-[#777777] border border-[#EAEAEA] text-[10px] uppercase tracking-widest text-center flex items-center justify-center gap-1.5">
                <CheckCircle2 size={12} className="text-black" />
                <span>Entry Fully Reconciled &amp; Signed</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
