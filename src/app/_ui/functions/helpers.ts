type GenericObject = Record<string, any>
import chroma from "chroma-js"
import {
  BorderPalette,
  BorderPaletteVariant,
  ColorPalette,
  ElementStates,
  OvaiUiPalette,
  OvaiUiPaletteInput,
  OvaiUiPaletteVariant,
  ColorPaletteVariant,
  TextPalette,
  TextPaletteVariant,
  ThemePalette,
  ThemeVariant,
} from "../types/ui-types"

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

export const separatePalettes = (palette: OvaiUiPaletteInput) => {
  const colorPalette = {} as ColorPalette
  const textPalette = {} as TextPalette
  const borderPalette = {} as BorderPalette
  const themePalette = {} as ThemePalette

  Object.keys(palette).forEach((key) => {
    const value = palette[key as keyof OvaiUiPaletteInput] as ElementStates
    if (key.includes("Text")) {
      textPalette[key as keyof TextPalette] = value
    } else if (key.includes("Border")) {
      borderPalette[key as keyof BorderPalette] = value
    } else if (key.includes("ThemeVariant")) {
      themePalette[key as keyof ThemePalette] = value
    } else {
      colorPalette[key as keyof ColorPalette] = value
    }
  })
  return {
    colorPalette,
    textPalette,
    borderPalette,
    themePalette,
  }
}

export const getTheme = (input: string) => {
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
  altDiffs?: ThemeSubVariantShadeInput
  defaultTheme?: "dark" | "light" | "custom"
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
