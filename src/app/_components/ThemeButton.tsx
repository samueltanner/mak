import { BiParty, BiSolidMoon, BiSun } from "react-icons/bi"
import Button from "../_hooks/useMakUi/components/Button"
import { useMakUi } from "../_hooks/useMakUi/context/MakUiContext"
import { mak } from "../_hooks/useMakUi/elements/ts/mak"

const ThemeButton = () => {
  const {
    setTheme,
    isDark,
    isLight,
    isCustom,
    simpleTheme,
    enabledThemeModes,
  } = useMakUi()
  return (
    <Button
      borderLight={isDark && "100/50"}
      borderDark={isLight && "800/50"}
      onClick={() => {
        setTheme(
          isDark
            ? "light"
            : isLight && enabledThemeModes.includes("custom")
            ? "custom"
            : "dark"
        )
      }}
      className="flex items-center justify-center size-10 rounded-md fade-in-out"
      makClassName={`hover:bg-${
        isDark ? "light-100/10" : isLight ? "dark-300/50" : "primary"
      }`}
    >
      <mak.span
        makClassName={`${
          isDark ? "text-color|warning-400" : "text-color|secondary-600"
        }`}
      >
        {isDark && <BiSun className={`size-6 fade-in-out`} />}
        {isLight && (
          <BiSolidMoon
            // className="text-zinc-500 group-hover:text-blue-500"

            className={`size-6 fade-in-out`}
          />
        )}
        {isCustom && <BiParty className={`size-6`} />}
      </mak.span>
    </Button>
  )
}

export default ThemeButton
