import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { memo } from 'react'

import { lightColors } from '../utils/style/colors'
import { Chat } from './screens/chat/chat'
import { ChatList } from './screens/chat/chatList'
import { Login } from './screens/login/login'
import { Home } from './screens/tabs/home'
import { Profile } from './screens/tabs/profile'

const RootStack = createNativeStackNavigator()
const HomeStack = createNativeStackNavigator()
const ProfileStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const HomeStackScreen = memo(() => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="HomeScreen" component={Home} />
  </HomeStack.Navigator>
))

const ProfileStackScreen = memo(() => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="ProfileScreen" component={Profile} />
  </ProfileStack.Navigator>
))

const TabNavigator = memo(() => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: lightColors.primary,
      tabBarInactiveTintColor: lightColors.textTertiary,
    }}>
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
      <RootStack.Screen name="ChatList" component={ChatList} />
      <RootStack.Screen name="Chat" component={Chat} />
    </RootStack.Navigator>
  )
}

export const RootNavigation = memo(RootNavigationInit)
