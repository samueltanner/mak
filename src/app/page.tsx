"use client";
import MakFormView from "./_views/MakFormView";
import MakUiView from "./_views/MakUiView"
import ThemeButton from "./_components/ThemeButton"

export default function Home() {
  return (
    <div className="relative h-screen w-screen p-4">
      <div className="flex w-full h-full justify-between">
        <MakUiView />
        <MakFormView />
        <div className="absolute bottom-4 right-4">
          <ThemeButton />
        </div>
      </div>
    </div>
  )
}
