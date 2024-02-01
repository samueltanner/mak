import { motion } from "framer-motion"
import styled from "@emotion/styled"
import { GenericObject } from "../../types/ui-types"

const StyledMotionComponent = ({
  as: Component = "div",
  styleObject,
  motionProps,
  ...props
}) => {
  const {
    makClassName,
    component,
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
  const MotionComponent = motion[Component]

  const BaseStyledComponent = styled(MotionComponent)<any>(
    ({ styleObject }) => {
      return {
        ...styleObject,
      }
    }
  )

  const formatJsonToHtmlString = (jsonObject: GenericObject) => {
    return Object.entries(jsonObject)
      .map(([key, value]) => {
        if (typeof value === "object") {
          return `${key}: {${formatJsonToHtmlString(value)}}`
        } else {
          return `${key}: ${value}`
        }
      })
      .join("; ")
  }
  const formattedStyleString = formatJsonToHtmlString(styleObject)

  return (
    <BaseStyledComponent
      as={Component}
      styleObject={styleObject}
      className={props.className}
      data-mak-class={props.makClassName}
      data-mak-style={formattedStyleString}
      {...motionProps}
      {...restProps}
    />
  )
}

export default StyledMotionComponent
