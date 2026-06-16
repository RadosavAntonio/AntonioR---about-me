import React from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider, useTheme } from '@antonior/core'
import { Main } from './src/navigation/main'

const AppContent = (): React.ReactElement => {
  const { isDark } = useTheme()

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <Main />
    </SafeAreaProvider>
  )
}

const AppInit = (): React.ReactElement => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
)

export const App = AppInit
