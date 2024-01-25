import { BiParty, BiSolidMoon, BiSun } from "react-icons/bi"
import Button from "../_hooks/useMakUi/components/Button"
import { useMakUi } from "../_hooks/useMakUi/context/MakUiContext"

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
      primary
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
  )
}

export default ThemeButton
