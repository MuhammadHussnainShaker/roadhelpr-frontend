import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SCREENS } from '../constants/screens'
import { useSelector } from 'react-redux'

const AppStack = createStackNavigator()

const AppStackNavigator = () => {
    const accessToken = useSelector((state) => state.auth?.accessToken)
    console.log('AccEssToken: ', accessToken)
    return (
        <NavigationContainer>
            <AppStack.Navigator initialRouteName="Home">
                <AppStack.Screen
                    name="Welcome"
                    component={SCREENS.Welcome}
                    options={{ headerShown: false }}
                />
                <AppStack.Screen name="Signup" component={SCREENS.Signup} />
                <AppStack.Screen name="Login" component={SCREENS.Login} />
                <AppStack.Screen
                    name="Home"
                    component={SCREENS.Home}
                    options={{ headerShown: false }}
                />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default AppStackNavigator
