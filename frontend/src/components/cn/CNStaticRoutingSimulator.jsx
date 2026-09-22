import React, { useState } from 'react';
import { Network, Laptop, Server, Play, RotateCcw, ArrowRight, CheckCircle2, AlertCircle, Terminal, HelpCircle } from 'lucide-react';

export default function CNStaticRoutingSimulator() {
  // Static route configurations on R1 and R2
  const [r1HasRoute, setR1HasRoute] = useState(true);
  const [r2HasReturnRoute, setR2HasReturnRoute] = useState(true);

  // Simulation execution state
  const [isSimulating, setIsSimulating] = useState(false);
  const [hopIndex, setHopIndex] = useState(0); // 0 = idle, 1 = Host A, 2 = R1, 3 = R2, 4 = Host B, 5 = R2 return, 6 = R1 return, 7 = Host A done
  const [simulationStatus, setSimulationStatus] = useState(null); // { success: bool, message: string }

  const runPacketTrace = () => {
    setIsSimulating(true);
    setSimulationStatus(null);
    setHopIndex(1); // Host A

    setTimeout(() => {
      setHopIndex(2); // R1
      setTimeout(() => {
        if (!r1HasRoute) {
          // R1 drops packet
          setIsSimulating(false);
          setSimulationStatus({
            success: false,
            message: 'PACKET DROPPED AT ROUTER 1! R1 has no static route for 192.168.2.0/24. Routing table lookup failed -> ICMP Destination Network Unreachable.',
            dropAt: 'R1',
          });
          return;
        }

        // R1 forwards to R2
        setHopIndex(3); // R2
        setTimeout(() => {
          setHopIndex(4); // Host B
          setTimeout(() => {
            // Host B generates reply
            setHopIndex(5); // R2 Return
            setTimeout(() => {
              if (!r2HasReturnRoute) {
                // R2 drops return packet
                setIsSimulating(false);
                setSimulationStatus({
                  success: false,
                  message: 'ECHO REPLY DROPPED AT ROUTER 2! Host B received the ping and sent a reply, but Router 2 has no static return route to 192.168.1.0/24! Host A received "Request timed out".',
                  dropAt: 'R2_return',
                });
                return;
              }

              // R2 forwards back to R1
              setHopIndex(6); // R1 Return
              setTimeout(() => {
                setHopIndex(7); // Host A Done
                setIsSimulating(false);
                setSimulationStatus({
                  success: true,
                  message: 'ROUND-TRIP PING SUCCESSFUL! Both forward route (R1 -> 192.168.2.0/24) and return route (R2 -> 192.168.1.0/24) are active. RTT = 4ms, TTL = 62 (2 router hops decremented).',
                });
              }, 600);
            }, 600);
          }, 600);
        }, 600);
      }, 600);
    }, 500);
  };

  const handleReset = () => {
    setIsSimulating(false);
    setHopIndex(0);
    setSimulationStatus(null);
  };

  return (
    <div className="space-y-6">
      {/* 1. Multi-Router Topology Diagram */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-sky-400" />
            <h3 className="font-bold text-sm sm:text-base">
              Multi-Subnet Internetwork Topology (Subnet 1 — WAN Link — Subnet 2)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {isSimulating ? `Packet in Transit: Step ${hopIndex}/7` : 'Ready'}
          </span>
        </div>

        {/* Visual Topology Nodes */}
        <div className="relative py-10 px-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
          {/* Host A */}
          <div className="flex flex-col items-center text-center z-10 w-24">
            <div className={`p-3 rounded-2xl border-2 transition ${
              hopIndex === 1 || hopIndex === 7 ? 'border-sky-400 bg-sky-950 shadow-lg shadow-sky-500/20' : 'border-slate-700 bg-slate-800'
            }`}>
              <Laptop className="w-6 h-6 text-sky-400" />
            </div>
            <span className="text-xs font-bold mt-2">Host A</span>
            <span className="text-[10px] text-slate-400 font-mono">192.168.1.10</span>
            <span className="text-[9px] text-slate-500 font-mono">GW: 192.168.1.1</span>
          </div>

          {/* Subnet 1 Link */}
          <div className="flex-1 h-0.5 bg-slate-700 relative mx-1 text-center">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] text-slate-400 font-mono">192.168.1.0/24</span>
            {(hopIndex === 1 || hopIndex === 6) && (
              <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-md shadow-cyan-400 animate-ping left-1/2" />
            )}
          </div>

          {/* Router 1 */}
          <div className="flex flex-col items-center text-center z-10 w-28">
            <div className={`p-3 rounded-2xl border-2 transition ${
              hopIndex === 2 || hopIndex === 6 ? 'border-amber-400 bg-amber-950 shadow-lg shadow-amber-500/20' : 'border-slate-700 bg-slate-800'
            }`}>
              <Server className="w-6 h-6 text-amber-400" />
            </div>
            <span className="text-xs font-bold mt-2">Router R1</span>
            <span className="text-[10px] text-slate-400 font-mono">G0/0: 192.168.1.1</span>
            <span className="text-[10px] text-slate-400 font-mono">G0/1: 10.0.0.1</span>
          </div>

          {/* WAN Link */}
          <div className="flex-1 h-0.5 bg-purple-700/80 relative mx-1 text-center">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] text-purple-400 font-mono font-bold">WAN: 10.0.0.0/30</span>
            {(hopIndex === 3 || hopIndex === 5) && (
              <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-purple-400 shadow-md shadow-purple-400 animate-ping left-1/2" />
            )}
          </div>

          {/* Router 2 */}
          <div className="flex flex-col items-center text-center z-10 w-28">
            <div className={`p-3 rounded-2xl border-2 transition ${
              hopIndex === 3 || hopIndex === 5 ? 'border-amber-400 bg-amber-950 shadow-lg shadow-amber-500/20' : 'border-slate-700 bg-slate-800'
            }`}>
              <Server className="w-6 h-6 text-amber-400" />
            </div>
            <span className="text-xs font-bold mt-2">Router R2</span>
            <span className="text-[10px] text-slate-400 font-mono">G0/1: 10.0.0.2</span>
            <span className="text-[10px] text-slate-400 font-mono">G0/0: 192.168.2.1</span>
          </div>

          {/* Subnet 2 Link */}
          <div className="flex-1 h-0.5 bg-slate-700 relative mx-1 text-center">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] text-slate-400 font-mono">192.168.2.0/24</span>
            {hopIndex === 4 && (
              <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-emerald-400 shadow-md shadow-emerald-400 animate-ping left-1/2" />
            )}
          </div>

          {/* Host B */}
          <div className="flex flex-col items-center text-center z-10 w-24">
            <div className={`p-3 rounded-2xl border-2 transition ${
              hopIndex === 4 ? 'border-emerald-400 bg-emerald-950 shadow-lg shadow-emerald-500/20' : 'border-slate-700 bg-slate-800'
            }`}>
              <Laptop className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="text-xs font-bold mt-2">Host B</span>
            <span className="text-[10px] text-slate-400 font-mono">192.168.2.20</span>
            <span className="text-[9px] text-slate-500 font-mono">GW: 192.168.2.1</span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Route Configuration Controls */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2">
            <Server className="w-4 h-4 text-[#0284c7]" />
            Static Route Configuration & Forwarding Workbench
          </h3>
          <button
            onClick={handleReset}
            className="text-xs px-2.5 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 transition flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Topology
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {/* Router 1 Route Setting */}
          <div className="p-4 rounded-xl bg-white border border-slate-300 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Router 1 (R1) Outbound Route:</span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${r1HasRoute ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                {r1HasRoute ? 'Configured' : 'Missing'}
              </span>
            </div>
            <p className="text-xs font-mono text-slate-600 bg-slate-50 p-2 rounded border border-slate-200">
              ip route 192.168.2.0 255.255.255.0 10.0.0.2
            </p>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={r1HasRoute}
                onChange={(e) => {
                  setR1HasRoute(e.target.checked);
                  setSimulationStatus(null);
                }}
                className="accent-[#0284c7] w-4 h-4"
              />
              <span>Enable Static Route on R1 (Forward to Subnet 2)</span>
            </label>
          </div>

          {/* Router 2 Route Setting */}
          <div className="p-4 rounded-xl bg-white border border-slate-300 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Router 2 (R2) Return Route:</span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${r2HasReturnRoute ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                {r2HasReturnRoute ? 'Configured' : 'Missing'}
              </span>
            </div>
            <p className="text-xs font-mono text-slate-600 bg-slate-50 p-2 rounded border border-slate-200">
              ip route 192.168.1.0 255.255.255.0 10.0.0.1
            </p>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={r2HasReturnRoute}
                onChange={(e) => {
                  setR2HasReturnRoute(e.target.checked);
                  setSimulationStatus(null);
                }}
                className="accent-[#0284c7] w-4 h-4"
              />
              <span>Enable Return Route on R2 (Return to Subnet 1)</span>
            </label>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={runPacketTrace}
            disabled={isSimulating}
            className="px-5 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold text-xs sm:text-sm rounded-xl transition shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            {isSimulating ? 'Tracing Hop-by-Hop Delivery...' : 'Send Ping: Host A → Host B'}
          </button>
        </div>

        {/* Diagnostic Status Message */}
        {simulationStatus && (
          <div
            className={`mt-4 p-4 rounded-xl border flex items-start gap-3 transition animate-in fade-in ${
              simulationStatus.success
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            {simulationStatus.success ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1 text-xs leading-relaxed">
              <span className="font-bold text-sm block">
                {simulationStatus.success ? 'ICMP Reachability Established (Bidirectional)' : 'Routing Failure Encountered'}
              </span>
              <p>{simulationStatus.message}</p>
            </div>
          </div>
        )}
      </div>

      {/* 3. Real-Time Cisco IOS Routing Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* R1 Routing Table */}
        <div className="bg-[#1e1e1e] border border-slate-800 rounded-xl p-4 text-white font-mono text-xs shadow-md">
          <div className="flex items-center justify-between mb-2 text-slate-400">
            <span className="font-bold text-sky-400">R1# show ip route</span>
            <span className="text-[10px]">Codes: C - connected, S - static</span>
          </div>
          <div className="space-y-1 text-slate-300 pl-2 border-l-2 border-sky-500">
            <div>C   192.168.1.0/24 is directly connected, GigabitEthernet0/0</div>
            <div>C   10.0.0.0/30 is directly connected, GigabitEthernet0/1</div>
            {r1HasRoute ? (
              <div className="text-emerald-400 font-bold">
                S   192.168.2.0/24 [1/0] via 10.0.0.2
              </div>
            ) : (
              <div className="text-slate-600 italic">// 192.168.2.0/24 route not found</div>
            )}
          </div>
        </div>

        {/* R2 Routing Table */}
        <div className="bg-[#1e1e1e] border border-slate-800 rounded-xl p-4 text-white font-mono text-xs shadow-md">
          <div className="flex items-center justify-between mb-2 text-slate-400">
            <span className="font-bold text-emerald-400">R2# show ip route</span>
            <span className="text-[10px]">Codes: C - connected, S - static</span>
          </div>
          <div className="space-y-1 text-slate-300 pl-2 border-l-2 border-emerald-500">
            <div>C   192.168.2.0/24 is directly connected, GigabitEthernet0/0</div>
            <div>C   10.0.0.0/30 is directly connected, GigabitEthernet0/1</div>
            {r2HasReturnRoute ? (
              <div className="text-emerald-400 font-bold">
                S   192.168.1.0/24 [1/0] via 10.0.0.1
              </div>
            ) : (
              <div className="text-slate-600 italic">// 192.168.1.0/24 return route not found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
