"use client"
import React, {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { paletteFactory } from "../factories/paletteFactory"
import {
  MakUiPaletteInput,
  MakUiThemeMode,
  MakUiVerbosePalettes,
  MakUiSimpleTheme,
  MakUiVerboseTheme,
  MakUiSimplePalettes,
} from "../types/default-types"
import { MakUiButtonConfig } from "../types/button-types"
import {
  detectSystemTheme,
  getLocalStorage,
  getTheme,
  setLocalStorage,
} from "../functions/helpers"
import { useTheme, ThemeProvider } from "next-themes"
import { uiThemes } from "../constants/defaults/default-constants"

export const defaultButtonConfig: MakUiButtonConfig = {
  className:
    "h-fit w-fit px-2 py-1 text-sm rounded-md font-semibold border border-2",
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
  themeMode: MakUiThemeMode
  setThemeMode: (mode: MakUiThemeMode) => void
  theme: MakUiVerboseTheme
  t: MakUiVerboseTheme
  simpleTheme: MakUiSimpleTheme
  s: MakUiSimpleTheme
}

type MakUiProviderProps = {
  children: React.ReactNode
  palette?: MakUiPaletteInput
  customButtonConfig?: MakUiButtonConfig
  defaultTheme?: MakUiThemeMode | "system"
}

const MakUiContext = createContext<MakUiContext | undefined>(undefined)

export const MakUiProvider = ({
  children,
  palette: paletteInput = {},
  customButtonConfig,
}: MakUiProviderProps) => {
  if (!customButtonConfig) customButtonConfig = defaultButtonConfig
  const { theme, setTheme } = useTheme()

  console.log({ theme })

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        console.log("dark mode")
        setThemeMode("dark")
        // handleThemeChange("dark")
      } else {
        console.log("light mode")
        setThemeMode("light")
        // handleThemeChange("light")
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

  const [themeMode, setThemeMode] = useState<MakUiThemeMode>("dark")

  const [simpleTheme, setSimpleTheme] = useState<MakUiSimpleTheme>(
    palettesMemo.sp[themeMode]
  )
  const [verboseTheme, setVerboseTheme] = useState<MakUiVerboseTheme>(
    palettesMemo.p[themeMode]
  )

  const [buttonConfig, setButtonConfig] =
    useState<MakUiButtonConfig>(customButtonConfig)

  useEffect(() => {
    setVerboseTheme(palettesMemo.p[themeMode])
    setSimpleTheme(palettesMemo.sp[themeMode])
  }, [themeMode])

  const value = {
    ...palettesMemo,
    buttonConfig,
    setButtonConfig,
    themeMode,
    setThemeMode,
    theme: verboseTheme,
    t: verboseTheme,
    simpleTheme,
    s: simpleTheme,
  }

  return (
    <ThemeProvider
      // storageKey="mak-ui-theme"
      // defaultTheme="system"
      // enableSystem={true}
      // themes={uiThemes}
      attribute="class"
    >
      <MakUiContext.Provider value={value}>{children}</MakUiContext.Provider>
    </ThemeProvider>
  )
}

export const useMakUi = () => {
  const context = React.useContext(MakUiContext)
  if (context === undefined) {
    throw new Error("useMakUi must be used within a MakUiProvider")
  }
  return context
}
