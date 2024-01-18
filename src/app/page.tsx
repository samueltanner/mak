"use client"
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "./_hooks/useMakUi/components/Modal"
import Button from "./_hooks/useMakUi/components/Button"
import { useState } from "react"
import { MakUiProvider, useMakUi } from "./_hooks/useMakUi/context/MakUiContext"
import { Dropdown } from "./_hooks/useMakUi/components/Dropdown"
import { MakUiPaletteInput } from "./_hooks/useMakUi/types/default-types"
import useMakForm from "./_hooks/useMaakForm/useMakForm"

const formConfig = {
  first_name: {
    type: "text",
    label: "First Name",
    placeholder: "Enter first name",
    required: true,
  },
  last_name: {
    type: "text",
    label: "First Name",
    placeholder: "Enter first name",
    required: true,
  },
  pick: {
    type: "select",
    label: "Pick",
    placeholder: "Select pick",
    required: true,
    options: [
      { label: "one", value: 1 },
      { label: "two", value: 2 },
      { label: "three", value: 3 },
    ],
  },
}
export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { activePalette } = useMakUi()

  const {
    form,
    components: { FirstName, Pick },
  } = useMakForm({ formConfig })
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <FirstName
          className={`p-2 text-${activePalette.text.primary.default.base}`}
        />
        <Pick />
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
