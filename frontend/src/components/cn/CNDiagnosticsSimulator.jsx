import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, Play, RotateCcw, Activity, Server, Laptop, Wifi, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

export default function CNDiagnosticsSimulator() {
  const [inputCmd, setInputCmd] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', text: 'K. J. Somaiya School of Engineering — Computer Networks Lab (216U01L502)' },
    { type: 'system', text: 'Terminal Ready. Type "help" or click one of the quick test buttons below.' },
  ]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeAnimation, setActiveAnimation] = useState(null); // 'ping', 'tracert', etc.
  const [animationStep, setAnimationStep] = useState(0);
  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const executeCommand = (rawCommand) => {
    const trimmed = rawCommand.trim();
    if (!trimmed || isExecuting) return;

    // Append user input
    setTerminalHistory((prev) => [...prev, { type: 'input', text: `user@somaiya-vlab:~$ ${trimmed}` }]);
    setIsExecuting(true);
    setInputCmd('');

    const tokens = trimmed.split(/\s+/);
    const cmd = tokens[0].toLowerCase();
    const arg = tokens[1] || '';

    if (cmd === 'clear' || cmd === 'cls') {
      setTerminalHistory([]);
      setIsExecuting(false);
      return;
    }

    if (cmd === 'help') {
      setTimeout(() => {
        setTerminalHistory((prev) => [
          ...prev,
          { type: 'output', text: 'Available Diagnostic Utilities in this Workbench:' },
          { type: 'output', text: '  ping <target>       - Test Layer 3 ICMP echo reachability & latency' },
          { type: 'output', text: '  tracert <target>    - Trace packet hops via TTL expiry (traceroute)' },
          { type: 'output', text: '  arp -a              - Inspect local ARP cache (IP-to-MAC table)' },
          { type: 'output', text: '  netstat -an         - Display active TCP/UDP sockets and port states' },
          { type: 'output', text: '  nslookup <domain>   - Query DNS servers for A/CNAME/MX records' },
          { type: 'output', text: '  ipconfig /all       - Dump full network interface configurations' },
          { type: 'output', text: '  clear               - Clear terminal screen' },
        ]);
        setIsExecuting(false);
      }, 200);
      return;
    }

    if (cmd === 'ping') {
      const target = arg || '192.168.1.1';
      setActiveAnimation('ping');
      setAnimationStep(1);

      let step = 0;
      const interval = setInterval(() => {
        step++;
        setAnimationStep(step);
        if (step === 1) {
          setTerminalHistory((prev) => [
            ...prev,
            { type: 'output', text: `Pinging ${target} with 32 bytes of data:` },
          ]);
        } else if (step <= 5) {
          if (target === '10.0.0.99') {
            setTerminalHistory((prev) => [
              ...prev,
              { type: 'error', text: 'Request timed out.' },
            ]);
          } else {
            const time = target.includes('somaiya') ? Math.floor(Math.random() * 12 + 18) : Math.floor(Math.random() * 3 + 1);
            setTerminalHistory((prev) => [
              ...prev,
              { type: 'output', text: `Reply from ${target}: bytes=32 time=${time}ms TTL=64` },
            ]);
          }
        } else {
          clearInterval(interval);
          if (target === '10.0.0.99') {
            setTerminalHistory((prev) => [
              ...prev,
              { type: 'output', text: `Ping statistics for ${target}:` },
              { type: 'output', text: '    Packets: Sent = 4, Received = 0, Lost = 4 (100% loss)' },
            ]);
          } else {
            setTerminalHistory((prev) => [
              ...prev,
              { type: 'output', text: `Ping statistics for ${target}:` },
              { type: 'output', text: '    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),' },
              { type: 'output', text: 'Approximate round trip times in milli-seconds:' },
              { type: 'output', text: '    Minimum = 1ms, Maximum = 19ms, Average = 6ms' },
            ]);
          }
          setIsExecuting(false);
          setActiveAnimation(null);
        }
      }, 500);
      return;
    }

    if (cmd === 'tracert' || cmd === 'traceroute') {
      const target = arg || 'google.com';
      setActiveAnimation('tracert');
      setAnimationStep(1);

      setTerminalHistory((prev) => [
        ...prev,
        { type: 'output', text: `Tracing route to ${target} [142.250.193.206] over a maximum of 30 hops:` },
      ]);

      const hops = [
        { hop: 1, rtt: '<1 ms', ip: '192.168.1.1', host: 'gateway.somaiya.local' },
        { hop: 2, rtt: '4 ms', ip: '10.200.0.1', host: 'core-sw-kjsse.somaiya.edu' },
        { hop: 3, rtt: '8 ms', ip: '115.114.130.45', host: 'tata-isp-edge.mumbai.in' },
        { hop: 4, rtt: '14 ms', ip: '108.170.248.97', host: 'google-gw.mumbai.in' },
        { hop: 5, rtt: '16 ms', ip: '142.250.193.206', host: 'bom07s29-in-f14.1e100.net' },
      ];

      let idx = 0;
      const interval = setInterval(() => {
        if (idx < hops.length) {
          const h = hops[idx];
          setAnimationStep(idx + 1);
          setTerminalHistory((prev) => [
            ...prev,
            { type: 'output', text: `  ${h.hop}     ${h.rtt}     ${h.rtt}     ${h.rtt}  ${h.host} [${h.ip}]` },
          ]);
          idx++;
        } else {
          clearInterval(interval);
          setTerminalHistory((prev) => [
            ...prev,
            { type: 'output', text: 'Trace complete.' },
          ]);
          setIsExecuting(false);
          setActiveAnimation(null);
        }
      }, 600);
      return;
    }

    if (cmd === 'arp') {
      setTimeout(() => {
        setTerminalHistory((prev) => [
          ...prev,
          { type: 'output', text: 'Interface: 192.168.1.105 --- 0x14' },
          { type: 'output', text: '  Internet Address      Physical Address      Type' },
          { type: 'output', text: '  192.168.1.1           a4-bb-6d-38-f1-02     dynamic' },
          { type: 'output', text: '  192.168.1.15          3c-52-82-99-1a-bb     dynamic' },
          { type: 'output', text: '  192.168.1.20          70-85-c2-44-12-88     dynamic' },
          { type: 'output', text: '  192.168.1.255         ff-ff-ff-ff-ff-ff     static' },
          { type: 'output', text: '  224.0.0.22            01-00-5e-00-00-16     static' },
        ]);
        setIsExecuting(false);
      }, 300);
      return;
    }

    if (cmd === 'netstat') {
      setTimeout(() => {
        setTerminalHistory((prev) => [
          ...prev,
          { type: 'output', text: 'Active Connections' },
          { type: 'output', text: '  Proto  Local Address          Foreign Address        State' },
          { type: 'output', text: '  TCP    0.0.0.0:80             0.0.0.0:0              LISTENING' },
          { type: 'output', text: '  TCP    0.0.0.0:443            0.0.0.0:0              LISTENING' },
          { type: 'output', text: '  TCP    192.168.1.105:5173     127.0.0.1:8000         ESTABLISHED' },
          { type: 'output', text: '  TCP    192.168.1.105:54210    142.250.193.206:443    ESTABLISHED' },
          { type: 'output', text: '  TCP    192.168.1.105:54215    104.26.12.33:443       TIME_WAIT' },
          { type: 'output', text: '  UDP    0.0.0.0:53             *:*' },
        ]);
        setIsExecuting(false);
      }, 300);
      return;
    }

    if (cmd === 'nslookup') {
      const domain = arg || 'somaiya.edu';
      setTimeout(() => {
        setTerminalHistory((prev) => [
          ...prev,
          { type: 'output', text: 'Server:  dns.google' },
          { type: 'output', text: 'Address:  8.8.8.8' },
          { type: 'output', text: '' },
          { type: 'output', text: `Non-authoritative answer:` },
          { type: 'output', text: `Name:    ${domain}` },
          { type: 'output', text: `Address: 104.21.32.18` },
          { type: 'output', text: `Aliases: www.${domain}` },
        ]);
        setIsExecuting(false);
      }, 400);
      return;
    }

    if (cmd === 'ipconfig' || cmd === 'ifconfig') {
      setTimeout(() => {
        setTerminalHistory((prev) => [
          ...prev,
          { type: 'output', text: 'Windows IP Configuration' },
          { type: 'output', text: 'Ethernet adapter Ethernet 1:' },
          { type: 'output', text: '   Connection-specific DNS Suffix  . : somaiya.edu' },
          { type: 'output', text: '   Link-local IPv6 Address . . . . . : fe80::d922:b14a:6512:c099%14' },
          { type: 'output', text: '   IPv4 Address. . . . . . . . . . . : 192.168.1.105' },
          { type: 'output', text: '   Subnet Mask . . . . . . . . . . . : 255.255.255.0 (/24)' },
          { type: 'output', text: '   Default Gateway . . . . . . . . . : 192.168.1.1' },
          { type: 'output', text: '   DHCP Server . . . . . . . . . . . : 192.168.1.1' },
          { type: 'output', text: '   DNS Servers . . . . . . . . . . . : 8.8.8.8, 1.1.1.1' },
          { type: 'output', text: '   Physical Address (MAC)  . . . . . : 00-1A-2B-3C-4D-5E' },
        ]);
        setIsExecuting(false);
      }, 300);
      return;
    }

    // Default: unrecognized command
    setTimeout(() => {
      setTerminalHistory((prev) => [
        ...prev,
        { type: 'error', text: `'${cmd}' is not recognized as an internal or external command. Type "help" for a list of valid commands.` },
      ]);
      setIsExecuting(false);
    }, 200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputCmd);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls & Preset Commands */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#0284c7]" />
            <span className="font-bold text-slate-800 text-sm sm:text-base">Quick Network Diagnostic Actions</span>
          </div>
          <button
            onClick={() => setTerminalHistory([])}
            className="text-xs px-2.5 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 transition flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear Terminal
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => executeCommand('ping 192.168.1.1')}
            disabled={isExecuting}
            className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:border-[#0284c7] hover:text-[#0284c7] font-mono transition shadow-2xs cursor-pointer disabled:opacity-50"
          >
            ping 192.168.1.1 (Gateway)
          </button>
          <button
            onClick={() => executeCommand('ping somaiya.edu')}
            disabled={isExecuting}
            className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:border-[#0284c7] hover:text-[#0284c7] font-mono transition shadow-2xs cursor-pointer disabled:opacity-50"
          >
            ping somaiya.edu (External)
          </button>
          <button
            onClick={() => executeCommand('ping 10.0.0.99')}
            disabled={isExecuting}
            className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-rose-600 hover:border-rose-400 font-mono transition shadow-2xs cursor-pointer disabled:opacity-50"
          >
            ping 10.0.0.99 (Simulate Loss)
          </button>
          <button
            onClick={() => executeCommand('tracert google.com')}
            disabled={isExecuting}
            className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:border-[#0284c7] hover:text-[#0284c7] font-mono transition shadow-2xs cursor-pointer disabled:opacity-50"
          >
            tracert google.com
          </button>
          <button
            onClick={() => executeCommand('arp -a')}
            disabled={isExecuting}
            className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:border-[#0284c7] hover:text-[#0284c7] font-mono transition shadow-2xs cursor-pointer disabled:opacity-50"
          >
            arp -a
          </button>
          <button
            onClick={() => executeCommand('netstat -an')}
            disabled={isExecuting}
            className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:border-[#0284c7] hover:text-[#0284c7] font-mono transition shadow-2xs cursor-pointer disabled:opacity-50"
          >
            netstat -an
          </button>
          <button
            onClick={() => executeCommand('nslookup somaiya.edu')}
            disabled={isExecuting}
            className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:border-[#0284c7] hover:text-[#0284c7] font-mono transition shadow-2xs cursor-pointer disabled:opacity-50"
          >
            nslookup somaiya.edu
          </button>
          <button
            onClick={() => executeCommand('ipconfig /all')}
            disabled={isExecuting}
            className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:border-[#0284c7] hover:text-[#0284c7] font-mono transition shadow-2xs cursor-pointer disabled:opacity-50"
          >
            ipconfig /all
          </button>
        </div>
      </div>

      {/* Visual Network Topology & Packet Journey */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#0284c7]" />
            Live Packet Traversal & Subnet Diagram
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            {activeAnimation ? `Running: ${activeAnimation.toUpperCase()}` : 'Network Idle'}
          </span>
        </div>

        {/* Dynamic Topology Graphic */}
        <div className="relative py-8 px-4 bg-slate-900 rounded-xl overflow-hidden flex items-center justify-between text-white">
          {/* Host PC */}
          <div className="flex flex-col items-center z-10 text-center">
            <div className={`p-3 rounded-full border-2 transition ${animationStep >= 1 ? 'border-sky-400 bg-sky-950/80 shadow-lg shadow-sky-500/20' : 'border-slate-700 bg-slate-800'}`}>
              <Laptop className="w-6 h-6 text-sky-400" />
            </div>
            <span className="text-xs font-semibold mt-2">Student PC</span>
            <span className="text-[10px] text-slate-400 font-mono">192.168.1.105</span>
          </div>

          {/* Connection Line 1 */}
          <div className="flex-1 h-0.5 bg-slate-700 relative mx-2">
            {activeAnimation && (
              <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-md shadow-cyan-400 animate-pulse" style={{ left: `${Math.min(100, animationStep * 30)}%` }} />
            )}
          </div>

          {/* Switch */}
          <div className="flex flex-col items-center z-10 text-center">
            <div className={`p-3 rounded-full border-2 transition ${animationStep >= 2 ? 'border-indigo-400 bg-indigo-950/80' : 'border-slate-700 bg-slate-800'}`}>
              <Server className="w-6 h-6 text-indigo-400" />
            </div>
            <span className="text-xs font-semibold mt-2">KJSSE Switch</span>
            <span className="text-[10px] text-slate-400 font-mono">VLAN 1</span>
          </div>

          {/* Connection Line 2 */}
          <div className="flex-1 h-0.5 bg-slate-700 relative mx-2">
            {activeAnimation && animationStep >= 2 && (
              <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-emerald-400 shadow-md shadow-emerald-400 animate-pulse" style={{ left: `${Math.min(100, (animationStep - 1) * 35)}%` }} />
            )}
          </div>

          {/* Gateway Router */}
          <div className="flex flex-col items-center z-10 text-center">
            <div className={`p-3 rounded-full border-2 transition ${animationStep >= 3 ? 'border-amber-400 bg-amber-950/80' : 'border-slate-700 bg-slate-800'}`}>
              <Wifi className="w-6 h-6 text-amber-400" />
            </div>
            <span className="text-xs font-semibold mt-2">Gateway Router</span>
            <span className="text-[10px] text-slate-400 font-mono">192.168.1.1</span>
          </div>

          {/* Connection Line 3 */}
          <div className="flex-1 h-0.5 bg-slate-700 relative mx-2">
            {activeAnimation && animationStep >= 4 && (
              <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-purple-400 shadow-md shadow-purple-400 animate-pulse" style={{ left: `${Math.min(100, (animationStep - 2) * 40)}%` }} />
            )}
          </div>

          {/* Remote Cloud / Server */}
          <div className="flex flex-col items-center z-10 text-center">
            <div className={`p-3 rounded-full border-2 transition ${animationStep >= 5 ? 'border-emerald-400 bg-emerald-950/80' : 'border-slate-700 bg-slate-800'}`}>
              <Server className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="text-xs font-semibold mt-2">Target Host</span>
            <span className="text-[10px] text-slate-400 font-mono">somaiya.edu</span>
          </div>
        </div>
      </div>

      {/* Interactive Terminal Emulator */}
      <div className="bg-[#1e1e1e] border border-slate-800 rounded-xl shadow-xl overflow-hidden font-mono text-sm">
        {/* Terminal Header */}
        <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="text-xs text-slate-400 ml-2">bash - user@somaiya-vlab: ~ (Network CLI)</span>
          </div>
          <span className="text-[11px] text-slate-400">ICMP / ARP / DNS / Sockets</span>
        </div>

        {/* Terminal Body */}
        <div className="p-4 h-80 overflow-y-auto space-y-1.5 text-slate-200">
          {terminalHistory.map((item, idx) => {
            if (item.type === 'system') {
              return <div key={idx} className="text-slate-400 text-xs italic">{item.text}</div>;
            }
            if (item.type === 'input') {
              return <div key={idx} className="text-sky-300 font-semibold">{item.text}</div>;
            }
            if (item.type === 'error') {
              return <div key={idx} className="text-rose-400">{item.text}</div>;
            }
            return <div key={idx} className="text-emerald-300/90 whitespace-pre-wrap leading-relaxed">{item.text}</div>;
          })}
          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Command Input */}
        <div className="bg-[#252526] px-4 py-2.5 border-t border-slate-700 flex items-center gap-2">
          <span className="text-sky-400 font-bold shrink-0">user@somaiya-vlab:~$</span>
          <input
            type="text"
            value={inputCmd}
            onChange={(e) => setInputCmd(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isExecuting}
            placeholder={isExecuting ? 'Executing command...' : 'Type a command (e.g. ping 192.168.1.1, tracert google.com, arp -a)'}
            className="flex-1 bg-transparent text-white focus:outline-hidden text-sm font-mono placeholder:text-slate-500"
          />
          <button
            onClick={() => executeCommand(inputCmd)}
            disabled={!inputCmd.trim() || isExecuting}
            className="p-1.5 rounded bg-[#0284c7] hover:bg-[#0369a1] text-white disabled:opacity-40 transition cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
