"use client";
import { useMakUi } from "../_hooks/useMakUi/context/MakUiContext"
import ButtonListView from "./ButtonListView"
import ModalView from "./ModalView"
import DropdownView from "./DropdownView"

const MakUiView = () => {
  const { simpleTheme } = useMakUi()

  return (
    <div>
      <div className="flex flex-col gap-4">
        <ButtonListView />
        <DropdownView />
        <ModalView />
      </div>
    </div>
  )
}

export default MakUiView
