"use client"
import MakFormView from "./_views/MakFormView"
import MakUiView from "./_views/MakUiView"
import ThemeButton from "./_components/ThemeButton"
import { useMakUi } from "./_hooks/useMakUi/context/MakUiContext"
import { mak } from "./_hooks/useMakUi/elements/ts/mak"
import styled from "@emotion/styled"

export default function Home() {
  return (
    <div className="relative h-screen w-screen p-4">
      <div className="flex w-full h-full justify-between">
        {/* <MakUiView /> */}
        {/* <MakFormView /> */}

        {/* <Global> */}
        <div className="flex flex-col gap-2 size-fit p-4 border-2 group">
          PARENT
          <span className="flex flex-col gap-2 size-fit p-4 border-2 group-hover:bg-red-500 group/child">
            first child
            <span className="flex flex-col gap-2 size-fit p-4 border-2 group-hover/child:bg-blue-500">
              first grandchild
            </span>
          </span>
        </div>
        {/* <StyledParent className="p-4 flex flex-col gap-4 border-2 h-fit w-fit group">
          i am the parent
          <mak.span className="group-hover">I am the other child</mak.span>
        </StyledParent>
        <mak.span
          className="p-4 flex flex-col gap-4 border-2 h-fit w-fit group"
          makClassName="*-hover:bg-primary"
        >
          i am the parent
          <mak.span>I am the other child</mak.span>
        </mak.span> */}
        {/* </Global> */}

        <div className="absolute bottom-4 right-4">
          <ThemeButton />
        </div>
      </div>
    </div>
  )
}
