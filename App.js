import {
    Button,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Modal,
    ActivityIndicator,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/store/store.js'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { IP_ADDRESS } from './src/constants/Constants.js'
import AddImage from './src/assets/images/add-a-photo.svg'
import MainNavigator from './src/routes/MainNavigator.js'

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
                <MainNavigator />
            </PersistGate>
        </Provider>
    )
}

export default App


