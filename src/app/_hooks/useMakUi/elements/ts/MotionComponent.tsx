// MotionComponent.tsx
import { MotionProps, motion } from "framer-motion"
import { forwardRef } from "react"
import { GenericObject } from "../../types/ui-types"
import styled from "@emotion/styled"
import { formatJsonToHtmlString } from "../../functions/helpers"

const BaseStyledComponent = styled.div<any>(({ styleObject }) => ({
  ...styleObject,
}))

const MotionComponent = forwardRef(
  (
    {
      motionProps,
      children,
      component: Component,
      styleObject,
    }: {
      motionProps: MotionProps
      children: React.ReactNode
      component: string
      styleObject: GenericObject
    },
    ref
  ) => {
    const MotionComponent = motion[
      Component as keyof typeof motion
    ] as React.ComponentType<any>
    const formattedStyleString = formatJsonToHtmlString(styleObject)

    console.log(styleObject)

    return (
      <BaseStyledComponent
        as={MotionComponent}
        styleObject={formattedStyleString}
        ref={ref}
        {...motionProps}
      >
        {children}
      </BaseStyledComponent>
    )
    return <MotionComponent {...motionProps}>{children}</MotionComponent>
  }
)

export default MotionComponent
