import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './globals.css';
import Main from './Main'

export interface AppProps { }

const App: React.FunctionComponent<AppProps> = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
};

export default App;
