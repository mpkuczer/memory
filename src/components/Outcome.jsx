import { View, Text, Button, Pressable, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { LineChart, XAxis, YAxis, Grid } from 'react-native-svg-charts'
import colors from '../constants/colors'
import { G, Line } from 'react-native-svg'

// class CustomGridExample extends React.PureComponent {

//     render() {


//         const axesSvg = { fontSize: 10, fill: 'grey' };
//         const verticalContentInset = { top: 10, bottom: 10 }
//         const xAxisHeight = 30

//         const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

//         const CustomGrid = ({ x, y, data, ticks }) => (
//             <G>
//                 {
//                     // Vertical grid
//                     data.map((_, index) => (
//                         <Line
//                             key={ index }
//                             y1={ '0%' }
//                             y2={ '100%' }
//                             x1={ x(index) }
//                             x2={ x(index) }
//                             stroke={ 'rgba(0,0,0,0.2)' }
//                         />
//                     ))
//                 }
//             </G>
//         )

//         return (
//             <View style={ { height: 200, flexDirection: 'row' } }>
//                 <LineChart
//                     style={ { flex: 1 } }
//                     data={ data }
//                     svg={ {
//                         stroke: 'rgb(134, 65, 244)',
//                     } }
//                 >
//                     <CustomGrid belowChart={true}/>
//                 </LineChart>
//                 <XAxis
//                         style={{ marginHorizontal: -10, height: xAxisHeight }}
//                         data={data}
//                         formatLabel={(value, index) => index}
//                         contentInset={{ left: 10, right: 10 }}
//                         svg={axesSvg}
//                     />
//             </View>
//         )
//     }

// }
class AxesExample extends React.PureComponent {

  render() {

      const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

      const axesSvg = { fontSize: 10, fill: 'grey' };
      const verticalContentInset = { top: 10, bottom: 10 }
      const xAxisHeight = 50

      const CustomGrid = ({ x, y, data, ticks }) => (
                    <G>
                        {
                            // Vertical grid
                            data.map((_, index) => (
                                <Line
                                    key={ index }
                                    y1={ '0%' }
                                    y2={ '100%' }
                                    x1={ x(index) }
                                    x2={ x(index) }
                                    stroke={ '#0090b6' }
                                />
                            ))
                        }
                    </G>
                )
      // Layout of an x-axis together with a y-axis is a problem that stems from flexbox.
      // All react-native-svg-charts components support full flexbox and therefore all
      // layout problems should be approached with the mindset "how would I layout regular Views with flex in this way".
      // In order for us to align the axes correctly we must know the height of the x-axis or the width of the x-axis
      // and then displace the other axis with just as many pixels. Simple but manual.

      return (
          <View style={{ height: 400, padding: 20, flexDirection: 'row' }}>
              <YAxis
                  data={data}
                  style={{ marginBottom: xAxisHeight }}
                  contentInset={verticalContentInset}
                  svg={axesSvg}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                  <LineChart
                      style={{ flex: 1 }}
                      data={data}
                      contentInset={verticalContentInset}
                      svg={{ stroke: '#0090b6', strokeWidth: 5 }}
                      spacing={10}
                      gridMin={0}
                  >
                      <CustomGrid belowChart={true}/>
                  </LineChart>
                  <XAxis
                      style={{ marginHorizontal: -10, height: xAxisHeight }}
                      data={data}
                      formatLabel={(value, index) => index}
                      contentInset={{ left: 10, right: 10 }}
                      svg={axesSvg}
                  />
              </View>
          </View>
      )
  }

}



export default function Outcome({level, resetGame}) {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: colors[`blue${level+4}`],
      height: 100,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    buttonText: {
      textTransform: 'uppercase',
      color: colors.white,
      opacity: 0.7,
      fontSize: 25,
      fontFamily: 'VarelaRound-Regular',
      marginRight: 15
    },
    levelWrapper: {
      width: '100%',
      marginBottom: 120,
      justifyContent: 'center',
      alignItems: 'center',
    },
    levelText: {
      textTransform: 'uppercase',
      color: colors.white,
      opacity: 0.7,
      fontSize: 45,
      fontFamily: 'VarelaRound-Regular',
      marginRight: 15
    }
  })
  return (
    <View>
      <View style={styles.levelWrapper}>
        <Text style={styles.levelText}>Level {level}</Text>
      </View>

      <Pressable
        onPress={resetGame}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Play again?</Text>  
      </Pressable>
      <Pressable
      onPress={resetGame}
      style={styles.button}
      >
      <Text style={styles.buttonText}>Statistics</Text>  
      </Pressable>
    </View>
  )
}




