import React, { createContext, useEffect, useMemo, useState } from "react"
import { paletteFactory } from "../factories/paletteFactory"
import {
  MakUiNestedPalette,
  MakUiPaletteInput,
  MakUiPalette,
} from "../types/default-types"
import {
  uiDefaultBorderPaletteInput,
  uiDefaultColorPaletteInput,
  uiDefaultTextPaletteInput,
} from "../constants/defaults/default-constants"
import { uiDefaultThemePaletteInput } from "../constants/defaults/theme-constants"
import { MakUiButtonConfig } from "../types/button-types"
import {
  MakUiTheme,
  MakUiThemePalette,
  MakUiThemeVariants,
} from "../types/theme-types"
import {
  detectSystemTheme,
  getColorContrast,
  getTwHex,
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
  activeTheme: MakUiThemeVariants
}

type ProviderProps = {
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
  defaultTheme = "dark",
}: ProviderProps) => {
  if (!customButtonConfig) customButtonConfig = defaultButtonConfig

  const detectedSystemTheme: MakUiTheme =
    defaultTheme === "system" ? detectSystemTheme() : defaultTheme
  const defaultDetectedTheme = uiDefaultThemePaletteInput[detectedSystemTheme]
  const defaultDetectedThemePrimary = defaultDetectedTheme.primaryRoot
  const defaultDetectedTextPrimary = uiDefaultTextPaletteInput.primary!

  // const { hex: primaryHex } = twColorHelper({
  //   colorString:
  //     (paletteInput?.primary as string) ||
  //     (uiDefaultColorPaletteInput?.primary as string),
  // })

  // console.log(
  //   "color contrast",
  //   getColorContrast(defaultDetectedThemePrimary, defaultDetectedTextPrimary)
  // )
  const [buttonConfig, setButtonConfig] =
    useState<MakUiButtonConfig>(customButtonConfig)

  const [activeTheme, setActiveTheme] = useState<MakUiThemeVariants>(
    uiDefaultThemePaletteInput[detectedSystemTheme] as MakUiThemeVariants
  )

  const palettesMemo = useMemo(() => {
    console.log("UI CONTEXT palettesMemo useMemo")

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
      buttonConfig: customButtonConfig as MakUiButtonConfig,
      colorPalette: colorPaletteObject as MakUiPalette,
      textPalette: textPaletteObject as MakUiPalette,
      borderPalette: borderPaletteObject as MakUiPalette,
      themesPalette: themePaletteObject as MakUiThemePalette,
      palette: nestedPaletteObject as MakUiNestedPalette,
    }
  }, [paletteInput])

  useEffect(() => {
    if (detectedSystemTheme && palettesMemo.themesPalette) {
      setActiveTheme(palettesMemo.themesPalette[detectedSystemTheme])
    }
  }, [palettesMemo, defaultTheme, detectedSystemTheme])

  const value = useMemo(() => {
    console.log("UI CONTEXT useMemo")
    return {
      ...palettesMemo,
      setButtonConfig,
      systemTheme: detectedSystemTheme,
      activeTheme,
    }
  }, [palettesMemo, detectedSystemTheme, activeTheme])

  return <MakUiContext.Provider value={value}>{children}</MakUiContext.Provider>
}

export const useMakUi = () => {
  const context = React.useContext(MakUiContext)
  if (context === undefined) {
    throw new Error("useMakUi must be used within a MakUiProvider")
  }
  return context
}
