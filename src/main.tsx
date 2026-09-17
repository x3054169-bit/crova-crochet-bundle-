// Ensure window.fetch has a setter to avoid "Cannot set property fetch of #<Window> which has only a getter"
try {
  if (typeof window !== 'undefined') {
    let _fetch = window.fetch;
    Object.defineProperty(window, 'fetch', {
      get() {
        return _fetch;
      },
      set(val) {
        _fetch = val;
      },
      configurable: true,
      enumerable: true,
    });
    if (typeof Window !== 'undefined' && Window.prototype && Object.getOwnPropertyDescriptor(Window.prototype, 'fetch')) {
      Object.defineProperty(Window.prototype, 'fetch', {
        get() {
          return _fetch;
        },
        set(val) {
          _fetch = val;
        },
        configurable: true,
        enumerable: true,
      });
    }
  }
} catch {
  // Ignore descriptor configuration errors
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
