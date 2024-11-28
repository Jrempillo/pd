import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import 'normalize.css'
import App from './views/root/AppRoot'

import 'bootstrap/dist/js/bootstrap.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
