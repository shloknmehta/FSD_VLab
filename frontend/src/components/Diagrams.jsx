import React from 'react';

// Figure 1: The 5-Stage Django Validation Pipeline (full_clean() sequence)
export function DjangoFormLifecycleDiagram() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-2 shadow-inner">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 960 480"
        className="w-full h-auto block"
        style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
      >
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
          <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.4" />
          </filter>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
          </marker>
        </defs>

        <rect width="960" height="480" rx="16" fill="url(#bgGrad)" stroke="#334155" strokeWidth="1.5" />

        <g transform="translate(40, 28)">
          <text x="0" y="0" fill="#38bdf8" fontSize="11" fontWeight="700" letterSpacing="1.5">DJANGO INTERNALS: ARCHITECTURE SPECIFICATION</text>
          <text x="0" y="24" fill="#f8fafc" fontSize="20" fontWeight="800">Form Validation Pipeline: full_clean() Execution Sequence</text>
        </g>

        {/* Stage 1 */}
        <g transform="translate(40, 95)" filter="url(#shadow)">
          <rect width="135" height="110" rx="10" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          <rect width="135" height="28" rx="10" fill="#334155" />
          <text x="67" y="19" fill="#94a3b8" fontSize="11" fontWeight="700" textAnchor="middle">STAGE 1</text>
          <text x="67" y="52" fill="#f1f5f9" fontSize="13" fontWeight="700" textAnchor="middle">request.POST</text>
          <text x="67" y="70" fill="#64748b" fontSize="10" textAnchor="middle">Raw QueryDict</text>
          <text x="67" y="86" fill="#0284c7" fontSize="10" fontFamily="monospace" textAnchor="middle">&#123;'age': '21', ...&#125;</text>
        </g>

        <path d="M 175 150 L 205 150" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

        {/* Stage 2 */}
        <g transform="translate(210, 95)" filter="url(#shadow)">
          <rect width="145" height="110" rx="10" fill="#1e293b" stroke="#0284c7" strokeWidth="1.5" />
          <rect width="145" height="28" rx="10" fill="url(#blueGrad)" />
          <text x="72" y="19" fill="#ffffff" fontSize="11" fontWeight="700" textAnchor="middle">STAGE 2: TRIGGER</text>
          <text x="72" y="52" fill="#f1f5f9" fontSize="13" fontWeight="700" textAnchor="middle">form.is_valid()</text>
          <text x="72" y="70" fill="#94a3b8" fontSize="10" textAnchor="middle">calls internal:</text>
          <text x="72" y="86" fill="#38bdf8" fontSize="10" fontFamily="monospace" textAnchor="middle">self.full_clean()</text>
        </g>

        <path d="M 355 150 L 385 150" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

        {/* Stage 3 */}
        <g transform="translate(390, 95)" filter="url(#shadow)">
          <rect width="155" height="110" rx="10" fill="#1e293b" stroke="#7c3aed" strokeWidth="1.5" />
          <rect width="155" height="28" rx="10" fill="url(#purpleGrad)" />
          <text x="77" y="19" fill="#ffffff" fontSize="11" fontWeight="700" textAnchor="middle">STAGE 3: BUILT-IN</text>
          <text x="77" y="50" fill="#f1f5f9" fontSize="12" fontWeight="700" textAnchor="middle">_clean_fields()</text>
          <text x="77" y="68" fill="#c4b5fd" fontSize="9.5" textAnchor="middle">&bull; to_python() coercion</text>
          <text x="77" y="82" fill="#c4b5fd" fontSize="9.5" textAnchor="middle">&bull; field.validate()</text>
          <text x="77" y="96" fill="#c4b5fd" fontSize="9.5" textAnchor="middle">&bull; run_validators()</text>
        </g>

        <path d="M 545 150 L 575 150" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

        {/* Stage 4 */}
        <g transform="translate(580, 95)" filter="url(#shadow)">
          <rect width="165" height="110" rx="10" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
          <rect width="165" height="28" rx="10" fill="#0369a1" />
          <text x="82" y="19" fill="#ffffff" fontSize="11" fontWeight="700" textAnchor="middle">STAGE 4: SINGLE FIELD</text>
          <text x="82" y="50" fill="#f1f5f9" fontSize="12" fontWeight="700" textAnchor="middle">clean_&lt;field&gt;()</text>
          <text x="82" y="68" fill="#bae6fd" fontSize="9.5" textAnchor="middle">&bull; Inspects cleaned_data[k]</text>
          <text x="82" y="82" fill="#bae6fd" fontSize="9.5" textAnchor="middle">&bull; Raises ValidationError</text>
          <text x="82" y="96" fill="#bae6fd" fontSize="9.5" textAnchor="middle">&bull; MUST return value!</text>
        </g>

        <path d="M 745 150 L 775 150" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

        {/* Stage 5 */}
        <g transform="translate(780, 95)" filter="url(#shadow)">
          <rect width="145" height="110" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
          <rect width="145" height="28" rx="10" fill="url(#emeraldGrad)" />
          <text x="72" y="19" fill="#ffffff" fontSize="11" fontWeight="700" textAnchor="middle">STAGE 5: CROSS-FIELD</text>
          <text x="72" y="50" fill="#f1f5f9" fontSize="12" fontWeight="700" textAnchor="middle">clean() (Form-Level)</text>
          <text x="72" y="68" fill="#a7f3d0" fontSize="9.5" textAnchor="middle">&bull; Multi-field rules</text>
          <text x="72" y="82" fill="#a7f3d0" fontSize="9.5" textAnchor="middle">&bull; password == confirm</text>
          <text x="72" y="96" fill="#a7f3d0" fontSize="9.5" textAnchor="middle">&bull; Returns full dict</text>
        </g>

        {/* Split to Outcomes */}
        <path d="M 852 205 L 852 245 L 670 245 L 670 280" stroke="#38bdf8" strokeWidth="2" />
        <path d="M 670 245 L 300 245 L 300 280" stroke="#38bdf8" strokeWidth="2" />

        {/* Outcome A: Valid */}
        <g transform="translate(180, 285)" filter="url(#shadow)">
          <rect width="250" height="150" rx="10" fill="#064e3b" stroke="#059669" strokeWidth="2" />
          <circle cx="28" cy="28" r="14" fill="#059669" />
          <path d="M 22 28 L 27 33 L 35 23" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          <text x="50" y="32" fill="#34d399" fontSize="14" fontWeight="800">is_valid() == True</text>
          <line x1="16" y1="52" x2="234" y2="52" stroke="#047857" strokeWidth="1" />
          <text x="20" y="74" fill="#a7f3d0" fontSize="11" fontWeight="700">&bull; Populates form.cleaned_data</text>
          <text x="20" y="92" fill="#ecfdf5" fontSize="10.5">All types safely cast &amp; validated</text>
          <text x="20" y="110" fill="#a7f3d0" fontSize="11" fontWeight="700">&bull; form.errors is empty (&#123;&#125;)</text>
          <text x="20" y="128" fill="#ecfdf5" fontSize="10.5">Ready for form.save() or view logic</text>
        </g>

        {/* Outcome B: Invalid */}
        <g transform="translate(545, 285)" filter="url(#shadow)">
          <rect width="250" height="150" rx="10" fill="#450a0a" stroke="#dc2626" strokeWidth="2" />
          <circle cx="28" cy="28" r="14" fill="#dc2626" />
          <path d="M 23 23 L 33 33 M 33 23 L 23 33" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          <text x="50" y="32" fill="#f87171" fontSize="14" fontWeight="800">is_valid() == False</text>
          <line x1="16" y1="52" x2="234" y2="52" stroke="#991b1b" strokeWidth="1" />
          <text x="20" y="74" fill="#fca5a5" fontSize="11" fontWeight="700">&bull; Populates form.errors (ErrorDict)</text>
          <text x="20" y="92" fill="#fef2f2" fontSize="10.5">Field errors &amp; Non-field '__all__'</text>
          <text x="20" y="110" fill="#fca5a5" fontSize="11" fontWeight="700">&bull; Erroneous fields removed</text>
          <text x="20" y="128" fill="#fef2f2" fontSize="10.5">Re-render form in template with errors</text>
        </g>

        <g transform="translate(40, 452)">
          <circle cx="5" cy="5" r="4" fill="#38bdf8" />
          <text x="16" y="8.5" fill="#94a3b8" fontSize="10">Source: Django Framework Core Forms Specification &amp; Two Scoops of Django (Greenfeld &amp; Greenfeld)</text>
        </g>
      </svg>
    </div>
  );
}

// Figure 2: Field-Level clean_<fieldname>() vs Form-Level clean()
export function DjangoCleanComparisonDiagram() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-2 shadow-inner">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 960 460"
        className="w-full h-auto block"
        style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
      >
        <defs>
          <linearGradient id="compBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0b1329" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="skyHeader" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          <linearGradient id="emeraldHeader" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <filter id="shadowComp" x="-5%" y="-5%" width="110%" height="115%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.35" />
          </filter>
        </defs>

        <rect width="960" height="460" rx="16" fill="url(#compBg)" stroke="#334155" strokeWidth="1.5" />

        <g transform="translate(40, 28)">
          <text x="0" y="0" fill="#38bdf8" fontSize="11" fontWeight="700" letterSpacing="1.5">FORM VALIDATION COMPARISON</text>
          <text x="0" y="24" fill="#f8fafc" fontSize="20" fontWeight="800">Field-Level clean_&lt;field&gt;() vs Form-Level clean()</text>
        </g>

        {/* Left Column */}
        <g transform="translate(40, 75)" filter="url(#shadowComp)">
          <rect width="425" height="350" rx="12" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
          <path d="M 0 12 Q 0 0 12 0 L 413 0 Q 425 0 425 12 L 425 42 L 0 42 Z" fill="url(#skyHeader)" />
          <text x="20" y="27" fill="#ffffff" fontSize="14" fontWeight="800">1. Field-Level: clean_&lt;fieldname&gt;(self)</text>

          <g transform="translate(20, 60)">
            <text x="0" y="14" fill="#38bdf8" fontSize="11" fontWeight="700">TARGET SCOPE</text>
            <text x="0" y="32" fill="#f1f5f9" fontSize="12.5" fontWeight="600">Single Field Isolation (e.g. clean_age, clean_email)</text>
            <text x="0" y="48" fill="#94a3b8" fontSize="11">Only has authority and context over its own field value.</text>
          </g>

          <g transform="translate(20, 125)">
            <text x="0" y="14" fill="#38bdf8" fontSize="11" fontWeight="700">EXECUTION TRIGGER</text>
            <text x="0" y="32" fill="#f1f5f9" fontSize="12.5" fontWeight="600">Runs during _clean_fields()</text>
            <text x="0" y="48" fill="#94a3b8" fontSize="11">Immediately after field-type coercion succeeds.</text>
          </g>

          <g transform="translate(20, 190)">
            <text x="0" y="14" fill="#38bdf8" fontSize="11" fontWeight="700">INPUT DATA EXTRACTION</text>
            <rect x="0" y="22" width="385" height="26" rx="4" fill="#1e293b" />
            <text x="10" y="39" fill="#7dd3fc" fontSize="11" fontFamily="monospace">age = self.cleaned_data.get('age')</text>
          </g>

          <g transform="translate(20, 255)">
            <text x="0" y="14" fill="#f59e0b" fontSize="11" fontWeight="800">CRITICAL RETURN CONTRACT</text>
            <rect x="0" y="22" width="385" height="52" rx="4" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
            <text x="10" y="38" fill="#fef3c7" fontSize="11" fontWeight="700">MUST return the cleaned field value!</text>
            <text x="10" y="54" fill="#cbd5e1" fontSize="10.5">Returning None replaces valid data with None in cleaned_data.</text>
          </g>

          <g transform="translate(20, 325)">
            <text x="0" y="12" fill="#94a3b8" fontSize="10">Errors attached to: </text>
            <text x="96" y="12" fill="#f87171" fontSize="10" fontFamily="monospace">form.errors['&lt;fieldname&gt;']</text>
          </g>
        </g>

        {/* Right Column */}
        <g transform="translate(495, 75)" filter="url(#shadowComp)">
          <rect width="425" height="350" rx="12" fill="#0f172a" stroke="#059669" strokeWidth="2" />
          <path d="M 0 12 Q 0 0 12 0 L 413 0 Q 425 0 425 12 L 425 42 L 0 42 Z" fill="url(#emeraldHeader)" />
          <text x="20" y="27" fill="#ffffff" fontSize="14" fontWeight="800">2. Form-Level: clean(self)</text>

          <g transform="translate(20, 60)">
            <text x="0" y="14" fill="#34d399" fontSize="11" fontWeight="700">TARGET SCOPE</text>
            <text x="0" y="32" fill="#f1f5f9" fontSize="12.5" fontWeight="600">Cross-Field Multi-Attribute Validation</text>
            <text x="0" y="48" fill="#94a3b8" fontSize="11">Compares dependencies between two or more form inputs.</text>
          </g>

          <g transform="translate(20, 125)">
            <text x="0" y="14" fill="#34d399" fontSize="11" fontWeight="700">EXECUTION TRIGGER</text>
            <text x="0" y="32" fill="#f1f5f9" fontSize="12.5" fontWeight="600">Runs during _clean_form()</text>
            <text x="0" y="48" fill="#94a3b8" fontSize="11">Executed after ALL individual fields have completed cleaning.</text>
          </g>

          <g transform="translate(20, 190)">
            <text x="0" y="14" fill="#34d399" fontSize="11" fontWeight="700">INPUT DATA EXTRACTION</text>
            <rect x="0" y="22" width="385" height="26" rx="4" fill="#1e293b" />
            <text x="10" y="39" fill="#a7f3d0" fontSize="11" fontFamily="monospace">p1 = cleaned_data.get('password')</text>
          </g>

          <g transform="translate(20, 255)">
            <text x="0" y="14" fill="#f59e0b" fontSize="11" fontWeight="800">CRITICAL RETURN CONTRACT</text>
            <rect x="0" y="22" width="385" height="52" rx="4" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
            <text x="10" y="38" fill="#fef3c7" fontSize="11" fontWeight="700">MUST return the complete cleaned_data dictionary!</text>
            <text x="10" y="54" fill="#cbd5e1" fontSize="10.5">Always call super().clean() first to retain cleaned fields.</text>
          </g>

          <g transform="translate(20, 325)">
            <text x="0" y="12" fill="#94a3b8" fontSize="10">Errors attached to: </text>
            <text x="96" y="12" fill="#f87171" fontSize="10" fontFamily="monospace">form.errors['__all__'] (Non-field)</text>
          </g>
        </g>
      </svg>
    </div>
  );
}

// Figure 3: View Request/Response Cycle & Post/Redirect/Get Pattern
export function DjangoRequestResponseDiagram() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-2 shadow-inner">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 960 440"
        className="w-full h-auto block"
        style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
      >
        <defs>
          <linearGradient id="reqBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <filter id="shadowReq" x="-5%" y="-5%" width="110%" height="115%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.35" />
          </filter>
          <marker id="arrowB" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
          </marker>
          <marker id="arrowG" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#34d399" />
          </marker>
          <marker id="arrowR" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#f87171" />
          </marker>
        </defs>

        <rect width="960" height="440" rx="16" fill="url(#reqBg)" stroke="#334155" strokeWidth="1.5" />

        <g transform="translate(40, 28)">
          <text x="0" y="0" fill="#38bdf8" fontSize="11" fontWeight="700" letterSpacing="1.5">PATTERNS &amp; ARCHITECTURE</text>
          <text x="0" y="24" fill="#f8fafc" fontSize="20" fontWeight="800">The Django View Form Workflow: Post/Redirect/Get (PRG) Pattern</text>
        </g>

        {/* Client */}
        <g transform="translate(40, 80)" filter="url(#shadowReq)">
          <rect width="180" height="130" rx="10" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
          <rect width="180" height="28" rx="10" fill="#334155" />
          <text x="90" y="19" fill="#f1f5f9" fontSize="11" fontWeight="700" textAnchor="middle">CLIENT BROWSER</text>
          <text x="90" y="55" fill="#f8fafc" fontSize="12" fontWeight="700" textAnchor="middle">HTTP GET Request</text>
          <text x="90" y="74" fill="#94a3b8" fontSize="10" textAnchor="middle">Initial form display</text>
          <line x1="20" y1="88" x2="160" y2="88" stroke="#475569" strokeWidth="1" />
          <text x="90" y="104" fill="#38bdf8" fontSize="11" fontWeight="700" textAnchor="middle">HTTP POST (Submit)</text>
          <text x="90" y="118" fill="#94a3b8" fontSize="9.5" textAnchor="middle">Includes CSRF token</text>
        </g>

        <path d="M 220 145 L 260 145" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrowB)" />

        {/* View */}
        <g transform="translate(265, 80)" filter="url(#shadowReq)">
          <rect width="210" height="130" rx="10" fill="#1e293b" stroke="#0284c7" strokeWidth="2" />
          <rect width="210" height="28" rx="10" fill="#0369a1" />
          <text x="105" y="19" fill="#ffffff" fontSize="11" fontWeight="700" textAnchor="middle">DJANGO VIEW FUNCTION</text>
          <text x="16" y="52" fill="#7dd3fc" fontSize="11" fontFamily="monospace">if request.method == 'POST':</text>
          <text x="24" y="68" fill="#e2e8f0" fontSize="10.5" fontFamily="monospace">form = UserForm(request.POST)</text>
          <text x="24" y="84" fill="#e2e8f0" fontSize="10.5" fontFamily="monospace">if form.is_valid(): ...</text>
          <text x="16" y="104" fill="#7dd3fc" fontSize="11" fontFamily="monospace">else:</text>
          <text x="24" y="118" fill="#94a3b8" fontSize="10" fontFamily="monospace">form = UserForm()  # unbound</text>
        </g>

        <path d="M 475 145 L 515 145" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrowB)" />

        {/* Evaluation */}
        <g transform="translate(520, 80)" filter="url(#shadowReq)">
          <rect width="180" height="130" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
          <rect width="180" height="28" rx="10" fill="#b45309" />
          <text x="90" y="19" fill="#ffffff" fontSize="11" fontWeight="700" textAnchor="middle">EVALUATION GATE</text>
          <text x="90" y="58" fill="#fef3c7" fontSize="14" fontWeight="800" textAnchor="middle">form.is_valid()</text>
          <text x="90" y="78" fill="#cbd5e1" fontSize="10.5" textAnchor="middle">Runs full_clean()</text>
          <text x="90" y="94" fill="#cbd5e1" fontSize="10.5" textAnchor="middle">Checks all fields</text>
          <text x="90" y="112" fill="#38bdf8" fontSize="10.5" fontFamily="monospace" textAnchor="middle">Returns True/False</text>
        </g>

        {/* True Branch */}
        <path d="M 700 120 L 770 120" stroke="#34d399" strokeWidth="2.5" markerEnd="url(#arrowG)" />
        <text x="730" y="112" fill="#34d399" fontSize="11" fontWeight="800">TRUE</text>

        <g transform="translate(775, 65)" filter="url(#shadowReq)">
          <rect width="145" height="110" rx="10" fill="#064e3b" stroke="#059669" strokeWidth="2" />
          <text x="72" y="24" fill="#34d399" fontSize="12" fontWeight="800" textAnchor="middle">VALID DATA</text>
          <text x="72" y="46" fill="#ecfdf5" fontSize="10" textAnchor="middle">Extracts cleaned_data</text>
          <text x="72" y="62" fill="#ecfdf5" fontSize="10" textAnchor="middle">Executes business logic</text>
          <line x1="12" y1="74" x2="133" y2="74" stroke="#047857" strokeWidth="1" />
          <text x="72" y="92" fill="#a7f3d0" fontSize="10.5" fontWeight="700" textAnchor="middle">redirect('success')</text>
          <text x="72" y="104" fill="#6ee7b7" fontSize="9" textAnchor="middle">Prevents re-POST</text>
        </g>

        {/* False Branch */}
        <path d="M 610 210 L 610 265 L 770 265" stroke="#f87171" strokeWidth="2.5" markerEnd="url(#arrowR)" />
        <text x="635" y="255" fill="#f87171" fontSize="11" fontWeight="800">FALSE (Validation Errors)</text>

        <g transform="translate(775, 215)" filter="url(#shadowReq)">
          <rect width="145" height="110" rx="10" fill="#450a0a" stroke="#dc2626" strokeWidth="2" />
          <text x="72" y="24" fill="#f87171" fontSize="12" fontWeight="800" textAnchor="middle">INVALID DATA</text>
          <text x="72" y="46" fill="#fef2f2" fontSize="10" textAnchor="middle">Preserves user input</text>
          <text x="72" y="62" fill="#fef2f2" fontSize="10" textAnchor="middle">Attaches form.errors</text>
          <line x1="12" y1="74" x2="133" y2="74" stroke="#991b1b" strokeWidth="1" />
          <text x="72" y="92" fill="#fca5a5" fontSize="10.5" fontWeight="700" textAnchor="middle">render(request, ...)</text>
          <text x="72" y="104" fill="#fecaca" fontSize="9" textAnchor="middle">Inline errorlist rendered</text>
        </g>

        <g transform="translate(40, 355)">
          <rect width="880" height="55" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <text x="20" y="24" fill="#38bdf8" fontSize="11" fontWeight="700">CORE TAKEAWAY FROM LITERATURE (Two Scoops of Django, Chapter 10):</text>
          <text x="20" y="42" fill="#94a3b8" fontSize="11">Always follow the Post/Redirect/Get pattern upon successful validation to prevent duplicate form submissions on page refresh.</text>
        </g>
      </svg>
    </div>
  );
}

// Figure 4: IEEE 802.1Q Frame Format Diagram for Computer Networks
export function Vlan8021QFrameDiagram() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-2 shadow-inner">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 960 420"
        className="w-full h-auto block"
        style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
      >
        <defs>
          <linearGradient id="cnBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>

        <rect width="960" height="420" rx="16" fill="url(#cnBg)" stroke="#334155" strokeWidth="1.5" />

        <g transform="translate(40, 28)">
          <text x="0" y="0" fill="#38bdf8" fontSize="11" fontWeight="700" letterSpacing="1.5">IEEE 802.1Q STANDARD &bull; ETHERNET FRAME STRUCTURE</text>
          <text x="0" y="24" fill="#f8fafc" fontSize="20" fontWeight="800">4-Byte VLAN Tag Insertion into Standard IEEE 802.3 Frame</text>
        </g>

        {/* Untagged Frame */}
        <g transform="translate(40, 75)">
          <text x="0" y="16" fill="#94a3b8" fontSize="12" fontWeight="700">Standard Untagged Ethernet Frame (Delivered to Access Ports / Workstations):</text>
          <g transform="translate(0, 26)">
            <rect x="0" y="0" width="90" height="46" rx="4" fill="#334155" stroke="#475569" strokeWidth="1" />
            <text x="45" y="22" fill="#cbd5e1" fontSize="10" fontWeight="700" textAnchor="middle">Preamble/SFD</text>
            <text x="45" y="36" fill="#94a3b8" fontSize="9" textAnchor="middle">8 Bytes</text>

            <rect x="94" y="0" width="130" height="46" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />
            <text x="159" y="22" fill="#f1f5f9" fontSize="11" fontWeight="700" textAnchor="middle">Destination MAC</text>
            <text x="159" y="36" fill="#94a3b8" fontSize="9" textAnchor="middle">6 Bytes</text>

            <rect x="228" y="0" width="130" height="46" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />
            <text x="293" y="22" fill="#f1f5f9" fontSize="11" fontWeight="700" textAnchor="middle">Source MAC</text>
            <text x="293" y="36" fill="#94a3b8" fontSize="9" textAnchor="middle">6 Bytes</text>

            <rect x="362" y="0" width="100" height="46" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />
            <text x="412" y="22" fill="#f1f5f9" fontSize="11" fontWeight="700" textAnchor="middle">Type / Length</text>
            <text x="412" y="36" fill="#94a3b8" fontSize="9" textAnchor="middle">2 Bytes (EtherType)</text>

            <rect x="466" y="0" width="310" height="46" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1" />
            <text x="621" y="22" fill="#38bdf8" fontSize="11" fontWeight="700" textAnchor="middle">Data Payload (IPv4 / IPv6 / ARP)</text>
            <text x="621" y="36" fill="#94a3b8" fontSize="9" textAnchor="middle">46 to 1500 Bytes</text>

            <rect x="780" y="0" width="100" height="46" rx="4" fill="#334155" stroke="#475569" strokeWidth="1" />
            <text x="830" y="22" fill="#cbd5e1" fontSize="11" fontWeight="700" textAnchor="middle">FCS (CRC-32)</text>
            <text x="830" y="36" fill="#94a3b8" fontSize="9" textAnchor="middle">4 Bytes</text>
          </g>
        </g>

        {/* Tagged 802.1Q Frame */}
        <g transform="translate(40, 185)">
          <text x="0" y="16" fill="#38bdf8" fontSize="12" fontWeight="700">Tagged IEEE 802.1Q Frame (Transmitted across Trunk Links):</text>
          <g transform="translate(0, 26)">
            <rect x="0" y="0" width="85" height="48" rx="4" fill="#334155" stroke="#475569" strokeWidth="1" />
            <text x="42" y="22" fill="#cbd5e1" fontSize="9.5" fontWeight="700" textAnchor="middle">Preamble</text>
            <text x="42" y="36" fill="#94a3b8" fontSize="9" textAnchor="middle">8 Bytes</text>

            <rect x="89" y="0" width="110" height="48" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />
            <text x="144" y="22" fill="#f1f5f9" fontSize="10.5" fontWeight="700" textAnchor="middle">Dest MAC</text>
            <text x="144" y="36" fill="#94a3b8" fontSize="9" textAnchor="middle">6 Bytes</text>

            <rect x="203" y="0" width="110" height="48" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />
            <text x="258" y="22" fill="#f1f5f9" fontSize="10.5" fontWeight="700" textAnchor="middle">Source MAC</text>
            <text x="258" y="36" fill="#94a3b8" fontSize="9" textAnchor="middle">6 Bytes</text>

            {/* 802.1Q TAG */}
            <rect x="317" y="-6" width="235" height="60" rx="6" fill="#0284c7" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="434" y="14" fill="#ffffff" fontSize="11.5" fontWeight="900" textAnchor="middle">IEEE 802.1Q TAG (4 BYTES)</text>
            <text x="434" y="30" fill="#e0f2fe" fontSize="9" fontFamily="monospace" textAnchor="middle">TPID 0x8100 (2B) + TCI (2B)</text>
            <text x="434" y="44" fill="#fef08a" fontSize="9" fontWeight="700" textAnchor="middle">VLAN ID (12 bits: 1-4094) + PCP + DEI</text>

            <rect x="556" y="0" width="85" height="48" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />
            <text x="598" y="22" fill="#f1f5f9" fontSize="10.5" fontWeight="700" textAnchor="middle">EtherType</text>
            <text x="598" y="36" fill="#94a3b8" fontSize="9" textAnchor="middle">2 Bytes</text>

            <rect x="645" y="0" width="150" height="48" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1" />
            <text x="720" y="22" fill="#38bdf8" fontSize="10.5" fontWeight="700" textAnchor="middle">Data Payload</text>
            <text x="720" y="36" fill="#94a3b8" fontSize="9" textAnchor="middle">42 to 1500 Bytes</text>

            <rect x="799" y="0" width="81" height="48" rx="4" fill="#334155" stroke="#475569" strokeWidth="1" />
            <text x="839" y="22" fill="#cbd5e1" fontSize="10.5" fontWeight="700" textAnchor="middle">FCS (CRC)</text>
            <text x="839" y="36" fill="#94a3b8" fontSize="9" textAnchor="middle">4 Bytes</text>
          </g>
        </g>

        <g transform="translate(40, 290)">
          <rect width="880" height="95" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <g transform="translate(20, 20)">
            <text x="0" y="0" fill="#38bdf8" fontSize="12" fontWeight="800">CITED FROM TEXTBOOK: Computer Networks (A.S. Tanenbaum &amp; D.J. Wetherall, Pearson, 6th Ed.)</text>
            <text x="0" y="22" fill="#cbd5e1" fontSize="11">&bull; TPID (Tag Protocol Identifier): 16 bits set to 0x8100 identifying the frame as 802.1Q tagged.</text>
            <text x="0" y="40" fill="#cbd5e1" fontSize="11">&bull; PCP (Priority Code Point): 3 bits for IEEE 802.1p Quality of Service (QoS) class prioritization.</text>
            <text x="0" y="58" fill="#fef08a" fontSize="11" fontWeight="700">&bull; VID (VLAN Identifier): 12 bits allowing up to 4094 unique VLANs (VLAN 0 and 4095 are reserved).</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
