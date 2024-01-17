import React, { createContext, useMemo } from "react"
import {
  ThemePalette,
  BorderPalette,
  MakUiNestedPalette,
  MakUiPalette,
  ColorPalette,
  TextPalette,
} from "../types/ui-types"
import { paletteFactory } from "../factories/paletteFactory"
import { MakUiPaletteInput } from "../types/default-types"
import {
  uiDefaultBorderPaletteInput,
  uiDefaultColorPaletteInput,
  uiDefaultTextPaletteInput,
} from "../constants/defaults/default-constants"
import { uiDefaultThemePaletteInput } from "../constants/defaults/theme-constants"

export const defaultButtonConfig: MakUiButtonConfig = {
  className:
    "h-fit w-fit px-2 py-1 text-sm rounded-md font-semibold border border-2",
}

interface MakUiContext {
  palette: MakUiNestedPalette
  palettes: MakUiPalette
  buttonConfig: MakUiButtonConfig
  // setButtonConfig: (config: MakUiButtonConfig) => void
  colorPalette: ColorPalette
  textPalette: TextPalette
  borderPalette: BorderPalette
  themePalette: ThemePalette
}

type ProviderProps = {
  children: React.ReactNode
  palette?: MakUiPaletteInput
  customButtonConfig?: MakUiPaletteInput
}

const MakUiContext = createContext<MakUiContext | undefined>(undefined)

export const MakUiProvider = ({
  children,
  palette: paletteInput = {},
  customButtonConfig,
}: ProviderProps) => {
  if (!customButtonConfig) customButtonConfig = defaultButtonConfig
  // const [palette, setPalette] =
  //   useState<MakUiNestedPalette>(defaultNestedPalette)
  // const [combinedPalettes, setCombinedPalettes] =
  //   useState<MakUiPalette>(defaultPalettes)
  // const [colorPalette, setColorPalette] =
  //   useState<ColorPalette>(defaultColorPalette)
  // const [textPalette, setTextPalette] =
  //   useState<TextPalette>(defaultTextPalette)
  // const [borderPalette, setBorderPalette] =
  //   useState<BorderPalette>(defaultBorderPalette)
  // const [themePalette, setThemePalette] =
  //   useState<ThemePalette>(defaultThemeColors)
  // const [buttonConfig, setButtonConfig] =
  //   useState<MakUiButtonConfig>(customButtonConfig)

  const palettesMemo = useMemo(() => {
    console.log("UI CONTEXT palettesMemo useMemo")

    const {
      colorPaletteObject = uiDefaultColorPaletteInput,
      textPaletteObject = uiDefaultTextPaletteInput,
      borderPaletteObject = uiDefaultBorderPaletteInput,
      themePaletteObject = uiDefaultThemePaletteInput,
      nestedPaletteObject = {},
    } = paletteFactory({ paletteInput }) || {}

    console.log("nestedPaletteObject", nestedPaletteObject)

    return {
      buttonConfig: customButtonConfig as MakUiButtonConfig,
      colorPalette: colorPaletteObject as ColorPalette,
      textPalette: textPaletteObject as TextPalette,
      borderPalette: borderPaletteObject as BorderPalette,
      themePalette: themePaletteObject as ThemePalette,
      palette: nestedPaletteObject as MakUiNestedPalette,
      palettes: {
        ...textPaletteObject,
        ...colorPaletteObject,
        ...borderPaletteObject,
        ...themePaletteObject,
      } as MakUiPalette,
    }
  }, [paletteInput])

  const value = useMemo(() => {
    console.log("UI CONTEXT useMemo")
    return palettesMemo
  }, [palettesMemo])

  // const [palette, setPalette] =
  //   useState<MakUiNestedPalette>(defaultNestedPalette)
  // const [palettes, setPalettes] = useState<MakUiPalette>(defaultPalettes)
  // const [colorPalette, setColorPalette] =
  //   useState<ColorPalette>(defaultColorPalette)
  // const [textPalette, setTextPalette] =
  //   useState<TextPalette>(defaultTextPalette)
  // const [borderPalette, setBorderPalette] =
  //   useState<BorderPalette>(defaultBorderPalette)
  // const [themePalette, setThemePalette] =
  //   useState<ThemePalette>(defaultThemeColors)

  // const paletteInputRef = useRef<MakUiPaletteInput>(null)

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

  return <MakUiContext.Provider value={value}>{children}</MakUiContext.Provider>
}

export const useMakUi = () => {
  const context = React.useContext(MakUiContext)
  if (context === undefined) {
    throw new Error("useMakUi must be used within a MakUiProvider")
  }
  return context
}
