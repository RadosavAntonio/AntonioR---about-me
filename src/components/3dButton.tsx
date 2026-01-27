import { memo } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const Button3dInit = (): React.ReactNode => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {}}
        style={({ pressed }) => [styles.wrap, pressed && styles.pressed]}>
        <View style={styles.outerShadow}>
          <View style={styles.innerShadow}>
            <Text>A</Text>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

export const Button3d = memo(Button3dInit)

const SIZE = 58

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    borderRadius: 45,
    backgroundColor: '#1F1F1F',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 14,

    elevation: 12,
  },

  wrap: {
    width: SIZE,
    height: SIZE,
  },

  outerShadow: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: '#2B2B2B',

    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.55,
    shadowRadius: 8,

    elevation: 10,
  },

  innerShadow: {
    flex: 1,
    borderRadius: SIZE / 2,
    backgroundColor: '#2B2B2B',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#FFF',
    shadowOffset: { width: -5, height: -5 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },

  pressed: {
    transform: [{ scale: 0.96 }],
  },
})
