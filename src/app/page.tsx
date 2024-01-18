"use client"
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "./_ui/components/Modal"
import Button from "./_ui/components/Button"
import { useState } from "react"
import { MakUiProvider, useMakUi } from "./_ui/context/MakUiContext"
import { Dropdown } from "./_ui/components/Dropdown"
import { MakUiPaletteInput } from "./_ui/types/default-types"

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { activePalette } = useMakUi()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Dropdown icon={<span>trigger</span>}>
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
      >
        Open Modal
      </Button>
    </main>
  )
}
