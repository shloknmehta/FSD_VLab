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
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Attempt to load questions from backend; fallback to local experiment data
    if (experiment) {
      api
        .get(`/experiments/quiz/?slug=${experiment.slug}&type=PRETEST`)
        .then((res) => {
          if (res.data?.questions?.length > 0) {
            setQuestions(res.data.questions);
          }
        })
        .catch(() => {
          // If offline/fallback, use any local pretest questions if available
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
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);

  const challenges = {
    'cn-network-diagnostics': {
      title: 'Task: ICMP Echo Type Identification',
      prompt: 'What are the two ICMP message type integers for Echo Request and Echo Reply? (Format: Request=X, Reply=Y)',
      correct: 'Request=8, Reply=0',
      hint: 'RFC 792 defines Echo Request as 8 and Echo Reply as 0.',
    },
    'cn-hamming-code': {
      title: 'Task: Calculate Parity Bits for 1011',
      prompt: 'For 4 data bits 1011, enter the calculated parity bits (P1, P2, P4) using Even Parity separated by commas. (e.g. 0,1,0)',
      correct: '0, 1, 0',
      hint: 'P1 checks 1,3,5,7; P2 checks 2,3,6,7; P4 checks 4,5,6,7.',
    },
    'cn-ip-subnetting': {
      title: 'Task: Compute Usable Hosts for /27',
      prompt: 'How many usable host IP addresses exist in a /27 IPv4 subnet? (Enter integer only)',
      correct: '30',
      hint: 'Host bits = 32 - 27 = 5. Usable hosts = 2^5 - 2 = 30.',
    },
    'cn-vlan-switching': {
      title: 'Task: Cisco IOS Trunk Configuration',
      prompt: 'Which Cisco IOS interface command sets a switchport to 802.1Q trunking mode?',
      correct: 'switchport mode trunk',
      hint: 'Syntax: switchport mode trunk',
    },
    'cn-stop-wait-arq': {
      title: 'Task: Next Expected Sequence Number',
      prompt: 'If the receiver successfully accepts Frame 0, which ACK number does it return? (e.g. ACK 1)',
      correct: 'ACK 1',
      hint: 'Stop-and-Wait uses next-expected ACK numbering: ACK 1 requests Frame 1 next.',
    },
    'cn-static-routing': {
      title: 'Task: Default Static Route Syntax',
      prompt: 'Write the Cisco IOS static default route command with next-hop IP 10.0.0.2',
      correct: 'ip route 0.0.0.0 0.0.0.0 10.0.0.2',
      hint: 'Syntax: ip route 0.0.0.0 0.0.0.0 <next-hop>',
    },
  };

  const activeChallenge = challenges[experiment?.slug] || challenges['cn-network-diagnostics'];

  const handleVerify = () => {
    const cleanUser = userAnswer.trim().toLowerCase().replace(/\s+/g, ' ');
    const cleanExpected = activeChallenge.correct.trim().toLowerCase().replace(/\s+/g, ' ');

    if (cleanUser === cleanExpected || cleanUser.includes(cleanExpected)) {
      setFeedback({ success: true, message: 'Excellent! Your answer is correct. Automated verification passed 100%!' });
      if (onChallengeSolved) onChallengeSolved();
    } else {
      setFeedback({ success: false, message: `Incorrect. Hint: ${activeChallenge.hint}` });
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-3 sm:px-6 md:px-10 text-slate-800 space-y-6 animate-in fade-in duration-200">
      <div className="text-center mb-6">
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#2c99ce] tracking-tight"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Code & Configuration Assessment: {experiment?.shortTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
          Practical problem-solving challenge with automated verification
        </p>
      </div>

      <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-xs space-y-4">
        <h3 className="font-bold text-base text-slate-800 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-[#0284c7]" />
          {activeChallenge.title}
        </h3>

        <p className="text-sm text-slate-700 leading-relaxed font-medium">
          {activeChallenge.prompt}
        </p>

        <div className="space-y-3 pt-2">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-mono text-slate-900 focus:outline-hidden focus:border-[#0284c7]"
            placeholder="Type your solution here..."
          />

          <button
            onClick={handleVerify}
            className="px-5 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold text-xs rounded-lg transition shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            Verify Solution
          </button>
        </div>

        {feedback && (
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 mt-4 ${
              feedback.success ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            {feedback.success ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <span className="text-xs leading-relaxed font-semibold">{feedback.message}</span>
          </div>
        )}
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
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (experiment) {
      api
        .get(`/experiments/quiz/?slug=${experiment.slug}&type=POSTTEST`)
        .then((res) => {
          if (res.data?.questions?.length > 0) {
            setQuestions(res.data.questions);
          }
        })
        .catch(() => {});
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
          <span>Share Laboratory Feedback</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
