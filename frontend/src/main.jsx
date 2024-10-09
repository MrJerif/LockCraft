import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

const domainID = import.meta.env.VITE_AUTH0_DOMAIN;
const clientid = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audienceID = import.meta.env.VITE_AUTH0_AUDIENCE;

// Callback funtion
const onRedirectCallBack = (appState) => {
  // const navigate = useNavigate();

  // Redirect to the appropriate route after login
  return appState?.returnTo || window.location.pathname;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain={domainID}
        clientId={clientid}
        // domain="mrjerif-passwordmanager.au.auth0.com"
        // clientId="odnAXY6Mr8W0fMO0a5NEl8GtNk2Xl79L"
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: "lockcraftpasswordmanager/identifier",
          scope: "read:current_user update:current_user_metadata openid profile email"
        }}
        // redirectUri={window.location.origin}
        onRedirectCallback={onRedirectCallBack}
      // cacheLocation="localstorage" // Ensures the login persists across page reloads
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </StrictMode>
)
