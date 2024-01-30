// MakComponent.tsx
/** @jsxImportSource @emotion/react */

import { createElement, forwardRef, ReactNode, useMemo } from "react"
import { useMakUi } from "../../context/MakUiContext"
import { MakUiElementProps } from "./mak-custom-types"
import { componentWrapperLogic } from "../../components/ComponentWrapper"
import styled from "@emotion/styled"
import { create } from "domain"

type HTMLMakComponentProps<K extends keyof JSX.IntrinsicElements> =
  MakUiElementProps & {
    component: K
    children?: ReactNode
  } & JSX.IntrinsicElements[K]

const MakComponent = forwardRef<
  HTMLElement,
  HTMLMakComponentProps<keyof JSX.IntrinsicElements>
>(({ component, ...props }, ref) => {
  // const makUi = useMakUi()
  // const response = useMemo(() => {
  //   return componentWrapperLogic({
  //     props,
  //     makUi,
  //   })
  // }, [props, makUi])

  const allProps = { ...props, ref }
  console.log("allProps", allProps)
  // const { styleObject, className, makClassName } = response

  // allProps.className = className
  // allProps.makClassName = makClassName

  const transitionStyles = {
    transition: "all 200ms ease-in-out",
  }

  // const StyledElement = styled(({ as: T = "div", ...props }) => (
  //   <T {...props} />
  // ))({
  //   // ...styleObject,
  //   // ...transitionStyles,
  // })

  // return <StyledElement as={component} {...allProps} />
  return createElement(component, allProps)
})

MakComponent.displayName = "MakComponent"
export { MakComponent }
