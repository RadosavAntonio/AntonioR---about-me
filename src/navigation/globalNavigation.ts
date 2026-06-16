import { createNavigationContainerRef } from '@react-navigation/native'
import { RootStackParams, Screens, TabRoute } from './navigationTypes'

export const navigationRef = createNavigationContainerRef<RootStackParams>()

export const globalNavigation = () => {
  const navigate = <T extends keyof RootStackParams>(
    ...args: RootStackParams[T] extends undefined
      ? [screen: T]
      : [screen: T, params: RootStackParams[T]]
  ) => {
    if (navigationRef.isReady()) {
      navigationRef.navigate(...(args as never))
    }
  }

  const navigateToTab = (tab: TabRoute) => {
    if (navigationRef.isReady()) {
      navigationRef.navigate('Tabs', { screen: tab } as never)
    }
  }

  return {
    goToLogin: () => navigate(Screens.LOGIN),
    goToTabs: () => navigate('Tabs'),
    goToHome: () => navigateToTab(TabRoute.HOME),
    goToProfile: () => navigateToTab(TabRoute.PROFILE),
    goToExample: () => navigateToTab(TabRoute.EXAMPLE),
    goToChatList: () => navigate(Screens.CHAT_LIST),
    goToChat: (id: string) => navigate(Screens.CHAT, { id }),
  }
}
