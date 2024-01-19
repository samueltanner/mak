import React, { createContext, useEffect, useMemo, useState } from "react"
import { paletteFactory } from "../factories/paletteFactory"
import {
  MakUiNestedPalette,
  MakUiPaletteInput,
  MakUiPalette,
  MakUiActivePalette,
  MakUiTheme,
  MakUiThemePalette,
  MakUiSimpleNestedPalette,
  MakUiSimplePalette,
  MakUiSimpleThemePalette,
  MakUiVerboseThemes,
  MakUiSimpleThemes,
  MakUiSimpleTheme,
  MakUiVerboseTheme,
} from "../types/default-types"
import {
  uiDefaultBorderPaletteInput,
  uiDefaultColorPaletteInput,
  uiDefaultSimplColorPalette,
  uiDefaultSimpleBorderPalette,
  uiDefaultSimpleTextPalette,
  uiDefaultSimpleThemePalette,
  uiDefaultTextPaletteInput,
  uiDefaultThemePaletteInput,
} from "../constants/defaults/default-constants"
import { MakUiButtonConfig } from "../types/button-types"
import { detectSystemTheme } from "../functions/helpers"

export const defaultButtonConfig: MakUiButtonConfig = {
  className:
    "h-fit w-fit px-2 py-1 text-sm rounded-md font-semibold border border-2",
}

interface MakUiContext {
  palette: MakUiNestedPalette
  buttonConfig: MakUiButtonConfig
  setButtonConfig: (config: MakUiButtonConfig) => void
  colorPalette: MakUiPalette
  textPalette: MakUiPalette
  borderPalette: MakUiPalette
  themesPalette: MakUiThemePalette
  activePalette: MakUiActivePalette
  dark: MakUiVerboseTheme | undefined
  light: MakUiVerboseTheme | undefined
  custom: MakUiVerboseTheme | undefined
  simpleDark: MakUiSimpleTheme | undefined
  simpleLight: MakUiSimpleTheme | undefined
  simpleCustom: MakUiSimpleTheme | undefined
  simpleTheme: MakUiSimpleTheme | undefined
  theme: MakUiVerboseTheme | undefined
}

type MakUiProviderProps = {
  children: React.ReactNode
  palette?: MakUiPaletteInput
  customButtonConfig?: MakUiButtonConfig
  defaultTheme?: MakUiTheme | "system"
}

const MakUiContext = createContext<MakUiContext | undefined>(undefined)

export const MakUiProvider = ({
  children,
  palette: paletteInput = {},
  customButtonConfig,
  defaultTheme = "system",
}: MakUiProviderProps) => {
  if (!customButtonConfig) customButtonConfig = defaultButtonConfig
  const detectedSystemTheme: MakUiTheme =
    defaultTheme === "system" ? detectSystemTheme() : defaultTheme

  const palettesMemo = useMemo(() => {
    const defaultNestedPalette = {
      color: uiDefaultColorPaletteInput,
      text: uiDefaultTextPaletteInput,
      border: uiDefaultBorderPaletteInput,
      theme: uiDefaultThemePaletteInput,
    }

    const defaultSimpleNestedPalette: MakUiSimpleNestedPalette = {
      color: uiDefaultSimplColorPalette,
      text: uiDefaultSimpleTextPalette,
      border: uiDefaultSimpleBorderPalette,
      theme: uiDefaultSimpleThemePalette,
    }

    const {
      colorPaletteObject = uiDefaultColorPaletteInput,
      simpleColorPaletteObject = uiDefaultSimplColorPalette,
      textPaletteObject = uiDefaultTextPaletteInput,
      simpleTextPaletteObject = uiDefaultSimpleTextPalette,
      borderPaletteObject = uiDefaultBorderPaletteInput,
      simpleBorderPaletteObject = uiDefaultSimpleBorderPalette,
      themePaletteObject = uiDefaultThemePaletteInput,
      simpleThemePaletteObject = uiDefaultSimpleThemePalette,
      nestedPaletteObject = defaultNestedPalette,
      simpleNestedPaletteObject = defaultSimpleNestedPalette,
      paletteThemesObject,
      simplePaletteThemesObject,
    } = paletteFactory({ paletteInput }) || {}

    return {
      colorPalette: colorPaletteObject as MakUiPalette,
      simpleColorPalette: simpleColorPaletteObject as MakUiSimplePalette,
      textPalette: textPaletteObject as MakUiPalette,
      simpleTextPalette: simpleTextPaletteObject as MakUiSimplePalette,
      borderPalette: borderPaletteObject as MakUiPalette,
      simpleBorderPalette: simpleBorderPaletteObject as MakUiSimplePalette,
      themesPalette: themePaletteObject as MakUiThemePalette,
      simpleThemesPalette: simpleThemePaletteObject as MakUiSimpleThemePalette,
      palette: nestedPaletteObject as MakUiNestedPalette,
      simplePalette: simpleNestedPaletteObject as MakUiSimpleNestedPalette,
      verboseThemes: paletteThemesObject as MakUiVerboseThemes,
      simpleThemes: simplePaletteThemesObject as MakUiSimpleThemes,
    }
  }, [paletteInput])

  const handleThemeChange = () => {
    const { theme, text, border, color } = palettesMemo.palette
    return {
      theme: theme[activeTheme],
      text,
      border,
      color,
    }
  }

  const [activeTheme, setActiveTheme] = useState<MakUiTheme>("dark")
  const [activePalette, setActivePalette] = useState<MakUiActivePalette>(
    handleThemeChange()
  )
  const [simpleTheme, setSimpleTheme] = useState<MakUiSimpleTheme>()
  const [verboseTheme, setVerboseTheme] = useState<MakUiVerboseTheme>()

  const [buttonConfig, setButtonConfig] =
    useState<MakUiButtonConfig>(customButtonConfig)

  useEffect(() => {
    setActivePalette(handleThemeChange())
  }, [activeTheme])

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setActiveTheme("dark")
        setSimpleTheme(palettesMemo.simpleThemes.dark)
        setVerboseTheme(palettesMemo.verboseThemes.dark)
      } else {
        setActiveTheme("light")
        setSimpleTheme(palettesMemo.simpleThemes.light)
        setVerboseTheme(palettesMemo.verboseThemes.light)
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

  const value = useMemo(() => {
    return {
      ...palettesMemo,
      buttonConfig,
      setButtonConfig,
      systemTheme: detectedSystemTheme,
      activePalette,
      dark: palettesMemo.verboseThemes.dark as MakUiVerboseTheme,
      light: palettesMemo.verboseThemes.light as MakUiVerboseTheme,
      custom: palettesMemo.verboseThemes.custom as MakUiVerboseTheme,
      simpleDark: palettesMemo.simpleThemes.dark as MakUiSimpleTheme,
      simpleLight: palettesMemo.simpleThemes.light as MakUiSimpleTheme,
      simpleCustom: palettesMemo.simpleThemes.custom as MakUiSimpleTheme,
      simpleTheme,
      theme: verboseTheme,
    }
  }, [palettesMemo, activeTheme, activePalette])

  return <MakUiContext.Provider value={value}>{children}</MakUiContext.Provider>
}

export const useMakUi = () => {
  const context = React.useContext(MakUiContext)
  if (context === undefined) {
    throw new Error("useMakUi must be used within a MakUiProvider")
  }
  return context
}
