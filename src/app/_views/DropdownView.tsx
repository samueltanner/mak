import { useState } from "react"
import Button from "../_hooks/useMakUi/components/Button"
import Dropdown, { DropdownMenu } from "../_hooks/useMakUi/components/Dropdown"
import { useMakUi } from "../_hooks/useMakUi/context/MakUiContext"
import { objectToClassName } from "../_hooks/useMakUi/functions/helpers"

const DropdownView = () => {
  const { simpleTheme, verboseTheme, simplePalette, verbosePalette } =
    useMakUi()

  const [buttonState, setButtonState] = useState<
    "error" | "success" | "loading" | "default"
  >("default")

  return (
    <div className="flex gap-4 items-center">
      <Button
        bgPrimary
        textLight
        // keepStatusVisible
        // isLoading={buttonState === "loading"}
        // isSuccess={buttonState === "success"}
        // isError={buttonState === "error"}
        // error={buttonState === "error"}
        // success={buttonState === "success"}
        // info={buttonState === "loading"}
      >
        <span className="capitalize">{buttonState}</span>
      </Button>

      <Dropdown
        label={
          <span
            className={`capitalize ${objectToClassName({
              object: verboseTheme.text.primary,
              variant: "text",
            })}`}
          >
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
