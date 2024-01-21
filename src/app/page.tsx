"use client"
import { BiParty, BiSolidMoon, BiSun } from "react-icons/bi"
import Button from "./_hooks/useMakUi/components/Button"
import { useMakUi } from "./_hooks/useMakUi/context/MakUiContext"
import MakFormView from "./_views/MakFormView"
import MakUiView from "./_views/MakUiView"

export default function Home() {
  const {
    palette,
    theme,
    simpleTheme,
    setTheme,
    isDark,
    isLight,
    isCustom,
    t,
  } = useMakUi()

  return (
    <main
      className={`h-screen w-screen p-4 
    
    `}
      // bg-${t.theme.secondary}
    >
      <div className="flex w-full h-full justify-between">
        <MakUiView />
        <MakFormView />
        {/* <Button
          secondary
          outline
          textPrimary
          onClick={() => {
            setTheme(isDark ? "light" : isLight ? "custom" : "dark")
          }}
        >
          {isDark && <BiSun className={`size-6 text-${t.text.primary}`} />}
          {isLight && (
            <BiSolidMoon className={`size-6 text-${t.text.primary}`} />
          )}
          {isCustom && <BiParty className={`size-6 text-${t.text.primary}`} />}
        </Button> */}
        <input
          type="text"
          // className="rounded-md h-fit w-fit bg-white px-4 py-2 font-normal text-mak-teal-900 focus:outline-none shadow-hard-sm"
        />
      </div>
    </main>
  )
}
