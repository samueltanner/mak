"use client"
import { useMakUi } from "./_hooks/useMakUi/context/MakUiContext"
import MakFormView from "./_views/MakFormView"
import MakUiView from "./_views/MakUiView"

export default function Home() {
  const { activePalette, palette, theme } = useMakUi()
  console.log(theme?.theme.primary)

  console.log(theme)
  return (
    <main className={`h-screen w-screen p-4 bg-${theme?.theme.secondary}`}>
      <div className="flex w-full h-full justify-between">
        <MakUiView />
        <MakFormView />
        <button
          className={`rounded-md h-fit w-fit bg-mak-teal-50 px-4 py-2 font-normal text-mak-teal-900 drop-shadow-hard-sm`}
        >
          hi there
        </button>
        <input
          type="text"
          className="rounded-md h-fit w-fit bg-white px-4 py-2 font-normal text-mak-teal-900 focus:outline-none shadow-hard-sm"
        />
      </div>
    </main>
  )
}
