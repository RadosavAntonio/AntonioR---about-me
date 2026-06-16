import { createRequire } from 'node:module'
import pkg from './package.json' with { type: 'json' }

const require = createRequire(import.meta.url)

function installedVersion(name: string, fallback: string): string {
  try {
    return (require(`${name}/package.json`) as { version: string }).version
  } catch {
    return fallback
  }
}

/**
 * Single source of truth for the Module Federation shared-singleton contract
 * (the "single-version lock" + compat gate). The host passes eager=true; every
 * remote passes eager=false.
 *
 * - `version` is the CONCRETE installed version (required for the eager
 *   loadShareSync path and so the satisfaction check passes).
 * - `requiredVersion` is the package.json range.
 * - `strictVersion: true` makes the host REFUSE a remote whose shared singleton
 *   version is incompatible with the host's — the runtime compat gate.
 */
export function sharedDeps(eager: boolean) {
  const deps = pkg.dependencies as Record<string, string>
  const shared = (name: string) => ({
    singleton: true,
    eager,
    strictVersion: true,
    version: installedVersion(name, deps[name]),
    requiredVersion: deps[name],
  })
  return {
    react: shared('react'),
    'react-native': shared('react-native'),
    '@react-navigation/native': shared('@react-navigation/native'),
    '@react-navigation/native-stack': shared('@react-navigation/native-stack'),
    '@react-navigation/bottom-tabs': shared('@react-navigation/bottom-tabs'),
    'react-native-safe-area-context': shared('react-native-safe-area-context'),
    'react-native-screens': shared('react-native-screens'),
    // Internal shared layer: any version is fine (one workspace source).
    '@antonior/core': {
      singleton: true,
      eager,
      strictVersion: false,
      version: installedVersion('@antonior/core', '1.0.0'),
      requiredVersion: '*',
    },
  }
}
