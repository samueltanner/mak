import { useState } from "react"
import Button from "../_hooks/useMakUi/components/Button"
import Toggle from "../_hooks/useMakUi/components/Toggle"
import { mak } from "../_hooks/useMakUi/elements/ts/mak"
import { MakUiVariantKey } from "../_hooks/useMakUi/types/ui-types"
import { makUiVariants } from "../_hooks/useMakUi/constants/ui-constants"
import { useMakUi } from "../_hooks/useMakUi/context/MakUiContext"

const ButtonListView = () => {
  const [outlined, setOutlined] = useState(false)
  const { isDark } = useMakUi()

  return (
    <div className="flex gap-2 items-center">
      {makUiVariants.map((cName, index) => {
        return (
          <Button
            key={index}
            bg={!outlined && (cName as MakUiVariantKey)}
            border={cName as MakUiVariantKey}
            className="px-2 py-1 rounded-md fade-in-out"
            makClassName={`hover:bg-${cName}-600 ${
              outlined ? `text-bg|${cName}-${isDark ? "200" : "800"}` : ""
            } ${!outlined && cName === "light" ? "text-dark-800" : ""}`}
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
