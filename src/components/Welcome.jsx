import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../constants/colors'
import Logo from './Logo'

export default function Welcome({startGame}) {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.blueBg(1),
      height: '100%',
      padding: 20,    
      justifyContent: 'center',
    },
    button: {
      backgroundColor: colors.blueBtn(1),
      height: 100,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 250,
      marginLeft: 20,
      marginRight: 20,
    },
    buttonText: {
      textTransform: 'uppercase',
      color: colors.white,
      opacity: 0.7,
      fontSize: 25,
      fontFamily: 'VarelaRound-Regular',
      marginRight: 15
    }

  })
  return (
    <View style={styles.container}>
      <Logo />
      <Pressable
        onPress={startGame}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Play game</Text>  
      </Pressable>
    </View>
  )
}




