"use client"
import { useMakUi } from "./_hooks/useMakUi/context/MakUiContext"
import MakFormView from "./_views/MakFormView"
import MakUiView from "./_views/MakUiView"

export default function Home() {
  const { activePalette, palette } = useMakUi()

  return (
    <main className={`h-screen w-screen p-4 bg-${activePalette.theme.primary}`}>
      <div className="flex w-full h-full justify-between">
        <MakUiView />
        <MakFormView />
        <button
          className={`p-6 h-fit w-fit bg-red-500 dark:bg-blue-500 font-bold text-xl text-${activePalette.text.primary.default.base}`}
        >
          hi there
        </button>
      </div>
    </main>
  )
}
