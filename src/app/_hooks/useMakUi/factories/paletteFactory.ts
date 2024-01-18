import {
  isObject,
  separatePalettes,
  getThemeShades,
  twColorHelper,
  getConstructedClassNames,
} from "../functions/helpers"
import {
  Interaction,
  MakUiNestedPalette,
  MakUiPaletteInput,
  MakUiPalette,
  MakUiStates,
  MakUiVariant,
  MakUiThemePalette,
  ThemeVariant,
  MakUiSimplePalette,
  MakUiSimpleThemePalette,
  MakUiSimpleNestedPalette,
} from "../types/default-types"
import {
  uiDefaultColorPaletteInput,
  uiDefaultTextPaletteInput,
  uiPaletteVariants,
  uiStates,
  uiVariants,
  uiDefaultThemePaletteInput,
  uiThemes,
} from "../constants/defaults/default-constants"

export const paletteFactory = ({
  paletteInput,
}: {
  paletteInput: MakUiPaletteInput
}) => {
  const { colorPalette, textPalette, borderPalette, themePalette } =
    separatePalettes(paletteInput)
  let colorPaletteObject = {} as MakUiPalette
  let simpleColorPaletteObject = {} as MakUiSimplePalette
  let textPaletteObject = {} as MakUiPalette
  let simpleTextPaletteObject = {} as MakUiSimplePalette
  let borderPaletteObject = {} as MakUiPalette
  let simpleBorderPaletteObject = {} as MakUiSimplePalette
  let themePaletteObject = {} as MakUiThemePalette
  let simpleThemePaletteObject = {} as MakUiSimpleThemePalette

  for (const theme of uiThemes) {
    const providedVariant = themePalette?.[theme]

    if (typeof providedVariant === "string") {
      const providedClassName = twColorHelper({ colorString: providedVariant })
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
        simpleThemePaletteObject[theme] = {
          ...simpleThemePaletteObject[theme],
          [variant]: rootString,
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

      simpleThemePaletteObject[theme] = {
        ...simpleThemePaletteObject[theme],
        primary: primaryRootString,
      }

      remainingVariants.forEach((variant) => {
        const variantColor = providedVariant?.[variant]
          ? twColorHelper({ colorString: providedVariant[variant]! })
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

        simpleThemePaletteObject[theme] = {
          ...simpleThemePaletteObject[theme],
          [variant]: variantRootString,
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
        uiDefaultThemePaletteInput[theme]

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

        simpleThemePaletteObject[theme] = {
          ...simpleThemePaletteObject[theme],
          [shade]: rootString,
        }
      }
    }
  }

  for (const uiVariant of uiPaletteVariants) {
    for (const variant of uiVariants) {
      const targetPalette =
        uiVariant === "color"
          ? colorPalette
          : uiVariant === "text"
          ? textPalette
          : uiVariant === "border"
          ? borderPalette
          : colorPalette

      const targetPaletteObject =
        uiVariant === "color"
          ? colorPaletteObject
          : uiVariant === "text"
          ? textPaletteObject
          : uiVariant === "border"
          ? borderPaletteObject
          : colorPaletteObject

      const targetSimplePaletteObject =
        uiVariant === "color"
          ? simpleColorPaletteObject
          : uiVariant === "text"
          ? simpleTextPaletteObject
          : uiVariant === "border"
          ? simpleBorderPaletteObject
          : simpleColorPaletteObject

      const providedVariant = targetPalette?.[variant]

      if (typeof providedVariant === "string") {
        const {
          colorString: variantColorString,
          rootString: variantRootString,
        } = twColorHelper({
          colorString: providedVariant,
        })
        const classNames = getConstructedClassNames({
          color: variantColorString,
          state: "all",
        })

        targetPaletteObject[variant] = {
          ...targetPaletteObject[variant],
          ...classNames,
        }

        targetSimplePaletteObject[variant] = variantRootString
      }

      for (const state of uiStates) {
        const providedVariant = targetPalette?.[variant] as MakUiVariant
        const providedState = providedVariant?.[state as keyof MakUiVariant]

        if (typeof providedState === "string") {
          const {
            colorString: variantColorString,
            rootString: variantRootString,
          } = twColorHelper({
            colorString: providedState,
          })
          const classNames = getConstructedClassNames({
            color: variantColorString,
            state: "all",
          })
          targetPaletteObject[variant] = {
            ...targetPaletteObject[variant],
            ...classNames,
          }
          targetSimplePaletteObject[variant] = variantRootString
        } else if (isObject(providedState)) {
          const classNames = getConstructedClassNames({
            interactions: colorPalette?.[variant] as MakUiStates,
            state: "all",
          })

          targetPaletteObject[variant] = {
            ...targetPaletteObject[variant],
            ...classNames,
          }

          targetSimplePaletteObject[variant] = classNames.default.baseRoot
        }
      }
      if (!colorPaletteObject?.[variant]) {
        const classNames = getConstructedClassNames({
          color: uiDefaultColorPaletteInput[variant] as Interaction,
          state: "all",
        })
        colorPaletteObject[variant] = {
          ...targetPaletteObject[variant],
          ...classNames,
        }
        simpleColorPaletteObject[variant] = classNames.default.baseRoot
      }
      if (!borderPaletteObject?.[variant]) {
        borderPaletteObject[variant] = {
          ...colorPaletteObject?.[variant],
        }
        simpleBorderPaletteObject[variant] = simpleColorPaletteObject?.[variant]
      }
      if (!textPaletteObject?.[variant]) {
        const classNames = getConstructedClassNames({
          color: uiDefaultTextPaletteInput?.[variant] as Interaction,
          state: "all",
        })
        textPaletteObject[variant] = {
          ...targetPaletteObject[variant],
          ...classNames,
        }
        simpleTextPaletteObject[variant] = classNames.default.baseRoot
      }
    }
  }

  const nestedPaletteObject: MakUiNestedPalette = {
    color: colorPaletteObject,
    text: textPaletteObject,
    border: borderPaletteObject,
    theme: themePaletteObject,
  }

  const simpleNestedPaletteObject: MakUiSimpleNestedPalette = {
    color: simpleColorPaletteObject,
    text: simpleTextPaletteObject,
    border: simpleBorderPaletteObject,
    theme: simpleThemePaletteObject,
  }

  return {
    colorPaletteObject,
    simpleColorPaletteObject,
    textPaletteObject,
    simpleTextPaletteObject,
    borderPaletteObject,
    simpleBorderPaletteObject,
    themePaletteObject,
    simpleThemePaletteObject,
    nestedPaletteObject,
    simpleNestedPaletteObject,
  }
}
