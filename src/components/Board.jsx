import Square from './Square'
import { View, Text, StyleSheet } from 'react-native'

export default function Board({level, isReadingPhase, pattern, result, onSquarePress, isInputDisabled}) {

  return (
    <View style={styles.board}>
    
      {(isReadingPhase ? pattern : result).map((row, i) => {
        return (
          <View style={styles.row}
            key={i}
          >
            {row.map((square, j) => {
              return (
                <Square
                    key={`${i}-${j}-${level}-${pattern}`}
                    state={square}
                    onPress={() => onSquarePress(i, j)}
                    isInputDisabled={isInputDisabled}
                    level={level}
                  />
                )
              })}
          </View>
        )})}
    </View>
  )
}

const styles  = StyleSheet.create({
  
  board: {
    flexDirection:'column',
  },
  row: {
    flexDirection:'row',
  }
})