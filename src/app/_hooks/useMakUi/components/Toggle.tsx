import { useEffect, useState } from "react"
import { TypeProps, withComputedProps } from "./componentTypeProps"
import { MakUiVariant } from "../types/default-types"
import { useMakUi } from "../context/MakUiContext"
import { isObject } from "@/globals/global-helper-functions"
import { makUiVariantsSet } from "../constants/ui-constants"
import { MakUiVariantKey, TailwindModifier } from "../types/ui-types"

type ToggleProps = TypeProps & {
  checked?: boolean
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  color?: string
  checkedColor?: string
  bgColor?: string
  bgCheckedColor?: string
}

const Toggle: React.FC<ToggleProps> = ({
  checked: checkedProp,
  disabled,
  onChange,
  color,
  checkedColor,
  bgColor,
  bgCheckedColor,
  ...props
}) => {
  const {
    themeMode,
    theme: themeProps,
    color: colorProps,
    text: textProps,
    border: borderProps,
    allowedDefaults: defaultStatesProp,
    allowedModifiers: allowedModifiersProp,
    borderPx,
  } = withComputedProps(props)

  const {
    theme: makTheme,
    verbosePalette: makVerbosePalette,
    verboseTheme: makVerboseTheme,
  } = useMakUi()

  const activeThemeMode = themeMode
    ? themeMode
    : makTheme
    ? makTheme
    : undefined
  const activePalette = activeThemeMode
    ? makVerbosePalette[activeThemeMode]
    : makVerboseTheme

  const objectToClassName = (
    object: GenericObject,
    variant: MakUiVariant | string,
    modifier?: TailwindModifier
  ) => {
    if (!isObject(object)) return ""
    let parsedStringArray: string[] = []
    Object.entries(object).forEach(([key, value]) => {
      if (!defaultStatesProp || !defaultStatesProp.has(key)) return
      if (key === "base") {
        parsedStringArray.push(`${variant}-${value}`)
        return
      }
      if (key! === "base" && modifier) {
        parsedStringArray.push(`${modifier}-${variant}-${value}`)
        return
      }
      if (key !== "base" && !modifier) {
        parsedStringArray.push(`${key}:${variant}-${value}`)
      }
      if (key !== "base" && !modifier && allowedModifiersProp.size) {
        ;[...allowedModifiersProp].forEach((allowedModifier) => {
          parsedStringArray.push(
            `${allowedModifier}-${key}:${variant}-${value}`
          )
        })
        return
      }
    })
    return parsedStringArray.join(" ")
  }

  const { text, color: colorPalette, border, theme } = activePalette
  let selectedText
  let selectedBorder
  let selectedColor
  let textString
  let colorString: string
  let borderString
  if (!makUiVariantsSet.has(textProps as MakUiVariantKey)) {
    textString = textProps
  } else {
    selectedText = text[textProps as MakUiVariantKey]
    textString = objectToClassName(selectedText, "text")
  }
  if (!makUiVariantsSet.has(borderProps as MakUiVariantKey)) {
    borderString = borderProps
  } else {
    selectedBorder = border[borderProps as MakUiVariantKey]
    borderString = objectToClassName(selectedBorder, "border")
  }
  if (!makUiVariantsSet.has(colorProps as MakUiVariantKey)) {
    colorString = colorProps
  } else {
    selectedColor = colorPalette[colorProps as MakUiVariantKey]
    colorString = objectToClassName(selectedColor, "bg")
  }

  const computedBorder = `border-[${borderPx}px] ${borderString}`
  const computedToggle = () => {
    if (!color) return `after:bg-${theme.primary}`

    if (!checkedColor) {
      return `after:${color}`
    } else {
      return `after:${color} after:peer-checked:${checkedColor}`
    }
  }
  const computedBackground = () => {
    if (!bgColor) return colorString as string

    if (!bgCheckedColor) {
      return `${bgColor}`
    } else {
      return `${bgColor} peer-checked:${bgCheckedColor}`
    }
  }

  return (
    <span className="flex items-center">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checkedProp}
          disabled={disabled}
          className="sr-only peer"
          onChange={(e) => {
            onChange && onChange(e)
          }}
        />

        <span
          className={`w-12 h-[25px] ${computedBackground()} ${computedBorder} rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[3px] after:start-1 after:peer-checked:start-[4px] ${computedToggle()} after:rounded-full after:h-5 after:w-5 after:transition-all`}
        />
      </label>
    </span>
  )
}

export default Toggle
