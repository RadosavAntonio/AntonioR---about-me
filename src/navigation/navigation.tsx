import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { memo } from 'react'

import { useTheme } from '@antonior/core'
import { Login } from './screens/login/login'
import { RemoteScreen } from '../mf/RemoteScreen'

// Tab screens are Module Federation remotes, loaded at runtime from their own bundles.
const HomeScreen = React.lazy(() => import('home/HomeScreen'))
const ProfileScreen = React.lazy(() => import('profile/ProfileScreen'))
const ExampleScreen = React.lazy(() => import('example/ExampleScreen'))

const RootStack = createNativeStackNavigator()
const HomeStack = createNativeStackNavigator()
const ProfileStack = createNativeStackNavigator()
const ExampleStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const HomeStackScreen = memo(() => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="HomeScreen">
      {() => <RemoteScreen name="Home" component={HomeScreen} />}
    </HomeStack.Screen>
  </HomeStack.Navigator>
))

const ExampleStackScreen = memo(() => (
  <ExampleStack.Navigator screenOptions={{ headerShown: false }}>
    <ExampleStack.Screen name="ExampleScreen">
      {() => <RemoteScreen name="Example" component={ExampleScreen} />}
    </ExampleStack.Screen>
  </ExampleStack.Navigator>
))

const ProfileStackScreen = memo(() => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="ProfileScreen">
      {() => <RemoteScreen name="Profile" component={ProfileScreen} />}
    </ProfileStack.Screen>
  </ProfileStack.Navigator>
))

const TabNavigator = memo(() => {
  const { colors } = useTheme()

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
      }}>
      <Tab.Screen
        name="Example"
        component={ExampleStackScreen}
        options={{
          tabBarLabel: 'Example',
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  )
})

const RootNavigationInit = (): React.ReactElement => {
  return (
    <RootStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Login" component={Login} />
      <RootStack.Screen name="Tabs" component={TabNavigator} />
    </RootStack.Navigator>
  )
}

export const RootNavigation = memo(RootNavigationInit)
