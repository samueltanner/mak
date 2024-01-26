// mak.js

import { MakComponent } from "./MakComponent"
import { MakUiElementProps } from "./mak-custom-types"

type ExtendedHTMLElement<K extends keyof JSX.IntrinsicElements> =
  React.ComponentType<JSX.IntrinsicElements[K] & MakUiElementProps>

type Mak = {
  [K in keyof JSX.IntrinsicElements]: ExtendedHTMLElement<K>
}

const handler: ProxyHandler<{}> = {
  get(_: any, tag: keyof JSX.IntrinsicElements) {
    return (props: any) => <MakComponent component={tag} {...props} />
  },
}

const mak = new Proxy({}, handler) as Mak

export { mak }
