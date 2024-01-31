import { useState } from "react"
import Button from "../_hooks/useMakUi/components/Button"
import Toggle from "../_hooks/useMakUi/components/Toggle"
import { useMakUi } from "../_hooks/useMakUi/context/MakUiContext"
import { mak } from "../_hooks/useMakUi/elements/ts/mak"

const ButtonListView = () => {
  const { simpleTheme, verboseTheme } = useMakUi()

  const { theme, color, text, border } = verboseTheme

  const [outlined, setOutlined] = useState(false)

  return (
    <div className="flex gap-2 items-center">
      {Object.entries(color).map(([cName, cVal], index) => {
        return (
          <Button
            key={index}
            text={cName}
            bg={cName}
            border={cName}
            outlined={outlined}
            // borderPx={2}
            // buttonType={cName as MakUiVariantKey}
            // textLight={!outlined && cName !== "light"}
            // textDark={cName === "light"}
            // borderCustom={cName === "light"}
            // disabled
          >
            <span className="capitalize">{cName}</span>
          </Button>
        )
      })}

      <div className="flex flex-shrink-0 gap-2 items-center justify-center ml-3">
        <mak.span
          className={`size-5 rounded-md fade-in-out cursor-pointer mak(${
            !outlined ? "bg-primary" : "bg-custom"
          } hover:bg-primary-500/70)`}
          onClick={() => setOutlined(false)}
        />

        <Toggle
          checked={outlined}
          onChange={() => setOutlined(!outlined)}
          // disabled
        />

        <mak.span
          className={`size-5 rounded-md border-4 fade-in-out cursor-pointer mak(${
            outlined ? "border-primary" : "border-custom"
          } hover:border-primary-500/70)`}
          onClick={() => setOutlined(true)}
        />
      </div>
    </div>
  )
}

export default ButtonListView
