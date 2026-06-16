import { NavigationContainer } from '@react-navigation/native'
import React, { memo } from 'react'
import { navigationRef } from './globalNavigation'
import { RootNavigation } from './navigation'

const MainInit = (): React.ReactElement => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootNavigation />
    </NavigationContainer>
  )
}

export const Main = memo(MainInit)
