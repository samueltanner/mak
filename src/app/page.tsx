"use client"
import { useMakUi } from "./_hooks/useMakUi/context/MakUiContext"
import MakFormView from "./_views/MakFormView"
import MakUiView from "./_views/MakUiView"

export default function Home() {
  const { activePalette } = useMakUi()

  return (
    <main className={`h-screen w-screen p-4 bg-${activePalette.theme.primary}`}>
      <div className="flex w-full h-full justify-between">
        <MakUiView />
        <MakFormView />
      </div>
    </main>
  )
}
