import {
  extractInitialPalette,
  getConstructedTheme,
  getConstructedStates,
  twColorHelper,
  getConstructedShades,
} from "../functions/helpers"
import {
  MakUiFlexiblePaletteInput,
  MakUiInteractionStateKey,
  MakUiSimplePalette,
  MakUiState,
  MakUiStateShades,
  MakUiThemeKey,
  MakUiThemeShades,
  MakUiVerbosePalette,
  ShadeStep,
} from "../types/ui-types"
import {
  makUiDefaultColors,
  makUiDefaultPalette,
  makUiPalettes,
  makUiVariants,
} from "../constants/ui-constants"
import { ensureNestedObject } from "@/globals/global-helper-functions"

export const paletteFactory = ({
  paletteInput,
  enabledThemeModes,
  defaultShades,
  shadeStep,
  enabledInteractionStates,
  includeBlackAndWhite,
  includeNearAbsolutes,
  blackHex,
  whiteHex,
}: {
  paletteInput: MakUiFlexiblePaletteInput
  enabledThemeModes: MakUiThemeKey[]
  enabledInteractionStates: MakUiInteractionStateKey[]
  defaultShades: MakUiThemeShades
  shadeStep: ShadeStep
  includeBlackAndWhite: boolean
  includeNearAbsolutes: boolean
  blackHex: string
  whiteHex: string
}) => {
  const initialVerbosePalette = extractInitialPalette({
    palette: paletteInput,
    enabledThemeModes,
  })

  console.log("initialVerbosePalette", initialVerbosePalette)

  let finalVerbosePalette = {} as MakUiVerbosePalette
  let finalSimplePalette = {} as MakUiSimplePalette
  for (const theme of enabledThemeModes) {
    for (const paletteVariant of makUiPalettes) {
      if (paletteVariant === "theme") {
        if (initialVerbosePalette?.[theme]?.["theme"]) {
          const providedVariants = initialVerbosePalette[theme].theme

          const constructedTheme = getConstructedTheme({
            providedVariants,
            theme,
            defaultShades: defaultShades,
          })

          ensureNestedObject({
            parent: finalVerbosePalette,
            keys: [theme, paletteVariant],
            value: constructedTheme,
          })

          const { primary, secondary, tertiary, custom, light, dark } =
            constructedTheme

          ensureNestedObject({
            parent: finalSimplePalette,
            keys: [theme, paletteVariant],
            value: {
              primary,
              secondary,
              tertiary,
              custom,
              light,
              dark,
            },
          })
        } else {
          const defaultVariant = makUiDefaultPalette[theme]!.theme
          const constructedTheme = getConstructedTheme({
            providedVariants: defaultVariant,
            theme,
            defaultShades: defaultShades,
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
        // const shorthand = paletteShorthand[paletteVariant]
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

        // for (const colorVariant of uiThemeColorVariantsAndRoots) {
        //   const shorthand = paletteShorthand[colorVariant]
        //   // Object.defineProperty(
        //   //   finalVerbosePalette[theme][paletteVariant],
        //   //   shorthand,
        //   //   {
        //   //     get: function () {
        //   //       return finalVerbosePalette[theme][paletteVariant][colorVariant]
        //   //     },
        //   //   }
        //   // )
        //   if (
        //     colorVariant !== "customRoot" &&
        //     colorVariant !== "primaryRoot" &&
        //     colorVariant !== "secondaryRoot" &&
        //     colorVariant !== "tertiaryRoot"
        //   ) {
        //     // Object.defineProperty(
        //     //   finalSimplePalette[theme][paletteVariant],
        //     //   shorthand,
        //     //   {
        //     //     get: function () {
        //     //       return finalSimplePalette[theme][paletteVariant][colorVariant]
        //     //     },
        //     //   }
        //     // )
        //   }
        // }
        continue
      }
      for (const variant of makUiVariants) {
        if (initialVerbosePalette?.[theme]?.[paletteVariant]?.[variant]) {
          const providedShades =
            initialVerbosePalette[theme][paletteVariant][variant]

          const constructedShades = getConstructedShades({
            defaultColor: makUiDefaultColors[variant],
            middleHex: providedShades?.["500"],
            providedShades,
            variant: variant,
            steps: shadeStep,
            includeBlackAndWhite,
            includeNearAbsolutes,
            blackHex,
            whiteHex,
          })

          // const constructedStates = getConstructedStates({
          //   providedShades,
          //   defaultShades: defaultShades.defaultStateShades,
          //   theme,
          // })

          ensureNestedObject({
            parent: finalVerbosePalette,
            keys: [theme, paletteVariant, variant],
            value: constructedShades,
          })

          // const enabledSimpleStates = enabledInteractionStates.reduce(
          //   (acc, curr) => {
          //     if (constructedStates[curr]) {
          //       acc[curr] = constructedStates[curr]
          //     }
          //     return acc
          //   },
          //   {} as MakUiState
          // )

          // enabledSimpleStates.base = constructedStates.base

          ensureNestedObject({
            parent: finalSimplePalette,
            keys: [theme, paletteVariant, variant],
            value: constructedShades,
          })

          if (
            paletteVariant === "color" &&
            !initialVerbosePalette?.[theme]?.border?.[variant]
          ) {
            ensureNestedObject({
              parent: finalVerbosePalette,
              keys: [theme, "border", variant],
              value: constructedShades,
            })

            ensureNestedObject({
              parent: finalSimplePalette,
              keys: [theme, "border", variant],
              value: constructedShades,
            })
          }
        } else if (
          !initialVerbosePalette?.[theme]?.[paletteVariant]?.[variant] &&
          !finalVerbosePalette?.[theme]?.[paletteVariant]?.[variant]
        ) {
          const shade =
            paletteVariant === "text" && theme === "dark"
              ? 950
              : paletteVariant === "text" && theme === "light"
              ? 50
              : 500

          const constructedShades = getConstructedShades({
            middleHex: makUiDefaultColors?.[variant],
            variant: variant,
            steps: shadeStep,
            includeBlackAndWhite,
            includeNearAbsolutes,
            blackHex,
            whiteHex,
          })

          // const baseColor = twColorHelper({
          //   colorString: makUiDefaultColors[variant],
          //   shade: shade,
          // }).hex
          // const constructedStates = getConstructedStates({
          //   providedStates: {
          //     base: baseColor,
          //   } as MakUiState,
          //   defaultShades: defaultShades.defaultStateShades,
          //   theme,
          // })

          ensureNestedObject({
            parent: finalVerbosePalette,
            keys: [theme, paletteVariant, variant],
            value: constructedShades,
          })

          // const enabledSimpleStates = enabledInteractionStates.reduce(
          //   (acc, curr) => {
          //     if (constructedStates[curr]) {
          //       acc[curr] = constructedStates[curr]
          //     }
          //     return acc
          //   },
          //   {} as MakUiState
          // )
          // enabledSimpleStates.base = constructedStates.base

          // ensureNestedObject({
          //   parent: finalSimplePalette,
          //   keys: [theme, paletteVariant, variant],
          //   value: enabledSimpleStates,
          // })
        }
      }
      // const shorthand = paletteShorthand[paletteVariant]
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
    // const shorthand = paletteShorthand[theme]
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
