import { deepEqual, mergeWithFallback } from "@/helpers/functions"
import React, {
  createContext,
  use,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  ThemePalette,
  BorderPalette,
  OvaiUiNestedPalette,
  OvaiUiPalette,
  OvaiUiPaletteInput,
  ColorPalette,
  PaletteInput,
  TextPalette,
} from "../types/ui-types"
import { paletteFactory } from "../factories/paletteFactory"
import {
  defaultThemeColors,
  defaultBorderPalette,
  defaultColorPalette,
  defaultNestedPalette,
  defaultPalettes,
  defaultTextPalette,
} from "../constants/ui-constants"

type OvaiUIPaddingAndMarginConfig = {
  [key: string]: string
  h?: string
  w?: string
  p?: string
  px?: string
  py?: string
  pt?: string
  pb?: string
  pl?: string
  pr?: string
  m?: string
  mx?: string
  my?: string
  mt?: string
  mb?: string
  ml?: string
  mr?: string
}

export interface OvaiUiButtonConfig extends OvaiUIPaddingAndMarginConfig {
  [key: string]: string
  borderRadius?: string
  borderWidth?: string
  borderStyle?: string
  className?: string
  text?: string
}

export const defaultButtonConfig: OvaiUiButtonConfig = {
  className:
    "h-fit w-fit px-2 py-1 text-sm rounded-md font-semibold border border-2",
}

interface OvaiUiContext {
  palette: OvaiUiNestedPalette
  palettes: OvaiUiPalette
  buttonConfig: OvaiUiButtonConfig
  // setButtonConfig: (config: OvaiUiButtonConfig) => void
  colorPalette: ColorPalette
  textPalette: TextPalette
  borderPalette: BorderPalette
  themePalette: ThemePalette
}

type ProviderProps = {
  children: React.ReactNode
  palette?: OvaiUiPaletteInput
  customButtonConfig?: OvaiUiButtonConfig
}

const OvaiUiContext = createContext<OvaiUiContext | undefined>(undefined)

export const OvaiUiProvider = ({
  children,
  palette: paletteInput,
  customButtonConfig,
}: ProviderProps) => {
  if (!customButtonConfig) customButtonConfig = defaultButtonConfig
  // const [palette, setPalette] =
  //   useState<OvaiUiNestedPalette>(defaultNestedPalette)
  // const [combinedPalettes, setCombinedPalettes] =
  //   useState<OvaiUiPalette>(defaultPalettes)
  // const [colorPalette, setColorPalette] =
  //   useState<ColorPalette>(defaultColorPalette)
  // const [textPalette, setTextPalette] =
  //   useState<TextPalette>(defaultTextPalette)
  // const [borderPalette, setBorderPalette] =
  //   useState<BorderPalette>(defaultBorderPalette)
  // const [themePalette, setThemePalette] =
  //   useState<ThemePalette>(defaultThemeColors)
  // const [buttonConfig, setButtonConfig] =
  //   useState<OvaiUiButtonConfig>(customButtonConfig)

  const palettesMemo = useMemo(() => {
    console.log("UI CONTEXT palettesMemo useMemo")

    const {
      colorPaletteObject = defaultColorPalette,
      textPaletteObject = defaultTextPalette,
      borderPaletteObject = defaultBorderPalette,
      themePaletteObject = defaultThemeColors,
      nestedPaletteObject = defaultNestedPalette,
    } = paletteFactory({ paletteInput }) || {}

    return {
      buttonConfig: customButtonConfig as OvaiUiButtonConfig,
      colorPalette: colorPaletteObject as ColorPalette,
      textPalette: textPaletteObject as TextPalette,
      borderPalette: borderPaletteObject as BorderPalette,
      themePalette: themePaletteObject as ThemePalette,
      palette: nestedPaletteObject as OvaiUiNestedPalette,
      palettes: {
        ...textPaletteObject,
        ...colorPaletteObject,
        ...borderPaletteObject,
        ...themePaletteObject,
      } as OvaiUiPalette,
    }
  }, [paletteInput])

  const value = useMemo(() => {
    console.log("UI CONTEXT useMemo")
    return palettesMemo
  }, [palettesMemo])

  // const [palette, setPalette] =
  //   useState<OvaiUiNestedPalette>(defaultNestedPalette)
  // const [palettes, setPalettes] = useState<OvaiUiPalette>(defaultPalettes)
  // const [colorPalette, setColorPalette] =
  //   useState<ColorPalette>(defaultColorPalette)
  // const [textPalette, setTextPalette] =
  //   useState<TextPalette>(defaultTextPalette)
  // const [borderPalette, setBorderPalette] =
  //   useState<BorderPalette>(defaultBorderPalette)
  // const [themePalette, setThemePalette] =
  //   useState<ThemePalette>(defaultThemeColors)

  // const paletteInputRef = useRef<OvaiUiPaletteInput>(null)

  // useEffect(() => {
  //   if (paletteInput) {
  //     paletteInputRef.current = paletteInput
  //   }
  // }, [paletteInput])

  // useEffect(() => {
  //   const {
  //     colorPaletteObject,
  //     textPaletteObject,
  //     borderPaletteObject,
  //     themePaletteObject,
  //     nestedPaletteObject,
  //   } = paletteFactory({
  //     paletteInput,
  //   })
  //   const combinedPalettes = {
  //     ...textPaletteObject,
  //     ...colorPaletteObject,
  //     ...borderPaletteObject,
  //     ...themePaletteObject,
  //   }

  //   setPalette(nestedPaletteObject)
  //   setColorPalette(colorPaletteObject)
  //   setTextPalette(textPaletteObject)
  //   setBorderPalette(borderPaletteObject)
  //   setThemePalette(themePaletteObject)
  //   setPalettes(combinedPalettes)
  // }, [paletteInputRef.current])

  // const value = {
  //   buttonConfig,
  //   setButtonConfig,
  //   // ...palettesMemo,
  //   palettes,
  //   palette,
  //   colorPalette,
  //   textPalette,
  //   borderPalette,
  //   themePalette,
  // }

  return (
    <OvaiUiContext.Provider value={value}>{children}</OvaiUiContext.Provider>
  )
}

export const useOvaiUi = () => {
  const context = React.useContext(OvaiUiContext)
  if (context === undefined) {
    throw new Error("useOvaiUi must be used within a OvaiUiProvider")
  }
  return context
}
