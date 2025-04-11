import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { NavigationContainer } from '@react-navigation/native';
import Screen from './src/screen/Screen';

const persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Screen />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}