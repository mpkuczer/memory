import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import Game from './src/components/Game';

function App(): JSX.Element {

  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);

  return (
    <SafeAreaView>
      <StatusBar/>
      <Game/>

    </SafeAreaView>
  );
}

export default App;
