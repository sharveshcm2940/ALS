import React, { useState } from 'react';
import { Truck, CheckCircle2, Clock, AlertTriangle, ArrowRight, RefreshCw, FileText } from 'lucide-react';

interface VehicleRecord {
  id: string;
  driver: string;
  cargo: string;
  bay: string;
  status: 'Queued' | 'Bay Loading' | 'Inspection' | 'Cleared';
  turnaroundTime: string;
}

export const TransitYardShowcase: React.FC = () => {
  const [vehicles, setVehicles] = useState<VehicleRecord[]>([
    {
      id: 'TRK-4819',
      driver: 'K. Rajendran',
      cargo: 'Automotive Sub-assemblies (8.4 T)',
      bay: 'Bay 03',
      status: 'Bay Loading',
      turnaroundTime: '18m 42s',
    },
    {
      id: 'TRK-9281',
      driver: 'M. Selvam',
      cargo: 'Industrial Castings (12.1 T)',
      bay: 'Bay 01',
      status: 'Inspection',
      turnaroundTime: '31m 15s',
    },
    {
      id: 'TRK-3044',
      driver: 'V. Sundaram',
      cargo: 'High-Precision Extrusions (6.2 T)',
      bay: 'Bay 05',
      status: 'Queued',
      turnaroundTime: '06m 10s',
    },
    {
      id: 'TRK-1120',
      driver: 'P. Balaji',
      cargo: 'Electronic Wire Harnesses (3.8 T)',
      bay: 'Bay 02',
      status: 'Cleared',
      turnaroundTime: '24m 50s',
    },
  ]);

  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('TRK-4819');
  const [activeTab, setActiveTab] = useState<'console' | 'manifest'>('console');
  const [newTruckNumber, setNewTruckNumber] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  const advanceStatus = (id: string) => {
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id !== id) return v;
        const nextStatus: Record<VehicleRecord['status'], VehicleRecord['status']> = {
          Queued: 'Bay Loading',
          'Bay Loading': 'Inspection',
          Inspection: 'Cleared',
          Cleared: 'Queued',
        };
        return { ...v, status: nextStatus[v.status] };
      })
    );
  };

  const handleQuickAddTruck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTruckNumber.trim()) return;
    const newEntry: VehicleRecord = {
      id: newTruckNumber.trim().toUpperCase(),
      driver: 'Assigned Driver',
      cargo: 'Standard Freight Container (7.5 T)',
      bay: 'Bay 04',
      status: 'Queued',
      turnaroundTime: '01m 12s',
    };
    setVehicles([newEntry, ...vehicles]);
    setSelectedVehicleId(newEntry.id);
    setNewTruckNumber('');
    setIsAdding(false);
  };

  return (
    <div className="border border-[#EAEAEA] bg-white text-black text-xs font-serif shadow-xs">
      {/* Console Top Header */}
      <div className="bg-black text-white px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Truck size={15} className="text-white" />
          <span className="font-serif tracking-[0.2em] uppercase font-medium">
            Transit Yard &amp; Fleet Console · Live System Simulation
          </span>
        </div>
        <div className="flex items-center gap-4 text-[10px] tracking-widest uppercase text-neutral-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Yard 14 Hub (Chennai) · Online
          </span>
          <span className="hidden sm:inline">Telemetry SLA: 99.98%</span>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-[#EAEAEA] bg-[#FAFAFA] divide-x divide-[#EAEAEA]">
        <div className="p-3 text-center">
          <span className="text-[9px] uppercase tracking-widest text-[#777777] block">
            Avg Turnaround Time
          </span>
          <span className="text-base font-serif font-normal text-black">22m 14s</span>
          <span className="text-[9px] text-[#777777] block mt-0.5">Target: &lt; 35m</span>
        </div>
        <div className="p-3 text-center">
          <span className="text-[9px] uppercase tracking-widest text-[#777777] block">
            Active Gate Clearance
          </span>
          <span className="text-base font-serif font-normal text-black">
            {vehicles.filter((v) => v.status === 'Cleared').length} / {vehicles.length}
          </span>
          <span className="text-[9px] text-[#777777] block mt-0.5">100% Paperless</span>
        </div>
        <div className="p-3 text-center">
          <span className="text-[9px] uppercase tracking-widest text-[#777777] block">
            Yard Bay Utilization
          </span>
          <span className="text-base font-serif font-normal text-black">83.3%</span>
          <span className="text-[9px] text-[#777777] block mt-0.5">5 of 6 Bays Active</span>
        </div>
        <div className="p-3 text-center">
          <span className="text-[9px] uppercase tracking-widest text-[#777777] block">
            Telecom Offline Cache
          </span>
          <span className="text-base font-serif font-normal text-black">Synced</span>
          <span className="text-[9px] text-[#777777] block mt-0.5">Zero Lost Manifests</span>
        </div>
      </div>

      {/* Main Console View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#EAEAEA]">
        {/* Left Column: Live Vehicle Queue */}
        <div className="lg:col-span-7 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] tracking-widest uppercase text-[#777777] font-semibold">
              Live Fleet Transit Queue ({vehicles.length} Vehicles)
            </span>
            <button
              type="button"
              onClick={() => setIsAdding(!isAdding)}
              className="text-[10px] tracking-widest uppercase border border-black px-2.5 py-1 hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              {isAdding ? 'Cancel' : '+ Check-In Vehicle'}
            </button>
          </div>

          {/* Quick Check-In Form */}
          {isAdding && (
            <form onSubmit={handleQuickAddTruck} className="mb-4 p-3 border border-black bg-[#FAFAFA] flex gap-2">
              <input
                type="text"
                placeholder="e.g. TRK-7721"
                value={newTruckNumber}
                onChange={(e) => setNewTruckNumber(e.target.value)}
                className="bg-white border border-[#EAEAEA] px-3 py-1.5 text-xs text-black flex-1 focus:outline-none focus:border-black font-mono uppercase"
              />
              <button
                type="submit"
                className="bg-black text-white px-3 py-1.5 text-[10px] uppercase tracking-widest hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Log Inward
              </button>
            </form>
          )}

          {/* Table */}
          <div className="border border-[#EAEAEA] overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFAFA] border-b border-[#EAEAEA] text-[9.5px] uppercase tracking-widest text-[#777777]">
                <tr>
                  <th className="p-2.5">Vehicle ID</th>
                  <th className="p-2.5">Driver &amp; Cargo</th>
                  <th className="p-2.5">Assigned Bay</th>
                  <th className="p-2.5">Current Status</th>
                  <th className="p-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA]">
                {vehicles.map((v) => {
                  const isSelected = selectedVehicleId === v.id;
                  return (
                    <tr
                      key={v.id}
                      onClick={() => setSelectedVehicleId(v.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-neutral-100 font-medium' : 'hover:bg-[#FAFAFA]'
                      }`}
                    >
                      <td className="p-2.5 font-mono text-[11px] font-semibold text-black">{v.id}</td>
                      <td className="p-2.5">
                        <div className="text-black font-serif">{v.driver}</div>
                        <div className="text-[9.5px] text-[#777777] truncate max-w-[150px]">{v.cargo}</div>
                      </td>
                      <td className="p-2.5 text-black font-mono">{v.bay}</td>
                      <td className="p-2.5">
                        <span
                          className={`inline-block px-2 py-0.5 text-[9px] uppercase tracking-wider border ${
                            v.status === 'Cleared'
                              ? 'bg-black text-white border-black'
                              : v.status === 'Inspection'
                              ? 'bg-neutral-200 text-black border-neutral-400'
                              : v.status === 'Bay Loading'
                              ? 'bg-white text-black border-black'
                              : 'bg-neutral-100 text-[#777777] border-[#EAEAEA]'
                          }`}
                        >
                          {v.status}
                        </span>
                      </td>
                      <td className="p-2.5 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            advanceStatus(v.id);
                          }}
                          className="px-2 py-1 border border-[#EAEAEA] hover:border-black text-[9px] uppercase tracking-wider transition-colors"
                          title="Advance operational status"
                        >
                          Advance →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="text-[9.5px] text-[#777777] mt-2 italic">
            * Click any truck to inspect electronic bill-of-lading. Click "Advance →" to cycle status.
          </div>
        </div>

        {/* Right Column: Selected Truck Manifest & Digital Bill of Lading */}
        <div className="lg:col-span-5 p-4 sm:p-5 bg-[#FAFAFA] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-2 mb-3">
              <span className="text-[10px] tracking-widest uppercase text-[#777777] font-semibold">
                Electronic Manifest Inspection
              </span>
              <span className="font-mono text-[10px] text-black font-semibold">
                {selectedVehicle.id}
              </span>
            </div>

            <div className="space-y-3 bg-white p-3.5 border border-[#EAEAEA]">
              <div className="flex justify-between text-xs">
                <span className="text-[#777777]">Carrier Driver:</span>
                <span className="text-black font-medium">{selectedVehicle.driver}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#777777]">Manifest Cargo:</span>
                <span className="text-black font-medium text-right max-w-[180px]">{selectedVehicle.cargo}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#777777]">Allocated Dock:</span>
                <span className="text-black font-mono font-medium">{selectedVehicle.bay}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#777777]">Yard Dwell Clock:</span>
                <span className="text-black font-mono flex items-center gap-1">
                  <Clock size={11} /> {selectedVehicle.turnaroundTime}
                </span>
              </div>
              <div className="flex justify-between text-xs pt-2 border-t border-[#EAEAEA]">
                <span className="text-[#777777]">Checkpoint Gate:</span>
                <span className="text-black font-semibold uppercase">{selectedVehicle.status}</span>
              </div>
            </div>

            {/* Simulated QR & Manifest Seal */}
            <div className="mt-3 p-3 bg-white border border-[#EAEAEA] flex items-center justify-between">
              <div>
                <div className="text-[9px] uppercase tracking-widest text-[#777777]">
                  Cryptographic Clearance Token
                </div>
                <div className="font-mono text-[10px] text-black">
                  SHA-256: 8f4b...d291
                </div>
              </div>
              <div className="w-10 h-10 border border-black flex items-center justify-center p-1 bg-neutral-50">
                <div className="w-full h-full bg-black flex items-center justify-center text-[7px] text-white font-mono">
                  QR
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#EAEAEA] flex gap-2">
            <button
              type="button"
              onClick={() => advanceStatus(selectedVehicle.id)}
              className="flex-1 bg-black text-white py-2 px-3 text-[10px] uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Advance Status ({selectedVehicle.status})</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
