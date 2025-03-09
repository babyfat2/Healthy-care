import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from "redux-persist";
import { store } from './redux/store';
import { Provider } from 'react-redux';

const persistor = persistStore(store);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider >
  </StrictMode>,
)
