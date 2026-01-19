import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// Handle GitHub Pages redirect for SPA routing
// When 404.html redirects to index.html, it stores the original path in sessionStorage
const redirectPath = sessionStorage.getItem('redirect');
if (redirectPath) {
  sessionStorage.removeItem('redirect');
  // Use absolute URL to ensure the path includes /disc-test/
  const pathWithoutBase = redirectPath.replace(/^\/disc-test/, '') || '/';
  window.history.replaceState(null, '', window.location.origin + '/disc-test' + pathWithoutBase);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/disc-test">
      <App />
    </BrowserRouter>
  </StrictMode>,
)
