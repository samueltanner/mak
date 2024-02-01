import { useState } from "react"
import Button from "../_hooks/useMakUi/components/Button"
import Dropdown, { DropdownMenu } from "../_hooks/useMakUi/components/Dropdown"
import Loader from "../_hooks/useMakUi/components/Loader"
import { mak } from "../_hooks/useMakUi/elements/ts/mak"
const DropdownView = () => {
  const [buttonState, setButtonState] = useState<
    "error" | "success" | "loading" | "default"
  >("default")

  const buttonStateMap = {
    default: "primary",
    loading: "secondary",
    error: "danger",
    success: "success",
  }

  return (
    <div className="flex gap-4 items-center">
      <Button
        bg={buttonStateMap[buttonState]}
        textLight
        height="fit"
        width="fit"
      >
        <mak.div
          motion={{
            layout: true,
          }}
          className={`flex items-center justify-center ${
            buttonState !== "default" ? "gap-1" : "gap-0"
          }`}
        >
          <Loader loadingState={buttonState} />

          <span className="capitalize">{buttonState}</span>
        </mak.div>
      </Button>

      <Dropdown
        label={
          <span className={`capitalize `}>
            {buttonState === "default" ? "default" : buttonState}
          </span>
        }
        chevronRight
        onChange={(value) => setButtonState(value as any)}
        value={buttonState}
        menuPosition="bottom-center"
        valueKey="value"
        options={[
          {
            label: "Default",
            value: "default",
          },
          {
            label: "Loading",
            value: "loading",
          },
          {
            label: "Error",
            value: "error",
          },
          {
            label: "Success",
            value: "success",
          },
        ]}
      >
        <DropdownMenu />
      </Dropdown>
    </div>
  )
}

export default DropdownView
