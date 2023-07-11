import { View, Text, Animated, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useRef } from 'react'
import colors from '../constants/colors'
import Logo from './Logo'

export default function Instructions({skipInstructions}) {
  const textAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(textAnimation, {
      toValue: 0.5,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [])

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.blueBg(1),
      height: '100%',
      padding: 20,    
      justifyContent: 'center',
      
    },
    textContainer: {
      opacity: textAnimation,
      marginBottom: 100,
      paddingLeft: 50,
      paddingRight: 50,
    },
    text: {
      textTransform: 'uppercase',
      color: colors.white,
      fontSize: 30,
      fontFamily: 'VarelaRound-Regular',
      marginBottom: 50,
      textAlign: 'center'
    }
  })

  return (
    <Pressable onPress={skipInstructions}>
      <View style={styles.container}>
        <Logo/>
        <Animated.View style={styles.textContainer}>
          <Text style={styles.text}>A number of white squares will appear on the screen.</Text>  
          <Text style={styles.text}>Memorize and repeat the pattern to proceed onto the next level.</Text>
        </Animated.View>
      </View>
    </Pressable>
  )
}




