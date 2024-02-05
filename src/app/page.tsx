"use client"
import MakFormView from "./_views/MakFormView"
import MakUiView from "./_views/MakUiView"
import ThemeButton from "./_components/ThemeButton"

export default function Home() {
  return (
    <div className="flex relative h-screen w-screen p-4">
      <div className="flex gap-4 flex-col w-full h-full">
        <MakUiView />
        <MakFormView />
        <div className="absolute bottom-4 right-4">
          <ThemeButton />
        </div>
      </div>
    </div>
  )
}
