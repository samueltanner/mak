// mak.js

import { MakComponent } from "./MakComponent"
import { MakUiElementProps } from "./mak-custom-types"
import { forwardRef } from "react"

type ExtendedHTMLElement<K extends keyof JSX.IntrinsicElements> =
  React.ComponentType<
    JSX.IntrinsicElements[K] & MakUiElementProps & { ref?: React.Ref<any> }
  >

type Mak = {
  [K in keyof JSX.IntrinsicElements]: ExtendedHTMLElement<K>
}

const componentCache = {} as Record<keyof JSX.IntrinsicElements, any>

const handler: ProxyHandler<{}> = {
  get(_: any, tag: keyof JSX.IntrinsicElements) {
    if (!componentCache[tag]) {
      const ForwardedComponent = forwardRef((props: any, ref) => {
        return <MakComponent component={tag} {...props} ref={ref} />
      })

      ForwardedComponent.displayName = `Mak${
        tag.charAt(0).toUpperCase() + tag.slice(1)
      }`

      componentCache[tag] = ForwardedComponent
    }
    return componentCache[tag]
  },
}

const mak = new Proxy({}, handler) as Mak

export { mak }
