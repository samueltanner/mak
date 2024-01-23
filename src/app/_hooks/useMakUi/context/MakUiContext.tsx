"use client"
import React, { createContext, useEffect, useMemo, useState } from "react"
import { paletteFactory } from "../factories/paletteFactory"
import { ThemeProvider, useTheme } from "next-themes"
import {
  deepMerge,
  isEmptyObject,
  makClassNameHelper,
} from "../functions/helpers"
import { paletteShorthand } from "../constants/defaults/default-constants"
import {
  HtmlElementKey,
  MakUiFlexiblePaletteInput,
  MakUiInteractionStateKey,
  MakUiSimplePalette,
  MakUiSimpleTheme,
  MakUiStateShades,
  MakUiThemeKey,
  MakUiThemeKeySH,
  MakUiThemeShades,
  MakUiVerbosePalette,
  MakUiVerboseTheme,
} from "../types/ui-types"
import {
  htmlElements,
  makUiDefaultStateShades,
  makUiDefaultThemeShades,
  makUiInteractionStates,
  makUiThemes,
  defaultComponentConfig,
} from "../constants/ui-constants"
import {
  MakUiComponentConfigInput,
  MakUiRootComponentConfigInput,
} from "../types/component-types"

type MakUiProviderProps = {
  children: React.ReactNode
  palette: MakUiFlexiblePaletteInput
  componentConfig?: MakUiComponentConfigInput
  buttonConfig?: MakUiRootComponentConfigInput
  themeShades?: MakUiThemeShades
  stateShades?: MakUiStateShades
  enableSystem?: boolean
  defaultTheme?: MakUiThemeKey
  enableDarkMode?: boolean
  enableCustomMode?: boolean
  enabledStates?: MakUiInteractionStateKey[]
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
  componentConfig: componentConfigInput,
  enableSystem = true,
  defaultTheme = "light",
  enableDarkMode = true,
  enableCustomMode = false,
  themeShades = makUiDefaultThemeShades,
  stateShades = makUiDefaultStateShades,
  enabledStates = makUiInteractionStates,
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
      simplePalette: simple as MakUiSimplePalette,
      verbosePalette: verbose as MakUiVerbosePalette,
    }
  }, [paletteInput, enabledModes])

  const [simpleTheme, setSimpleTheme] = useState<MakUiSimpleTheme>(
    {} as MakUiSimpleTheme
  )

  const [verboseTheme, setVerboseTheme] = useState<MakUiVerboseTheme>(
    {} as MakUiVerboseTheme
  )

  const componentConfig = useMemo(() => {
    const configObject = {} as MakUiComponentConfigInput
    for (const key of htmlElements) {
      const configKey = `${key}Config` as keyof MakUiComponentConfigInput
      configObject[configKey] =
        componentConfigInput?.[configKey] || defaultComponentConfig[configKey]
    }
    return configObject
  }, [JSON.stringify(componentConfigInput)])

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

  const makClassName = (
    className: MakUiClassNameHelperClassNames,
    options?: MakUiClassNameHelperOptions
  ) => {
    const { type, states } = options || {}
    const configKey: keyof MakUiComponentConfigInput = type
      ? `${type}Config`
      : "buttonConfig"
    enabledStates = states || componentConfig[configKey]?.enabledStates || []
    const defaultConfig = componentConfig?.[configKey]
    console.log("defaultConfig", defaultConfig)

    return makClassNameHelper({
      string: className,
      verbosePalette,
      enabledStates,
      defaultConfig,
    })
  }
  const value = {
    simplePalette,
    verbosePalette,
    simpleTheme,
    verboseTheme,
    buttonConfig: componentConfig.buttonConfig,
    componentConfig,
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

type MakUiClassNameHelperClassNames = string
type MakUiClassNameHelperOptions = {
  type?: HtmlElementKey
  states?: MakUiInteractionStateKey[]
}

interface MakUiContext {
  buttonConfig: MakUiRootComponentConfigInput | undefined
  componentConfig: MakUiComponentConfigInput

  theme: string | undefined
  setTheme: (themeMode: string) => void
  formattingThemes: boolean
  isDark: boolean
  isLight: boolean
  isCustom: boolean
  enabledModes: MakUiThemeKey[]

  simplePalette: MakUiSimplePalette
  verbosePalette: MakUiVerbosePalette
  simpleTheme: MakUiSimpleTheme
  verboseTheme: MakUiVerboseTheme

  mcn: (
    className: MakUiClassNameHelperClassNames,
    options?: MakUiClassNameHelperOptions
  ) => string | undefined
  makClassName: (className: string) => string | undefined
}

export const useMakUi = () => {
  const context = React.useContext(MakUiContext)
  if (context === undefined) {
    throw new Error("useMakUi must be used within a MakUiProvider")
  }
  return context
}
