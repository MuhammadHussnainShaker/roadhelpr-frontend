import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { SCREENS } from '../constants/screens'

const Tab = createBottomTabNavigator()

const BottomNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName

                    // Set the FontAwesome icons based on the screen name
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home' // FontAwesome doesn't have a separate "outline" variant for some icons
                    } else if (route.name === 'Chat') {
                        iconName = focused ? 'comments' : 'comments'
                    } else if (route.name === 'Requests') {
                        iconName = focused ? 'list' : 'list'
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'cog' : 'cog' // 'cog' for settings
                    }

                    // Return the FontAwesome Icon component
                    return (
                        <FontAwesome
                            name={iconName}
                            size={size}
                            color={color}
                        />
                    )
                },
                tabBarActiveTintColor: 'tomato', // Active tab color
                tabBarInactiveTintColor: 'gray', // Inactive tab color
            })}
        >
            <Tab.Screen
                name="Home"
                component={SCREENS.Home}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Chat"
                component={SCREENS.Chat}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Requests"
                component={SCREENS.Requests}
                options={{ headerShown: false }}
            />
            <Tab.Screen name="Settings" component={SCREENS.Settings} />
        </Tab.Navigator>
    )
}

export default BottomNavigator
