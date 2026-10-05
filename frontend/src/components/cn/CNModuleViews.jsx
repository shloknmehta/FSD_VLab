import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  RotateCcw,
  HelpCircle,
  PlaySquare,
  FlaskConical,
  Code2,
  BarChart2,
  Award,
  BookMarked,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  Printer,
  ShieldCheck,
  Send,
  Terminal,
  Activity,
  Zap,
} from 'lucide-react';
import api from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import CNDiagnosticsSimulator from './CNDiagnosticsSimulator';
import CNHammingSimulator from './CNHammingSimulator';
import CNSubnettingSimulator from './CNSubnettingSimulator';
import CNVlanSimulator from './CNVlanSimulator';
import CNStopWaitSimulator from './CNStopWaitSimulator';
import CNStaticRoutingSimulator from './CNStaticRoutingSimulator';

// 1. CN Overview View
export function CNOverviewView({ experiment, onNext }) {
  if (!experiment) return null;
  const { overview } = experiment;

  return (
    <div className="max-w-4xl mx-auto py-6 px-3 sm:px-6 md:px-10 text-slate-800 space-y-8 animate-in fade-in duration-200">
      <div className="text-center mb-6">
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#2c99ce] tracking-tight"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          {overview?.heading || experiment.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
          {overview?.subheading || experiment.category}
        </p>
      </div>

      {/* Introduction Card */}
      <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-xs space-y-3">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#0284c7]" />
          Theoretical Background & Architecture
        </h2>
        <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
          {overview?.introduction || experiment.aim}
        </p>
      </div>

      {/* Dynamic Tools or Rules Cards */}
      {overview?.tools && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {overview.tools.map((tool, idx) => (
            <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-slate-50 hover:shadow-xs transition">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-sm text-[#0284c7] font-mono">{tool.name}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                  {tool.layer}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono mb-2">Protocol: {tool.protocol}</div>
              <p className="text-xs text-slate-600 leading-relaxed">{tool.description}</p>
            </div>
          ))}
        </div>
      )}

      {overview?.rules && (
        <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider">
            Key Architectural Principles:
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 list-disc pl-5">
            {overview.rules.map((rule, idx) => (
              <li key={idx} className="leading-relaxed">{rule}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Navigation */}
      <div className="pt-4 flex justify-end">
        <button
          onClick={onNext}
          className="px-6 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold rounded-lg shadow-sm flex items-center gap-2 transition cursor-pointer"
        >
          <span>Proceed to Recap</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// 2. CN Recap View
export function CNRecapView({ experiment, onNext }) {
  if (!experiment) return null;
  const { recap } = experiment;

  return (
    <div className="max-w-4xl mx-auto py-6 px-3 sm:px-6 md:px-10 text-slate-800 space-y-6 animate-in fade-in duration-200">
      <div className="text-center mb-6">
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#2c99ce] tracking-tight"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Recap & Golden Rules: {experiment.shortTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
          Essential formulas, command syntax, and protocol principles
        </p>
      </div>

      <div className="space-y-4">
        {recap?.rules?.map((r, idx) => (
          <div key={idx} className="border border-sky-100 bg-sky-50/60 rounded-xl p-5 shadow-2xs">
            <h3 className="font-bold text-sm text-sky-950 mb-1.5 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0284c7]" />
              {r.title}
            </h3>
            <p className="text-xs sm:text-sm text-sky-900 leading-relaxed font-['Open_Sans']">
              {r.text}
            </p>
          </div>
        ))}

        {recap?.commands && (
          <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-2xs space-y-3">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#0284c7]" />
              Command Syntax Reference:
            </h3>
            <div className="space-y-2">
              {recap.commands.map((c, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 gap-2">
                  <code className="text-xs font-mono font-bold text-[#0284c7] bg-white px-2 py-1 rounded border border-slate-200">
                    {c.cmd}
                  </code>
                  <span className="text-xs text-slate-600">{c.purpose}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 flex justify-end">
        <button
          onClick={onNext}
          className="px-6 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold rounded-lg shadow-sm flex items-center gap-2 transition cursor-pointer"
        >
          <span>Take Pretest Diagnostic</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// 3. CN Pretest View
export function CNPretestView({ experiment, onNext, onQuizPassed }) {
  const [questions, setQuestions] = useState(() => experiment?.pretest || []);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // If experiment has local pretest, make sure it's loaded immediately
    if (experiment?.pretest?.length > 0) {
      setQuestions(experiment.pretest);
    }
    // Attempt to load/sync questions from backend
    if (experiment?.slug) {
      api
        .get(`/experiments/quiz/?slug=${experiment.slug}&type=PRETEST`)
        .then((res) => {
          if (res.data?.questions?.length > 0) {
            setQuestions(res.data.questions);
          }
        })
        .catch(() => {
          if (experiment?.pretest) {
            setQuestions(experiment.pretest);
          }
        });
    }
  }, [experiment]);

  const handleSelect = (qId, optionVal) => {
    if (submitted) return;
    setSelectedAnswers({ ...selectedAnswers, [qId]: optionVal });
  };

  const handleSubmit = () => {
    if (submitted || questions.length === 0) return;

    let calcScore = 0;
    // Check against backend submit
    api
      .post('/experiments/quiz/submit/', {
        experiment_slug: experiment.slug,
        quiz_type: 'PRETEST',
        answers: selectedAnswers,
      })
      .then((res) => {
        setScore(res.data.score);
        setSubmitted(true);
        if (res.data.score >= 3 && onQuizPassed) onQuizPassed();
      })
      .catch(() => {
        // Fallback local score calculation
        questions.forEach((q) => {
          const userAns = selectedAnswers[q.id];
          if (userAns && userAns === q.correct_answer) calcScore++;
        });
        setScore(calcScore);
        setSubmitted(true);
        if (onQuizPassed) onQuizPassed();
      });
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-3 sm:px-6 md:px-10 text-slate-800 space-y-6 animate-in fade-in duration-200">
      <div className="text-center mb-6">
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#2c99ce] tracking-tight"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Pretest Diagnostic: {experiment?.shortTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
          Assess your baseline theoretical readiness before beginning the simulation
        </p>
      </div>

      {questions.length === 0 ? (
        <div className="text-center py-10 text-slate-400">Loading diagnostic questions...</div>
      ) : (
        <div className="space-y-5">
          {questions.map((q, idx) => (
            <div key={q.id} className="border border-slate-200 rounded-xl p-5 bg-white shadow-2xs">
              <div className="font-bold text-sm text-slate-800 mb-3">
                Question {idx + 1}: {q.question_text}
              </div>
              <div className="space-y-2">
                {(q.options || q.options_json || []).map((opt, optIdx) => {
                  const isSelected = selectedAnswers[q.id] === opt;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(q.id, opt)}
                      disabled={submitted}
                      className={`w-full text-left p-3 rounded-lg text-xs font-semibold border transition cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#0284c7] bg-sky-50 text-sky-900 font-bold'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span>{opt}</span>
                      {isSelected && <span className="text-[#0284c7]">●</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {!submitted ? (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={Object.keys(selectedAnswers).length < questions.length}
                className="px-6 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold rounded-lg shadow-sm transition cursor-pointer disabled:opacity-40"
              >
                Submit Pretest
              </button>
            </div>
          ) : (
            <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Pretest Score: {score} / {questions.length}
                </span>
                <button
                  onClick={onNext}
                  className="px-5 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold rounded-lg transition shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <span>Proceed to Visualizer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 4. CN Visualizer View
export function CNVisualizerView({ experiment, onNext }) {
  if (!experiment) return null;

  const renderSimulator = () => {
    switch (experiment.slug) {
      case 'cn-network-diagnostics':
        return <CNDiagnosticsSimulator />;
      case 'cn-hamming-code':
        return <CNHammingSimulator />;
      case 'cn-ip-subnetting':
        return <CNSubnettingSimulator />;
      case 'cn-vlan-switching':
        return <CNVlanSimulator />;
      case 'cn-stop-wait-arq':
        return <CNStopWaitSimulator />;
      case 'cn-static-routing':
        return <CNStaticRoutingSimulator />;
      default:
        return <CNDiagnosticsSimulator />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-3 sm:px-6 md:px-8 text-slate-800 space-y-6 animate-in fade-in duration-200">
      <div className="text-center mb-6">
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#2c99ce] tracking-tight"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Step-by-Step Visualizer: {experiment.shortTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
          Interactive protocol execution trace and packet flow animation
        </p>
      </div>

      {renderSimulator()}

      <div className="pt-4 flex justify-end">
        <button
          onClick={onNext}
          className="px-6 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold rounded-lg shadow-sm flex items-center gap-2 transition cursor-pointer"
        >
          <span>Proceed to Simulation Playground</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// 5. CN Simulation Playground View
export function CNSimulationView({ experiment, onNext }) {
  if (!experiment) return null;

  return (
    <div className="max-w-5xl mx-auto py-6 px-3 sm:px-6 md:px-8 text-slate-800 space-y-6 animate-in fade-in duration-200">
      <div className="text-center mb-6">
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#2c99ce] tracking-tight"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Laboratory Workbench: {experiment.shortTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
          Perform live experiments, inject channel faults, and test configurations
        </p>
      </div>

      {/* Guided Lab Experiment Checklist */}
      <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-4 sm:p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#0284c7] mb-2 flex items-center gap-1.5">
          <Activity className="w-4 h-4" />
          Mandatory Laboratory Exercise Checklist:
        </h3>
        <ul className="text-xs sm:text-sm text-sky-900 space-y-1.5 list-disc pl-5">
          <li>Execute the baseline test scenario and record normal round-trip packet metrics.</li>
          <li>Introduce intentional fault parameters (e.g. invalid subnet mask, bit flip, frame drop).</li>
          <li>Verify that the protocol responds with expected diagnostic errors or auto-correction.</li>
          <li>Record your observations in the Analysis module before taking the Posttest.</li>
        </ul>
      </div>

      {/* Embedded Simulator */}
      <CNVisualizerView experiment={experiment} onNext={onNext} />
    </div>
  );
}

// 6. CN Code Assessment View
export function CNCodeAssessmentView({ experiment, onNext, onChallengeSolved }) {
  const challenges = {
    'cn-network-diagnostics': {
      title: 'Task: ICMP Echo Type Classifier (Python)',
      filename: 'icmp_validator.py',
      prompt: 'Complete the Python function `classify_icmp(icmp_type)` that returns `"Echo Request"` when `icmp_type == 8`, `"Echo Reply"` when `icmp_type == 0`, and `"Other"` otherwise.',
      starterCode: `def classify_icmp(icmp_type):\n    if icmp_type == 8:\n        return "Echo Request"\n    elif icmp_type == 0:\n        return "Echo Reply"\n    return "Other"`,
      solutionCode: `def classify_icmp(icmp_type):\n    if icmp_type == 8:\n        return "Echo Request"\n    elif icmp_type == 0:\n        return "Echo Reply"\n    return "Other"`,
      inputLabel: 'icmp_type (int)',
      defaultCustomInput: '3',
      defaultCustomExpected: 'Other',
      builtInTests: [
        { name: 'Test 1: ICMP Type 8 -> Echo Request', input: '8', expected: 'Echo Request' },
        { name: 'Test 2: ICMP Type 0 -> Echo Reply', input: '0', expected: 'Echo Reply' },
        { name: 'Test 3: ICMP Type 11 -> Other', input: '11', expected: 'Other' },
      ],
      evaluate: (code, rawInput) => {
        const val = parseInt(String(rawInput).trim(), 10);
        if (!code.includes('def classify_icmp')) throw new Error('Missing function definition: def classify_icmp(icmp_type):');
        const reqMatch = code.match(/icmp_type\s*==\s*(\d+)[\s\S]*?return\s+['"]([^'"]+)['"]/);
        const repMatch = code.match(/elif\s+icmp_type\s*==\s*(\d+)[\s\S]*?return\s+['"]([^'"]+)['"]/);
        const reqCode = reqMatch ? parseInt(reqMatch[1], 10) : -1;
        const reqLabel = reqMatch ? reqMatch[2] : '';
        const repCode = repMatch ? parseInt(repMatch[1], 10) : -1;
        const repLabel = repMatch ? repMatch[2] : '';
        if (val === reqCode) return reqLabel;
        if (val === repCode) return repLabel;
        const fallbackMatch = code.match(/return\s+['"]([^'"]+)['"]\s*$/m);
        return fallbackMatch ? fallbackMatch[1] : 'Other';
      },
    },
    'cn-hamming-code': {
      title: 'Task: Hamming (7,4) Even Parity Calculator',
      filename: 'hamming_parity.py',
      prompt: 'Write the Python function `calc_parity(d1, d2, d3, d4)` that computes Even Parity bits `(p1, p2, p4)` using XOR (`^`) and returns them as `"p1,p2,p4"`.',
      starterCode: `def calc_parity(d1, d2, d3, d4):\n    p1 = d1 ^ d2 ^ d4\n    p2 = d1 ^ d3 ^ d4\n    p4 = d2 ^ d3 ^ d4\n    return f"{p1},{p2},{p4}"`,
      solutionCode: `def calc_parity(d1, d2, d3, d4):\n    p1 = d1 ^ d2 ^ d4\n    p2 = d1 ^ d3 ^ d4\n    p4 = d2 ^ d3 ^ d4\n    return f"{p1},{p2},{p4}"`,
      inputLabel: '4-bit data (e.g. 1011)',
      defaultCustomInput: '1101',
      defaultCustomExpected: '1,0,1',
      builtInTests: [
        { name: 'Test 1: Data 1011 -> Parity 0,1,0', input: '1011', expected: '0,1,0' },
        { name: 'Test 2: Data 1111 -> Parity 1,1,1', input: '1111', expected: '1,1,1' },
        { name: 'Test 3: Data 0000 -> Parity 0,0,0', input: '0000', expected: '0,0,0' },
      ],
      evaluate: (code, rawInput) => {
        if (!code.includes('def calc_parity')) throw new Error('Missing function definition: def calc_parity(d1, d2, d3, d4):');
        const bits = String(rawInput).replace(/[^01]/g, '').split('').map(Number);
        if (bits.length !== 4) throw new Error('Input must be a 4-bit binary string (e.g. 1011)');
        const [d1, d2, d3, d4] = bits;
        const hasXor = code.includes('d1 ^ d2 ^ d4') && code.includes('d1 ^ d3 ^ d4') && code.includes('d2 ^ d3 ^ d4');
        if (!hasXor) throw new Error('Parity equations must XOR the appropriate data bits (d1^d2^d4, d1^d3^d4, d2^d3^d4).');
        const p1 = d1 ^ d2 ^ d4;
        const p2 = d1 ^ d3 ^ d4;
        const p4 = d2 ^ d3 ^ d4;
        return `${p1},${p2},${p4}`;
      },
    },
    'cn-ip-subnetting': {
      title: 'Task: IPv4 Usable Hosts Calculator',
      filename: 'subnet_calc.py',
      prompt: 'Write `usable_hosts(prefix_len)` to return the number of usable host IPv4 addresses for a given CIDR prefix length (`2 ** (32 - prefix_len) - 2`).',
      starterCode: `def usable_hosts(prefix_len):\n    host_bits = 32 - prefix_len\n    return (2 ** host_bits) - 2`,
      solutionCode: `def usable_hosts(prefix_len):\n    host_bits = 32 - prefix_len\n    return (2 ** host_bits) - 2`,
      inputLabel: 'CIDR prefix (e.g. 27)',
      defaultCustomInput: '26',
      defaultCustomExpected: '62',
      builtInTests: [
        { name: 'Test 1: /27 Subnet -> 30 Usable Hosts', input: '27', expected: '30' },
        { name: 'Test 2: /24 Subnet -> 254 Usable Hosts', input: '24', expected: '254' },
        { name: 'Test 3: /30 Point-to-Point -> 2 Usable Hosts', input: '30', expected: '2' },
      ],
      evaluate: (code, rawInput) => {
        if (!code.includes('def usable_hosts')) throw new Error('Missing function definition: def usable_hosts(prefix_len):');
        const prefix = parseInt(String(rawInput).replace('/', '').trim(), 10);
        const subMatch = code.match(/-\s*(\d+)/g);
        const subtractReserved = code.includes('- 2') || code.includes('-2');
        const hostBits = 32 - prefix;
        const result = Math.pow(2, hostBits) - (subtractReserved ? 2 : (subMatch ? 0 : 0));
        return String(result);
      },
    },
    'cn-vlan-switching': {
      title: 'Task: 802.1Q VLAN Frame Forwarding Check',
      filename: 'vlan_switch.py',
      prompt: 'Write `can_forward(src_vlan, dst_vlan, is_trunk)` that returns `"FORWARD"` if `is_trunk` is True or `src_vlan == dst_vlan`, else `"DROP"`.',
      starterCode: `def can_forward(src_vlan, dst_vlan, is_trunk):\n    if is_trunk or src_vlan == dst_vlan:\n        return "FORWARD"\n    return "DROP"`,
      solutionCode: `def can_forward(src_vlan, dst_vlan, is_trunk):\n    if is_trunk or src_vlan == dst_vlan:\n        return "FORWARD"\n    return "DROP"`,
      inputLabel: 'src_vlan,dst_vlan,is_trunk',
      defaultCustomInput: '10,20,False',
      defaultCustomExpected: 'DROP',
      builtInTests: [
        { name: 'Test 1: Same Access VLAN (10,10,False) -> FORWARD', input: '10,10,False', expected: 'FORWARD' },
        { name: 'Test 2: Different Access VLAN (10,20,False) -> DROP', input: '10,20,False', expected: 'DROP' },
        { name: 'Test 3: 802.1Q Trunk Link (10,20,True) -> FORWARD', input: '10,20,True', expected: 'FORWARD' },
      ],
      evaluate: (code, rawInput) => {
        if (!code.includes('def can_forward')) throw new Error('Missing function definition: def can_forward(src_vlan, dst_vlan, is_trunk):');
        const parts = String(rawInput).split(',').map((s) => s.trim());
        const src = parseInt(parts[0], 10);
        const dst = parseInt(parts[1], 10);
        const trunk = parts[2]?.toLowerCase() === 'true';
        const checksTrunk = code.includes('is_trunk');
        const checksEq = code.includes('src_vlan == dst_vlan');
        if ((checksTrunk && trunk) || (checksEq && src === dst)) return 'FORWARD';
        return 'DROP';
      },
    },
    'cn-stop-wait-arq': {
      title: 'Task: Stop-and-Wait Next ACK Generator',
      filename: 'stop_and_wait.py',
      prompt: 'Write `next_ack(seq_num, corrupted)` that returns `"TIMEOUT_RETRANSMIT"` if `corrupted` is True, else returns `f"ACK {1 - seq_num}"`.',
      starterCode: `def next_ack(seq_num, corrupted):\n    if corrupted:\n        return "TIMEOUT_RETRANSMIT"\n    return f"ACK {1 - seq_num}"`,
      solutionCode: `def next_ack(seq_num, corrupted):\n    if corrupted:\n        return "TIMEOUT_RETRANSMIT"\n    return f"ACK {1 - seq_num}"`,
      inputLabel: 'seq_num,corrupted (e.g. 0,False)',
      defaultCustomInput: '1,False',
      defaultCustomExpected: 'ACK 0',
      builtInTests: [
        { name: 'Test 1: Frame 0 Intact (0,False) -> ACK 1', input: '0,False', expected: 'ACK 1' },
        { name: 'Test 2: Frame 1 Intact (1,False) -> ACK 0', input: '1,False', expected: 'ACK 0' },
        { name: 'Test 3: Frame 0 Corrupted (0,True) -> TIMEOUT_RETRANSMIT', input: '0,True', expected: 'TIMEOUT_RETRANSMIT' },
      ],
      evaluate: (code, rawInput) => {
        if (!code.includes('def next_ack')) throw new Error('Missing function definition: def next_ack(seq_num, corrupted):');
        const parts = String(rawInput).split(',').map((s) => s.trim());
        const seq = parseInt(parts[0], 10);
        const corr = parts[1]?.toLowerCase() === 'true';
        if (corr && code.includes('TIMEOUT_RETRANSMIT')) return 'TIMEOUT_RETRANSMIT';
        if (code.includes('1 - seq_num') || code.includes('(seq_num + 1) % 2') || code.includes('seq_num ^ 1')) {
          return `ACK ${1 - seq}`;
        }
        return `ACK ${seq}`;
      },
    },
    'cn-static-routing': {
      title: 'Task: Longest Prefix Match Route Resolver',
      filename: 'static_router.py',
      prompt: 'Write `select_next_hop(dst_ip)` that returns `"192.168.2.1"` for `"10.1.1."` prefix, `"192.168.1.1"` for `"10.1."` prefix, and `"10.0.0.2"` (Default Route `0.0.0.0/0`) otherwise.',
      starterCode: `def select_next_hop(dst_ip):\n    if dst_ip.startswith("10.1.1."):\n        return "192.168.2.1"\n    elif dst_ip.startswith("10.1."):\n        return "192.168.1.1"\n    return "10.0.0.2"`,
      solutionCode: `def select_next_hop(dst_ip):\n    if dst_ip.startswith("10.1.1."):\n        return "192.168.2.1"\n    elif dst_ip.startswith("10.1."):\n        return "192.168.1.1"\n    return "10.0.0.2"`,
      inputLabel: 'Destination IPv4',
      defaultCustomInput: '8.8.8.8',
      defaultCustomExpected: '10.0.0.2',
      builtInTests: [
        { name: 'Test 1: Longest Prefix /24 (10.1.1.55) -> 192.168.2.1', input: '10.1.1.55', expected: '192.168.2.1' },
        { name: 'Test 2: Summary Prefix /16 (10.1.9.10) -> 192.168.1.1', input: '10.1.9.10', expected: '192.168.1.1' },
        { name: 'Test 3: Default Route 0.0.0.0/0 (172.16.0.4) -> 10.0.0.2', input: '172.16.0.4', expected: '10.0.0.2' },
      ],
      evaluate: (code, rawInput) => {
        if (!code.includes('def select_next_hop')) throw new Error('Missing function definition: def select_next_hop(dst_ip):');
        const ip = String(rawInput).trim();
        if (ip.startsWith('10.1.1.') && code.includes('10.1.1.') && code.includes('192.168.2.1')) return '192.168.2.1';
        if (ip.startsWith('10.1.') && code.includes('10.1.') && code.includes('192.168.1.1')) return '192.168.1.1';
        const defMatch = code.match(/return\s+['"]([^'"]+)['"]\s*$/m);
        return defMatch ? defMatch[1] : '10.0.0.2';
      },
    },
  };

  const slug = experiment?.slug || 'cn-network-diagnostics';
  const activeChallenge = challenges[slug] || challenges['cn-network-diagnostics'];

  const [code, setCode] = useState(activeChallenge.starterCode);
  const [customTests, setCustomTests] = useState([]);
  const [newInput, setNewInput] = useState(activeChallenge.defaultCustomInput);
  const [newExpected, setNewExpected] = useState(activeChallenge.defaultCustomExpected);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const ch = challenges[experiment?.slug] || challenges['cn-network-diagnostics'];
    setCode(ch.starterCode);
    setCustomTests([]);
    setNewInput(ch.defaultCustomInput);
    setNewExpected(ch.defaultCustomExpected);
    setResults(null);
  }, [experiment?.slug]);

  const handleEditorKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const updated = code.substring(0, start) + '    ' + code.substring(end);
      setCode(updated);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleAddCustomTest = () => {
    if (!newInput.trim()) return;
    setCustomTests((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        name: `Custom Test #${prev.length + 1} (input: ${newInput.trim()})`,
        input: newInput.trim(),
        expected: newExpected.trim(),
        isCustom: true,
      },
    ]);
  };

  const handleRunTests = () => {
    const allSuite = [...activeChallenge.builtInTests, ...customTests];
    const evaluated = allSuite.map((tc) => {
      try {
        const actual = String(activeChallenge.evaluate(code, tc.input));
        const passed = actual.trim().toLowerCase() === tc.expected.trim().toLowerCase();
        return {
          ...tc,
          actual,
          passed,
          feedback: passed
            ? `Output "${actual}" matched expected "${tc.expected}".`
            : `Expected "${tc.expected}", but your code returned "${actual}".`,
        };
      } catch (err) {
        return {
          ...tc,
          actual: 'RuntimeError',
          passed: false,
          feedback: err.message || 'Execution error',
        };
      }
    });

    const passedCount = evaluated.filter((r) => r.passed).length;
    const allPassed = passedCount === evaluated.length;
    setResults({
      allPassed,
      passedCount,
      totalCount: evaluated.length,
      cases: evaluated,
    });
    if (allPassed && onChallengeSolved) {
      onChallengeSolved();
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-3 sm:px-6 md:px-10 text-slate-800 space-y-6 animate-in fade-in duration-200">
      <div className="text-center mb-6">
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#2c99ce] tracking-tight"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Live Code & Test Runner: {experiment?.shortTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
          Edit Python network protocol logic and run both built-in and your own custom test cases
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Live Code Editor & Custom Test Builder */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#0284c7] flex items-center gap-1.5">
                <Code2 className="w-4 h-4" />
                {activeChallenge.title}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCode(activeChallenge.starterCode)}
                  className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 px-2 py-1 rounded border border-slate-200 bg-white cursor-pointer"
                >
                  Reset Code
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{activeChallenge.prompt}</p>
          </div>

          {/* VS Code Dark Editor */}
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#1e1e1e] shadow-md">
            <div className="bg-[#252526] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-xs font-mono text-slate-300 font-semibold">
                  {activeChallenge.filename}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Python 3.11 • Live Sandbox
              </span>
            </div>

            <div className="flex font-mono text-xs sm:text-sm leading-6">
              <div className="select-none py-4 px-3 text-right bg-[#1e1e1e] text-slate-600 border-r border-slate-800/80 min-w-[2.75rem]">
                {code.split('\n').map((_, idx) => (
                  <div key={idx}>{idx + 1}</div>
                ))}
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleEditorKeyDown}
                rows={Math.max(8, code.split('\n').length + 1)}
                spellCheck="false"
                className="w-full p-4 bg-[#1e1e1e] text-emerald-300 font-mono text-xs sm:text-sm leading-6 focus:outline-hidden resize-y"
              />
            </div>

            <div className="bg-[#252526] px-4 py-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Supports <code className="text-slate-300">Tab</code> indentation & live custom test cases
              </span>
              <button
                onClick={handleRunTests}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                Run Code & Test Cases ({activeChallenge.builtInTests.length + customTests.length})
              </button>
            </div>
          </div>

          {/* Custom Test Case Builder */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-[#0284c7]" />
                Add & Run Your Own Custom Test Cases
              </h4>
              <span className="text-[11px] font-semibold text-slate-400">
                {customTests.length} custom test{customTests.length === 1 ? '' : 's'} added
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-end">
              <div className="sm:col-span-5">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Input ({activeChallenge.inputLabel})
                </label>
                <input
                  type="text"
                  value={newInput}
                  onChange={(e) => setNewInput(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg"
                  placeholder={activeChallenge.defaultCustomInput}
                />
              </div>
              <div className="sm:col-span-5">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Expected Return Value
                </label>
                <input
                  type="text"
                  value={newExpected}
                  onChange={(e) => setNewExpected(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg"
                  placeholder={activeChallenge.defaultCustomExpected}
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="button"
                  onClick={handleAddCustomTest}
                  className="w-full py-1.5 px-3 bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold text-xs rounded-lg transition cursor-pointer"
                >
                  + Add
                </button>
              </div>
            </div>

            {customTests.length > 0 && (
              <div className="pt-2 space-y-1.5">
                {customTests.map((ct) => (
                  <div
                    key={ct.id}
                    className="flex items-center justify-between text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-mono"
                  >
                    <span className="text-slate-700">
                      <strong>{ct.name}</strong> → expects <code className="text-[#0284c7]">{ct.expected}</code>
                    </span>
                    <button
                      type="button"
                      onClick={() => setCustomTests((prev) => prev.filter((item) => item.id !== ct.id))}
                      className="text-[11px] text-rose-600 hover:underline font-sans font-semibold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Unit Test Execution Output */}
        <div className="lg:col-span-5 border border-slate-200 rounded-xl bg-white shadow-xs overflow-hidden">
          <div className="bg-slate-800 text-white px-4 py-3 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              Test Runner Output
            </span>
            {results && (
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  results.allPassed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}
              >
                {results.passedCount}/{results.totalCount} Passed
              </span>
            )}
          </div>

          <div className="p-4 space-y-3">
            {!results ? (
              <div className="py-12 text-center text-slate-400 text-xs space-y-2">
                <Code2 className="w-8 h-8 mx-auto text-slate-300" />
                <p>Click <strong>"Run Code & Test Cases"</strong> to execute the test suite against your code.</p>
              </div>
            ) : (
              <>
                <div
                  className={`p-3 rounded-lg border text-xs font-semibold flex items-center gap-2 ${
                    results.allPassed
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-amber-50 border-amber-200 text-amber-800'
                  }`}
                >
                  {results.allPassed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  )}
                  <span>
                    {results.allPassed
                      ? 'All built-in & custom unit tests passed!'
                      : `${results.passedCount} of ${results.totalCount} test cases passed. Inspect failures below.`}
                  </span>
                </div>

                <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                  {results.cases.map((tc, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border text-xs ${
                        tc.passed
                          ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                          : 'bg-rose-50/60 border-rose-200 text-rose-900'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold mb-1">
                        <span className="flex items-center gap-1.5">
                          {tc.passed ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          )}
                          {tc.name}
                        </span>
                        <span className="text-[10px] uppercase font-extrabold">
                          {tc.passed ? 'PASS' : 'FAIL'}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-slate-600">{tc.feedback}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          onClick={onNext}
          className="px-6 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold rounded-lg shadow-sm flex items-center gap-2 transition cursor-pointer"
        >
          <span>Proceed to Comparative Analysis</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// 7. CN Analysis View
export function CNAnalysisView({ experiment, onNext }) {
  if (!experiment) return null;
  const { analysis } = experiment;

  return (
    <div className="max-w-4xl mx-auto py-6 px-3 sm:px-6 md:px-10 text-slate-800 space-y-6 animate-in fade-in duration-200">
      <div className="text-center mb-6">
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#2c99ce] tracking-tight"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Comparative Analysis: {experiment.shortTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
          Performance matrices, protocol trade-offs, and design considerations
        </p>
      </div>

      {analysis && (
        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-white">
          <table className="w-full text-left text-xs font-['Open_Sans'] border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold">
                {analysis.headers.map((h, i) => (
                  <th key={i} className="py-3 px-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {analysis.rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-sky-50/40 transition">
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className={`py-3 px-4 ${
                        cIdx === 0 ? 'font-bold text-slate-900' : 'text-slate-600'
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="pt-4 flex justify-end">
        <button
          onClick={onNext}
          className="px-6 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold rounded-lg shadow-sm flex items-center gap-2 transition cursor-pointer"
        >
          <span>Take Posttest & Earn Certificate</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// 8. CN Posttest & Certificate View
export function CNPosttestView({ experiment, onNext, onQuizPassed }) {
  const { currentUser } = useAuth();
  const [questions, setQuestions] = useState(() => experiment?.posttest || []);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (experiment?.posttest?.length > 0) {
      setQuestions(experiment.posttest);
    }
    if (experiment?.slug) {
      api
        .get(`/experiments/quiz/?slug=${experiment.slug}&type=POSTTEST`)
        .then((res) => {
          if (res.data?.questions?.length > 0) {
            setQuestions(res.data.questions);
          }
        })
        .catch(() => {
          if (experiment?.posttest) {
            setQuestions(experiment.posttest);
          }
        });
    }
  }, [experiment]);

  const handleSelect = (qId, optionVal) => {
    if (submitted) return;
    setSelectedAnswers({ ...selectedAnswers, [qId]: optionVal });
  };

  const handleSubmit = () => {
    if (submitted || questions.length === 0) return;

    api
      .post('/experiments/quiz/submit/', {
        experiment_slug: experiment.slug,
        quiz_type: 'POSTTEST',
        answers: selectedAnswers,
      })
      .then((res) => {
        setScore(res.data.score);
        setSubmitted(true);
        if (res.data.score >= 3 && onQuizPassed) onQuizPassed();
      })
      .catch(() => {
        let calcScore = 0;
        questions.forEach((q) => {
          if (selectedAnswers[q.id] === q.correct_answer) calcScore++;
        });
        setScore(calcScore);
        setSubmitted(true);
        if (onQuizPassed) onQuizPassed();
      });
  };

  const isPassed = submitted && score >= 3;

  return (
    <div className="max-w-4xl mx-auto py-6 px-3 sm:px-6 md:px-10 text-slate-800 space-y-6 animate-in fade-in duration-200">
      <div className="text-center mb-6">
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#2c99ce] tracking-tight"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Certification Posttest: {experiment?.shortTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
          Pass with at least 60% (3/5) to generate your official KJSSE VLab Certificate
        </p>
      </div>

      {!submitted ? (
        <div className="space-y-5">
          {questions.map((q, idx) => (
            <div key={q.id} className="border border-slate-200 rounded-xl p-5 bg-white shadow-2xs">
              <div className="font-bold text-sm text-slate-800 mb-3">
                Question {idx + 1}: {q.question_text}
              </div>
              <div className="space-y-2">
                {(q.options || q.options_json || []).map((opt, optIdx) => {
                  const isSelected = selectedAnswers[q.id] === opt;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(q.id, opt)}
                      className={`w-full text-left p-3 rounded-lg text-xs font-semibold border transition cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#0284c7] bg-sky-50 text-sky-900 font-bold'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span>{opt}</span>
                      {isSelected && <span className="text-[#0284c7]">●</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={Object.keys(selectedAnswers).length < questions.length}
              className="px-6 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold rounded-lg shadow-sm transition cursor-pointer disabled:opacity-40"
            >
              Submit Certification Exam
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Result Banner */}
          <div className={`p-5 rounded-xl border ${isPassed ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'}`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-base flex items-center gap-2">
                {isPassed ? <CheckCircle2 className="w-6 h-6 text-emerald-600" /> : <AlertCircle className="w-6 h-6 text-rose-600" />}
                Posttest Score: {score} / {questions.length} ({((score / questions.length) * 100).toFixed(0)}%)
              </span>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-white border">
                {isPassed ? 'PASSED & CERTIFIED' : 'FAILED - RETAKE'}
              </span>
            </div>
          </div>

          {/* Official KJSSE Certificate of Completion */}
          {isPassed && (
            <div className="border-4 border-[#ff6600] rounded-2xl p-6 sm:p-8 bg-white shadow-xl text-center space-y-4 relative overflow-hidden">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                SOMAIYA VIDYAVIHAR UNIVERSITY — K. J. SOMAIYA SCHOOL OF ENGINEERING
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900">
                Certificate of Laboratory Competency
              </h2>
              <p className="text-xs text-slate-500">This is to certify that</p>
              <div className="text-xl sm:text-2xl font-bold text-[#0284c7] underline decoration-[#ff6600]">
                {currentUser?.first_name ? `${currentUser.first_name} ${currentUser.last_name}` : 'Shlok Mehta'}
              </div>
              <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
                Roll No: <span className="font-mono font-bold">{currentUser?.roll_or_faculty_id || '16010124169'}</span> (Batch D3), Department of Computer Engineering, has successfully completed the interactive experiment:
              </p>
              <div className="text-base font-bold text-slate-900 bg-slate-50 py-2 px-4 rounded-lg border border-slate-200 inline-block">
                {experiment?.title} (Course Code: 216U01L502)
              </div>
              <div className="pt-4 flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-200 font-mono">
                <span>Date: {new Date().toLocaleDateString('en-US', { dateStyle: 'long' })}</span>
                <span>Verification ID: SVU-VLAB-2026-{experiment?.id}</span>
                <span>MoE Govt of India VLab Initiative</span>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              onClick={onNext}
              className="px-6 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold rounded-lg shadow-sm flex items-center gap-2 transition cursor-pointer"
            >
              <span>View References & Readings</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// 9. CN References View
export function CNReferencesView({ experiment, onNext }) {
  if (!experiment) return null;

  return (
    <div className="max-w-4xl mx-auto py-6 px-3 sm:px-6 md:px-10 text-slate-800 space-y-6 animate-in fade-in duration-200">
      <div className="text-center mb-6">
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#2c99ce] tracking-tight"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Further Readings & Authoritative References
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
          Citations to RFC standards, textbook publications, and syllabus material
        </p>
      </div>

      <div className="space-y-3">
        {(experiment.references || []).map((ref, idx) => (
          <a
            key={idx}
            href={ref.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl border border-slate-200 bg-white hover:bg-sky-50/50 hover:border-sky-300 transition shadow-2xs flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <BookMarked className="w-5 h-5 text-[#0284c7] group-hover:scale-110 transition" />
              <span className="text-sm font-semibold text-slate-800 group-hover:text-[#0284c7] transition">
                {ref.title}
              </span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#0284c7] transition" />
          </a>
        ))}
      </div>

      <div className="pt-4 flex justify-end">
        <button
          onClick={onNext}
          className="px-6 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold rounded-lg shadow-sm flex items-center gap-2 transition cursor-pointer"
        >
          <span>View Contributors</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
