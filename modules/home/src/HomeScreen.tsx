import { Button3d, centered, getSize, SPACE, useTheme } from '@antonior/core'
import React, { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const HomeInit = (): React.ReactElement => {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.textPrimary }]}>
        {' '}
        AntonioR v2 🚀 (OTA update!)
      </Text>
      <Button3d />
    </View>
  )
}

export const Home = memo(HomeInit)
export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...centered,
    padding: SPACE[24],
  },

  text: {
    fontSize: getSize(18),
    marginVertical: SPACE[4],
  },
})
