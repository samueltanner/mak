import { useEffect, useRef } from "react"
import React, { useContext, createContext } from "react"
import { BiSolidDownArrowCircle, BiXCircle } from "react-icons/bi"
import { motion, AnimatePresence } from "framer-motion"

const ModalContext = createContext<{
  onClose?: () => void
  onOpen?: () => void
  isOpen?: boolean | string | number
  isScrollable?: boolean
  showButton?: boolean
  scrollToBottom?: () => void
}>({})

const ModalBackDrop = ({
  onClose,
  className,
}: {
  onClose: () => void
  className?: string
}) => {
  return (
    <motion.div
      key="blur"
      onClick={onClose}
      className={`absolute left-0 top-0 z-40 h-screen w-screen fade-in-out ${className}`}
      initial={{
        opacity: 0,
        width: "100%",
        height: "100%",
        zIndex: 10,
      }}
      animate={{
        opacity: 1,
        width: "100%",
        height: "100%",
        zIndex: 10,
      }}
      exit={{
        opacity: 0,
        width: "100%",
        height: "100%",
        zIndex: 10,
      }}
      transition={{ duration: 0.2 }}
    />
  )
}

export const ModalContent = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={`flex h-full w-full overflow-auto ${className}`}>
      {children}
    </div>
  )
}

export const ModalHeader = ({
  children,
  className,
}: {
  hideClose?: boolean
  children: React.ReactNode
  className?: string
}) => {
  const { onClose } = useContext(ModalContext)

  if (!onClose) {
    throw new Error("ModalHeader must be used within a Modal")
  }

  return <div className={className}>{children}</div>
}

export const ModalFooter = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <div className={className}>{children}</div>
}

const Modal = ({
  children,
  isOpen,
  onClose,
  onOpen,
  width,
  className,
  backdropClassName,
}: {
  children: React.ReactNode
  isOpen: boolean | string | number
  onClose: () => void
  onOpen?: () => void
  width?: "sm" | "md" | "lg" | "xl" | "2xl"
  className?: string
  backdropClassName?: string
}) => {
  const [showButton, setShowButton] = React.useState(true)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => {
      window.removeEventListener("keydown", handleEscape)
    }
  }, [onClose])

  const handleScroll = () => {
    const container = containerRef.current
    if (container) {
      const isAtBottom =
        Math.ceil(container.scrollTop + container.clientHeight) >=
        container.scrollHeight
      setShowButton(!isAtBottom)
    }
  }

  const getModalDimensions = (multiplier?: number) => {
    switch (width) {
      case "sm":
        return {
          width: `${multiplier ? multiplier * 400 : 400}px`,
          maxWidth: "95%",
          height: "fit-content",
          maxHeight: "80%",
        }
      case "md":
        return {
          width: `${multiplier ? multiplier * 600 : 600}px`,
          maxWidth: "95%",
          height: "fit-content",
          maxHeight: "80%",
        }
      case "lg":
        return {
          width: `${multiplier ? multiplier * 800 : 800}px`,
          maxWidth: "90%",
          height: "fit-content",
          maxHeight: "80%",
        }
      case "xl":
        return {
          width: `${multiplier ? multiplier * 1000 : 1000}px`,
          maxWidth: "90%",
          height: "fit-content",
          maxHeight: "80%",
        }
      case "2xl":
        return {
          width: `${multiplier ? multiplier * 1200 : 1200}px`,
          maxWidth: "90%",
          height: "fit-content",
          maxHeight: "80%",
        }
      default:
        return {
          width: `${multiplier ? multiplier * 600 : 600}px`,
          maxWidth: "95%",
          height: "fit-content",
          maxHeight: "80%",
        }
    }
  }

  const modalVariants = {
    hidden: {
      scale: 0.9,
      opacity: 0,
      zIndex: 50,
      ...getModalDimensions(),
    },
    visible: {
      scale: 1,
      opacity: 1,
      zIndex: 50,
      ...getModalDimensions(),
    },
    exit: { opacity: 0, zIndex: 50, scale: 0.9, ...getModalDimensions() },
  }

  return (
    <ModalContext.Provider
      value={{
        onClose,
        onOpen,
        isOpen,
        showButton,
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center">
            <motion.div
              className={`relative flex flex-col overflow-hidden ${className}`}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              ref={containerRef}
              onScroll={handleScroll}
            >
              {children}
            </motion.div>
            <ModalBackDrop onClose={onClose} className={backdropClassName} />
          </motion.div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  )
}

export default Modal