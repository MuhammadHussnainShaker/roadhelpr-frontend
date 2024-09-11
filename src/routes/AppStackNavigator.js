import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'

const AppStack = createStackNavigator()

const AppStackNavigator = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator>
                <AppStack.Screen name="Home" component={Home} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default AppStackNavigator
