import { HTMLMotionProps, MotionProps, motion } from "framer-motion"
import styled from "@emotion/styled"
import { forwardRef, useMemo } from "react"
import { GenericObject, MakUiVerboseTheme } from "../../types/ui-types"
import { ComponentWrapperResponse } from "../../types/component-types"
import { formatJsonToHtmlString } from "../../functions/helpers"

const BaseStyledComponent = styled.div<any>(({ styleObject }) => ({
  ...styleObject,
}))

const StyledMotionComponent = forwardRef(
  (
    {
      as: Component = "div",
      styleObject,
      motionProps,
      ...props
    }: {
      as: string
      styleObject: GenericObject
      ref?: React.Ref<any>
      motionProps?: MotionProps
      makTwClassName?: string
      makClassName?: string
      twClassName?: string
      componentTheme?: ComponentWrapperResponse["componentTheme"]
      componentBorder?: ComponentWrapperResponse["componentBorder"]
      componentText?: ComponentWrapperResponse["componentText"]
      componentColor?: ComponentWrapperResponse["componentColor"]
      fullComponentTheme?: ComponentWrapperResponse["fullComponentTheme"]
      componentThemeMode?: ComponentWrapperResponse["componentThemeMode"]
      globalThemeMode?: ComponentWrapperResponse["globalThemeMode"]
      globalTheme?: ComponentWrapperResponse["globalTheme"]
      globalPalette?: ComponentWrapperResponse["globalPalette"]
    },
    ref
  ) => {
    const {
      makClassName,
      componentTheme,
      componentBorder,
      componentText,
      componentColor,
      fullComponentTheme,
      componentThemeMode,
      globalThemeMode,
      globalTheme,
      globalPalette,
      ...restProps
    } = props
    const MotionComponent = motion[
      Component as keyof typeof motion
    ] as React.ComponentType<any>

    const memoizedMotionProps = useMemo(() => motionProps, [motionProps])

    const formattedStyleString = formatJsonToHtmlString(styleObject)

    return (
      <BaseStyledComponent
        as={MotionComponent}
        styleObject={styleObject}
        className={props.makTwClassName}
        data-class={props.twClassName}
        data-mak-class={props.makClassName}
        data-mak-style={formattedStyleString}
        ref={ref}
        {...memoizedMotionProps}
        {...restProps}
      />
    )
  }
)

StyledMotionComponent.displayName = "StyledMotionComponent"
export default StyledMotionComponent
