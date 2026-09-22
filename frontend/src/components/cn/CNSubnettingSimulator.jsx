import React, { useState } from 'react';
import { Layers, Network, Search, Hash, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function CNSubnettingSimulator() {
  const [baseIp, setBaseIp] = useState('192.168.10.0');
  const [cidrPrefix, setCidrPrefix] = useState(26); // Default /26
  const [testHostIp, setTestHostIp] = useState('192.168.10.75');

  // Compute Subnet Mask
  const getSubnetMask = (prefix) => {
    let mask = [];
    for (let i = 0; i < 4; i++) {
      const n = Math.min(Math.max(prefix - i * 8, 0), 8);
      mask.push(256 - Math.pow(2, 8 - n));
    }
    return mask;
  };

  const maskArray = getSubnetMask(cidrPrefix);
  const maskStr = maskArray.join('.');
  const hostBits = 32 - cidrPrefix;
  const totalHosts = Math.pow(2, hostBits);
  const usableHosts = Math.max(0, totalHosts - 2);

  // Parse Base IP
  const baseParts = baseIp.split('.').map((p) => parseInt(p, 10) || 0);
  const octetIndex = Math.floor((cidrPrefix - 1) / 8);
  const interestingOctetMask = maskArray[octetIndex] || 255;
  const blockSize = 256 - interestingOctetMask;

  // Generate Subnets
  const numSubnetsToDisplay = Math.min(8, Math.pow(2, (cidrPrefix % 8 === 0 ? 0 : cidrPrefix % 8)));
  const subnetsList = [];

  for (let i = 0; i < numSubnetsToDisplay; i++) {
    const startOctet = i * blockSize;
    if (startOctet > 255) break;

    const netIp = [...baseParts];
    netIp[octetIndex] = startOctet;

    const bcastIp = [...netIp];
    bcastIp[octetIndex] = startOctet + blockSize - 1;

    const firstHost = [...netIp];
    firstHost[3] = firstHost[3] + 1;

    const lastHost = [...bcastIp];
    lastHost[3] = lastHost[3] - 1;

    subnetsList.push({
      index: i + 1,
      network: netIp.join('.'),
      firstUsable: firstHost.join('.'),
      lastUsable: lastHost.join('.'),
      broadcast: bcastIp.join('.'),
    });
  }

  // Evaluate Test Host IP
  const testParts = testHostIp.trim().split('.').map((p) => parseInt(p, 10) || 0);
  let hostDiagnosis = null;

  if (testParts.length === 4 && testParts.every((p) => !isNaN(p) && p >= 0 && p <= 255)) {
    // Perform bitwise AND with mask
    const netParts = testParts.map((p, idx) => p & maskArray[idx]);
    const computedNet = netParts.join('.');
    const bcastParts = netParts.map((p, idx) => p | (255 - maskArray[idx]));
    const computedBcast = bcastParts.join('.');

    const isNetworkId = testHostIp.trim() === computedNet;
    const isBroadcastId = testHostIp.trim() === computedBcast;
    const isUsableHost = !isNetworkId && !isBroadcastId;

    hostDiagnosis = {
      computedNet,
      computedBcast,
      isNetworkId,
      isBroadcastId,
      isUsableHost,
    };
  }

  // Binary mask display string
  const binaryMask = maskArray
    .map((octet) => octet.toString(2).padStart(8, '0'))
    .join('.');

  return (
    <div className="space-y-6">
      {/* 1. Configuration Panel */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-2xs">
        <div className="flex items-center gap-2 mb-4">
          <Network className="w-5 h-5 text-[#0284c7]" />
          <h3 className="font-bold text-slate-800 text-sm sm:text-base">
            IPv4 CIDR Subnet Calculator & Address Allocator
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Base IP Input */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              Base Network IPv4 Address
            </label>
            <input
              type="text"
              value={baseIp}
              onChange={(e) => setBaseIp(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-mono text-slate-800 focus:outline-hidden focus:border-[#0284c7]"
              placeholder="e.g. 192.168.10.0"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Default Class C private address block (RFC 1918)
            </span>
          </div>

          {/* CIDR Prefix Selector */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-600">
                CIDR Prefix Length: <span className="text-[#0284c7] font-mono font-extrabold text-sm">/{cidrPrefix}</span>
              </label>
              <span className="text-xs font-mono text-slate-500">{maskStr}</span>
            </div>
            <input
              type="range"
              min="24"
              max="30"
              value={cidrPrefix}
              onChange={(e) => setCidrPrefix(parseInt(e.target.value, 10))}
              className="w-full accent-[#0284c7] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>/24 (254 hosts)</span>
              <span>/26 (62 hosts)</span>
              <span>/28 (14 hosts)</span>
              <span>/30 (2 hosts)</span>
            </div>
          </div>
        </div>

        {/* Calculated Subnet Metrics Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-200">
          <div className="bg-white border border-slate-200 rounded-lg p-3 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Subnet Mask</span>
            <span className="text-sm font-mono font-bold text-slate-800">{maskStr}</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-3 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Block Size (Magic #)</span>
            <span className="text-sm font-mono font-bold text-[#0284c7]">{blockSize} IPs</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-3 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total IP Addresses</span>
            <span className="text-sm font-mono font-bold text-slate-800">{totalHosts} (2^{hostBits})</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-3 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Usable Hosts / Subnet</span>
            <span className="text-sm font-mono font-bold text-emerald-600">{usableHosts}</span>
          </div>
        </div>

        {/* 32-Bit Binary Mask Representation */}
        <div className="mt-3 bg-slate-900 rounded-lg p-3 text-white font-mono text-xs flex flex-wrap items-center justify-between gap-2">
          <div className="text-slate-400">Binary Mask:</div>
          <div className="flex items-center gap-1">
            <span className="text-emerald-400 font-bold">{binaryMask.slice(0, cidrPrefix + Math.floor(cidrPrefix / 8))}</span>
            <span className="text-amber-400 font-bold">{binaryMask.slice(cidrPrefix + Math.floor(cidrPrefix / 8))}</span>
          </div>
          <div className="text-[10px] text-slate-400">
            <span className="text-emerald-400">■</span> {cidrPrefix} Network Bits | <span className="text-amber-400">■</span> {hostBits} Host Bits
          </div>
        </div>
      </div>

      {/* 2. Subnet Allocation Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
        <h3 className="font-bold text-slate-800 text-sm sm:text-base mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#0284c7]" />
          Generated Subnets Breakdown for {baseIp}/{cidrPrefix}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                <th className="py-2.5 px-3">Subnet #</th>
                <th className="py-2.5 px-3">Network ID</th>
                <th className="py-2.5 px-3">Usable Host Range</th>
                <th className="py-2.5 px-3">Directed Broadcast</th>
                <th className="py-2.5 px-3">Capacity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {subnetsList.map((sub) => (
                <tr key={sub.index} className="hover:bg-sky-50/50 transition">
                  <td className="py-2.5 px-3 font-bold text-slate-900">Subnet {sub.index}</td>
                  <td className="py-2.5 px-3 font-semibold text-[#0284c7]">{sub.network}</td>
                  <td className="py-2.5 px-3 text-slate-800">{sub.firstUsable} – {sub.lastUsable}</td>
                  <td className="py-2.5 px-3 text-amber-600 font-semibold">{sub.broadcast}</td>
                  <td className="py-2.5 px-3 text-emerald-700 font-semibold">{usableHosts} hosts</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Interactive Host IP Diagnostic Checker */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm sm:text-base font-bold flex items-center gap-2">
            <Search className="w-4 h-4 text-sky-400" />
            Interactive Host IP Identifier & Boundary Validator
          </h3>
          <span className="text-xs text-slate-400 font-mono">Bitwise AND Engine</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <input
            type="text"
            value={testHostIp}
            onChange={(e) => setTestHostIp(e.target.value)}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-mono text-white focus:outline-hidden focus:border-sky-400 w-64"
            placeholder="e.g. 192.168.10.75"
          />
          <div className="flex gap-2 text-xs">
            <button
              onClick={() => setTestHostIp('192.168.10.64')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition cursor-pointer"
            >
              Test .64 (Net ID)
            </button>
            <button
              onClick={() => setTestHostIp('192.168.10.75')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition cursor-pointer"
            >
              Test .75 (Valid Host)
            </button>
            <button
              onClick={() => setTestHostIp('192.168.10.127')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition cursor-pointer"
            >
              Test .127 (Broadcast)
            </button>
          </div>
        </div>

        {hostDiagnosis && (
          <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              {hostDiagnosis.isUsableHost && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              )}
              {hostDiagnosis.isNetworkId && (
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              )}
              {hostDiagnosis.isBroadcastId && (
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span className="font-bold text-sm text-white">
                {hostDiagnosis.isUsableHost && 'Status: Valid Assignable Host IP Address'}
                {hostDiagnosis.isNetworkId && 'Status: Reserved Network Identifier (Cannot assign to host)'}
                {hostDiagnosis.isBroadcastId && 'Status: Reserved Directed Broadcast Address (Cannot assign to host)'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono pt-2 text-slate-300">
              <div>Belongs to Network: <span className="font-bold text-sky-400">{hostDiagnosis.computedNet}/{cidrPrefix}</span></div>
              <div>Subnet Broadcast: <span className="font-bold text-amber-400">{hostDiagnosis.computedBcast}</span></div>
              <div>Bitwise AND Result: <span className="font-bold text-emerald-400">{hostDiagnosis.computedNet}</span></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
