"use client"
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "./_ui/components/Modal"
import Button from "./_ui/components/Button"
import { useState } from "react"
import { OvaiUiProvider } from "./_ui/context/OvaiUiContext"
import { DropdownElementTrigger } from "./_ui/DropDownContainer"
import { Dropdown } from "./_ui/components/Dropdown"
import { OvaiUiPaletteInput } from "./_ui/types/ui-types"

const palette: OvaiUiPaletteInput = {
  primary: "blue",
  primaryBorder: "blue-300",
  secondary: "ovai-teal",
  secondaryBorder: "ovai-teal-400",
  tertiary: "zinc-800",
  tertiaryBorder: "zinc-600",
  success: "blue",
  successBorder: "blue-300",
  danger: "red",
  dangerBorder: "red-300",
  primaryText: "zinc-900",
  secondaryText: "zinc-50",
  darkTheme: "zinc-800",
  lightTheme: "white",
}

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <OvaiUiProvider palette={palette}>
        <div>
          <Dropdown icon={<span>trigger</span>}>
            <ul>
              <li>Element 1</li>
              <li>Element 2</li>
              <li>Element 3</li>
            </ul>
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
      </OvaiUiProvider>
    </main>
  )
}
