"use client"
import Button from "./_hooks/useMakUi/components/Button"
import { useMakUi } from "./_hooks/useMakUi/context/MakUiContext"
import MakFormView from "./_views/MakFormView"
import MakUiView from "./_views/MakUiView"

export default function Home() {
  const { palette, theme, simpleTheme } = useMakUi()

  console.log(theme)
  return (
    <main className={`h-screen w-screen p-4 bg-${theme?.theme.secondary}`}>
      <div className="flex w-full h-full justify-between">
        <MakUiView />
        <MakFormView />
        <Button custom outline textPrimary>hi there</Button>
        <input
          type="text"
          className="rounded-md h-fit w-fit bg-white px-4 py-2 font-normal text-mak-teal-900 focus:outline-none shadow-hard-sm"
        />
      </div>
    </main>
  )
}
