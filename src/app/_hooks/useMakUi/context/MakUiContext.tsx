"use client"
import React, { createContext, useEffect, useMemo, useState } from "react"
import { paletteFactory } from "../factories/paletteFactory"
import {
  MakUiPaletteInput,
  MakUiThemeMode,
  MakUiVerbosePalettes,
  MakUiSimpleTheme,
  MakUiVerboseTheme,
  MakUiSimplePalettes,
  MakUiComponentConfig,
} from "../types/default-types"
import { MakUiButtonConfig } from "../types/button-types"
import { ThemeProvider, useTheme } from "next-themes"
import { detectSystemTheme, isEmptyObject } from "../functions/helpers"
import { uiThemes } from "../constants/defaults/default-constants"

export const defaultButtonConfig: MakUiButtonConfig = {
  className:
    "h-fit w-fit px-2 py-1 text-sm rounded-md font-semibold border border-2",
}

type MakUiProviderProps = {
  children: React.ReactNode
  palette?: MakUiPaletteInput
  componentConfig?: MakUiComponentConfig
  enableSystem?: boolean
  defaultTheme?: MakUiThemeMode
}

const MakUiContext = createContext<MakUiContext | undefined>(undefined)

export const MakUiProvider = (props: MakUiProviderProps) => {
  return (
    <ThemeProvider
      storageKey="mak-ui-theme"
      enableSystem={true}
      themes={uiThemes}
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
  defaultTheme = "dark",
}: MakUiProviderProps) => {
  let { theme: themeMode, setTheme: setThemeMode } = useTheme()

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

  let currentTheme: MakUiThemeMode =
    (themeMode as MakUiThemeMode | undefined) || defaultTheme

  const palettesMemo = useMemo(() => {
    const { paletteThemesObject, simplePaletteThemesObject } =
      paletteFactory({ paletteInput }) || {}

    return {
      palette: paletteThemesObject,
      p: paletteThemesObject,
      simplePalette: simplePaletteThemesObject,
      sp: simplePaletteThemesObject,
      dark: paletteThemesObject.dark,
      d: paletteThemesObject.dark,
      light: paletteThemesObject.light,
      l: paletteThemesObject.light,
      custom: paletteThemesObject.custom,
      c: paletteThemesObject.custom,
      sd: simplePaletteThemesObject.dark,
      sl: simplePaletteThemesObject.light,
      sc: simplePaletteThemesObject.custom,
    }
  }, [paletteInput])

  const [simpleTheme, setSimpleTheme] = useState<MakUiSimpleTheme>(
    {} as MakUiSimpleTheme
  )
  const [verboseTheme, setVerboseTheme] = useState<MakUiVerboseTheme>(
    {} as MakUiVerboseTheme
  )

  const [buttonConfig, setButtonConfig] = useState<MakUiButtonConfig>(
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
    setVerboseTheme(palettesMemo.p[currentTheme])
    setSimpleTheme(palettesMemo.sp[currentTheme])
  }, [themeMode, currentTheme])

  const value = {
    ...palettesMemo,
    buttonConfig,
    setButtonConfig,
    themeMode,
    setTheme: setThemeMode,
    theme: themeMode,
    verboseTheme,
    t: verboseTheme,
    simpleTheme,
    s: simpleTheme,
    formattingThemes,
    isDark: themeMode === "dark",
    isLight: themeMode === "light",
    isCustom: themeMode === "custom",
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
  palette: MakUiVerbosePalettes
  p: MakUiVerbosePalettes
  simplePalette: MakUiSimplePalettes
  sp: MakUiSimplePalettes
  dark: MakUiVerboseTheme
  d: MakUiVerboseTheme
  light: MakUiVerboseTheme
  l: MakUiVerboseTheme
  custom: MakUiVerboseTheme
  c: MakUiVerboseTheme
  sd: MakUiSimpleTheme
  sl: MakUiSimpleTheme
  sc: MakUiSimpleTheme
  theme: string | undefined
  setTheme: (themeMode: string) => void
  verboseTheme: MakUiVerboseTheme
  t: MakUiVerboseTheme
  simpleTheme: MakUiSimpleTheme
  s: MakUiSimpleTheme
  formattingThemes: boolean
  isDark: boolean
  isLight: boolean
  isCustom: boolean
}

export const useMakUi = () => {
  const context = React.useContext(MakUiContext)
  if (context === undefined) {
    throw new Error("useMakUi must be used within a MakUiProvider")
  }
  return context
}
