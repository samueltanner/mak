import { useState } from "react"
import Button from "../_hooks/useMakUi/components/Button"
import { Dropdown } from "../_hooks/useMakUi/components/Dropdown"
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../_hooks/useMakUi/components/Modal"

const MakUiView = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    <div>
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
    </div>
  )
}

export default MakUiView
