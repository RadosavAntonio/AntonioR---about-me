import { isString } from 'lodash'
import { Dimensions, Platform } from 'react-native'

export const isIos = Platform.OS === 'ios'

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen')
const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export const getWindowWidth = (): number => windowWidth
export const getWindowHeight = (): number => windowHeight

const screenAdaptiveWidth = windowWidth
const screenAdaptiveHeight = windowHeight

const baseWidth = 393
const baseHeight = 852

const widthScaleFactor = screenWidth / baseWidth
const heightScaleFactor = screenHeight / baseHeight
const scaleFactor = Math.min(widthScaleFactor, heightScaleFactor)

export const getSize = (size: number | string): number => {
  if (isString(size)) {
    const parsedSize = parseFloat(size)
    return isNaN(parsedSize) ? 0 : Math.round(parsedSize * scaleFactor)
  }

  return Math.round(size * scaleFactor)
}

export const getScaledSize = (size: number): number => {
  return Math.round(size * scaleFactor)
}

export const getScaledWidth = (size: number): number => {
  return Math.round(size * widthScaleFactor)
}

export const getScaledHeight = (size: number): number => {
  return Math.round(size * heightScaleFactor)
}

export const getWidthByRatio = (ratio: number): number =>
  getWindowWidth() * ratio
export const getHeightByRatio = (ratio: number): number =>
  getWindowHeight() * ratio

export const getAdjustedWidth = (
  width: number | string,
  customDesignWidth = baseWidth,
): number | string => {
  if (typeof width === 'string') {
    return width
  }
  return width * (screenAdaptiveWidth / customDesignWidth)
}

export const getAdjustedHeight = (
  height: number | string,
  customDesignHeight = baseHeight,
): number | string => {
  if (typeof height === 'string') {
    return height
  }
  return height * (screenAdaptiveHeight / customDesignHeight)
}
