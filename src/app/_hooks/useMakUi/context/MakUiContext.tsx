import React, { createContext, useEffect, useMemo, useState } from "react"
import { paletteFactory } from "../factories/paletteFactory"
import {
  MakUiNestedPalette,
  MakUiPaletteInput,
  MakUiPalette,
  MakUiActivePalette,
  MakUiTheme,
  MakUiThemePalette,
  MakUiThemeVariants,
} from "../types/default-types"
import {
  uiDefaultBorderPaletteInput,
  uiDefaultColorPaletteInput,
  uiDefaultTextPaletteInput,
  uiDefaultThemePaletteInput,
} from "../constants/defaults/default-constants"

import { MakUiButtonConfig } from "../types/button-types"
import {} from "../types/theme-types"
import {
  constructTailwindObject,
  detectSystemTheme,
  getColorContrast,
  getOptimizedPalette,
  twColorHelper,
} from "../functions/helpers"

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
}

type MakUiProviderProps = {
  children: React.ReactNode
  palette?: MakUiPaletteInput
  customButtonConfig?: MakUiButtonConfig
  defaultTheme?: MakUiTheme | "system"
  optimize?: boolean
}

const MakUiContext = createContext<MakUiContext | undefined>(undefined)

export const MakUiProvider = ({
  children,
  palette: paletteInput = {},
  customButtonConfig,
  defaultTheme = "system",
  optimize = false,
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

    const {
      colorPaletteObject = uiDefaultColorPaletteInput,
      textPaletteObject = uiDefaultTextPaletteInput,
      borderPaletteObject = uiDefaultBorderPaletteInput,
      themePaletteObject = uiDefaultThemePaletteInput,
      nestedPaletteObject = defaultNestedPalette,
    } = paletteFactory({ paletteInput }) || {}

    return {
      colorPalette: colorPaletteObject as MakUiPalette,
      textPalette: textPaletteObject as MakUiPalette,
      borderPalette: borderPaletteObject as MakUiPalette,
      themesPalette: themePaletteObject as MakUiThemePalette,
      palette: nestedPaletteObject as MakUiNestedPalette,
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
      } else {
        setActiveTheme("light")
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
    }
  }, [palettesMemo, activeTheme, activePalette])

  // useEffect(() => {
  //   getOptimizedPalette(activePaletteMemo)
  // })

  return <MakUiContext.Provider value={value}>{children}</MakUiContext.Provider>
}

export const useMakUi = () => {
  const context = React.useContext(MakUiContext)
  if (context === undefined) {
    throw new Error("useMakUi must be used within a MakUiProvider")
  }
  return context
}
