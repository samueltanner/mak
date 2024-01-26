"use client"
import { useMakUi } from "./_hooks/useMakUi/context/MakUiContext"
import MakFormView from "./_views/MakFormView"
import MakUiView from "./_views/MakUiView"
import ThemeButton from "./_components/ThemeButton"
import { mak } from "./_hooks/useMakUi/elements/ts/mak"
export default function Home() {
  const { simplePalette, simpleTheme, verbosePalette } = useMakUi()
  console.log("simplePalette", verbosePalette)

  return (
    <main
      className={`relative h-screen w-screen p-4 bg-${simpleTheme.theme.primary}`}
    >
      <div className="flex w-full h-full justify-between">
        <MakUiView />
        <MakFormView />
        <div className="absolute bottom-4 right-4">
          <ThemeButton />
        </div>
        <div className="group">
          <span className="bg-red-500 group-has-[:enabled]:bg-blue-500">
            hi there
          </span>
          <a href="#" className="group-has-[:button]:bg-blue-500">
            hi there
          </a>
        </div>
      </div>
      {/* <mak.div
        className={`absolute bottom-4 left-4 p-4`}
        textTertiary
        themeLight
        primary
      >
        hi
      </mak.div> */}
    </main>
  )
}
