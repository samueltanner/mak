import chroma from "chroma-js"
import {
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
  MakUiVariantKey,
  MakUiVerbosePalette,
  ParsedClassNameResponse,
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
  makUiPalettes,
  makUiPalettesSet,
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
} from "../types/component-types"
import {
  deepMerge,
  ensureNestedObject,
  isEmptyObject,
  isObject,
  mergeWithFallback,
  nearestMultiple,
} from "@/globals/global-helper-functions"

type DefaultColors = typeof colors
type TailwindCustomColors = Record<string, Record<string, string>>

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
  const { primary, secondary, tertiary, custom } = providedVariants

  const { shade: primaryShade, color: primaryColor } = twColorHelper({
    colorString: primary || makUiDefaultColors.primary,
    shade: defaultShades[theme].primary,
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

  const resolvedThemeObject = {
    primary: twColorHelper({
      colorString: primaryColor,
      shade: !primaryShade ? defaultShades[theme].primary : primaryShade,
    }),
    secondary: twColorHelper({
      colorString: secondaryColor || primaryColor,
      shade: !secondaryShade ? defaultShades[theme].secondary : secondaryShade,
    }),
    tertiary: twColorHelper({
      colorString: tertiaryColor || primaryColor,
      shade: !tertiaryShade ? defaultShades[theme].tertiary : tertiaryShade,
    }),
    custom: twColorHelper({
      colorString: customColor || primaryColor,
      shade: !customShade ? defaultShades[theme].custom : customShade,
    }),
  }

  const themeResponse = {
    primary: resolvedThemeObject.primary.rootString,
    secondary: resolvedThemeObject.secondary.rootString,
    tertiary: resolvedThemeObject.tertiary.rootString,
    custom: resolvedThemeObject.custom.rootString,
  }

  return themeResponse
}

export const getConstructedStates = ({
  providedStates = {} as MakUiState,
  defaultShades,
  theme = "light",
}: {
  providedStates?: MakUiState
  defaultShades?: MakUiStateShades
  theme?: MakUiThemeKey
}) => {
  let providedColor = providedStates?.base as string | undefined
  let providedState = !!providedStates?.base ? "base" : undefined
  let inferredBaseShade
  let stateShade
  const multiplier = theme === "dark" ? 1 : -1
  if (!providedColor) {
    for (const state of makUiStates) {
      providedColor = providedStates?.[state]
      if (providedColor) {
        const providedTwObj = twColorHelper({
          colorString: providedColor,
        })
        providedState = state
        providedColor = providedTwObj.color
        stateShade = providedTwObj.shade
        let stateDiff = defaultShades![state] - defaultShades!.base
        inferredBaseShade = providedTwObj.shade! - stateDiff * multiplier
        break
      }
    }
  }

  const twObj = twColorHelper({
    colorString: providedColor,
    defaults: makUiDefaultStates,
    defaultKey: "base",
    shade: inferredBaseShade
      ? getNormalizedShadeNumber(inferredBaseShade)
      : undefined,
  })

  const disabledTwObj = twColorHelper({
    colorString: providedStates.disabled || twObj.rootString,
    shade: providedStates.disabled
      ? undefined
      : getNormalizedShadeNumber(twObj.shade! - 200),
  })
  const disabledShade = disabledTwObj.autoShade
    ? twObj.shade! - 200
    : disabledTwObj.shade!

  const disabledColor = `${twObj.color}-${getNormalizedShadeNumber(
    disabledShade
  )}`

  providedStates.base = twObj.rootString
  providedStates.disabled = disabledColor

  const statesObject = generateDefaultStatesObject({
    defaultColor: twObj.color,
    defaultShades,
    baseShade: twObj.shade,
    multiplier,
  })

  const resolvedProvidedStates = {} as MakUiState
  for (const [state, color] of Object.entries(providedStates)) {
    const twObj = twColorHelper({
      colorString: color,
      defaults: makUiDefaultStates,
      defaultKey: state as keyof MakUiStateShades,
    })
    resolvedProvidedStates[state as MakUiStateKey] = twObj.rootString
  }
  const resolvedStatesObject = mergeWithFallback(
    resolvedProvidedStates,
    statesObject
  )

  return resolvedStatesObject
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

  let defaultStatesObject = {} as MakUiState
  for (const [state, diff] of Object.entries(shadesDiff)) {
    const shade = baseShade + diff * multiplier
    defaultStatesObject[
      state as MakUiStateKey
    ] = `${defaultColor}-${getNormalizedShadeNumber(shade)}`
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
      hex: "",
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
      hex: colorString === "white" ? colors["white"] : colors["black"],
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

const getNestedClassNameObjects = (key: string, value: object) => {
  const classNamesArray = [] as {
    variant: string
    theme: string | undefined
    state: string
    paletteVariant: string
    className: string
  }[]

  let [variant, paletteVariant = "color"] = splitStringAtCapital(key)
  paletteVariant = paletteVariant.toLowerCase()
  let states: [state: string, classNames: string][] = Object.entries(value)
  states.forEach(([state, classNames]) => {
    classNames.split(" ").forEach((className) => {
      const splitClassName = className.split(":")
      let theme
      let altStates: MakUiStateKey[] = []
      className = splitClassName[splitClassName.length - 1]
      splitClassName.forEach((cn) => {
        if (makUiThemesSet.has(cn as MakUiThemeKey)) {
          theme = cn
        } else if (makUiStatesSet.has(cn as MakUiStateKey)) {
          altStates.push(cn as MakUiStateKey)
        }
      })

      theme = theme ? theme : "light"

      for (const s of altStates) {
        classNamesArray.push({
          variant,
          theme,
          state: s,
          paletteVariant,
          className,
        })
      }

      classNamesArray.push({
        variant,
        theme,
        state,
        paletteVariant,
        className,
      })
    })
  })

  return classNamesArray
}

const getClassNameAsObject = (key: string, value: string) => {
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
    state: string
    paletteVariant: string
    className: string
  }[]

  const splitClassName = value.split(":")
  let theme
  const state =
    splitClassName.find((el) => makUiStates.includes(el as MakUiStateKey)) ||
    "base"
  let altStates: MakUiStateKey[] = []
  className = splitClassName[splitClassName.length - 1]
  splitClassName.forEach((cn) => {
    if (makUiThemesSet.has(cn as MakUiThemeKey)) {
      theme = cn
    } else if (makUiStatesSet.has(cn as MakUiStateKey)) {
      altStates.push(cn as MakUiStateKey)
    }
  })

  theme = theme ? theme : "light"

  for (const s of altStates) {
    classNamesArray.push({
      variant,
      theme,
      state: s,
      paletteVariant,
      className,
    })
  }

  classNamesArray.push({
    variant,
    theme,
    state,
    paletteVariant,
    className,
  })

  return classNamesArray
}

export const extractInitialPalette = ({
  palette,
}: {
  palette: MakUiFlexiblePaletteInput
}) => {
  let themePalette = {
    light: {},
    dark: {},
    custom: {},
  } as MakUiVerbosePalette
  let paletteObject = {} as MakUiPaletteInput
  for (const [key, value] of Object.entries(palette)) {
    if (key === "theme") {
      if (typeof value === "string") {
        const classNamesArray = value.split(" ")
        let themeObject = {
          light: undefined,
          dark: undefined,
          custom: undefined,
        } as { [Key in MakUiThemeKey]: string | undefined }

        classNamesArray.forEach((className: string) => {
          if (className.includes("dark:")) {
            themeObject.dark = className.split(":")[1]
          } else if (className.includes("custom:")) {
            themeObject.custom = className.split(":")[1]
          } else {
            themeObject.light = className
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
      themes.forEach(([theme, classNames]) => {
        if (isObject(classNames)) {
          themePalette = deepMerge(themePalette, {
            [theme]: classNames,
          }) as MakUiVerbosePalette
        } else {
          themePalette = deepMerge(themePalette, {
            [theme]: {
              primary: classNames,
            },
          }) as MakUiVerbosePalette
        }
      })

      continue
    }
    if (isObject(value)) {
      const classNamesArray = getNestedClassNameObjects(key, value)
      for (const obj of classNamesArray) {
        const { variant, theme, paletteVariant, state, className } = obj

        const nestedObj = {}
        ensureNestedObject({
          parent: nestedObj,
          keys: [theme, paletteVariant, variant, state],
          value: className,
        })

        paletteObject = deepMerge(nestedObj, paletteObject)
      }
    } else {
      for (const classNameString of value.split(" ")) {
        const classNamesArray = getClassNameAsObject(key, classNameString)

        for (const obj of classNamesArray) {
          const { variant, theme, paletteVariant, state, className } = obj

          const nestedObj = {}
          ensureNestedObject({
            parent: nestedObj,
            keys: [theme, paletteVariant, variant, state],
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
  enabledStates,
  defaultConfig,
  themeMode,
}: {
  string: string
  verbosePalette: MakUiVerbosePalette
  enabledStates: MakUiInteractionStateKey[]
  defaultConfig?: MakUiRootComponentConfigInput
  themeMode?: MakUiThemeKey
}) => {
  if (!string) return ""
  let finalClassName = []
  const splitClassNames = string.split(")")
  let initialMakClassNames = splitClassNames.find((cn) => cn.includes("mak("))
  const initialRootClassNames = splitClassNames.find(
    (cn) => !cn.includes("mak(")
  )
  const rootClassNames = ` ${initialRootClassNames} ${defaultConfig?.className}`
  if (initialMakClassNames) {
    initialMakClassNames = initialMakClassNames.replace("mak(", "")
  } else {
    return rootClassNames
  }

  for (const makCn of initialMakClassNames.split(" ")) {
    let { theme, themeVariant, palette, variant, state, twVariant, opacity } =
      parseMakClassName(makCn)
    const opacityString = opacity ? `/${opacity}` : ""
    if (!theme) theme = themeMode
    let target
    if (palette === "theme") {
      console.log({ theme, themeVariant, palette, variant, state, twVariant })
      const themePalette = verbosePalette[theme!][palette]
      target = themePalette
      console.log({ themePalette, target })
      if (state) {
        const constructedClassName =
          `${state}:${twVariant}-${target[themeVariant]}` + opacityString
        finalClassName.push(constructedClassName)
      } else {
        const baseClassName =
          `${twVariant}-${target[themeVariant]}` + opacityString
        finalClassName.push(baseClassName)
        for (const state of enabledStates) {
          const constructedClassName =
            `${state}:${twVariant}-${target[themeVariant]}` + opacityString

          finalClassName.push(constructedClassName)
        }
      }
    } else {
      target = verbosePalette[theme!][palette][variant]

      if (!state) {
        const baseClassName = `${twVariant}-${target.base}` + opacityString
        finalClassName.push(baseClassName)
        for (const state of enabledStates) {
          const constructedClassName =
            `${state}:${twVariant}-${target[state]}` + opacityString

          finalClassName.push(constructedClassName)
        }
      } else {
        const constructedClassName =
          `${state}:${twVariant}-${target[state]}` + opacityString
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
  }

  if (string.includes("ring-offset")) {
    makClassNameObj.twVariant = "ring-offset"
  }
  const delimiters = /ring-offset:|[:\/.-]+/
  const splitString = string.split(delimiters)
  const opacity = splitString[1]
  if (opacity) {
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
