"use client"
import React, { createContext, useEffect, useMemo, useState } from "react"
import { paletteFactory } from "../factories/paletteFactory"
// import {
//   MakUiPaletteInput,
//   MakUiThemeMode,
//   MakUiVerbosePalettes,
//   MakUiSimpleTheme,
//   MakUiVerboseTheme,
//   MakUiSimplePalettes,
//   MakUiComponentConfig,
//   MakUiSimplePalettesShortHand,
//   MakUiVerbosePalettesShortHand,
//   MakUiSimpleThemesShortHand,
//   MakUiThemeModeShortHand,
//   MakUiVerboseThemesShortHand,
// } from "../types/default-types"
import { MakUiButtonConfigInput } from "../types/button-types"
import { ThemeProvider, useTheme } from "next-themes"
import {
  deepMerge,
  isEmptyObject,
  makClassNameHelper,
} from "../functions/helpers"
import {
  paletteShorthand,
  uiThemes,
} from "../constants/defaults/default-constants"
import {
  MakUiComponentConfigInput,
  MakUiFlexiblePaletteInput,
  MakUiPaletteInput,
  MakUiSimplePalette,
  MakUiSimpleTheme,
  MakUiStateShades,
  MakUiThemeColors,
  MakUiThemeKey,
  MakUiThemeKeySH,
  MakUiThemeShades,
  MakUiThemeShadesInput,
  MakUiVerbosePalette,
  MakUiVerboseTheme,
} from "../types/ui-types"
import {
  makUiDefaultStateShades,
  makUiDefaultThemeShades,
  makUiThemes,
} from "../constants/ui-constants"

export const defaultButtonConfig: MakUiButtonConfigInput = {
  className:
    "h-fit w-fit px-2 py-1 text-sm rounded-md font-semibold border border-2",
}

type MakUiProviderProps = {
  children: React.ReactNode
  palette: MakUiFlexiblePaletteInput
  componentConfig?: MakUiComponentConfigInput
  buttonConfig?: MakUiButtonConfigInput
  themeShades?: MakUiThemeShades
  stateShades?: MakUiStateShades
  enableSystem?: boolean
  defaultTheme?: MakUiThemeKey
  enableDarkMode?: boolean
  enableCustomMode?: boolean
}

const MakUiContext = createContext<MakUiContext | undefined>(undefined)

export const MakUiProvider = (props: MakUiProviderProps) => {
  return (
    <ThemeProvider
      storageKey="mak-ui-theme"
      enableSystem={true}
      themes={makUiThemes}
    >
      <MakUiProviderChild {...props}>{props.children}</MakUiProviderChild>
    </ThemeProvider>
  )
}

const MakUiProviderChild = ({
  children,
  palette: paletteInput = {},
  componentConfig,
  enableSystem = true,
  defaultTheme = "light",
  enableDarkMode = true,
  enableCustomMode = false,
  themeShades = makUiDefaultThemeShades,
  stateShades = makUiDefaultStateShades,
}: MakUiProviderProps) => {
  let { theme: themeMode, setTheme: setThemeMode } = useTheme()

  const stringifiedPalette = JSON.stringify(paletteInput)

  const darkModeInPalette = stringifiedPalette.includes("dark:")
  const customModeInPalette = stringifiedPalette.includes("custom:")
  const enabledModes = [
    "light",
    enableDarkMode || darkModeInPalette ? "dark" : null,
    enableCustomMode || customModeInPalette ? "custom" : null,
  ].filter((mode) => mode !== null) as MakUiThemeKey[]

  useEffect(() => {
    const localStorageTheme = localStorage.getItem("mak-ui-theme")
    if (defaultTheme && !localStorageTheme) {
      setThemeMode(defaultTheme)
    }
  }, [])

  useEffect(() => {
    if (!enableSystem) return
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setThemeMode("dark")
      } else {
        setThemeMode("light")
      }
    }

    darkModeMediaQuery.addEventListener("change", handleDarkModeChange)

    handleDarkModeChange({
      matches: darkModeMediaQuery.matches,
    } as MediaQueryListEvent)

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleDarkModeChange)
    }
  }, [])

  let currentTheme: MakUiThemeKey =
    (themeMode as MakUiThemeKey | undefined) || defaultTheme
  let currentThemeShorthand = paletteShorthand[currentTheme] as MakUiThemeKeySH
  const palettesMemo = useMemo(() => {
    const { verbose, simple } =
      paletteFactory({
        paletteInput,
        enabledModes,
        defaultShades: {
          defaultStateShades: stateShades,
          defaultThemeShades: themeShades,
        },
      }) || {}

    return {
      // sp: simple as MakUiSimplePalettesShortHand,
      // vp: verbose as MakUiVerbosePalettesShortHand,
      simplePalettes: simple as MakUiSimplePalette,
      verbosePalettes: verbose as MakUiVerbosePalette,
    }
  }, [paletteInput, enabledModes])

  const [simpleTheme, setSimpleTheme] = useState<MakUiSimpleTheme>(
    {} as MakUiSimpleTheme
  )

  const [verboseTheme, setVerboseTheme] = useState<MakUiVerboseTheme>(
    {} as MakUiVerboseTheme
  )
  const [simpleThemeShortHand, setSimpleThemeShortHand] =
    useState<MakUiSimpleThemesShortHand>({} as MakUiSimpleThemesShortHand)

  const [verboseThemeShortHand, setVerboseThemeShortHand] =
    useState<MakUiVerboseThemesShortHand>({} as MakUiVerboseThemesShortHand)

  const [buttonConfig, setButtonConfig] = useState<MakUiButtonConfigInput>(
    componentConfig?.buttonConfig || defaultButtonConfig
  )

  const formattingThemes =
    isEmptyObject(simpleTheme) ||
    isEmptyObject(verboseTheme) ||
    !simpleTheme ||
    !verboseTheme
      ? true
      : false

  useEffect(() => {
    setVerboseTheme(palettesMemo.verbosePalettes[currentTheme])
    setSimpleTheme(palettesMemo.simplePalettes[currentTheme])
    // setVerboseThemeShortHand(palettesMemo.vp[currentThemeShorthand])
    // setSimpleThemeShortHand(palettesMemo.sp[currentThemeShorthand])
  }, [themeMode, currentTheme])

  const { sp, vp, simplePalettes, verbosePalettes } = palettesMemo

  const makClassName = (className: string) => {
    return makClassNameHelper({
      string: className,
      verboseTheme,
      simpleTheme,
      verbosePalettes,
      simplePalettes,
    })
  }
  const value = {
    simplePalettes,
    verbosePalettes,
    simpleTheme,
    verboseTheme,
    sp,
    vp,
    st: simpleThemeShortHand,
    vt: verboseThemeShortHand,

    buttonConfig,
    setButtonConfig,
    themeMode,
    setTheme: setThemeMode,
    theme: themeMode,
    formattingThemes,
    isDark: themeMode === "dark",
    isLight: themeMode === "light",
    isCustom: themeMode === "custom",
    enabledModes,
    makClassName,
    mcn: makClassName,
  }

  return (
    <MakUiContext.Provider value={value}>
      {formattingThemes ? <></> : <>{children}</>}
    </MakUiContext.Provider>
  )
}

interface MakUiContext {
  buttonConfig: MakUiButtonConfig
  setButtonConfig: (config: MakUiButtonConfig) => void

  theme: string | undefined
  setTheme: (themeMode: string) => void
  formattingThemes: boolean
  isDark: boolean
  isLight: boolean
  isCustom: boolean
  enabledModes: MakUiThemeKey[]

  simplePalettes: MakUiSimplePalette
  verbosePalettes: MakUiVerbosePalette
  simpleTheme: MakUiSimpleTheme
  verboseTheme: MakUiVerboseTheme
  sp: MakUiSimplePalettesShortHand
  vp: MakUiVerbosePalettesShortHand
  st: MakUiSimpleThemesShortHand
  vt: MakUiVerboseThemesShortHand
  mcn: (className: string) => string | undefined
  makClassName: (className: string) => string | undefined
}

export const useMakUi = () => {
  const context = React.useContext(MakUiContext)
  if (context === undefined) {
    throw new Error("useMakUi must be used within a MakUiProvider")
  }
  return context
}
