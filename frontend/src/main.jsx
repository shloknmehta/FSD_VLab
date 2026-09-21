import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Suppress benign third-party browser extension messaging errors (e.g. tabs:outgoing.message.ready from content.js)
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const msg = String(typeof reason === 'string' ? reason : reason?.message || '');
    if (
      msg.includes('tabs:outgoing.message.ready') ||
      msg.includes('No Listener') ||
      msg.includes('message channel closed') ||
      msg.includes('asynchronously reported an error')
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
