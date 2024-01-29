import {
  makUiThemeVariants,
  makUiThemeVariantsSet,
  makUiVariantsSet,
} from "../constants/ui-constants"
import { useMakUi } from "../context/MakUiContext"
import { objectToClassName } from "../functions/helpers"
import { TypeProps, ComponentWrapperResponse } from "../types/component-types"
import {
  MakUiStateKey,
  MakUiThemeVariantKey,
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
            ...response,
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
    mode: themeMode,
    theme: themeProps,
    color: colorProps,
    text: textProps,
    border: borderProps,
    borderPx,
    className,
    ...restWithComputedProps
  } = withComputedProps(props)

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

  let selectedTheme
  let selectedText
  let selectedBorder
  let selectedColor
  let themeString: string | undefined
  let textString: string | undefined
  let colorString: string | undefined
  let borderString: string | undefined

  const styleObject = {
    backgroundColor: undefined as string | undefined,
    borderColor: undefined as string | undefined,
    color: undefined as string | undefined,
  }

  if (!makUiThemeVariantsSet.has(themeProps as MakUiThemeVariantKey)) {
    themeString = themeProps
  } else {
    console.log("themeProps", themeProps)
    selectedTheme = themePalette[themeProps as MakUiThemeVariantKey]
    themeString = `bg-${selectedTheme}`
    styleObject.backgroundColor = selectedTheme
  }
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
    styleObject,
    themeString,
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
