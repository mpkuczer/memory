import React from 'react'
import { useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Square from './Square'

const levelToBoardSize = (level) => {
  return Math.round(level / 3) + 3
}

const getRandomIndices = (boardSize, patternSize) => {      // [[0, 0], [1, 1], [2, 2]]
  let nums = Array.from(Array(boardSize * boardSize).keys())
  let res = []
  for (let i = 0; i < patternSize; i++) {
    const randIndex = Math.floor(Math.random()*nums.length)
    res.push(nums[randIndex])
    nums.splice(randIndex, 1)
  }
  return res.map((n) => [Math.floor(n / boardSize), n % boardSize])
}


function Board() {
  const [level, setLevel] = useState(1);
  const patternSize = level + 2;
  const boardSize = levelToBoardSize(level);
  const [pattern, setPattern] = useState(Array(boardSize).fill(Array(boardSize).fill(null))); 

  useEffect(() => {
    const patternIndices = getRandomIndices(boardSize, patternSize)
    setPattern(pattern.map((row, _i) => {
      return row.map((patternSquare, _j) => {
        const square = patternIndices.reduce((acc, [i, j]) => {
          return acc || (i == _i && j == _j)
        }, false)
        return square === false ? null : square
      })}))
    }, [level])

  
  const [input, setInput] = useState(Array(boardSize).fill(Array(boardSize).fill(false))); //[[false, false, false],
                                            // [false, true, #True],
                                            // [false, false, false]]

  //['empty', 'empty', 'empty',
  //'empty, 'correct', 'incorrect'
  //'empty', 'empty', 'empty',]

  const result = pattern.map((row, i) => {
    return row.map((patternSquare, j) => {
      const inputSquare = input[i][j]
      if (patternSquare == true && inputSquare == true) {
        return 'correct'
      } else if (patternSquare == false && inputSquare == true) {
        return 'incorrect'
      } else {
        return 'empty'
      }
    })
  })

  const [status, setStatus] = useState('reading') // 'reading', 'playing'

  useEffect(() => {
    if (status == 'reading') {
      setTimeout(() => {
        setStatus('playing')
      }, 3000)
    }
  }, [level, status])
  
  const displayed = status == 'reading' ? pattern : result
  const squareCallback = (i, j) => {
    return status == 'reading' 
      ? () => {} 
      : (i, j) => onSquarePress(i, j)
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

  return (
    <View style={{
      justifyContent:'center',
      backgroundColor:'#00607A',
      height:'100%'
    }}>

      <View style={{
        padding:20,
        flexDirection:'column',
      }}>
      
        {pattern.map((row, i) => {
          return (
            <View style={{
              flexDirection:'row',
              }}
              key={i}
            >
              {row.map((square, j) => {
                return (
                  <Square
                      key={`${i}-${j}`}
                      state={square}
                      onPress={() => onSquarePress(i, j)}
                    />
                  )
                })}
            </View>
          )})}
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 100

  },
  board: {
    flexDirection: 'column',
    aspectRatio: 1,

  },

  row: {
    flexDirection: 'row',
    flexBasis: '33%',

  },

  square: {
    flexBasis: '33%',
    backgroundColor: 'red',
  }
})
export default Board;