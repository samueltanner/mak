// MakComponent.tsx
import { forwardRef, ReactNode, createElement } from "react"
import { useMakUi } from "../../context/MakUiContext"
import { MakUiElementProps } from "./mak-custom-types"
import { withComputedProps } from "../../components/componentTypeProps"
import { componentWrapperLogic } from "../../components/ComponentWrapper"

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

  console.log("response", response)

  const allProps = { ...props, ref }

  const { textString, colorString, borderString } = response



  const updatedClassName =
    props.className + " " + textString + " " + colorString + " " + borderString

  allProps.className = updatedClassName

  return createElement(component, allProps)
})

MakComponent.displayName = "MakComponent"
export { MakComponent }
