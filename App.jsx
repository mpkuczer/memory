import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import Welcome from './src/components/Welcome';
import Game from './src/components/Game';
import { NavigationContainer } from '@react-navigation/native';
import Instructions from './src/components/Instructions';

function App() {

  const [gameNotStartedYet, setGameNotStartedYet] = useState(true);
  const [gameIntroTextVisible, setGameIntroTextVisible] = useState(false);

  const instructionsRef = useRef(null)


  useEffect(() => {
    SplashScreen.hide();
  }, []);

  function startGame() {
    setGameIntroTextVisible(true);
    instructionsRef.current = setTimeout(() => {
      setGameIntroTextVisible(false)
      setGameNotStartedYet(false);
    }, 3000)
  }

  function skipInstructions() {
    clearTimeout(instructionsRef)
    setGameIntroTextVisible(false)
    setGameNotStartedYet(false);
  }

  if (gameNotStartedYet) {
    if (gameIntroTextVisible) {
      return (
        <NavigationContainer>
            <SafeAreaView>
              <StatusBar/>
              <Instructions skipInstructions={skipInstructions}/>
            </SafeAreaView>
          </NavigationContainer>
      )
    } else {
      return (
        <NavigationContainer>
          <SafeAreaView>
            <StatusBar/>
            <Welcome startGame={startGame}/>
          </SafeAreaView>
        </NavigationContainer>
      );
    }
  } else {
    return (
      <NavigationContainer>
        <SafeAreaView>
          <StatusBar/>
          <Game />
        </SafeAreaView>
      </NavigationContainer>
    );
  }
}

export default App;
