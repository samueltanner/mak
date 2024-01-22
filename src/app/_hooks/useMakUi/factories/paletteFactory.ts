import {
  getConstructedClassNames,
  ensureNestedObject,
  extractInitialPalette,
  getConstructedTheme,
} from "../functions/helpers"
import {
  MakUiInteraction,
  MakUiPaletteInput,
  MakUiSimplePalettes,
  MakUiVerbosePalettes,
  MakUiVariants,
  MakUiVerbosePalettesShortHand,
  MakUiSimplePalettesShortHand,
  MakUiThemeMode,
} from "../types/default-types"
import {
  uiDefaultColorPaletteInput,
  uiPaletteVariants,
  uiStates,
  uiVariants,
  uiDefaultThemePaletteInput,
  uiThemes,
  uiInteractions,
  uiDefaultSimpleTextPalette,
  paletteShorthand,
  uiInteractionsAndRoots,
  uiThemeColorVariantsAndRoots,
} from "../constants/defaults/default-constants"

export const paletteFactory = ({
  paletteInput,
  enabledModes,
}: {
  paletteInput: MakUiPaletteInput
  enabledModes: MakUiThemeMode[]
}) => {
  const initialVerbosePalette = extractInitialPalette({ palette: paletteInput })

  let finalVerbosePalette = {} as MakUiVerbosePalettes
  let finalSimplePalette = {} as MakUiSimplePalettes
  for (const theme of enabledModes) {
    for (const paletteVariant of uiPaletteVariants) {
      if (paletteVariant === "theme") {
        if (initialVerbosePalette?.[theme]?.[paletteVariant]) {
          const providedVariant = initialVerbosePalette[theme][paletteVariant]
          const constructedTheme = getConstructedTheme(providedVariant, theme)

          ensureNestedObject({
            parent: finalVerbosePalette,
            keys: [theme, paletteVariant],
            value: constructedTheme,
          })

          const {
            primary: primary,
            secondary: secondary,
            tertiary: tertiary,
            custom: custom,
            primaryRoot: primaryRoot,
            secondaryRoot: secondaryRoot,
            tertiaryRoot: tertiaryRoot,
            customRoot: customRoot,
          } = constructedTheme

          ensureNestedObject({
            parent: finalSimplePalette,
            keys: [theme, paletteVariant],
            value: {
              primary: primaryRoot,
              secondary: secondaryRoot,
              tertiary: tertiaryRoot,
              custom: customRoot,
            },
          })
        } else {
          const constructedTheme = getConstructedTheme(
            uiDefaultThemePaletteInput?.[theme],
            theme
          )

          ensureNestedObject({
            parent: finalVerbosePalette,
            keys: [theme, paletteVariant],
            value: constructedTheme,
          })

          const {
            primaryRoot: primary,
            secondaryRoot: secondary,
            tertiaryRoot: tertiary,
            customRoot: custom,
          } = constructedTheme

          ensureNestedObject({
            parent: finalSimplePalette,
            keys: [theme, paletteVariant],
            value: {
              primary: primary,
              secondary: secondary,
              tertiary: tertiary,
              custom: custom,
            },
          })
        }
        const shorthand = paletteShorthand[paletteVariant]
        Object.defineProperty(finalVerbosePalette[theme], shorthand, {
          get: function () {
            return finalVerbosePalette[theme][paletteVariant]
          },
        })

        Object.defineProperty(finalSimplePalette[theme], shorthand, {
          get: function () {
            return finalSimplePalette[theme][paletteVariant]
          },
        })

        for (const colorVariant of uiThemeColorVariantsAndRoots) {
          const shorthand = paletteShorthand[colorVariant]
          Object.defineProperty(
            finalVerbosePalette[theme][paletteVariant],
            shorthand,
            {
              get: function () {
                return finalVerbosePalette[theme][paletteVariant][colorVariant]
              },
            }
          )
          if (
            colorVariant !== "customRoot" &&
            colorVariant !== "primaryRoot" &&
            colorVariant !== "secondaryRoot" &&
            colorVariant !== "tertiaryRoot"
          ) {
            Object.defineProperty(
              finalSimplePalette[theme][paletteVariant],
              shorthand,
              {
                get: function () {
                  return finalSimplePalette[theme][paletteVariant][colorVariant]
                },
              }
            )
          }
        }
        continue
      }
      for (const variant of uiVariants) {
        if (initialVerbosePalette?.[theme]?.[paletteVariant]?.[variant]) {
          const providedState =
            initialVerbosePalette[theme][paletteVariant][variant]

          const constructedClassNames = getConstructedClassNames({
            interactions: providedState as MakUiVariants,
            state: "all",
          })

          ensureNestedObject({
            parent: finalVerbosePalette,
            keys: [theme, paletteVariant, variant],
            value: constructedClassNames,
          })

          const {
            baseRoot: base,
            clickRoot: click,
            hoverRoot: hover,
            focusRoot: focus,
          } = constructedClassNames.default

          ensureNestedObject({
            parent: finalSimplePalette,
            keys: [theme, paletteVariant, variant],
            value: {
              base,
              click,
              hover,
              focus,
            },
          })
        } else if (
          !initialVerbosePalette?.[theme]?.[paletteVariant]?.[variant]
        ) {
          if (paletteVariant === "color" || paletteVariant === "border") {
            const classNames = getConstructedClassNames({
              color: uiDefaultColorPaletteInput?.[variant] as MakUiInteraction,
              state: "all",
              theme,
            })

            ensureNestedObject({
              parent: finalVerbosePalette,
              keys: [theme, paletteVariant, variant],
              value: classNames,
            })

            const {
              baseRoot: base,
              clickRoot: click,
              hoverRoot: hover,
              focusRoot: focus,
            } = classNames.default

            ensureNestedObject({
              parent: finalSimplePalette,
              keys: [theme, paletteVariant, variant],
              value: {
                base,
                click,
                hover,
                focus,
              },
            })
          }
          if (paletteVariant === "text") {
            const classNames = getConstructedClassNames({
              color: uiDefaultSimpleTextPalette?.[variant] as MakUiInteraction,
              state: "all",
              theme,
            })

            ensureNestedObject({
              parent: finalVerbosePalette,
              keys: [theme, paletteVariant, variant],
              value: classNames,
            })

            const {
              baseRoot: base,
              clickRoot: click,
              hoverRoot: hover,
              focusRoot: focus,
            } = classNames.default

            ensureNestedObject({
              parent: finalSimplePalette,
              keys: [theme, paletteVariant, variant],
              value: {
                base,
                click,
                hover,
                focus,
              },
            })
          }
        }
        const shorthand = paletteShorthand[variant]
        Object.defineProperty(
          finalVerbosePalette[theme][paletteVariant],
          shorthand,
          {
            get: function () {
              return finalVerbosePalette[theme][paletteVariant][variant]
            },
          }
        )
        Object.defineProperty(
          finalSimplePalette[theme][paletteVariant],
          shorthand,
          {
            get: function () {
              return finalSimplePalette[theme][paletteVariant][variant]
            },
          }
        )
        for (const interaction of uiInteractions) {
          const shorthand = paletteShorthand[interaction]
          Object.defineProperty(
            finalSimplePalette[theme][paletteVariant][variant],
            shorthand,
            {
              get: function () {
                const asdf = finalSimplePalette[theme][paletteVariant][variant]
                return finalSimplePalette[theme][paletteVariant][variant][
                  interaction
                ]
              },
            }
          )
        }
        for (const state of uiStates) {
          const shorthand = paletteShorthand[state]

          Object.defineProperty(
            finalVerbosePalette[theme][paletteVariant][variant],
            shorthand,
            {
              get: function () {
                return finalVerbosePalette[theme][paletteVariant][variant][
                  state
                ]
              },
            }
          )
          for (const interaction of uiInteractionsAndRoots) {
            const shorthand = paletteShorthand[interaction]
            Object.defineProperty(
              finalVerbosePalette[theme][paletteVariant][variant][state],
              shorthand,
              {
                get: function () {
                  return finalVerbosePalette[theme][paletteVariant][variant][
                    state
                  ][interaction]
                },
              }
            )
          }
        }
      }
      const shorthand = paletteShorthand[paletteVariant]
      Object.defineProperty(finalVerbosePalette[theme], shorthand, {
        get: function () {
          return finalVerbosePalette[theme][paletteVariant]
        },
      })
      Object.defineProperty(finalSimplePalette[theme], shorthand, {
        get: function () {
          return finalSimplePalette[theme][paletteVariant]
        },
      })
    }
    const shorthand = paletteShorthand[theme]
    Object.defineProperty(finalVerbosePalette, shorthand, {
      get: function () {
        return finalVerbosePalette[theme]
      },
    })
    Object.defineProperty(finalSimplePalette, shorthand, {
      get: function () {
        return finalSimplePalette[theme]
      },
    })
  }

  return {
    verbose: finalVerbosePalette as
      | MakUiVerbosePalettes
      | MakUiVerbosePalettesShortHand,
    simple: finalSimplePalette as
      | MakUiSimplePalettes
      | MakUiSimplePalettesShortHand,
  }
}
