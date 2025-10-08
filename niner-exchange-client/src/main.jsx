import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NinerExchangeAuth from "./login.jsx";
import NinerExchangeMessaging from "./messagingSystem.jsx";
import NinerExchangeHome from "./homePage.jsx";
import HomePage2 from "./homePage2.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NinerExchangeMessaging />
  </StrictMode>,
)
