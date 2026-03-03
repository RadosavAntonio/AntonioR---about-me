export enum Screens {
  //Login
  LOGIN = 'Login',

  //Home
  HOME_SCREEN = 'HomeScreen',

  //Profile
  PROFILE_SCREEN = 'ProfileScreen',

  //Chat
  CHAT_LIST = 'ChatList',
  CHAT = 'Chat',
}

export type RootStackParams = {
  [Screens.LOGIN]: undefined
  Tabs: undefined
  [Screens.CHAT_LIST]: undefined
  [Screens.CHAT]: { id: string }
}

export type AppNavigationParams = {
  [Screens.HOME_SCREEN]: undefined
  [Screens.PROFILE_SCREEN]: undefined
}

export enum TabRoute {
  HOME = 'Home',
  PROFILE = 'Profile',
}

export type TabList = {
  [TabRoute.HOME]: undefined
  [TabRoute.PROFILE]: undefined
}
