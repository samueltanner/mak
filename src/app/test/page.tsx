"use client"
/** @jsxImportSource @emotion/react */

import { useState } from "react"
import styled from "@emotion/styled"
import { mak } from "../_hooks/useMakUi/elements/ts/mak"
import StyledComponent from "../_hooks/useMakUi/elements/ts/StyledComponent"

interface StyledElementProps {
  color: string
  backgroundColor: string
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
      <span className="flex gap-2">
        <label>Toggle</label>
        <input
          type="checkbox"
          checked={toggle}
          onChange={() => {
            setToggle(!toggle)
            setStyleObject({
              ...styleObject,
              backgroundColor: toggle ? "blue" : "red",
              color: toggle ? "red" : "blue",
              "&:hover": {
                backgroundColor: "green",
                color: "yellow",
              },
            })
          }}
        />
      </span>
      <div className="group bg-zinc-500 w-fit p-4">
        <span>we are a group</span>
        <mak.div
          className="text-primary w-fit fade-in-out"
          makClassName={`${toggle ? "bg-purple-500" : "bg-orange-500"} ${
            toggle ? "hover:bg-blue-400" : "hover:bg-yellow-400"
          } group-hover:bg-green-500`}
        >
          Mak Div
        </mak.div>
      </div>
      {/* <StyledComponent {...styleObject}>Styled Element</StyledComponent> */}
    </div>
  )
}

export default DummyPage
