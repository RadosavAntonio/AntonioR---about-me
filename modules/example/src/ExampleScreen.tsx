import React, { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { centered, getSize, SPACE, useTheme } from '@antonior/core'

const ExampleInit = (): React.ReactElement => {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>Example</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Welcome to the example screen
      </Text>
    </View>
  )
}

export const Example = memo(ExampleInit)
export default Example

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...centered,
    padding: SPACE[24],
  },
  title: {
    fontSize: getSize(24),
    fontWeight: 'bold',
    marginBottom: SPACE[8],
  },
  subtitle: {
    fontSize: getSize(16),
  },
})
