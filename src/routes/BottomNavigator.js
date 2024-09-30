import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { SCREENS } from '../constants/screens'
import { COLORS } from '../constants/colors'
import { Icons } from '../constants/icons'

const Tab = createBottomTabNavigator()

const BottomNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    backgroundColor: COLORS.primary,
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Home') {
                        return (
                            <Icons.HomeIcon
                                width={24}
                                height={24}
                                color={focused ? COLORS.error : COLORS.tertiary}
                            />
                        )
                    } else if (route.name === 'Requests') {
                        return <Icons.ListIcon width={24} height={24} />
                    } else if (route.name === 'Chat') {
                        return <Icons.ChatIcon width={24} height={24} />
                    } else if (route.name === 'Settings') {
                        return <Icons.SettingsIcon width={24} height={24} />
                    }
                    return null
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={SCREENS.Home}
                options={{
                    headerShown: false,
                    tabBarActiveBackgroundColor: COLORS.accent,
                }}
            />
            <Tab.Screen
                name="Requests"
                component={SCREENS.Requests}
                options={{
                    headerShown: false,
                    tabBarActiveBackgroundColor: COLORS.accent,
                }}
            />
            <Tab.Screen
                name="Chat"
                component={SCREENS.Chat}
                options={{
                    headerShown: false,
                    tabBarActiveBackgroundColor: COLORS.accent,
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SCREENS.Settings}
                options={{
                    tabBarActiveBackgroundColor: COLORS.accent,
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomNavigator
