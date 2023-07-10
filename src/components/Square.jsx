import { useEffect, useRef } from 'react'
import { View, TouchableOpacity, Animated } from 'react-native'


import colors from '../constants/colors'

export default function Square({state, onPress, isInputDisabled, level}) {

  const successAnimation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (state == true) {
      Animated.timing(successAnimation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(successAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true
      }).start();
    }
  }, [state, successAnimation])

  const failAnimation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (state == false) {
      Animated.sequence([
        Animated.timing(failAnimation, { toValue: 5, duration: 50, useNativeDriver: true }),
        Animated.timing(failAnimation, { toValue: -5, duration: 50, useNativeDriver: true }),
        Animated.timing(failAnimation, { toValue: 5, duration: 50, useNativeDriver: true }),
        Animated.timing(failAnimation, { toValue: 0, duration: 100, useNativeDriver: true })
      ]).start();
    }
  }, [state, failAnimation])



  const backgroundColor = () => {
    switch (state) {
      case true:
        return colors.blueBtn(level)
      case false:
        return colors.gray
      case null:
        return colors.blueBtn(level)
     }
  }

  return (
      <Animated.View style={{
        flex: 1,
        backgroundColor: backgroundColor(),
        opacity: 0.75,
        aspectRatio: 1,
        borderRadius: 10,
        margin: 5,
        transform: [{translateY: failAnimation}]
        

      }}>
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
          }} 
          onPress={onPress}
          disabled={state !== null || isInputDisabled}
          
        >
          <Animated.View style={{
            width: '100%',
            height: '100%',
            backgroundColor: colors.white,
            transform: [{scaleY: successAnimation}],
            opacity: 0.75,
            borderRadius: 10,
          }} >

          </Animated.View>
        </TouchableOpacity>
        </Animated.View>
  )
}

