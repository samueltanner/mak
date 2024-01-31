// mak.js

import { MakComponent } from "./MakComponent"
import { MakUiElementProps } from "./mak-custom-types"
import { MotionProps } from "framer-motion"

type ExtendedHTMLElement<K extends keyof JSX.IntrinsicElements> =
  React.ComponentType<JSX.IntrinsicElements[K] & MakUiElementProps>

type Mak = {
  [K in keyof JSX.IntrinsicElements]: ExtendedHTMLElement<K>
}

const componentCache = {}

const handler: ProxyHandler<{}> = {
  get(_: any, tag: keyof JSX.IntrinsicElements) {
    if (!componentCache[tag]) {
      componentCache[tag] = (props: any) => (
        <MakComponent component={tag} {...props} />
      )
    }
    return componentCache[tag]
  },
}

const mak = new Proxy({}, handler) as Mak

export { mak }
