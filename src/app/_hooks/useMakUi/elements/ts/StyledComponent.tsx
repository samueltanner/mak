import styled from "@emotion/styled"
import { GenericObject } from "../../types/ui-types"

const BaseStyledComponent = styled.div<any>(({ styleObject }) => ({
  ...styleObject,
}))

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

const StyledComponent = ({ as: Component = "div", styleObject, ...props }) => {
  const formattedStyleString = formatJsonToHtmlString(styleObject)

  return (
    <BaseStyledComponent
      as={Component}
      styleObject={styleObject}
      className={props.className}
      data-mak-class={props.makClassName}
      data-mak-style={formattedStyleString}
      {...props}
    />
  )
}

export default StyledComponent
