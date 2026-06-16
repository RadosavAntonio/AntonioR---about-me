import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { memo } from 'react'

import { lightColors } from '../utils/style/colors'
import { Login } from './screens/login/login'
import { Example } from './screens/tabs/example'
import { Home } from './screens/tabs/home'
import { Profile } from './screens/tabs/profile'

const RootStack = createNativeStackNavigator()
const HomeStack = createNativeStackNavigator()
const ProfileStack = createNativeStackNavigator()
const ExampleStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const HomeStackScreen = memo(() => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="HomeScreen" component={Home} />
  </HomeStack.Navigator>
))

const ExampleStackScreen = memo(() => (
  <ExampleStack.Navigator screenOptions={{ headerShown: false }}>
    <ExampleStack.Screen name="ExampleScreen" component={Example} />
  </ExampleStack.Navigator>
))

const ProfileStackScreen = memo(() => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="ProfileScreen" component={Profile} />
  </ProfileStack.Navigator>
))

const TabNavigator = memo(() => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: lightColors.primary,
      tabBarInactiveTintColor: lightColors.textTertiary,
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
))

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
