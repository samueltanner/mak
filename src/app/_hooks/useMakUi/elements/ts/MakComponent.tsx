// MakComponent.tsx
/** @jsxImportSource @emotion/react */

import { forwardRef, ReactNode, useMemo, memo } from "react"
import { useMakUi } from "../../context/MakUiContext"
import { MakUiElementProps } from "./mak-custom-types"
import { componentWrapperLogic } from "../../components/ComponentWrapper"
import styled from "@emotion/styled"
import { GenericObject } from "../../types/ui-types"
import StyledComponent from "./StyledComponent"

type HTMLMakComponentProps<K extends keyof JSX.IntrinsicElements> =
  MakUiElementProps & {
    component: K
    children?: ReactNode
  } & JSX.IntrinsicElements[K]

const createStyledElement = memoize((styleObject: GenericObject) => {
  return styled.span({
    ...styleObject,
  })
})

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

      const { styleObject = {}, pseudoObject = {} } = response.styleObject

      const inlineStyles = {
        ...styleObject,
        ...pseudoObject,
      }

      return (
        <StyledComponent styleObject={inlineStyles} as={component} {...props} />
      )
    }
  )
)

MakComponent.displayName = "MakComponent"
export { MakComponent }
