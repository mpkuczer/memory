import Square from './Square'
import { View, Text, StyleSheet } from 'react-native'
import colors from '../constants/colors'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default function Board({level, bigLivesLeft, isReadingPhase, pattern, result, onSquarePress, isInputDisabled, bgColor}) {

  return (
    <>
    <View style={styles.score}>
      <View style={{flex: 1}}>
        <Text style={styles.score.text}>Level: {level}</Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={styles.score.text}>Lives:</Text>
        <View style={styles.score.icons}>
          {
            Array.from(Array(bigLivesLeft)).map((_, i) => {
              return (
                <FontAwesome5 
                    name={'heart'}
                    solid
                    style={{fontSize: 20, color: colors.white, opacity: 0.7, margin: 3}}
                    key={i}/>
              )
            })
          }
          {
            Array.from(Array(3 - bigLivesLeft)).map((_, i) => { // handle magic number
              return (
                <FontAwesome5
                  name={'heart'}
                  light
                  style={{fontSize: 20, color: colors.white, opacity: 0.7, margin: 3}}
                  key={i}/>
              )
            })
          }
        </View>
      </View>
    </View>
    <View style={styles.board}>
    
      {(isReadingPhase ? pattern : result).map((row, i) => {
        return (
          <View style={styles.row}
            key={i}
          >
            {row.map((square, j) => {
              return (
                <Square
                    key={`${i}-${j}`}
                    state={square}
                    onPress={() => onSquarePress(i, j)}
                    isInputDisabled={isInputDisabled}
                    bgColor={bgColor}
                  />
                )
              })}
          </View>
        )})}
    </View>
    </>
  )
}

const styles  = StyleSheet.create({
  score: {
    marginBottom: 'auto',
    flexDirection:'row',
    text: {
      textTransform: 'uppercase',
      color: colors.white,
      opacity: 0.7,
      fontSize: 25,
    },
    icons: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',

   
    }
  },
  board: {
    flexDirection:'column',
  },
  row: {
    flexDirection:'row',
  }
})