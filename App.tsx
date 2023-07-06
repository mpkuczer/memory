/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import Board from './src/components/Board';

function App(): JSX.Element {

  return (
    <SafeAreaView>
      <StatusBar/>
      <Board/>
    </SafeAreaView>
  );
}

export default App;
