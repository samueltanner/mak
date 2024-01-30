import styled from "@emotion/styled"
import { GenericObject } from "../../types/ui-types"

const StyledComponent = styled.div<any>(
  (styleProps: GenericObject) => {
    console.log("styleProps", styleProps)
    return {
      ...styleProps.styleProps,
      transition: "all 0.3s ease",
    }
  }
)

export default StyledComponent
