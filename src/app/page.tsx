"use client"
import { useMakUi } from "./_hooks/useMakUi/context/MakUiContext"
import MakFormView from "./_views/MakFormView"
import MakUiView from "./_views/MakUiView"
import ThemeButton from "./_components/ThemeButton"

export default function Home() {
  const { simplePalette, simpleTheme } = useMakUi()

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
      </div>
    </main>
  )
}
