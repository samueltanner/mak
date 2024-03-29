"use client"

import { forwardRef, ReactNode, useMemo, memo, useEffect } from "react"
import { useMakUi } from "../../context/MakUiContext"
import { MakUiElementProps } from "./mak-custom-types"
import { componentWrapperLogic } from "../../components/ComponentWrapper"
import StyledComponent from "./StyledComponent"
import { isEmptyObject } from "../../../../../globals/global-helper-functions"
import StyledMotionComponent from "./StyledMotionComponent"
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

      const { makCSSObject, twClassName, makClassName, ...responseRest } =
        response

      useEffect(() => {
        if (
          (resolvedMakClassName?.includes("group-") ||
            resolvedMakClassName?.includes("peer-")) &&
          styleSheet
        ) {
          const updatedStyleSheet = {
            ...styleSheet,
          }
          Object.entries(makCSSObject).forEach(([key, value]) => {
            if (key.match(/(group)|(peer)/g) && !styleSheet[key]) {
              updatedStyleSheet[key] = value

              setStyleSheet(updatedStyleSheet)
            }
          })
        }
      }, [setStyleSheet, makCSSObject])

      const resolvedCombinedClassName = [
        resolvedClassName || "",
        resolvedMakClassName || "",
        makClassName || "",
      ]
        .join(" ")
        .trim()

      const allProps = {
        makTwClassName: resolvedCombinedClassName,
        twClassName: resolvedClassName,
        makClassName: resolvedMakClassName,
        component,
        defaultConfig: componentConfig,
        ...responseRest,
      }

      const inlineStyles = {
        ...makCSSObject,
      }

      const isMotionObject = motion && !isEmptyObject(motion)

      if (isMotionObject) {
        return (
          <StyledMotionComponent
            ref={ref}
            styleObject={inlineStyles}
            as={component}
            motionProps={motion}
            {...allProps}
          />
        )
      }

      return (
        <StyledComponent
          ref={ref}
          styleObject={inlineStyles}
          as={component}
          {...allProps}
        />
      )
    }
  )
)

MakComponent.displayName = "MakComponent"
export { MakComponent }
