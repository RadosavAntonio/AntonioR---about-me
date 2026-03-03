import { useRoute } from '@react-navigation/native'
import React, { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { lightColors } from '../../../utils/style/colors'
import { centered, SPACE } from '../../../utils/style/constants'
import { getSize } from '../../../utils/style/globalUtilityFunctionsAndConstants'

const ChatInit = (): React.ReactElement => {
  const route = useRoute()
  const { id } = route.params as { id: string }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat</Text>
      <Text style={styles.subtitle}>{id}</Text>
    </View>
  )
}

export const Chat = memo(ChatInit)

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
