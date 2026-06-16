import { AppRegistry } from 'react-native'
import { name as appName } from '../../app.json'
import Profile from './src/ProfileScreen'

// Standalone entry for isolated dev. Consumed by the host via Module Federation.
AppRegistry.registerComponent(appName, () => Profile)
