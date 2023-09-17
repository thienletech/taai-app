import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import React from 'react';
import { Main } from '@src/layout/Main';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '@src/app/store';

export default function App() {
  useEffect(() => {
    crashlytics().log('App mounted.');
  }, []);

  return (
    <React.Fragment>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SafeAreaProvider>
            <Main />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
