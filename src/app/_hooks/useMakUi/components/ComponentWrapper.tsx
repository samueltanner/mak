import { useMakUi } from "../context/MakUiContext"
import { parseClassNameToStyleObject } from "../functions/helpers"
import {
  TypeProps,
  ComponentWrapperResponse,
  ThemeVariantWithOpacity,
  VariantWithShade,
  VariantWithShadeAndOpacity,
  FalsyValue,
} from "../types/component-types"
import { MakUiThemeVariantKey, MakUiVariantKey } from "../types/ui-types"
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
  let {
    mode: themeMode,
    theme: themeProps,
    color: colorProps,
    text: textProps,
    border: borderProps,
    bg: bgProps,
    hasModeProps,
    hasThemeProps,
    hasColorProps,
    hasTextProps,
    hasBorderProps,
    hasBgProps,
    className,
    makClassName,
    ...restWithComputedProps
  } = withComputedProps(props)

  className = className
    ? className.trim().replace(/^undefined /g, "")
    : undefined
  makClassName = makClassName
    ? makClassName.trim().replace(/^undefined /g, "")
    : undefined

  const activeThemeMode = themeMode
    ? themeMode
    : makTheme
    ? makTheme
    : undefined

  const activeTheme = activeThemeMode
    ? makVerbosePalette[activeThemeMode]
    : makVerboseTheme

  const {
    text: textPalette,
    color: colorPalette,
    border: borderPalette,
    theme: themePalette,
  } = activeTheme

  if (themeProps) {
    const themeClassName = `theme-${themeProps}`
    makClassName = makClassName
      ? `${makClassName} ${themeClassName}`
      : themeClassName
  }

  if (colorProps) {
    const colorClassName = `bg-${colorProps}`
    makClassName = makClassName
      ? `${makClassName} ${colorClassName}`
      : colorClassName
  }

  if (textProps) {
    const textClassName = `text-${textProps}`
    makClassName = makClassName
      ? `${makClassName} ${textClassName}`
      : textClassName
  }

  if (borderProps) {
    const borderClassName = `border-${borderProps}`

    makClassName = makClassName
      ? `${makClassName} ${borderClassName}`
      : borderClassName
  }

  if (bgProps) {
    const bgClassName = `bg-${bgProps}`
    makClassName = makClassName ? `${makClassName} ${bgClassName}` : bgClassName
  }

  const {
    styleObject,
    twClassName,
    makClassName: makClassNames,
  } = parseClassNameToStyleObject({
    className,
    makClassName,
    activeTheme,
  })

  const response: ComponentWrapperResponse & TypeProps = {
    styleObject,
    componentTheme: themePalette,
    componentText: textPalette,
    componentColor: colorPalette,
    componentBorder: borderPalette,
    fullComponentTheme: activeTheme,
    componentThemeMode: activeThemeMode,
    globalThemeMode: makTheme,
    globalTheme: makVerboseTheme,
    globalPalette: makVerbosePalette,
    twClassName,
    makClassName: makClassNames,
    modeVariant: themeMode,
    hasModeProps,
    hasThemeProps,
    hasColorProps,
    hasTextProps,
    hasBorderProps,
    hasBgProps,
    themeVariant: themeProps as
      | MakUiThemeVariantKey
      | ThemeVariantWithOpacity
      | FalsyValue,
    colorVariant: colorProps as
      | MakUiVariantKey
      | VariantWithShade
      | VariantWithShadeAndOpacity
      | FalsyValue,
    textVariant: textProps as
      | MakUiVariantKey
      | VariantWithShade
      | VariantWithShadeAndOpacity
      | FalsyValue,
    borderVariant: borderProps as
      | MakUiVariantKey
      | VariantWithShade
      | VariantWithShadeAndOpacity
      | FalsyValue,
    bgVariant: bgProps as
      | MakUiVariantKey
      | VariantWithShade
      | VariantWithShadeAndOpacity
      | FalsyValue,
    _className: twClassName,
    _makClassName: makClassNames,
    children: restWithComputedProps.children,
    ...restWithComputedProps,
  }

  return response
}
