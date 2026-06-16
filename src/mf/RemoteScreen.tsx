import React, { memo, Suspense } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { centered, getSize, SPACE, useTheme } from '@antonior/core'

interface BoundaryProps {
  name: string
  children: React.ReactNode
}

interface BoundaryState {
  hasError: boolean
}

/**
 * Catches failures loading/rendering a Module Federation remote so one bad
 * module degrades to a fallback instead of redboxing the whole host.
 */
class RemoteErrorBoundary extends React.Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { hasError: false }

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error(`[MF] Failed to load remote "${this.props.name}":`, error)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback name={this.props.name} />
    }
    return this.props.children
  }
}

const ErrorFallback = ({ name }: { name: string }) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>
        Couldn't load {name}
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        This module is unavailable right now.
      </Text>
    </View>
  )
}

const Loading = () => (
  <View style={styles.loading}>
    <ActivityIndicator />
  </View>
)

interface RemoteScreenProps {
  name: string
  component: React.ComponentType
}

/**
 * Renders a federated remote screen wrapped in an error boundary + suspense
 * fallback. Use for every `React.lazy(() => import('remote/...'))` screen.
 */
const RemoteScreenInit = ({ name, component: Component }: RemoteScreenProps) => (
  <RemoteErrorBoundary name={name}>
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  </RemoteErrorBoundary>
)

export const RemoteScreen = memo(RemoteScreenInit)

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    ...centered,
  },
  container: {
    flex: 1,
    ...centered,
    padding: SPACE[24],
  },
  title: {
    fontSize: getSize(18),
    fontWeight: 'bold',
    marginBottom: SPACE[8],
  },
  subtitle: {
    fontSize: getSize(14),
  },
})
