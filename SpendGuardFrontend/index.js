/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { store, persistor } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

if (__DEV__) {
    require("./ReactotronConfig");
}

function AppMain() {
    return (
        <GestureHandlerRootView>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </GestureHandlerRootView>
    )
}

AppRegistry.registerComponent(appName, () => AppMain);
