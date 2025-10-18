import React, { useEffect } from 'react'
import { StatusBar, useColorScheme, View } from 'react-native'
import config from 'react-native-config'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export const App = (): React.ReactElement => {
  const isDarkMode = useColorScheme() === 'dark'

  useEffect(() => {
    // // ----- REACTOTRON -----
    if (__DEV__) {
      import('./ReactotronConfig').then(() => null)
    }

    // ----- REACTOTRON LOGS -----
    const CONFIG_TYPE = config.APP_CONFIG ?? 'NONE'
    console.log(`----- ⭐️ mode: ${CONFIG_TYPE.toUpperCase()} ⭐️ -----`)

    // ----- CRASHLYTICS -----
    // CrashlyticsUtils.initialize()
  }, [])

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View />
    </SafeAreaProvider>
  )
}


