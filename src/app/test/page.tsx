"use client"
/** @jsxImportSource @emotion/react */

import { useState } from "react"
import styled from "@emotion/styled"
import { mak } from "../_hooks/useMakUi/elements/ts/mak"
import StyledComponent from "../_hooks/useMakUi/elements/ts/StyledComponent"
import Toggle from "../_hooks/useMakUi/components/Toggle"

interface StyledElementProps {
  color: string
  backgroundColor: string
}

const StyledSpan = styled.span({
  height: "8rem",
  width: "fit-content",
  backgroundColor: "red",

  'input[type="checkbox"].peer:checked ~ &': {
    backgroundColor: "blue",

    "*": {
      backgroundColor: "yellow",
      "&:hover": {
        backgroundColor: "green",
      },
    },

    'input[type="checkbox"].peer:checked ~ & *': {
      backgroundColor: "yellow",
    },
  },
  "*": {
    backgroundColor: "purple",
  },
})

const ConditionalStyledComponent = styled.div({
  'input[type="checkbox"]:checked ~ & *': {
    color: "red",
  },
})

const DummyPage = () => {
  const [toggle, setToggle] = useState<boolean>(false)
  const [color, setColor] = useState<string>("red")
  const [bgColor, setBgColor] = useState<string>("blue")
  const [styleObject, setStyleObject] = useState<GenericObject>({
    backgroundColor: "blue",
    color: "red",
    display: "flex",
    width: "fit-content",
  })
  return (
    <div>
      <h1>Test Page</h1>
      <Toggle
        checked={toggle}
        onChange={() => setToggle(!toggle)}
        darkMode
        custom
        // border="primary-500"
        // bgColor="#854d0e"
        // bgCheckedColor="blue-500"
      />
    </div>
  )
}

export default DummyPage
