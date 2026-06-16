import { AppRegistry } from 'react-native'
import { name as appName } from '../../app.json'
import Example from './src/ExampleScreen'

// Standalone entry for isolated dev. Consumed by the host via Module Federation.
AppRegistry.registerComponent(appName, () => Example)
