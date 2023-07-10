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
import { NavigationContainer } from '@react-navigation/native';

function App(): JSX.Element {

  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaView>
        <StatusBar/>
        <Game/>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
