import {
  isObject,
  separatePalettes,
  getThemeShades,
  twColorHelper,
  getConstructedClassNames,
  handleThemes,
  deepMerge,
  isEmptyObject,
  ensureNestedObject,
  separateObjectByKey,
  splitKeyAtChar,
} from "../functions/helpers"
import {
  MakUiInteraction,
  MakUiNestedPalette,
  MakUiPaletteInput,
  MakUiPalette,
  MakUiStates,
  MakUiThemePalette,
  MakUiThemeVariant,
  MakUiSimplePalettes,
  MakUiSimpleThemePalette,
  MakUiSimpleNestedPalette,
  MakUiInteractions,
  VariantInput,
  StateInput,
  MakUiSimplePalette,
  MakUiVerbosePalettes,
  MakUiVerboseTheme,
  MakUiSimpleTheme,
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
  let textPaletteObject = {} as MakUiPalette
  let borderPaletteObject = {} as MakUiPalette
  let themePaletteObject = {} as MakUiThemePalette

  let simpleColorPaletteObject = {} as MakUiSimplePalette
  let simpleTextPaletteObject = {} as MakUiSimplePalette
  let simpleBorderPaletteObject = {} as MakUiSimplePalette
  let simpleThemePaletteObject = {} as MakUiSimpleThemePalette

  let simplePaletteThemesObject = {
    light: {},
    dark: {},
    custom: {},
  } as MakUiSimplePalettes
  let paletteThemesObject = {
    light: {},
    dark: {},
    custom: {},
  } as MakUiVerbosePalettes

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

      const remainingVariants: MakUiThemeVariant[] = [
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
          shade: themeShades[shade as MakUiThemeVariant],
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

      if (!colorPaletteObject?.[variant]) {
        const classNames = getConstructedClassNames({
          color: uiDefaultColorPaletteInput[variant] as MakUiInteraction,
          theme: "all",
          state: "all",
        })

        colorPaletteObject[variant] = {
          ...targetPaletteObject[variant],
          ...classNames,
        }
        simpleColorPaletteObject[variant] = classNames.default.baseRoot
        simpleColorPaletteObject[`${variant}Dark`] =
          classNames.default.baseRootDark
        simpleColorPaletteObject[`${variant}Custom`] =
          classNames.default.baseRootCustom
      }
      if (!borderPaletteObject?.[variant]) {
        borderPaletteObject[variant] = {
          ...colorPaletteObject?.[variant],
        }
        simpleBorderPaletteObject[variant] = simpleColorPaletteObject?.[variant]
        simpleBorderPaletteObject[`${variant}Dark`] =
          simpleColorPaletteObject?.[`${variant}Dark`]
        simpleBorderPaletteObject[`${variant}Custom`] =
          simpleColorPaletteObject?.[`${variant}Custom`]
      }
      if (!textPaletteObject?.[variant]) {
        const classNames = getConstructedClassNames({
          color: uiDefaultTextPaletteInput?.[variant] as MakUiInteraction,
          state: "all",
          theme: "all",
        })

        textPaletteObject[variant] = {
          ...targetPaletteObject[variant],
          ...classNames,
        }
      }

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

          const targetPaletteVariantObject = targetPaletteObject?.[variant]
          const targetPaletteStateObject = targetPaletteVariantObject?.[state]
          targetPaletteObject[variant] = {
            ...targetPaletteObject[variant],
            [state]: {
              ...targetPaletteStateObject,
              ...mergedClassNames,
            },
          }
        }
        const lightVariant = targetPaletteObject[variant]
        const darkVariant = targetPaletteObject[variant]
        const customVariant = targetPaletteObject[variant]

        const { light, dark, custom } = separateObjectByKey({
          obj: targetPaletteObject[variant][state],
          keys: ["Dark", "Custom"],
          fallbackKey: "Light",
        })

        ensureNestedObject({
          parent: paletteThemesObject.light,
          keys: [
            themeVariant,
            variant as keyof MakUiVerboseTheme,
            state as keyof MakUiVerboseTheme,
          ],
          value: light,
        })

        ensureNestedObject({
          parent: paletteThemesObject.dark,
          keys: [
            themeVariant,
            variant as keyof MakUiVerboseTheme,
            state as keyof MakUiVerboseTheme,
          ],
          value: splitKeyAtChar(dark, "D"),
        })

        ensureNestedObject({
          parent: paletteThemesObject.custom,
          keys: [
            themeVariant,
            variant as keyof MakUiVerboseTheme,
            state as keyof MakUiVerboseTheme,
          ],
          value: splitKeyAtChar(custom, "C"),
        })

        ensureNestedObject({
          parent: simplePaletteThemesObject.light,
          keys: [themeVariant, variant as keyof MakUiSimpleTheme],
          value: light.baseRoot,
        })

        ensureNestedObject({
          parent: simplePaletteThemesObject.dark,
          keys: [themeVariant, variant as keyof MakUiSimpleTheme],
          value: dark.baseRootDark,
        })

        ensureNestedObject({
          parent: simplePaletteThemesObject.custom,
          keys: [themeVariant, variant as keyof MakUiVerboseTheme],
          value: custom.baseRootCustom,
        })
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

  paletteThemesObject.custom["theme"] = themePaletteObject.custom
  paletteThemesObject.dark["theme"] = themePaletteObject.dark
  paletteThemesObject.light["theme"] = themePaletteObject.light

  simplePaletteThemesObject.custom["theme"] = simpleThemePaletteObject.custom
  simplePaletteThemesObject.dark["theme"] = simpleThemePaletteObject.dark
  simplePaletteThemesObject.light["theme"] = simpleThemePaletteObject.light

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
    paletteThemesObject,
    simplePaletteThemesObject,
  }
}
