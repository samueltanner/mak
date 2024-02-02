import { BiParty, BiSolidMoon, BiSun } from "react-icons/bi"
import Button from "../_hooks/useMakUi/components/Button"
import { useMakUi } from "../_hooks/useMakUi/context/MakUiContext"
import { mak } from "../_hooks/useMakUi/elements/ts/mak"
import styled from "@emotion/styled"

const StyledSpan = styled.span`
  display: flex;
  position: absolute;
  height: 20px;
  width: 20px;
  top: 0;
  right: 0;
  .group &:hover {
    background-color: orange;
  }
`

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
      useConfig={false}
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
      className="relative flex items-center justify-center size-10 rounded-md fade-in-out group"
      makClassName={`hover:bg-${
        isDark ? "light-100/10" : isLight ? "dark-800/80" : "primary"
      }`}
    >
      {/* <StyledSpan>hi</StyledSpan> */}
      {isDark && (
        <mak.span
          makClassName={`${
            isDark
              ? "text-color|warning-400"
              : "text-color|secondary-600 group-hover:text-color|warning-500"
          }`}
        >
          <BiSun className={`size-6 fade-in-out `} />
        </mak.span>
      )}
      {isLight && (
        <mak.span
          makClassName={`${
            isDark
              ? "text-color|warning-400"
              : "text-color|secondary-600 group-hover:text-color|warning-500"
          }`}
        >
          <BiSolidMoon className={`size-6 fade-in-out`} />
        </mak.span>
      )}
      {isCustom && <BiParty className={`size-6`} />}
    </Button>
  )
}

export default ThemeButton
