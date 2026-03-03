import React, { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { lightColors } from '../../../utils/style/colors'
import { centered, SPACE } from '../../../utils/style/constants'
import { getSize } from '../../../utils/style/globalUtilityFunctionsAndConstants'

const HomeInit = (): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> AntonioR v1 🚀</Text>
    </View>
  )
}

export const Home = memo(HomeInit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
    ...centered,
    padding: SPACE[24],
  },

  text: {
    fontSize: getSize(18),
    marginVertical: SPACE[4],
    color: lightColors.textPrimary,
  },
})
