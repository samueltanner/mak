"use client"
import { useState } from "react"
import Button from "../_hooks/useMakUi/components/Button"
import { Dropdown } from "../_hooks/useMakUi/components/Dropdown"
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../_hooks/useMakUi/components/Modal"
import { useMakUi } from "../_hooks/useMakUi/context/MakUiContext"

const MakUiView = () => {
  const { simpleTheme, simplePalette, mcn } = useMakUi()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    <div>
      <div>
        <Dropdown icon={<span className={mcn("text-primary")}>trigger</span>}>
          <span className="flex h-full w-full ">
            <ul>
              <li>Element 1</li>
              <li>Element 2</li>
              <li>Element 3</li>
            </ul>
          </span>
        </Dropdown>
        <Modal
          isOpen={modalIsOpen}
          onClose={() => {
            setModalIsOpen(false)
          }}
        >
          <ModalHeader>header</ModalHeader>
          <ModalContent>content</ModalContent>
          <ModalFooter>footer</ModalFooter>
        </Modal>
      </div>
      <Button
        onClick={() => {
          setModalIsOpen(true)
        }}
        showFocusRing={false}
      >
        Open Modal
      </Button>
    </div>
  )
}

export default MakUiView
