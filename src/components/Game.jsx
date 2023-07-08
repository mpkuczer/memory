import React from 'react'
import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
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
  const [backgroundColor, setBackgroundColor] = useState(colors.blue_5);
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
      setBackgroundColor(colors.green)
      setIsInputDisabled(true)
      timeout = setTimeout(() => {
        setBackgroundColor(colors.blue_5)
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
      setBackgroundColor(colors.red)
      setIsInputDisabled(true)
      timeout = setTimeout(() => {
        setBackgroundColor(colors.blue_5)
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

  //


  const styles = StyleSheet.create({
    container: {
      justifyContent: 'flex-start',
      backgroundColor: backgroundColor,
      height: '100%',
      padding: 20,
    }
  })


    return (
      <View style={styles.container}>
        {
        gameOver 
        ?
        <Outcome
          level={level}
          resetGame={resetGame}
        />
        :
        <Board
          level={level}
          bigLivesLeft={bigLivesLeft}
          isReadingPhase={isReadingPhase}
          isInputDisabled={isInputDisabled}
          pattern={pattern}
          result={result}
          onSquarePress={onSquarePress}
          bgColor={backgroundColor}  
        />
        }
      </View>
    )
}


export default Game;