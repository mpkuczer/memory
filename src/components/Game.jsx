import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Score from './Score'
import Board from './Board'
import Outcome from './Outcome'

import colors from '../constants/colors'

const SMALL_LIVES = 3;
const BIG_LIVES = 3;

function levelToBoardSize(level) {
  return Math.floor(level / 3) + 3
}

function levelToPatternSize(level) {
  return level + 2
}

function getRandomIndices(level) {
  let nums = Array.from(Array(levelToBoardSize(level)*levelToBoardSize(level)).keys())
  let res = []
  for (let i = 0; i < levelToPatternSize(level); i++) {
    const randIndex = Math.floor(Math.random()*nums.length)
    res.push(nums[randIndex])
    nums.splice(randIndex, 1)
  }
  return res.map((n) => [Math.floor(n / levelToBoardSize(level)), n % levelToBoardSize(level)])
}

function emptyBoard(level) {
  return Array(levelToBoardSize(level)).fill(Array(levelToBoardSize(level)).fill(null))
}

function getRandomPattern(level) {
  const patternIndices = getRandomIndices(level)
  return emptyBoard(level).map((row, _i) => {
    return row.map((patternSquare, _j) => {
      const square = patternIndices.reduce((acc, [i, j]) => {
        return acc || (i == _i && j == _j)
      }, false)
      return square === false ? null : square
    })
  })
}


function Game() {

  const [level, setLevel] = useState(1);
  const [pattern, setPattern] = useState(getRandomPattern(1));

  const clearPattern = (level) => {
    setPattern(emptyBoard(level))
  }
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

  const levelComplete = result.flat().filter((e) => e == true).length == levelToPatternSize(level)
  const levelFailed = result.flat().filter((e) => e == false).length >= SMALL_LIVES

  const [bigLivesLeft, setBigLivesLeft] = useState(BIG_LIVES)
  const gameOver = bigLivesLeft == 0

  const [isInputDisabled, setIsInputDisabled] = useState(true)

  const [isReadingPhase, setIsReadingPhase] = useState(true)

  useEffect(() => {
    let timeout;
    console.log('hello')
    if (isReadingPhase) {
      setIsInputDisabled(true)
      timeout = setTimeout(() => {
        setIsReadingPhase(false)
        setIsInputDisabled(false)
      }, 2000)
    }
    return () => clearTimeout(timeout)
  }, [isReadingPhase])

  useEffect(() => {
    let timeout;
    if (levelComplete) {
      setIsInputDisabled(true)
      timeout = setTimeout(() => {
        setLevel(level + 1)
        clearInput(level + 1)
        setRandomPattern(level + 1)
        setIsReadingPhase(true)
      }, 500)
    }
    return () => clearTimeout(timeout);
  }, [levelComplete])

  // useEffect(() => {
  //   if (levelComplete) {
  //     setLevel(level + 1)
  //     setRandomPattern(level + 1)
  //     clearInput(level + 1)
  //     setIsInputDisabled(true)
  //   }
  // }, [input])

  useEffect(() => {
    let timeout;
    if (levelFailed) {
      setIsInputDisabled(true)
      timeout = setTimeout(() => {
        setBigLivesLeft(bigLivesLeft - 1)
        clearInput(level)
        setRandomPattern(level)
        setIsReadingPhase(true)
      }, 500)
    }
    return () => clearTimeout(timeout);
  }, [levelFailed])

  function resetGame() {
    setLevel(1)
    setRandomPattern(1)
    clearInput(1)
    setBigLivesLeft(BIG_LIVES)
    setIsReadingPhase(true)
  }

  function onSquarePress(i, j) {
    if (isInputDisabled) return // possibly unnecessary if TouchableOpacity doesn't call this when disabled

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

  const levelCompleteAnimation = useRef(new Animated.Value(1)).current
  const levelFailedAnimation = useRef(new Animated.Value(0)).current

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

  //


  const styles = StyleSheet.create({
    outerContainer: {
      backgroundColor: colors[`blue${level}`],
      height: '100%',
      padding: 20,
      opacity: levelCompleteAnimation,
    },
    innerContainer: {
      height: '100%',
      justifyContent: 'center',
    }
  })


    return (
      <Animated.View style={styles.outerContainer}>
        <Animated.View style={[
            styles.innerContainer,
          ]}>
          {
          gameOver 
          ?
          <Outcome
            level={level}
            resetGame={resetGame}
          />
          :
          <>
            <Score
              level={level}
              bigLivesLeft={bigLivesLeft}
            />
            <Animated.View style={[
              {transform: [{translateY: levelFailedAnimation}]}
            ]}>
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
          }
        </Animated.View>
      </Animated.View>
    )
}


export default Game;