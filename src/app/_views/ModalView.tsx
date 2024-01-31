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
        className={`h-10 rounded-md select-none px-6 py-4 flex gap-6 drop-shadow-md`}
        makClassName="bg-theme|secondary"
        backdropClassName="backdrop-blur-sm"
        backDropMakClassName="bg-dark-900/50"
      >
        <ModalHeader className="text-md font-semibold"
          makClassName="text-primary-500"
        >Lorem ipsum</ModalHeader>
        <ModalContent className={`text-md font-normal`}
          makClassName="text-primary"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          tempora accusantium ipsum, veniam dolores explicabo deserunt suscipit
          possimus, error nihil adipisci animi hic nam molestiae voluptatum
          saepe velit eveniet quam.
        </ModalContent>
        <ModalFooter className="text-md font-semibold">
          <Button
            custom
            outlined
            onClick={() => setModalIsOpen(!modalIsOpen)}
            // showFocusRing={false}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <Button
        onClick={() => {
          setModalIsOpen(true)
        }}
        // showFocusRing={false}
        borderDark
        textLight
        width="w-fit"
      >
        Open Modal
      </Button>
    </>
  )
}

export default ModalView
