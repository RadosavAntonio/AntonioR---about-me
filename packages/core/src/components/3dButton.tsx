import { memo } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { darkColors } from '../colors'
import { centered } from '../constants'

const SIZE = 58

/**
 * Neumorphic 3D button. Raised state stacks a dark drop shadow (bottom-right)
 * against a light lift highlight (top-left) plus a thin inset top rim so the
 * disc reads as curved and lifted off the surface. Pressing flips both outer
 * shadows to inset so it looks pushed in.
 */
const Button3dInit = (): React.ReactNode => {
  return (
    <Pressable
      onPress={() => {}}
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.pressed : styles.raised,
      ]}>
      <Text style={styles.label}>A</Text>
    </Pressable>
  )
}

export const Button3d = memo(Button3dInit)

const styles = StyleSheet.create({
  button: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: darkColors.surface,
    ...centered,
  },
  raised: {
    boxShadow: [
      { offsetX: 3, offsetY: 3, blurRadius: 6, color: darkColors.shadowMedium },
      {
        offsetX: -3,
        offsetY: -3,
        blurRadius: 6,
        color: 'rgba(255, 255, 255, 0.05)',
      },
      {
        offsetX: 0,
        offsetY: 1,
        blurRadius: 1,
        color: 'rgba(255, 255, 255, 0.08)',
        inset: true,
      },
    ],
  },
  pressed: {
    boxShadow: [
      {
        offsetX: 5,
        offsetY: 5,
        blurRadius: 10,
        color: darkColors.shadowDark,
        inset: true,
      },
      {
        offsetX: -4,
        offsetY: -4,
        blurRadius: 10,
        color: 'rgba(255, 255, 255, 0.06)',
        inset: true,
      },
    ],
    transform: [{ scale: 0.97 }],
  },
  label: {
    color: darkColors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    textShadowColor: darkColors.shadowDark,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
})
