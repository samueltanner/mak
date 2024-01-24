import {
  ensureNestedObject,
  extractInitialPalette,
  getConstructedTheme,
  getConstructedStates,
  twColorHelper,
} from "../functions/helpers"
import {
  paletteShorthand,
  uiThemeColorVariantsAndRoots,
} from "../constants/defaults/default-constants"
import {
  MakUiFlexiblePaletteInput,
  MakUiInteractionStateKey,
  MakUiSimplePalette,
  MakUiState,
  MakUiStateShades,
  MakUiThemeKey,
  MakUiThemeShades,
  MakUiVerbosePalette,
} from "../types/ui-types"
import {
  makUiDefaultColors,
  makUiDefaultPalette,
  makUiPalettes,
  makUiVariants,
} from "../constants/ui-constants"

export const paletteFactory = ({
  paletteInput,
  enabledThemeModes,
  defaultShades,
  enabledInteractionStates,
}: {
  paletteInput: MakUiFlexiblePaletteInput
  enabledThemeModes: MakUiThemeKey[]
  enabledInteractionStates: MakUiInteractionStateKey[]
  defaultShades: {
    defaultThemeShades: MakUiThemeShades
    defaultStateShades: MakUiStateShades
  }
}) => {
  const initialVerbosePalette = extractInitialPalette({ palette: paletteInput })

  let finalVerbosePalette = {} as MakUiVerbosePalette
  let finalSimplePalette = {} as MakUiSimplePalette
  for (const theme of enabledThemeModes) {
    for (const paletteVariant of makUiPalettes) {
      if (paletteVariant === "theme") {
        if (initialVerbosePalette?.[theme]?.["theme"]) {
          const providedVariant = initialVerbosePalette[theme].theme
          const constructedTheme = getConstructedTheme({
            providedVariants: providedVariant,
            theme,
            defaultShades: defaultShades.defaultThemeShades,
          })

          ensureNestedObject({
            parent: finalVerbosePalette,
            keys: [theme, paletteVariant],
            value: constructedTheme,
          })

          const { primary, secondary, tertiary, custom } = constructedTheme

          ensureNestedObject({
            parent: finalSimplePalette,
            keys: [theme, paletteVariant],
            value: {
              primary,
              secondary,
              tertiary,
              custom,
            },
          })
        } else {
          const defaultVariant = makUiDefaultPalette[theme]!.theme

          const constructedTheme = getConstructedTheme({
            providedVariants: defaultVariant,
            theme,
            defaultShades: defaultShades.defaultThemeShades,
          })

          ensureNestedObject({
            parent: finalVerbosePalette,
            keys: [theme, paletteVariant],
            value: constructedTheme,
          })

          const { primary, secondary, tertiary, custom } = constructedTheme

          ensureNestedObject({
            parent: finalSimplePalette,
            keys: [theme, paletteVariant],
            value: {
              primary,
              secondary,
              tertiary,
              custom,
            },
          })
        }
        const shorthand = paletteShorthand[paletteVariant]
        // Object.defineProperty(finalVerbosePalette[theme], shorthand, {
        //   get: function () {
        //     return finalVerbosePalette[theme][paletteVariant]
        //   },
        // })

        // Object.defineProperty(finalSimplePalette[theme], shorthand, {
        //   get: function () {
        //     return finalSimplePalette[theme][paletteVariant]
        //   },
        // })

        for (const colorVariant of uiThemeColorVariantsAndRoots) {
          const shorthand = paletteShorthand[colorVariant]
          // Object.defineProperty(
          //   finalVerbosePalette[theme][paletteVariant],
          //   shorthand,
          //   {
          //     get: function () {
          //       return finalVerbosePalette[theme][paletteVariant][colorVariant]
          //     },
          //   }
          // )
          if (
            colorVariant !== "customRoot" &&
            colorVariant !== "primaryRoot" &&
            colorVariant !== "secondaryRoot" &&
            colorVariant !== "tertiaryRoot"
          ) {
            // Object.defineProperty(
            //   finalSimplePalette[theme][paletteVariant],
            //   shorthand,
            //   {
            //     get: function () {
            //       return finalSimplePalette[theme][paletteVariant][colorVariant]
            //     },
            //   }
            // )
          }
        }
        continue
      }
      for (const variant of makUiVariants) {
        if (initialVerbosePalette?.[theme]?.[paletteVariant]?.[variant]) {
          const providedStates =
            initialVerbosePalette[theme][paletteVariant][variant]

          const constructedStates = getConstructedStates({
            providedStates,
            defaultShades: defaultShades.defaultStateShades,
            theme,
          })

          ensureNestedObject({
            parent: finalVerbosePalette,
            keys: [theme, paletteVariant, variant],
            value: constructedStates,
          })

          const enabledSimpleStates = enabledInteractionStates.reduce(
            (acc, curr) => {
              if (constructedStates[curr]) {
                acc[curr] = constructedStates[curr]
              }
              return acc
            },
            {} as MakUiState
          )
          enabledSimpleStates.base = constructedStates.base

          ensureNestedObject({
            parent: finalSimplePalette,
            keys: [theme, paletteVariant, variant],
            value: enabledSimpleStates,
          })
        } else if (
          !initialVerbosePalette?.[theme]?.[paletteVariant]?.[variant]
        ) {
          const shade =
            paletteVariant === "text" && theme === "dark"
              ? 950
              : paletteVariant === "text" && theme === "light"
              ? 50
              : 500
          const baseColor = twColorHelper({
            colorString: makUiDefaultColors[variant],
            shade: shade,
          }).rootString
          const constructedStates = getConstructedStates({
            providedStates: {
              base: baseColor,
            } as MakUiState,
            defaultShades: defaultShades.defaultStateShades,
            theme,
          })

          ensureNestedObject({
            parent: finalVerbosePalette,
            keys: [theme, paletteVariant, variant],
            value: constructedStates,
          })

          const enabledSimpleStates = enabledInteractionStates.reduce(
            (acc, curr) => {
              if (constructedStates[curr]) {
                acc[curr] = constructedStates[curr]
              }
              return acc
            },
            {} as MakUiState
          )
          enabledSimpleStates.base = constructedStates.base

          ensureNestedObject({
            parent: finalSimplePalette,
            keys: [theme, paletteVariant, variant],
            value: enabledSimpleStates,
          })
        }
      }
      const shorthand = paletteShorthand[paletteVariant]
      // Object.defineProperty(finalVerbosePalette[theme], shorthand, {
      //   get: function () {
      //     return finalVerbosePalette[theme][paletteVariant]
      //   },
      // })
      // Object.defineProperty(finalSimplePalette[theme], shorthand, {
      //   get: function () {
      //     return finalSimplePalette[theme][paletteVariant]
      //   },
      // })
    }
    const shorthand = paletteShorthand[theme]
    // Object.defineProperty(finalVerbosePalette, shorthand, {
    //   get: function () {
    //     return finalVerbosePalette[theme]
    //   },
    // })
    // Object.defineProperty(finalSimplePalette, shorthand, {
    //   get: function () {
    //     return finalSimplePalette[theme]
    //   },
    // })
  }

  return {
    verbose: finalVerbosePalette as MakUiVerbosePalette,
    simple: finalSimplePalette as MakUiSimplePalette,
  }
}
