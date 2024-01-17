type GenericObject = Record<string, any>
import chroma from "chroma-js"
import { OvaiUiPalette, OvaiUiPaletteInput } from "../_types/ui-types"

export const isObject = (v: any): v is GenericObject =>
  v !== null && typeof v === "object" && !Array.isArray(v)

export const isEmptyObject = (obj: GenericObject) =>
  isObject(obj) && Object.keys(obj).length === 0

export const isNestedObject = (obj: GenericObject) =>
  isObject(obj) && Object.values(obj).some(isObject)

export const constructTailwindObject = ({
  hex,
  step = 50,
}: {
  hex: string
  step?: number
}): Record<number, string> => {
  const tailwindColors: Record<number, string> = {}

  const lightestColor = chroma.mix("white", hex, 0.1, "rgb")
  const darkestColor = chroma.mix("black", hex, 0.1, "rgb")

  const colorScale = chroma.scale([lightestColor, hex, darkestColor])

  const start = 100 - step
  const end = 900 + step
  const totalSteps = (end - start) / step

  for (let i = start; i <= end; i += step) {
    const scalePosition = (i - start) / (totalSteps * step)
    tailwindColors[i] = colorScale(scalePosition).hex()
  }

  return tailwindColors
}

export const nearestMultiple = (num: number, multiple: number) => {
  const remainder = num % multiple
  return remainder === 0 ? num : num + multiple - remainder
}

export const separatePalettes = (palette: OvaiUiPaletteInput) => {
  const colorPalette = {}
  const textPalette = {}
  const borderPalette = {}
  const themePalette = {}

  Object.keys(palette).forEach((key) => {
    if (key.includes("Text")) {
      textPalette[key] = palette[key]
    } else if (key.includes("Border")) {
      borderPalette[key] = palette[key]
    } else if (key.includes("Theme")) {
      themePalette[key] = palette[key]
    } else {
      colorPalette[key] = palette[key]
    }
  })
  return {
    colorPalette,
    textPalette,
    borderPalette,
    themePalette,
  }
}

export const getTheme = (input: string) => {
  if (!input) return "dark"
  input = input.toLowerCase()
  if (input.includes("dark")) return "dark"
  if (input.includes("light")) return "light"
  if (input.includes("custom")) return "custom"
  return "dark"
}
