import React from 'react'
import Sound from 'react-native-sound';
import { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Score from './Score'
import Board from './Board'
import Outcome from './Outcome'
import colors from '../constants/colors'

import {
  levelToPatternSize,
  emptyBoard,
  getRandomPattern
} from '../utils/gameUtils'

const SMALL_LIVES = 3;
const BIG_LIVES = 3;

function Game() {
  const [level, setLevel] = useState(1);

  const [pattern, setPattern] = useState(getRandomPattern(1));
  const setRandomPattern = (level) => {
    setPattern(getRandomPattern(level))
  }

  const [input, setInput] = useState(emptyBoard(1));
  const clearInput = (level) => {
    setInput(emptyBoard(level))
  }

  const result = pattern.map((row, i) => {
    return row.map((patternSquare, j) => {
      const inputSquare = input[i][j]
      if (patternSquare == true && inputSquare == true) {
        return true // correct 
      } else if (patternSquare == null && inputSquare == true) {
        return false // incorrect
      } else {
        return null // empty
      }
    })
  })

  const [bigLivesLeft, setBigLivesLeft] = useState(BIG_LIVES)
  const gameOver = bigLivesLeft == 0

  const [isInputDisabled, setIsInputDisabled] = useState(true)

  // Delay showing pattern after level is started
  const [levelStartEffect, setLevelStartEffect] = useState(false)
  useEffect(() => {
    let timeout;
    timeout = setTimeout(() => {
      setIsReadingPhase(true)
    }, 500)
    return () => clearTimeout(timeout)
  }, [levelStartEffect])

  // Show pattern and disable input for a certain amount of time
  const [isReadingPhase, setIsReadingPhase] = useState(false)
  const readingInterval = level < 15
    ? 1500
    : level < 28
      ? 1500 - (level-15)*100
      : 200

  useEffect(() => {
    let timeout;
    if (isReadingPhase) {
      timeout = setTimeout(() => {
        setIsReadingPhase(false)
        setIsInputDisabled(false)
      }, readingInterval)
    }
    return () => clearTimeout(timeout)
  }, [isReadingPhase, readingInterval])

  // Handle level completion by disabling input temporarily and starting next level
  const levelComplete = result.flat().filter((e) => e == true).length == levelToPatternSize(level)
  useEffect(() => {
    let timeout;
    if (levelComplete) {
      setIsInputDisabled(true)
      timeout = setTimeout(() => {
        setLevel(level + 1)
        clearInput(level + 1)
        setRandomPattern(level + 1)
        setLevelStartEffect(!levelStartEffect)
      }, 500)
    }
    return () => clearTimeout(timeout);
  }, [levelComplete])

  // Handle level failure by disabling input temporarily and restarting the level level
  const levelFailed = result.flat().filter((e) => e == false).length >= SMALL_LIVES
  useEffect(() => {
    let timeout;
    if (levelFailed) {
      setIsInputDisabled(true)
      timeout = setTimeout(() => {
        setBigLivesLeft(bigLivesLeft - 1)
        if (bigLivesLeft !== 1) { // necessary to prevent timeout from starting upon losing last life
          clearInput(level)
          setRandomPattern(level)
          setLevelStartEffect(!levelStartEffect)
        }
      }, 500)
    }
    return () => clearTimeout(timeout);
  }, [levelFailed])

  // Level complete animation
  const levelCompleteAnimation = useRef(new Animated.Value(1)).current
  useEffect(() => {
    if (levelComplete) {
      Animated.sequence([
        Animated.timing(levelCompleteAnimation, {
          toValue: 0.5,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(levelCompleteAnimation, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        })
      ]).start()
    }
  }, [levelComplete, levelCompleteAnimation])

  // Level failure animation
  const levelFailedAnimation = useRef(new Animated.Value(0)).current
  useEffect(() => {
    if (levelFailed) {
      Animated.sequence([
        Animated.timing(levelFailedAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(levelFailedAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(levelFailedAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(levelFailedAnimation, { toValue: 0, duration: 100, useNativeDriver: true })
      ]).start();
    }
  }, [levelFailed, levelFailedAnimation])

  function resetGame() {
    setLevel(1)
    setRandomPattern(1)
    clearInput(1)
    setBigLivesLeft(BIG_LIVES)
    setIsReadingPhase(true)
    setLevelStartEffect(!levelStartEffect)
  }

  function onSquarePress(i, j) {
    setInput(input.map((row, _i) => {
      return row.map((square, _j) => {
        if (i == _i && j == _j) {
          return true
        } else {
          return square
        }
      })
    }))
  }

  const styles = StyleSheet.create({
    outerContainer: {
      backgroundColor: colors.blueBg(level),
      height: '100%',
      padding: 20,
      opacity: levelCompleteAnimation,
    },
    innerContainer: {
      height: '100%',
      justifyContent: 'center',
    },
    board: {
      transform: [{translateY: levelFailedAnimation}]
    }
  })

  useEffect(() => {
    const ding = new Sound('ding.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      } else {
          ding.play(success => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }
    })  
  }, [])

  return (
    <Animated.View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        {
        !gameOver 
          ?
          <>
            <Score
              level={level}
              bigLivesLeft={bigLivesLeft}
            />
            <Animated.View style={styles.board}>
              <Board
                level={level}
                isReadingPhase={isReadingPhase}
                isInputDisabled={isInputDisabled}
                pattern={pattern}
                result={result}
                onSquarePress={onSquarePress}
              />
            </Animated.View>
          </>
        :
          <Outcome
          level={level}
          resetGame={resetGame}
          />
        }
      </View>
    </Animated.View>
  )
}

export default Game;