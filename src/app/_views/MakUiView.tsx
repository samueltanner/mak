"use client"

import ButtonListView from "./ButtonListView"
import ModalView from "./ModalView"
import DropdownView from "./DropdownView"

const MakUiView = () => {
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
