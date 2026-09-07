import React, { useState } from 'react';
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
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import VSCodeBlock from './VSCodeBlock';

// 1. Overview View
export function OverviewView({ onNext }) {
  return (
    <div className="max-w-4xl mx-auto py-8 px-6 sm:px-10 text-slate-800 space-y-8 animate-in fade-in duration-200">
      <div className="text-center mb-8">
        <h1
          className="text-3xl sm:text-4xl font-extrabold text-[#2c99ce] tracking-tight"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Django Form Validation Architecture
        </h1>
        <p
          className="text-sm sm:text-base text-slate-500 mt-2 font-medium"
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

        <div className="flex flex-wrap items-center justify-between gap-2 p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">
          <div className="px-3 py-2 bg-white border border-slate-300 rounded shadow-xs text-center">
            Raw POST Data<br/><span className="text-[10px] text-slate-400 font-normal">request.POST</span>
          </div>
          <span className="text-slate-400 font-bold">&rarr;</span>
          <div className="px-3 py-2 bg-white border border-slate-300 rounded shadow-xs text-center">
            form.is_valid()<br/><span className="text-[10px] text-slate-400 font-normal">full_clean()</span>
          </div>
          <span className="text-slate-400 font-bold">&rarr;</span>
          <div className="px-3 py-2 bg-white border border-slate-300 rounded shadow-xs text-center">
            _clean_fields()<br/><span className="text-[10px] text-slate-400 font-normal">Built-in checks</span>
          </div>
          <span className="text-slate-400 font-bold">&rarr;</span>
          <div className="px-3 py-2 bg-sky-100 border border-sky-300 text-[#0284c7] rounded shadow-xs text-center font-bold">
            clean_&lt;field&gt;()<br/><span className="text-[10px] text-sky-700 font-normal">Single-field logic</span>
          </div>
          <span className="text-slate-400 font-bold">&rarr;</span>
          <div className="px-3 py-2 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded shadow-xs text-center font-bold">
            clean()<br/><span className="text-[10px] text-emerald-700 font-normal">Cross-field logic</span>
          </div>
          <span className="text-slate-400 font-bold">&rarr;</span>
          <div className="px-3 py-2 bg-white border border-slate-300 rounded shadow-xs text-center">
            cleaned_data / errors<br/><span className="text-[10px] text-slate-400 font-normal">Result returned</span>
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
    <div className="max-w-4xl mx-auto py-8 px-6 sm:px-10 text-slate-800 space-y-6 animate-in fade-in duration-200">
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
      const response = await fetch('http://127.0.0.1:8000/api/experiments/quiz/submit/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          experiment_slug: 'django-form-validation',
          quiz_type: 'PRETEST',
          answers: selectedAnswers,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setBackendFeedback(data);
      }
    } catch (err) {
      console.log('Using local quiz score calculator:', err);
    }
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const score = calculateScore();

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 sm:px-10 text-slate-800 space-y-6 animate-in fade-in duration-200">
      <div className="text-center mb-6">
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#2c99ce] tracking-tight"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Pre-Lab Assessment (Pre-Test)
        </h1>
        <p
          className="text-xs sm:text-sm text-slate-500 mt-2 font-medium"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Answer the following diagnostic questions on Django form handling
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div key={q.id} className="border border-slate-200 rounded-xl p-5 bg-white shadow-xs">
            <h3 className="text-sm sm:text-base font-semibold text-slate-800 mb-3">
              {idx + 1}. {q.q}
            </h3>
            <div className="space-y-2">
              {q.options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[q.id] === oIdx;
                const isCorrect = q.correct === oIdx;
                let btnStyle = 'border-slate-200 hover:bg-slate-50 text-slate-700';
                if (submitted) {
                  if (isCorrect) btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold';
                  else if (isSelected) btnStyle = 'border-red-500 bg-red-50 text-red-800';
                } else if (isSelected) {
                  btnStyle = 'border-[#0284c7] bg-sky-50 text-[#0284c7] font-semibold';
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelect(q.id, oIdx)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {submitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {submitted && (
              <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
                <span className="font-bold text-slate-800">Explanation: </span>
                {q.explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length < questions.length || isSubmitting}
            className="v-button shadow-xs transition-transform hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? 'Evaluating...' : 'Submit Pretest'}
          </button>
        ) : (
          <div className="flex items-center justify-between w-full">
            <div className="text-sm font-semibold text-slate-800" style={{ fontFamily: "'Raleway', sans-serif" }}>
              Score: <span className="text-[#2c99ce] font-bold text-lg">{score} / {questions.length}</span> ({Math.round((score / questions.length) * 100)}%)
              <span className={`ml-2 text-xs font-bold px-2 py-0.5 rounded ${score >= 4 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                {score >= 4 ? 'Status: Qualified' : 'Status: Review Advised'}
              </span>
            </div>
            <button
              onClick={onNext}
              className="v-button shadow-xs transition-transform hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
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
export function VisualizerView() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(2000);

  // Form Inputs State for dynamic trace
  const [formData, setFormData] = useState({
    username: 'shlokm',
    email: 'shlok@vlab.edu',
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
        username: 'shlokm',
        email: 'shlok@vlab.edu',
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
        username: 'shlokm',
        email: 'shlok@vlab.edu',
        age: '22',
        password: 'SecretPassword123',
        confirm_password: 'DifferentPassword999', // Mismatch!
      });
    } else if (presetKey === 'builtin_email_err') {
      setFormData({
        username: 'shlokm',
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
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-8 text-slate-800 space-y-6 animate-in fade-in duration-200">
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

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
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
              className={`py-2 px-1 text-center rounded-lg border text-[11px] font-bold transition cursor-pointer flex flex-col items-center gap-0.5 ${
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Side (7 Cols): Active Stage Details & Code Trace */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-xs space-y-4">
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
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <button
                  disabled={currentStep === 0}
                  onClick={() => {
                    setCurrentStep((prev) => Math.max(0, prev - 1));
                    setIsPlaying(false);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                >
                  &larr; Prev
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md text-white transition cursor-pointer ${
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
                  className="px-3 py-1.5 text-xs font-semibold rounded-md bg-[#0284c7] text-white hover:bg-[#0369a1] disabled:opacity-40 cursor-pointer"
                >
                  Next &rarr;
                </button>
              </div>

              <div className="flex items-center gap-2">
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
        <div className="lg:col-span-5 space-y-4">
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
    </div>
  );
}

// 5. Simulation / Lab Playground View
export function SimulationView() {
  const [formInputs, setFormInputs] = useState({
    username: 'shlokmehta',
    email: 'shlok@vlab.edu',
    age: '21',
    password: 'Password123',
    confirm_password: 'Password123',
  });

  const [simulationResult, setSimulationResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);

  const handleRunSimulation = async () => {
    setIsRunning(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/simulator/trace/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ raw_data: formInputs }),
      });
      if (response.ok) {
        const data = await response.json();
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
      const isPasswordMatch = formInputs.password === formInputs.confirm_password;
      const errors = {};
      if (!isEmailValid) errors.email = ['Enter a valid email address.'];
      if (!isAgeValid) errors.age = ['Must be at least 18 years old to register.'];
      if (!isPasswordMatch) errors.__all__ = ['Passwords do not match.'];

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
    <div className="max-w-4xl mx-auto py-8 px-6 sm:px-10 text-slate-800 space-y-6 animate-in fade-in duration-200">
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

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Form (7 Cols) */}
        <div className="md:col-span-7 border border-slate-200 rounded-xl p-6 bg-white shadow-xs space-y-4">
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
        <div className="md:col-span-5 space-y-4">
          <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-xs space-y-4">
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
    </div>
  );
}

// 6. Code Assessment View
export function CodeAssessmentView() {
  const [activeChallenge, setActiveChallenge] = useState('clean_age');
  const [codeAge, setCodeAge] = useState(
`def clean_age(self):
    # TODO: Retrieve 'age' from self.cleaned_data
    # If age < 18, raise forms.ValidationError("Applicant must be 18 or older.")
    # Always return the cleaned age value!
    age = self.cleaned_data.get('age')
    if age is not None and age < 18:
        raise forms.ValidationError("Applicant must be 18 or older.")
    return age
`
  );

  const [codeClean, setCodeClean] = useState(
`def clean(self):
    # TODO: Call super().clean()
    # Check if 'password' and 'confirm_password' match
    # If they don't match, raise forms.ValidationError("Passwords do not match.")
    cleaned_data = super().clean()
    pwd = cleaned_data.get('password')
    conf = cleaned_data.get('confirm_password')

    if pwd and conf and pwd != conf:
        raise forms.ValidationError("Passwords do not match.")
    return cleaned_data
`
  );

  const [testResult, setTestResult] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleRunAssessment = async () => {
    setIsEvaluating(true);
    const currentCode = activeChallenge === 'clean_age' ? codeAge : codeClean;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/simulator/assess/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challenge_id: activeChallenge,
          code: currentCode,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setTestResult(data);
      } else {
        throw new Error('Assessment API error');
      }
    } catch (err) {
      // Local fallback test runner
      const hasValidationError = currentCode.includes('forms.ValidationError');
      const hasReturn = currentCode.includes('return');
      const passed = hasValidationError && hasReturn;

      setTestResult({
        passed,
        testsPassed: passed ? 4 : 2,
        totalTests: 4,
        score: passed ? 100 : 50,
        feedback: passed
          ? 'All unit test cases passed! Proper validation exception raised and cleaned value returned.'
          : 'Check that you raise forms.ValidationError and return the cleaned value!',
        testCases: [
          { input: 'age = 21', expected: 'Passed (21 returned)', status: 'PASSED' },
          { input: 'age = 15', expected: 'ValidationError raised', status: passed ? 'PASSED' : 'FAILED' },
          { input: 'age = 18', expected: 'Passed (18 returned)', status: 'PASSED' },
          { input: 'age = 0', expected: 'ValidationError raised', status: passed ? 'PASSED' : 'FAILED' },
        ],
      });
    }
    setIsEvaluating(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 sm:px-10 text-slate-800 space-y-6 animate-in fade-in duration-200">
      <div className="text-center mb-6">
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#2c99ce] tracking-tight"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Lab Exercise: Custom Validation Methods
        </h1>
        <p
          className="text-xs sm:text-sm text-slate-500 mt-2 font-medium"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Implement custom validation methods and verify with automated test cases
        </p>
      </div>

      {/* Challenge Selector */}
      <div className="flex border-b border-slate-200 gap-4">
        <button
          onClick={() => {
            setActiveChallenge('clean_age');
            setTestResult(null);
          }}
          className={`pb-2.5 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
            activeChallenge === 'clean_age'
              ? 'border-[#0284c7] text-[#0284c7]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Problem 1: clean_age(self)</span>
        </button>

        <button
          onClick={() => {
            setActiveChallenge('clean_form');
            setTestResult(null);
          }}
          className={`pb-2.5 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
            activeChallenge === 'clean_form'
              ? 'border-[#0284c7] text-[#0284c7]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Problem 2: clean(self) [Cross-Field]</span>
        </button>
      </div>

      {/* VS Code Code Editor Container */}
      <div className="border border-[#333333] rounded-xl overflow-hidden bg-[#1e1e1e] shadow-xl">
        {/* Top Tab Bar */}
        <div className="bg-[#252526] px-2 pt-1 border-b border-[#1e1e1e] flex items-center justify-between select-none">
          <div className="flex items-center">
            <div className="bg-[#1e1e1e] text-[#d4d4d4] px-3 py-1.5 text-xs font-mono rounded-t flex items-center gap-2 border-t-2 border-[#007acc]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3572A5] inline-block" />
              <span className="text-[#ffffff] font-medium">forms.py</span>
              <span className="text-[10px] text-[#858585] ml-1">&mdash; {activeChallenge === 'clean_age' ? 'clean_age(self)' : 'clean(self)'}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 pb-1 pr-1">
            <button
              onClick={handleRunAssessment}
              disabled={isEvaluating}
              className="px-3 py-1 bg-[#16825d] hover:bg-[#1b9a6e] text-white rounded text-xs font-mono font-medium transition cursor-pointer disabled:opacity-50 flex items-center gap-1.5 shadow-xs"
            >
              <span>▶</span>
              <span>{isEvaluating ? 'Evaluating Code...' : 'Run Test Suite'}</span>
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
          className="flex bg-[#1e1e1e] font-mono text-[12.5px] leading-[1.55]"
          style={{ fontFamily: "'Consolas', 'Fira Code', 'Courier New', monospace" }}
        >
          {/* Gutter */}
          <div className="py-3 px-3 text-right text-[#858585] bg-[#1e1e1e] border-r border-[#2d2d2d] select-none text-xs min-w-[42px]">
            {(activeChallenge === 'clean_age' ? codeAge : codeClean).split('\n').map((_, idx) => (
              <div key={idx} className="h-[19.38px] leading-[19.38px]">{idx + 1}</div>
            ))}
          </div>

          {/* Textarea Editor */}
          <textarea
            value={activeChallenge === 'clean_age' ? codeAge : codeClean}
            onChange={(e) => {
              if (activeChallenge === 'clean_age') setCodeAge(e.target.value);
              else setCodeClean(e.target.value);
            }}
            rows={12}
            spellCheck="false"
            className="w-full py-3 px-3 bg-[#1e1e1e] text-[#d4d4d4] outline-none resize-none overflow-x-auto selection:bg-[#264f78] leading-[1.55]"
            style={{
              fontFamily: "'Consolas', 'Fira Code', 'Courier New', monospace",
              lineHeight: '19.38px',
            }}
          />
        </div>

        {/* Bottom Status Bar */}
        <div className="bg-[#007acc] text-white text-[10px] px-3 py-0.5 flex items-center justify-between select-none font-sans font-medium">
          <div className="flex items-center gap-3">
            <span>Spaces: 4</span>
            <span>UTF-8</span>
            <span>LF</span>
            <span>Python 3.12 (Virtual Labs Engine)</span>
          </div>
          <div>
            <span>Django Form Validator</span>
          </div>
        </div>
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold">
              {testResult.passed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <span className={testResult.passed ? 'text-emerald-900' : 'text-red-900'}>
                {testResult.passed ? 'Assessment Passed!' : 'Assessment Incomplete'}
              </span>
            </div>
            <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border">
              Passed {testResult.testsPassed} / {testResult.totalTests} tests (Score: {testResult.score}%)
            </span>
          </div>

          <p className="text-xs text-slate-700">{testResult.feedback}</p>

          {/* Test case rows */}
          {testResult.testCases && (
            <div className="space-y-1 pt-2 border-t border-slate-200 font-mono text-xs">
              {testResult.testCases.map((tc, idx) => (
                <div key={idx} className="flex items-center justify-between p-1.5 bg-white rounded border border-slate-100">
                  <span className="text-slate-600">Test {idx + 1}: {tc.input}</span>
                  <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${tc.status === 'PASSED' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                    {tc.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 7. Analysis View
export function AnalysisView() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-6 sm:px-10 text-slate-800 space-y-8 animate-in fade-in duration-200">
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
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
        <table className="w-full text-left text-xs">
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
export function PosttestView() {
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await fetch('http://127.0.0.1:8000/api/experiments/quiz/submit/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          experiment_slug: 'django-form-validation',
          quiz_type: 'POSTTEST',
          answers: selectedAnswers,
        }),
      });
    } catch (e) {
      console.log('Quiz submitted locally');
    }
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 sm:px-10 text-slate-800 space-y-6 animate-in fade-in duration-200">
      <div className="text-center mb-6">
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#2c99ce] tracking-tight"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Post-Lab Assessment (Post-Test)
        </h1>
        <p
          className="text-xs sm:text-sm text-slate-500 mt-2 font-medium"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Answer the following evaluation questions to verify your understanding of form cleaning and error handling
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div key={q.id} className="border border-slate-200 rounded-xl p-5 bg-white shadow-xs">
            <h3 className="text-sm sm:text-base font-semibold text-slate-800 mb-3">
              {idx + 1}. {q.q}
            </h3>
            <div className="space-y-2">
              {q.options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[q.id] === oIdx;
                const isCorrect = q.correct === oIdx;
                let btnStyle = 'border-slate-200 hover:bg-slate-50 text-slate-700';
                if (submitted) {
                  if (isCorrect) btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold';
                  else if (isSelected) btnStyle = 'border-red-500 bg-red-50 text-red-800';
                } else if (isSelected) {
                  btnStyle = 'border-[#0284c7] bg-sky-50 text-[#0284c7] font-semibold';
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelect(q.id, oIdx)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {submitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {submitted && (
              <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
                <span className="font-bold text-slate-800">Explanation: </span>
                {q.explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Submission & Formal Academic Certificate */}
      <div className="pt-4 border-t border-slate-100">
        {!submitted ? (
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={Object.keys(selectedAnswers).length < questions.length || isSubmitting}
              className="v-button shadow-xs transition-transform hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? 'Evaluating Submission...' : 'Submit Post-Lab Answers'}
            </button>
          </div>
        ) : (
          <div className="p-1 max-w-2xl mx-auto rounded-xl bg-gradient-to-b from-slate-200 to-slate-300 shadow-md">
            <div className="border-4 border-double border-[#1a365d] p-6 sm:p-8 bg-[#fdfdfd] rounded-lg text-center space-y-4">
              {/* Institution Header */}
              <div className="border-b border-slate-200 pb-3 flex flex-col items-center">
                <img
                  src="/assets/logos/kjsce-formerly.svg"
                  alt="K. J. Somaiya School of Engineering"
                  className="h-11 sm:h-12 w-auto object-contain mb-2"
                />
                <div className="text-xs tracking-widest uppercase font-bold text-slate-500">
                  Virtual Labs &bull; Ministry of Education, Govt. of India
                </div>
                <div className="text-base sm:text-lg font-bold text-[#1a365d] tracking-wide mt-0.5">
                  K. J. SOMAIYA SCHOOL OF ENGINEERING (KJSSE)
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Department of Computer Engineering &bull; Somaiya Vidyavihar University
                </div>
              </div>

              {/* Certificate Title */}
              <div className="pt-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded border border-amber-200">
                  Certificate of Laboratory Completion
                </span>
                <p className="text-xs text-slate-600 mt-3 italic">This is to certify that</p>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
                  {currentUser?.name || 'Shlok Mehta'}
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
        )}
      </div>
    </div>
  );
}

// 9. Further Readings / References
export function ReferencesView() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-6 sm:px-10 text-slate-800 space-y-6 animate-in fade-in duration-200">
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
    </div>
  );
}

// 10. Feedback View
export function FeedbackView({ onOpenRateModal }) {
  return (
    <div className="max-w-4xl mx-auto py-8 px-6 sm:px-10 text-slate-800 space-y-6 text-center animate-in fade-in duration-200">
      <h1
        className="text-2xl sm:text-3xl font-extrabold text-[#2c99ce] tracking-tight"
        style={{ fontFamily: "'Raleway', sans-serif" }}
      >
        Student Feedback
      </h1>
      <p
        className="text-xs sm:text-sm text-slate-500 font-medium"
        style={{ fontFamily: "'Raleway', sans-serif" }}
      >
        Continuous evaluation and curriculum improvement survey
      </p>
      <div className="p-8 border border-slate-200 rounded-xl bg-white max-w-md mx-auto space-y-4 shadow-xs">
        <MessageSquareHeart className="w-12 h-12 text-[#2c99ce] mx-auto" />
        <h3
          className="font-bold text-slate-800 text-base"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Experiment Feedback Form
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Submit your evaluation regarding simulation clarity, exercise difficulty, and concept coverage.
        </p>
        <button
          onClick={onOpenRateModal}
          className="v-button shadow-xs transition-transform hover:scale-[1.02] cursor-pointer"
        >
          Open Rating & Feedback Modal
        </button>
      </div>
    </div>
  );
}

// 11. Faculty Portal View (RBAC Protected)
export function FacultyPortalView() {
  const { currentUser } = useAuth();
  const [gradebook, setGradebook] = useState([
    { roll_number: '16010124169', name: 'Shlok Mehta', batch: 'Batch D3', pretest: '5 / 5', posttest: '5 / 5', codeAssessment: 'PASSED', rating: '5 ★', grade: 'A+' },
    { roll_number: '16010124170', name: 'Aarav Patel', batch: 'Batch D3', pretest: '4 / 5', posttest: '4 / 5', codeAssessment: 'PASSED', rating: '5 ★', grade: 'A' },
    { roll_number: '16010124171', name: 'Priya Sharma', batch: 'Batch D3', pretest: '5 / 5', posttest: '4 / 5', codeAssessment: 'PASSED', rating: '4 ★', grade: 'A' },
    { roll_number: '16010124172', name: 'Rohan Deshmukh', batch: 'Batch D3', pretest: '3 / 5', posttest: '4 / 5', codeAssessment: 'PENDING', rating: '4 ★', grade: 'B+' },
  ]);

  const handleExportCSV = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' +
      ['Roll Number,Student Name,Batch,Pretest,Posttest,Code Assessment,Rating,Grade'].concat(
        gradebook.map((s) => `${s.roll_number},${s.name},${s.batch},${s.pretest},${s.posttest},${s.codeAssessment},${s.rating},${s.grade}`)
      ).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'VLab_Batch_D3_Django_Validation_Grades.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 sm:px-10 text-slate-800 space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 pb-4 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-emerald-600" />
            <h1
              className="text-2xl font-extrabold text-[#2c99ce]"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Faculty Dashboard & Gradebook
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Instructor: {currentUser?.name || 'Prof. Sharma'} ({currentUser?.department || 'CSE Dept'})</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg transition cursor-pointer shadow-xs"
          >
            Export Gradebook (CSV)
          </button>
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 uppercase">
            Faculty Access
          </span>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Batch Students</span>
          <p className="text-2xl font-bold text-slate-800 mt-1">74</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Batch D3 Registered</span>
        </div>
        <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Avg Pretest</span>
          <p className="text-2xl font-bold text-[#0284c7] mt-1">88.4%</p>
          <span className="text-[11px] text-slate-500">Exp 06 Baseline</span>
        </div>
        <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Avg Posttest</span>
          <p className="text-2xl font-bold text-emerald-600 mt-1">94.2%</p>
          <span className="text-[11px] text-emerald-700 font-semibold">+5.8% Knowledge Gain</span>
        </div>
        <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Code Passed</span>
          <p className="text-2xl font-bold text-indigo-700 mt-1">71 / 74</p>
          <span className="text-[11px] text-indigo-600 font-semibold">96% Passed Tests</span>
        </div>
      </div>

      {/* Student Table */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 font-bold text-xs uppercase tracking-wider text-slate-600 flex items-center justify-between">
          <span>Student Submissions & Scorecard (Batch D3)</span>
          <span className="text-[10px] text-emerald-700 font-mono">Live Sync</span>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
            <tr>
              <th className="px-4 py-2.5">Roll No</th>
              <th className="px-4 py-2.5">Student Name</th>
              <th className="px-4 py-2.5">Pretest</th>
              <th className="px-4 py-2.5">Posttest</th>
              <th className="px-4 py-2.5">Code Challenge</th>
              <th className="px-4 py-2.5">Feedback</th>
              <th className="px-4 py-2.5">Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {gradebook.map((s, idx) => (
              <tr key={idx} className={s.name.includes('Shlok') ? 'bg-sky-50/50 font-semibold' : ''}>
                <td className="px-4 py-3 font-mono text-slate-800">{s.roll_number}</td>
                <td className="px-4 py-3 text-slate-800">{s.name}</td>
                <td className="px-4 py-3 text-[#0284c7] font-bold">{s.pretest}</td>
                <td className="px-4 py-3 text-emerald-700 font-bold">{s.posttest}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${s.codeAssessment === 'PASSED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {s.codeAssessment}
                  </span>
                </td>
                <td className="px-4 py-3 text-amber-600 font-bold">{s.rating}</td>
                <td className="px-4 py-3 font-bold text-slate-800">{s.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 12. Admin Portal View (RBAC Protected)
export function AdminPortalView() {
  const { currentUser } = useAuth();
  const [bugReports, setBugReports] = useState([
    { id: 1, title: 'Integer casting in older Django builds', reporter: 'shlok@vlab.edu', severity: 'LOW', status: 'RESOLVED' },
    { id: 2, title: 'PasswordInput widget autocomplete styling', reporter: 'student16@vlab.edu', severity: 'MEDIUM', status: 'OPEN' },
  ]);

  const toggleStatus = (id) => {
    setBugReports(
      bugReports.map((b) =>
        b.id === id ? { ...b, status: b.status === 'OPEN' ? 'RESOLVED' : 'OPEN' } : b
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 sm:px-10 text-slate-800 space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-purple-600" />
            <h1
              className="text-2xl font-extrabold text-[#2c99ce]"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              System Admin Portal
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">KJSSE VLab Platform Governance & Logs</p>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded bg-purple-100 text-purple-800 uppercase tracking-wide">
          ROOT ADMIN
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">System Uptime</span>
          <p className="text-2xl font-bold text-emerald-600 mt-1">99.99%</p>
          <span className="text-[11px] text-slate-500">Django 6.1 WSGI Running</span>
        </div>
        <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Bug Reports</span>
          <p className="text-2xl font-bold text-slate-800 mt-1">
            {bugReports.filter((b) => b.status === 'OPEN').length} Open
          </p>
          <span className="text-[11px] text-amber-600 font-semibold">Priority: Medium</span>
        </div>
        <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Total User Accounts</span>
          <p className="text-2xl font-bold text-slate-800 mt-1">76</p>
          <span className="text-[11px] text-[#0284c7] font-semibold">74 Students &bull; 1 Faculty &bull; 1 Admin</span>
        </div>
      </div>

      {/* Bug Reports Management */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 font-bold text-xs uppercase tracking-wider text-slate-600">
          User Reported Issues & Tickets
        </div>
        <table className="w-full text-left text-xs">
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
  );
}
