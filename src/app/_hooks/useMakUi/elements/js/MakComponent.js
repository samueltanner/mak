import React, { forwardRef } from "react"

const MakComponent = forwardRef(({ component, ...props }, ref) => {
  console.log("MakComponent", component, props)
  return React.createElement(component, { ...props, ref })
})

export default MakComponent
