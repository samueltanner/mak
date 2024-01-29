// MakComponent.tsx
import { forwardRef, ReactNode, createElement } from "react"
import { useMakUi } from "../../context/MakUiContext"
import { MakUiElementProps } from "./mak-custom-types"
import { componentWrapperLogic } from "../../components/ComponentWrapper"
import styled from "styled-components"

type HTMLMakComponentProps<K extends keyof JSX.IntrinsicElements> =
  MakUiElementProps & {
    component: K
    children?: ReactNode
  } & JSX.IntrinsicElements[K]

const MakComponent = forwardRef<
  HTMLElement,
  HTMLMakComponentProps<keyof JSX.IntrinsicElements>
>(({ component, ...props }, ref) => {
  const makUi = useMakUi()
  const response = componentWrapperLogic({
    props,
    makUi,
  })

  console.log("response", response.themeString)

  const allProps = { ...props, ref }

  const { textString, colorString, borderString } = response

  const updatedClassNameArray = [
    allProps.className,
    textString,
    colorString,
    borderString,
  ]

  allProps.className = updatedClassNameArray.filter(Boolean).join(" ")
  console.log({ updatedClassNameArray, allProps, className: props.className })

  return createElement(component, allProps)
})

MakComponent.displayName = "MakComponent"
export { MakComponent }
