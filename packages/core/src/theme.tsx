import React, { createContext, useContext, useMemo, useState } from 'react'
import { darkColors, lightColors } from './colors'

export type ColorScheme = 'light' | 'dark'
export type ThemeColors = typeof darkColors

const palettes: Record<ColorScheme, ThemeColors> = {
  light: lightColors,
  dark: darkColors,
}

interface ThemeContextValue {
  scheme: ColorScheme
  isDark: boolean
  colors: ThemeColors
  setScheme: (scheme: ColorScheme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
  initialScheme?: ColorScheme
}

/**
 * App-wide colour theme. Defaults to dark; ignores the OS scheme so the app
 * always starts dark unless an explicit `initialScheme` is passed.
 */
export const ThemeProvider = ({
  children,
  initialScheme = 'dark',
}: ThemeProviderProps): React.ReactElement => {
  const [scheme, setScheme] = useState<ColorScheme>(initialScheme)

  const value = useMemo<ThemeContextValue>(
    () => ({
      scheme,
      isDark: scheme === 'dark',
      colors: palettes[scheme],
      setScheme,
      toggleTheme: () => setScheme(prev => (prev === 'dark' ? 'light' : 'dark')),
    }),
    [scheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
