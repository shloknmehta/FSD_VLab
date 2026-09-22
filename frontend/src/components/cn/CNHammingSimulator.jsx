import React, { useState } from 'react';
import { Cpu, ShieldCheck, AlertCircle, RefreshCw, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CNHammingSimulator() {
  // 4 Data bits: D1 (pos 3), D2 (pos 5), D3 (pos 6), D4 (pos 7)
  const [dataBits, setDataBits] = useState([1, 0, 1, 1]);
  // 7 Received bits (allows introducing errors)
  const [receivedBits, setReceivedBits] = useState([0, 1, 1, 0, 0, 1, 1]);
  const [hasInjectedError, setHasInjectedError] = useState(false);
  const [errorPosition, setErrorPosition] = useState(null);

  // Recompute Hamming parity bits whenever dataBits change
  const computeCodeword = (d) => {
    const d1 = d[0]; // pos 3
    const d2 = d[1]; // pos 5
    const d3 = d[2]; // pos 6
    const d4 = d[3]; // pos 7

    // Even parity calculations:
    const p1 = (d1 ^ d2 ^ d4); // Checks 1, 3, 5, 7
    const p2 = (d1 ^ d3 ^ d4); // Checks 2, 3, 6, 7
    const p4 = (d2 ^ d3 ^ d4); // Checks 4, 5, 6, 7

    // Codeword: [P1, P2, D1, P4, D2, D3, D4]
    return [p1, p2, d1, p4, d2, d3, d4];
  };

  const validCodeword = computeCodeword(dataBits);

  const handleToggleDataBit = (index) => {
    const updated = [...dataBits];
    updated[index] = updated[index] === 1 ? 0 : 1;
    setDataBits(updated);
    const newCodeword = computeCodeword(updated);
    setReceivedBits(newCodeword);
    setHasInjectedError(false);
    setErrorPosition(null);
  };

  const handleFlipReceivedBit = (posIndex) => {
    const updated = [...receivedBits];
    updated[posIndex] = updated[posIndex] === 1 ? 0 : 1;
    setReceivedBits(updated);
    setHasInjectedError(true);
    setErrorPosition(posIndex + 1); // 1-indexed
  };

  const handleInjectRandomError = () => {
    const randPos = Math.floor(Math.random() * 7);
    handleFlipReceivedBit(randPos);
  };

  const handleReset = () => {
    setReceivedBits([...validCodeword]);
    setHasInjectedError(false);
    setErrorPosition(null);
  };

  // Receiver Syndrome Calculation
  // r1..r7: 1-indexed indices in receivedBits are 0..6
  const r = receivedBits;
  const s1 = r[0] ^ r[2] ^ r[4] ^ r[6]; // Pos 1, 3, 5, 7
  const s2 = r[1] ^ r[2] ^ r[5] ^ r[6]; // Pos 2, 3, 6, 7
  const s4 = r[3] ^ r[4] ^ r[5] ^ r[6]; // Pos 4, 5, 6, 7

  const calculatedSyndromeDecimal = (s4 * 4) + (s2 * 2) + (s1 * 1);
  const isErrorDetected = calculatedSyndromeDecimal !== 0;

  // Corrected bits
  const correctedBits = [...receivedBits];
  if (isErrorDetected && calculatedSyndromeDecimal <= 7) {
    correctedBits[calculatedSyndromeDecimal - 1] = correctedBits[calculatedSyndromeDecimal - 1] === 1 ? 0 : 1;
  }

  // Recovered data: D1 (pos 3), D2 (pos 5), D3 (pos 6), D4 (pos 7)
  const recoveredData = [correctedBits[2], correctedBits[4], correctedBits[5], correctedBits[6]];

  return (
    <div className="space-y-6">
      {/* 1. Transmitter Data Input */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#0284c7]" />
            <h3 className="font-bold text-slate-800 text-sm sm:text-base">
              Transmitter: 4-Bit Data Word Input & Parity Encoding
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">Even Parity Convention</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 mb-4">
          Click any data bit below to toggle its value. The 3 parity bits (P1, P2, P4) are dynamically computed to form the 7-bit codeword.
        </p>

        {/* Data bit selectors */}
        <div className="flex flex-wrap items-center gap-3">
          {['D1 (Bit 3)', 'D2 (Bit 5)', 'D3 (Bit 6)', 'D4 (Bit 7)'].map((label, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-[11px] font-bold text-slate-500 mb-1">{label}</span>
              <button
                onClick={() => handleToggleDataBit(idx)}
                className={`w-12 h-12 rounded-xl text-lg font-mono font-bold transition flex items-center justify-center cursor-pointer shadow-xs ${
                  dataBits[idx] === 1
                    ? 'bg-sky-600 text-white hover:bg-sky-700'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {dataBits[idx]}
              </button>
            </div>
          ))}

          <div className="ml-auto flex items-center gap-2 pt-4 sm:pt-0">
            <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 text-xs text-sky-900 font-mono space-y-1">
              <div>P1 = D1 ⊕ D2 ⊕ D4 = <span className="font-bold text-[#0284c7]">{validCodeword[0]}</span></div>
              <div>P2 = D1 ⊕ D3 ⊕ D4 = <span className="font-bold text-[#0284c7]">{validCodeword[1]}</span></div>
              <div>P4 = D2 ⊕ D3 ⊕ D4 = <span className="font-bold text-[#0284c7]">{validCodeword[3]}</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 7-Bit Codeword Transmission & Noisy Channel */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-800 text-sm sm:text-base">
              Noisy Channel Simulation: 7-Bit Codeword Grid
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleInjectRandomError}
              className="text-xs px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold transition cursor-pointer flex items-center gap-1 shadow-2xs"
            >
              <Zap className="w-3.5 h-3.5" />
              Flip Random Bit
            </button>
            <button
              onClick={handleReset}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition cursor-pointer flex items-center gap-1 border border-slate-300"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Channel
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-4">
          Click any transmitted bit below to inject a single-bit noise error and watch the receiver calculate the syndrome.
        </p>

        {/* 7-Bit Interactive Table */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center overflow-x-auto pb-2">
          {[
            { pos: 1, type: 'Parity P1', check: '1, 3, 5, 7' },
            { pos: 2, type: 'Parity P2', check: '2, 3, 6, 7' },
            { pos: 3, type: 'Data D1', check: 'Payload' },
            { pos: 4, type: 'Parity P4', check: '4, 5, 6, 7' },
            { pos: 5, type: 'Data D2', check: 'Payload' },
            { pos: 6, type: 'Data D3', check: 'Payload' },
            { pos: 7, type: 'Data D4', check: 'Payload' },
          ].map((col, idx) => {
            const isFlipped = receivedBits[idx] !== validCodeword[idx];
            return (
              <div
                key={idx}
                onClick={() => handleFlipReceivedBit(idx)}
                className={`p-2 sm:p-3 rounded-xl border-2 transition cursor-pointer flex flex-col items-center justify-between select-none ${
                  isFlipped
                    ? 'border-red-500 bg-red-50/80 shadow-md shadow-red-200 animate-pulse'
                    : 'border-slate-200 bg-slate-50 hover:border-sky-300 hover:bg-sky-50/50'
                }`}
              >
                <span className="text-[10px] text-slate-400 font-mono">Pos {col.pos}</span>
                <span className={`text-[11px] font-bold ${col.type.startsWith('Parity') ? 'text-[#0284c7]' : 'text-slate-700'}`}>
                  {col.type.split(' ')[1]}
                </span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-lg font-extrabold my-1 ${
                  isFlipped ? 'bg-red-600 text-white' : 'bg-white text-slate-800 border border-slate-300'
                }`}>
                  {receivedBits[idx]}
                </div>
                {isFlipped && (
                  <span className="text-[9px] text-red-600 font-bold uppercase tracking-tight">Corrupted!</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Receiver Syndrome Evaluation & Auto-Correction */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm sm:text-base font-bold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Receiver: Syndrome Word Decoding & Forward Error Correction (FEC)
          </h3>
          <span className={`text-xs px-2.5 py-1 rounded font-bold ${
            isErrorDetected ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
          }`}>
            {isErrorDetected ? 'Error Detected' : 'Codeword Valid'}
          </span>
        </div>

        {/* Syndrome Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className="bg-slate-800/80 border border-slate-700 rounded-lg p-3">
            <div className="text-xs text-slate-400 mb-1">Syndrome Bit S1 (Checks 1, 3, 5, 7)</div>
            <div className="text-sm font-mono text-sky-300">
              {receivedBits[0]} ⊕ {receivedBits[2]} ⊕ {receivedBits[4]} ⊕ {receivedBits[6]} = <span className="text-lg font-bold text-white">{s1}</span>
            </div>
          </div>
          <div className="bg-slate-800/80 border border-slate-700 rounded-lg p-3">
            <div className="text-xs text-slate-400 mb-1">Syndrome Bit S2 (Checks 2, 3, 6, 7)</div>
            <div className="text-sm font-mono text-sky-300">
              {receivedBits[1]} ⊕ {receivedBits[2]} ⊕ {receivedBits[5]} ⊕ {receivedBits[6]} = <span className="text-lg font-bold text-white">{s2}</span>
            </div>
          </div>
          <div className="bg-slate-800/80 border border-slate-700 rounded-lg p-3">
            <div className="text-xs text-slate-400 mb-1">Syndrome Bit S4 (Checks 4, 5, 6, 7)</div>
            <div className="text-sm font-mono text-sky-300">
              {receivedBits[3]} ⊕ {receivedBits[4]} ⊕ {receivedBits[5]} ⊕ {receivedBits[6]} = <span className="text-lg font-bold text-white">{s4}</span>
            </div>
          </div>
        </div>

        {/* Diagnostic Outcome Banner */}
        <div className={`p-4 rounded-xl border flex items-start gap-3 ${
          isErrorDetected ? 'bg-red-950/40 border-red-800 text-red-200' : 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
        }`}>
          {isErrorDetected ? (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1">
            <div className="font-bold text-sm">
              Syndrome S = (S4 S2 S1)₂ = ({s4}{s2}{s1})₂ = Decimal {calculatedSyndromeDecimal}
            </div>
            <p className="text-xs leading-relaxed">
              {isErrorDetected ? (
                <>
                  Error localized precisely at <span className="font-bold text-amber-300">Bit Position {calculatedSyndromeDecimal}</span>.
                  The receiver inverted bit {calculatedSyndromeDecimal} from <span className="font-mono font-bold">{receivedBits[calculatedSyndromeDecimal - 1]}</span> back to <span className="font-mono font-bold text-emerald-300">{correctedBits[calculatedSyndromeDecimal - 1]}</span>, restoring the authentic message without retransmission!
                </>
              ) : (
                'All parity checks evaluated to 0. The received codeword matches the transmitter and is completely error-free.'
              )}
            </p>
          </div>
        </div>

        {/* Restored Data Bits */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-300">
            Successfully Recovered Data Payload (D1 D2 D3 D4):
          </div>
          <div className="flex gap-2">
            {recoveredData.map((b, i) => (
              <span key={i} className="px-3 py-1 bg-emerald-500 text-slate-950 font-mono font-extrabold rounded-md text-sm">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
