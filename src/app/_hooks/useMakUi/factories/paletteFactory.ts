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
  enabledModes,
  defaultShades,
}: {
  paletteInput: MakUiFlexiblePaletteInput
  enabledModes: MakUiThemeKey[]
  defaultShades: {
    defaultThemeShades: MakUiThemeShades
    defaultStateShades: MakUiStateShades
  }
}) => {
  const initialVerbosePalette = extractInitialPalette({ palette: paletteInput })

  let finalVerbosePalette = {} as MakUiVerbosePalette
  let finalSimplePalette = {} as MakUiSimplePalette
  for (const theme of enabledModes) {
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

          const {
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

          console.log(theme, paletteVariant, variant, constructedStates)

          ensureNestedObject({
            parent: finalVerbosePalette,
            keys: [theme, paletteVariant, variant],
            value: constructedStates,
          })

          const {
            base,
            focus,
            hover,
            disabled,
            active,
            selected,
            default: defaultState,
            click,
          } = constructedStates

          ensureNestedObject({
            parent: finalSimplePalette,
            keys: [theme, paletteVariant, variant],
            value: {
              base,
              active,
              click,
              focus,
              hover,
              disabled,
              selected,
              default: defaultState,
            },
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

          const {
            base,
            focus,
            hover,
            disabled,
            active,
            selected,
            default: defaultState,
            click,
          } = constructedStates

          ensureNestedObject({
            parent: finalSimplePalette,
            keys: [theme, paletteVariant, variant],
            value: {
              base,
              active,
              click,
              focus,
              hover,
              disabled,
              selected,
              default: defaultState,
            },
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
