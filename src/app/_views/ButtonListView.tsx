import { useState } from "react"
import Button from "../_hooks/useMakUi/components/Button"
import Toggle from "../_hooks/useMakUi/components/Toggle"
import { useMakUi } from "../_hooks/useMakUi/context/MakUiContext"
import { MakUiVariantKey } from "../_hooks/useMakUi/types/ui-types"

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
        <span
          className={`size-5 rounded-md bg-${
            color[outlined ? "custom" : "primary"]["500"]
          }`}
        />
        <Toggle
          allowedStates={["disabled", "checked"]}
          allowedModifiers={["peer"]}
          checked={outlined}
          onChange={() => setOutlined(!outlined)}
          borderPx={4}
          borderSecondary
          light
          custom
        />
        <span
          className={`size-5 rounded-md border-4 border-${
            color[!outlined ? "custom" : "primary"]["500"]
          }`}
        />
      </div>
    </div>
  )
}

export default ButtonListView
