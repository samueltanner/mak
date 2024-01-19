import {
  isObject,
  separatePalettes,
  getThemeShades,
  twColorHelper,
  getConstructedClassNames,
  handleThemes,
  deepMerge,
  isEmptyObject,
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
  MakUiInteractions,
  MakUiState,
  VariantInput,
  StateInput,
  MakUiVariants,
} from "../types/default-types"
import {
  uiDefaultColorPaletteInput,
  uiDefaultTextPaletteInput,
  uiPaletteVariants,
  uiStates,
  uiVariants,
  uiDefaultThemePaletteInput,
  uiThemes,
  uiInteractions,
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

  for (const themeVariant of uiPaletteVariants) {
    if (themeVariant === "theme") {
      continue
    }

    for (const variant of uiVariants) {
      const targetPalette =
        themeVariant === "color"
          ? colorPalette
          : themeVariant === "text"
          ? textPalette
          : themeVariant === "border"
          ? borderPalette
          : colorPalette

      const targetPaletteObject =
        themeVariant === "color"
          ? colorPaletteObject
          : themeVariant === "text"
          ? textPaletteObject
          : themeVariant === "border"
          ? borderPaletteObject
          : colorPaletteObject

      let targetSimplePaletteObject =
        themeVariant === "color"
          ? simpleColorPaletteObject
          : themeVariant === "text"
          ? simpleTextPaletteObject
          : themeVariant === "border"
          ? simpleBorderPaletteObject
          : simpleColorPaletteObject

      const providedVariant: VariantInput | undefined = targetPalette?.[variant]

      if (typeof providedVariant === "string") {
        const { dark, light, custom } = handleThemes(providedVariant)

        const classNames = getConstructedClassNames({
          color: light,
          state: "all",
        })

        const darkClassNames = getConstructedClassNames({
          color: dark,
          state: "all",
          theme: "dark",
        })

        const customClassNames = getConstructedClassNames({
          color: custom,
          state: "all",
          theme: "custom",
        })

        targetPaletteObject[variant] = {
          ...targetPaletteObject[variant],
          ...deepMerge(classNames, darkClassNames, customClassNames),
        }
        // targetSimplePaletteObject[variant] = classNames.default.baseRoot
        // targetSimplePaletteObject[`${variant}Dark`] =
        //   darkClassNames.default.baseRootDark
        // targetSimplePaletteObject[`${variant}Custom`] =
        //   customClassNames.default.baseRootCustom
      }

      for (const state of uiStates) {
        let constructedStateObject = {} as MakUiStates
        const providedState: StateInput | undefined =
          providedVariant?.[state as keyof StateInput]
        if (isObject(providedState) && !isEmptyObject(providedState)) {
          for (const interaction of uiInteractions) {
            const providedInteraction: string | undefined =
              providedState?.[interaction as keyof MakUiInteractions]
            if (typeof providedInteraction === "string") {
              const {
                light: lightInteraction,
                dark: darkInteraction,
                custom: customInteraction,
              } = handleThemes(providedInteraction)

              const { colorString, rootString } = twColorHelper({
                colorString: lightInteraction,
              })

              const {
                colorString: darkColorString,
                rootString: darkRootString,
              } = twColorHelper({
                colorString: darkInteraction,
              })

              const {
                colorString: customColorString,
                rootString: customRootString,
              } = twColorHelper({
                colorString: customInteraction,
              })

              constructedStateObject = {
                ...constructedStateObject,
                [interaction]: colorString,
                [`${interaction}Root`]: rootString,
                [`${interaction}Dark`]: darkColorString,
                [`${interaction}RootDark`]: darkRootString,
                [`${interaction}Custom`]: customColorString,
                [`${interaction}RootCustom`]: customRootString,
              }
            }
            const existingBase = constructedStateObject.base
            const missingInteractionClassNames = getConstructedClassNames({
              color: existingBase,
              interactions: constructedStateObject,
              theme: "all",
            })[state]
            constructedStateObject = missingInteractionClassNames

            const targetPaletteVariantObject = targetPaletteObject?.[variant]
            const targetPaletteStateObject = targetPaletteVariantObject?.[state]

            targetPaletteObject[variant] = {
              ...targetPaletteObject[variant],
              [state]: {
                ...targetPaletteStateObject,
                ...constructedStateObject,
              },
            }
          }
        } else if (typeof providedState === "string") {
          const { light, dark, custom } = handleThemes(providedState)
          const classNames = getConstructedClassNames({
            color: light,
            state: state,
          })[state]

          const darkClassNames = getConstructedClassNames({
            color: dark,
            state: state,
            theme: "dark",
          })[state]

          const customClassNames = getConstructedClassNames({
            color: custom,
            state: state,
            theme: "custom",
          })[state]

          const mergedClassNames = deepMerge(
            classNames,
            darkClassNames,
            customClassNames
          )

          console.log({ classNames })

          const targetPaletteVariantObject = targetPaletteObject?.[variant]
          const targetPaletteStateObject = targetPaletteVariantObject?.[state]
          targetPaletteObject[variant] = {
            ...targetPaletteObject[variant],
            [state]: {
              ...targetPaletteStateObject,
              ...mergedClassNames,
            },
          }
          // targetSimplePaletteObject[interaction] = classNames.baseRoot
          // targetSimplePaletteObject[`${interaction}Dark`] =
          //   darkClassNames.baseRoot
          // targetSimplePaletteObject[`${interaction}Custom`] =
          //   customClassNames.baseRoot
        } else if (!providedState && !targetPaletteObject?.[variant]?.[state]) {
          for (const interaction of uiInteractions) {
            if (!targetPaletteObject?.[variant]?.[state]?.[interaction]) {
              // console.log({ themeVariant, variant, state, interaction })
            }
          }
        }
      }

      if (!colorPaletteObject?.[variant]) {
        const classNames = getConstructedClassNames({
          color: uiDefaultColorPaletteInput[variant] as Interaction,
          theme: "all",
          state: "all",
        })

        colorPaletteObject[variant] = {
          ...targetPaletteObject[variant],
          ...classNames,
        }
        // simpleColorPaletteObject[variant] = classNames.default.baseRoot
        // simpleColorPaletteObject[`${variant}Dark`] =
        //   classNames.default.baseRootDark
        // simpleColorPaletteObject[`${variant}Custom`] =
        //   classNames.default.baseRootCustom
      }
      if (!borderPaletteObject?.[variant]) {
        borderPaletteObject[variant] = {
          ...colorPaletteObject?.[variant],
        }
        // simpleBorderPaletteObject[variant] = simpleColorPaletteObject?.[variant]
        // simpleBorderPaletteObject[`${variant}Dark`] =
        //   simpleColorPaletteObject?.[`${variant}Dark`]
        // simpleBorderPaletteObject[`${variant}Custom`] =
        //   simpleColorPaletteObject?.[`${variant}Custom`]
      }
      if (!textPaletteObject?.[variant]) {
        const classNames = getConstructedClassNames({
          color: uiDefaultTextPaletteInput?.[variant] as Interaction,
          state: "all",
          theme: "all",
        })

        textPaletteObject[variant] = {
          ...targetPaletteObject[variant],
          ...classNames,
        }
        // simpleTextPaletteObject[variant] = classNames.default.baseRoot
        // simpleTextPaletteObject[`${variant}Dark`] =
        //   classNames.default.baseRootDark
        // simpleTextPaletteObject[`${variant}Custom`] =
        //   classNames.default.baseRoot
      }
    }
  }
  console.log({ colorPaletteObject, simpleColorPaletteObject })

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
