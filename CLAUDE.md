# CLAUDE.md — AntonioR About Me App

This file provides AI assistants with context about the codebase, conventions, and workflows for the `AntonioR` React Native project.

## Project Overview

**AntonioR** is a personal "about me" React Native application targeting iOS and Android. It showcases UI components, OTA update capabilities via Stallion, and Maestro-based E2E testing.

- **App name**: AntonioR
- **Bundle ID**: `com.antonioR.aboutMe`
- **React Native version**: 0.83.1
- **React version**: 19.2.0
- **Package manager**: Yarn

## Repository Structure

```
AntonioR---about-me/
├── App.tsx                    # Root component — wrapped with withStallion HOC
├── index.js                   # App entry point, registers component
├── ReactotronConfig.js        # Reactotron debug setup (dev-only, loaded in index.js)
├── app.json                   # App name config
├── src/
│   ├── components/
│   │   └── 3dButton.tsx       # Reusable 3D-style pressable button
│   └── app/
│       └── appBottomSheet.tsx # Bottom sheet (TrueSheet) with forwardRef handle
├── __tests__/
│   └── App.test.tsx           # Smoke test — renders App without crashing
├── maestro/
│   ├── appOpen/
│   │   ├── example.android.yaml
│   │   └── example.ios.yaml
│   └── homeScreen/
│       └── example.ios.yaml
├── ios/                       # Native iOS project (Xcode / CocoaPods)
├── android/                   # Native Android project (Gradle)
├── .github/
│   └── workflows/
│       └── maestro.yml        # CI: Maestro E2E tests on macOS
├── package.json
├── tsconfig.json
├── babel.config.js
├── metro.config.js
├── jest.config.js
├── .eslintrc.js
└── .prettierrc.js
```

## Tech Stack & Key Libraries

| Library | Purpose |
|---|---|
| `react-native` 0.83.1 | Core framework |
| `react-native-stallion` | OTA (Over-The-Air) JS bundle updates |
| `@lodev09/react-native-true-sheet` | Native bottom sheet component |
| `react-native-safe-area-context` | Safe area insets |
| `react-native-config` | Environment variable access (`APP_CONFIG`) |
| `reactotron-react-native` + `reactotron-redux` | Dev-only network/state debugging |
| `@react-native-async-storage/async-storage` | Persistent local storage |
| `redux` | State management (wired through Reactotron in dev) |

## Development Commands

### Running the app
```bash
yarn android          # Run on Android device/emulator
yarn ios              # Run on iOS simulator
yarn start            # Start Metro bundler only
```

### Code quality
```bash
yarn lint             # ESLint check
yarn test             # Jest unit tests
```

### iOS / CocoaPods
```bash
yarn pod              # bundle install + pod install
yarn podCleani        # Remove Pods & Podfile.lock, then reinstall
yarn podUpdate        # pod install --repo-update
yarn podReset         # pod deintegrate → pod setup → pod install
```

### Android
```bash
yarn gradleClean      # ./gradlew clean -x lint
yarn gradleSync       # ./gradlew build -x lint
yarn aBuild           # bundleRelease (production AAB)
yarn adb-r            # adb reverse for Metro on physical device
```

### Cleaning
```bash
yarn clean            # react-native clean
yarn cleani           # Full iOS clean: node_modules, Pods, caches, reinstall
yarn cleana           # Full Android clean: node_modules, gradle, yarn, reinstall
yarn node:clean       # Remove node_modules and reinstall
yarn kn               # killall node
```

### Maestro E2E testing
```bash
yarn maestro:install              # Install Maestro via Homebrew
yarn maestro:doctor               # Check Maestro version/health
yarn maestro:test:all             # Run all flows
yarn maestro:test:android         # Android flows only
yarn maestro:test:ios             # iOS flows only (appOpen + homeScreen)
```

## Code Conventions

### TypeScript
- **Strict mode** is enabled (`"strict": true` in `tsconfig.json`)
- Target: `esnext`, module resolution: `bundler`
- All new files should use `.tsx` for React components and `.ts` for pure logic

### Prettier (enforced, no overrides)
- **No semicolons** (`semi: false`)
- **Single quotes** (`singleQuote: true`)
- Trailing commas everywhere (`trailingComma: 'all'`)
- Arrow function parens omitted when possible (`arrowParens: 'avoid'`)
- Bracket same line: `true` for JSX

### ESLint
- Extends `@react-native`
- `react-native/no-unused-styles`: **error** — always clean up unused `StyleSheet` entries
- Disabled rules: `semi`, `react-native/no-inline-styles`, `@typescript-eslint/no-shadow`, `react-hooks/exhaustive-deps`, `react/no-unstable-nested-components`

### Component patterns
- Use `memo()` for all functional components to avoid unnecessary re-renders
- Use `forwardRef` + `useImperativeHandle` for components that need an imperative handle (see `appBottomSheet.tsx`)
- Export a typed `Handle` interface alongside the component (e.g. `AppBottomSheetHandle`)
- Styles are always defined with `StyleSheet.create()` at the bottom of the file
- Named exports are preferred over default exports for components

### File naming
- Components: camelCase (e.g. `appBottomSheet.tsx`, `3dButton.tsx`)
- No index barrel files observed — import from the file directly

## Architecture Notes

### Entry point flow
```
index.js
  └── App.tsx  (App = withStallion(AppInit))
        ├── SafeAreaProvider
        ├── StatusBar
        ├── AppInit (main UI)
        │     ├── useStallionUpdate() — monitors OTA updates
        │     ├── useStallionModal()  — controls Stallion dev modal
        │     └── bottomSheetRef → AppBottomSheet
        └── AppBottomSheet (TrueSheet)
```

### OTA Updates (Stallion)
- The root `App` is wrapped with `withStallion()` HOC
- `useStallionUpdate()` returns `{ isRestartRequired, newReleaseBundle }` — alert is shown **only in production** (`!__DEV__`)
- The "Select bucket" button calls `showModal()` then `sync()` — used during development to switch JS bundles

### Reactotron (dev only)
- Loaded conditionally in `index.js` via `if (__DEV__) { require('./ReactotronConfig') }`
- Reads `APP_CONFIG` from `react-native-config` to label the connection
- Integrates Redux and React Native plugins; networking ignores `/symbolicate` URLs

### Bottom Sheet
- `AppBottomSheet` uses `@lodev09/react-native-true-sheet` with `detents={['auto', 1]}`
- Controlled via `ref.present()` / `ref.dismiss()` from the parent

## Testing

### Unit tests (Jest)
- Config: `jest.config.js` with preset `react-native`
- Tests live in `__tests__/`
- Current coverage: smoke test that renders `App` without throwing

### E2E tests (Maestro)
- Flows live in `maestro/` organized by screen/feature
- Android flows use `launchApp` explicitly; iOS flows rely on the app already being open
- CI runs on `macos-latest` via `.github/workflows/maestro.yml`
- Actual flow execution is **opt-in** in CI (requires `run_flows: 'true'` workflow dispatch input)

## CI/CD

### GitHub Actions — `maestro.yml`
- Triggers: `push` to `main`, all `pull_request`s, manual `workflow_dispatch`
- Installs Maestro via Homebrew, runs `maestro doctor`
- Maestro flows run only when manually triggered with `run_flows: true`

## Environment Variables

Managed by `react-native-config`. The known variable is:

| Variable | Usage |
|---|---|
| `APP_CONFIG` | Appended to the Reactotron connection name for identification |

Add variables to `.env` files (not committed) and access via `import config from 'react-native-config'`.

## Node / Ruby Requirements

- **Node**: `>=20` (enforced in `package.json` `engines`)
- **Ruby / Bundler**: Managed via `Gemfile` / `Gemfile.lock` — use `bundle exec` for all Pod commands (e.g. `bundle exec pod install`)
