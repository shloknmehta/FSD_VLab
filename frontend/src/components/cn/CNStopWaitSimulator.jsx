import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Activity, AlertTriangle, CheckCircle2, Clock, Zap, ArrowRight } from 'lucide-react';

export default function CNStopWaitSimulator() {
  const [currentSeq, setCurrentSeq] = useState(0); // 0 or 1
  const [expectedAck, setExpectedAck] = useState(1);
  const [receiverExpectedSeq, setReceiverExpectedSeq] = useState(0);
  const [simulateFrameLoss, setSimulateFrameLoss] = useState(false);
  const [simulateAckLoss, setSimulateAckLoss] = useState(false);

  // Timing parameters
  const [tProp, setTProp] = useState(40); // ms
  const [tTrans, setTTrans] = useState(10); // ms
  const [timerProgress, setTimerProgress] = useState(0); // 0 to 100%
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [activePacketState, setActivePacketState] = useState(null); // 'sending_frame', 'frame_lost', 'sending_ack', 'ack_lost', 'timeout'

  // Statistics
  const [stats, setStats] = useState({
    sent: 0,
    delivered: 0,
    retransmissions: 0,
    lost: 0,
  });

  const [eventLog, setEventLog] = useState([
    { time: '0.00s', text: 'Stop-and-Wait ARQ Initialized. Ready to transmit Frame 0.', type: 'info' },
  ]);

  const addLog = (text, type = 'info') => {
    setEventLog((prev) => [
      { time: `${(Date.now() / 1000 % 100).toFixed(2)}s`, text, type },
      ...prev.slice(0, 15),
    ]);
  };

  // Channel Efficiency Formula
  const efficiency = ((tTrans / (tTrans + 2 * tProp)) * 100).toFixed(1);

  const handleSendFrame = () => {
    if (isTransmitting) return;

    setIsTransmitting(true);
    setActivePacketState('sending_frame');
    setStats((prev) => ({ ...prev, sent: prev.sent + 1 }));
    addLog(`[Sender] Transmitting Frame ${currentSeq}... Started Retransmission Timer.`, 'info');

    // Timer countdown effect
    let progress = 0;
    const timerInterval = setInterval(() => {
      progress += 10;
      setTimerProgress(progress);
      if (progress >= 100) clearInterval(timerInterval);
    }, 100);

    // Simulation logic
    setTimeout(() => {
      if (simulateFrameLoss) {
        // Frame Loss
        setActivePacketState('frame_lost');
        setStats((prev) => ({ ...prev, lost: prev.lost + 1, retransmissions: prev.retransmissions + 1 }));
        addLog(`[Network] Frame ${currentSeq} was LOST due to channel noise! Receiver got nothing.`, 'error');

        setTimeout(() => {
          setActivePacketState('timeout');
          addLog(`[Sender] TIMEOUT EXPIRED! No ACK received. Retransmitting Frame ${currentSeq}...`, 'warn');
          setIsTransmitting(false);
          setTimerProgress(0);
        }, 1000);
      } else {
        // Frame Reaches Receiver
        if (currentSeq === receiverExpectedSeq) {
          // Normal valid reception
          setReceiverExpectedSeq((prev) => (prev === 0 ? 1 : 0));
          setStats((prev) => ({ ...prev, delivered: prev.delivered + 1 }));
          addLog(`[Receiver] Frame ${currentSeq} received successfully. Generating ACK ${1 - currentSeq}...`, 'success');
        } else {
          // Duplicate frame reception (due to prior ACK loss)
          addLog(`[Receiver] Duplicate Frame ${currentSeq} received! Discarding payload; resending ACK ${1 - currentSeq}...`, 'warn');
        }

        // ACK Return Phase
        setTimeout(() => {
          if (simulateAckLoss) {
            // ACK is lost
            setActivePacketState('ack_lost');
            setStats((prev) => ({ ...prev, lost: prev.lost + 1, retransmissions: prev.retransmissions + 1 }));
            addLog(`[Network] ACK ${1 - currentSeq} was LOST in transit!`, 'error');

            setTimeout(() => {
              setActivePacketState('timeout');
              addLog(`[Sender] TIMEOUT EXPIRED! No ACK received. Retransmitting Frame ${currentSeq}...`, 'warn');
              setIsTransmitting(false);
              setTimerProgress(0);
            }, 1000);
          } else {
            // ACK arrives successfully
            setActivePacketState('ack_received');
            const nextFrameSeq = currentSeq === 0 ? 1 : 0;
            setCurrentSeq(nextFrameSeq);
            setExpectedAck(nextFrameSeq === 0 ? 1 : 0);
            addLog(`[Sender] ACK ${1 - currentSeq} received! Timer cancelled. Frame delivery complete. Next is Frame ${nextFrameSeq}.`, 'success');
            setIsTransmitting(false);
            setTimerProgress(0);
          }
        }, 800);
      }
    }, 800);
  };

  const handleReset = () => {
    setCurrentSeq(0);
    setExpectedAck(1);
    setReceiverExpectedSeq(0);
    setIsTransmitting(false);
    setActivePacketState(null);
    setTimerProgress(0);
    setStats({ sent: 0, delivered: 0, retransmissions: 0, lost: 0 });
    setEventLog([{ time: '0.00s', text: 'Simulation reset. Ready for Frame 0.', type: 'info' }]);
  };

  return (
    <div className="space-y-6">
      {/* 1. Protocol Transmission Canvas & State Diagram */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-sky-400" />
            <h3 className="font-bold text-sm sm:text-base">
              Time-Space Sequence Diagram & Animated Frame Channel
            </h3>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="font-mono text-slate-300">
              Channel Efficiency: <span className="text-emerald-400 font-bold">{efficiency}%</span>
            </span>
          </div>
        </div>

        {/* Visual Sender & Receiver Stations */}
        <div className="relative py-8 px-6 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
          {/* Sender Station */}
          <div className="flex flex-col items-center z-10 w-28 text-center">
            <div className="w-14 h-14 rounded-2xl bg-sky-950 border-2 border-sky-400 flex flex-col items-center justify-center shadow-lg shadow-sky-500/20">
              <span className="text-[10px] font-bold text-sky-400">TX SENDER</span>
              <span className="text-xs font-mono font-extrabold text-white">Seq {currentSeq}</span>
            </div>
            <span className="text-xs font-semibold mt-2 text-slate-300">Station A</span>
            <span className="text-[10px] text-slate-500 font-mono">Window Size: 1</span>
          </div>

          {/* Dynamic Traveling Packet Animation */}
          <div className="flex-1 relative h-16 mx-4 flex items-center">
            {/* Guide Rail */}
            <div className="w-full h-0.5 bg-slate-800 border-dashed border-t border-slate-700"></div>

            {/* Traveling Data Frame */}
            {activePacketState === 'sending_frame' && (
              <div className="absolute top-1/2 -translate-y-1/2 px-3 py-1 bg-sky-500 text-slate-950 text-xs font-mono font-extrabold rounded-md shadow-lg shadow-sky-400/50 animate-pulse" style={{ left: '50%', transform: 'translate(-50%, -50%)' }}>
                Frame {currentSeq} →
              </div>
            )}

            {/* Corrupted/Lost Frame */}
            {activePacketState === 'frame_lost' && (
              <div className="absolute top-1/2 -translate-y-1/2 px-3 py-1 bg-red-600 text-white text-xs font-mono font-bold rounded-md shadow-lg shadow-red-500/50" style={{ left: '50%', transform: 'translate(-50%, -50%)' }}>
                ✖ Frame {currentSeq} Dropped!
              </div>
            )}

            {/* Traveling ACK Frame */}
            {activePacketState === 'sending_ack' && (
              <div className="absolute top-1/2 -translate-y-1/2 px-3 py-1 bg-emerald-400 text-slate-950 text-xs font-mono font-extrabold rounded-md shadow-lg shadow-emerald-400/50 animate-pulse" style={{ left: '50%', transform: 'translate(-50%, -50%)' }}>
                ← ACK {1 - currentSeq}
              </div>
            )}

            {/* Lost ACK */}
            {activePacketState === 'ack_lost' && (
              <div className="absolute top-1/2 -translate-y-1/2 px-3 py-1 bg-amber-600 text-white text-xs font-mono font-bold rounded-md shadow-lg shadow-amber-500/50" style={{ left: '50%', transform: 'translate(-50%, -50%)' }}>
                ✖ ACK {1 - currentSeq} Dropped!
              </div>
            )}

            {/* Timeout Banner */}
            {activePacketState === 'timeout' && (
              <div className="absolute top-1/2 -translate-y-1/2 px-3 py-1 bg-purple-600 text-white text-xs font-mono font-bold rounded-md" style={{ left: '50%', transform: 'translate(-50%, -50%)' }}>
                ⏳ Timer Timeout!
              </div>
            )}
          </div>

          {/* Receiver Station */}
          <div className="flex flex-col items-center z-10 w-28 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950 border-2 border-emerald-400 flex flex-col items-center justify-center shadow-lg shadow-emerald-500/20">
              <span className="text-[10px] font-bold text-emerald-400">RX RECEIVER</span>
              <span className="text-xs font-mono font-extrabold text-white">Exp {receiverExpectedSeq}</span>
            </div>
            <span className="text-xs font-semibold mt-2 text-slate-300">Station B</span>
            <span className="text-[10px] text-slate-500 font-mono">Window Size: 1</span>
          </div>
        </div>

        {/* Retransmission Timer Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Sender Timeout Timer</span>
            <span>{timerProgress}% Elapsed</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-100 ${
                timerProgress >= 90 ? 'bg-red-500' : 'bg-sky-400'
              }`}
              style={{ width: `${timerProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Controls & Fault Injection Workbench */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            Interactive Transmission & Error Injection Controls
          </h3>
          <button
            onClick={handleReset}
            className="text-xs px-2.5 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 transition flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Simulator
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-5">
          <button
            onClick={handleSendFrame}
            disabled={isTransmitting}
            className="px-5 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold text-xs sm:text-sm rounded-xl transition shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            {isTransmitting ? 'Packet in Flight...' : `Transmit Frame ${currentSeq}`}
          </button>

          {/* Fault injection checkboxes */}
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer bg-white px-3 py-2 rounded-lg border border-slate-300">
            <input
              type="checkbox"
              checked={simulateFrameLoss}
              onChange={(e) => {
                setSimulateFrameLoss(e.target.checked);
                if (e.target.checked) setSimulateAckLoss(false);
              }}
              className="accent-red-600 w-4 h-4"
            />
            <span>Simulate Frame Loss (Data Drop)</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer bg-white px-3 py-2 rounded-lg border border-slate-300">
            <input
              type="checkbox"
              checked={simulateAckLoss}
              onChange={(e) => {
                setSimulateAckLoss(e.target.checked);
                if (e.target.checked) setSimulateFrameLoss(false);
              }}
              className="accent-amber-600 w-4 h-4"
            />
            <span>Simulate ACK Loss (Duplicate Test)</span>
          </label>
        </div>

        {/* Latency Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
          <div>
            <div className="flex justify-between text-xs text-slate-700 font-semibold mb-1">
              <span>Propagation Delay (T_prop):</span>
              <span className="font-mono text-[#0284c7]">{tProp} ms</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={tProp}
              onChange={(e) => setTProp(parseInt(e.target.value, 10))}
              className="w-full accent-[#0284c7]"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-700 font-semibold mb-1">
              <span>Transmission Delay (T_trans):</span>
              <span className="font-mono text-[#0284c7]">{tTrans} ms</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={tTrans}
              onChange={(e) => setTTrans(parseInt(e.target.value, 10))}
              className="w-full accent-[#0284c7]"
            />
          </div>
        </div>
      </div>

      {/* 3. Statistics & Protocol Event Log */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric Cards */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
          <h4 className="text-xs uppercase font-bold text-slate-400">Live Channel Telemetry</h4>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2 bg-slate-50 rounded-lg">
              <span className="text-[10px] text-slate-500 block">Sent</span>
              <span className="text-base font-bold text-slate-800">{stats.sent}</span>
            </div>
            <div className="p-2 bg-emerald-50 rounded-lg">
              <span className="text-[10px] text-emerald-700 block">Delivered</span>
              <span className="text-base font-bold text-emerald-700">{stats.delivered}</span>
            </div>
            <div className="p-2 bg-amber-50 rounded-lg">
              <span className="text-[10px] text-amber-700 block">Retransmits</span>
              <span className="text-base font-bold text-amber-700">{stats.retransmissions}</span>
            </div>
            <div className="p-2 bg-rose-50 rounded-lg">
              <span className="text-[10px] text-rose-700 block">Lost</span>
              <span className="text-base font-bold text-rose-700">{stats.lost}</span>
            </div>
          </div>
        </div>

        {/* Live Event Log */}
        <div className="md:col-span-2 bg-[#1e1e1e] border border-slate-800 rounded-xl p-4 text-white font-mono text-xs shadow-md">
          <div className="text-slate-400 text-xs mb-2 font-bold flex items-center justify-between">
            <span>Protocol State Event Logger:</span>
            <span className="text-[10px] text-slate-500 font-normal">Real-time ARQ trace</span>
          </div>
          <div className="h-32 overflow-y-auto space-y-1.5 pr-2">
            {eventLog.map((ev, i) => (
              <div
                key={i}
                className={`leading-relaxed ${
                  ev.type === 'error'
                    ? 'text-rose-400'
                    : ev.type === 'warn'
                    ? 'text-amber-300'
                    : ev.type === 'success'
                    ? 'text-emerald-300'
                    : 'text-slate-300'
                }`}
              >
                <span className="text-slate-500">[{ev.time}]</span> {ev.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
