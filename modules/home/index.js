import { AppRegistry } from 'react-native'
import { name as appName } from '../../app.json'
import Home from './src/HomeScreen'

// Standalone entry: lets the home module run on its own dev server for isolated work.
// When consumed by the host, the host imports `home/HomeScreen` via Module Federation.
AppRegistry.registerComponent(appName, () => Home)
