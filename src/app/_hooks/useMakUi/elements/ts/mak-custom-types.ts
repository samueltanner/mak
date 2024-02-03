import { TypeProps } from "../../types/component-types"
import { HTMLMotionProps, MotionProps } from "framer-motion"

export type MakUiElementProps = TypeProps & {
  motion?: MotionProps
  // Add other custom props here
}
