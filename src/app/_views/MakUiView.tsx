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
import ButtonListView from "./ButtonListView"

const MakUiView = () => {
  const { simpleTheme, simplePalette, mcn } = useMakUi()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    <div>
      <div>
        <ButtonListView />
        {/* <Dropdown icon={<span className={mcn("text-primary")}>trigger</span>}>
          <span className="flex h-full w-full ">
            <ul>
              <li>Element 1</li>
              <li>Element 2</li>
              <li>Element 3</li>
            </ul>
          </span>
        </Dropdown> */}
        <Modal
          isOpen={modalIsOpen}
          onClose={() => {
            setModalIsOpen(false)
          }}
          className={`bg-${simpleTheme.theme.secondary} h-10 rounded-md select-none text-${simpleTheme.text.primary.base} px-6 py-4 flex gap-6`}
          backdropClassName="backdrop-blur-sm"
        >
          <ModalHeader className="text-md font-semibold">
            Lorem ipsum
          </ModalHeader>
          <ModalContent className={`text-md font-normal `}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            tempora accusantium ipsum, veniam dolores explicabo deserunt
            suscipit possimus, error nihil adipisci animi hic nam molestiae
            voluptatum saepe velit eveniet quam.
          </ModalContent>
          <ModalFooter className="text-md font-semibold">
            <Button
              tertiary
              outline
              onClick={() => setModalIsOpen(!modalIsOpen)}
              showFocusRing={false}
            >
              Close
            </Button>
          </ModalFooter>
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
