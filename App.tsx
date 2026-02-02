import React, { useRef } from 'react'
import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { withStallion } from 'react-native-stallion'
import { AppBottomSheet, AppBottomSheetHandle } from './src/app/appBottomSheet'

const AppInit = (): React.ReactElement => {
  const isDarkMode = useColorScheme() === 'dark'
  const bottomSheetRef = useRef<AppBottomSheetHandle | null>(null)

  const openSheet = async () => {
    await bottomSheetRef.current?.present()
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <Text style={styles.text}>Coming soon 😎</Text>
        <View style={{ marginTop: 20 }}>
          <Button title="Open sheet" onPress={openSheet} />
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
