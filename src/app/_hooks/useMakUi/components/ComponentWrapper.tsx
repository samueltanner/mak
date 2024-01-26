import { makUiVariantsSet } from "../constants/ui-constants"
import { useMakUi } from "../context/MakUiContext"
import { objectToClassName } from "../functions/helpers"
import { TypeProps, ComponentWrapperResponse } from "../types/component-types"
import {
  MakUiStateKey,
  MakUiVariantKey,
  TailwindModifier,
} from "../types/ui-types"
import { withComputedProps } from "./componentTypeProps"

type ComponentWrapperProps = TypeProps & {
  children: ((props: any) => JSX.Element) | JSX.Element
}

const ComponentWrapper = ({ children, ...props }: ComponentWrapperProps) => {
  const makUi = useMakUi()
  const response = componentWrapperLogic({
    props,
    makUi,
  })

  return (
    <>
      {typeof children === "function"
        ? children({
            computedProps: response,
            ...props,
          })
        : children}
    </>
  )
}

export default ComponentWrapper

export const componentWrapperLogic = ({
  props,
  makUi,
}: {
  props: TypeProps
  makUi: ReturnType<typeof useMakUi>
}) => {
  const {
    theme: makTheme,
    verbosePalette: makVerbosePalette,
    verboseTheme: makVerboseTheme,
  } = makUi
  const {
    themeMode,
    theme: themeProps,
    color: colorProps,
    text: textProps,
    border: borderProps,
    borderPx,
    className,
    ...restWithComputedProps
  } = withComputedProps(props)

  // const { colorStates, borderStates, textStates } = restWithComputedProps

  const activeThemeMode = themeMode
    ? themeMode
    : makTheme
    ? makTheme
    : undefined

  const activePalette = activeThemeMode
    ? makVerbosePalette[activeThemeMode]
    : makVerboseTheme

  const {
    text: textPalette,
    color: colorPalette,
    border: borderPalette,
    theme: themePalette,
  } = activePalette
  let selectedText
  let selectedBorder
  let selectedColor
  let textString: string | undefined
  let colorString: string | undefined
  let borderString: string | undefined
  if (!makUiVariantsSet.has(textProps as MakUiVariantKey)) {
    textString = textProps
  } else {
    selectedText = textPalette[textProps as MakUiVariantKey]
    textString = objectToClassName({
      object: selectedText,
      variant: "text",
      // allowedStates: textStates,
    })
  }
  if (!makUiVariantsSet.has(borderProps as MakUiVariantKey)) {
    borderString = borderProps
  } else {
    selectedBorder = borderPalette[borderProps as MakUiVariantKey]
    borderString = objectToClassName({
      object: selectedBorder,
      variant: "border",
      // allowedStates: borderStates,
    })
  }
  if (!makUiVariantsSet.has(colorProps as MakUiVariantKey)) {
    colorString = colorProps
  } else {
    selectedColor = colorPalette[colorProps as MakUiVariantKey]
    colorString = objectToClassName({
      object: selectedColor,
      variant: "bg",
      // allowedStates: colorStates,
    })
  }

  const response: ComponentWrapperResponse = {
    textString,
    colorString,
    borderString,
    componentTheme: themePalette,
    componentText: textPalette,
    componentColor: colorPalette,
    componentBorder: borderPalette,
    componentPalette: activePalette,
    componentThemeMode: activeThemeMode,
    globalThemeMode: makTheme,
    globalTheme: makVerboseTheme,
    globalPalette: makVerbosePalette,
    objectToClassName,
    borderPx,
    className,
    ...restWithComputedProps,
  }

  return response
}
