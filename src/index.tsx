import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <TonConnectUIProvider
      actionsConfiguration={{
        skipRedirectToWallet: 'ios'
      }}
      manifestUrl={
        'https://raw.githubusercontent.com/evaafi/tonconnect-config/main/config.json'
      }>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TonConnectUIProvider>
  </React.StrictMode>
);