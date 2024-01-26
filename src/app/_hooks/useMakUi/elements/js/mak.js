import React from "react"
import MakComponent from "./MakComponent"

const handler = {
  get(_, tag) {
    return (props) => <MakComponent component={tag} {...props} />
  },
}

const mak = new Proxy({}, handler)

export { mak }
