"use client"
import MakFormView from "./_views/MakFormView"
import MakUiView from "./_views/MakUiView"
import ThemeButton from "./_components/ThemeButton"
import { useMakUi } from "./_hooks/useMakUi/context/MakUiContext"
import { mak } from "./_hooks/useMakUi/elements/ts/mak"
import styled from "@emotion/styled"
import { useState } from "react"

export default function Home() {
  const [checked, setChecked] = useState(false)
  return (
    <div className="relative h-screen w-screen p-4">
      <div className="flex w-full h-full justify-between">
        <MakUiView />
        {/* <MakFormView /> */}
        {/* <div className="group/parent flex flex-col gap-2 border-2 size-fit p-4 m-2">
          parent group
          <input
            type="checkbox"
            className="peer/toggle"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <mak.span
            className="border-2 p-4 flex flex-col m-4"
            makClassName="peer-checked/toggle:bg-green-500"
          >
            mak child
            <mak.span
              className="border-2 p-4 flex flex-col m-4"
              makClassName="group-hover/child:text-tertiary"
            >
              mak grandchild
            </mak.span>
          </mak.span>
        </div> */}

        <div className="absolute bottom-4 right-4">
          <ThemeButton />
        </div>
      </div>
    </div>
  )
}
