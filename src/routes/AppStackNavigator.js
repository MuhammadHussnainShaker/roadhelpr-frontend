import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SCREENS } from '../constants/screens'
import { useSelector } from 'react-redux'
import { StatusBar } from 'react-native'
import { COLORS } from '../constants/colors'
import BottomNavigator from './BottomNavigator'

const AppStack = createStackNavigator()

const AppStackNavigator = ({ initialRoute }) => {
    const accessToken = useSelector((state) => state.auth?.accessToken)
    // console.log('AccessToken: ', accessToken)

    useEffect(() => {
        StatusBar.setBackgroundColor(COLORS.primary)
        StatusBar.setBarStyle('light-content')
    }, [])
    return (
        <NavigationContainer>
            <AppStack.Navigator
                initialRouteName="Main"
                // initialRouteName={accessToken ? 'Home' : 'Login'}
            >
                <AppStack.Screen
                    name="Welcome"
                    component={SCREENS.Welcome}
                    options={{ headerShown: false }}
                />
                <AppStack.Screen name="Signup" component={SCREENS.Signup} />
                <AppStack.Screen name="Login" component={SCREENS.Login} />

                <AppStack.Screen
                    name="Main"
                    component={BottomNavigator}
                    options={{ headerShown: false }}
                />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default AppStackNavigator
