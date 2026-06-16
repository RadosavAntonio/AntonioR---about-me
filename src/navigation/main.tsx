import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native'
import { useTheme } from '@antonior/core'
import React, { memo } from 'react'
import { navigationRef } from './globalNavigation'
import { RootNavigation } from './navigation'

const MainInit = (): React.ReactElement => {
  const { colors, isDark } = useTheme()

  // Drive react-navigation's chrome (container background, tab bar, headers)
  // from our palette so it follows the theme instead of the default light one.
  const base = isDark ? DarkTheme : DefaultTheme
  const navTheme: Theme = {
    ...base,
    colors: {
      ...base.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.backgroundSecondary,
      text: colors.textPrimary,
      border: colors.surfaceSecondary,
      notification: colors.error,
    },
  }

  return (
    <NavigationContainer ref={navigationRef} theme={navTheme}>
      <RootNavigation />
    </NavigationContainer>
  )
}

export const Main = memo(MainInit)
