import { ActivityIndicator } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/store/store.js'
import AppStackNavigator from './src/routes/AppStackNavigator.js'

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
                <AppStackNavigator />
            </PersistGate>
        </Provider>
    )
}

export default App


