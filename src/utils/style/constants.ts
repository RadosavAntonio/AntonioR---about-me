import { getSize } from './globalUtilityFunctionsAndConstants'

export const SPACE = {
  64: getSize(64),
  48: getSize(48),
  32: getSize(32),
  24: getSize(24),
  18: getSize(18),
  16: getSize(16),
  12: getSize(12),
  8: getSize(8),
  4: getSize(4),
}

export const BORDER_RADIUS = {
  circle: 1000,
  40: 40, // iPhone screen radius
  25: 25,
  20: 20,
  13: 13,
  10: 10,
}

export const centered = {
  justifyContent: 'center' as const,
  alignItems: 'center' as const,
}

export const IPHONE_SE2_SCREEN_HEIGHT = 667

export const SCREEN_MARGIN_HORIZONTAL = SPACE[12]

// ----- DATE -----
export const NOW_DATE = new Date()
export const NOW_DATE_NUMBER = NOW_DATE.getTime()
export const NOW_DATE_ISO = NOW_DATE.toISOString()
