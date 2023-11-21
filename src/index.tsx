import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { BrowserRouter } from 'react-router-dom';
import Buffer from 'buffer';
//@ts-ignore
globalThis.Buffer = Buffer;
(window as any).global = window;

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
        'https://raw.githubusercontent.com/sepezho/burton-tonconnect-config/main/config.json'
      }>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TonConnectUIProvider>
  </React.StrictMode>
);
