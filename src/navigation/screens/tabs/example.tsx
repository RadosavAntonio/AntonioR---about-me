import React, { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { lightColors } from '../../../utils/style/colors'
import { centered, SPACE } from '../../../utils/style/constants'
import { getSize } from '../../../utils/style/globalUtilityFunctionsAndConstants'

const ExampleInit = (): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Example</Text>
      <Text style={styles.subtitle}>Welcome to the example screen</Text>
    </View>
  )
}

export const Example = memo(ExampleInit)

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
