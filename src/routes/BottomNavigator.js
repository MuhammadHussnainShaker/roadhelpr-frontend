import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { SCREENS } from '../constants/screens'
import { COLORS } from '../constants/colors'
import { Icons } from '../constants/icons'
import { useSelector } from 'react-redux'
import CustomHeader from '../components/CustomHeader'

const Tab = createBottomTabNavigator()

const BottomNavigator = () => {
    const users = useSelector((state) => state.user?.users)

    if (users.length > 0 && users[0].role === 'customer') {
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
                        if (
                            route.name === 'Home' ||
                            route.name === 'ServiceProviderHome'
                        ) {
                            return (
                                <Icons.HomeIcon
                                    width={24}
                                    height={24}
                                    color={
                                        focused ? COLORS.error : COLORS.tertiary
                                    }
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
    } else {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarStyle: {
                        backgroundColor: COLORS.primary,
                        height: 70,
                    },
                    // tabBarActiveTintColor: 'tomato',
                    // tabBarInactiveTintColor: 'gray',
                    // tabBarShowLabel: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        if (
                            route.name === 'Home' ||
                            route.name === 'ServiceProviderHome'
                        ) {
                            return (
                                <Icons.HomeIcon
                                    width={24}
                                    height={24}
                                    color={
                                        focused ? COLORS.error : COLORS.tertiary
                                    }
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
                    name="ServiceProviderHome"
                    component={SCREENS.ServiceProviderHome}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarLabelStyle: { fontSize: 16, color: '#FFFFFF' },
                        tabBarActiveBackgroundColor: COLORS.accent,
                        headerTitle: () => <CustomHeader name="RoadHelpr" />,
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: COLORS.primary,
                            height: 70,
                            elevation: 10,
                            shadowColor: 'black',
                            shadowOpacity: 1,
                            shadowOffset: { width: 0, height: 2 },
                        },
                    }}
                />

                <Tab.Screen
                    name="Requests"
                    component={SCREENS.Requests}
                    options={{
                        tabBarLabel: 'Requests',
                        tabBarLabelStyle: { fontSize: 16, color: '#FFFFFF' },
                        headerShown: false,
                        tabBarActiveBackgroundColor: COLORS.accent,
                    }}
                />
                <Tab.Screen
                    name="Chat"
                    component={SCREENS.Chat}
                    options={{
                        tabBarLabelStyle: { fontSize: 16, color: '#FFFFFF' },
                        headerShown: false,
                        tabBarActiveBackgroundColor: COLORS.accent,
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SCREENS.Settings}
                    options={{
                        tabBarLabelStyle: { fontSize: 16, color: '#FFFFFF' },
                        tabBarActiveBackgroundColor: COLORS.accent,
                    }}
                />
            </Tab.Navigator>
        )
    }
}

export default BottomNavigator
