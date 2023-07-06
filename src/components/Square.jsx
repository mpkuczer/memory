import { TouchableOpacity, View } from 'react-native'

export default function Square({state, onPress}) {
  const backgroundColor = () => {
    switch (state) {
      case 'correct':
        return '#eaeaea'
      case 'incorrect':
        return '#222222'
      case 'empty':
        return '#005066'
    }
  }

  return (
    <TouchableOpacity onPress={onPress} style={{
      flex:1,
      backgroundColor: backgroundColor(),
      aspectRatio:1,
      borderRadius: 10,
      margin: 5
    
    }}>
    </TouchableOpacity>

  )
}

