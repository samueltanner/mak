"use client"
import { BiParty, BiSolidMoon, BiSun } from "react-icons/bi"
import Button from "./_hooks/useMakUi/components/Button"
import { useMakUi } from "./_hooks/useMakUi/context/MakUiContext"
import MakFormView from "./_views/MakFormView"
import MakUiView from "./_views/MakUiView"

export default function Home() {
  const {
    setTheme,
    isDark,
    isLight,
    isCustom,
    simplePalette,
    simpleTheme,
    enabledThemeModes,
    mcn,
  } = useMakUi()

  console.log(mcn("text-primary group-hover:text-primary"))

  return (
    <main className={`h-screen w-screen p-4 ${mcn("theme-primary")}`}>
      <div className="flex w-full h-full justify-between">
        <MakUiView />
        <MakFormView />
        <Button
          tertiary
          outline
          onClick={() => {
            setTheme(
              isDark
                ? "light"
                : isLight && enabledThemeModes.includes("custom")
                ? "custom"
                : "dark"
            )
          }}
          showFocusRing={false}
        >
          {isDark && (
            <BiSun
              className={`size-6 text-${simpleTheme.text.primary.base} hover:text-${simpleTheme.color.primary.base} fade-in-out`}
            />
          )}
          {isLight && (
            <BiSolidMoon
              // className="text-zinc-500 group-hover:text-blue-500"

              className={`size-6 text-${simpleTheme.text.primary.base} hover:text-${simpleTheme.color.primary.base} fade-in-out`}
            />
          )}
          {isCustom && (
            <BiParty
              className={`size-6 text-${simpleTheme.text.primary.base} hover:text-${simpleTheme.color.primary.base}`}
            />
          )}
        </Button>

        <input
          type="text"
          className="rounded-md h-fit w-fit bg-white px-4 py-2 font-normal text-mak-teal-900 focus:outline-none shadow-hard-sm"
        />
      </div>
    </main>
  )
}
