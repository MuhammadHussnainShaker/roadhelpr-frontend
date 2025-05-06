import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Welcome from '../screens/Welcome'
import Login from '../screens/Login'
import Signup from '../screens/Signup'

const AuthStack = createStackNavigator()

const AuthStackNavigator = () => {
    return (
        <NavigationContainer>
            <AuthStack.Navigator>
                <AuthStack.Screen name="Welcome" component={Welcome} />
                <AuthStack.Screen name="Login" component={Login} />
                <AuthStack.Screen name="Signup" component={Signup} />
            </AuthStack.Navigator>
        </NavigationContainer>
    )
}

export default AuthStackNavigator
