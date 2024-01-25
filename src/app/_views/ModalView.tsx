import { useState } from "react"
import Modal from "../_hooks/useMakUi/components/Modal"
import { useMakUi } from "../_hooks/useMakUi/context/MakUiContext"
import Button from "../_hooks/useMakUi/components/Button"
import {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../_hooks/useMakUi/components/Modal"

export const ModalView = () => {
  const { simpleTheme } = useMakUi()
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false)
        }}
        className={`bg-${simpleTheme.theme.secondary} h-10 rounded-md select-none text-${simpleTheme.text.primary.base} px-6 py-4 flex gap-6 drop-shadow-md`}
        backdropClassName="backdrop-blur-sm bg-black bg-opacity-10"
      >
        <ModalHeader className="text-md font-semibold">Lorem ipsum</ModalHeader>
        <ModalContent className={`text-md font-normal `}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          tempora accusantium ipsum, veniam dolores explicabo deserunt suscipit
          possimus, error nihil adipisci animi hic nam molestiae voluptatum
          saepe velit eveniet quam.
        </ModalContent>
        <ModalFooter className="text-md font-semibold">
          <Button
            custom
            outline
            onClick={() => setModalIsOpen(!modalIsOpen)}
            showFocusRing={false}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <Button
        onClick={() => {
          setModalIsOpen(true)
        }}
        showFocusRing={false}
        dark
        textLight
      >
        Open Modal
      </Button>
    </>
  )
}

export default ModalView
