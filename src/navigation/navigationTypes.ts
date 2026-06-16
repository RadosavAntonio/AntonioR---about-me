export enum Screens {
  //Login
  LOGIN = 'Login',

  //Home
  HOME_SCREEN = 'HomeScreen',

  //Profile
  PROFILE_SCREEN = 'ProfileScreen',

  //Example
  EXAMPLE_SCREEN = 'ExampleScreen',
}

export type RootStackParams = {
  [Screens.LOGIN]: undefined
  Tabs: undefined
}

export type AppNavigationParams = {
  [Screens.HOME_SCREEN]: undefined
  [Screens.PROFILE_SCREEN]: undefined
  [Screens.EXAMPLE_SCREEN]: undefined
}

export enum TabRoute {
  EXAMPLE = 'Example',
  HOME = 'Home',
  PROFILE = 'Profile',
}

export type TabList = {
  [TabRoute.EXAMPLE]: undefined
  [TabRoute.HOME]: undefined
  [TabRoute.PROFILE]: undefined
}
