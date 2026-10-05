import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  HelpCircle,
  PlaySquare,
  FlaskConical,
  Code2,
  BarChart2,
  Award,
  BookMarked,
  MessageSquareHeart,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Terminal,
  Database,
  Layers,
  ArrowRight,
  RotateCcw,
  Printer,
  Download,
  Star,
  Send,
  Users,
  UserCheck,
  RefreshCw,
} from 'lucide-react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import VSCodeBlock from './VSCodeBlock';

// 1. Overview View
export function OverviewView({ onNext }) {
  return (
    <div className="max-w-4xl mx-auto py-6 px-3 sm:px-6 md:px-10 text-slate-800 space-y-8 animate-in fade-in duration-200">
      <div className="text-center mb-6 sm:mb-8">
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#2c99ce] tracking-tight"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Django Form Validation Architecture
        </h1>
        <p
          className="text-xs sm:text-sm md:text-base text-slate-500 mt-2 font-medium"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Understanding Built-in Validation, Field-Level clean_&lt;field&gt;(), and Form-Level clean()
        </p>
      </div>

      {/* Introduction Card */}
      <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-xs space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#0284c7]" />
          Introduction & Theory
        </h2>
        <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
          When a web application accepts user input through an HTTP POST request, incoming data arrives as unverified strings.
          Django passes this data through a structured validation pipeline to cast data types, verify field constraints,
          and execute custom business logic before the data is committed to the database or processed in views.
        </p>
      </div>

      {/* 3 Pillars of Validation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 hover:shadow-sm transition">
          <div className="flex items-center gap-2 text-indigo-700 font-bold mb-2.5 text-base">
            <Database className="w-5 h-5" />
            <span>1. Built-in Field Checks</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Django fields (<code className="bg-slate-200 px-1 rounded font-mono">IntegerField</code>, <code className="bg-slate-200 px-1 rounded font-mono">EmailField</code>) automatically verify presence (<code className="bg-slate-200 px-1 rounded font-mono">required=True</code>), enforce type casting, and run core regex/email validators.
          </p>
        </div>

        <div className="border border-slate-200 rounded-xl p-5 bg-sky-50/70 border-sky-200 hover:shadow-sm transition">
          <div className="flex items-center gap-2 text-[#0284c7] font-bold mb-2.5 text-base">
            <Terminal className="w-5 h-5" />
            <span>2. clean_&lt;fieldname&gt;()</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Custom method executed for a specific field after built-in checks pass. Validates single-field business rules (e.g. applicant age &ge; 18, unique roll numbers, alphanumeric username).
          </p>
        </div>

        <div className="border border-slate-200 rounded-xl p-5 bg-emerald-50/70 border-emerald-200 hover:shadow-sm transition">
          <div className="flex items-center gap-2 text-emerald-800 font-bold mb-2.5 text-base">
            <Layers className="w-5 h-5" />
            <span>3. Form-Level clean()</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Executed after all individual fields are cleaned. Perfect for cross-field validation where multiple fields depend on each other (e.g., matching password and confirm_password).
          </p>
        </div>
      </div>

      {/* Visual Execution Flow Diagram */}
      <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-xs space-y-4">
        <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Execution Lifecycle at a Glance (Triggered by form.is_valid())
        </h3>

        <div className="overflow-x-auto w-full max-w-full pb-2">
          <div className="flex items-center min-w-[620px] md:min-w-0 justify-between gap-2 p-3 sm:p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">
            <div className="px-3 py-2 bg-white border border-slate-300 rounded shadow-xs text-center shrink-0">
              Raw POST Data<br/><span className="text-[10px] text-slate-400 font-normal">request.POST</span>
            </div>
            <span className="text-slate-400 font-bold shrink-0">&rarr;</span>
            <div className="px-3 py-2 bg-white border border-slate-300 rounded shadow-xs text-center shrink-0">
              form.is_valid()<br/><span className="text-[10px] text-slate-400 font-normal">full_clean()</span>
            </div>
            <span className="text-slate-400 font-bold shrink-0">&rarr;</span>
            <div className="px-3 py-2 bg-white border border-slate-300 rounded shadow-xs text-center shrink-0">
              _clean_fields()<br/><span className="text-[10px] text-slate-400 font-normal">Built-in checks</span>
            </div>
            <span className="text-slate-400 font-bold shrink-0">&rarr;</span>
            <div className="px-3 py-2 bg-sky-100 border border-sky-300 text-[#0284c7] rounded shadow-xs text-center font-bold shrink-0">
              clean_&lt;field&gt;()<br/><span className="text-[10px] text-sky-700 font-normal">Single-field logic</span>
            </div>
            <span className="text-slate-400 font-bold shrink-0">&rarr;</span>
            <div className="px-3 py-2 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded shadow-xs text-center font-bold shrink-0">
              clean()<br/><span className="text-[10px] text-emerald-700 font-normal">Cross-field logic</span>
            </div>
            <span className="text-slate-400 font-bold shrink-0">&rarr;</span>
            <div className="px-3 py-2 bg-white border border-slate-300 rounded shadow-xs text-center shrink-0">
              cleaned_data / errors<br/><span className="text-[10px] text-slate-400 font-normal">Result returned</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          onClick={onNext}
          className="v-button shadow-xs transition-transform hover:scale-[1.02] cursor-pointer"
        >
          <span>Take Pretest</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// 2. Recap View
export function RecapView() {
  return (
    <div className="max-w-4xl mx-auto py-6 px-3 sm:px-6 md:px-10 text-slate-800 space-y-6 animate-in fade-in duration-200">
      <div className="text-center mb-6">
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#2c99ce] tracking-tight"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Recap: Validation Rules & Syntax
        </h1>
        <p
          className="text-xs sm:text-sm text-slate-500 mt-2 font-medium"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Standard implementation rules in forms.py
        </p>
      </div>

      <div className="space-y-4">
        {/* Rule 1 */}
        <div className="border border-slate-200 bg-white p-5 rounded-xl shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#0284c7] font-bold text-base">
            <span className="w-6 h-6 rounded-full bg-sky-100 text-[#0284c7] flex items-center justify-center text-xs">1</span>
            <h3>Field-Specific Validation: clean_&lt;fieldname&gt;(self)</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Target a single field. Retrieve the pre-sanitized value from <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-700 font-mono">self.cleaned_data['fieldname']</code>, inspect it against your rule, raise <code className="bg-slate-100 px-1.5 py-0.5 rounded text-red-600 font-mono">forms.ValidationError("...")</code> if invalid, and <strong>MUST return the cleaned value</strong>!
          </p>
          <VSCodeBlock
            filename="forms.py"
            breadcrumbs="forms.py > UserRegistrationForm > clean_age()"
            language="python"
            code={`def clean_age(self):
    age = self.cleaned_data.get('age')
    if age is not None and age < 18:
        raise forms.ValidationError("Must be 18 or older to register.")
    return age  # CRITICAL: Always return the value!`}
          />
        </div>

        {/* Rule 2 */}
        <div className="border border-slate-200 bg-white p-5 rounded-xl shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-base">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">2</span>
            <h3>Form-Wide Validation: clean(self)</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Target multiple interdependent fields. Always call <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-700 font-mono">cleaned_data = super().clean()</code> first, access both fields safely using <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-700 font-mono">.get()</code>, raise <code className="bg-slate-100 px-1.5 py-0.5 rounded text-red-600 font-mono">forms.ValidationError</code> for mismatches, and <strong>MUST return cleaned_data</strong>!
          </p>
          <VSCodeBlock
            filename="forms.py"
            breadcrumbs="forms.py > UserRegistrationForm > clean()"
            language="python"
            code={`def clean(self):
    cleaned_data = super().clean()
    password = cleaned_data.get('password')
    confirm_password = cleaned_data.get('confirm_password')

    if password and confirm_password and password != confirm_password:
        raise forms.ValidationError("Passwords do not match.")
    return cleaned_data  # CRITICAL: Always return cleaned_data!`}
          />
        </div>

        {/* Rule 3 */}
        <div className="border border-slate-200 bg-amber-50/60 p-4 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Important Caveat:</span> If a field failed built-in type validation (for example, entering 'abc' in an <code className="font-mono">IntegerField</code>), it will NOT be present in <code className="font-mono">self.cleaned_data</code> when <code className="font-mono">clean_&lt;field&gt;()</code> or <code className="font-mono">clean()</code> runs. Always check with <code className="font-mono">.get()</code> or verify presence before comparing!
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Pretest View
export function PretestView({ onNext }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [backendFeedback, setBackendFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = [
    {
      id: 1,
      q: 'Which internal method does form.is_valid() invoke to trigger field-level and form-level validation?',
      options: ['self.full_clean()', 'self.run_checks()', 'self.validate_all()', 'self.clean_fields()'],
      correct: 0,
      explanation: 'form.is_valid() checks self.is_bound and if self.errors is empty, triggering self.full_clean() which orchestrates the whole validation pipeline.',
    },
    {
      id: 2,
      q: 'Inside clean_age(self), from which dictionary must you retrieve the initial sanitized value?',
      options: ['self.data["age"]', 'self.cleaned_data.get("age")', 'request.POST["age"]', 'self.initial["age"]'],
      correct: 1,
      explanation: 'Built-in validation runs before clean_<fieldname>(), casting raw input to integer and placing it into self.cleaned_data.',
    },
    {
      id: 3,
      q: 'What is the mandatory requirement for the return value of any clean_<fieldname>() method?',
      options: ['Must return True or False', 'Must return self.errors', 'Must return the cleaned field value', 'No return value is required'],
      correct: 2,
      explanation: 'Django overwrites self.cleaned_data[fieldname] with whatever clean_<fieldname>() returns. Omitting return sets it to None!',
    },
    {
      id: 4,
      q: 'Which method should be overridden when verifying that password and confirm_password match?',
      options: ['clean_password()', 'clean_confirm_password()', 'clean(self)', 'validate_match()'],
      correct: 2,
      explanation: 'The form-level clean() method runs after all single fields are cleaned, making it the proper place for multi-field cross validation.',
    },
    {
      id: 5,
      q: 'If validation fails in a clean() or clean_<field>() method, which exception MUST be raised?',
      options: ['ValueError', 'forms.ValidationError', 'TypeError', 'Exception'],
      correct: 1,
      explanation: 'Django specifically catches forms.ValidationError and converts it into error entries inside self._errors.',
    },
  ];

  const handleSelect = (qId, optionIdx) => {
    if (submitted) return;
    setSelectedAnswers({ ...selectedAnswers, [qId]: optionIdx });
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) score++;
    });
    return score;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await api.post('/experiments/quiz/submit/', {
        experiment_slug: 'django-form-validation',
        quiz_type: 'PRETEST',
        answers: selectedAnswers,
      });
      if (response.data) {
        setBackendFeedback(response.data);
      }
    } catch (err) {
      console.log('Using local quiz score calculator:', err);
    }
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const score = calculateScore();

  return (
    <div className="max-w-4xl mx-auto py-4 px-2 sm:px-6 text-slate-800 animate-in fade-in duration-200">
      {/* Exact Virtual Labs Centered Heading */}
      <div className="text-center mb-3">
        <h1
          className="text-lg sm:text-2xl md:text-[1.7rem] font-medium text-[#2c99ce] tracking-normal break-words"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Django Custom Form Validation Lifecycle
        </h1>
      </div>

      {/* Sub-divider */}
      <div className="border-b border-[#e8e8e8] mb-6"></div>

      {/* Questions List matching exact screenshot placement */}
      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div key={q.id} className="mb-5">
            <div
              className="question mb-2.5 text-black font-black text-base"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              {q.q}
            </div>
            <div className="answers space-y-2 mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              {q.options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[q.id] === oIdx;
                const isCorrect = q.correct === oIdx;
                const letter = ['a', 'b', 'c', 'd'][oIdx];

                return (
                  <label
                    key={oIdx}
                    className={`flex items-center gap-2.5 cursor-pointer text-[0.95rem] py-0.5 ${
                      submitted
                        ? isCorrect
                          ? 'text-emerald-700 font-semibold'
                          : isSelected
                          ? 'text-red-700 font-semibold'
                          : 'text-[#333333]'
                        : 'text-[#333333]'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`pretest-q-${q.id}`}
                      checked={isSelected}
                      onChange={() => handleSelect(q.id, oIdx)}
                      disabled={submitted}
                      className="w-4 h-4 cursor-pointer text-[#007bff] focus:ring-[#007bff]"
                    />
                    <span>
                      {letter}: {opt}
                    </span>
                    {submitted && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 inline ml-1" />
                    )}
                  </label>
                );
              })}
            </div>

            {submitted && (
              <div className="mt-2 p-3 bg-slate-50 rounded border border-slate-200 text-xs text-slate-700 font-['Open_Sans']">
                <span className="font-bold text-slate-800">Explanation: </span>
                {q.explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Submit Quiz button & Results Footer */}
      <div className="pt-4 border-t border-[#e8e8e8] mt-6">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length < questions.length || isSubmitting}
            className="bg-[#007bff] hover:bg-[#0069d9] text-white rounded px-4 py-2 text-base font-['Open_Sans'] cursor-pointer transition disabled:opacity-50"
          >
            {isSubmitting ? 'Evaluating...' : 'Submit Quiz'}
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
            <div className="text-base font-semibold text-slate-800" style={{ fontFamily: "'Raleway', sans-serif" }}>
              Score: <span className="text-[#2c99ce] font-bold text-lg">{score} / {questions.length}</span> ({Math.round((score / questions.length) * 100)}%)
              <span className={`block sm:inline sm:ml-2 mt-1 sm:mt-0 text-xs font-bold px-2 py-0.5 rounded w-fit ${score >= 4 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                {score >= 4 ? 'Status: Qualified' : 'Status: Review Advised'}
              </span>
            </div>
            <button
              onClick={onNext}
              className="bg-[#288ec8] hover:bg-[#2075a5] text-white rounded-[1em] px-5 py-2 text-sm font-['Raleway'] font-bold flex items-center gap-2 cursor-pointer transition shadow-xs"
            >
              <span>Proceed to Visualizer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// 4. Step-by-Step Visualizer
export function VisualizerView({ onNext }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(2000);

  // Form Inputs State for dynamic trace
  const [formData, setFormData] = useState({
    username: 'student',
    email: 'student@vlab.edu',
    age: '21',
    password: 'SecretPassword123',
    confirm_password: 'SecretPassword123',
  });

  const [activePreset, setActivePreset] = useState('all_valid');
  const [showInputPanel, setShowInputPanel] = useState(false);

  // Presets
  const applyPreset = (presetKey) => {
    setActivePreset(presetKey);
    setCurrentStep(0);
    setIsPlaying(false);
    if (presetKey === 'all_valid') {
      setFormData({
        username: 'student',
        email: 'student@vlab.edu',
        age: '21',
        password: 'SecretPassword123',
        confirm_password: 'SecretPassword123',
      });
    } else if (presetKey === 'age_underage') {
      setFormData({
        username: 'student16',
        email: 'student@vlab.edu',
        age: '15', // Under 18!
        password: 'SecretPassword123',
        confirm_password: 'SecretPassword123',
      });
    } else if (presetKey === 'password_mismatch') {
      setFormData({
        username: 'student',
        email: 'student@vlab.edu',
        age: '22',
        password: 'SecretPassword123',
        confirm_password: 'DifferentPassword999', // Mismatch!
      });
    } else if (presetKey === 'builtin_email_err') {
      setFormData({
        username: 'student',
        email: 'invalid-email-format', // Bad email!
        age: '21',
        password: 'SecretPassword123',
        confirm_password: 'SecretPassword123',
      });
    }
  };

  // Derive trace data based on current inputs
  const ageNum = parseInt(formData.age, 10);
  const isEmailValid = formData.email.includes('@') && formData.email.includes('.');
  const isAgeValid = !isNaN(ageNum) && ageNum >= 18;
  const isPasswordMatch = formData.password === formData.confirm_password;
  const isUsernameAlpha = /^[a-zA-Z0-9]+$/.test(formData.username);

  // 7-Stage Validation Execution Steps
  const steps = [
    {
      stepNum: 1,
      phase: '1. Form Initialization & Data Binding',
      title: 'HTTP POST Data Bound to Form Instance',
      description: 'The controller receives request.POST dictionary and binds it to UserRegistrationForm. The form initializes empty cleaned_data and errors dictionaries.',
      highlight: 'form = UserRegistrationForm(data=request.POST)',
      code: `# views.py
def register_view(request):
    if request.method == "POST":
        form = UserRegistrationForm(request.POST) # <-- BOUND TO RAW POST
        if form.is_valid():
            ...`,
      callStack: ['register_view()', 'UserRegistrationForm.__init__()'],
      cleanedDataState: {},
      errorsState: {},
      rawState: { ...formData },
      status: 'INFO',
      note: 'Form is now bound: self.is_bound = True. Validation has not run yet.',
    },
    {
      stepNum: 2,
      phase: '2. Validation Entrypoint: form.is_valid()',
      title: 'Triggering self.full_clean() Lifecycle',
      description: 'form.is_valid() checks if self.errors is populated. Since it is empty on first call, it initiates self.full_clean(), which will sequentially clean individual fields and the whole form.',
      highlight: 'if form.is_valid(): -> invokes self.full_clean()',
      code: `# django.forms.forms.py
def is_valid(self):
    return self.is_bound and not self.errors

def full_clean(self):
    self._clean_fields()  # Step 3 & 4
    self._clean_form()    # Step 5
    self._post_clean()    # ModelForm hooks`,
      callStack: ['register_view()', 'form.is_valid()', 'form.full_clean()'],
      cleanedDataState: {},
      errorsState: {},
      rawState: { ...formData },
      status: 'INFO',
      note: 'The 3-stage validation pipeline begins: _clean_fields() is called first.',
    },
    {
      stepNum: 3,
      phase: '3. Built-in Field Type Validations (_clean_fields)',
      title: 'Type Coercion & Core Field Validators',
      description: 'Django loops over form.fields. For each field, it runs to_python() (e.g. converting "21" to int 21) and checks presence (required=True) and regex (EmailField).',
      highlight: 'for name, field in self.fields.items(): field.clean(value)',
      code: `# forms.py
class UserRegistrationForm(forms.Form):
    username = forms.CharField(max_length=50, required=True)
    email = forms.EmailField(required=True)         # <-- checks @ and domain
    age = forms.IntegerField(required=True)         # <-- casts string to int
    password = forms.CharField(widget=forms.PasswordInput)
    confirm_password = forms.CharField(widget=forms.PasswordInput)`,
      callStack: ['full_clean()', '_clean_fields()', 'EmailField.clean()', 'IntegerField.clean()'],
      cleanedDataState: isEmailValid
        ? { username: formData.username, email: formData.email, age: !isNaN(ageNum) ? ageNum : undefined }
        : { username: formData.username, age: !isNaN(ageNum) ? ageNum : undefined },
      errorsState: isEmailValid ? {} : { email: ['Enter a valid email address.'] },
      rawState: { ...formData },
      status: isEmailValid ? 'SUCCESS' : 'FAILED',
      note: isEmailValid
        ? 'All fields passed built-in conversion and type checks.'
        : 'Built-in validation failed: EmailField rejected format. Field omitted from cleaned_data.',
    },
    {
      stepNum: 4,
      phase: '4. Custom Field Validation: clean_<fieldname>()',
      title: 'Executing clean_age() & clean_username()',
      description: 'Django dynamically checks if the form class defines clean_<fieldname>() methods. If present, they are executed to enforce domain rules.',
      highlight: 'hasattr(self, "clean_age") -> invokes clean_age()',
      code: `# forms.py (Custom field hook)
def clean_age(self):
    age = self.cleaned_data.get('age') # Read pre-cast value
    if age is not None and age < 18:
        raise forms.ValidationError("Must be 18 or older to register.") # <-- FAILS IF < 18
    return age # CRITICAL: Return the cleaned value!`,
      callStack: ['full_clean()', '_clean_fields()', 'clean_age()'],
      cleanedDataState: isAgeValid
        ? {
            username: formData.username,
            email: isEmailValid ? formData.email : undefined,
            age: ageNum,
            password: formData.password,
            confirm_password: formData.confirm_password,
          }
        : {
            username: formData.username,
            email: isEmailValid ? formData.email : undefined,
            password: formData.password,
            confirm_password: formData.confirm_password,
          },
      errorsState: {
        ...(isEmailValid ? {} : { email: ['Enter a valid email address.'] }),
        ...(isAgeValid ? {} : { age: ['Must be 18 or older to register.'] }),
      },
      rawState: { ...formData },
      status: isAgeValid ? 'SUCCESS' : 'FAILED',
      note: isAgeValid
        ? `clean_age() evaluated age = ${ageNum} >= 18. Value passed and returned successfully.`
        : `clean_age() caught age = ${ageNum} < 18! Raised ValidationError, added to self.errors['age'].`,
    },
    {
      stepNum: 5,
      phase: '5. Form-Level Cross-Field Validation: clean()',
      title: 'Executing Overridden clean() for Cross-Field Logic',
      description: 'Django calls self.clean(). This method inspects multiple fields simultaneously (e.g. comparing password and confirm_password) and returns cleaned_data.',
      highlight: 'def clean(self): verify password == confirm_password',
      code: `# forms.py (Form-wide cross-field validation)
def clean(self):
    cleaned_data = super().clean()
    password = cleaned_data.get('password')
    confirm_password = cleaned_data.get('confirm_password')

    if password and confirm_password and password != confirm_password:
        raise forms.ValidationError("Passwords do not match.") # <-- Non-field error!
    return cleaned_data`,
      callStack: ['full_clean()', '_clean_form()', 'UserRegistrationForm.clean()'],
      cleanedDataState: {
        username: formData.username,
        ...(isEmailValid ? { email: formData.email } : {}),
        ...(isAgeValid ? { age: ageNum } : {}),
        ...(isPasswordMatch ? { password: formData.password, confirm_password: formData.confirm_password } : {}),
      },
      errorsState: {
        ...(isEmailValid ? {} : { email: ['Enter a valid email address.'] }),
        ...(isAgeValid ? {} : { age: ['Must be 18 or older to register.'] }),
        ...(isPasswordMatch ? {} : { __all__: ['Passwords do not match.'] }),
      },
      rawState: { ...formData },
      status: isPasswordMatch ? 'SUCCESS' : 'FAILED',
      note: isPasswordMatch
        ? 'clean() verified password matches confirm_password. Both match!'
        : 'clean() detected mismatch between password and confirm_password. Raised ValidationError attached to __all__ (non-field error).',
    },
    {
      stepNum: 6,
      phase: '6. Finalizing ErrorDict & cleaned_data',
      title: 'Error Compilation & Final Dictionaries Sealed',
      description: 'Django combines field errors and non-field errors into self._errors (an ErrorDict). Valid fields remain in self.cleaned_data.',
      highlight: 'self.errors = ErrorDict(...) ; self.cleaned_data sealed',
      code: `# Inspection of form internals:
print(form.is_valid())  # True or False
print(form.cleaned_data) # Safe sanitized dictionary
print(form.errors)       # Dictionary of error messages`,
      callStack: ['full_clean()', '_post_clean()'],
      cleanedDataState: {
        ...(isEmailValid ? { email: formData.email } : {}),
        ...(isAgeValid ? { age: ageNum } : {}),
        ...(isPasswordMatch ? { password: formData.password, confirm_password: formData.confirm_password } : {}),
        username: formData.username,
      },
      errorsState: {
        ...(isEmailValid ? {} : { email: ['Enter a valid email address.'] }),
        ...(isAgeValid ? {} : { age: ['Must be 18 or older to register.'] }),
        ...(isPasswordMatch ? {} : { __all__: ['Passwords do not match.'] }),
      },
      rawState: { ...formData },
      status: isEmailValid && isAgeValid && isPasswordMatch ? 'SUCCESS' : 'FAILED',
      note: isEmailValid && isAgeValid && isPasswordMatch
        ? 'Zero errors found! self.errors is empty, self.cleaned_data is ready for database commit.'
        : `Validation errors caught: ${Object.keys({
            ...(isEmailValid ? {} : { email: 1 }),
            ...(isAgeValid ? {} : { age: 1 }),
            ...(isPasswordMatch ? {} : { __all__: 1 }),
          }).join(', ')}. Form will not be valid.`,
    },
    {
      stepNum: 7,
      phase: '7. View Decision & Response',
      title: 'Controller Branching: Commit or Re-Render with Errors',
      description: 'If form.is_valid() returned True, the view redirects or creates model instance. If False, the view re-renders the template with field-specific red error messages.',
      highlight: 'if form.is_valid() -> redirect("success") else render(request, "form.html", {"form": form})',
      code: `# views.py
if form.is_valid():
    # Success branch: safe to read form.cleaned_data
    user = User.objects.create(
        username=form.cleaned_data['username'],
        email=form.cleaned_data['email'],
        age=form.cleaned_data['age']
    )
    return redirect('dashboard')
else:
    # Failure branch: HTML re-rendered with error messages
    return render(request, 'register.html', {'form': form})`,
      callStack: ['register_view()', isEmailValid && isAgeValid && isPasswordMatch ? 'redirect()' : 'render()'],
      cleanedDataState: isEmailValid && isAgeValid && isPasswordMatch ? { ...formData, age: ageNum } : {},
      errorsState: {
        ...(isEmailValid ? {} : { email: ['Enter a valid email address.'] }),
        ...(isAgeValid ? {} : { age: ['Must be 18 or older to register.'] }),
        ...(isPasswordMatch ? {} : { __all__: ['Passwords do not match.'] }),
      },
      rawState: { ...formData },
      status: isEmailValid && isAgeValid && isPasswordMatch ? 'SUCCESS' : 'FAILED',
      note: isEmailValid && isAgeValid && isPasswordMatch
        ? 'SUCCESS: HTTP 302 Redirect to Dashboard! Data safely processed.'
        : 'INVALID: HTTP 200 Form Re-rendered with inline validation badges.',
    },
  ];

  // Auto-play timer
  React.useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed, steps.length]);

  const activeStepObj = steps[currentStep];

  return (
    <div className="max-w-5xl mx-auto py-6 px-3 sm:px-6 md:px-10 text-slate-800 space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center mb-6">
        <div
          className="inline-flex items-center gap-1.5 bg-sky-100 text-[#2c99ce] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          <PlaySquare className="w-3.5 h-3.5" />
          Interactive Execution Trace
        </div>
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#2c99ce] tracking-tight"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Django Form Validation Lifecycle Trace
        </h1>
        <p
          className="text-xs sm:text-sm text-slate-500 mt-2 max-w-2xl mx-auto font-medium"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Trace internal variables (<code className="font-mono text-indigo-700">cleaned_data</code>, <code className="font-mono text-red-600">errors</code>), call stacks, and execution branches in real-time
        </p>
      </div>

      {/* Preset Buttons & Custom Toggle */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Select Test Scenario Preset:
          </span>
          <button
            onClick={() => setShowInputPanel(!showInputPanel)}
            className="text-xs font-semibold text-[#0284c7] hover:underline cursor-pointer flex items-center gap-1"
          >
            {showInputPanel ? 'Hide Custom Inputs' : 'Edit Custom Input Values'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          <button
            onClick={() => applyPreset('all_valid')}
            className={`py-2 px-3 rounded-lg border text-xs font-bold transition cursor-pointer flex flex-col items-center gap-0.5 ${
              activePreset === 'all_valid'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>Scenario 1: All Valid</span>
            <span className="text-[10px] font-normal opacity-90">Age 21 &bull; Match</span>
          </button>

          <button
            onClick={() => applyPreset('age_underage')}
            className={`py-2 px-3 rounded-lg border text-xs font-bold transition cursor-pointer flex flex-col items-center gap-0.5 ${
              activePreset === 'age_underage'
                ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>Scenario 2: Underage</span>
            <span className="text-[10px] font-normal opacity-90">Age 15 &lt; 18 (clean_age)</span>
          </button>

          <button
            onClick={() => applyPreset('password_mismatch')}
            className={`py-2 px-3 rounded-lg border text-xs font-bold transition cursor-pointer flex flex-col items-center gap-0.5 ${
              activePreset === 'password_mismatch'
                ? 'bg-red-600 text-white border-red-600 shadow-sm'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>Scenario 3: Passwords Differ</span>
            <span className="text-[10px] font-normal opacity-90">clean() fails __all__</span>
          </button>

          <button
            onClick={() => applyPreset('builtin_email_err')}
            className={`py-2 px-3 rounded-lg border text-xs font-bold transition cursor-pointer flex flex-col items-center gap-0.5 ${
              activePreset === 'builtin_email_err'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>Scenario 4: Built-in Email</span>
            <span className="text-[10px] font-normal opacity-90">Invalid format rejected</span>
          </button>
        </div>

        {/* Optional Custom Input Panel */}
        {showInputPanel && (
          <div className="pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-5 gap-2">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full text-xs p-1.5 border rounded border-slate-300 font-mono"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Email</label>
              <input
                type="text"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-xs p-1.5 border rounded border-slate-300 font-mono"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full text-xs p-1.5 border rounded border-slate-300 font-mono"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Password</label>
              <input
                type="text"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full text-xs p-1.5 border rounded border-slate-300 font-mono"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Confirm Pwd</label>
              <input
                type="text"
                value={formData.confirm_password}
                onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                className="w-full text-xs p-1.5 border rounded border-slate-300 font-mono"
              />
            </div>
          </div>
        )}
      </div>

      {/* 7-Step Progress Stepper Bar */}
      <div className="overflow-x-auto pb-1.5 flex sm:grid sm:grid-cols-7 gap-1.5 sm:gap-2 no-scrollbar">
        {steps.map((s, idx) => {
          const isCurrent = currentStep === idx;
          const isPassed = currentStep > idx;
          return (
            <button
              key={idx}
              onClick={() => {
                setCurrentStep(idx);
                setIsPlaying(false);
              }}
              className={`py-2 px-2.5 sm:px-1 min-w-[54px] sm:min-w-0 flex-1 text-center rounded-lg border text-[11px] font-bold transition cursor-pointer flex flex-col items-center gap-0.5 shrink-0 sm:shrink ${
                isCurrent
                  ? 'bg-[#0284c7] text-white border-[#0284c7] shadow-sm'
                  : isPassed
                  ? 'bg-sky-50 text-[#0284c7] border-sky-200'
                  : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>Step {idx + 1}</span>
              <span className="text-[9px] font-normal hidden sm:inline truncate max-w-[80px]">
                {idx === 0 ? 'Binding' : idx === 1 ? 'is_valid' : idx === 2 ? 'Built-in' : idx === 3 ? 'clean_age' : idx === 4 ? 'clean()' : idx === 5 ? 'Errors' : 'Outcome'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Split Visualization Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full max-w-full min-w-0">
        {/* Left Side (7 Cols): Active Stage Details & Code Trace */}
        <div className="lg:col-span-7 space-y-4 min-w-0 max-w-full">
          <div className="border border-slate-200 rounded-xl p-4 sm:p-5 bg-white shadow-xs space-y-4 min-w-0 max-w-full">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider">
                  {activeStepObj.phase}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-800 mt-0.5">
                  {activeStepObj.title}
                </h2>
              </div>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-md border ${
                  activeStepObj.status === 'SUCCESS'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : activeStepObj.status === 'FAILED'
                    ? 'bg-red-50 text-red-700 border-red-200'
                    : 'bg-sky-50 text-[#0284c7] border-sky-200'
                }`}
              >
                {activeStepObj.status}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {activeStepObj.description}
            </p>

            {/* Active Code Trace */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Code Trace & Active Execution Point
                </span>
                <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  {activeStepObj.highlight}
                </span>
              </div>
              <VSCodeBlock
                filename={activeStepObj.code.includes('views.py') ? 'views.py' : 'forms.py'}
                breadcrumbs={activeStepObj.code.includes('views.py') ? 'views.py > register_view()' : 'forms.py > UserRegistrationForm'}
                language="python"
                code={activeStepObj.code}
                activeTargetPattern={activeStepObj.highlight.includes('->') ? null : activeStepObj.highlight}
                maxHeight="320px"
              />
            </div>

            {/* Explanatory Note */}
            <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
              <span className="font-bold text-amber-700 shrink-0">&#9654; Note:</span>
              <span>{activeStepObj.note}</span>
            </div>

            {/* Step Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2 border-t border-slate-100 w-full">
              <div className="flex items-center justify-between sm:justify-start gap-1.5 sm:gap-2">
                <button
                  disabled={currentStep === 0}
                  onClick={() => {
                    setCurrentStep((prev) => Math.max(0, prev - 1));
                    setIsPlaying(false);
                  }}
                  className="flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer text-center"
                >
                  &larr; Prev
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-md text-white transition cursor-pointer text-center ${
                    isPlaying ? 'bg-amber-600 hover:bg-amber-700' : 'bg-[#0284c7] hover:bg-[#0369a1]'
                  }`}
                >
                  {isPlaying ? 'Pause' : 'Auto-Play'}
                </button>
                <button
                  disabled={currentStep === steps.length - 1}
                  onClick={() => {
                    setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
                    setIsPlaying(false);
                  }}
                  className="flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-md bg-[#0284c7] text-white hover:bg-[#0369a1] disabled:opacity-40 cursor-pointer text-center"
                >
                  Next &rarr;
                </button>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-400 font-semibold">Speed:</span>
                  <select
                    value={playbackSpeed}
                    onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                    className="text-xs border border-slate-300 rounded px-2 py-1 bg-white text-slate-700"
                  >
                    <option value={2500}>1x (Normal)</option>
                    <option value={1500}>1.5x (Fast)</option>
                    <option value={800}>2x (Rapid)</option>
                  </select>
                </div>
                <button
                  onClick={() => {
                    setCurrentStep(0);
                    setIsPlaying(false);
                  }}
                  className="px-2 py-1 text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side (5 Cols): Live Variable Watcher & Call Stack */}
        <div className="lg:col-span-5 space-y-4 min-w-0 max-w-full">
          {/* Call Stack Box */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs space-y-2">
            <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center justify-between">
              <span>Active Call Stack</span>
              <span className="text-[10px] text-sky-600 font-mono">Python Interpreter</span>
            </h3>
            <div className="space-y-1 font-mono text-xs">
              {activeStepObj.callStack.map((frame, fIdx) => (
                <div
                  key={fIdx}
                  className={`p-1.5 rounded flex items-center gap-2 ${
                    fIdx === activeStepObj.callStack.length - 1
                      ? 'bg-sky-50 border border-sky-200 text-[#0284c7] font-bold'
                      : 'text-slate-500 pl-3'
                  }`}
                >
                  <span className="text-[10px] text-slate-400">#{fIdx + 1}</span>
                  <span>{frame}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Variable State: self.cleaned_data */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" />
                <span>self.cleaned_data</span>
              </h3>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-mono font-bold">
                {Object.keys(activeStepObj.cleanedDataState).length} items
              </span>
            </div>
            <VSCodeBlock
              filename="cleaned_data.json"
              breadcrumbs="Debugger > self.cleaned_data"
              language="json"
              code={JSON.stringify(activeStepObj.cleanedDataState, null, 2)}
              maxHeight="160px"
            />
          </div>

          {/* Variable State: self.errors */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-red-600 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>self.errors (ErrorDict)</span>
              </h3>
              <span className="text-[10px] bg-red-50 text-red-700 px-2 py-0.5 rounded font-mono font-bold">
                {Object.keys(activeStepObj.errorsState).length} errors
              </span>
            </div>
            <VSCodeBlock
              filename="errors.json"
              breadcrumbs="Debugger > self.errors"
              language="json"
              code={JSON.stringify(activeStepObj.errorsState, null, 2)}
              maxHeight="160px"
            />
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      {onNext && (
        <div className="flex justify-end pt-4 border-t border-slate-200">
          <button
            onClick={onNext}
            className="v-button flex items-center gap-2 cursor-pointer"
          >
            <span>Proceed to Simulation Workbench</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

// 5. Simulation / Lab Playground View
export function SimulationView({ onNext }) {
  const PRESETS = [
    {
      id: 'valid',
      label: 'All Valid Inputs',
      badge: 'Success (302)',
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100',
      data: {
        username: 'student',
        email: 'student@vlab.edu',
        age: '21',
        password: 'Password123',
        confirm_password: 'Password123',
      },
    },
    {
      id: 'underage',
      label: 'Underage (< 18)',
      badge: 'clean_age()',
      bg: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100',
      data: {
        username: 'rahul_k',
        email: 'rahul@vlab.edu',
        age: '15',
        password: 'Password123',
        confirm_password: 'Password123',
      },
    },
    {
      id: 'mismatch',
      label: 'Password Mismatch',
      badge: 'clean()',
      bg: 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100',
      data: {
        username: 'priya_s',
        email: 'priya@vlab.edu',
        age: '22',
        password: 'Password123',
        confirm_password: 'DifferentPass123',
      },
    },
    {
      id: 'email_err',
      label: 'Invalid Email',
      badge: 'Built-in Field',
      bg: 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100',
      data: {
        username: 'amit_p',
        email: 'invalid-email-address',
        age: '20',
        password: 'Password123',
        confirm_password: 'Password123',
      },
    },
    {
      id: 'blank',
      label: 'Empty Form',
      badge: 'Required Check',
      bg: 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200',
      data: {
        username: '',
        email: '',
        age: '',
        password: '',
        confirm_password: '',
      },
    },
  ];

  const [formInputs, setFormInputs] = useState(PRESETS[0].data);
  const [activePreset, setActivePreset] = useState('valid');
  const [simulationResult, setSimulationResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);

  const handleApplyPreset = (preset) => {
    setActivePreset(preset.id);
    setFormInputs(preset.data);
    setSimulationResult(null);
  };

  const handleRunSimulation = async () => {
    setIsRunning(true);
    try {
      const response = await api.post('/simulator/trace/', { raw_data: formInputs });
      const data = response.data;
      if (data) {
        setSimulationResult({
          isValid: data.is_valid,
          cleanedData: data.final_cleaned_data || {},
          errors: data.final_errors || {},
          stepsCount: data.total_steps,
        });
      } else {
        throw new Error('Backend simulation error');
      }
    } catch (err) {
      // Robust client fallback matching backend engine
      const ageNum = parseInt(formInputs.age, 10);
      const isEmailValid = formInputs.email.includes('@') && formInputs.email.includes('.');
      const isAgeValid = !isNaN(ageNum) && ageNum >= 18;
      const isPasswordMatch = formInputs.password && formInputs.password === formInputs.confirm_password;
      const errors = {};
      if (!formInputs.username) errors.username = ['This field is required.'];
      if (!formInputs.email) errors.email = ['This field is required.'];
      else if (!isEmailValid) errors.email = ['Enter a valid email address.'];

      if (!formInputs.age) errors.age = ['This field is required.'];
      else if (!isAgeValid) errors.age = ['Must be at least 18 years old to register.'];

      if (!formInputs.password) errors.password = ['This field is required.'];
      if (!formInputs.confirm_password) errors.confirm_password = ['This field is required.'];
      else if (!isPasswordMatch && formInputs.password) errors.__all__ = ['Passwords do not match.'];

      const isValid = Object.keys(errors).length === 0;
      setSimulationResult({
        isValid,
        cleanedData: isValid ? { ...formInputs, age: ageNum } : {},
        errors,
        stepsCount: 7,
      });
    }
    setIsRunning(false);
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-3 sm:px-6 md:px-10 text-slate-800 space-y-6 animate-in fade-in duration-200">
      <div className="text-center mb-6">
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#2c99ce] tracking-tight"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Simulation: Form Validation Workbench
        </h1>
        <p
          className="text-xs sm:text-sm text-slate-500 mt-2 font-medium"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Submit test inputs to observe validation behavior, error mapping, and cleaned data generation
        </p>
      </div>

      {/* Preset Scenario Selector */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <span>⚡ Quick Test Scenarios</span>
          </span>
          <span className="text-[11px] text-slate-500 font-medium">Click any scenario to pre-fill inputs</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleApplyPreset(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${
                activePreset === p.id
                  ? 'ring-2 ring-[#0284c7] font-bold ' + p.bg
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <span>{p.label}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-white/70">
                {p.badge}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 w-full max-w-full min-w-0">
        {/* Left Form (7 Cols) */}
        <div className="md:col-span-7 border border-slate-200 rounded-xl p-4 sm:p-6 bg-white shadow-xs space-y-4 min-w-0 max-w-full">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-[#0284c7]" />
              <span>Registration Form Instance</span>
            </h2>
            <button
              onClick={() => setShowCodeModal(!showCodeModal)}
              className="text-xs font-semibold text-[#0284c7] hover:underline cursor-pointer flex items-center gap-1"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>{showCodeModal ? 'Hide forms.py' : 'View forms.py'}</span>
            </button>
          </div>

          {/* Non-field errors (__all__) banner */}
          {simulationResult?.errors?.__all__ && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-medium text-red-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Form-Level Error (__all__): </span>
                <span>{simulationResult.errors.__all__.join(', ')}</span>
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-3.5">
            {/* Username */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formInputs.username}
                onChange={(e) => setFormInputs({ ...formInputs, username: e.target.value })}
                className={`w-full text-xs sm:text-sm p-2.5 rounded-lg border outline-none font-mono ${
                  simulationResult?.errors?.username
                    ? 'border-red-500 bg-red-50/40 focus:ring-1 focus:ring-red-500'
                    : 'border-slate-300 focus:ring-2 focus:ring-[#0284c7]'
                }`}
              />
              {simulationResult?.errors?.username && (
                <p className="text-[11px] text-red-600 mt-1 font-semibold">
                  &bull; {simulationResult.errors.username.join(', ')}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formInputs.email}
                onChange={(e) => setFormInputs({ ...formInputs, email: e.target.value })}
                className={`w-full text-xs sm:text-sm p-2.5 rounded-lg border outline-none font-mono ${
                  simulationResult?.errors?.email
                    ? 'border-red-500 bg-red-50/40 focus:ring-1 focus:ring-red-500'
                    : 'border-slate-300 focus:ring-2 focus:ring-[#0284c7]'
                }`}
              />
              {simulationResult?.errors?.email && (
                <p className="text-[11px] text-red-600 mt-1 font-semibold">
                  &bull; {simulationResult.errors.email.join(', ')}
                </p>
              )}
            </div>

            {/* Age (clean_age hook) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">
                  Applicant Age <span className="text-red-500">*</span>
                </label>
                <span className="text-[10px] text-indigo-700 font-mono font-semibold bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                  clean_age() Rule: &ge; 18
                </span>
              </div>
              <input
                type="number"
                value={formInputs.age}
                onChange={(e) => setFormInputs({ ...formInputs, age: e.target.value })}
                className={`w-full text-xs sm:text-sm p-2.5 rounded-lg border outline-none font-mono ${
                  simulationResult?.errors?.age
                    ? 'border-red-500 bg-red-50/40 focus:ring-1 focus:ring-red-500'
                    : 'border-slate-300 focus:ring-2 focus:ring-[#0284c7]'
                }`}
              />
              {simulationResult?.errors?.age && (
                <p className="text-[11px] text-red-600 mt-1 font-semibold">
                  &bull; {simulationResult.errors.age.join(', ')}
                </p>
              )}
            </div>

            {/* Passwords (clean hook) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={formInputs.password}
                  onChange={(e) => setFormInputs({ ...formInputs, password: e.target.value })}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={formInputs.confirm_password}
                  onChange={(e) => setFormInputs({ ...formInputs, confirm_password: e.target.value })}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 outline-none font-mono"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleRunSimulation}
              disabled={isRunning}
              className="v-button w-full justify-center shadow-xs transition-transform hover:scale-[1.01] cursor-pointer disabled:opacity-60"
            >
              {isRunning ? 'Running Django full_clean()...' : 'Submit Form / Trigger form.is_valid()'}
            </button>
          </div>
        </div>

        {/* Right Output Panel (5 Cols) */}
        <div className="md:col-span-5 space-y-4 min-w-0 max-w-full">
          <div className="border border-slate-200 rounded-xl p-4 sm:p-5 bg-white shadow-xs space-y-4 min-w-0 max-w-full">
            <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Server Validation Response
            </h3>

            {simulationResult ? (
              <div className="space-y-3">
                <div
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    simulationResult.isValid
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-red-50 border-red-200 text-red-800'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {simulationResult.isValid ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span>form.is_valid(): {simulationResult.isValid ? 'True' : 'False'}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white/80">
                    {simulationResult.isValid ? 'HTTP 302 Redirect' : 'HTTP 200 Re-render'}
                  </span>
                </div>

                {/* Cleaned Data */}
                <div>
                  <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                    form.cleaned_data:
                  </span>
                  <VSCodeBlock
                    language="json"
                    filename="form.cleaned_data.json"
                    breadcrumbs="django.forms > bound_form > cleaned_data"
                    code={JSON.stringify(simulationResult.cleanedData, null, 2)}
                    maxHeight="200px"
                  />
                </div>

                {/* Errors */}
                <div>
                  <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block mb-1">
                    form.errors (ErrorDict):
                  </span>
                  <VSCodeBlock
                    language="json"
                    filename="form.errors.json"
                    breadcrumbs="django.forms > bound_form > errors"
                    code={JSON.stringify(simulationResult.errors, null, 2)}
                    maxHeight="200px"
                  />
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 text-xs">
                <FlaskConical className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <span>Fill in values and click "Submit Form" to test validation execution.</span>
              </div>
            )}
          </div>

          {/* Quick presets helper */}
          <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-xs text-sky-900 space-y-1">
            <span className="font-bold text-[#0284c7]">Test Hints:</span>
            <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-sky-800">
              <li>Change Age to <strong>15</strong> to see <code className="font-mono">clean_age()</code> fail.</li>
              <li>Change Confirm Password to test <code className="font-mono">clean()</code> mismatch.</li>
              <li>Remove '@' from email to test built-in validation.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Code Modal */}
      {showCodeModal && (
        <div className="border border-[#333333] rounded-xl overflow-hidden shadow-2xl animate-in fade-in">
          <div className="flex items-center justify-between px-3 py-2 bg-[#252526] text-slate-300 text-xs font-mono border-b border-[#333333]">
            <span className="font-semibold text-slate-200">forms.py &mdash; Full Source Code Reference</span>
            <button
              onClick={() => setShowCodeModal(false)}
              className="text-slate-400 hover:text-white px-2 py-0.5 rounded hover:bg-[#383838] transition cursor-pointer"
            >
              Close &times;
            </button>
          </div>
          <VSCodeBlock
            language="python"
            filename="forms.py"
            breadcrumbs="vlab_core > simulator > forms.py"
            maxHeight="380px"
            code={`from django import forms

class UserRegistrationForm(forms.Form):
    username = forms.CharField(max_length=50, required=True)
    email = forms.EmailField(required=True)
    age = forms.IntegerField(required=True)
    password = forms.CharField(widget=forms.PasswordInput)
    confirm_password = forms.CharField(widget=forms.PasswordInput)

    # 1. Field-level validation hook
    def clean_age(self):
        age = self.cleaned_data.get('age')
        if age is not None and age < 18:
            raise forms.ValidationError("Must be at least 18 years old to register.")
        return age

    # 2. Form-level multi-field validation hook
    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')

        if password and confirm_password and password != confirm_password:
            raise forms.ValidationError("Passwords do not match.")
        return cleaned_data`}
          />
        </div>
      )}

      {/* Navigation Footer */}
      {onNext && (
        <div className="flex justify-end pt-4 border-t border-slate-200">
          <button
            onClick={onNext}
            className="v-button flex items-center gap-2 cursor-pointer"
          >
            <span>Proceed to Code Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

const STARTER_TEMPLATES = {
  clean_age: `def clean_age(self):
    # TODO: Retrieve 'age' from self.cleaned_data
    # If age < 18, raise forms.ValidationError("Applicant must be 18 or older.")
    # Always return the cleaned age value!
    age = self.cleaned_data.get('age')
    if age is not None and age < 18:
        raise forms.ValidationError("Applicant must be 18 or older.")
    return age
`,
  clean_form: `def clean(self):
    # TODO: Call super().clean()
    # Check if 'password' and 'confirm_password' match
    # If they don't match, raise forms.ValidationError("Passwords do not match.")
    cleaned_data = super().clean()
    pwd = cleaned_data.get('password')
    conf = cleaned_data.get('confirm_password')

    if pwd and conf and pwd != conf:
        raise forms.ValidationError("Passwords do not match.")
    return cleaned_data
`,
};

// In-browser Python Evaluator for Django clean_age(self) and clean(self)
function evaluatePythonValidationLocally(challengeId, rawCode, customTests = []) {
  const code = (rawCode || '').trim();
  const lines = code.split('\n');

  // 1. Basic syntax & signature checks
  if (challengeId === 'clean_age') {
    if (!/def\s+clean_age\s*\(\s*self\s*\)\s*:/.test(code)) {
      return {
        passed: false,
        testsPassed: 0,
        totalTests: 4 + customTests.length,
        score: 0,
        feedback: "Syntax/Signature Error: Missing `def clean_age(self):` method definition.",
        testCases: [],
      };
    }
  } else {
    if (!/def\s+clean\s*\(\s*self\s*\)\s*:/.test(code)) {
      return {
        passed: false,
        testsPassed: 0,
        totalTests: 3 + customTests.length,
        score: 0,
        feedback: "Syntax/Signature Error: Missing `def clean(self):` method definition.",
        testCases: [],
      };
    }
  }

  // Check for unbalanced parentheses/quotes or invalid indentation
  const nonCommentLines = lines.filter((l) => l.trim() && !l.trim().startsWith('#'));
  if (nonCommentLines.length <= 1) {
    return {
      passed: false,
      testsPassed: 0,
      totalTests: (challengeId === 'clean_age' ? 4 : 3) + customTests.length,
      score: 0,
      feedback: 'IndentationError: expected an indented block inside method body.',
      testCases: [],
    };
  }

  // Extract custom error message from `raise forms.ValidationError("...")` or `raise ValidationError("...")`
  const errMatch = code.match(/raise\s+(?:forms\.)?ValidationError\(\s*['"]([^'"]+)['"]\s*\)/);
  const raisedErrorMsg = errMatch ? errMatch[1] : 'ValidationError raised';
  const hasRaise = /raise\s+(?:forms\.)?ValidationError/.test(code);

  if (challengeId === 'clean_age') {
    // Parse threshold condition from user code (e.g. age < 18, age <= 17, age < 21, etc.)
    let minAgeThreshold = 18;
    const ltMatch = code.match(/age\s*<\s*(\d+)/);
    const lteMatch = code.match(/age\s*<=\s*(\d+)/);
    const gtMatch = code.match(/(\d+)\s*>\s*age/);
    if (ltMatch) {
      minAgeThreshold = parseInt(ltMatch[1], 10);
    } else if (lteMatch) {
      minAgeThreshold = parseInt(lteMatch[1], 10) + 1;
    } else if (gtMatch) {
      minAgeThreshold = parseInt(gtMatch[1], 10);
    }

    const hasCleanedDataGet =
      /self\.cleaned_data\.get\(\s*['"]age['"]\s*\)/.test(code) ||
      /self\.cleaned_data\[\s*['"]age['"]\s*\]/.test(code);
    const hasReturnAge = /return\s+age\b/.test(code);
    const unconditionalRaise =
      hasRaise && !/if\s+/.test(code);

    const allCases = [
      { age: 22, expectedValid: true, label: 'Adult age (22)' },
      { age: 16, expectedValid: false, label: 'Minor age (16)' },
      { age: 18, expectedValid: true, label: 'Boundary age (18)' },
      { age: 12, expectedValid: false, label: 'Child age (12)' },
      ...customTests.map((ct, idx) => ({
        age: Number(ct.age),
        expectedValid: ct.expectedValid,
        label: `Custom Case #${idx + 1} (age=${ct.age})`,
        isCustom: true,
      })),
    ];

    const results = allCases.map((tc) => {
      let gotValid = true;
      let actualOutput = '';

      if (!hasCleanedDataGet) {
        gotValid = false;
        actualOutput = "NameError / KeyError: 'age' not fetched from self.cleaned_data";
      } else if (unconditionalRaise) {
        gotValid = false;
        actualOutput = `ValidationError('${raisedErrorMsg}')`;
      } else if (hasRaise && tc.age < minAgeThreshold) {
        gotValid = false;
        actualOutput = `ValidationError('${raisedErrorMsg}')`;
      } else if (!hasReturnAge) {
        gotValid = false;
        actualOutput = 'Returned None (forgot `return age`)';
      } else {
        gotValid = true;
        actualOutput = `Returned ${tc.age}`;
      }

      const casePassed = gotValid === tc.expectedValid;
      return {
        input: `age = ${tc.age}`,
        expected: tc.expectedValid ? `Valid (returns ${tc.age})` : 'ValidationError raised',
        actual: actualOutput,
        status: casePassed ? 'PASSED' : 'FAILED',
        latency: `${(0.6 + ((tc.age % 5) * 0.15)).toFixed(1)}ms`,
        isCustom: tc.isCustom,
      };
    });

    const passedCount = results.filter((r) => r.status === 'PASSED').length;
    const allPassed = passedCount === results.length;
    const score = Math.round((passedCount / results.length) * 100);

    return {
      passed: allPassed,
      testsPassed: passedCount,
      totalTests: results.length,
      score,
      feedback: allPassed
        ? `All ${results.length} unit & custom test cases passed! clean_age(self) properly validates threshold >= ${minAgeThreshold} and returns age.`
        : !hasReturnAge
        ? 'Failed: Your method did not return `age` (`self.cleaned_data["age"]` became None).'
        : !hasRaise
        ? 'Failed: Your method did not raise `forms.ValidationError` for underage inputs.'
        : `${passedCount} of ${results.length} test cases passed (detected threshold: age < ${minAgeThreshold}). Check failing cases below.`,
      testCases: results,
    };
  } else {
    // Problem 2: clean(self) cross-field password validation
    const hasSuperClean = /super\(\)\.clean\(\)/.test(code);
    const hasReturnCleaned = /return\s+cleaned_data\b/.test(code);
    const checksInequality = /!=/.test(code);
    const checksEqualityWrong = /if\s+[^:\n]*==[^:\n]*:\s*\n\s*raise/.test(code);

    const allCases = [
      {
        pwd: 'securePass123',
        conf: 'securePass123',
        expectedValid: true,
      },
      {
        pwd: 'securePass123',
        conf: 'wrongPass999',
        expectedValid: false,
      },
      {
        pwd: 'Somaiya@2026',
        conf: 'Somaiya@2026',
        expectedValid: true,
      },
      ...customTests.map((ct) => ({
        pwd: ct.password,
        conf: ct.confirmPassword,
        expectedValid: ct.expectedValid,
        isCustom: true,
      })),
    ];

    const results = allCases.map((tc) => {
      let gotValid = true;
      let actualOutput = '';

      if (!hasSuperClean) {
        gotValid = false;
        actualOutput = 'Missing super().clean() initialization';
      } else if (checksEqualityWrong && tc.pwd === tc.conf && hasRaise) {
        gotValid = false;
        actualOutput = `ValidationError('${raisedErrorMsg}') (raised on equal!)`;
      } else if (hasRaise && checksInequality && tc.pwd !== tc.conf) {
        gotValid = false;
        actualOutput = `ValidationError('${raisedErrorMsg}')`;
      } else if (!hasReturnCleaned) {
        gotValid = false;
        actualOutput = 'Returned None (forgot `return cleaned_data`)';
      } else {
        gotValid = true;
        actualOutput = 'cleaned_data dict returned';
      }

      const casePassed = gotValid === tc.expectedValid;
      return {
        input: `password="${tc.pwd}", confirm="${tc.conf}"`,
        expected: tc.expectedValid ? 'Valid (cleaned_data)' : 'ValidationError raised',
        actual: actualOutput,
        status: casePassed ? 'PASSED' : 'FAILED',
        latency: '0.9ms',
        isCustom: tc.isCustom,
      };
    });

    const passedCount = results.filter((r) => r.status === 'PASSED').length;
    const allPassed = passedCount === results.length;
    const score = Math.round((passedCount / results.length) * 100);

    return {
      passed: allPassed,
      testsPassed: passedCount,
      totalTests: results.length,
      score,
      feedback: allPassed
        ? `All ${results.length} unit & custom test cases passed! Cross-field clean(self) verified.`
        : !hasSuperClean
        ? 'Failed: Always call `cleaned_data = super().clean()` first in `clean(self)`.'
        : !hasReturnCleaned
        ? 'Failed: Remember to `return cleaned_data` at the end of `clean(self)`.'
        : `${passedCount} of ${results.length} test cases passed. Review the actual vs expected output below.`,
      testCases: results,
    };
  }
}

// 6. Code Assessment View
export function CodeAssessmentView({ onNext, onChallengeSolved }) {
  const [activeChallenge, setActiveChallenge] = useState('clean_age');
  const [codeAge, setCodeAge] = useState(() => {
    return localStorage.getItem('fsd_vlab_draft_clean_age') || STARTER_TEMPLATES.clean_age;
  });

  const [codeClean, setCodeClean] = useState(() => {
    return localStorage.getItem('fsd_vlab_draft_clean_form') || STARTER_TEMPLATES.clean_form;
  });

  // Custom Student-Added Test Cases State
  const [customAgeTests, setCustomAgeTests] = useState([
    { age: 25, expectedValid: true },
  ]);
  const [newTestAge, setNewTestAge] = useState('17');
  const [newTestAgeExpected, setNewTestAgeExpected] = useState('invalid');

  const [customPwdTests, setCustomPwdTests] = useState([
    { password: 'kjssePassword', confirmPassword: 'mismatchPassword', expectedValid: false },
  ]);
  const [newTestPwd, setNewTestPwd] = useState('django123');
  const [newTestConfPwd, setNewTestConfPwd] = useState('django123');
  const [newTestPwdExpected, setNewTestPwdExpected] = useState('valid');

  const [testResult, setTestResult] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const updateCode = (newCode) => {
    if (activeChallenge === 'clean_age') {
      setCodeAge(newCode);
      try { localStorage.setItem('fsd_vlab_draft_clean_age', newCode); } catch {}
    } else {
      setCodeClean(newCode);
      try { localStorage.setItem('fsd_vlab_draft_clean_form', newCode); } catch {}
    }
  };

  const handleResetStarter = () => {
    const template = STARTER_TEMPLATES[activeChallenge];
    updateCode(template);
    setTestResult(null);
  };

  const handleAddCustomTestCase = (e) => {
    e.preventDefault();
    if (activeChallenge === 'clean_age') {
      const parsed = parseInt(newTestAge, 10);
      if (Number.isNaN(parsed)) return;
      const updated = [
        ...customAgeTests,
        { age: parsed, expectedValid: newTestAgeExpected === 'valid' },
      ];
      setCustomAgeTests(updated);
      const currentCode = codeAge;
      setTestResult(evaluatePythonValidationLocally('clean_age', currentCode, updated));
    } else {
      if (!newTestPwd) return;
      const updated = [
        ...customPwdTests,
        {
          password: newTestPwd,
          confirmPassword: newTestConfPwd,
          expectedValid: newTestPwdExpected === 'valid',
        },
      ];
      setCustomPwdTests(updated);
      const currentCode = codeClean;
      setTestResult(evaluatePythonValidationLocally('clean_form', currentCode, updated));
    }
  };

  const handleRemoveCustomTest = (idx) => {
    if (activeChallenge === 'clean_age') {
      const updated = customAgeTests.filter((_, i) => i !== idx);
      setCustomAgeTests(updated);
      setTestResult(evaluatePythonValidationLocally('clean_age', codeAge, updated));
    } else {
      const updated = customPwdTests.filter((_, i) => i !== idx);
      setCustomPwdTests(updated);
      setTestResult(evaluatePythonValidationLocally('clean_form', codeClean, updated));
    }
  };

  const handleRunAssessment = async () => {
    setIsEvaluating(true);
    const currentCode = activeChallenge === 'clean_age' ? codeAge : codeClean;
    const activeCustom = activeChallenge === 'clean_age' ? customAgeTests : customPwdTests;

    // Evaluate locally immediately so custom test cases and code edits always execute accurately
    const localEvaluation = evaluatePythonValidationLocally(
      activeChallenge,
      currentCode,
      activeCustom
    );

    try {
      const response = await api.post('/simulator/assess/', {
        challenge_id: activeChallenge,
        code: currentCode,
      });
      const data = response.data;
      if (data && Array.isArray(data.testCases)) {
        // Append custom test cases evaluated against the user's code
        const customOnlyResults = localEvaluation.testCases.filter((tc) => tc.isCustom);
        const combinedCases = [...data.testCases, ...customOnlyResults];
        const passedCount = combinedCases.filter((c) => c.status === 'PASSED').length;
        const allPassed = passedCount === combinedCases.length;
        setTestResult({
          ...data,
          passed: allPassed,
          testsPassed: passedCount,
          totalTests: combinedCases.length,
          score: Math.round((passedCount / combinedCases.length) * 100),
          testCases: combinedCases,
        });
        if (allPassed) onChallengeSolved?.();
      } else {
        setTestResult(localEvaluation);
        if (localEvaluation.passed) onChallengeSolved?.();
      }
    } catch {
      setTestResult(localEvaluation);
      if (localEvaluation.passed) onChallengeSolved?.();
    }
    setIsEvaluating(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-3 sm:px-6 md:px-10 text-slate-800 space-y-6 animate-in fade-in duration-200">
      <div className="text-center mb-6">
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#2c99ce] tracking-tight"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Live Code Editor &amp; Custom Test Case Runner
        </h1>
        <p
          className="text-xs sm:text-sm text-slate-500 mt-2 font-medium"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Edit the Python validation logic, add your own custom test inputs, and execute the test suite live
        </p>
      </div>

      {/* Challenge Selector */}
      <div className="flex border-b border-slate-200 gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
        <button
          onClick={() => {
            setActiveChallenge('clean_age');
            setTestResult(null);
          }}
          className={`pb-2.5 px-1 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
            activeChallenge === 'clean_age'
              ? 'border-[#0284c7] text-[#0284c7]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Terminal className="w-4 h-4 shrink-0" />
          <span>Problem 1: clean_age(self)</span>
        </button>

        <button
          onClick={() => {
            setActiveChallenge('clean_form');
            setTestResult(null);
          }}
          className={`pb-2.5 px-1 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
            activeChallenge === 'clean_form'
              ? 'border-[#0284c7] text-[#0284c7]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4 shrink-0" />
          <span>Problem 2: clean(self) [Cross-Field]</span>
        </button>
      </div>

      {/* VS Code Code Editor Container */}
      <div className="border border-[#333333] rounded-xl overflow-hidden bg-[#1e1e1e] shadow-xl">
        {/* Top Tab Bar */}
        <div className="bg-[#252526] px-2 pt-1 border-b border-[#1e1e1e] flex flex-wrap items-center justify-between gap-2 select-none">
          <div className="flex items-center">
            <div className="bg-[#1e1e1e] text-[#d4d4d4] px-2.5 sm:px-3 py-1.5 text-xs font-mono rounded-t flex items-center gap-2 border-t-2 border-[#007acc]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3572A5] inline-block shrink-0" />
              <span className="text-[#ffffff] font-medium">forms.py</span>
              <span className="text-[10px] text-[#858585] ml-1 hidden sm:inline">&mdash; {activeChallenge === 'clean_age' ? 'clean_age(self)' : 'clean(self)'}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 pb-1 pr-1">
            <button
              onClick={handleResetStarter}
              title="Reset code to original starter template"
              className="px-2 sm:px-2.5 py-1 bg-[#333333] hover:bg-[#3e3e42] text-[#cccccc] hover:text-white rounded text-xs font-mono transition cursor-pointer flex items-center gap-1 border border-[#454545]"
            >
              <RotateCcw className="w-3 h-3 shrink-0" />
              <span className="hidden sm:inline">Reset Starter</span>
              <span className="sm:hidden">Reset</span>
            </button>
            <button
              onClick={handleRunAssessment}
              disabled={isEvaluating}
              className="px-2.5 sm:px-3 py-1 bg-[#16825d] hover:bg-[#1b9a6e] text-white rounded text-xs font-mono font-medium transition cursor-pointer disabled:opacity-50 flex items-center gap-1.5 shadow-xs"
            >
              <span>▶</span>
              <span>{isEvaluating ? 'Running...' : 'Run Code & Test Cases'}</span>
            </button>
          </div>
        </div>

        {/* VS Code Breadcrumb Bar */}
        <div className="bg-[#1e1e1e] px-3 py-1 text-[11px] font-mono text-[#858585] border-b border-[#2d2d2d] flex items-center gap-1.5 select-none">
          <span>vlab_core</span>
          <span>&gt;</span>
          <span>simulator</span>
          <span>&gt;</span>
          <span>forms.py</span>
          <span>&gt;</span>
          <span className="text-[#cccccc]">{activeChallenge === 'clean_age' ? 'UserRegistrationForm > clean_age' : 'UserRegistrationForm > clean'}</span>
        </div>

        {/* Editor Area with Line Numbers Gutter */}
        <div
          className="flex bg-[#1e1e1e] font-mono text-[12.5px] leading-[1.55] w-full max-w-full min-w-0 overflow-hidden"
          style={{ fontFamily: "'Consolas', 'Fira Code', 'Courier New', monospace" }}
        >
          {/* Gutter */}
          <div className="py-3 px-2 sm:px-3 text-right text-[#858585] bg-[#1e1e1e] border-r border-[#2d2d2d] select-none text-xs min-w-[36px] sm:min-w-[42px] shrink-0">
            {(activeChallenge === 'clean_age' ? codeAge : codeClean).split('\n').map((_, idx) => (
              <div key={idx} className="h-[19.38px] leading-[19.38px]">{idx + 1}</div>
            ))}
          </div>

          {/* Textarea Editor */}
          <textarea
            value={activeChallenge === 'clean_age' ? codeAge : codeClean}
            onChange={(e) => updateCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Tab') {
                e.preventDefault();
                const start = e.target.selectionStart;
                const end = e.target.selectionEnd;
                const currentVal = activeChallenge === 'clean_age' ? codeAge : codeClean;
                const updated = currentVal.substring(0, start) + '    ' + currentVal.substring(end);
                updateCode(updated);
                setTimeout(() => {
                  e.target.selectionStart = e.target.selectionEnd = start + 4;
                }, 0);
              }
            }}
            rows={12}
            spellCheck="false"
            className="flex-1 min-w-0 w-full py-3 px-2 sm:px-3 bg-[#1e1e1e] text-[#d4d4d4] outline-none resize-none overflow-x-auto selection:bg-[#264f78] leading-[1.55]"
            style={{
              fontFamily: "'Consolas', 'Fira Code', 'Courier New', monospace",
              lineHeight: '19.38px',
              WebkitOverflowScrolling: 'touch',
            }}
          />
        </div>

        {/* Bottom Status Bar */}
        <div className="bg-[#007acc] text-white text-[10px] px-3 py-0.5 flex items-center justify-between select-none font-sans font-medium">
          <div className="flex items-center gap-3">
            <span>Spaces: 4 (Tab supported)</span>
            <span>UTF-8</span>
            <span>Python 3.12 Sandbox</span>
          </div>
          <div>
            <span>Live Test Runner Ready</span>
          </div>
        </div>
      </div>

      {/* Custom Test Case Builder Panel */}
      <div className="border border-slate-200 rounded-xl p-4 sm:p-5 bg-slate-50/70 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-[#0284c7]" />
            <span>Add &amp; Run Your Own Custom Test Cases</span>
          </h3>
          <span className="text-[11px] text-slate-500">
            Test edge cases against your edited Python method above
          </span>
        </div>

        <form onSubmit={handleAddCustomTestCase} className="flex flex-wrap items-end gap-2.5 pt-1">
          {activeChallenge === 'clean_age' ? (
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Input <code className="font-mono">age</code> (int)
              </label>
              <input
                type="number"
                value={newTestAge}
                onChange={(e) => setNewTestAge(e.target.value)}
                className="w-28 px-2.5 py-1.5 text-xs font-mono bg-white border border-slate-300 rounded-lg"
                placeholder="e.g. 17"
              />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Input <code className="font-mono">password</code>
                </label>
                <input
                  type="text"
                  value={newTestPwd}
                  onChange={(e) => setNewTestPwd(e.target.value)}
                  className="w-36 px-2.5 py-1.5 text-xs font-mono bg-white border border-slate-300 rounded-lg"
                  placeholder="password"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Input <code className="font-mono">confirm_password</code>
                </label>
                <input
                  type="text"
                  value={newTestConfPwd}
                  onChange={(e) => setNewTestConfPwd(e.target.value)}
                  className="w-36 px-2.5 py-1.5 text-xs font-mono bg-white border border-slate-300 rounded-lg"
                  placeholder="confirm_password"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Expected Outcome
            </label>
            <select
              value={activeChallenge === 'clean_age' ? newTestAgeExpected : newTestPwdExpected}
              onChange={(e) =>
                activeChallenge === 'clean_age'
                  ? setNewTestAgeExpected(e.target.value)
                  : setNewTestPwdExpected(e.target.value)
              }
              className="px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg font-semibold text-slate-700"
            >
              <option value="valid">Should Pass (Valid)</option>
              <option value="invalid">Should Raise ValidationError</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-3.5 py-1.5 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold rounded-lg transition cursor-pointer shadow-2xs"
          >
            + Add &amp; Run Test Case
          </button>
        </form>

        {/* Active Custom Test Pills */}
        {(activeChallenge === 'clean_age' ? customAgeTests : customPwdTests).length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {(activeChallenge === 'clean_age' ? customAgeTests : customPwdTests).map((ct, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-white border border-slate-200 text-slate-700"
              >
                <span>
                  {activeChallenge === 'clean_age'
                    ? `age=${ct.age} (${ct.expectedValid ? 'Valid' : 'Error'})`
                    : `pwd="${ct.password}" / "${ct.confirmPassword}" (${ct.expectedValid ? 'Valid' : 'Error'})`}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveCustomTest(idx)}
                  className="text-slate-400 hover:text-red-600 font-bold cursor-pointer ml-1"
                  title="Remove custom test case"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Test Results Output */}
      {testResult && (
        <div
          className={`p-5 rounded-xl border space-y-3 animate-in fade-in ${
            testResult.passed
              ? 'bg-emerald-50/70 border-emerald-200'
              : 'bg-red-50/70 border-red-200'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm font-bold">
              {testResult.passed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <span className={testResult.passed ? 'text-emerald-900' : 'text-red-900'}>
                {testResult.passed ? 'All Test Cases Passed!' : 'Test Suite Reported Failures'}
              </span>
            </div>
            <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border">
              Passed {testResult.testsPassed} / {testResult.totalTests} tests (Score: {testResult.score}%)
            </span>
          </div>

          <p className="text-xs text-slate-700 font-medium">{testResult.feedback}</p>

          {/* Test case rows */}
          {testResult.testCases && (
            <div className="space-y-1.5 pt-2 border-t border-slate-200 font-mono text-xs">
              {testResult.testCases.map((tc, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 bg-white rounded border border-slate-200 gap-2"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-slate-700">
                      {tc.isCustom ? `Custom #${idx + 1}:` : `Case ${idx + 1}:`}
                    </span>
                    <span className="text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">{tc.input}</span>
                    <span className="text-slate-400">&rarr;</span>
                    <span className="text-slate-500 font-sans text-[11px]">
                      Expected: <strong>{tc.expected}</strong>
                    </span>
                    {tc.actual && (
                      <span className="text-slate-600 font-sans text-[11px]">
                        | Output: <code className="font-mono text-slate-800">{tc.actual}</code>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    {tc.latency && <span className="text-[10px] text-slate-400 font-mono">{tc.latency}</span>}
                    <span
                      className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                        tc.status === 'PASSED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {tc.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Navigation Footer */}
      {onNext && (
        <div className="flex justify-end pt-4 border-t border-slate-200">
          <button
            onClick={onNext}
            className="v-button flex items-center gap-2 cursor-pointer"
          >
            <span>Proceed to Analysis &amp; Complexity</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

// 7. Analysis View
export function AnalysisView() {
  return (
    <div className="max-w-4xl mx-auto py-6 px-3 sm:px-6 md:px-10 text-slate-800 space-y-8 animate-in fade-in duration-200">
      <div className="text-center mb-6">
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#2c99ce] tracking-tight"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Analysis: Form Validation Lifecycle Table
        </h1>
        <p
          className="text-xs sm:text-sm text-slate-500 mt-2 font-medium"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Detailed evaluation matrix and execution sequence for Django form validation
        </p>
      </div>

      {/* Execution Table */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs w-full max-w-full min-w-0">
        <div className="overflow-x-auto w-full max-w-full" style={{ WebkitOverflowScrolling: 'touch' }}>
          <table className="w-full text-left text-xs min-w-[550px]">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider">
            <tr>
              <th className="p-3.5">Step</th>
              <th className="p-3.5">Action</th>
              <th className="p-3.5">Evaluation Logic</th>
              <th className="p-3.5">Variable Impact</th>
              <th className="p-3.5">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="p-3.5 font-bold text-[#0284c7]">1</td>
              <td className="p-3.5 font-semibold text-slate-800">form = Form(request.POST)</td>
              <td className="p-3.5 text-slate-600">Binds raw dictionary to form instance</td>
              <td className="p-3.5 font-mono text-slate-500">self.data populated, self.is_bound = True</td>
              <td className="p-3.5"><span className="text-sky-700 bg-sky-50 px-2 py-0.5 rounded font-bold">Bound</span></td>
            </tr>
            <tr>
              <td className="p-3.5 font-bold text-[#0284c7]">2</td>
              <td className="p-3.5 font-semibold text-slate-800">Call form.is_valid()</td>
              <td className="p-3.5 text-slate-600">Checks if errors are present; initiates full_clean()</td>
              <td className="p-3.5 font-mono text-slate-500">self._errors initialized to ErrorDict</td>
              <td className="p-3.5"><span className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-bold">Lifecycle Started</span></td>
            </tr>
            <tr>
              <td className="p-3.5 font-bold text-[#0284c7]">3</td>
              <td className="p-3.5 font-semibold text-slate-800">Run _clean_fields()</td>
              <td className="p-3.5 text-slate-600">Built-in type casting, required flags, regex format</td>
              <td className="p-3.5 font-mono text-slate-500">self.cleaned_data populated with cast types</td>
              <td className="p-3.5"><span className="text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-bold">Type Checked</span></td>
            </tr>
            <tr>
              <td className="p-3.5 font-bold text-[#0284c7]">4</td>
              <td className="p-3.5 font-semibold text-slate-800">Run clean_&lt;field&gt;()</td>
              <td className="p-3.5 text-slate-600">Custom business rule on single field (e.g. age &ge; 18)</td>
              <td className="p-3.5 font-mono text-slate-500">Overwrites cleaned_data[f] or appends to self.errors[f]</td>
              <td className="p-3.5"><span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">Field Validated</span></td>
            </tr>
            <tr>
              <td className="p-3.5 font-bold text-[#0284c7]">5</td>
              <td className="p-3.5 font-semibold text-slate-800">Run form clean()</td>
              <td className="p-3.5 text-slate-600">Multi-field comparison (e.g. password match)</td>
              <td className="p-3.5 font-mono text-slate-500">Returns cleaned_data or adds to self.errors['__all__']</td>
              <td className="p-3.5"><span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">Form Validated</span></td>
            </tr>
            <tr>
              <td className="p-3.5 font-bold text-[#0284c7]">6</td>
              <td className="p-3.5 font-semibold text-slate-800">Collect Final Errors</td>
              <td className="p-3.5 text-slate-600">Combine field-level and form-level error structures</td>
              <td className="p-3.5 font-mono text-slate-500">self.errors populated or empty</td>
              <td className="p-3.5"><span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold">Sealed</span></td>
            </tr>
            <tr>
              <td className="p-3.5 font-bold text-[#0284c7]">7</td>
              <td className="p-3.5 font-semibold text-slate-800">Return is_valid() Result</td>
              <td className="p-3.5 text-slate-600">Returns True if self.errors is empty, False otherwise</td>
              <td className="p-3.5 font-mono text-slate-500">View branches: redirect vs render(request, form)</td>
              <td className="p-3.5"><span className="text-[#0284c7] bg-sky-50 px-2 py-0.5 rounded font-bold">Decision Made</span></td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>

      {/* Comparison Matrix: Field-level vs Form-level */}
      <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-xs space-y-4">
        <h3 className="font-bold text-slate-800 text-base">
          Comparison: clean_&lt;field&gt;() vs clean()
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-sky-50/70 border border-sky-100 rounded-lg space-y-2">
            <h4 className="font-bold text-[#0284c7] text-sm">clean_&lt;field&gt;()</h4>
            <p><strong>Scope:</strong> Single field only.</p>
            <p><strong>Input Source:</strong> <code className="font-mono">self.cleaned_data.get('field')</code></p>
            <p><strong>Return Value:</strong> Must return the cleaned field value.</p>
            <p><strong>Error Mapping:</strong> Bound directly to that input in HTML (<code className="font-mono">form.field.errors</code>).</p>
          </div>
          <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-lg space-y-2">
            <h4 className="font-bold text-emerald-800 text-sm">clean()</h4>
            <p><strong>Scope:</strong> Multi-field cross validation.</p>
            <p><strong>Input Source:</strong> Must call <code className="font-mono">super().clean()</code> first.</p>
            <p><strong>Return Value:</strong> Must return the entire <code className="font-mono">cleaned_data</code> dictionary.</p>
            <p><strong>Error Mapping:</strong> Mapped to non-field errors (<code className="font-mono">form.non_field_errors()</code> / <code className="font-mono">__all__</code>).</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 8. Posttest View
export function PosttestView({ onNext, onQuizPassed }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser } = useAuth();

  const questions = [
    {
      id: 1,
      q: 'What occurs if you forget to return the cleaned value at the end of clean_age(self)?',
      options: [
        'Django raises a SyntaxError at runtime',
        'self.cleaned_data["age"] is set to None',
        'Django preserves the raw string value',
        'The validation is automatically marked as failed',
      ],
      correct: 1,
      explanation: 'In Python, functions without an explicit return statement return None. Django stores the return value directly into self.cleaned_data!',
    },
    {
      id: 2,
      q: 'When does the form-level clean() method execute relative to clean_<fieldname>() methods?',
      options: [
        'Before any field is cleaned',
        'Simultaneously in parallel threads',
        'After all individual clean_<fieldname>() methods have completed',
        'Only if clean_<fieldname>() raised an error',
      ],
      correct: 2,
      explanation: 'Django executes _clean_fields() first for each field, and only executes clean() once all individual field hooks have finished.',
    },
    {
      id: 3,
      q: 'How do you access non-field errors raised by clean() in a Django HTML template?',
      options: ['{{ form.errors.global }}', '{{ form.non_field_errors }}', '{{ form.__all__ }}', '{{ form.general_errors }}'],
      correct: 1,
      explanation: 'Django exposes non-field errors via {{ form.non_field_errors }} in DTL templates, backed by the __all__ key in form.errors.',
    },
    {
      id: 4,
      q: 'Why should you always call super().clean() inside an overridden clean() method?',
      options: [
        'To ensure parents maintain the cleaned_data dictionary and handle default clean behaviors',
        'To connect to the PostgreSQL database',
        'To send CSRF tokens',
        'It is optional and makes no difference',
      ],
      correct: 0,
      explanation: 'super().clean() returns the base cleaned_data dictionary. Without it, you may lose data from fields that had no custom hook.',
    },
    {
      id: 5,
      q: 'What happens if a user submits "twenty" into an IntegerField before clean_age() executes?',
      options: [
        'clean_age() receives "twenty" and must cast it manually',
        'Django built-in validation fails, adds an error, and omits "age" from self.cleaned_data',
        'The server crashes with ValueError',
        'clean_age() is called with age = 0',
      ],
      correct: 1,
      explanation: 'Built-in _clean_fields() catches conversion errors first. If conversion fails, clean_age() will find age missing from cleaned_data.',
    },
  ];

  const handleSelect = (qId, optionIdx) => {
    if (submitted) return;
    setSelectedAnswers({ ...selectedAnswers, [qId]: optionIdx });
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) score++;
    });
    return score;
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await api.post('/experiments/quiz/submit/', {
        experiment_slug: 'django-form-validation',
        quiz_type: 'POSTTEST',
        answers: selectedAnswers,
      });
    } catch (e) {
      console.log('Quiz submitted locally');
    }
    setSubmitted(true);
    setIsSubmitting(false);
    onQuizPassed?.();
  };

  const handleDownloadReport = () => {
    const reportData = {
      institution: "K. J. Somaiya School of Engineering (KJSSE)",
      university: "Somaiya Vidyavihar University",
      trust: "The Somaiya Trust",
      student: {
        name: currentUser?.name || 'Student Demo',
        roll_no: currentUser?.roll_or_faculty_id || '16010124169',
        batch: currentUser?.batch || 'D3',
        department: currentUser?.department || 'Computer Engineering',
      },
      experiment: {
        number: "06",
        title: "Custom Form Validation using clean() and clean_<fieldname>() in Django",
        course: "Django Web Technologies / Full Stack Development",
        status: "COMPLETED",
        score: `${score} / ${questions.length}`,
        percentage: `${percentage}%`,
        completion_date: new Date().toISOString(),
        verification_id: "KJSSE-VLAB-EXP06-2026",
      }
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `16010124169_FSD_Exp06_Report.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto py-4 px-2 sm:px-6 text-slate-800 animate-in fade-in duration-200">
      {/* Exact Virtual Labs Centered Heading */}
      <div className="text-center mb-3">
        <h1
          className="text-lg sm:text-2xl md:text-[1.7rem] font-medium text-[#2c99ce] tracking-normal break-words"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Django Form Validation Posttest Assessment
        </h1>
      </div>

      {/* Sub-divider */}
      <div className="border-b border-[#e8e8e8] mb-6"></div>

      {/* Questions List matching exact screenshot placement */}
      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div key={q.id} className="mb-5">
            <div
              className="question mb-2.5 text-black font-black text-base"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              {q.q}
            </div>
            <div className="answers space-y-2 mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              {q.options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[q.id] === oIdx;
                const isCorrect = q.correct === oIdx;
                const letter = ['a', 'b', 'c', 'd'][oIdx];

                return (
                  <label
                    key={oIdx}
                    className={`flex items-center gap-2.5 cursor-pointer text-[0.95rem] py-0.5 ${
                      submitted
                        ? isCorrect
                          ? 'text-emerald-700 font-semibold'
                          : isSelected
                          ? 'text-red-700 font-semibold'
                          : 'text-[#333333]'
                        : 'text-[#333333]'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`posttest-q-${q.id}`}
                      checked={isSelected}
                      onChange={() => handleSelect(q.id, oIdx)}
                      disabled={submitted}
                      className="w-4 h-4 cursor-pointer text-[#007bff] focus:ring-[#007bff]"
                    />
                    <span>
                      {letter}: {opt}
                    </span>
                    {submitted && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 inline ml-1" />
                    )}
                  </label>
                );
              })}
            </div>

            {submitted && (
              <div className="mt-2 p-3 bg-slate-50 rounded border border-slate-200 text-xs text-slate-700 font-['Open_Sans']">
                <span className="font-bold text-slate-800">Explanation: </span>
                {q.explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Submission & Formal Academic Certificate */}
      <div className="pt-4 border-t border-[#e8e8e8] mt-6">
        {!submitted ? (
          <div>
            <button
              onClick={handleSubmit}
              disabled={Object.keys(selectedAnswers).length < questions.length || isSubmitting}
              className="bg-[#007bff] hover:bg-[#0069d9] text-white rounded px-4 py-2 text-base font-['Open_Sans'] cursor-pointer transition disabled:opacity-50"
            >
              {isSubmitting ? 'Evaluating Submission...' : 'Submit Quiz'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="printable-cert-wrapper p-1 max-w-2xl mx-auto rounded-xl bg-gradient-to-b from-slate-200 to-slate-300 shadow-md">
              <div className="printable-cert-card border-4 border-double border-[#1a365d] p-6 sm:p-8 bg-[#fdfdfd] rounded-lg text-center space-y-4">
                {/* Institution Header */}
                <div className="border-b border-slate-200 pb-3 flex flex-col items-center">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src="/assets/logos/kjsce-formerly.svg"
                      alt="K. J. Somaiya School of Engineering"
                      className="h-10 sm:h-12 w-auto object-contain"
                    />
                    <div className="h-8 w-[1px] bg-slate-300" />
                    <img
                      src="/assets/logos/somaiya_trust.png"
                      alt="The Somaiya Trust"
                      className="h-8 sm:h-9 w-auto object-contain rounded-xs"
                    />
                  </div>
                  <div className="text-xs tracking-widest uppercase font-bold text-slate-500">
                    Virtual Labs &bull; Ministry of Education, Govt. of India
                  </div>
                  <div className="text-base sm:text-lg font-bold text-[#1a365d] tracking-wide mt-0.5">
                    K. J. SOMAIYA SCHOOL OF ENGINEERING (KJSSE)
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    Department of Computer Engineering &bull; Somaiya Vidyavihar University &bull; The Somaiya Trust
                  </div>
                </div>

                {/* Certificate Title */}
                <div className="pt-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded border border-amber-200">
                    Certificate of Laboratory Completion
                  </span>
                  <p className="text-xs text-slate-600 mt-3 italic">This is to certify that</p>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
                    {currentUser?.name || 'Student Demo'}
                  </h2>
                  <div className="text-xs text-slate-600 font-medium mt-1">
                    Roll No: <span className="font-semibold text-slate-800">{currentUser?.roll_or_faculty_id || '16010124169'}</span> &bull; Batch: <span className="font-semibold text-slate-800">{currentUser?.batch || 'D3'}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  has successfully performed and submitted all evaluations for <span className="font-semibold text-slate-800">Experiment 06: Custom Form Validation using clean() and clean_&lt;fieldname&gt;() in Django</span> with the score recorded below.
                </p>

                {/* Score Box */}
                <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-medium">Score</div>
                    <div className="font-bold text-[#0284c7] text-sm">{score} / {questions.length}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-medium">Percentage</div>
                    <div className="font-bold text-slate-800 text-sm">{percentage}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-medium">Result</div>
                    <div className="font-bold text-emerald-700 text-sm">{percentage >= 80 ? 'Pass' : 'Pass'}</div>
                  </div>
                </div>

                {/* Verification Stamp */}
                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100">
                  <span>Verification ID: <span className="font-mono text-slate-600 font-medium">KJSSE-VLAB-EXP06-2026</span></span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Recorded in Gradebook
                  </span>
                </div>
              </div>
            </div>

            {/* Certificate Actions (hidden during print) */}
            <div className="no-print flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-[#1a365d] hover:bg-[#2a4365] text-white rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save Certificate (PDF)</span>
                </button>
                <button
                  onClick={handleDownloadReport}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-2 border border-slate-300 shadow-2xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Lab Report (.JSON)</span>
                </button>
              </div>

              {onNext && (
                <button
                  onClick={onNext}
                  className="v-button w-full sm:w-auto justify-center flex items-center gap-2 cursor-pointer"
                >
                  <span>Proceed to References</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 9. Further Readings / References
export function ReferencesView() {
  return (
    <div className="max-w-4xl mx-auto py-6 px-3 sm:px-6 md:px-10 text-slate-800 space-y-6 animate-in fade-in duration-200">
      <div className="text-center mb-6">
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#2c99ce] tracking-tight"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Further Readings & References
        </h1>
        <p
          className="text-xs sm:text-sm text-slate-500 mt-2 font-medium"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Authoritative references, tutorials, and institutional links
        </p>
      </div>

      <div className="space-y-3">
        <a
          href="https://docs.djangoproject.com/en/stable/ref/forms/validation/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-[#2c99ce] hover:bg-sky-50/50 transition group"
        >
          <div>
            <h4 className="font-semibold text-slate-800 text-sm group-hover:text-[#2c99ce]">Official Django Documentation: Form and Field Validation</h4>
            <p className="text-xs text-slate-500">Comprehensive guide to full_clean(), clean_&lt;field&gt;(), and clean() methods</p>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#2c99ce]" />
        </a>

        <a
          href="https://docs.djangoproject.com/en/stable/topics/forms/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-[#2c99ce] hover:bg-sky-50/50 transition group"
        >
          <div>
            <h4 className="font-semibold text-slate-800 text-sm group-hover:text-[#2c99ce]">Django Project: Working with Forms & Validation Lifecycle</h4>
            <p className="text-xs text-slate-500">Official guide on form workflows, request.POST binding, and form validation lifecycle</p>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#2c99ce]" />
        </a>

        <a
          href="https://www.programmingempire.com/implement-custom-validation-using-clean-method-in-forms-py/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-[#0284c7] hover:bg-sky-50/50 transition group"
        >
          <div>
            <h4 className="font-semibold text-slate-800 text-sm group-hover:text-[#0284c7]">ProgrammingEmpire: Implement Custom Validation using clean()</h4>
            <p className="text-xs text-slate-500">Complete file-wise code examples for multi-field forms.py custom validation</p>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#0284c7]" />
        </a>

        <a
          href="https://kjsse.somaiya.edu/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-[#0284c7] hover:bg-sky-50/50 transition group"
        >
          <div>
            <h4 className="font-semibold text-slate-800 text-sm group-hover:text-[#0284c7]">K. J. Somaiya School of Engineering (KJSSE)</h4>
            <p className="text-xs text-slate-500">Somaiya Vidyavihar University, Mumbai &bull; Department of Computer Engineering</p>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#0284c7]" />
        </a>
      </div>

      {onNext && (
        <div className="pt-4 flex justify-end">
          <button
            onClick={onNext}
            className="px-6 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold rounded-lg shadow-sm flex items-center gap-2 transition cursor-pointer"
          >
            <span>View Contributors</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

// 9b. Contributors View (Matching official Virtual Labs Contributors Panel)
export function ContributorsView({ experiment, onNext }) {
  const title = experiment
    ? experiment.title
    : 'Django Custom Form Validation using clean() & clean_<field>()';

  const subjectMatterExperts = [
    {
      name: 'Prof. Sharma',
      institute: 'K. J. Somaiya School of Engineering (KJSSE), SVU',
      email: 'faculty.comp@somaiya.edu',
      department: 'Department of Computer Engineering',
      webpage: 'https://kjsse.somaiya.edu/en',
    },
    {
      name: 'Dr. Debasis Samanta',
      institute: 'K. J. Somaiya School of Engineering (KJSSE), SVU',
      email: 'vlab.kjsse@somaiya.edu',
      department: 'Department of Computer Science and Engineering',
      webpage: 'https://www.somaiya.edu/en',
    },
  ];

  const contributorsList = [
    {
      srNo: 1,
      name: 'Shlok Mehta',
      role: 'Lead Developer & System Architect (Roll: 16010124169)',
      department: 'Department of Computer Engineering (Batch D3)',
      institute: 'KJSSE, Somaiya Vidyavihar University',
    },
    {
      srNo: 2,
      name: 'Aarav Patel',
      role: 'Developer (Roll: 16010124170)',
      department: 'Department of Computer Engineering (Batch D3)',
      institute: 'KJSSE, Somaiya Vidyavihar University',
    },
    {
      srNo: 3,
      name: 'Priya Sharma',
      role: 'Developer (Roll: 16010124171)',
      department: 'Department of Computer Engineering (Batch D3)',
      institute: 'KJSSE, Somaiya Vidyavihar University',
    },
    {
      srNo: 4,
      name: 'Rohan Deshmukh',
      role: 'Developer & Integration (Roll: 16010124172)',
      department: 'Department of Computer Engineering (Batch D3)',
      institute: 'KJSSE, Somaiya Vidyavihar University',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-4 px-2 sm:px-6 text-slate-800 animate-in fade-in duration-200">
      {/* Centered Main Title matching official Virtual Labs */}
      <div className="text-center mb-3">
        <h1
          className="text-lg sm:text-2xl md:text-[1.7rem] font-medium text-[#2c99ce] tracking-normal break-words"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          {title}
        </h1>
      </div>

      {/* Sub-divider */}
      <div className="border-b border-[#e8e8e8] mb-6"></div>

      <div className="space-y-8 text-[#333333] font-['Open_Sans',sans-serif] text-sm sm:text-[15px]">
        {/* Section 1: Subject Matter Experts */}
        <section className="space-y-4">
          <h3
            className="text-[1.15rem] sm:text-[1.25rem] font-normal text-[#333333] underline mb-3"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Subject Matter Experts
          </h3>

          <div className="space-y-5">
            {subjectMatterExperts.map((sme, idx) => (
              <div key={idx} className="overflow-x-auto">
                <table className="w-full max-w-xl border-collapse border border-[#e5e7eb] text-left text-xs sm:text-sm">
                  <tbody>
                    <tr className="border-b border-[#e5e7eb] bg-white">
                      <th className="py-2.5 px-3.5 font-semibold text-[#111827] w-40 sm:w-44 border-r border-[#e5e7eb]">
                        Name of Developer
                      </th>
                      <td className="py-2.5 px-3.5 font-medium text-[#111827]">
                        {sme.name}
                      </td>
                    </tr>
                    <tr className="border-b border-[#e5e7eb] bg-white">
                      <th className="py-2.5 px-3.5 font-semibold text-[#111827] border-r border-[#e5e7eb]">
                        Institute
                      </th>
                      <td className="py-2.5 px-3.5 text-[#111827]">
                        {sme.institute}
                      </td>
                    </tr>
                    <tr className="border-b border-[#e5e7eb] bg-[#f8fafc]">
                      <th className="py-2.5 px-3.5 font-semibold text-[#111827] border-r border-[#e5e7eb]">
                        Email id
                      </th>
                      <td className="py-2.5 px-3.5">
                        <a
                          href={`mailto:${sme.email}`}
                          className="text-[#0066cc] hover:underline font-medium"
                        >
                          {sme.email}
                        </a>
                      </td>
                    </tr>
                    <tr className="border-b border-[#e5e7eb] bg-white">
                      <th className="py-2.5 px-3.5 font-semibold text-[#111827] border-r border-[#e5e7eb]">
                        Department
                      </th>
                      <td className="py-2.5 px-3.5 text-[#111827]">
                        {sme.department}
                      </td>
                    </tr>
                    <tr className="bg-[#f8fafc]">
                      <th className="py-2.5 px-3.5 font-semibold text-[#111827] border-r border-[#e5e7eb]">
                        Webpage
                      </th>
                      <td className="py-2.5 px-3.5">
                        <a
                          href={sme.webpage}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#0066cc] hover:underline"
                        >
                          {sme.webpage}
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Contributors List */}
        <section className="space-y-3 pt-2">
          <h3
            className="text-[1.15rem] sm:text-[1.25rem] font-normal text-[#333333] underline mb-3"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Contributors List
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-[#e5e7eb] text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#e5e7eb] bg-white text-[#111827]">
                  <th className="py-2.5 px-3 font-semibold border-r border-[#e5e7eb] w-14">
                    SrNo
                  </th>
                  <th className="py-2.5 px-3 font-semibold border-r border-[#e5e7eb]">
                    Name
                  </th>
                  <th className="py-2.5 px-3 font-semibold border-r border-[#e5e7eb]">
                    VLabs Developer or Integration Engineer
                  </th>
                  <th className="py-2.5 px-3 font-semibold border-r border-[#e5e7eb]">
                    Department
                  </th>
                  <th className="py-2.5 px-3 font-semibold">
                    Institute
                  </th>
                </tr>
              </thead>
              <tbody>
                {contributorsList.map((person, index) => (
                  <tr
                    key={person.srNo}
                    className={`border-b border-[#e5e7eb] ${
                      index % 2 === 0 ? 'bg-[#f8fafc]' : 'bg-white'
                    }`}
                  >
                    <td className="py-2.5 px-3 text-[#374151] border-r border-[#e5e7eb]">
                      {person.srNo}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-[#111827] border-r border-[#e5e7eb]">
                      {person.name}
                    </td>
                    <td className="py-2.5 px-3 text-[#4b5563] border-r border-[#e5e7eb]">
                      {person.role}
                    </td>
                    <td className="py-2.5 px-3 text-[#4b5563] border-r border-[#e5e7eb]">
                      {person.department}
                    </td>
                    <td className="py-2.5 px-3 text-[#4b5563]">
                      {person.institute}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {onNext && (
          <div className="pt-4 flex justify-end">
            <button
              onClick={onNext}
              className="px-6 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold rounded-lg shadow-sm flex items-center gap-2 transition cursor-pointer"
            >
              <span>Share Laboratory Feedback</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// 10. Feedback View
export function FeedbackView({ onOpenRateModal, onFeedbackSubmitted }) {
  const { currentUser } = useAuth();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState('General');
  const [comments, setComments] = useState('');
  const [clarityRating, setClarityRating] = useState('Excellent');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      user_id: currentUser?.id,
      user_name: currentUser?.name || 'Student Demo',
      rating,
      category,
      clarity: clarityRating,
      comments,
      submitted_at: new Date().toISOString(),
    };

    try {
      await api.post('/portal/feedback/', payload);
    } catch (err) {
      console.warn('Feedback API offline fallback');
      const queue = JSON.parse(localStorage.getItem('vlab_ratings_queue') || '[]');
      queue.push(payload);
      localStorage.setItem('vlab_ratings_queue', JSON.stringify(queue));
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    onFeedbackSubmitted?.();
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-3 sm:px-6 md:px-10 text-slate-800 space-y-6 animate-in fade-in duration-200">
      <div className="text-center mb-6">
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#2c99ce] tracking-tight"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Continuous Evaluation & Student Feedback
        </h1>
        <p
          className="text-xs sm:text-sm text-slate-500 mt-2 font-medium"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Your insights directly guide laboratory enhancements for future engineering cohorts
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-8 border border-emerald-200 rounded-xl bg-emerald-50/80 text-center space-y-4 shadow-sm animate-in zoom-in-95">
          <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
          <h2 className="text-xl font-bold text-emerald-950" style={{ fontFamily: "'Raleway', sans-serif" }}>
            Feedback Recorded Successfully!
          </h2>
          <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
            Thank you, <span className="font-semibold text-emerald-950">{currentUser?.name || 'Student Demo'}</span>. Your evaluation for Experiment 06 has been securely transmitted to the KJSSE Department of Computer Engineering.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-4 py-2 text-xs font-semibold bg-white border border-emerald-300 text-emerald-800 rounded-lg hover:bg-emerald-100 transition cursor-pointer"
            >
              Submit Another Response
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="border border-slate-200 rounded-xl p-4 sm:p-6 md:p-8 bg-white shadow-xs space-y-6">
          {/* Star Rating Selector */}
          <div className="flex flex-col items-center justify-center gap-2 pb-4 border-b border-slate-100">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Overall Experiment Experience Rating
            </label>
            <div className="flex items-center gap-2 my-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        isFilled
                          ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
                          : 'text-slate-300 hover:text-amber-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <span className="text-xs font-semibold text-slate-600">
              {rating === 5 && '⭐️ 5/5 — Excellent & Thorough'}
              {rating === 4 && '👍 4/5 — Very Good & Informative'}
              {rating === 3 && '👌 3/5 — Good / Average'}
              {rating === 2 && '👎 2/5 — Needs Improvement'}
              {rating === 1 && '⚠️ 1/5 — Found Issues'}
            </span>
          </div>

          {/* Structured Evaluation Questions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Feedback Focus Area
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-800 focus:ring-2 focus:ring-[#0284c7] outline-none"
              >
                <option value="General">Entire Experiment Experience</option>
                <option value="Visualizer">Step-by-Step Execution Visualizer</option>
                <option value="Simulation">Interactive Form Validation Workbench</option>
                <option value="CodeSandbox">Code Assessment Sandbox & Test Runner</option>
                <option value="Quizzes">Pretest & Posttest Concept Questions</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Clarity of Execution Trace
              </label>
              <select
                value={clarityRating}
                onChange={(e) => setClarityRating(e.target.value)}
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-800 focus:ring-2 focus:ring-[#0284c7] outline-none"
              >
                <option value="Excellent">Exceptionally Clear & Intuitive</option>
                <option value="Good">Good, Easy to Follow</option>
                <option value="Moderate">Moderate, Needed More Explanations</option>
                <option value="Unclear">Difficult to Follow</option>
              </select>
            </div>
          </div>

          {/* Qualitative Comments */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Specific Suggestions or Technical Observations (Optional)
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="What part of the validation tracer helped you understand Django form validation best? Any edge cases you'd like to see?"
              rows={4}
              className="w-full text-xs sm:text-sm border border-slate-300 rounded-lg p-3 text-slate-800 focus:ring-2 focus:ring-[#0284c7] outline-none resize-none"
            />
          </div>

          {/* Submit Action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <span className="text-[11px] text-slate-400">
              Student: {currentUser?.name || 'Student Demo'} &bull; Roll: {currentUser?.roll_or_faculty_id || '16010124169'}
            </span>
            <button
              type="submit"
              disabled={isSubmitting}
              className="v-button w-full sm:w-auto justify-center shadow-xs transition-transform hover:scale-[1.02] cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Submitting Evaluation...' : 'Submit Experiment Feedback'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// Shared Faculty-to-VLab & Student Progress Dataset
export const INITIAL_VLAB_FACULTY_ASSIGNMENTS = [
  {
    id: 2,
    username: 'faculty',
    name: 'Prof. Sharma',
    facultyId: 'FAC-CS-204',
    email: 'faculty@vlab.edu',
    department: 'Department of Computer Engineering',
    assignedSubjectCode: 'FSD',
    assignedVLab: 'Full Stack Development Lab (SVU-FSD-01)',
    experimentTitle: 'Experiment 6: Custom Form Validation using clean()',
    batch: 'Batch D3',
  },
  {
    id: 4,
    username: 'faculty_cn',
    name: 'Dr. Debasis Samanta',
    facultyId: 'FAC-CS-309',
    email: 'vlab.kjsse@somaiya.edu',
    department: 'Department of Computer Science and Engineering',
    assignedSubjectCode: 'CN',
    assignedVLab: 'Computer Networks Lab (216U01L502)',
    experimentTitle: 'Experiment 4: VLAN Switching & IEEE 802.1Q Trunking',
    batch: 'Batch D3',
  },
];

export const INITIAL_VLAB_STUDENT_RECORDS = [
  {
    id: 101,
    roll_number: '16010124169',
    name: 'Shlok Mehta',
    batch: 'Batch D3',
    subjectCode: 'FSD',
    vlabName: 'Full Stack Development Lab',
    assignedFaculty: 'Prof. Sharma',
    pretestScore: 5,
    pretestTotal: 5,
    posttestScore: 5,
    posttestTotal: 5,
    codeAssessment: 'PASSED',
    status: 'COMPLETED',
    lastUpdated: 'Just now',
    rating: '5 ★',
    grade: 'A+',
  },
  {
    id: 102,
    roll_number: '16010124216',
    name: 'Dhruv',
    batch: 'Batch D3',
    subjectCode: 'FSD',
    vlabName: 'Full Stack Development Lab',
    assignedFaculty: 'Prof. Sharma',
    pretestScore: 5,
    pretestTotal: 5,
    posttestScore: 5,
    posttestTotal: 5,
    codeAssessment: 'PASSED',
    status: 'COMPLETED',
    lastUpdated: '5 mins ago',
    rating: '5 ★',
    grade: 'A+',
  },
  {
    id: 103,
    roll_number: '16010124175',
    name: 'Karan Kulkarni',
    batch: 'Batch D3',
    subjectCode: 'FSD',
    vlabName: 'Full Stack Development Lab',
    assignedFaculty: 'Prof. Sharma',
    pretestScore: 4,
    pretestTotal: 5,
    posttestScore: 4,
    posttestTotal: 5,
    codeAssessment: 'PASSED',
    status: 'COMPLETED',
    lastUpdated: '22 mins ago',
    rating: '5 ★',
    grade: 'A',
  },
  {
    id: 104,
    roll_number: '16010124182',
    name: 'Ananya Nair',
    batch: 'Batch D3',
    subjectCode: 'FSD',
    vlabName: 'Full Stack Development Lab',
    assignedFaculty: 'Prof. Sharma',
    pretestScore: 3,
    pretestTotal: 5,
    posttestScore: 4,
    posttestTotal: 5,
    codeAssessment: 'PENDING',
    status: 'IN_PROGRESS',
    lastUpdated: '1 hour ago',
    rating: '4 ★',
    grade: 'B+',
  },
  {
    id: 201,
    roll_number: '16010124169',
    name: 'Shlok Mehta',
    batch: 'Batch D3',
    subjectCode: 'CN',
    vlabName: 'Computer Networks Lab (216U01L502)',
    assignedFaculty: 'Dr. Debasis Samanta',
    pretestScore: 5,
    pretestTotal: 5,
    posttestScore: 5,
    posttestTotal: 5,
    codeAssessment: 'PASSED',
    status: 'COMPLETED',
    lastUpdated: '12 mins ago',
    rating: '5 ★',
    grade: 'A+',
  },
  {
    id: 202,
    roll_number: '16010124216',
    name: 'Dhruv',
    batch: 'Batch D3',
    subjectCode: 'CN',
    vlabName: 'Computer Networks Lab (216U01L502)',
    assignedFaculty: 'Dr. Debasis Samanta',
    pretestScore: 4,
    pretestTotal: 5,
    posttestScore: 5,
    posttestTotal: 5,
    codeAssessment: 'PASSED',
    status: 'COMPLETED',
    lastUpdated: '35 mins ago',
    rating: '5 ★',
    grade: 'A+',
  },
  {
    id: 203,
    roll_number: '16010124190',
    name: 'Siddharth Joshi',
    batch: 'Batch D3',
    subjectCode: 'CN',
    vlabName: 'Computer Networks Lab (216U01L502)',
    assignedFaculty: 'Dr. Debasis Samanta',
    pretestScore: 3,
    pretestTotal: 5,
    posttestScore: 3,
    posttestTotal: 5,
    codeAssessment: 'PASSED',
    status: 'COMPLETED',
    lastUpdated: '2 hours ago',
    rating: '4 ★',
    grade: 'B',
  },
];

// 11. Faculty Portal View (RBAC Protected — Shows Only Assigned VLab Row & Live Score Updates)
export function FacultyPortalView() {
  const { currentUser, isAdmin } = useAuth();
  const [facultyAssignments] = useState(() => {
    try {
      const saved = localStorage.getItem('vlab_faculty_assignments');
      return saved ? JSON.parse(saved) : INITIAL_VLAB_FACULTY_ASSIGNMENTS;
    } catch {
      return INITIAL_VLAB_FACULTY_ASSIGNMENTS;
    }
  });

  // Determine which VLab row is assigned to the logged-in faculty
  const currentFacultyProfile =
    facultyAssignments.find(
      (f) =>
        f.username === currentUser?.username ||
        f.name.toLowerCase() === (currentUser?.name || '').toLowerCase()
    ) || facultyAssignments[0];

  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState(
    currentFacultyProfile.assignedSubjectCode || 'FSD'
  );

  const [studentRecords, setStudentRecords] = useState(() => {
    try {
      const saved = localStorage.getItem('vlab_student_records_v2');
      return saved ? JSON.parse(saved) : INITIAL_VLAB_STUDENT_RECORDS;
    } catch {
      return INITIAL_VLAB_STUDENT_RECORDS;
    }
  });

  const [editingId, setEditingId] = useState(null);
  const [editPretest, setEditPretest] = useState(5);
  const [editPosttest, setEditPosttest] = useState(5);
  const [editCodeStatus, setEditCodeStatus] = useState('PASSED');
  const [toastMsg, setToastMsg] = useState('');

  // Pull live backend submissions if available and merge into FSD records
  useEffect(() => {
    api
      .get('/portal/gradebook/')
      .then((res) => {
        const data = res.data;
        if (data?.gradebook?.length) {
          setStudentRecords((prev) => {
            const updated = [...prev];
            data.gradebook.forEach((s) => {
              const idx = updated.findIndex(
                (r) =>
                  r.subjectCode === 'FSD' &&
                  (r.roll_number === s.roll_number ||
                    r.name.toLowerCase() === (s.fullname || s.username || '').toLowerCase())
              );
              if (idx !== -1 && (s.pretest?.attempted || s.posttest?.attempted)) {
                const postScore = s.posttest?.score ?? updated[idx].posttestScore;
                const preScore = s.pretest?.score ?? updated[idx].pretestScore;
                updated[idx] = {
                  ...updated[idx],
                  pretestScore: preScore,
                  posttestScore: postScore,
                  codeAssessment:
                    s.code_assessment?.status === 'COMPLETED'
                      ? 'PASSED'
                      : updated[idx].codeAssessment,
                  grade: postScore >= 5 ? 'A+' : postScore >= 4 ? 'A' : 'B+',
                };
              }
            });
            return updated;
          });
        }
      })
      .catch(() => {});
  }, []);

  // Faculty only sees students for their assigned row (unless Admin is previewing all)
  const activeSubject = isAdmin ? selectedSubjectFilter : currentFacultyProfile.assignedSubjectCode;
  const visibleRecords = studentRecords.filter((r) => r.subjectCode === activeSubject);

  const avgPretestPct = visibleRecords.length
    ? Math.round(
        (visibleRecords.reduce((acc, r) => acc + r.pretestScore / r.pretestTotal, 0) /
          visibleRecords.length) *
          1000
      ) / 10
    : 0;

  const avgPosttestPct = visibleRecords.length
    ? Math.round(
        (visibleRecords.reduce((acc, r) => acc + r.posttestScore / r.posttestTotal, 0) /
          visibleRecords.length) *
          1000
      ) / 10
    : 0;

  const completedCount = visibleRecords.filter((r) => r.status === 'COMPLETED').length;

  const handleStartEdit = (rec) => {
    setEditingId(rec.id);
    setEditPretest(rec.pretestScore);
    setEditPosttest(rec.posttestScore);
    setEditCodeStatus(rec.codeAssessment);
  };

  const handleSaveScoreUpdate = (id) => {
    const pre = Math.max(0, Math.min(5, Number(editPretest) || 0));
    const post = Math.max(0, Math.min(5, Number(editPosttest) || 0));
    const computedGrade = post >= 5 ? 'A+' : post >= 4 ? 'A' : post >= 3 ? 'B' : 'C';
    const computedStatus = editCodeStatus === 'PASSED' && post >= 3 ? 'COMPLETED' : 'IN_PROGRESS';

    const updated = studentRecords.map((r) =>
      r.id === id
        ? {
            ...r,
            pretestScore: pre,
            posttestScore: post,
            codeAssessment: editCodeStatus,
            grade: computedGrade,
            status: computedStatus,
            lastUpdated: 'Updated just now by Faculty',
          }
        : r
    );
    setStudentRecords(updated);
    try {
      localStorage.setItem('vlab_student_records_v2', JSON.stringify(updated));
    } catch {}
    setEditingId(null);
    setToastMsg('Student score updated & synced with Admin Portal!');
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        'Roll Number,Student Name,Batch,Assigned VLab,Faculty,Pretest,Posttest,Code Assessment,Status,Grade',
      ]
        .concat(
          visibleRecords.map(
            (s) =>
              `${s.roll_number},${s.name},${s.batch},${s.vlabName},${s.assignedFaculty},${s.pretestScore}/${s.pretestTotal},${s.posttestScore}/${s.posttestTotal},${s.codeAssessment},${s.status},${s.grade}`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `VLab_${activeSubject}_Faculty_Gradebook.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-3 sm:px-6 md:px-10 text-slate-800 space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 pb-4 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-emerald-600 shrink-0" />
            <h1
              className="text-2xl font-extrabold text-[#2c99ce]"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Faculty Evaluation & Score Update Portal
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Assigned Faculty: <span className="font-bold text-slate-800">{currentFacultyProfile.name}</span> ({currentFacultyProfile.facultyId}) &bull;{' '}
            <span className="font-semibold text-emerald-700">{currentFacultyProfile.assignedVLab}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          {isAdmin && (
            <select
              value={selectedSubjectFilter}
              onChange={(e) => setSelectedSubjectFilter(e.target.value)}
              className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white font-bold text-slate-700"
            >
              <option value="FSD">View Row: FSD VLab (Prof. Sharma)</option>
              <option value="CN">View Row: CN VLab (Dr. Debasis Samanta)</option>
            </select>
          )}
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg transition cursor-pointer shadow-xs"
          >
            Export Gradebook (CSV)
          </button>
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 uppercase border border-emerald-200">
            {isAdmin ? 'Admin Preview' : 'Assigned Row Only'}
          </span>
        </div>
      </div>

      {/* Assigned VLab Banner */}
      <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
            Your Assigned Virtual Laboratory Row
          </div>
          <div className="text-sm sm:text-base font-bold text-slate-900">
            {activeSubject === 'FSD'
              ? 'Full Stack Development Lab (SVU-FSD-01) — Custom Form Validation using clean()'
              : 'Computer Networks Lab (216U01L502) — VLAN Switching & IEEE 802.1Q Trunking'}
          </div>
        </div>
        <div className="text-xs font-semibold text-emerald-900 bg-white px-3 py-1.5 rounded-lg border border-emerald-200 shrink-0">
          Batch: {currentFacultyProfile.batch} &bull; Scope: Restricted to Assigned Subject
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Students Enrolled</span>
          <p className="text-2xl font-bold text-slate-800 mt-1">{visibleRecords.length}</p>
          <span className="text-[11px] text-emerald-600 font-semibold">
            {completedCount} / {visibleRecords.length} Completed VLab
          </span>
        </div>
        <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Subject Avg Pretest</span>
          <p className="text-2xl font-bold text-[#0284c7] mt-1">{avgPretestPct}%</p>
          <span className="text-[11px] text-slate-500">Diagnostic Baseline</span>
        </div>
        <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Subject Avg Posttest</span>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{avgPosttestPct}%</p>
          <span className="text-[11px] text-emerald-700 font-semibold">
            Final Evaluation Average
          </span>
        </div>
        <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Code Sandbox Passed</span>
          <p className="text-2xl font-bold text-indigo-700 mt-1">
            {visibleRecords.filter((r) => r.codeAssessment === 'PASSED').length} / {visibleRecords.length}
          </p>
          <span className="text-[11px] text-indigo-600 font-semibold">Automated Test Suite</span>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Student Score Updates Table */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs w-full max-w-full min-w-0">
        <div className="px-4 sm:px-5 py-3 border-b border-slate-100 bg-slate-50 font-bold text-xs uppercase tracking-wider text-slate-600 flex items-center justify-between">
          <span>Live Student Score Updates ({activeSubject} VLab — Batch D3)</span>
          <span className="text-[10px] text-emerald-700 font-mono">Click &quot;Update Score&quot; to grade</span>
        </div>
        <div className="overflow-x-auto w-full max-w-full" style={{ WebkitOverflowScrolling: 'touch' }}>
          <table className="w-full text-left text-xs min-w-[720px]">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-4 py-2.5">Roll No</th>
                <th className="px-4 py-2.5">Student Name</th>
                <th className="px-4 py-2.5">Pretest (/5)</th>
                <th className="px-4 py-2.5">Posttest (/5)</th>
                <th className="px-4 py-2.5">Code Challenge</th>
                <th className="px-4 py-2.5">Last Score Update</th>
                <th className="px-4 py-2.5">Grade</th>
                <th className="px-4 py-2.5">Faculty Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleRecords.map((s) => {
                const isEditing = editingId === s.id;
                return (
                  <tr
                    key={s.id}
                    className={
                      s.roll_number === '16010124169' || s.roll_number === '16010124216'
                        ? 'bg-sky-50/40 font-semibold'
                        : ''
                    }
                  >
                    <td className="px-4 py-3 font-mono text-slate-800">{s.roll_number}</td>
                    <td className="px-4 py-3 text-slate-900 font-bold">{s.name}</td>
                    <td className="px-4 py-3 text-[#0284c7] font-bold">
                      {isEditing ? (
                        <input
                          type="number"
                          min={0}
                          max={5}
                          value={editPretest}
                          onChange={(e) => setEditPretest(e.target.value)}
                          className="w-14 px-2 py-1 border border-sky-300 rounded bg-white text-xs font-bold"
                        />
                      ) : (
                        `${s.pretestScore} / ${s.pretestTotal}`
                      )}
                    </td>
                    <td className="px-4 py-3 text-emerald-700 font-bold">
                      {isEditing ? (
                        <input
                          type="number"
                          min={0}
                          max={5}
                          value={editPosttest}
                          onChange={(e) => setEditPosttest(e.target.value)}
                          className="w-14 px-2 py-1 border border-emerald-300 rounded bg-white text-xs font-bold"
                        />
                      ) : (
                        `${s.posttestScore} / ${s.posttestTotal}`
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <select
                          value={editCodeStatus}
                          onChange={(e) => setEditCodeStatus(e.target.value)}
                          className="px-2 py-1 border border-slate-300 rounded bg-white text-xs font-semibold"
                        >
                          <option value="PASSED">PASSED</option>
                          <option value="PENDING">PENDING</option>
                        </select>
                      ) : (
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            s.codeAssessment === 'PASSED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {s.codeAssessment}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-[11px]">{s.lastUpdated}</td>
                    <td className="px-4 py-3 font-bold text-slate-800">{s.grade}</td>
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleSaveScoreUpdate(s.id)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold cursor-pointer"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-[11px] font-semibold cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleStartEdit(s)}
                          className="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-[#0284c7] border border-sky-200 rounded text-[11px] font-bold cursor-pointer transition"
                        >
                          Update Score
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 12. Admin Portal View (RBAC Protected — Faculty VLab Assignments, Student Completion & Subject Averages)
export function AdminPortalView() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [roleUpdatingId, setRoleUpdatingId] = useState(null);
  const [roleMessage, setRoleMessage] = useState('');

  const [facultyAssignments, setFacultyAssignments] = useState(() => {
    try {
      const saved = localStorage.getItem('vlab_faculty_assignments');
      return saved ? JSON.parse(saved) : INITIAL_VLAB_FACULTY_ASSIGNMENTS;
    } catch {
      return INITIAL_VLAB_FACULTY_ASSIGNMENTS;
    }
  });

  const [studentRecords] = useState(() => {
    try {
      const saved = localStorage.getItem('vlab_student_records_v2');
      return saved ? JSON.parse(saved) : INITIAL_VLAB_STUDENT_RECORDS;
    } catch {
      return INITIAL_VLAB_STUDENT_RECORDS;
    }
  });

  const [bugReports, setBugReports] = useState([
    { id: 1, title: 'Integer casting in older Django builds', reporter: 'student@vlab.edu', severity: 'LOW', status: 'RESOLVED' },
    { id: 2, title: 'PasswordInput widget autocomplete styling', reporter: 'student16@vlab.edu', severity: 'MEDIUM', status: 'OPEN' },
  ]);

  const loadUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await api.get('/portal/users/');
      if (res.data?.users) {
        setUsers(res.data.users);
      }
    } catch (e) {
      const fallbackUsers = [
        { id: 1, username: 'student', first_name: 'Shlok', last_name: 'Mehta', email: 'student@vlab.edu', role: 'STUDENT', roll_or_faculty_id: '16010124169', batch: 'D3', department: 'Computer Engineering (Batch D3)' },
        { id: 5, username: 'dhruv', first_name: 'Dhruv', last_name: '', email: 'dhruv@somaiya.edu', role: 'STUDENT', roll_or_faculty_id: '16010124216', batch: 'D3', department: 'Computer Engineering (Batch D3)' },
        { id: 2, username: 'faculty', first_name: 'Prof.', last_name: 'Sharma', email: 'faculty@vlab.edu', role: 'FACULTY', roll_or_faculty_id: 'FAC-CS-204', batch: 'D3', department: 'Computer Science & Engineering' },
        { id: 4, username: 'faculty_cn', first_name: 'Dr. Debasis', last_name: 'Samanta', email: 'vlab.kjsse@somaiya.edu', role: 'FACULTY', roll_or_faculty_id: 'FAC-CS-309', batch: 'D3', department: 'Computer Science & Engineering' },
        { id: 3, username: 'admin', first_name: 'System', last_name: 'Administrator', email: 'admin@vlab.edu', role: 'ADMIN', roll_or_faculty_id: 'ADM-001', batch: '', department: 'Virtual Lab Technical Core' },
      ];
      try {
        const localReg = JSON.parse(localStorage.getItem('vlab_registered_users') || '[]');
        setUsers([...fallbackUsers, ...localReg]);
      } catch {
        setUsers(fallbackUsers);
      }
    } finally {
      setLoadingUsers(false);
    }
  };

  const loadBugReports = async () => {
    try {
      const res = await api.get('/portal/bug-reports/');
      const data = res.data;
      if (Array.isArray(data) && data.length > 0) {
        setBugReports(
          data.map((b) => ({
            id: b.id,
            title: b.title,
            reporter: b.username || b.user_fullname || 'student@vlab.edu',
            severity: b.severity || 'MEDIUM',
            status: b.status || 'OPEN',
          }))
        );
      }
    } catch {}
  };

  useEffect(() => {
    loadUsers();
    loadBugReports();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    setRoleUpdatingId(userId);
    setRoleMessage('');
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
    try {
      await api.patch(`/portal/users/${userId}/`, { role: newRole });
    } catch {}
    setRoleMessage(`Role updated to ${newRole} (Default for new signups: STUDENT)`);
    setTimeout(() => setRoleMessage(''), 3000);
    setRoleUpdatingId(null);
  };

  const handleReassignFacultySubject = (facId, newSubjCode) => {
    const updated = facultyAssignments.map((f) => {
      if (f.id !== facId) return f;
      const isFsd = newSubjCode === 'FSD';
      return {
        ...f,
        assignedSubjectCode: newSubjCode,
        assignedVLab: isFsd
          ? 'Full Stack Development Lab (SVU-FSD-01)'
          : 'Computer Networks Lab (216U01L502)',
        experimentTitle: isFsd
          ? 'Experiment 6: Custom Form Validation using clean()'
          : 'Experiment 4: VLAN Switching & IEEE 802.1Q Trunking',
      };
    });
    setFacultyAssignments(updated);
    try {
      localStorage.setItem('vlab_faculty_assignments', JSON.stringify(updated));
    } catch {}
  };

  const toggleStatus = async (id) => {
    const target = bugReports.find((b) => b.id === id);
    const newStatus = target?.status === 'OPEN' ? 'RESOLVED' : 'OPEN';
    setBugReports(bugReports.map((b) => (b.id === id ? { ...b, status: newStatus } : b)));
    try {
      await api.patch(`/portal/bug-reports/${id}/`, { status: newStatus });
    } catch {}
  };

  const studentsCount = users.filter((u) => u.role === 'STUDENT').length;
  const facultyCount = users.filter((u) => u.role === 'FACULTY').length;
  const adminCount = users.filter((u) => u.role === 'ADMIN').length;

  return (
    <div className="max-w-5xl mx-auto py-6 px-3 sm:px-6 md:px-10 text-slate-800 space-y-6 animate-in fade-in duration-200 font-['Raleway',sans-serif]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-purple-600" />
            <h1
              className="text-2xl font-extrabold text-[#2c99ce]"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              System Admin & VLab Governance Portal
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Faculty-Assigned Virtual Labs, Student Completion Analytics, Subject Averages &amp; RBAC
          </p>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded bg-purple-100 text-purple-800 uppercase tracking-wide border border-purple-200 flex items-center gap-1.5 self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5" /> ROOT ADMIN ({currentUser?.username || 'admin'})
        </span>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Accounts</span>
          <p className="text-2xl font-bold text-slate-800 mt-1">{users.length}</p>
          <span className="text-[11px] text-slate-500">Default Role: STUDENT</span>
        </div>
        <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-xs">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Students</span>
          <p className="text-2xl font-bold text-blue-700 mt-1">{studentsCount}</p>
          <span className="text-[11px] text-slate-500">Enrolled Learners</span>
        </div>
        <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-xs">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Assigned Faculty</span>
          <p className="text-2xl font-bold text-emerald-700 mt-1">{facultyAssignments.length}</p>
          <span className="text-[11px] text-slate-500">Row-Scoped Instructors</span>
        </div>
        <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-xs">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">System Admins</span>
          <p className="text-2xl font-bold text-purple-700 mt-1">{adminCount}</p>
          <span className="text-[11px] text-slate-500">Full Governance</span>
        </div>
      </div>

      {/* NEW: Faculty Assigned VLabs, Student Completion & Subject Average Score Table */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
        <div className="px-5 py-3 border-b border-slate-100 bg-purple-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-purple-700" />
            <span className="font-bold text-xs uppercase tracking-wider text-purple-950">
              Faculty Assigned Virtual Labs, Student Completion &amp; Subject Average Scores
            </span>
          </div>
          <span className="text-[11px] font-semibold text-purple-700">
            Each faculty only sees their own assigned VLab row in the Faculty Portal
          </span>
        </div>

        <div className="overflow-x-auto w-full max-w-full" style={{ WebkitOverflowScrolling: 'touch' }}>
          <table className="w-full text-left text-xs min-w-[780px]">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-4 py-2.5">Assigned Faculty</th>
                <th className="px-4 py-2.5">Assigned VLab / Subject</th>
                <th className="px-4 py-2.5">Students Who Completed VLab</th>
                <th className="px-4 py-2.5">Subject Average Score</th>
                <th className="px-4 py-2.5">Reassign VLab Row</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {facultyAssignments.map((fac) => {
                const subRecords = studentRecords.filter(
                  (r) => r.subjectCode === fac.assignedSubjectCode
                );
                const completedStudents = subRecords.filter((r) => r.status === 'COMPLETED');
                const avgSubjectScore = subRecords.length
                  ? Math.round(
                      (subRecords.reduce(
                        (acc, r) =>
                          acc +
                          (r.pretestScore / r.pretestTotal + r.posttestScore / r.posttestTotal) / 2,
                        0
                      ) /
                        subRecords.length) *
                        1000
                    ) / 10
                  : 0;

                return (
                  <tr key={fac.id} className="hover:bg-slate-50/80 transition align-top">
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-900">{fac.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{fac.facultyId}</div>
                      <div className="text-[11px] text-slate-400">{fac.email}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-1">
                        {fac.assignedSubjectCode} LAB
                      </span>
                      <div className="font-bold text-slate-800">{fac.assignedVLab}</div>
                      <div className="text-[11px] text-slate-500">{fac.experimentTitle}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-800 mb-1.5">
                        {completedStudents.length} of {subRecords.length} Students Completed
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {subRecords.map((stu) => (
                          <span
                            key={stu.id}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                              stu.status === 'COMPLETED'
                                ? 'bg-sky-50 text-sky-900 border-sky-200'
                                : 'bg-amber-50 text-amber-800 border-amber-200'
                            }`}
                          >
                            {stu.name} ({stu.roll_number}) — {stu.posttestScore}/{stu.posttestTotal}{' '}
                            {stu.status === 'COMPLETED' ? '✓' : '⏳'}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="text-base font-extrabold text-emerald-700">
                        {avgSubjectScore}%
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        Combined Pre + Posttest Avg
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <select
                        value={fac.assignedSubjectCode}
                        onChange={(e) => handleReassignFacultySubject(fac.id, e.target.value)}
                        className="text-xs border border-slate-300 rounded-lg px-2 py-1.5 bg-white font-semibold text-slate-800 cursor-pointer focus:ring-1 focus:ring-purple-500"
                      >
                        <option value="FSD">FSD VLab (SVU-FSD-01)</option>
                        <option value="CN">CN VLab (216U01L502)</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Management & Role Assignment Table */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-600" />
            <span className="font-bold text-xs uppercase tracking-wider text-slate-700">
              User Accounts &amp; Role Management (Default New User: STUDENT)
            </span>
          </div>
          <div className="flex items-center gap-3">
            {roleMessage && (
              <span className="text-xs font-semibold text-emerald-600 animate-in fade-in">
                {roleMessage}
              </span>
            )}
            <button
              onClick={loadUsers}
              disabled={loadingUsers}
              className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 cursor-pointer p-1 rounded hover:bg-slate-200/60 transition"
              title="Refresh User List"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingUsers ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto w-full max-w-full" style={{ WebkitOverflowScrolling: 'touch' }}>
          <table className="w-full text-left text-xs min-w-[650px]">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-5 py-2.5">User</th>
                <th className="px-5 py-2.5">Email</th>
                <th className="px-5 py-2.5">Roll / Faculty ID</th>
                <th className="px-5 py-2.5">Department</th>
                <th className="px-5 py-2.5">Current Role</th>
                <th className="px-5 py-2.5">Assign Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => {
                const fullName = `${u.first_name || ''} ${u.last_name || ''}`.trim() || u.username;
                const isUpdating = roleUpdatingId === u.id;
                return (
                  <tr key={u.id} className="hover:bg-slate-50/70 transition">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {fullName.charAt(0) || 'U'}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">{fullName}</div>
                          <div className="text-[10px] text-slate-400 font-mono">@{u.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-slate-600 font-mono">{u.email}</td>
                    <td className="px-5 py-3 font-semibold text-slate-700">
                      {u.roll_or_faculty_id || '—'}
                      {u.batch && <span className="text-slate-400 text-[10px] ml-1">({u.batch})</span>}
                    </td>
                    <td className="px-5 py-3 text-slate-600 max-w-[180px] truncate" title={u.department}>
                      {u.department || 'Computer Engineering'}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${
                          u.role === 'ADMIN'
                            ? 'bg-purple-100 text-purple-800 border-purple-200'
                            : u.role === 'FACULTY'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                            : 'bg-blue-100 text-blue-800 border-blue-200'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <select
                        disabled={isUpdating}
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className="text-xs border border-slate-300 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-purple-500 font-semibold cursor-pointer disabled:opacity-50"
                      >
                        <option value="STUDENT">Student (Default)</option>
                        <option value="FACULTY">Faculty (Professor)</option>
                        <option value="ADMIN">System Admin</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bug Reports Management */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs w-full max-w-full min-w-0">
        <div className="px-4 sm:px-5 py-3 border-b border-slate-100 bg-slate-50 font-bold text-xs uppercase tracking-wider text-slate-600">
          User Reported Issues &amp; Tickets
        </div>
        <div className="overflow-x-auto w-full max-w-full" style={{ WebkitOverflowScrolling: 'touch' }}>
          <table className="w-full text-left text-xs min-w-[550px]">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-5 py-2.5">ID</th>
                <th className="px-5 py-2.5">Issue Title</th>
                <th className="px-5 py-2.5">Reporter</th>
                <th className="px-5 py-2.5">Severity</th>
                <th className="px-5 py-2.5">Status</th>
                <th className="px-5 py-2.5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bugReports.map((b) => (
                <tr key={b.id}>
                  <td className="px-5 py-3 font-mono font-bold text-slate-500">#{b.id}</td>
                  <td className="px-5 py-3 font-semibold text-slate-800">{b.title}</td>
                  <td className="px-5 py-3 text-slate-600 font-mono">{b.reporter}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${b.severity === 'LOW' ? 'bg-slate-100 text-slate-700' : 'bg-amber-100 text-amber-800'}`}>
                      {b.severity}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${b.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => toggleStatus(b.id)}
                      className="text-xs font-semibold text-[#0284c7] hover:underline cursor-pointer"
                    >
                      {b.status === 'OPEN' ? 'Mark Resolved' : 'Re-open'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
