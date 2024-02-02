// MakComponent.tsx
/** @jsxImportSource @emotion/react */

import { forwardRef, ReactNode, useMemo, memo, useEffect } from "react"
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
import { mergeDefaultConfig, parseMakClassNames } from "../../functions/helpers"
import { GenericObject } from "../../types/ui-types"

type HTMLMakComponentProps<K extends keyof JSX.IntrinsicElements> =
  MakUiElementProps & {
    component: K
    children?: ReactNode
  } & JSX.IntrinsicElements[K]

const MakComponent = memo(
  forwardRef<HTMLElement, HTMLMakComponentProps<keyof JSX.IntrinsicElements>>(
    ({ component, motion, useConfig, ...props }, ref) => {
      const makUi = useMakUi()
      const { setStyleSheet, styleSheet } = makUi

      let { resolvedClassName, resolvedMakClassName, componentConfig } =
        mergeDefaultConfig({
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

      useEffect(() => {
        if (resolvedMakClassName?.includes("group-") && styleSheet) {
          const updatedStyleSheet = {
            ...styleSheet,
          }
          Object.entries(pseudoClassObject).forEach(([key, value]) => {
            if (!styleSheet[key]) {
              updatedStyleSheet[key] = value
              setStyleSheet(updatedStyleSheet)
            }
          })
        }
      }, [setStyleSheet, pseudoClassObject])

      resolvedClassName = [resolvedClassName, resolvedMakClassName]
        .join(" ")
        .trim()

      const allProps = {
        className: resolvedClassName,
        makClassName: resolvedMakClassName,
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
            className={resolvedClassName}
            {...allProps}
          />
        )
      }

      return (
        <StyledComponent
          styleObject={inlineStyles}
          as={component}
          className={resolvedClassName}
          {...allProps}
        />
      )
    }
  )
)

MakComponent.displayName = "MakComponent"
export { MakComponent }
