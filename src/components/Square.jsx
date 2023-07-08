import { TouchableOpacity } from 'react-native'

import colors from '../constants/colors'

export default function Square({state, onPress, isInputDisabled}) {
  const backgroundColor = () => {
    switch (state) {
      case true:
        return colors.white
      case false:
        return colors.gray
      case null:
        return colors.blue_4
     }
  }

  // const opacity = () => {
  //   switch (state) {
  //     case true:
  //       return 0.75
  //     case false:
  //       return 0.75
  //     case null:
  //       return 0.75
  //   }
  // }

  return (
      <TouchableOpacity 
        onPress={onPress}
        disabled={state !== null || isInputDisabled}
        style={{
          flex: 1,
          backgroundColor: backgroundColor(),
          opacity: 0.75,
          aspectRatio: 1,
          borderRadius: 10,
          margin: 5
        }}
      />
  )
}

