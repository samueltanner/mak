import {
  ColorPalette,
  TWColorHelperResponse,
  ElementInteractions,
  ElementInteractionShadesInput,
  ElementState,
  StateShades,
  InteractionInput,
  VariantInputObject,
  TextPalette,
  BorderPalette,
  OvaiUiPaletteInput,
  ThemePalette,
  ThemePaletteVariant,
  ThemeSubVariantShadeInput,
  ThemeShades,
} from "../_types/ui-types"
import {
  defaultColors,
  paletteVariants,
  elementStates,
  elementInteractions,
  defaultStateShades,
  paletteKeys,
  themeVariants,
  defaultThemeShades,
  defaultThemeColors,
} from "../_constants/ui-constants"

import {
  getTheme,
  isObject,
  nearestMultiple,
  separatePalettes,
} from "../_functions/helpers"
import {
  Interaction,
  InteractionAndVariantInput,
  State,
  VariantInput,
  VariantsInput,
} from "../_types/ui-input-types"
import { Interactions, States, Variants } from "../_types/nested-ui-types"

const absoluteRegex =
  /^((white|black)\/\[*0*(?:[0-9][0-9]?|100)%*\]*|(white|black))$/

const getThemeShades = ({
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

const getShades = ({
  altBaseShade,
  altDiffs,
}: {
  altBaseShade?: number
  altDiffs?: ElementInteractionShadesInput
} = {}) => {
  const shadesObj =
    (altDiffs as StateShades) || (defaultStateShades as StateShades)
  const originalDefaultBaseShade =
    shadesObj?.default?.base || defaultStateShades.default!.base!
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
    shadesResponseObj[state] = altStateShadesObject
  }
  return shadesResponseObj
}

const getConstructedClassNames = ({
  interactions,
  color,
  state = "default",
}: {
  interactions?: InteractionAndVariantInput
  state?: ElementState | "all"
  color?: string
  type?: "default" | "theme"
}) => {
  const states = state === "all" ? elementStates : [state]
  let relativeClassNamesResponse: States = {
    default: {} as Interactions,
    active: {} as Interactions,
    selected: {} as Interactions,
    disabled: {} as Interactions,
    focused: {} as Interactions,
  }

  const variantObjectKey = Object.keys(interactions || {}).find((key) => {
    return elementStates.includes(key as ElementState)
  }) as Interaction

  if (variantObjectKey) {
    relativeClassNamesResponse = {
      ...relativeClassNamesResponse,
      ...(interactions as Interactions),
    }
  } else if (state !== "all") {
    relativeClassNamesResponse = {
      ...relativeClassNamesResponse,
      [state]: {
        ...interactions,
      } as Interactions,
    }
  }

  const getColorString = () => {
    if (color) return color
    if (interactions?.["base"]) return interactions?.["base"]
    if (interactions?.[variantObjectKey]?.["base"]) {
      return interactions?.[variantObjectKey]?.["base"]
    }
    // if (
    //   !!variantObjectKey &&
    //   isObject(interactions?.[variantObjectKey]) &&
    //   interactions?.[variantObjectKey]?.["base"]
    // ) {
    //   return interactions?.[variantObjectKey]?.["base"]
    // }
    if (isObject(interactions) && Object.values(interactions)[0]) {
      return Object.values(interactions)[0]
    }
  }

  const globalDefaultColor = twColorHelper({
    colorString: getColorString(),
  })

  for (const state of states) {
    for (const interaction of elementInteractions) {
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

const getOpacity = ({
  opacityValue,
  override,
}: {
  opacityValue?: string | number | null | undefined
  override?: string | number
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

const twColorHelper = ({
  colorString,
  opacity,
  shade,
}: {
  colorString?: string | undefined | null
  opacity?: number | string | undefined | null
  shade?: number | string | undefined | null
}): TWColorHelperResponse => {
  if (!colorString) colorString = `${defaultColors.primary}-500`
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

    const isTwColor = !!color && !!variableShade
    return {
      absolute: false,
      isTwColor,
      opacity: opacityObj.value,
      shade: Number(variableShade),
      autoShade,
      color: color || defaultColors.primary,
      colorString: `${color}-${variableShade}${opacityObj.string}`,
      rootString: `${color}-${variableShade}`,
    }
  }
}

const handleTypeString = (providedState: string, opacityOverride?: number) => {
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

export const paletteFactory = ({
  paletteInput,
}: {
  paletteInput: OvaiUiPaletteInput
}) => {
  const { colorPalette, textPalette, borderPalette, themePalette } =
    separatePalettes(paletteInput)
  let colorPaletteObject: ColorPalette = {}
  let textPaletteObject: TextPalette = {}
  let borderPaletteObject: BorderPalette = {}
  let themePaletteObject: ThemePalette = {}

  for (const themeVariant of themeVariants) {
    const providedVariant = themePalette?.[themeVariant]
    const theme = getTheme(themeVariant)

    if (typeof providedVariant === "string") {
      const providedClassName = handleTypeString(providedVariant)
      const autoShade = providedClassName.autoShade
      const relativeThemeShades = getThemeShades({
        altBaseShade: autoShade ? undefined : providedClassName.shade,
        defaultTheme: theme,
      })

      for (const [variant, shade] of Object.entries(relativeThemeShades)) {
        const { colorString, rootString } = twColorHelper({
          colorString: providedClassName.colorString,
          shade: shade,
        })

        themePaletteObject[themeVariant] = {
          ...themePaletteObject[themeVariant],
          [variant]: colorString,
          [`${variant}Root`]: rootString,
        }
      }
    }

    if (isObject(providedVariant)) {
      const primaryColor = providedVariant?.primary
      const primaryColorObject = twColorHelper({
        colorString: primaryColor,
      })
      const {
        color: primaryColorVal,
        colorString: primaryColorString,
        rootString: primaryRootString,
        shade: primaryShade,
        opacity: primaryOpacity,
      } = primaryColorObject

      const relativeThemeShades = getThemeShades({
        altBaseShade: primaryShade,
        defaultTheme: theme,
      })

      const remainingVariants = ["secondary", "tertiary", "custom"]

      remainingVariants.forEach((variant) => {
        const variantColor = providedVariant?.[variant]
          ? handleTypeString(providedVariant[variant])
          : undefined
        const {
          colorString: variantColorString,
          rootString: variantRootString,
        } = twColorHelper({
          colorString: variantColor?.colorString || primaryColorVal,
          shade: variantColor?.shade || relativeThemeShades[variant],
          opacity: variantColor?.opacity || primaryOpacity,
        })
        themePaletteObject[themeVariant] = {
          ...themePaletteObject[themeVariant],
          [variant]: variantColorString,
          [`${variant}Root`]: variantRootString,
        }
      })
    }

    if (!themePalette?.[themeVariant]) {
      const existingDarkPrimary = themePaletteObject?.["darkTheme"]
      const existingLightPrimary = themePaletteObject?.["lightTheme"]
      const existingCustomPrimary = themePaletteObject?.["customTheme"]
      const existingPrimary =
        existingDarkPrimary ||
        existingLightPrimary ||
        existingCustomPrimary ||
        defaultThemeColors[themeVariant]

      const themeShades = getThemeShades({
        defaultTheme: theme,
      })

      for (const shade of Object.keys(themeShades)) {
        const { colorString, rootString } = twColorHelper({
          colorString: existingPrimary.primary,
          shade: themeShades[shade],
        })
        themePaletteObject[themeVariant] = {
          ...themePaletteObject[themeVariant],
          [shade]: colorString,
          [`${shade}Root`]: rootString,
        }
      }
    }
  }

  for (const variant of paletteVariants) {
    for (const key of paletteKeys) {
      const targetPalette =
        key === "Color"
          ? colorPalette
          : key === "Text"
          ? textPalette
          : key === "acorder"
          ? borderPalette
          : colorPalette

      const targetPaletteObject =
        key === "Color"
          ? colorPaletteObject
          : key === "Text"
          ? textPaletteObject
          : key === "Border"
          ? borderPaletteObject
          : {}

      const variantKey = key === "Color" ? variant : `${variant}${key}`
      const providedVariant = targetPalette?.[variantKey]

      if (typeof providedVariant === "string") {
        const { colorString: variantColorString } =
          handleTypeString(providedVariant)
        const classNames = getConstructedClassNames({
          color: variantColorString,
          state: "all",
        })
        targetPaletteObject[variantKey] = {
          ...classNames,
        }
      }

      for (const state of elementStates) {
        const providedState = targetPalette?.[variantKey]?.[state]

        if (typeof providedState === "string") {
          const { colorString: variantColorString } =
            handleTypeString(providedState)
          const classNames = getConstructedClassNames({
            color: variantColorString,
            state: "all",
          })
          targetPaletteObject[variantKey] = {
            ...classNames,
          }
        } else if (isObject(providedState)) {
          const classNames = getConstructedClassNames({
            interactions: colorPalette?.[variantKey] as VariantInputObject,
            state: "all",
          })

          targetPaletteObject[variantKey] = {
            ...classNames,
          }
        }
      }
      if (!colorPaletteObject?.[variant]) {
        const classNames = getConstructedClassNames({
          color: defaultColors[variant],
          state: "all",
        })
        colorPaletteObject[variant] = {
          ...classNames,
        }
      }
      if (!textPaletteObject?.[`${variant}Text`]) {
        textPaletteObject[`${variant}Text`] = {
          ...colorPaletteObject?.[variant],
        }
      }
      if (!borderPaletteObject?.[`${variant}Border`]) {
        borderPaletteObject[`${variant}Border`] = {
          ...colorPaletteObject?.[variant],
        }
      }
    }
  }

  const nestedPaletteObject = () => {
    const nestedPaletteObject = {
      color: {},
      text: {},
      border: {},
      theme: {},
    }
    for (const variant of paletteVariants) {
      nestedPaletteObject.color[variant] = colorPaletteObject[variant]
      nestedPaletteObject.text[variant] = textPaletteObject[`${variant}Text`]
      nestedPaletteObject.border[variant] =
        borderPaletteObject[`${variant}Border`]
    }

    for (const themeVariant of themeVariants) {
      nestedPaletteObject.theme[getTheme(themeVariant)] =
        themePaletteObject[themeVariant]
    }
    return nestedPaletteObject
  }

  return {
    colorPaletteObject,
    textPaletteObject,
    borderPaletteObject,
    themePaletteObject: nestedPaletteObject().theme,
    nestedPaletteObject: nestedPaletteObject(),
    twParse: twColorHelper,
  }
}
