import React from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider, useTheme } from '@antonior/core'
import { AuthProvider } from './src/auth/AuthContext'
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
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </ThemeProvider>
)

export const App = AppInit
