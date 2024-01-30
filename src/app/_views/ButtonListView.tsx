import { useState } from "react"
import Button from "../_hooks/useMakUi/components/Button"
import Toggle from "../_hooks/useMakUi/components/Toggle"
import { useMakUi } from "../_hooks/useMakUi/context/MakUiContext"
import { MakUiVariantKey } from "../_hooks/useMakUi/types/ui-types"
import { mak } from "../_hooks/useMakUi/elements/ts/mak"

const ButtonListView = () => {
  const { simpleTheme } = useMakUi()
  const { theme, color, text, border } = simpleTheme
  const [outlined, setOutlined] = useState(false)

  return (
    <div className="flex gap-2 items-center">
      {Object.entries(color).map(([cName, cVal], index) => {
        return (
          <Button
            key={index}
            outline={outlined}
            buttonType={cName as MakUiVariantKey}
            textLight={!outlined && cName !== "light"}
            textDark={cName === "light"}
            borderCustom={cName === "light"}
          >
            <span className="capitalize">{cName}</span>
          </Button>
        )
      })}
      <div className="flex flex-shrink-0 gap-2 items-center justify-center ml-3">
        <mak.span
          className={`size-5 rounded-md fade-in-out cursor-pointer ${
            outlined ? "bg-red-500" : "bg-green-500"
          }`}
          onClick={() => setOutlined(!outlined)}
        />

        <Toggle
          checked={outlined}
          onChange={() => setOutlined(!outlined)}
          borderPx={4}
          darkMode
          custom
          className="peer"
        />
        <span
          className={`size-5 rounded-md border-4 fade-in-out`}
          style={{
            borderColor: color[!outlined ? "custom" : "primary"]["500"],
          }}
        />
      </div>
    </div>
  )
}

export default ButtonListView
