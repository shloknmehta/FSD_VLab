import React, { useState } from 'react';
import { Copy, Check, FileCode, Play } from 'lucide-react';

/**
 * Authentic VS Code Dark+ Theme Tokenizer for Python & JSON
 * Follows exact VS Code Dark+ / Consolas specifications:
 * - Background: #1e1e1e (editor), #252526 (tab bar), #181818 (status bar)
 * - Line numbers: #858585
 * - Keywords (def, return, if, raise, import, class): #C586C0 (Pink/Purple)
 * - Function names: #DCDCAA (Yellow)
 * - Strings: #CE9178 (Warm terracotta orange)
 * - Comments: #6A9955 (Forest green italic)
 * - Classes/Types: #4EC9B0 (Teal/Cyan)
 * - Variables/Params/self: #9CDCFE (Light blue)
 * - Numbers: #B5CEA8 (Pale sage green)
 * - Punctuation/Operators: #D4D4D4 (Off-white)
 */

function highlightPythonLine(line) {
  // Check if entire line is a comment
  const trimmed = line.trim();
  if (trimmed.startsWith('#')) {
    return <span style={{ color: '#6A9955', fontStyle: 'italic' }}>{line}</span>;
  }

  // Regex pattern matching tokens:
  // 1. Comments: #.*
  // 2. Strings: ".*?" or '.*?'
  // 3. Numbers: \b\d+\b
  // 4. Identifiers: [a-zA-Z_]\w*
  // 5. Operators/punctuation: [^\s\w]+
  const tokenRegex = /(#.*$)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b\d+\b)|(\b[a-zA-Z_]\w*\b)|([^\s\w]+|\s+)/g;
  const parts = [];
  let match;
  let keyIdx = 0;

  const keywords = new Set([
    'def', 'class', 'return', 'if', 'else', 'elif', 'raise', 'from', 'import',
    'and', 'or', 'not', 'in', 'is', 'for', 'while', 'try', 'except', 'finally',
    'with', 'as', 'lambda', 'yield', 'pass', 'break', 'continue', 'global', 'nonlocal', 'assert'
  ]);

  const classesAndTypes = new Set([
    'ValidationError', 'Form', 'ModelForm', 'UserRegistrationForm', 'IntegerField',
    'CharField', 'EmailField', 'PasswordInput', 'User', 'ErrorDict', 'ErrorList',
    'Exception', 'ValueError', 'TypeError', 'True', 'False', 'None'
  ]);

  const builtinsAndFuncs = new Set([
    'clean', 'clean_age', 'clean_username', 'get', 'super', 'is_valid',
    'full_clean', '_clean_fields', '_clean_form', '_post_clean', 'register_view',
    'create', 'redirect', 'render', 'print', 'items', 'hasattr', 'getattr', 'setattr', 'len'
  ]);

  const varsAndAttrs = new Set([
    'self', 'request', 'cleaned_data', 'password', 'confirm_password', 'age',
    'username', 'email', 'form', 'user', 'data', 'errors', 'is_bound', 'fields', 'name', 'field', 'value'
  ]);

  while ((match = tokenRegex.exec(line)) !== null) {
    const [token, comment, str, num, ident, other] = match;

    if (comment) {
      parts.push(
        <span key={keyIdx++} style={{ color: '#6A9955', fontStyle: 'italic' }}>
          {comment}
        </span>
      );
    } else if (str) {
      parts.push(
        <span key={keyIdx++} style={{ color: '#CE9178' }}>
          {str}
        </span>
      );
    } else if (num) {
      parts.push(
        <span key={keyIdx++} style={{ color: '#B5CEA8' }}>
          {num}
        </span>
      );
    } else if (ident) {
      if (keywords.has(ident)) {
        parts.push(
          <span key={keyIdx++} style={{ color: '#C586C0', fontWeight: 600 }}>
            {ident}
          </span>
        );
      } else if (classesAndTypes.has(ident)) {
        parts.push(
          <span key={keyIdx++} style={{ color: '#4EC9B0' }}>
            {ident}
          </span>
        );
      } else if (builtinsAndFuncs.has(ident)) {
        parts.push(
          <span key={keyIdx++} style={{ color: '#DCDCAA' }}>
            {ident}
          </span>
        );
      } else if (varsAndAttrs.has(ident)) {
        parts.push(
          <span key={keyIdx++} style={{ color: '#9CDCFE' }}>
            {ident}
          </span>
        );
      } else {
        parts.push(
          <span key={keyIdx++} style={{ color: '#D4D4D4' }}>
            {ident}
          </span>
        );
      }
    } else {
      // Punctuation, operators, whitespace
      parts.push(
        <span key={keyIdx++} style={{ color: '#D4D4D4' }}>
          {other || token}
        </span>
      );
    }
  }

  return parts.length > 0 ? parts : <span>{line}</span>;
}

function highlightJsonLine(line) {
  // Regex for JSON tokens: keys, string values, numbers, booleans, null, punctuation
  const tokenRegex = /("(?:\\.|[^"\\])*"(?=\s*:))|("(?:\\.|[^"\\])*")|(\b(?:true|false|null)\b)|(-?\b\d+(?:\.\d+)?\b)|([{}[\]:,])|([^\s"{}[\]:,]+|\s+)/g;
  const parts = [];
  let match;
  let keyIdx = 0;

  while ((match = tokenRegex.exec(line)) !== null) {
    const [token, jsonKey, jsonStr, jsonBool, jsonNum, jsonPunct, whitespace] = match;

    if (jsonKey) {
      parts.push(
        <span key={keyIdx++} style={{ color: '#9CDCFE' }}>
          {jsonKey}
        </span>
      );
    } else if (jsonStr) {
      parts.push(
        <span key={keyIdx++} style={{ color: '#CE9178' }}>
          {jsonStr}
        </span>
      );
    } else if (jsonBool) {
      parts.push(
        <span key={keyIdx++} style={{ color: '#569CD6', fontWeight: 600 }}>
          {jsonBool}
        </span>
      );
    } else if (jsonNum) {
      parts.push(
        <span key={keyIdx++} style={{ color: '#B5CEA8' }}>
          {jsonNum}
        </span>
      );
    } else if (jsonPunct) {
      // Bracket pair colorization like VS Code
      const isBracket = token === '{' || token === '}';
      parts.push(
        <span key={keyIdx++} style={{ color: isBracket ? '#FFD700' : '#D4D4D4' }}>
          {jsonPunct}
        </span>
      );
    } else {
      parts.push(
        <span key={keyIdx++} style={{ color: '#D4D4D4' }}>
          {whitespace || token}
        </span>
      );
    }
  }

  return parts.length > 0 ? parts : <span>{line}</span>;
}

export default function VSCodeBlock({
  code = '',
  language = 'python',
  filename = 'forms.py',
  breadcrumbs = 'forms.py > UserRegistrationForm',
  highlightLine = null,
  activeTargetPattern = null,
  showLineNumbers = true,
  maxHeight = '360px',
}) {
  const [copied, setCopied] = useState(false);

  const lines = typeof code === 'string' ? code.split('\n') : [];

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Determine file icon / badge style
  const getFileBadge = () => {
    if (filename.endsWith('.py')) {
      return (
        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3572A5] inline-block" />
          <span>{filename}</span>
        </span>
      );
    }
    if (filename.endsWith('.json')) {
      return (
        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-[#CBCB41] inline-block" />
          <span>{filename}</span>
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
        <FileCode className="w-3.5 h-3.5 text-sky-400" />
        <span>{filename}</span>
      </span>
    );
  };

  return (
    <div className="rounded-xl overflow-hidden border border-[#333333] shadow-lg bg-[#1e1e1e] text-[#d4d4d4] font-mono text-xs select-text">
      {/* VS Code Window Top Bar (Tabs + Action Buttons) */}
      <div className="bg-[#252526] border-b border-[#1e1e1e] flex items-center justify-between px-3 py-1.5 select-none">
        {/* Active Tab */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-[#1e1e1e] px-3 py-1 rounded-t-md border-t-2 border-[#007acc] text-[#ffffff]">
            {getFileBadge()}
          </div>
          {breadcrumbs && (
            <span className="hidden sm:inline text-[11px] text-[#858585] ml-2">
              {breadcrumbs}
            </span>
          )}
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            title="Copy Code"
            className="flex items-center gap-1 text-[11px] text-[#858585] hover:text-[#ffffff] px-2 py-0.5 rounded hover:bg-[#333333] transition cursor-pointer"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Editor Body with Line Numbers & Syntax Highlighting */}
      <div
        className="overflow-x-auto overflow-y-auto p-2"
        style={{
          maxHeight,
          fontFamily: "'Consolas', 'Fira Code', 'Courier New', monospace",
          fontSize: '12.5px',
          lineHeight: '1.55',
        }}
      >
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => {
              const lineNum = idx + 1;
              const isTargetLine =
                (highlightLine && highlightLine === lineNum) ||
                (activeTargetPattern && line.includes(activeTargetPattern));

              return (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    isTargetLine
                      ? 'bg-[#04395e]/80 border-l-2 border-[#007acc]'
                      : 'hover:bg-[#282828]/50'
                  }`}
                >
                  {/* Line Number Column (Gutter) */}
                  {showLineNumbers && (
                    <td
                      className="pr-4 pl-2 text-right select-none align-top w-8 text-[#858585]"
                      style={{ minWidth: '36px' }}
                    >
                      {lineNum}
                    </td>
                  )}

                  {/* Code Line */}
                  <td className="whitespace-pre pr-4 align-top">
                    {language === 'json'
                      ? highlightJsonLine(line)
                      : highlightPythonLine(line)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* VS Code Bottom Status Strip */}
      <div className="bg-[#007acc] text-white text-[10px] px-3 py-0.5 flex items-center justify-between select-none font-sans font-medium">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Play className="w-2.5 h-2.5 fill-white" />
            <span>Python 3.12 (Virtual Labs Engine)</span>
          </span>
          <span className="hidden sm:inline">UTF-8</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Ln {lines.length}, Col 1</span>
          <span>Spaces: 4</span>
          <span className="uppercase">{language}</span>
        </div>
      </div>
    </div>
  );
}
