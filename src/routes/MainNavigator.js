import React, { useState } from 'react'
import AuthStackNavigator from './AuthStackNavigator'
import AppStackNavigator from './AppStackNavigator'

const MainNavigator = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    return isAuthenticated ? <AppStackNavigator /> : <AuthStackNavigator />
}

export default MainNavigator
