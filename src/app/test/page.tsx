"use client"
/** @jsxImportSource @emotion/react */

import { useState } from "react"
import styled from "@emotion/styled"
import { mak } from "../_hooks/useMakUi/elements/ts/mak"
import StyledComponent from "../_hooks/useMakUi/elements/ts/StyledComponent"
import Toggle from "../_hooks/useMakUi/components/Toggle"
import { AnimatePresence } from "framer-motion"

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

const divVariants = {
  hidden: {
    opacity: 0,
    height: 0,
  },
  visible: {
    opacity: 1,
    height: "fit-content",
  },
  exit: {
    opacity: 0,
    height: 0,
  },
}

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
      <button
        onClick={() => {
          setToggle(!toggle)
        }}
      >
        toggle
      </button>
    </div>
  )
}

export default DummyPage
