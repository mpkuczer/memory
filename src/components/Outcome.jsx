import { View, Text, Button, Pressable, StyleSheet } from 'react-native'
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen'

export default function Outcome({level, resetGame}) {
  return (
    <View>
      <Text>Level {level}</Text>
      <Pressable
        onPress={resetGame}
        style={styles.button}
      >
      <Text>Play again?</Text>  
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    borderRadius: 5,

  }
})