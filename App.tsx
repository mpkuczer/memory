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

import Game from './src/components/Game';
import Sound from 'react-native-sound'

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar/>
      <Game/>

    </SafeAreaView>
  );
}

export default App;
