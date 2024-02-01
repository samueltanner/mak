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
      bgLight
      outlined
      onClick={() => {
        setTheme(
          isDark
            ? "light"
            : isLight && enabledThemeModes.includes("custom")
            ? "custom"
            : "dark"
        )
      }}
      // showFocusRing={false}
    >
      <mak.span makClassName="*:text-primary">
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
