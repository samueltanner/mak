import {
  makUiThemeVariants,
  makUiThemeVariantsSet,
  makUiVariantsSet,
} from "../constants/ui-constants"
import { useMakUi } from "../context/MakUiContext"
import {
  objectToClassName,
  parseClassNameToStyleObject,
} from "../functions/helpers"
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
  let {
    mode: themeMode,
    theme: themeProps,
    color: colorProps,
    text: textProps,
    border: borderProps,
    className,
    makClassName,
    ...restWithComputedProps
  } = withComputedProps(props)

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

  const { styleObject, twClassNames } = parseClassNameToStyleObject({
    className: className,
    makClassName,
    activeTheme,
  })

  const response: ComponentWrapperResponse = {
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
    className: twClassNames,
    makClassName,
    ...restWithComputedProps,
  }

  return response
}
