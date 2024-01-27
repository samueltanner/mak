import chroma from "chroma-js"
import {
  DefaultColors,
  GenericObject,
  MakUiDefaultColors,
  MakUiDefaultStateColors,
  MakUiFlexiblePaletteInput,
  MakUiInteractionStateKey,
  MakUiPaletteInput,
  MakUiPaletteKey,
  MakUiSimplePalette,
  MakUiState,
  MakUiStateKey,
  MakUiStateShades,
  MakUiThemeShades,
  MakUiThemeShadesInput,
  MakUiThemeVariantKey,
  MakUiThemeVariantShades,
  MakUiVariantKey,
  MakUiVerbosePalette,
  MakUiVerboseShades,
  MakUiVerboseTheme,
  ParsedClassNameResponse,
  Shade,
  TailwindCustomColors,
  TailwindVariantKey,
} from "../types/ui-types"
import colors from "tailwindcss/colors"
import twConfig from "../../../../../tailwind.config"
import {
  MakUiThemeKey,
  MakUiVerboseThemeVariant,
  TWColorHelperResponse,
} from "../types/ui-types"
import {
  makUiDefaultColors,
  makUiDefaultStateShades,
  makUiDefaultStates,
  makUiDefaultThemeShades,
  makUiPalettes,
  makUiPalettesSet,
  makUiShadesSet,
  makUiStates,
  makUiStatesSet,
  makUiThemeVariantsSet,
  makUiThemesSet,
  makUiVariants,
  makUiVariantsSet,
  tailwindVariants,
  tailwindVariantsSet,
} from "../constants/ui-constants"
import {
  MakUiComponentConfigInput,
  MakUiRootComponentConfigInput,
  ObjectToClassNameObjectProp,
} from "../types/component-types"
import {
  deepMerge,
  ensureNestedObject,
  isEmptyObject,
  isObject,
  mergeWithFallback,
  nearestMultiple,
} from "@/globals/global-helper-functions"

export const constructTailwindObject = ({
  hex,
  step = 100,
  includeNearAbsolutes = true,
  hexPosition = 500,
  includeBlackAndWhite = true,
  blackHex = "#000000",
  whiteHex = "#FFFFFF",
}: {
  hex: string
  step?: number
  includeNearAbsolutes?: boolean
  hexPosition?: number
  includeBlackAndWhite?: boolean
  blackHex?: string
  whiteHex?: string
}): MakUiVerboseShades => {
  if (hex.includes("-") || hex.charAt(0) !== "#") {
    hex = twColorHelper({ colorString: hex }).hex
  }
  if (hex.includes("#white") || hex === "white") {
    hex = "#ffffff"
  }
  if (hex.includes("#black") || hex === "black") {
    hex = "#000000"
  }
  const tailwindColors = {} as MakUiVerboseShades

  // Adjust the start of the second scale to earlier than hexPosition for a smoother transition
  const scale2Start = Math.max(0, hexPosition - step * 8)

  const scale1 = chroma
    .scale([whiteHex, hex])
    .mode("lrgb")
    .domain([0, hexPosition])
  const scale2 = chroma
    .scale([hex, blackHex])
    .mode("lrgb")
    .domain([scale2Start, 960])

  const getColor = (i: number) => {
    return i <= hexPosition ? scale1(i).hex() : scale2(i).hex()
  }

  for (let i = 0; i <= 1000; i += step) {
    tailwindColors[i] = getColor(i)
  }

  if (includeNearAbsolutes) {
    tailwindColors[50] = getColor(50)
    tailwindColors[950] = getColor(950)
  }

  if (includeBlackAndWhite) {
    tailwindColors[0] = whiteHex
    tailwindColors[1000] = blackHex
  }

  return tailwindColors
}

export const getThemeShadesObj = (shades?: MakUiThemeShadesInput) => {
  const lightPrimary = shades?.light?.primary || getNormalizedShadeNumber(50)
  const lightSecondary =
    shades?.light?.secondary || getNormalizedShadeNumber(lightPrimary + 50)
  const lightTertiary =
    shades?.light?.tertiary || getNormalizedShadeNumber(lightSecondary + 100)
  const lightCustom = shades?.light?.custom || getNormalizedShadeNumber(950)

  const darkPrimary = shades?.dark?.primary || getNormalizedShadeNumber(950)
  const darkSecondary =
    shades?.dark?.secondary || getNormalizedShadeNumber(darkPrimary - 50)
  const darkTertiary =
    shades?.dark?.tertiary || getNormalizedShadeNumber(darkSecondary - 100)
  const darkCustom = shades?.dark?.custom || getNormalizedShadeNumber(50)

  const customPrimary = shades?.custom?.primary || getNormalizedShadeNumber(500)
  const customSecondary =
    shades?.custom?.secondary || getNormalizedShadeNumber(customPrimary + 100)
  const customTertiary =
    shades?.custom?.tertiary || getNormalizedShadeNumber(customPrimary + 200)
  const customCustom =
    shades?.custom?.custom || getNormalizedShadeNumber(customPrimary + 300)

  const responseObj = {
    light: {
      primary: getNormalizedShadeNumber(lightPrimary),
      secondary: getNormalizedShadeNumber(lightSecondary),
      tertiary: getNormalizedShadeNumber(lightTertiary),
      custom: getNormalizedShadeNumber(lightCustom),
    },
    dark: {
      primary: getNormalizedShadeNumber(darkPrimary),
      secondary: getNormalizedShadeNumber(darkSecondary),
      tertiary: getNormalizedShadeNumber(darkTertiary),
      custom: getNormalizedShadeNumber(darkCustom),
    },
    custom: {
      primary: getNormalizedShadeNumber(customPrimary),
      secondary: getNormalizedShadeNumber(customSecondary),
      tertiary: getNormalizedShadeNumber(customTertiary),
      custom: getNormalizedShadeNumber(customCustom),
    },
  }
  return responseObj
}

const includesShade = (string: string) => {
  if (!string) return false
  const splitString = string.split("-")
  const shade = splitString[splitString.length - 1]
  return !!parseInt(shade)
}

const getNormalizedShadeNumber = (num: number) => {
  if (num !== 0 && (!num || typeof num !== "number")) return 500
  return num <= 50 ? 50 : num >= 950 ? 950 : Math.round(num / 100) * 100
}

export const getConstructedTheme = ({
  providedVariants,
  theme,
  defaultShades,
}: {
  providedVariants: MakUiVerboseThemeVariant
  theme: MakUiThemeKey
  defaultShades: MakUiThemeShades
}) => {
  const { primary, secondary, tertiary, custom, light, dark } = providedVariants

  const { shade: primaryShade, color: primaryColor } = twColorHelper({
    colorString: primary || makUiDefaultColors.primary,
    shade: includesShade(primary) ? undefined : defaultShades[theme].primary,
    useDefaults: false,
  })
  const { shade: secondaryShade, color: secondaryColor } = twColorHelper({
    colorString: secondary,
    useDefaults: false,
  })
  const { shade: tertiaryShade, color: tertiaryColor } = twColorHelper({
    colorString: tertiary,
    useDefaults: false,
  })
  const { shade: customShade, color: customColor } = twColorHelper({
    colorString: custom,
    useDefaults: false,
  })

  const { shade: lightShade, color: lightColor } = twColorHelper({
    colorString: light || "white",
    useDefaults: false,
  })
  const { shade: darkShade, color: darkColor } = twColorHelper({
    colorString: dark || "black",
    useDefaults: false,
  })

  const defaultShadesObj = makUiDefaultThemeShades[theme]
  const shadeDiffs = Object.entries(defaultShadesObj).reduce(
    (acc, [variant, shade]) => {
      if (variant === "primary") {
        ;(acc as MakUiThemeVariantShades)[variant] = 0
      } else {
        let value = shade - defaultShadesObj["primary"]
        const isNeg = value < 0 ? -1 : 1
        const absValue = Math.abs(value)
        value = Math.round(absValue / 100) * 100 * isNeg
        ;(acc as MakUiThemeVariantShades)[
          variant as keyof MakUiThemeVariantShades
        ] = value
      }
      return acc
    },
    {}
  ) as MakUiThemeVariantShades
  const resolvedPrimaryShade = includesShade(primary)
    ? primaryShade
    : defaultShades[theme].primary
  const resolvedShadesObject = {
    primary: resolvedPrimaryShade,
    secondary: includesShade(secondary)
      ? secondaryShade
      : getNormalizedShadeNumber(resolvedPrimaryShade! + shadeDiffs.secondary),
    tertiary: includesShade(tertiary)
      ? tertiaryShade
      : getNormalizedShadeNumber(resolvedPrimaryShade! + shadeDiffs.tertiary),
    custom: includesShade(custom)
      ? customShade
      : getNormalizedShadeNumber(resolvedPrimaryShade! + shadeDiffs.custom),
    light: includesShade(light)
      ? lightShade
      : getNormalizedShadeNumber(resolvedPrimaryShade! + shadeDiffs.light),
    dark: includesShade(dark)
      ? darkShade
      : getNormalizedShadeNumber(resolvedPrimaryShade! + shadeDiffs.dark),
  }

  const resolvedThemeObject = {
    primary: twColorHelper({
      colorString: primaryColor,
      shade: includesShade(primary)
        ? primaryShade
        : defaultShades[theme].primary,
    }),
    secondary: twColorHelper({
      colorString: secondaryColor || primaryColor,
      shade: resolvedShadesObject.secondary,
    }),
    tertiary: twColorHelper({
      colorString: tertiaryColor || primaryColor,
      shade: resolvedShadesObject.tertiary,
    }),
    custom: twColorHelper({
      colorString: customColor || primaryColor,
      shade: resolvedShadesObject.custom,
    }),
    light: twColorHelper({
      colorString: lightColor,
      shade: resolvedShadesObject.light,
    }),
    dark: twColorHelper({
      colorString: darkColor,
      shade: resolvedShadesObject.dark,
    }),
  }

  const themeResponse = {
    primary: resolvedThemeObject.primary.rootString,
    primaryHex: resolvedThemeObject.primary.hex,
    secondary: resolvedThemeObject.secondary.rootString,
    secondaryHex: resolvedThemeObject.secondary.hex,
    tertiary: resolvedThemeObject.tertiary.rootString,
    tertiaryHex: resolvedThemeObject.tertiary.hex,
    custom: resolvedThemeObject.custom.rootString,
    customHex: resolvedThemeObject.custom.hex,
    light: resolvedThemeObject.light.rootString,
    lightHex: resolvedThemeObject.light.hex,
    dark: resolvedThemeObject.dark.rootString,
    darkHex: resolvedThemeObject.dark.hex,
  }

  return themeResponse
}

export const getConstructedShades = ({
  defaultColor,
  middleHex,
  providedShades,
  steps = 50,
  variant,
  includeBlackAndWhite = true,
  includeNearAbsolutes = true,
  blackHex = "#000000",
  whiteHex = "#FFFFFF",
}: {
  defaultColor?: string
  middleHex?: string
  providedShades?: Record<string, string>
  steps?: number
  variant: MakUiVariantKey
  includeBlackAndWhite?: boolean
  includeNearAbsolutes?: boolean
  blackHex?: string
  whiteHex?: string
}): MakUiVerboseShades => {
  const finalShades = {} as MakUiVerboseShades

  if (!middleHex) {
    let fallbackPosition = Object.keys(providedShades || {})?.[0]
    const fallBackProvidedColor = Object.values(providedShades || {})?.[0]
    const fallBack =
      fallBackProvidedColor || defaultColor || makUiDefaultColors[variant]
    const resolvedFallBackObject = twColorHelper({ colorString: fallBack })

    // finalShades[fallbackPosition] = `${variant}-${fallbackPosition}`
    // finalShades[`${fallbackPosition}Hex`] = resolvedFallBackObject.hex

    const resolvedTailwindColors = constructTailwindObject({
      hex: resolvedFallBackObject.hex,
      step: steps,
      includeBlackAndWhite,
      includeNearAbsolutes,
      blackHex,
      whiteHex,
      hexPosition: Number(fallbackPosition),
    })
    for (const [shade, color] of Object.entries(resolvedTailwindColors)) {
      if (providedShades && providedShades[shade]) {
        const twObj = twColorHelper({ colorString: providedShades[shade] })
        finalShades[`${shade}Hex`] = twObj.hex
        finalShades[shade] = `${variant}-${shade}`
      } else {
        finalShades[`${shade}Hex`] = color
        finalShades[shade] = `${variant}-${shade}`
      }
    }
    return finalShades
  } else {
    const tailwindColors = constructTailwindObject({
      hex: middleHex,
      step: steps,
      includeBlackAndWhite,
      includeNearAbsolutes,
      blackHex,
      whiteHex,
    })
    for (const [shade, color] of Object.entries(tailwindColors)) {
      if (providedShades && providedShades[shade]) {
        const twObj = twColorHelper({ colorString: providedShades[shade] })
        finalShades[shade] = `${variant}-${shade}`
        finalShades[`${shade}Hex`] = twObj.hex
      } else {
        finalShades[`${shade}Hex`] = color
        finalShades[shade] = `${variant}-${shade}`
      }
    }
    return finalShades
  }
}

// export const getConstructedStates = ({
//   providedStates = {} as MakUiState,
//   defaultShades,
//   theme = "light",
// }: {
//   providedStates?: MakUiState
//   defaultShades?: MakUiStateShades
//   theme?: MakUiThemeKey
// }) => {
//   let providedColor = providedStates?.base as string | undefined
//   let providedState = !!providedStates?.base ? "base" : undefined
//   let inferredBaseShade
//   let stateShade
//   const multiplier = theme === "dark" ? -1 : 1
//   if (!providedColor) {
//     for (const state of makUiStates) {
//       providedColor = providedStates?.[state]
//       if (providedColor) {
//         const providedTwObj = twColorHelper({
//           colorString: providedColor,
//         })

//         providedState = state
//         providedColor = providedTwObj.color
//         stateShade = providedTwObj.shade
//         let stateDiff = defaultShades![state] - defaultShades!.base
//         inferredBaseShade = providedTwObj.shade! - stateDiff * multiplier
//         break
//       }
//     }
//   }

//   const twObj = twColorHelper({
//     colorString: providedColor,
//     defaults: makUiDefaultStates,
//     defaultKey: "base",
//     shade: inferredBaseShade
//       ? getNormalizedShadeNumber(inferredBaseShade)
//       : undefined,
//   })

//   const disabledTwObj = twColorHelper({
//     colorString: providedStates.disabled || twObj.rootString,
//     shade: providedStates.disabled
//       ? undefined
//       : getNormalizedShadeNumber(twObj.shade! - 200),
//   })

//   const disabledShade = disabledTwObj.autoShade
//     ? twObj.shade! - 200
//     : disabledTwObj.shade!

//   const disabledColor = twObj.absolute
//     ? disabledTwObj.rootString
//     : `${twObj.color}-${getNormalizedShadeNumber(disabledShade)}`

//   // providedStates.base = twObj.rootString
//   // providedStates.disabled = disabledColor

//   const statesObject = generateDefaultStatesObject({
//     defaultColor: twObj.color,
//     defaultShades,
//     baseShade: twObj.shade,
//     multiplier,
//   })

//   const resolvedProvidedStates = {} as MakUiState
//   for (const [state, color] of Object.entries(providedStates)) {
//     const twObj = twColorHelper({
//       colorString: color,
//       defaults: makUiDefaultStates,
//       defaultKey: state as keyof MakUiStateShades,
//     })
//     resolvedProvidedStates[state as MakUiStateKey] = twObj.rootString
//   }
//   const resolvedStatesObject = mergeWithFallback(
//     resolvedProvidedStates,
//     statesObject
//   )

//   return resolvedStatesObject
// }

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

export const generateDefaultShadesDiffOject = ({
  defaultShades = makUiDefaultStateShades,
}: {
  defaultShades?: MakUiStateShades
}) => {
  let defaultShadesDiffObject = {} as MakUiStateShades
  const baseShade = defaultShades.base
  Object.entries(defaultShades).forEach(([state, shade]) => {
    const shadeDiff = shade - baseShade
    defaultShadesDiffObject[state as MakUiStateKey] = shadeDiff
  })
  return defaultShadesDiffObject
}

export const generateDefaultStatesObject = ({
  defaultShades = makUiDefaultStateShades,
  defaultColor = "zinc",
  baseShade = 500,
  multiplier = 1,
}: {
  defaultShades?: MakUiStateShades
  defaultColor?: string
  baseShade?: number
  multiplier?: number
}) => {
  const shadesDiff = generateDefaultShadesDiffOject({ defaultShades })
  const isAbsoluteColor = defaultColor === "white" || defaultColor === "black"

  let defaultStatesObject = {} as MakUiState
  for (const [state, diff] of Object.entries(shadesDiff)) {
    const shade = baseShade + diff * multiplier
    if (isAbsoluteColor) {
      defaultStatesObject[state as MakUiStateKey] = defaultColor
    } else {
      defaultStatesObject[
        state as MakUiStateKey
      ] = `${defaultColor}-${getNormalizedShadeNumber(shade)}`
    }
  }

  return defaultStatesObject
}

export const twColorHelper = ({
  colorString,
  opacity,
  shade,
  useDefaults = true,
  defaults = makUiDefaultColors,
  defaultKey = "primary",
}: {
  colorString?: string | undefined | null
  opacity?: number | string | undefined | null
  shade?: number | string | undefined | null
  useDefaults?: boolean
  defaults?: MakUiDefaultColors | MakUiDefaultStateColors
  defaultKey?: keyof MakUiDefaultColors | keyof MakUiDefaultStateColors
}): TWColorHelperResponse => {
  if (colorString?.includes("#")) {
    const hex = colorString
    const resolvedColorString = getTwColor(colorString)

    return {
      absolute: true,
      isTwColor: false,
      color: undefined,
      shade: undefined,
      autoShade: false,
      autoColor: false,
      opacity: 100,
      colorString: resolvedColorString || undefined,
      rootString: resolvedColorString || undefined,
      hex: hex,
    }
  }
  let defaultValue
  if (makUiVariants.includes(defaultKey as MakUiVariantKey)) {
    defaults as MakUiDefaultColors
    defaultValue = (defaults as MakUiDefaultColors)[
      defaultKey as keyof MakUiDefaultColors
    ]
  } else {
    defaults as MakUiDefaultStateColors
    defaultValue = (defaults as MakUiDefaultStateColors)[
      defaultKey as keyof MakUiDefaultStateColors
    ]
  }

  let autoShade = true
  if (typeof shade === "string" || typeof shade === "number") {
    autoShade = false
  }
  let autoColor = !!colorString

  if (!colorString && !useDefaults) {
    return {
      absolute: false,
      isTwColor: false,
      color: undefined,
      shade: undefined,
      autoShade: false,
      autoColor,
      opacity: 0,
      colorString: "",
      rootString: "",
      hex: "#000",
    }
  }

  const absoluteRegex =
    /^((white|black)\/\[*0*(?:[0-9][0-9]?|100)%*\]*|(white|black))$/

  const isAbsoluteColor = !colorString
    ? false
    : absoluteRegex.test(colorString) ||
      colorString === "white" ||
      colorString === "black"
  if (isAbsoluteColor && !!colorString) {
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
      autoColor,
      opacity: value,
      colorString: `${absoluteColor}${string}`,
      rootString: `${absoluteColor}`,
      hex: colorString === "white" ? "#FFFFFF" : "#000000",
    }
  } else {
    if (isObject(colorString) && Object.values(colorString)[0]) {
      colorString = Object.values(colorString)[0]
      autoColor = false
    } else if (!colorString) {
      colorString = defaultValue
      autoColor = true
      autoShade = false
    }
    const colorArr = colorString!.split("-")
    autoShade = !parseInt(colorArr[colorArr.length - 1])

    const lastElement = colorArr[colorArr.length - 1]
    let shadeAndOpacity
    let color
    let variableShade
    let variableOpacity

    if (lastElement.includes("/")) {
      shadeAndOpacity = colorArr.pop()
      const shadeAndOpacityArr = shadeAndOpacity?.split("/")
      color = colorArr.join("-")
      variableShade = shade || shadeAndOpacityArr?.[0]
      variableOpacity = shadeAndOpacityArr?.[1].replace(/\D/g, "")
    } else {
      const includesShade = Number(lastElement) > 0
      const computedShade = includesShade ? colorArr.pop() : 500
      variableShade = shade || computedShade
      if (variableShade && Number(variableShade) < 50)
        variableShade = getNormalizedShadeNumber(Number(variableShade))
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
      autoColor,
      color: color || (makUiDefaultColors.primary! as string),
      colorString: `${color}-${variableShade}${opacityObj.string}`,
      rootString: `${color}-${variableShade}`,
      hex,
    }
  }
}

export const concatNestedKeys = (
  obj: NestedObject,
  prefix: string = ""
): NestedObject => {
  let result: NestedObject = {}

  Object.keys(obj).forEach((key) => {
    // Construct the new key using the prefix
    const newKey = prefix ? `${prefix}-${key}` : key

    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      // If the value is a nested object, call the function recursively
      Object.assign(result, concatNestedKeys(obj[key], newKey))
    } else {
      // Otherwise, add the key-value pair to the result
      result[newKey] = obj[key]
    }
  })

  return result
}

export const getTwColor = (
  hex: string,
  objectToCheck?: NestedObject | GenericObject
) => {
  if (objectToCheck) {
    const concatObject = concatNestedKeys(objectToCheck)
    const customColor = Object.entries(concatObject).find(([key, value]) => {
      return value === hex
    })?.[0]
    if (customColor) {
      return customColor
    }
  }
  const twConfigColors = twConfig?.theme?.extend?.colors as TailwindCustomColors

  const customColorsObj = concatNestedKeys(twConfigColors || {})
  const customColor = Object.entries(customColorsObj).find(([key, value]) => {
    return value === hex
  })?.[0]
  if (customColor) {
    return customColor
  }
  const twColorsObj = concatNestedKeys(colors)

  const twColor = Object.entries(twColorsObj).find(([key, value]) => {
    return value === hex
  })?.[0]
  if (twColor) {
    return twColor
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
    defaultColorGroup: GenericObject | undefined,
    parsedShade: number,
    rootColor: string,
    rootShade: number
  ): string => {
    if (defaultColorGroup && typeof defaultColorGroup === "object") {
      const defaultHex = defaultColorGroup[parsedShade]
      if (defaultHex) return defaultHex
      return black
    } else {
      const tailwindCustomColors = twConfig?.theme?.extend
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

    if (absolute && typeof color === "string") return handleAbsolute(color)

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

const getNestedClassNameObjects = ({
  key,
  value,
  enabledThemeModes,
}: {
  key: string
  value: GenericObject
  enabledThemeModes: MakUiThemeKey[]
}) => {
  const classNamesArray = [] as {
    variant: string
    theme: string | undefined
    shade: string
    paletteVariant: string
    className: string
  }[]

  let [variant, paletteVariant = "color"] = splitStringAtCapital(key)
  paletteVariant = paletteVariant.toLowerCase()
  let shades: [state: string, classNames: string][] = Object.entries(value)
  shades.forEach(([shade, classNames]) => {
    classNames.split(" ").forEach((className) => {
      const splitClassName = className.split(":")

      let altShades: Shade[] = []
      let altThemes: MakUiThemeKey[] = []
      className = splitClassName[splitClassName.length - 1]
      if (makUiThemesSet.has(splitClassName[0] as MakUiThemeKey)) {
        altThemes.push(splitClassName[0] as MakUiThemeKey)
      } else {
        altThemes.push(...enabledThemeModes)
      }
      splitClassName.forEach((cn) => {
        if (makUiShadesSet.has(cn as Shade)) {
          altShades.push(cn as Shade)
        }
      })

      for (const t of enabledThemeModes) {
        for (const s of altShades) {
          classNamesArray.push({
            variant,
            theme: t,
            shade: s,
            paletteVariant,
            className,
          })
        }

        classNamesArray.push({
          variant,
          theme: t,
          shade,
          paletteVariant,
          className,
        })
      }
    })
  })

  return classNamesArray
}

const getClassNameAsObject = ({
  key,
  value,
  enabledThemeModes,
}: {
  key: string
  value: string
  enabledThemeModes: MakUiThemeKey[]
}) => {
  const variant =
    makUiVariants.find((v) => {
      if (key.toLowerCase().includes(v)) {
        return v
      }
    }) || "primary"
  const paletteVariant =
    makUiPalettes.find((v) => {
      if (key.toLowerCase().includes(v)) {
        return v
      }
    }) || "color"

  let className

  const classNamesArray = [] as {
    variant: string
    theme: string | undefined
    shade: string
    paletteVariant: string
    className: string
  }[]

  const splitClassName = value.split(":")

  const shade =
    splitClassName.find((el) => makUiShadesSet.has(el as Shade)) || "500"
  let altThemes: MakUiThemeKey[] = []
  let altShades: Shade[] = []
  className = splitClassName[splitClassName.length - 1]
  if (makUiThemesSet.has(splitClassName[0] as MakUiThemeKey)) {
    altThemes.push(splitClassName[0] as MakUiThemeKey)
  } else {
    altThemes.push(...enabledThemeModes)
  }
  splitClassName.forEach((cn) => {
    if (makUiShadesSet.has(cn as Shade)) {
      altShades.push(cn as Shade)
    }
  })

  for (const t of altThemes) {
    for (const s of altShades) {
      classNamesArray.push({
        variant,
        theme: t,
        shade: s,
        paletteVariant,
        className,
      })
    }

    classNamesArray.push({
      variant,
      theme: t,
      shade,
      paletteVariant,
      className,
    })
  }

  return classNamesArray
}

export const extractInitialPalette = ({
  palette,
  enabledThemeModes,
}: {
  palette: MakUiFlexiblePaletteInput
  enabledThemeModes: MakUiThemeKey[]
}) => {
  let themePalette = {} as MakUiVerbosePalette

  for (const theme of enabledThemeModes) {
    themePalette[theme] = {} as MakUiVerboseTheme
  }

  let paletteObject = {} as MakUiPaletteInput

  for (const [key, value] of Object.entries(palette)) {
    if (key === "theme") {
      if (typeof value === "string") {
        const classNamesArray = value.split(" ")
        let themeObject = {} as { [Key in MakUiThemeKey]: string | undefined }
        for (const theme of enabledThemeModes) {
          themeObject[theme] = undefined
        }

        classNamesArray.forEach((className: string) => {
          if (className.includes("dark:")) {
            themeObject.dark = className.split(":")[1]
          } else if (className.includes("custom:")) {
            themeObject.custom = className.split(":")[1]
          } else if (className.includes("light:")) {
            themeObject.light = className.split(":")[1]
          } else {
            for (const theme of enabledThemeModes) {
              themeObject[theme] = className
            }
          }
        })

        for (const [theme, classNames] of Object.entries(themeObject)) {
          ensureNestedObject({
            parent: paletteObject,
            keys: [theme, "theme", "primary"],
            value: classNames,
          })
        }

        continue
      }

      const themes = Object.entries(value)

      themes.forEach(([variant, classNames]) => {
        if (typeof classNames === "string") {
          const splitClassNames = classNames.split(" ")
          splitClassNames.forEach((className) => {
            const splitClassName = className.split(":")
            const color = splitClassName[splitClassName.length - 1]
            const hex = twColorHelper({ colorString: color }).hex

            const altThemes: MakUiThemeKey[] = []
            makUiThemesSet.has(splitClassName[0] as MakUiThemeKey)
              ? altThemes.push(splitClassName[0] as MakUiThemeKey)
              : altThemes.push(...enabledThemeModes)

            for (const t of altThemes) {
              ensureNestedObject({
                parent: themePalette,
                keys: [t, variant],
                value: hex,
              })
            }
          })
        }
      })

      continue
    }
    if (isObject(value)) {
      const classNamesArray = getNestedClassNameObjects({
        key,
        value,
        enabledThemeModes,
      })
      for (const obj of classNamesArray) {
        const { variant, theme, paletteVariant, shade, className } = obj

        const nestedObj = {}
        ensureNestedObject({
          parent: nestedObj,
          keys: [theme, paletteVariant, variant, shade],
          value: className,
        })

        paletteObject = deepMerge(nestedObj, paletteObject)
      }
    } else {
      for (const classNameString of value.split(" ")) {
        const classNamesArray = getClassNameAsObject({
          key,
          value: classNameString,
          enabledThemeModes,
        })

        for (const obj of classNamesArray) {
          const { variant, theme, paletteVariant, shade, className } = obj

          const nestedObj = {}
          ensureNestedObject({
            parent: nestedObj,
            keys: [theme, paletteVariant, variant, shade],
            value: className,
          })

          paletteObject = deepMerge(nestedObj, paletteObject)
        }
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

  return paletteObject as MakUiVerbosePalette
}

export const makClassNameHelper = ({
  string,
  verbosePalette,
  defaultConfig,
  themeMode,
  makClassName,
  className,
}: {
  string?: string
  verbosePalette: MakUiVerbosePalette
  defaultConfig?: MakUiRootComponentConfigInput
  themeMode?: MakUiThemeKey
  makClassName?: string
  className?: string
}) => {
  if (!string && !makClassName && !className) return
  if (!string && makClassName) {
    string = `mak(${makClassName}) ${className}`
  }
  if (string && !string?.includes("mak(")) {
    string = `mak(${string})`
  }
  const splitClassNames = string?.split(")") || []
  let initialMakClassNames = splitClassNames.find((cn) => cn.includes("mak("))
  const initialRootClassNames = splitClassNames.find(
    (cn) => !cn.includes("mak(")
  )

  let rootClassNames =
    initialRootClassNames && defaultConfig?.className
      ? ` ${initialRootClassNames} ${defaultConfig?.className}`
      : initialRootClassNames || defaultConfig?.className || ""
  if (initialMakClassNames) {
    initialMakClassNames = initialMakClassNames.replace("mak(", "")
  } else {
    return rootClassNames
  }

  initialMakClassNames = makClassName
    ? `${initialMakClassNames} ${makClassName}`
    : initialMakClassNames
  rootClassNames = className ? `${rootClassNames} ${className}` : rootClassNames

  let finalClassName = []
  for (const makCn of initialMakClassNames.split(" ")) {
    let {
      theme,
      themeVariant,
      palette,
      variant,
      state,
      twVariant,
      opacity,
      string,
    } = parseMakClassName(makCn)

    const opacityString = opacity ? `/${opacity}` : ""
    if (!theme) theme = themeMode
    let target
    if (palette === "theme") {
      const themePalette = verbosePalette[theme!][palette]
      target = themePalette

      if (state) {
        const constructedClassName =
          `${state}:${twVariant}-${target[themeVariant]}` + opacityString
        finalClassName.push(constructedClassName)
      } else {
        const baseClassName =
          `${twVariant}-${target[themeVariant]}` + opacityString
        finalClassName.push(baseClassName)
        // for (const state of enabledStates) {
        //   const constructedClassName =
        //     `${state}:${twVariant}-${target[themeVariant]}` + opacityString

        //   finalClassName.push(constructedClassName)
        // }
      }
    } else {
      target = verbosePalette[theme!][palette][variant]

      if (!state) {
        const baseClassName = `${twVariant}-${target.base}` + opacityString
        finalClassName.push(baseClassName)
        // for (const state of enabledStates) {
        //   const constructedClassName =
        //     `${state}:${twVariant}-${target[state]}` + opacityString

        //   finalClassName.push(constructedClassName)
        // }
      } else {
        let constructedClassName
        if (twVariant) {
          constructedClassName =
            `${twVariant}:${palette}-${target[state]}` + opacityString
        } else {
          constructedClassName = `${state}:${target[state]}` + opacityString
        }
        finalClassName.push(constructedClassName)
      }
    }
  }

  const finalClassNamesString = finalClassName.join(" ") + ` ${rootClassNames}`

  return finalClassNamesString
}

const parseMakClassName = (string: string) => {
  const makClassNameObj: ParsedClassNameResponse = {
    theme: undefined,
    palette: "color",
    variant: "primary",
    themeVariant: "primary",
    state: undefined,
    twVariant: "bg",
    opacity: undefined,
    string,
  }

  if (string.includes("ring-offset")) {
    makClassNameObj.twVariant = "ring-offset"
  }

  const delimiters = /group-offset:|ring-offset:|[:\/.-]+/
  const splitString = string.split(delimiters)

  let opacity
  if (string.includes("/")) {
    opacity = string.split("/")[1]
    makClassNameObj.opacity = opacity
  }

  splitString.forEach((str) => {
    if (makUiThemesSet.has(str as MakUiThemeKey)) {
      makClassNameObj.theme = str as MakUiThemeKey
    }

    if (makUiVariantsSet.has(str as MakUiVariantKey)) {
      makClassNameObj.variant = str as MakUiVariantKey
    }

    if (makUiPalettesSet.has(str as MakUiPaletteKey)) {
      makClassNameObj.palette = str as MakUiPaletteKey
    }

    if (makUiStatesSet.has(str as MakUiStateKey)) {
      makClassNameObj.state = str as MakUiStateKey
    }

    if (tailwindVariantsSet.has(str as TailwindVariantKey)) {
      if (makClassNameObj.twVariant !== "ring-offset") {
        makClassNameObj.twVariant = str as TailwindVariantKey
      }
    } else if (str === "color") {
      makClassNameObj.twVariant = "bg"
    }

    if (makUiThemeVariantsSet.has(str as MakUiThemeVariantKey)) {
      makClassNameObj.themeVariant = str as MakUiThemeVariantKey
    }
  })

  return makClassNameObj
}

export const getActiveTwVariants = ({
  componentConfig,
  enabledThemeModes,
}: {
  componentConfig: MakUiComponentConfigInput
  enabledThemeModes: MakUiThemeKey[]
}) => {
  const enabledInteractionStates: MakUiInteractionStateKey[] = []
  const enabledTwVariants: string[] = []
  Object.values(componentConfig).forEach((config) => {
    const themeModes = config?.enabledStates as MakUiInteractionStateKey[]
    themeModes && enabledInteractionStates.push(...themeModes)
  })
  for (const theme of enabledThemeModes) {
    for (const state of enabledInteractionStates) {
      if (theme === "light") {
        enabledTwVariants.push(`${state}`)
      } else {
        enabledTwVariants.push(`${theme}:${state}`)
      }
    }
  }

  return { enabledTwVariants, enabledInteractionStates }
}

export const getTwConfigSafelist = ({
  simplePalette,
  enabledTwVariants,
}: {
  simplePalette: MakUiSimplePalette
  enabledTwVariants: string[]
}) => {
  const twVariants = tailwindVariants
  const variantsArray: string[] = []
  twVariants.forEach((variant) => {
    const variantString = `(${variant})`
    variantsArray.push(variantString)
  })
  const variantsString = `(${variantsArray.join("|")})`

  const safeList = []

  const paletteMap: Map<string, Set<number>> = new Map()

  const recursiveCollectClassNames = (
    obj: GenericObject,
    result: GenericObject = {}
  ): GenericObject => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          recursiveCollectClassNames(obj[key], result)
        } else {
          const value = obj[key] // Changed to obj[key] instead of result[key]
          if (value && typeof value === "string") {
            const { color, shade } = twColorHelper({
              colorString: value,
            }) as TWColorHelperResponse

            if (paletteMap.has(color!)) {
              const shadesSet = paletteMap.get(color!)
              shadesSet?.add(shade!)
            } else {
              paletteMap.set(color!, new Set([shade!]))
            }
          }
          result[key] = obj[key]
        }
      }
    }
    return result
  }

  recursiveCollectClassNames(simplePalette)

  for (const [color, shades] of paletteMap.entries()) {
    const shadesArray = Array.from(shades)
    shadesArray.sort((a, b) => a - b)
    const shadesString = shadesArray.join("|")
    const regex = `/${variantsString}-(${color})-(${shadesString})/`
    const safeListObject = {
      pattern: regex,
      variants: enabledTwVariants,
    }
    safeList.push(safeListObject)
  }

  safeList.push({
    pattern: `/${variantsString}-(white|black)/`,
    variants: enabledTwVariants,
  })

  return safeList
}

export const objectToClassName = ({
  ...args
}: ObjectToClassNameObjectProp): string => {
  return parseProps({ ...args })
  function parseProps({
    object,
    variant,
    allowedStates,
    allowedModifiers,
  }: ObjectToClassNameObjectProp): string {
    if (!isObject(object)) return ""
    let parsedStringArray: string[] = []

    if (!allowedStates || !allowedStates.has("not-base")) {
      allowedStates = new Set([...(allowedStates || []), "base"])
    }

    let allowedObject = {} as GenericObject
    if (allowedStates?.size) {
      ;[...allowedStates].forEach((state) => {
        allowedObject[state] = object[state]
      })
    }

    Object.entries(allowedObject).forEach(([key, value]) => {
      if (key === "not-base") return
      if (key === "base") {
        parsedStringArray.push(`${variant}-${value}`)
        return
      } else {
        parsedStringArray.push(`${key}:${variant}-${value}`)
        if (allowedModifiers?.size) {
          ;[...allowedModifiers].forEach((modifier) => {
            parsedStringArray.push(`${modifier}-${key}:${variant}-${value}`)
          })
        }
      }
    })

    // Object.entries(object).forEach(([key, value]) => {
    //   if (key === "base") {
    //     parsedStringArray.push(`${variant}-${value}`)
    //     return
    //   }
    //   if (allowedStates?.size) {
    //     ;[...allowedStates].forEach((state) => {
    //       parsedStringArray.push(`${state}:${variant}-${value}`)
    //     })
    //   }
    //   if (allowedModifiers?.size) {
    //     ;[...allowedModifiers].forEach((modifier) => {
    //       parsedStringArray.push(`${modifier}:${variant}-${value}`)
    //     })
    //   }
    // })

    return parsedStringArray.join(" ")
  }
}
