// MakComponent.tsx
/** @jsxImportSource @emotion/react */

import { forwardRef, ReactNode, useMemo, memo } from "react"
import { useMakUi } from "../../context/MakUiContext"
import { MakUiElementProps } from "./mak-custom-types"
import { componentWrapperLogic } from "../../components/ComponentWrapper"
import StyledComponent from "./StyledComponent"
import { isEmptyObject } from "../../../../../globals/global-helper-functions"
import StyledMotionComponent from "./StyledMotionComponent"
import {
  MakUiComponentConfig,
  MakUiRootComponentConfig,
} from "../../types/component-types"
import { mergeDefaultConfig } from "../../functions/helpers"

type HTMLMakComponentProps<K extends keyof JSX.IntrinsicElements> =
  MakUiElementProps & {
    component: K
    children?: ReactNode
  } & JSX.IntrinsicElements[K]

const MakComponent = memo(
  forwardRef<HTMLElement, HTMLMakComponentProps<keyof JSX.IntrinsicElements>>(
    ({ component, motion, useConfig, ...props }, ref) => {
      const makUi = useMakUi()

      let { resolvedClassName, resolvedMakClassName, componentConfig } = mergeDefaultConfig({
        makUi,
        useConfig,
        component,
        className: props?.className,
        makClassName: props?.makClassName,
      })

      const response = useMemo(() => {
        return componentWrapperLogic({
          props: props,
          makUi,
        })
      }, [props, makUi])

      const { styleObject, twClassName, makClassName, ...responseRest } =
        response
      const { baseClassObject = {}, pseudoClassObject = {} } = styleObject

      const allProps = {
        className: twClassName,
        makClassName,
        component,
        ref,
        defaultConfig: componentConfig,
        ...responseRest,
      }

      const inlineStyles = {
        ...baseClassObject,
        ...pseudoClassObject,
      }
      const isMotionObject = motion && !isEmptyObject(motion)

      if (isMotionObject) {
        return (
          <StyledMotionComponent
            styleObject={inlineStyles}
            as={component}
            motionProps={motion}
            className={twClassName}
            {...allProps}
          />
        )
      }

      return (
        <StyledComponent
          styleObject={inlineStyles}
          as={component}
          className={twClassName}
          {...allProps}
        />
      )
    }
  )
)

MakComponent.displayName = "MakComponent"
export { MakComponent }
