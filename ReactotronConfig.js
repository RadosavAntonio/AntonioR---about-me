import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import config from 'react-native-config';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const CONFIG_TYPE = config.APP_CONFIG ?? 'NONE';

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: `Shout ${CONFIG_TYPE} ${Platform.OS === 'ios' ? 'iOS' : 'Android'}`,
  })
  .setAsyncStorageHandler(AsyncStorage)
  .useReactNative({
    asyncStorage: false, // there are more options to the async storage.
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/,
    },
    editor: false, // there are more options to editor
    errors: { veto: stackFrame => false }, // or turn it off with false
    overlay: false, // just turning off overlay
  })
  .use(reactotronRedux())
  .connect();

Reactotron.clear();

export default reactotron;

export const connect = () => {
  Reactotron.connect();
};
