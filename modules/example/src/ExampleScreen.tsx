import React, { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { centered, getSize, lightColors, SPACE } from '@antonior/core'

const ExampleInit = (): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Example</Text>
      <Text style={styles.subtitle}>Welcome to the example screen</Text>
    </View>
  )
}

export const Example = memo(ExampleInit)
export default Example

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
    ...centered,
    padding: SPACE[24],
  },
  title: {
    fontSize: getSize(24),
    fontWeight: 'bold',
    color: lightColors.textPrimary,
    marginBottom: SPACE[8],
  },
  subtitle: {
    fontSize: getSize(16),
    color: lightColors.textSecondary,
  },
})
