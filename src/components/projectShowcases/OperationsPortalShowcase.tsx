import React, { useState } from 'react';
import {
  Layers,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Compass,
  FileCheck,
  Check,
  ArrowRight,
  ShieldCheck,
  Cpu,
} from 'lucide-react';

interface WorkOrder {
  id: string;
  partName: string;
  material: string;
  revision: string;
  status: 'In Inspection' | 'CNC Machining' | 'Passed & Routed' | 'Flagged Rework';
  targetDimension: number; // e.g. 45.000
  tolerance: number; // ± 0.020
  measuredDimension: number;
  surfaceFinishRa: 'Pass' | 'Fail';
  ultrasonicScan: 'Pass' | 'Fail';
  quantityCompleted: number;
  totalBatch: number;
  operatorId: string;
}

export const OperationsPortalShowcase: React.FC = () => {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([
    {
      id: 'WO-8421',
      partName: 'Precision CNC Rotor Shaft',
      material: 'Titanium Grade 5 (Ti-6Al-4V)',
      revision: 'Rev C (Locked)',
      status: 'In Inspection',
      targetDimension: 45.0,
      tolerance: 0.02,
      measuredDimension: 45.008,
      surfaceFinishRa: 'Pass',
      ultrasonicScan: 'Pass',
      quantityCompleted: 88,
      totalBatch: 120,
      operatorId: 'OPR-CH-109',
    },
    {
      id: 'WO-8422',
      partName: 'Hydraulic Manifold Block',
      material: 'Aerospace Aluminum 7075-T6',
      revision: 'Rev B (Locked)',
      status: 'CNC Machining',
      targetDimension: 92.5,
      tolerance: 0.015,
      measuredDimension: 92.504,
      surfaceFinishRa: 'Pass',
      ultrasonicScan: 'Pass',
      quantityCompleted: 45,
      totalBatch: 60,
      operatorId: 'OPR-BLR-042',
    },
    {
      id: 'WO-8423',
      partName: 'High-Pressure Valve Housing',
      material: 'Duplex Stainless Steel 2205',
      revision: 'Rev D (Locked)',
      status: 'Passed & Routed',
      targetDimension: 120.0,
      tolerance: 0.03,
      measuredDimension: 120.012,
      surfaceFinishRa: 'Pass',
      ultrasonicScan: 'Pass',
      quantityCompleted: 50,
      totalBatch: 50,
      operatorId: 'OPR-CH-084',
    },
  ]);

  const [selectedOrderId, setSelectedOrderId] = useState<string>('WO-8421');
  const [measuredInput, setMeasuredInput] = useState<string>('45.008');
  const [signOffNotice, setSignOffNotice] = useState<string | null>(null);

  const selectedOrder = workOrders.find((w) => w.id === selectedOrderId) || workOrders[0];

  const parsedDimension = parseFloat(measuredInput) || selectedOrder.targetDimension;
  const dimensionDelta = Math.abs(parsedDimension - selectedOrder.targetDimension);
  const isDimensionInSpec = dimensionDelta <= selectedOrder.tolerance;

  const handleSelectOrder = (order: WorkOrder) => {
    setSelectedOrderId(order.id);
    setMeasuredInput(order.measuredDimension.toString());
  };

  const handleSignOffUnit = () => {
    if (!isDimensionInSpec) {
      alert('Cannot sign off unit: Critical dimension is out of engineering tolerance.');
      return;
    }

    setWorkOrders((prev) =>
      prev.map((order) => {
        if (order.id === selectedOrder.id) {
          const nextQty = Math.min(order.quantityCompleted + 1, order.totalBatch);
          return {
            ...order,
            quantityCompleted: nextQty,
            status: nextQty === order.totalBatch ? 'Passed & Routed' : 'In Inspection',
          };
        }
        return order;
      })
    );

    setSignOffNotice(
      `Unit verified & signed off by Inspector. Work Order ${selectedOrder.id} routed to assembly bay.`
    );
    setTimeout(() => setSignOffNotice(null), 3000);
  };

  return (
    <div className="border border-[#EAEAEA] bg-white text-black text-xs font-serif shadow-xs">
      {/* Top Header */}
      <div className="bg-black text-white px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Layers size={15} className="text-white" />
          <span className="font-serif tracking-[0.2em] uppercase font-medium">
            Shop-Floor Quality &amp; Work-Order Terminal · Touch Optimized
          </span>
        </div>
        <div className="flex items-center gap-4 text-[10px] tracking-widest uppercase text-neutral-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Drawing Revision Lock: Active
          </span>
          <span className="hidden sm:inline">PWA Sub-Second Sync</span>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-[#EAEAEA] bg-[#FAFAFA] divide-x divide-[#EAEAEA]">
        <div className="p-3 text-center">
          <span className="text-[9px] uppercase tracking-widest text-[#777777] block">
            Drawing Revision Adherence
          </span>
          <span className="text-base font-serif font-normal text-black">100.0%</span>
          <span className="text-[9px] text-emerald-700 block mt-0.5">0 Obsolete Prints</span>
        </div>
        <div className="p-3 text-center">
          <span className="text-[9px] uppercase tracking-widest text-[#777777] block">
            Scrap Rework Reduction
          </span>
          <span className="text-base font-serif font-normal text-black">-42% vs Baseline</span>
          <span className="text-[9px] text-[#777777] block mt-0.5">Verified across 2 Qtrs</span>
        </div>
        <div className="p-3 text-center">
          <span className="text-[9px] uppercase tracking-widest text-[#777777] block">
            Terminal Response Time
          </span>
          <span className="text-base font-serif font-normal text-black">42 Milliseconds</span>
          <span className="text-[9px] text-[#777777] block mt-0.5">Zero Lag on Touch Hardware</span>
        </div>
        <div className="p-3 text-center">
          <span className="text-[9px] uppercase tracking-widest text-[#777777] block">
            Active Work Orders
          </span>
          <span className="text-base font-serif font-normal text-black">
            {workOrders.filter((w) => w.status !== 'Passed & Routed').length} In Progress
          </span>
          <span className="text-[9px] text-[#777777] block mt-0.5">3 Assembly Bays</span>
        </div>
      </div>

      {signOffNotice && (
        <div className="px-4 py-2 bg-[#FAFAFA] border-b border-[#EAEAEA] text-[11px] text-emerald-800 flex items-center gap-2">
          <CheckCircle2 size={13} className="text-emerald-700 shrink-0" />
          <span>{signOffNotice}</span>
        </div>
      )}

      {/* Main Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#EAEAEA]">
        {/* Left Column: Work Order Dispatch Queue */}
        <div className="lg:col-span-6 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] tracking-widest uppercase text-[#777777] font-semibold">
              Live Assembly Queue ({workOrders.length} Active Orders)
            </span>
            <span className="text-[9.5px] font-mono text-[#777777]">ISO 9001:2015 Compliant</span>
          </div>

          <div className="space-y-2.5">
            {workOrders.map((order) => {
              const isSelected = order.id === selectedOrder.id;
              const percent = Math.round((order.quantityCompleted / order.totalBatch) * 100);
              return (
                <div
                  key={order.id}
                  onClick={() => handleSelectOrder(order)}
                  className={`p-3.5 border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-black bg-neutral-50 shadow-xs'
                      : 'border-[#EAEAEA] hover:border-black bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold text-black">{order.id}</span>
                        <span className="px-1.5 py-0.2 bg-black text-white text-[8.5px] uppercase font-mono tracking-wider">
                          {order.revision}
                        </span>
                      </div>
                      <div className="font-serif text-sm text-black mt-1">{order.partName}</div>
                      <div className="text-[10px] text-[#777777] mt-0.5">{order.material}</div>
                    </div>
                    <span
                      className={`px-2 py-0.5 text-[9px] uppercase tracking-wider border font-sans ${
                        order.status === 'Passed & Routed'
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black border-black'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3 pt-2 border-t border-[#EAEAEA] flex items-center justify-between text-[10px]">
                    <span className="text-[#777777]">
                      Batch Progress: {order.quantityCompleted} / {order.totalBatch} units ({percent}%)
                    </span>
                    <span className="font-mono text-[#777777]">{order.operatorId}</span>
                  </div>
                  <div className="w-full bg-[#EAEAEA] h-1 mt-1.5">
                    <div className="bg-black h-1 transition-all duration-300" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-[9.5px] text-[#777777] mt-3 italic">
            * Obsolete drawings are hard-locked by cloud schema; floor operators cannot open superseded prints.
          </div>
        </div>

        {/* Right Column: Active Inspection Gate & CAD Schematic */}
        <div className="lg:col-span-6 p-4 sm:p-5 bg-[#FAFAFA] flex flex-col justify-between">
          <div className="space-y-4">
            {/* Drawing Lockout Security Box */}
            <div className="p-3 bg-white border border-black flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Lock size={15} className="text-black" />
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-black font-bold block">
                    Drawing Security Lock: {selectedOrder.revision}
                  </span>
                  <span className="text-[9px] text-[#777777]">
                    ECO-2026-88 approved. Superseded Rev B locked from shop floor.
                  </span>
                </div>
              </div>
              <span className="text-[9px] px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono">
                VERIFIED
              </span>
            </div>

            {/* Simulated Technical CAD Wireframe Schematic */}
            <div className="bg-white border border-[#EAEAEA] p-3 text-center relative overflow-hidden">
              <span className="text-[9px] tracking-widest uppercase text-[#777777] block text-left mb-1">
                Schematic Coordinate Plane · Drawing Spec #ALS-{selectedOrder.id}
              </span>
              <svg className="w-full h-24 my-1" viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Technical blueprint grid lines */}
                <line x1="10" y1="40" x2="290" y2="40" stroke="#EAEAEA" strokeDasharray="3 3" />
                <line x1="150" y1="10" x2="150" y2="70" stroke="#EAEAEA" strokeDasharray="3 3" />
                {/* Part outline */}
                <rect x="50" y="25" width="200" height="30" stroke="#000000" strokeWidth="1.5" fill="#FAFAFA" />
                <rect x="90" y="18" width="120" height="44" stroke="#000000" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="150" cy="40" r="8" stroke="#000000" strokeWidth="1.5" />
                {/* Dimension callout */}
                <line x1="50" y1="65" x2="250" y2="65" stroke="#000000" strokeWidth="0.75" />
                <line x1="50" y1="60" x2="50" y2="70" stroke="#000000" strokeWidth="0.75" />
                <line x1="250" y1="60" x2="250" y2="70" stroke="#000000" strokeWidth="0.75" />
                <text x="150" y="75" fontSize="8" fill="#000000" textAnchor="middle" fontFamily="monospace">
                  DIM A: {selectedOrder.targetDimension}.000mm ±{selectedOrder.tolerance * 1000}µm
                </text>
              </svg>
            </div>

            {/* Live Quality Gate Controls */}
            <div className="bg-white border border-[#EAEAEA] p-3.5 space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-[#EAEAEA] pb-2">
                <span className="font-semibold text-black uppercase tracking-wider text-[10px]">
                  Multi-Point Inspection Form
                </span>
                <span className="font-mono text-[10px] text-[#777777]">Terminal ID: CH-TERM-02</span>
              </div>

              {/* Dimension Gauge Input */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#777777] text-[10.5px]">
                    Critical Dimension A (Target: {selectedOrder.targetDimension.toFixed(3)}mm ±{selectedOrder.tolerance}mm):
                  </span>
                  <span
                    className={`font-mono text-[11px] font-bold px-1.5 py-0.2 ${
                      isDimensionInSpec
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-neutral-900 text-white'
                    }`}
                  >
                    {isDimensionInSpec ? 'IN TOLERANCE' : 'OUT OF SPEC'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="0.001"
                    value={measuredInput}
                    onChange={(e) => setMeasuredInput(e.target.value)}
                    className="flex-1 bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-1.5 font-mono text-sm text-black focus:outline-none focus:border-black"
                  />
                  <button
                    type="button"
                    onClick={() => setMeasuredInput(selectedOrder.targetDimension.toFixed(3))}
                    className="border border-[#EAEAEA] hover:border-black px-2 text-[9px] uppercase tracking-wider"
                  >
                    Nominal
                  </button>
                </div>
                <div className="text-[9px] text-[#777777] mt-1 font-mono">
                  Delta: {(dimensionDelta * 1000).toFixed(1)}µm from target (Max allowed: {selectedOrder.tolerance * 1000}µm)
                </div>
              </div>

              {/* Surface Finish Ra Check */}
              <div className="flex items-center justify-between py-1.5 border-t border-[#EAEAEA] text-xs">
                <span className="text-[#1A1A1A]">Surface Finish Ra (&lt; 0.8µm):</span>
                <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-800">
                  <Check size={12} className="text-black" /> Ra 0.42µm (Pass)
                </span>
              </div>

              {/* Ultrasonic Non-Destructive Test */}
              <div className="flex items-center justify-between py-1.5 border-t border-[#EAEAEA] text-xs">
                <span className="text-[#1A1A1A]">Ultrasonic Sub-Surface Integrity:</span>
                <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-800">
                  <Check size={12} className="text-black" /> 0 Internal Cavities (Pass)
                </span>
              </div>
            </div>
          </div>

          {/* Action Sign-Off Button */}
          <div className="mt-4 pt-3 border-t border-[#EAEAEA]">
            <button
              type="button"
              onClick={handleSignOffUnit}
              disabled={!isDimensionInSpec}
              className="w-full bg-black text-white hover:bg-neutral-800 disabled:opacity-40 py-2.5 px-4 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <FileCheck size={13} />
              <span>Sign Off Unit #{selectedOrder.quantityCompleted + 1} &amp; Dispatch to Assembly</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
