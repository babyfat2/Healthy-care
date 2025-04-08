import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Home from './src/screen/Home';
import { NavigationContainer } from '@react-navigation/native';

const persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Home />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}