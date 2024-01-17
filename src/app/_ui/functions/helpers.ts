type GenericObject = Record<string, any>
import chroma from "chroma-js"

import {
  MakUiTheme,
  ThemeInput,
  ThemeShades,
  ThemeVariantInput,
} from "../types/theme-types"
import {
  defaultThemeShades,
  uiDefaultThemePaletteInput,
  uiThemes,
} from "../constants/defaults/theme-constants"
import {
  MakUiInteractions,
  NestedPaletteInput,
  MakUiPaletteInput,
  PaletteVariantInput,
  MakUiState,
  StateShades,
  MakUiStates,
  VerbosePaletteInput,
  TWColorHelperResponse,
  MakUiVariants,
  MakUiPalette,
  SimpleRecord,
} from "../types/default-types"
import {
  absoluteRegex,
  uiDefaultBorderPaletteInput,
  uiDefaultColorPaletteInput,
  uiDefaultShades,
  uiDefaultTextPaletteInput,
  uiInteractions,
  uiStates,
  uiVariants,
} from "../constants/defaults/default-constants"
import colors from "tailwindcss/colors"
import twConfig from "../../../../tailwind.config"
import { root } from "postcss"

type DefaultColors = typeof colors
type TailwindCustomColors = Record<string, Record<string, string>>

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

export const separatePalettes = (paletteInput: MakUiPaletteInput) => {
  let colorPalette = uiDefaultColorPaletteInput as PaletteVariantInput
  let textPalette = uiDefaultTextPaletteInput as PaletteVariantInput
  let borderPalette = uiDefaultBorderPaletteInput as PaletteVariantInput
  let themePalette = uiDefaultThemePaletteInput as ThemeInput

  const { color, text, border, theme } = paletteInput as NestedPaletteInput

  colorPalette = { ...color }
  textPalette = { ...text }
  borderPalette = { ...border }
  themePalette = { ...theme }

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

  for (const themeName of uiThemes) {
    const themeValue = (paletteInput as VerbosePaletteInput)[
      `${themeName}Theme`
    ]

    if (!theme && themeValue) {
      themePalette[themeName] = themeValue as ThemeVariantInput
    }
  }

  return {
    colorPalette,
    textPalette,
    borderPalette,
    themePalette,
  }
}

export const getTheme = (input: string): MakUiTheme => {
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
  defaultTheme?: MakUiTheme
}) => {
  const shadesObj =
    (altDiffs as ThemeShades) || (defaultThemeShades as ThemeShades)
  const targetThemeKey = defaultTheme || "dark"

  const originalDefaultBaseShade = shadesObj?.[targetThemeKey]?.primary
  const baseDefaultShade = altBaseShade || originalDefaultBaseShade
  const globalDiff =
    baseDefaultShade === originalDefaultBaseShade
      ? 0
      : baseDefaultShade - originalDefaultBaseShade

  const variants = shadesObj?.[targetThemeKey]

  const primaryShade =
    variants?.primary || defaultThemeShades?.dark?.primary || 500

  const baseDiff = primaryShade + globalDiff
  const secondaryDiff = variants?.secondary
    ? variants?.secondary + baseDiff
    : 0 + globalDiff
  const tertiaryDiff = variants?.tertiary
    ? variants?.tertiary + baseDiff
    : 0 + globalDiff
  const customDiff = variants?.custom
    ? variants?.custom + baseDiff
    : 0 + globalDiff

  const shadesResponseObj = {
    primary: Math.max(50, Math.min(baseDiff, 950)),
    secondary: Math.max(50, Math.min(secondaryDiff, 950)),
    tertiary: Math.max(50, Math.min(tertiaryDiff, 950)),
    custom: Math.max(50, Math.min(customDiff, 950)),
  }

  return shadesResponseObj
}

export const getShades = ({
  altBaseShade,
  altDiffs,
}: {
  altBaseShade?: number
  altDiffs?: StateShades
} = {}) => {
  const shadesObj =
    (altDiffs as StateShades) || (uiDefaultShades as StateShades)
  const originalDefaultBaseShade =
    shadesObj?.default?.base || uiDefaultShades.default!.base!
  const baseDefaultShade = altBaseShade || originalDefaultBaseShade
  const globalDiff =
    baseDefaultShade === originalDefaultBaseShade
      ? 0
      : baseDefaultShade - originalDefaultBaseShade

  let shadesResponseObj = {
    ...shadesObj,
  }
  for (const [state, interactions] of Object.entries(shadesObj)) {
    const stateBaseShade = interactions.base
    const baseDiff = stateBaseShade! + globalDiff
    const hoverDiff = interactions.hover! + globalDiff
    const clickDiff = interactions.click! + globalDiff

    let altStateShadesObject = {
      base: Math.max(50, Math.min(baseDiff, 950)),
      baseRoot: Math.max(50, Math.min(baseDiff, 950)),
      hover: Math.max(50, Math.min(hoverDiff, 950)),
      hoverRoot: Math.max(50, Math.min(hoverDiff, 950)),
      click: Math.max(50, Math.min(clickDiff, 950)),
      clickRoot: Math.max(50, Math.min(clickDiff, 950)),
    }
    shadesResponseObj[state as MakUiState] = altStateShadesObject
  }
  return shadesResponseObj
}

export const getConstructedClassNames = ({
  interactions,
  color,
  state = "default",
}: {
  interactions?: MakUiVariants | MakUiStates
  state?: MakUiState | "all"
  color?: string
  type?: "default" | "theme"
}) => {
  const states = state === "all" ? uiStates : [state]
  let relativeClassNamesResponse: MakUiVariants = {
    default: {} as MakUiStates,
    active: {} as MakUiStates,
    selected: {} as MakUiStates,
    disabled: {} as MakUiStates,
    focused: {} as MakUiStates,
  }

  const variantObjectKey = Object.keys(interactions || {}).find((key) => {
    return uiStates.includes(key as MakUiState)
  }) as MakUiState

  if (variantObjectKey) {
    interactions as MakUiVariants
  } else {
    interactions as MakUiInteractions
  }

  if (variantObjectKey) {
    relativeClassNamesResponse = {
      ...relativeClassNamesResponse,
      ...(interactions as MakUiInteractions),
    }
  } else if (state !== "all") {
    relativeClassNamesResponse = {
      ...relativeClassNamesResponse,
      [state]: {
        ...interactions,
      } as MakUiInteractions,
    }
  }

  const getColorString = () => {
    if (color) return color
    if ((interactions as MakUiStates)?.["base"])
      return (interactions as MakUiStates)?.["base"]

    if (
      !!variantObjectKey &&
      (interactions as MakUiVariants)?.[variantObjectKey]?.["base"]
    ) {
      return (interactions as MakUiVariants)?.[variantObjectKey]?.["base"]
    }
    if (isObject(interactions) && Object.values(interactions)[0]) {
      return Object.values(interactions)[0]
    }
  }

  const colorString = getColorString()

  const globalDefaultColor = twColorHelper({
    colorString: colorString,
  })

  for (const state of states) {
    for (const interaction of uiInteractions) {
      if (
        !Object.keys(relativeClassNamesResponse[state]).includes(interaction)
      ) {
        const updatedColorString = twColorHelper({
          colorString: globalDefaultColor.colorString,
          shade: getShades({
            altBaseShade: globalDefaultColor.shade,
          })[state][interaction],
          opacity: 100,
        })

        relativeClassNamesResponse[state][interaction] =
          updatedColorString.colorString
        relativeClassNamesResponse[state][`${interaction}Root`] =
          updatedColorString.rootString
      } else {
        const updatedColorString = twColorHelper({
          colorString: relativeClassNamesResponse[state][interaction],
        })
        relativeClassNamesResponse[state][interaction] =
          updatedColorString.colorString
        relativeClassNamesResponse[state][`${interaction}Root`] =
          updatedColorString.rootString
      }
    }
  }

  return relativeClassNamesResponse
}

export const getOpacity = ({
  opacityValue,
  override,
}: {
  opacityValue?: string | number | null | undefined
  override?: string | number | null | undefined
}): {
  string: string
  value: number
} => {
  if (override !== undefined) {
    return {
      string: `/${nearestMultiple(Number(override), 5)}`,
      value: Number(override),
    }
  }

  let opacityNum = 100

  if (typeof opacityValue === "string") {
    opacityNum = Number(opacityValue)
  } else if (opacityValue === undefined || opacityValue === null) {
    opacityNum = 100
  } else if (opacityValue === 0) {
    opacityNum = 0
  } else {
    opacityNum = Number(opacityValue) || 100
  }
  const opacityString = `/${nearestMultiple(opacityNum, 5)}`
  return {
    string: opacityString,
    value: opacityNum,
  }
}

export const twColorHelper = ({
  colorString,
  opacity,
  shade,
}: {
  colorString?: string | undefined | null
  opacity?: number | string | undefined | null
  shade?: number | string | undefined | null
}): TWColorHelperResponse => {
  if (!colorString) colorString = `${uiDefaultColorPaletteInput?.primary}-500`

  const isAbsoluteColor =
    absoluteRegex.test(colorString) ||
    colorString === "white" ||
    colorString === "black"
  if (isAbsoluteColor) {
    const [absoluteColor, absoluteOpacity] = colorString.split("/")
    const { string, value } = getOpacity({
      opacityValue: absoluteOpacity,
      override: opacity,
    })

    return {
      absolute: true,
      isTwColor: true,
      color: absoluteColor,
      shade: undefined,
      autoShade: false,
      opacity: value,
      colorString: `${absoluteColor}${string}`,
      rootString: `${absoluteColor}`,
      hex: colorString === "white" ? colors["white"] : colors["black"],
    }
  } else {
    const colorArr = colorString.split("-")

    const lastElement = colorArr[colorArr.length - 1]
    let shadeAndOpacity
    let color
    let variableShade
    let variableOpacity
    let autoShade = false
    if (lastElement.includes("/")) {
      shadeAndOpacity = colorArr.pop()
      const shadeAndOpacityArr = shadeAndOpacity?.split("/")
      color = colorArr.join("-")
      autoShade = !!shadeAndOpacityArr?.[0]
      variableShade = shade || shadeAndOpacityArr?.[0]
      variableOpacity = shadeAndOpacityArr?.[1].replace(/\D/g, "")
    } else {
      const includesShade = Number(lastElement) > 0
      autoShade = !includesShade
      shade = includesShade ? colorArr.pop() : shade || 500
      variableShade = shade
      variableOpacity = 100
      color = colorArr.join("-")
    }

    const opacityObj = getOpacity({
      opacityValue: variableOpacity,
      override: opacity,
    })

    const hex = getTwHex({
      color,
      shade: Number(variableShade),
      absolute: false,
    })

    const isTwColor = !!color && !!variableShade
    return {
      absolute: false,
      isTwColor,
      opacity: opacityObj.value,
      shade: Number(variableShade),
      autoShade,
      color: color || (uiDefaultColorPaletteInput.primary! as string),
      colorString: `${color}-${variableShade}${opacityObj.string}`,
      rootString: `${color}-${variableShade}`,
      hex,
    }
  }
}

export const handleTypeString = (
  providedState: string,
  opacityOverride?: number
) => {
  const hasOpacity = providedState.includes("/")
  const color = hasOpacity ? providedState.split("/")[0] : providedState
  const opacity = hasOpacity
    ? providedState.split("/")[1]
    : opacityOverride || undefined
  return twColorHelper({
    colorString: color,
    opacity,
  })
}

export const getTwHex = ({
  colorString,
  color,
  shade,
  absolute,
}: {
  colorString?: string
  shade?: number
  color?: string
  absolute?: boolean
}): string => {
  const black = colors["black"]
  const white = colors["white"]
  const handleAbsolute = (absoluteColor: string) => {
    return absoluteColor === "white" ? white : black
  }

  const getParsedShade = (shade: number) => {
    if (!shade) return 500
    if (shade < 50) return 50
    if (shade > 950) return 950
    const nearestMultipleOfShade = nearestMultiple(shade, 100)
    return nearestMultipleOfShade
  }

  const getDefaultColorGroup = (color: keyof DefaultColors) => {
    const defaultColorGroup = colors[color as keyof DefaultColors] as
      | Record<string, string>
      | undefined
    return defaultColorGroup
  }

  const getHex = (
    defaultColorGroup: SimpleRecord | undefined,
    parsedShade: number,
    rootColor: string,
    rootShade: number
  ): string => {
    if (defaultColorGroup && typeof defaultColorGroup === "object") {
      const defaultHex = defaultColorGroup[parsedShade]
      if (defaultHex) return defaultHex
      return black
    } else {
      const tailwindCustomColors = twConfig?.theme
        ?.colors as TailwindCustomColors

      const [colorGroup, colorSubGroup] = rootColor.split("-")
      const customColorHex =
        tailwindCustomColors?.[rootColor]?.[rootShade!] ||
        tailwindCustomColors?.[colorGroup]?.[colorSubGroup]?.[rootShade!] ||
        black

      return customColorHex
    }
  }

  if (!colorString && !color) return black

  if (
    absolute ||
    colorString === "white" ||
    (colorString === "black" && typeof colorString === "string")
  ) {
    return handleAbsolute(colorString as string)
  }

  if (!colorString && color && shade) {
    const parsedShade = getParsedShade(shade)
    const defaultColorGroup = getDefaultColorGroup(color as keyof DefaultColors)
    const hex = getHex(defaultColorGroup, parsedShade, color, shade)
    return hex
  }

  if (colorString) {
    const { color, shade, absolute } = handleTypeString(colorString)

    if (absolute) return handleAbsolute(color)

    if (!color || !shade) return black

    const parsedShade = getParsedShade(shade)
    const defaultColorGroup = getDefaultColorGroup(color as keyof DefaultColors)
    const hex = getHex(defaultColorGroup, parsedShade, color, shade)
    return hex
  }

  return black
}

export const detectSystemTheme = () => {
  if (typeof window === "undefined") return "dark"
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
  return systemTheme.matches ? "dark" : "light"
}

export const getColorContrast = (colorA: string, colorB: string) => {
  const colorAContrast = chroma.contrast(colorA, "white")
  const colorBContrast = chroma.contrast(colorB, "white")
  return colorAContrast > colorBContrast ? colorA : colorB
}

export const getActiveThemeTextPalette = (
  theme: MakUiTheme,
  textPalette: MakUiPalette
) => {}
