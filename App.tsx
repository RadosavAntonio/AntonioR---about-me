import React, { useEffect, useRef } from 'react'
import {
  Alert,
  Button,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {
  restart,
  sync,
  useStallionModal,
  useStallionUpdate,
  withStallion,
} from 'react-native-stallion'
import { AppBottomSheet, AppBottomSheetHandle } from './src/app/appBottomSheet'

const AppInit = (): React.ReactElement => {
  const isDarkMode = useColorScheme() === 'dark'
  const bottomSheetRef = useRef<AppBottomSheetHandle | null>(null)

  const { isRestartRequired, newReleaseBundle } = useStallionUpdate()

  const { showModal } = useStallionModal()

  const openStallionModal = async () => {
    try {
      showModal()
      setTimeout(async () => {
        try {
          await sync?.()
        } catch (e) {
          console.warn('Failed to sync after opening Stallion modal', e)
        }
      }, 1000)
    } catch (e) {
      console.warn('Failed to open Stallion modal', e)
    }
  }

  // Show update alert (production only)
  useEffect(() => {
    if (isRestartRequired && !__DEV__) {
      const timeoutId = setTimeout(() => {
        const releaseNote = newReleaseBundle?.releaseNote
        const message = releaseNote
          ? `What's new:\n${releaseNote}`
          : 'A new version is ready to install.'

        Alert.alert(
          '🚀 Update Available',
          message,
          [{ text: 'Update Now', onPress: restart }],
          { cancelable: false },
        )
      }, 500)

      return () => clearTimeout(timeoutId)
    }
  }, [isRestartRequired, newReleaseBundle])

  const openSheet = async () => {
    await bottomSheetRef.current?.present()
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <Text style={styles.text}> AntonioR v1 🚀</Text>
        <View style={{ marginTop: 20 }}>
          <Button title="Open sheet" onPress={openSheet} />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button title="Select bucket" onPress={openStallionModal} />
        </View>
      </View>
      <AppBottomSheet ref={bottomSheetRef} />
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
    color: '#333',
  },
})

export const App = withStallion(AppInit)
