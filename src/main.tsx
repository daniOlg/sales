import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { PersistGate } from 'redux-persist/integration/react';

import Language from '@/components/common/language';
import Theme from '@/components/common/theme';
import { Toaster } from '@/components/ui/sonner';

import { Routes } from '@/routes/routes';
import { persistor, store } from '@/store/store';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter>
          <Toaster />
          <Theme />
          <Language />
          <Routes />
        </BrowserRouter>
      </PersistGate>
    </ReduxProvider>
  </StrictMode>,
);
