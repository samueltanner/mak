"use client"
import { useMakUi } from "./_hooks/useMakUi/context/MakUiContext"
import MakFormView from "./_views/MakFormView"
import MakUiView from "./_views/MakUiView"
import ThemeButton from "./_components/ThemeButton"
import { mak } from "./_hooks/useMakUi/elements/ts/mak"
export default function Home() {
  const { simplePalette, simpleTheme, verbosePalette } = useMakUi()
  console.log(verbosePalette)
  return (
    <div className={`relative h-screen w-screen p-4`}>
      <div className="flex w-full h-full justify-between">
        <MakUiView />
        <MakFormView />
        <div className="absolute bottom-4 right-4">
          <ThemeButton />
        </div>
        <div
          className="flex size-4"
          style={{
            backgroundColor: "red",
          }}
        />
      </div>
    </div>
  )
}
