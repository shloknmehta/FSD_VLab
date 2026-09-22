import React, { useState } from 'react';
import { Server, Laptop, ShieldCheck, Zap, Play, RotateCcw, CheckCircle2, AlertCircle, ArrowRight, Terminal } from 'lucide-react';

export default function CNVlanSimulator() {
  // 4 Connected PCs
  const [pcs, setPcs] = useState([
    { id: 1, name: 'PC1 (Faculty Office)', port: 'Fa0/1', ip: '192.168.10.11', vlan: 10, color: 'emerald' },
    { id: 2, name: 'PC2 (Exam Branch)', port: 'Fa0/2', ip: '192.168.10.12', vlan: 10, color: 'emerald' },
    { id: 3, name: 'PC3 (Student Lab A)', port: 'Fa0/3', ip: '192.168.20.21', vlan: 20, color: 'blue' },
    { id: 4, name: 'PC4 (Student Lab B)', port: 'Fa0/4', ip: '192.168.20.22', vlan: 20, color: 'blue' },
  ]);

  // Ping test state
  const [sourcePcId, setSourcePcId] = useState(1);
  const [destPcId, setDestPcId] = useState(2);
  const [pingResult, setPingResult] = useState(null);
  const [isSimulatingPing, setIsSimulatingPing] = useState(false);

  // Switch ports state (24 ports)
  const [portVlans, setPortVlans] = useState({
    'Fa0/1': 10,
    'Fa0/2': 10,
    'Fa0/3': 20,
    'Fa0/4': 20,
    'Fa0/5': 1,
    'Fa0/6': 1,
    'Fa0/7': 1,
    'Fa0/8': 1,
    'Gi0/1': 'Trunk',
    'Gi0/2': 'Trunk',
  });

  const handleVlanChange = (pcId, newVlan) => {
    setPcs((prev) =>
      prev.map((pc) => {
        if (pc.id === pcId) {
          return {
            ...pc,
            vlan: newVlan,
            color: newVlan === 10 ? 'emerald' : newVlan === 20 ? 'blue' : 'slate',
          };
        }
        return pc;
      })
    );
    setPingResult(null);
  };

  const runPingSimulation = () => {
    setIsSimulatingPing(true);
    setPingResult(null);

    const src = pcs.find((p) => p.id === sourcePcId);
    const dst = pcs.find((p) => p.id === destPcId);

    setTimeout(() => {
      setIsSimulatingPing(false);
      if (src.id === dst.id) {
        setPingResult({
          success: true,
          message: `Loopback Ping to local interface ${src.ip} succeeded (time < 1ms).`,
          type: 'loopback',
        });
      } else if (src.vlan === dst.vlan) {
        setPingResult({
          success: true,
          message: `PING SUCCESSFUL! Reply from ${dst.ip}: bytes=32 time=2ms TTL=64. Both hosts share VLAN ${src.vlan} broadcast domain.`,
          type: 'same_vlan',
        });
      } else {
        setPingResult({
          success: false,
          message: `PING DROPPED! Request timed out. Switch blocked Layer 2 broadcast across VLAN ${src.vlan} and VLAN ${dst.vlan}. Inter-VLAN routing (Router-on-a-Stick) is required to cross VLAN boundaries!`,
          type: 'diff_vlan',
        });
      }
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* 1. Cisco Catalyst Switch Front Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-sky-400" />
            <span className="font-bold text-sm sm:text-base">
              Cisco Catalyst 2960 Layer 2 Switch (24-Port 10/100 + 2 Gigabit Uplinks)
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> VLAN 10 (Faculty)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> VLAN 20 (Students)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> 802.1Q Trunk</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span> VLAN 1 (Default)</span>
          </div>
        </div>

        {/* 24-Port Visual Switch Chassis */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 sm:p-4 overflow-x-auto">
          <div className="text-[10px] text-slate-400 font-mono mb-2 flex justify-between min-w-[500px]">
            <span>FastEthernet 0/1 — 0/24 (RJ45 Access Ports)</span>
            <span>GigabitEthernet 0/1 - 0/2 (Trunk Uplinks)</span>
          </div>

          <div className="flex items-center justify-between gap-2 min-w-[500px]">
            {/* Rows of Ports */}
            <div className="grid grid-cols-12 gap-1 sm:gap-2">
              {[...Array(24)].map((_, i) => {
                const portNum = i + 1;
                const portName = `Fa0/${portNum}`;
                const pc = pcs.find((p) => p.port === portName);
                const vlan = pc ? pc.vlan : 1;

                let badgeColor = 'bg-slate-800 text-slate-400 border-slate-700';
                if (vlan === 10) badgeColor = 'bg-emerald-900/80 text-emerald-300 border-emerald-500';
                if (vlan === 20) badgeColor = 'bg-blue-900/80 text-blue-300 border-blue-500';

                return (
                  <div
                    key={portName}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded border flex flex-col items-center justify-center font-mono text-[10px] ${badgeColor} transition relative`}
                    title={`Port ${portName} — VLAN ${vlan} ${pc ? `(${pc.name})` : ''}`}
                  >
                    <span>{portNum}</span>
                    {pc && (
                      <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Gigabit Uplink Trunk Ports */}
            <div className="flex gap-1 border-l border-slate-800 pl-3">
              <div className="w-8 h-8 rounded border border-purple-500 bg-purple-950/80 text-purple-300 flex flex-col items-center justify-center font-mono text-[9px]" title="Gi0/1 - 802.1Q Trunk to Core Router">
                <span>G1</span>
                <span className="text-[7px]">TRK</span>
              </div>
              <div className="w-8 h-8 rounded border border-purple-500 bg-purple-950/80 text-purple-300 flex flex-col items-center justify-center font-mono text-[9px]" title="Gi0/2 - 802.1Q Trunk Link">
                <span>G2</span>
                <span className="text-[7px]">TRK</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Connected Workstations & VLAN Port Management */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
        <h3 className="font-bold text-slate-800 text-sm sm:text-base mb-3 flex items-center gap-2">
          <Laptop className="w-4 h-4 text-[#0284c7]" />
          Connected Department Workstations & Access Port Mapping
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {pcs.map((pc) => (
            <div
              key={pc.id}
              className={`p-4 rounded-xl border-2 transition ${
                pc.vlan === 10
                  ? 'border-emerald-300 bg-emerald-50/40'
                  : pc.vlan === 20
                  ? 'border-blue-300 bg-blue-50/40'
                  : 'border-slate-300 bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-slate-800">{pc.name}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-slate-200 font-bold">
                  {pc.port}
                </span>
              </div>

              <div className="text-xs font-mono text-slate-600 mb-3">IP: {pc.ip}</div>

              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                  Assigned VLAN:
                </label>
                <select
                  value={pc.vlan}
                  onChange={(e) => handleVlanChange(pc.id, parseInt(e.target.value, 10))}
                  className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-300 bg-white cursor-pointer focus:outline-hidden focus:border-[#0284c7]"
                >
                  <option value={10}>VLAN 10 (Faculty / Exam)</option>
                  <option value={20}>VLAN 20 (Students / Labs)</option>
                  <option value={1}>VLAN 1 (Default Management)</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Interactive Traffic Isolation & Ping Tester */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            Layer 2 Traffic Isolation & Ping Reachability Test
          </h3>
          <span className="text-xs text-slate-500 font-mono">Simulates 802.1Q Tag Filtering</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div>
            <label className="text-xs text-slate-600 font-bold block mb-1">Source Host:</label>
            <select
              value={sourcePcId}
              onChange={(e) => setSourcePcId(parseInt(e.target.value, 10))}
              className="text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 bg-white"
            >
              {pcs.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (VLAN {p.vlan})
                </option>
              ))}
            </select>
          </div>

          <div className="pt-5 text-slate-400">
            <ArrowRight className="w-5 h-5" />
          </div>

          <div>
            <label className="text-xs text-slate-600 font-bold block mb-1">Destination Host:</label>
            <select
              value={destPcId}
              onChange={(e) => setDestPcId(parseInt(e.target.value, 10))}
              className="text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 bg-white"
            >
              {pcs.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (VLAN {p.vlan})
                </option>
              ))}
            </select>
          </div>

          <div className="pt-5">
            <button
              onClick={runPingSimulation}
              disabled={isSimulatingPing}
              className="px-4 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold text-xs rounded-lg transition shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5" />
              {isSimulatingPing ? 'Transmitting ICMP...' : 'Execute Ping Test'}
            </button>
          </div>
        </div>

        {/* Ping Result Banner */}
        {pingResult && (
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 transition animate-in fade-in ${
              pingResult.success
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            {pingResult.success ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1 text-xs leading-relaxed">
              <span className="font-bold text-sm block">
                {pingResult.success ? 'ICMP Packet Delivered Successfully' : 'Packet Dropped by Switch: Cross-VLAN Isolation'}
              </span>
              <p>{pingResult.message}</p>
            </div>
          </div>
        )}
      </div>

      {/* 4. Live Cisco IOS CLI Configuration Syntax */}
      <div className="bg-[#1e1e1e] border border-slate-800 rounded-xl p-4 text-white font-mono text-xs shadow-md">
        <div className="flex items-center gap-2 mb-2 text-slate-400">
          <Terminal className="w-4 h-4 text-sky-400" />
          <span>Equivalent Cisco IOS CLI Configuration Commands:</span>
        </div>
        <div className="space-y-1 text-emerald-300/90 pl-4 border-l-2 border-sky-500">
          <div>Switch# configure terminal</div>
          <div>Switch(config)# vlan 10</div>
          <div>Switch(config-vlan)# name Faculty_Exam</div>
          <div>Switch(config)# vlan 20</div>
          <div>Switch(config-vlan)# name Student_Labs</div>
          <div>Switch(config)# interface range FastEthernet 0/1 - 2</div>
          <div>Switch(config-if-range)# switchport mode access</div>
          <div>Switch(config-if-range)# switchport access vlan 10</div>
          <div>Switch(config)# interface range FastEthernet 0/3 - 4</div>
          <div>Switch(config-if-range)# switchport mode access</div>
          <div>Switch(config-if-range)# switchport access vlan 20</div>
          <div>Switch(config)# interface GigabitEthernet 0/1</div>
          <div>Switch(config-if)# switchport mode trunk</div>
          <div>Switch(config-if)# end</div>
          <div>Switch# show vlan brief</div>
        </div>
      </div>
    </div>
  );
}
