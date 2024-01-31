"use client"
import React, { createContext, useEffect, useMemo, useState } from "react"
import { paletteFactory } from "../factories/paletteFactory"
import { ThemeProvider, useTheme } from "next-themes"
import {
  constructTailwindObject,
  getActiveTwVariants,
} from "../functions/helpers"

import {
  MakUiFlexiblePaletteInput,
  MakUiInteractionStateKey,
  MakUiSimplePalette,
  MakUiSimpleTheme,
  MakUiStateShades,
  MakUiThemeKey,
  MakUiThemeShades,
  MakUiVerbosePalette,
  MakUiVerboseTheme,
  ShadeStep,
} from "../types/ui-types"
import {
  makUiDefaultThemeShades,
  makUiThemes,
  defaultComponentConfig,
} from "../constants/ui-constants"
import {
  MakUiComponentConfig,
  MakUiComponentConfigInput,
  MakUiRootComponentConfig,
  MakUiRootComponentConfigInput,
} from "../types/component-types"
import { deepMerge, isEmptyObject } from "@/globals/global-helper-functions"

type PaletteGeneratorProps = {
  palette: MakUiFlexiblePaletteInput
  themeShades?: MakUiThemeShades
  enableLightMode?: boolean
  enableDarkMode?: boolean
  enableCustomMode?: boolean
  shadeStep?: ShadeStep
  includeBlackAndWhite?: boolean
  includeNearAbsolutes?: boolean
  altBlack?: string
  altWhite?: string
}

type MakUiProviderProps = {
  children: React.ReactNode
  palette?: MakUiFlexiblePaletteInput
  componentConfig?: MakUiComponentConfigInput
  buttonConfig?: MakUiRootComponentConfigInput
  themeShades?: MakUiThemeShades
  stateShades?: MakUiStateShades
  enableSystem?: boolean
  defaultTheme?: MakUiThemeKey
  enableDarkMode?: boolean
  enableCustomMode?: boolean
  enabledStates?: MakUiInteractionStateKey[]
  shadeStep?: ShadeStep
  includeBlackAndWhite?: boolean
  paletteGenProps?: PaletteGeneratorProps
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

const defaultPaletteGenProps: PaletteGeneratorProps = {
  palette: {} as MakUiFlexiblePaletteInput,
  themeShades: makUiDefaultThemeShades,
  enableLightMode: true,
  enableDarkMode: true,
  enableCustomMode: false,
  shadeStep: 100 as ShadeStep,
  includeBlackAndWhite: true,
  includeNearAbsolutes: true,
  altBlack: "#000000",
  altWhite: "#ffffff",
}

const MakUiProviderChild = ({
  children,
  componentConfig: componentConfigInput,
  palette: paletteInput,
  enableSystem = true,
  defaultTheme = "light",
  paletteGenProps = defaultPaletteGenProps,
}: MakUiProviderProps) => {
  const paletteInputRef = React.useRef<string>()
  useEffect(() => {
    if (paletteInputRef.current !== JSON.stringify(paletteInput)) {
      paletteInputRef.current = JSON.stringify(paletteInput)
    }
    return
  }, [JSON.stringify(paletteInput)])

  let { theme: themeMode, setTheme: setThemeMode } = useTheme()

  const mergedPaletteGenProps = deepMerge(
    defaultPaletteGenProps,
    paletteGenProps
  ) as PaletteGeneratorProps

  const {
    palette: paletteGenInput,
    themeShades,
    enableLightMode,
    enableDarkMode,
    enableCustomMode,
    shadeStep,
    includeBlackAndWhite,
    includeNearAbsolutes,
    altBlack,
    altWhite,
  } = mergedPaletteGenProps

  paletteInput = !isEmptyObject(paletteGenInput)
    ? paletteGenInput
    : paletteInput
    ? paletteInput
    : {}
  const stringifiedPalette = JSON.stringify(paletteInput)

  const darkModeInPalette = stringifiedPalette.includes("dark:")
  const customModeInPalette = stringifiedPalette.includes("custom:")
  const lightModeInPalette =
    stringifiedPalette.includes("light:") ||
    Object.values(paletteInput).some((val) => !val.includes(":"))
  const enabledThemeModes = [
    enableLightMode || lightModeInPalette ? "light" : null,
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

  const componentConfig = useMemo(() => {
    const configObject: MakUiComponentConfig = {
      buttonConfig:
        (componentConfigInput?.buttonConfig as MakUiRootComponentConfig) ||
        defaultComponentConfig.buttonConfig,
      inputConfig:
        (componentConfigInput?.inputConfig as MakUiRootComponentConfig) ||
        defaultComponentConfig.inputConfig,
      textConfig:
        (componentConfigInput?.textConfig as MakUiRootComponentConfig) ||
        defaultComponentConfig.textConfig,
      selectConfig:
        (componentConfigInput?.selectConfig as MakUiRootComponentConfig) ||
        defaultComponentConfig.selectConfig,
      formConfig:
        (componentConfigInput?.formConfig as MakUiRootComponentConfig) ||
        defaultComponentConfig.formConfig,
      dialogConfig:
        (componentConfigInput?.dialogConfig as MakUiRootComponentConfig) ||
        defaultComponentConfig.dialogConfig,
      textareaConfig:
        (componentConfigInput?.textareaConfig as MakUiRootComponentConfig) ||
        defaultComponentConfig.textareaConfig,
    }

    return configObject
  }, [JSON.stringify(componentConfigInput)])

  const { enabledTwVariants, enabledInteractionStates } = useMemo(() => {
    return getActiveTwVariants({
      enabledThemeModes,
      componentConfig,
    })
  }, [componentConfig, enabledThemeModes])

  const palettesMemo = useMemo(() => {
    const { verbose, simple } =
      paletteFactory({
        paletteInput: paletteInput as MakUiFlexiblePaletteInput,
        enabledThemeModes,
        defaultShades: themeShades!,
        shadeStep: shadeStep!,
        includeBlackAndWhite: includeBlackAndWhite!,
        includeNearAbsolutes: includeNearAbsolutes!,
        altBlack: altBlack!,
        altWhite: altWhite!,
      }) || {}

    return {
      simplePalette: simple as MakUiSimplePalette,
      verbosePalette: verbose as MakUiVerbosePalette,
    }
  }, [paletteInputRef])

  const [simpleTheme, setSimpleTheme] = useState<MakUiSimpleTheme>(
    {} as MakUiSimpleTheme
  )

  const [verboseTheme, setVerboseTheme] = useState<MakUiVerboseTheme>(
    {} as MakUiVerboseTheme
  )
  const [theme, setTheme] = useState<MakUiThemeKey>(
    (themeMode as MakUiThemeKey) || defaultTheme || "light"
  )

  useEffect(() => {
    setTheme(themeMode as MakUiThemeKey)
  }, [themeMode])

  const formattingThemes =
    isEmptyObject(simpleTheme) ||
    isEmptyObject(verboseTheme) ||
    !simpleTheme ||
    !verboseTheme
      ? true
      : false

  useEffect(() => {
    setVerboseTheme(palettesMemo.verbosePalette[currentTheme])
    setSimpleTheme(palettesMemo.simplePalette[currentTheme])
  }, [themeMode, currentTheme])

  const { simplePalette, verbosePalette } = palettesMemo

  const value = {
    simplePalette,
    verbosePalette,
    simpleTheme,
    verboseTheme,
    buttonConfig: componentConfig.buttonConfig,
    componentConfig,
    themeMode,
    setTheme: setThemeMode,
    theme,
    formattingThemes,
    isDark: theme === "dark",
    isLight: theme === "light",
    isCustom: theme === "custom",
    enabledThemeModes,
    // getSafeList,
    constructTailwindColorScale: constructTailwindObject,
  }

  return (
    <MakUiContext.Provider value={value}>
      {formattingThemes ? <></> : <>{children}</>}
    </MakUiContext.Provider>
  )
}

interface MakUiContext {
  componentConfig: MakUiComponentConfig

  theme: MakUiThemeKey
  setTheme: (themeMode: string) => void
  formattingThemes: boolean
  isDark: boolean
  isLight: boolean
  isCustom: boolean
  enabledThemeModes: MakUiThemeKey[]

  simplePalette: MakUiSimplePalette
  verbosePalette: MakUiVerbosePalette
  simpleTheme: MakUiSimpleTheme
  verboseTheme: MakUiVerboseTheme

  // getSafeList: () => void
  constructTailwindColorScale: ({
    hex,
    step,
    includeNearAbsolutes,
  }: {
    hex: string
    step?: number | undefined
    includeNearAbsolutes?: boolean | undefined
  }) => Record<number, string>
}

export const useMakUi = () => {
  const context = React.useContext(MakUiContext)
  if (context === undefined) {
    throw new Error("useMakUi must be used within a MakUiProvider")
  }
  return context
}
