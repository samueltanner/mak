import { TypeProps } from "../../types/component-types"
import { MotionProps } from "framer-motion"

export type MakUiElementProps = TypeProps & {
  motion?: MotionProps
  // Add other custom props here
}
