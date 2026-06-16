// Type shims for Module Federation remote imports (resolved at runtime by Re.Pack).
declare module 'home/HomeScreen' {
  import type { ComponentType } from 'react'
  const Component: ComponentType
  export default Component
}

declare module 'profile/ProfileScreen' {
  import type { ComponentType } from 'react'
  const Component: ComponentType
  export default Component
}

declare module 'example/ExampleScreen' {
  import type { ComponentType } from 'react'
  const Component: ComponentType
  export default Component
}
