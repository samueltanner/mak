import { useState } from "react"
import Button from "../_hooks/useMakUi/components/Button"
import {
  DropdownTrigger,
  DropdownMenu,
} from "../_hooks/useMakUi/components/Dropdown"
import { useMakUi } from "../_hooks/useMakUi/context/MakUiContext"

const DropdownView = () => {
  const { simpleTheme } = useMakUi()
  const [buttonState, setButtonState] = useState<
    "error" | "success" | "loading" | undefined
  >(undefined)

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
        State
      </Button>
      <DropdownTrigger
        menuPosition="bottom-center"
        icon={
          <span
            className={`text-${simpleTheme.text.primary.base} text-sm font-semibold`}
          >
            {buttonState ? (
              <span className="capitalize">{buttonState}</span>
            ) : (
              <p>Select a State</p>
            )}
          </span>
        }
        dismissOnClick
      >
        <DropdownMenu
          options={[
            {
              label: "Default",
              value: undefined,
              onClick: () => setButtonState(undefined),
            },
            {
              label: "Loading",
              value: "loading",
              onClick: () => setButtonState("loading"),
            },
            {
              label: "Error",
              value: "error",
              onClick: () => setButtonState("error"),
            },
            {
              label: "Success",
              value: "success",
              onClick: () => setButtonState("success"),
            },
          ]}
        />
        {/* <span className="flex h-full w-full px-2">
          <select className="flex flex-col gap-4">
            <li>Loading</li>
            <li>Error</li>
            <li>Success</li>
          </select>
        </span> */}
      </DropdownTrigger>
    </div>
  )
}

export default DropdownView
