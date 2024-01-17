"use client"
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "./_ui/components/Modal"
import Button from "./_ui/components/Button"
import { useState } from "react"
import { MakUiProvider } from "./_ui/context/MakUiContext"
import { Dropdown } from "./_ui/components/Dropdown"
import { MakUiPaletteInput } from "./_ui/types/default-types"

const palette: MakUiPaletteInput = {
  // primary: "blue",
  // secondary: "teal",
  // secondaryBorder: "teal-400",
  // tertiary: "zinc-800",
  // tertiaryBorder: "zinc-600",
  // success: "blue",
  // successBorder: "blue-300",
  // danger: "red",
  // dangerBorder: "red-300",
  // primaryText: "zinc-900",
  // secondaryText: "zinc-50",
  // theme: {
  //   dark: {
  //     primary: "black",
  //   },
  //   light: {
  //     primary: "blue-100",
  //   },
  // },
}

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MakUiProvider palette={palette}>
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
      </MakUiProvider>
    </main>
  )
}
