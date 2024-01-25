"use client"
import React, { createContext, useEffect, useMemo, useState } from "react"
import { paletteFactory } from "../factories/paletteFactory"
import { ThemeProvider, useTheme } from "next-themes"
import {
  constructTailwindObject,
  getActiveTwVariants,
  getTwConfigSafelist,
  makClassNameHelper,
} from "../functions/helpers"

import {
  HtmlElementKey,
  MakUiFlexiblePaletteInput,
  MakUiInteractionStateKey,
  MakUiSimplePalette,
  MakUiSimpleTheme,
  MakUiStateShades,
  MakUiThemeKey,
  MakUiThemeShades,
  MakUiVerbosePalette,
  MakUiVerboseTheme,
} from "../types/ui-types"
import {
  htmlElements,
  makUiDefaultStateShades,
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
import { isEmptyObject } from "@/globals/global-helper-functions"

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
  enabledStates = ["hover", "focus", "disabled"],
}: MakUiProviderProps) => {
  let { theme: themeMode, setTheme: setThemeMode } = useTheme()

  const stringifiedPalette = JSON.stringify(paletteInput)

  const darkModeInPalette = stringifiedPalette.includes("dark:")
  const customModeInPalette = stringifiedPalette.includes("custom:")
  const enabledThemeModes = [
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
        paletteInput,
        enabledThemeModes,
        enabledInteractionStates,
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
  }, [JSON.stringify(paletteInput), enabledThemeModes])

  const [simpleTheme, setSimpleTheme] = useState<MakUiSimpleTheme>(
    {} as MakUiSimpleTheme
  )

  const [verboseTheme, setVerboseTheme] = useState<MakUiVerboseTheme>(
    {} as MakUiVerboseTheme
  )
  const [theme, setTheme] = useState<MakUiThemeKey>(
    (themeMode as MakUiThemeKey) || defaultTheme || "light"
  )

  // const [safeList, setSafeList] = useState<any[]>([])

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
    string: MakUiClassNameHelperClassNames | undefined,
    options?: MakUiClassNameHelperOptions
  ) => {
    const { type, states, theme, makClassName, className } = options || {}
    const configKey: keyof MakUiComponentConfigInput = type
      ? `${type}Config`
      : "buttonConfig"
    enabledStates = states || componentConfig[configKey]?.enabledStates || []
    const defaultConfig = componentConfig?.[configKey]
    const defaultTheme: MakUiThemeKey | undefined =
      theme || (themeMode as MakUiThemeKey | undefined)

    return makClassNameHelper({
      string,
      verbosePalette,
      enabledStates,
      defaultConfig: type ? defaultConfig : undefined,
      themeMode: defaultTheme,
      makClassName,
      className,
    })
  }

  // useEffect(() => {
  //   const safeList = getTwConfigSafelist({
  //     simplePalette,
  //     enabledTwVariants,
  //   })

  //   setSafeList(safeList)
  // }, [])

  // const getSafeList = () => {
  //   console.log(
  //     "********************************************************************************************"
  //   )
  //   console.log(
  //     "Copy this to your tailwind.config.js safelist array at the root level of the config object."
  //   )
  //   console.log(
  //     "Please note that this contains stringified regex patterns. You will need to remove the quotes before and after each 'pattern' value."
  //   )
  //   console.log(
  //     "If you add any additional colors, interaction states or need access to additional tailwind variants, you will need to add them to your palette input and/or the enabledStates array in your component config (or in the global enabled states passed as a prop to the MakUi context provider)."
  //   )
  //   console.log(JSON.stringify(safeList, null, 2))
  //   console.log(
  //     "********************************************************************************************"
  //   )
  // }

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
    makClassName,
    mcn: makClassName,
    // getSafeList,
    constructTailwindColorScale: constructTailwindObject,
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
  theme?: MakUiThemeKey
  useConfig?: boolean
  makClassName?: string
  className?: string
}
export type MakUiClassNameHelper = (
  className: string,
  options?: MakUiClassNameHelperOptions | undefined
) => string | undefined

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

  mcn: MakUiClassNameHelper
  makClassName: (className?: string) => string | undefined
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
