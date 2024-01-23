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
    verboseTheme,
    enabledModes,
    mcn,
  } = useMakUi()

  return (
    <main className={`h-screen w-screen p-4 bg-${verboseTheme.theme.primary}`}>
      <div className="flex w-full h-full justify-between">
        <MakUiView />
        <MakFormView />
        <Button
          secondary
          outline
          textPrimary
          onClick={() => {
            setTheme(
              isDark
                ? "light"
                : isLight && enabledModes.includes("custom")
                ? "custom"
                : "dark"
            )
          }}
        >
          {isDark && (
            <BiSun className={`size-6 text-${verboseTheme.text.secondary}`} />
          )}
          {isLight && (
            <BiSolidMoon
              className={`size-6 text-${verboseTheme.text.secondary}`}
            />
          )}
          {isCustom && (
            <BiParty className={`size-6 text-${verboseTheme.text.secondary}`} />
          )}
        </Button>
        <button
          className={mcn(
            "mak(dark:text-primary bg-primary border-primary focus:ring-offset-primary) focus:ring-2",
            { type: "button", states: ["disabled", "hover", "focus"] }
          )}
        >
          Test
        </button>
        <input
          type="text"
          className="rounded-md h-fit w-fit bg-white px-4 py-2 font-normal text-mak-teal-900 focus:outline-none shadow-hard-sm"
        />
      </div>
    </main>
  )
}
