import { useNavigation } from '@react-navigation/native'
import React, { memo } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { centered, getSize, SPACE, useTheme } from '@antonior/core'

const LoginInit = (): React.ReactElement => {
  const navigation = useNavigation()
  const { colors } = useTheme()

  const goToApp = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Tabs' as never }],
    })
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>Login</Text>
      <View style={styles.buttonWrapper}>
        <Button title="Go to app" onPress={goToApp} />
      </View>
    </View>
  )
}

export const Login = memo(LoginInit)

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
  buttonWrapper: {
    marginTop: SPACE[24],
  },
})
