import { useState } from "react"
import Button from "../_hooks/useMakUi/components/Button"
import Dropdown, { DropdownMenu } from "../_hooks/useMakUi/components/Dropdown"
import { useMakUi } from "../_hooks/useMakUi/context/MakUiContext"

const DropdownView = () => {
  const { simpleTheme } = useMakUi()
  const [buttonState, setButtonState] = useState<
    "error" | "success" | "loading" | "default"
  >("default")

  return (
    <div className="flex gap-4 items-center">
      <Button
        primary
        textLight
        keepStatusVisible
        isLoading={buttonState === "loading"}
        isSuccess={buttonState === "success"}
        isError={buttonState === "error"}
        error={buttonState === "error"}
        success={buttonState === "success"}
        info={buttonState === "loading"}
      >
        <span className="capitalize">{buttonState}</span>
      </Button>

      <Dropdown
        label="Select"
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
