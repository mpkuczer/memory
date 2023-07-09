import { View, Text, StyleSheet } from 'react-native'
import colors from '../constants/colors'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default function Score({level, bigLivesLeft}) {

  return (
    <View style={styles.score}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={styles.score.text}>Level:</Text>
        <Text style={styles.score.level}>{level}</Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row',}}>
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
  )
}

const styles = StyleSheet.create({
  score: {
    position: 'absolute',
    top: 0,
    flexDirection:'row',
    text: {
      textTransform: 'uppercase',
      color: colors.white,
      opacity: 0.7,
      fontSize: 25,
      fontFamily: 'VarelaRound-Regular',
      marginRight: 15

    },
    level: {
      textTransform: 'uppercase',
      color: colors.white,
      opacity: 0.7,
      fontSize: 25,
      fontFamily: 'VarelaRound-Regular',
    },
    icons: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',

   
    }
  },
})