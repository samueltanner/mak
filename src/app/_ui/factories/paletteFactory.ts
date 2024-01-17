import {
  defaultColors,
  paletteVariants,
  elementStates,
  paletteKeys,
  defaultThemeColors,
} from "../constants/ui-constants"

import {
  getTheme,
  isObject,
  separatePalettes,
  getThemeShades,
  handleTypeString,
  twColorHelper,
  getConstructedClassNames,
} from "../functions/helpers"
import { OvaiUiPaletteInput, Palette } from "../types/default-types"
import { uiThemes } from "../constants/defaults/theme-constants"
import { ThemePalette, ThemeVariant } from "../types/theme-types"
import { uiVariants } from "../constants/defaults/default-constants"

export const paletteFactory = ({
  paletteInput,
}: {
  paletteInput: OvaiUiPaletteInput
}) => {
  const { colorPalette, textPalette, borderPalette, themePalette } =
    separatePalettes(paletteInput)
  let colorPaletteObject = {} as Palette
  let textPaletteObject = {} as Palette
  let borderPaletteObject = {} as Palette
  let themePaletteObject = {} as ThemePalette

  console.log({ colorPalette })

  for (const theme of uiThemes) {
    const providedVariant = themePalette?.[theme]
    // const theme = getTheme(themeVariant)

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

        themePaletteObject[theme] = {
          ...themePaletteObject[theme],
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

      const remainingVariants: ThemeVariant[] = [
        "secondary",
        "tertiary",
        "custom",
      ]

      themePaletteObject[theme] = {
        ...themePaletteObject[theme],
        primary: primaryColorString,
        primaryRoot: primaryRootString,
      }

      remainingVariants.forEach((variant) => {
        const variantColor = providedVariant?.[variant]
          ? handleTypeString(providedVariant[variant]!)
          : undefined
        const {
          colorString: variantColorString,
          rootString: variantRootString,
        } = twColorHelper({
          colorString: variantColor?.colorString || primaryColorVal,
          shade: variantColor?.shade || relativeThemeShades[variant],
          opacity: variantColor?.opacity || primaryOpacity,
        })
        themePaletteObject[theme] = {
          ...themePaletteObject[theme],
          [variant]: variantColorString,
          [`${variant}Root`]: variantRootString,
        }
      })
    }

    if (!themePalette?.[theme]) {
      const existingDarkPrimary = themePaletteObject?.dark
      const existingLightPrimary = themePaletteObject?.light
      const existingCustomPrimary = themePaletteObject?.custom
      const existingPrimary =
        existingDarkPrimary ||
        existingLightPrimary ||
        existingCustomPrimary ||
        defaultThemeColors[theme]

      const themeShades = getThemeShades({
        defaultTheme: theme,
      })

      for (const shade of Object.keys(themeShades)) {
        const { colorString, rootString } = twColorHelper({
          colorString: existingPrimary.primary,
          shade: themeShades[shade as ThemeVariant],
        })
        themePaletteObject[theme] = {
          ...themePaletteObject[theme],
          [shade]: colorString,
          [`${shade}Root`]: rootString,
        }
      }
    }
  }

  for (const variant of uiVariants) {
    for (const key of paletteKeys) {
      const targetPalette =
        key === "Color"
          ? colorPalette
          : key === "Text"
          ? textPalette
          : key === "Border"
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

    for (const themeVariant of uiThemes) {
      nestedPaletteObject.theme[getTheme(themeVariant)] =
        themePaletteObject[themeVariant]
    }
    return nestedPaletteObject
  }

  console.log("colorPaletteObject", colorPaletteObject)

  return {
    colorPaletteObject,
    textPaletteObject,
    borderPaletteObject,
    themePaletteObject: nestedPaletteObject().theme,
    nestedPaletteObject: nestedPaletteObject(),
    twParse: twColorHelper,
  }
}
