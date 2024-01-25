import { useState } from "react"
import Button from "../_hooks/useMakUi/components/Button"
import Toggle from "../_hooks/useMakUi/components/Toggle"
import { useMakUi } from "../_hooks/useMakUi/context/MakUiContext"
import { MakUiVariant } from "../_hooks/useMakUi/types/default-types"

const ButtonListView = () => {
  const { simpleTheme } = useMakUi()
  const { theme, color, text, border } = simpleTheme
  const [outlined, setOutlined] = useState(false)

  return (
    <div className="flex gap-2">
      {Object.entries(color).map(([cName, cVal], index) => {
        return (
          <Button
            key={index}
            outline={outlined}
            buttonType={cName as MakUiVariant}
          >
            <span className="capitalize">{cName}</span>
          </Button>
        )
      })}
      <Toggle
        allowedDefaults={["disabled", "checked"]}
        allowedModifiers={["peer"]}
        checked={outlined}
        onChange={(e) => setOutlined(!outlined)}
        borderPx={4}
        borderSecondary
        custom

      />
    </div>
  )
}

export default ButtonListView
