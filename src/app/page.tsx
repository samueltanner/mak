"use client"
import MakFormView from "./_views/MakFormView"
import MakUiView from "./_views/MakUiView"
import ThemeButton from "./_components/ThemeButton"
import { useMakUi } from "./_hooks/useMakUi/context/MakUiContext"
import { mak } from "./_hooks/useMakUi/elements/ts/mak"
import styled from "@emotion/styled"

const Global = styled.div({
  ".group:hover .group-hover\\:bg-danger": {
    backgroundColor: "#dc2626",
  },
})

export default function Home() {
  return (
    <div className="relative h-screen w-screen p-4">
      <div className="flex w-full h-full justify-between">
        <MakUiView />
        {/* <MakFormView /> */}

        <div className="absolute bottom-4 right-4">
          <ThemeButton />
        </div>
      </div>
    </div>
  )
}
