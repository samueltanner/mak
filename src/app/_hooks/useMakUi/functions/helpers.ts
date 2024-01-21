type GenericObject = Record<string, any>
import chroma from "chroma-js"

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
  SimpleRecord,
  MakUiThemeMode,
  ThemeInput,
  ThemeShades,
  ThemeVariantInput,
  MakUiThemeVariantShades,
  InteractionShades,
  MakUiInteraction,
  MakUiThemePalette,
  MakUiVerbosePalettes,
  MakUiThemeVariants,
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
  uiDefaultThemeShades,
  uiDefaultThemePaletteInput,
  uiThemes,
  uiPaletteVariants,
  uiDefaultThemeShadesDiffs,
} from "../constants/defaults/default-constants"
import colors from "tailwindcss/colors"
import twConfig from "../../../../../tailwind.config"

type DefaultColors = typeof colors
type TailwindCustomColors = Record<string, Record<string, string>>

export const isEmptyObject = (obj: GenericObject) =>
  isObject(obj) && Object.keys(obj).length === 0

export const isNestedObject = (obj: GenericObject) =>
  isObject(obj) && Object.values(obj).some(isObject)

export const isObject = (v: any): v is GenericObject =>
  v !== null && typeof v === "object" && !Array.isArray(v)

export const deepMerge = (...objects: (GenericObject | undefined)[]) => {
  const result = {}

  const merge = (target: GenericObject, source: GenericObject) => {
    Object.keys(source).forEach((key) => {
      if (source[key] && typeof source[key] === "object") {
        target[key] = target[key] || {}
        merge(target[key], source[key])
      } else {
        target[key] = source[key]
      }
    })
  }

  for (const obj of objects) {
    if (!isObject(obj)) continue
    merge(result, obj)
  }

  return result
}

export const constructTailwindObject = ({
  hex,
  step = 50,
  includeNearAbsolutes = true,
}: {
  hex: string
  step?: number
  includeNearAbsolutes?: boolean
}): Record<number, string> => {
  const tailwindColors: Record<number, string> = {}

  const lightestColor = chroma.mix("white", hex, 0.1, "rgb")
  const darkestColor = chroma.mix("black", hex, 0.1, "rgb")

  const colorScale = chroma.scale([lightestColor, hex, darkestColor])

  const start = 100 - step || step
  const end = 900
  const totalSteps = (end - start) / step

  for (let i = start; i <= end; i += step) {
    const scalePosition = (i - start) / (totalSteps * step)
    tailwindColors[i] = colorScale(scalePosition).hex()
  }

  if (includeNearAbsolutes) {
    tailwindColors[50] = lightestColor.hex()
    tailwindColors[950] = darkestColor.hex()
  }

  console.log(`Color Family for ${hex}`, { tailwindColors })
  return tailwindColors
}

export const nearestMultiple = (
  num: number,
  multiple: number,
  roundDir: "up" | "down" | "nearest" = "nearest"
) => {
  const delta =
    roundDir === "up" ? multiple : roundDir === "down" ? -multiple : 0
  const remainder = num % multiple
  return remainder === 0 ? num + delta : num + multiple - remainder + delta
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

export const getTheme = (input: string): MakUiThemeMode => {
  if (!input) return "dark"
  input = input.toLowerCase()
  if (input.includes("dark")) return "dark"
  if (input.includes("light")) return "light"
  if (input.includes("custom")) return "custom"
  return "dark"
}

export const getConstructedTheme = (
  providedVariants: MakUiThemeVariants,
  theme: MakUiThemeMode
) => {
  const { primary, secondary, tertiary, custom } = providedVariants

  const primaryColor = twColorHelper({
    colorString: primary,
  })
  const primaryShade = primary
    ? primaryColor.shade
    : uiDefaultThemeShades[theme].primary

  const themeShades = {
    primary: primaryShade!,
    secondary: secondary
      ? twColorHelper({
          colorString: secondary,
        }).shade!
      : primaryShade! + uiDefaultThemeShadesDiffs[theme].secondary,

    tertiary: tertiary
      ? twColorHelper({
          colorString: tertiary,
        }).shade!
      : primaryShade! + uiDefaultThemeShadesDiffs[theme].tertiary,
    custom: custom
      ? twColorHelper({
          colorString: custom,
        }).shade!
      : primaryShade! + uiDefaultThemeShadesDiffs[theme].custom,
  }

  const getNormalizedNumber = (number: number) => {
    if (number >= 950) return 950
    if (number <= 100) return 100
    return nearestMultiple(number, 100, theme === "dark" ? "down" : "up")
  }

  const normalizedThemeShades = {
    primary: getNormalizedNumber(themeShades.primary),
    secondary: getNormalizedNumber(themeShades.secondary),
    tertiary: getNormalizedNumber(themeShades.tertiary),
    custom: getNormalizedNumber(themeShades.custom),
  }

  const { colorString, rootString } = twColorHelper({
    colorString: primaryColor.color,
    shade: normalizedThemeShades.primary,
  })

  const { colorString: secondaryColorString, rootString: secondaryRootString } =
    twColorHelper({
      colorString: providedVariants?.secondary || primaryColor.color,
      shade: normalizedThemeShades.secondary,
    })

  const { colorString: tertiaryColorString, rootString: tertiaryRootString } =
    twColorHelper({
      colorString: providedVariants?.tertiary || primaryColor.color,
      shade: normalizedThemeShades.tertiary,
    })

  const { colorString: customColorString, rootString: customRootString } =
    twColorHelper({
      colorString: providedVariants?.custom || primaryColor.color,
      shade: normalizedThemeShades.custom,
    })

  const themeResponse = {
    primary: colorString,
    primaryRoot: rootString,
    secondary: secondaryColorString,
    secondaryRoot: secondaryRootString,
    tertiary: tertiaryColorString,
    tertiaryRoot: tertiaryRootString,
    custom: customColorString,
    customRoot: customRootString,
  }

  return themeResponse
}

export const getThemeShades = ({
  altBaseShade,
  altDiffs,
  defaultTheme = "dark",
}: {
  altBaseShade?: number
  altDiffs?: ThemeShades
  defaultTheme?: MakUiThemeMode
}) => {
  const shadesObj =
    (altDiffs as ThemeShades) || (uiDefaultThemeShades as ThemeShades)
  const targetThemeKey = defaultTheme || "dark"

  const originalDefaultBaseShade = shadesObj?.[targetThemeKey]?.primary
  const baseDefaultShade = altBaseShade || originalDefaultBaseShade
  const secondaryShade = shadesObj?.[targetThemeKey]?.secondary
  const tertiaryShade = shadesObj?.[targetThemeKey]?.tertiary
  const customShade = shadesObj?.[targetThemeKey]?.custom
  const shadeDiffs: { [key: string]: number } = {
    primary: 0,
    secondary: secondaryShade - originalDefaultBaseShade,
    tertiary: tertiaryShade - originalDefaultBaseShade,
    custom: customShade - originalDefaultBaseShade,
  }

  const variants = shadesObj?.[targetThemeKey]

  const primaryShade =
    variants?.primary || uiDefaultThemeShades?.dark?.primary || 500

  let themeShadesResponseObj: MakUiThemeVariantShades = {
    ...shadesObj[targetThemeKey],
  }
  for (const variant of Object.keys(themeShadesResponseObj)) {
    if (variant === "primary") continue
    const adjustedShade = primaryShade + shadeDiffs[variant]
    themeShadesResponseObj[variant as keyof MakUiThemeVariantShades] =
      adjustedShade
  }

  return themeShadesResponseObj
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
      focus: Math.max(50, Math.min(clickDiff, 950)),
      focusRoot: Math.max(50, Math.min(clickDiff, 950)),
    }
    shadesResponseObj[state as MakUiState] = altStateShadesObject
  }
  return shadesResponseObj
}

export const getConstructedClassNames = ({
  interactions,
  color,
  state = "default",
  theme = "light",
}: {
  interactions?: MakUiVariants | MakUiStates
  state?: MakUiState | "all"
  color?: string
  type?: "default" | "theme"
  theme?: MakUiThemeMode | "all"
}) => {
  const states = state === "all" ? uiStates : [state]
  const themes = theme === "all" ? uiThemes : [theme]
  let relativeClassNamesResponse: MakUiVariants = {
    default: {} as MakUiStates,
    active: {} as MakUiStates,
    selected: {} as MakUiStates,
    invalid: {} as MakUiStates,
    disabled: {} as MakUiStates,
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

  for (const theme of themes) {
    for (const state of states) {
      const providedState = relativeClassNamesResponse?.default
      const providedStatesObj = {
        base: providedState?.base
          ? twColorHelper({
              colorString:
                providedState?.base || globalDefaultColor.colorString,
            })
          : globalDefaultColor,
        hover: providedState?.hover
          ? twColorHelper({
              colorString:
                providedState?.hover || globalDefaultColor.colorString,
            })
          : globalDefaultColor,
        focus: providedState?.focus
          ? twColorHelper({
              colorString:
                providedState?.focus || globalDefaultColor.colorString,
            })
          : globalDefaultColor,
        click: providedState?.click
          ? twColorHelper({
              colorString:
                providedState?.click || globalDefaultColor.colorString,
            })
          : globalDefaultColor,
      }

      for (const interaction of uiInteractions) {
        if (typeof relativeClassNamesResponse[state] !== "string") {
          if (
            !Object.keys(relativeClassNamesResponse[state]).includes(
              interaction
            )
          ) {
            const updatedColorString = twColorHelper({
              colorString: providedStatesObj[interaction].colorString,
              shade: getShades({
                altBaseShade: globalDefaultColor.shade,
              })[state][interaction],
              opacity: 100,
            })
            if (typeof relativeClassNamesResponse[state] === "string") {
              console.log(relativeClassNamesResponse[state])
            }
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
    }
  }

  return relativeClassNamesResponse
}

export const handleThemes = (colorString: string) => {
  let responseObject: { [key: string]: string | undefined } = {
    light: undefined,
    dark: undefined,
    custom: undefined,
  }
  if (!colorString) return responseObject
  if (!colorString.includes("dark") && !colorString.includes("custom")) {
    responseObject.light = colorString
    responseObject.dark = colorString
    responseObject.custom = colorString
    return responseObject
  }
  const classNamesArray = colorString.split(" ")
  classNamesArray.forEach((className) => {
    if (className.includes("dark")) {
      const updatedClassName = className.replace("dark:", "")
      responseObject = {
        ...responseObject,
        dark: updatedClassName,
      }
    } else if (className.includes("custom")) {
      const updatedClassName = className.replace("custom:", "")
      responseObject = {
        ...responseObject,
        custom: updatedClassName,
      }
    } else {
      responseObject = {
        ...responseObject,
        light: className,
      }
    }
  })

  if (!responseObject.dark) responseObject.dark = responseObject.light
  if (!responseObject.custom) responseObject.custom = responseObject.light
  return responseObject
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
  if (!colorString) colorString = `${uiDefaultColorPaletteInput?.primary}`

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
    // console.log({ colorString })
    if (isObject(colorString)) {
      colorString =
        Object.values(colorString)[0] || uiDefaultColorPaletteInput?.primary
    } else if (!colorString) {
      colorString = `${uiDefaultColorPaletteInput?.primary}`
    }
    const colorArr = colorString!.split("-")

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
    variableShade = Number(variableShade)
    const opacityObj = getOpacity({
      opacityValue: variableOpacity,
      override: opacity,
    })

    if (variableShade > 50 && variableShade < 950) {
      variableShade = nearestMultiple(variableShade, 100)
    }

    const hex = getTwHex({
      color,
      shade: variableShade,
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

export const getTwHex = ({
  colorString,
  color,
  shade,
  absolute,
}: {
  colorString?: string
  shade?: number | string
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
    if (shade <= 50) return 50
    if (shade >= 950) return 950
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

  if (shade && typeof shade === "string") shade = Number(shade)

  if (!colorString && color && shade) {
    const parsedShade = getParsedShade(shade as number)
    const defaultColorGroup = getDefaultColorGroup(color as keyof DefaultColors)
    const hex = getHex(defaultColorGroup, parsedShade, color, shade as number)
    return hex
  }

  if (colorString) {
    const { color, shade, absolute } = twColorHelper({ colorString })

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
  if (typeof window === "undefined") return
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
  const detectedTheme = systemTheme.matches ? "dark" : "light"
  return detectedTheme
}

export const getColorContrast = (colorA: string, colorB: string) => {
  if (!colorA.includes("#")) {
    colorA = getTwHex({
      colorString: colorA,
    })
  }
  if (!colorB.includes("#")) {
    colorB = getTwHex({
      colorString: colorB,
    })
  }
  return chroma.contrast(colorA, colorB)
}

export const ensureNestedObject = <T>({
  parent,
  keys,
  value,
}: {
  parent: T
  keys?: (keyof T | string | undefined)[]
  value?: any
}) => {
  keys = keys ? keys.filter((k) => k) : []
  let current: any = parent

  if (!keys || keys.length === 0) return current

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]

    if (i === keys.length - 1 && value !== undefined) {
      current[key] = value
    } else {
      current[key] = current[key] || {}
    }
    current = current[key]
  }

  return current
}

export const setLocalStorage = (key: string, value: any) => {
  if (typeof window === "undefined") return
  if (typeof value === "object") {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

export const getLocalStorage = (key: string): string | null | undefined => {
  if (typeof window === "undefined") return
  return window.localStorage.getItem(key)
}

export const removeLocalStorage = (key: string) => {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(key)
}

export const separateObjectByKey = <T extends { [key: string]: any }>({
  obj,
  keys,
  fallbackKey = "default",
}: {
  obj: T
  keys: string[]
  fallbackKey?: string
}) => {
  const responseObj = {} as { [key: string]: any }
  const defaultObj = { ...obj }

  Object.entries(obj).forEach(([k, v]) => {
    for (const key of keys) {
      if (k.includes(key)) {
        if (!responseObj[key.toLowerCase()]) {
          responseObj[key.toLowerCase()] = {}
        }
        responseObj[key.toLowerCase()][k] = v
        delete defaultObj[k]
      }
    }
  })

  responseObj[fallbackKey.toLocaleLowerCase()] = defaultObj

  return responseObj
}

export const splitKeyAtChar = (obj: GenericObject, char: string) => {
  if (!isObject(obj)) return obj
  if (!char) return obj
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key.split(char)[0]]: value,
    }
  }, {})
}

export const splitStringAtCapital = (string: string) => {
  return string.split(/(?=[A-Z])/)
}

const getNestedClassNameObjects = (key: string, value: object) => {
  const classNamesArray = [] as {
    variant: string
    theme: string | undefined
    paletteVariant: string
    interaction: string | undefined
    state: string
    className: string
  }[]

  let [variant, paletteVariant = "color"] = splitStringAtCapital(key)
  paletteVariant = paletteVariant.toLowerCase()
  const state = Object.keys(value)[0]
  let interactions = Object.values(value)[0]

  if (typeof interactions === "string") {
    interactions = {
      base: interactions,
    }
  }

  Object.entries(interactions).forEach(([interaction, classNames]) => {
    ;(classNames as string).split(" ").forEach((className) => {
      const hasTheme = className.includes(":")
      let theme
      if (hasTheme) {
        ;[theme, className] = className.split(":")
      } else {
        theme = "light"
      }

      classNamesArray.push({
        variant,
        theme,
        paletteVariant,
        interaction,
        state,
        className,
      })
    })
  })
  return classNamesArray
}

const getClassNameAsObject = (key: string, value: string) => {
  let variant
  let theme
  let paletteVariant
  let interaction
  let state
  let className

  const splitString = value.split(":")
  const lightMode =
    splitString[0] === "dark" || splitString[0] === "custom" ? false : true
  theme = lightMode ? "light" : splitString[0]
  paletteVariant =
    uiPaletteVariants.find((v) => {
      if (key.toLowerCase().includes(v)) {
        return v
      }
    }) || "color"

  className = splitString[splitString.length - 1]
  state =
    splitString.find((el) => uiStates.includes(el as MakUiState)) || "default"
  variant =
    uiVariants.find((v) => {
      if (key.toLowerCase().includes(v)) {
        return v
      }
    }) || "primary"

  interaction =
    splitString.find((el) => uiInteractions.includes(el as MakUiInteraction)) ||
    "base"

  return {
    variant,
    theme,
    paletteVariant,
    interaction,
    state,
    className,
    colorString: value,
  }
}

export const extractInitialPalette = ({
  palette,
}: {
  palette: MakUiPaletteInput
}) => {
  let themePalette = {
    light: {},
    dark: {},
    custom: {},
  } as MakUiThemePalette
  let paletteObject = {} as MakUiPaletteInput
  for (const [key, value] of Object.entries(palette)) {
    if (key === "theme") {
      const themes = Object.entries(value)
      themes.forEach(([theme, classNames]) => {
        if (isObject(classNames)) {
          themePalette = deepMerge(themePalette, {
            [theme]: classNames,
          }) as MakUiThemePalette
        } else {
          themePalette = deepMerge(themePalette, {
            [theme]: {
              primary: classNames,
            },
          }) as MakUiThemePalette
        }
      })

      continue
    }
    if (isObject(value)) {
      const classNamesArray = getNestedClassNameObjects(key, value)
      for (const obj of classNamesArray) {
        const {
          variant,
          theme,
          paletteVariant,
          interaction,
          state,
          className,
        } = obj
        const nestedObj = {}
        ensureNestedObject({
          parent: nestedObj,
          keys: [theme, paletteVariant, variant, state, interaction],
          value: className,
        })

        paletteObject = deepMerge(nestedObj, paletteObject)
      }
    } else {
      for (const classNameString of value.split(" ")) {
        const cnObj = getClassNameAsObject(key, classNameString)
        const {
          variant,
          theme,
          paletteVariant,
          interaction,
          state,
          className,
        } = cnObj

        const obj = {}
        ensureNestedObject({
          parent: obj,
          keys: [theme, paletteVariant, variant, state, interaction],
          value: className,
        })
        paletteObject = deepMerge(paletteObject, obj)
      }
    }
  }
  if (!isEmptyObject(themePalette.light)) {
    ensureNestedObject({
      parent: paletteObject,
      keys: ["light", "theme"],
      value: themePalette.light,
    })
  }
  if (!isEmptyObject(themePalette.dark)) {
    ensureNestedObject({
      parent: paletteObject,
      keys: ["dark", "theme"],
      value: themePalette.dark,
    })
  }
  if (!isEmptyObject(themePalette.custom)) {
    ensureNestedObject({
      parent: paletteObject,
      keys: ["custom", "theme"],
      value: themePalette.custom,
    })
  }

  return paletteObject as MakUiVerbosePalettes
}
