// MakComponent.tsx
/** @jsxImportSource @emotion/react */

import { createElement, forwardRef, ReactNode, useMemo, memo } from "react"
import { useMakUi } from "../../context/MakUiContext"
import { MakUiElementProps } from "./mak-custom-types"
import { componentWrapperLogic } from "../../components/ComponentWrapper"
import styled from "@emotion/styled"
import { GenericObject } from "../../types/ui-types"

type HTMLMakComponentProps<K extends keyof JSX.IntrinsicElements> =
  MakUiElementProps & {
    component: K
    children?: ReactNode
  } & JSX.IntrinsicElements[K]

const createStyledElement = memoize(
  (styleObject: GenericObject, fadeInOut: boolean = true) => {
    console.log("styleObject", styleObject)
    return styled.span({
      ...styleObject,
      // transition: fadeInOut ? "all 200ms ease-in-out" : "",
      // transition: "background-color 200ms ease-in-out",
      transition: "background-color 200ms ease-in-out",
    })
  }
)

function memoize(fn: any) {
  const cache = {}
  return function (...args: any[]) {
    const key = JSON.stringify(args)
    if (!cache[key]) {
      cache[key] = fn(...args)
    }
    return cache[key]
  }
}

// const MakComponent = memo(
//   forwardRef<HTMLElement, HTMLMakComponentProps<keyof JSX.IntrinsicElements>>(
//     ({ component, ...props }, ref) => {
//       const makUi = useMakUi()
//       const response = useMemo(() => {
//         return componentWrapperLogic({
//           props,
//           makUi,
//         })
//       }, [props, makUi])

//       const allProps = { ...props, ref }

//       const { styleObject, className, makClassName } = response

//       allProps.className = className
//       allProps.makClassName = makClassName
//       console.log("makClassName", makClassName)

//       const StyledElement = createStyledElement(styleObject)

//       return <StyledElement as={component} {...allProps} />
//       // return createElement(component, allProps)
//     }
//   )
// )

// MakComponent.displayName = "MakComponent"
// export { MakComponent }

const MakComponent = memo(
  forwardRef<HTMLElement, HTMLMakComponentProps<keyof JSX.IntrinsicElements>>(
    ({ component, ...props }, ref) => {
      const makUi = useMakUi()
      const response = useMemo(() => {
        return componentWrapperLogic({
          props,
          makUi,
        })
      }, [props, makUi])

      const { styleObject } = response

      // Adjust the styleObject to include the transition.
      const adjustedStyle = {
        ...styleObject,
        // transition: "background-color 200ms ease-in-out",
      }

      // Apply styles directly as inline styles.
      const allProps = { ...props, ref, style: adjustedStyle }

      return createElement(component, allProps)
    }
  )
)

MakComponent.displayName = "MakComponent"
export { MakComponent }
