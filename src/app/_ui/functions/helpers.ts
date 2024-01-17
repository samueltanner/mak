type GenericObject = Record<string, any>
import chroma from "chroma-js"

import { Theme, ThemeShades, ThemePalette } from "../types/theme-types"
import {
  defaultThemeShades,
  uiDefaultTheme,
  uiDefaultThemePaletteInput,
  uiThemeVariants,
  uiThemes,
} from "../constants/defaults/theme-constants"
import {
  NestedPaletteInput,
  OvaiUiPaletteInput,
  Palette,
  PaletteVariantInput,
  VerbosePaletteInput,
} from "../types/default-types"
import {
  uiDefaultBorderPaletteInput,
  uiDefaultColorPaletteInput,
  uiDefaultTextPaletteInput,
  uiVariants,
  uiVerboseTextVariants,
} from "../constants/defaults/default-constants"
import { ThemeInput } from "../types/ui-types"

export const isObject = (v: any): v is GenericObject =>
  v !== null && typeof v === "object" && !Array.isArray(v)

export const isEmptyObject = (obj: GenericObject) =>
  isObject(obj) && Object.keys(obj).length === 0

export const isNestedObject = (obj: GenericObject) =>
  isObject(obj) && Object.values(obj).some(isObject)

export const constructTailwindObject = ({
  hex,
  step = 50,
}: {
  hex: string
  step?: number
}): Record<number, string> => {
  const tailwindColors: Record<number, string> = {}

  const lightestColor = chroma.mix("white", hex, 0.1, "rgb")
  const darkestColor = chroma.mix("black", hex, 0.1, "rgb")

  const colorScale = chroma.scale([lightestColor, hex, darkestColor])

  const start = 100 - step
  const end = 900 + step
  const totalSteps = (end - start) / step

  for (let i = start; i <= end; i += step) {
    const scalePosition = (i - start) / (totalSteps * step)
    tailwindColors[i] = colorScale(scalePosition).hex()
  }

  return tailwindColors
}

export const nearestMultiple = (num: number, multiple: number) => {
  const remainder = num % multiple
  return remainder === 0 ? num : num + multiple - remainder
}

export const mergeWithFallback = (
  primary: Record<string, any>,
  ...fallbacks: Array<Record<string, any> | undefined>
): Record<string, any> => {
  let result: Record<string, any> = {}

  fallbacks.forEach((fallback) => {
    if (isObject(fallback) && !isEmptyObject(fallback))
      Object.keys(fallback).forEach((key) => {
        if (result[key] === undefined) {
          result[key] = fallback[key]
        }
      })
  })

  return { ...result, ...primary }
}

export const separatePalettes = (paletteInput: OvaiUiPaletteInput) => {
  let colorPalette = uiDefaultColorPaletteInput as PaletteVariantInput
  let textPalette = uiDefaultTextPaletteInput as PaletteVariantInput
  let borderPalette = uiDefaultBorderPaletteInput as PaletteVariantInput
  let themePalette = uiDefaultThemePaletteInput as ThemeInput

  const { color, text, border, theme } = paletteInput as NestedPaletteInput

  colorPalette = mergeWithFallback(color || {}, colorPalette)
  textPalette = mergeWithFallback(text || {}, textPalette)
  borderPalette = mergeWithFallback(border || {}, borderPalette)
  themePalette = mergeWithFallback(theme || {}, themePalette)

  for (const colorVariant of uiVariants) {
    const colorValue =
      (paletteInput as VerbosePaletteInput)[colorVariant] ||
      (paletteInput as VerbosePaletteInput)[`${colorVariant}Color`]
    const borderValue =
      (paletteInput as VerbosePaletteInput)[`${colorVariant}Border`] ||
      (paletteInput as VerbosePaletteInput)[colorVariant]
    const textValue = (paletteInput as VerbosePaletteInput)[
      `${colorVariant}Text`
    ]

    if (!color && colorValue) {
      colorPalette[colorVariant] = colorValue
    }
    if (!border && borderValue) {
      borderPalette[colorVariant] = borderValue
    }
    if (!text && textValue) {
      textPalette[colorVariant] = textValue
    }
  }

  for (const theme of uiVerboseTextVariants) {
    const themeValue = (paletteInput as VerbosePaletteInput)[theme]
    if (!theme && themeValue) {
      themePalette[theme] = themeValue
    }
  }

  console.log({ colorPalette, textPalette, borderPalette, themePalette })
  return {
    colorPalette,
    textPalette,
    borderPalette,
    themePalette,
  }
}

export const getTheme = (input: string): Theme => {
  if (!input) return "dark"
  input = input.toLowerCase()
  if (input.includes("dark")) return "dark"
  if (input.includes("light")) return "light"
  if (input.includes("custom")) return "custom"
  return "dark"
}

export const getThemeShades = ({
  altBaseShade,
  altDiffs,
  defaultTheme = "dark",
}: {
  altBaseShade?: number
  altDiffs?: ThemeShades
  defaultTheme?: Theme
}) => {
  const shadesObj =
    (altDiffs as ThemeShades) || (defaultThemeShades as ThemeShades)
  const targetThemeKey =
    defaultTheme === "dark"
      ? "darkTheme"
      : defaultTheme === "light"
      ? "lightTheme"
      : "customTheme"

  const originalDefaultBaseShade = shadesObj?.[targetThemeKey]?.primary
  const baseDefaultShade = altBaseShade || originalDefaultBaseShade
  const globalDiff =
    baseDefaultShade === originalDefaultBaseShade
      ? 0
      : baseDefaultShade - originalDefaultBaseShade

  const variants = shadesObj?.[targetThemeKey]

  const primaryShade =
    variants?.primary || defaultThemeShades?.darkTheme?.primary || 500
  const baseDiff = primaryShade + globalDiff
  const secondaryDiff = variants?.secondary || 0 + globalDiff
  const tertiaryDiff = variants?.tertiary || 0 + globalDiff
  const customDiff = variants?.custom || 0 + globalDiff

  const shadesResponseObj = {
    primary: Math.max(50, Math.min(baseDiff, 950)),
    secondary: Math.max(50, Math.min(secondaryDiff, 950)),
    tertiary: Math.max(50, Math.min(tertiaryDiff, 950)),
    custom: Math.max(50, Math.min(customDiff, 950)),
  }

  return shadesResponseObj
}
