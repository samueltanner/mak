import {
  extractInitialPalette,
  getConstructedTheme,
  getConstructedShades,
} from "../functions/helpers"
import {
  MakUiFlexiblePaletteInput,
  MakUiInteractionStateKey,
  MakUiSimplePalette,
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
  includeBlackAndWhite,
  includeNearAbsolutes,
  altBlack,
  altWhite,
}: {
  paletteInput: MakUiFlexiblePaletteInput
  enabledThemeModes: MakUiThemeKey[]
  defaultShades: MakUiThemeShades
  shadeStep: ShadeStep
  includeBlackAndWhite: boolean
  includeNearAbsolutes: boolean
  altBlack: string
  altWhite: string
}) => {
  const initialVerbosePalette = extractInitialPalette({
    palette: paletteInput,
    enabledThemeModes,
  })

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
            altBlack,
            altWhite,
          })

          ensureNestedObject({
            parent: finalVerbosePalette,
            keys: [theme, paletteVariant],
            value: constructedTheme,
          })

          ensureNestedObject({
            parent: finalSimplePalette,
            keys: [theme, paletteVariant],
            value: constructedTheme,
          })
        } else {
          const defaultVariant = makUiDefaultPalette[theme]!.theme
          const constructedTheme = getConstructedTheme({
            providedVariants: defaultVariant,
            theme,
            defaultShades: defaultShades,
            altBlack,
            altWhite,
          })

          ensureNestedObject({
            parent: finalVerbosePalette,
            keys: [theme, paletteVariant],
            value: constructedTheme,
          })

          ensureNestedObject({
            parent: finalSimplePalette,
            keys: [theme, paletteVariant],
            value: constructedTheme,
          })
        }
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
            altBlack,
            altWhite,
          })

          ensureNestedObject({
            parent: finalVerbosePalette,
            keys: [theme, paletteVariant, variant],
            value: constructedShades,
          })

          ensureNestedObject({
            parent: finalSimplePalette,
            keys: [theme, paletteVariant, variant],
            value: {
              "0": constructedShades["0"],
              "50": constructedShades["50"],
              "100": constructedShades["100"],
              "200": constructedShades["200"],
              "300": constructedShades["300"],
              "400": constructedShades["400"],
              "500": constructedShades["500"],
              "600": constructedShades["600"],
              "700": constructedShades["700"],
              "800": constructedShades["800"],
              "900": constructedShades["900"],
              "950": constructedShades["950"],
              "1000": constructedShades["1000"],
            },
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
              value: {
                "0": constructedShades["0"],
                "50": constructedShades["50"],
                "100": constructedShades["100"],
                "200": constructedShades["200"],
                "300": constructedShades["300"],
                "400": constructedShades["400"],
                "500": constructedShades["500"],
                "600": constructedShades["600"],
                "700": constructedShades["700"],
                "800": constructedShades["800"],
                "900": constructedShades["900"],
                "950": constructedShades["950"],
                "1000": constructedShades["1000"],
              },
            })
          }
        } else if (
          !initialVerbosePalette?.[theme]?.[paletteVariant]?.[variant] &&
          !finalVerbosePalette?.[theme]?.[paletteVariant]?.[variant]
        ) {
          const constructedShades = getConstructedShades({
            middleHex: makUiDefaultColors?.[variant],
            variant: variant,
            steps: shadeStep,
            includeBlackAndWhite,
            includeNearAbsolutes,
            altBlack,
            altWhite,
            hexPosition:
              variant === "dark" ? 1000 : variant === "light" ? 0 : 500,
          })

          ensureNestedObject({
            parent: finalVerbosePalette,
            keys: [theme, paletteVariant, variant],
            value: constructedShades,
          })

          ensureNestedObject({
            parent: finalSimplePalette,
            keys: [theme, paletteVariant, variant],
            value: {
              "0": constructedShades["0"],
              "50": constructedShades["50"],
              "100": constructedShades["100"],
              "200": constructedShades["200"],
              "300": constructedShades["300"],
              "400": constructedShades["400"],
              "500": constructedShades["500"],
              "600": constructedShades["600"],
              "700": constructedShades["700"],
              "800": constructedShades["800"],
              "900": constructedShades["900"],
              "950": constructedShades["950"],
              "1000": constructedShades["1000"],
            },
          })
        }
      }
    }
  }

  Object.defineProperties(finalVerbosePalette.dark, {
    bg: {
      get() {
        return finalVerbosePalette.dark.color
      },
    },
    // ring: {
    //   get() {
    //     return finalVerbosePalette.dark.border
    //   },
    // },
    // outline: {
    //   get() {
    //     return finalVerbosePalette.dark.border
    //   },
    // },
    // "ring-offset": {
    //   get() {
    //     return finalVerbosePalette.dark.border
    //   },
    // },
  })

  Object.defineProperties(finalVerbosePalette.light, {
    bg: {
      get() {
        return finalVerbosePalette.light.color
      },
    },
    // ring: {
    //   get() {
    //     return finalVerbosePalette.dark.border
    //   },
    // },
    // outline: {
    //   get() {
    //     return finalVerbosePalette.dark.border
    //   },
    // },
    // "ring-offset": {
    //   get() {
    //     return finalVerbosePalette.dark.border
    //   },
    // },
  })

  return {
    verbose: finalVerbosePalette as MakUiVerbosePalette,
    simple: finalSimplePalette as MakUiSimplePalette,
  }
}
