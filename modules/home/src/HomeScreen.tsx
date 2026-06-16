import { centered, getSize, lightColors, SPACE } from '@antonior/core'
import React, { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const HomeInit = (): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> AntonioR v2 🚀 (OTA update!)</Text>
    </View>
  )
}

export const Home = memo(HomeInit)
export default Home

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
