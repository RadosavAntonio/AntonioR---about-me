import { centered, getSize, SPACE, useTheme } from '@antonior/core'
import { useNavigation } from '@react-navigation/native'
import React, { memo } from 'react'
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native'

const ProfileInit = (): React.ReactElement => {
  const navigation = useNavigation()
  const { colors, isDark, toggleTheme } = useTheme()

  // Sign out lives on the host's root stack (the Login screen), which sits above
  // the Tabs > ProfileStack this remote renders inside. Walk up to the root
  // navigator and reset so the authed stack is cleared, not just hidden.
  const signOut = () => {
    let nav = navigation
    while (nav.getParent()) {
      nav = nav.getParent() as typeof navigation
    }
    nav.reset({ index: 0, routes: [{ name: 'Login' as never }] })
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>Profile</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Welcome to your profile
      </Text>

      <View
        style={[
          styles.row,
          { backgroundColor: colors.surface, borderColor: colors.surfaceSecondary },
        ]}>
        <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>
          Dark theme
        </Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{ true: colors.primary, false: colors.surfaceSecondary }}
          thumbColor={colors.textInverse}
        />
      </View>

      <Pressable
        onPress={signOut}
        style={({ pressed }) => [
          styles.signOut,
          { backgroundColor: colors.primary },
          pressed && styles.pressed,
        ]}>
        <Text style={[styles.signOutLabel, { color: colors.textOnPrimary }]}>
          Sign out
        </Text>
      </Pressable>
    </View>
  )
}

export const Profile = memo(ProfileInit)
export default Profile

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
    marginBottom: SPACE[32],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingVertical: SPACE[12],
    paddingHorizontal: SPACE[16],
    borderRadius: SPACE[12],
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: SPACE[24],
  },
  rowLabel: {
    fontSize: getSize(16),
    fontWeight: '600',
  },
  signOut: {
    alignSelf: 'stretch',
    ...centered,
    paddingVertical: SPACE[16],
    borderRadius: SPACE[12],
  },
  signOutLabel: {
    fontSize: getSize(16),
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.85,
  },
})
