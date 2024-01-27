"use client"
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { AnimatePresence, motion } from "framer-motion"
import { BiChevronUp } from "react-icons/bi"
import { useMakUi } from "../context/MakUiContext"
import { isObject } from "@/globals/global-helper-functions"
import { MakUiSimpleTheme } from "../types/ui-types"

type Position = {
  top?: number
  left?: number
  right?: string | number
  bottom?: string | number
}
type MenuPositions =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left"
  | "bottom-center"
  | "top-center"
  | "bottom-align-right"
  | "bottom-align-left"
  | "top-align-right"
  | "top-align-left"

interface DropdownElementTriggerProps {
  icon?: React.ReactNode
  label?: string | React.ReactNode
  labelLeft?: boolean
  labelRight?: boolean
  options?:
    | Array<string | number>
    | Array<{
        label: string
        value: any
        onClick?: (props: any) => void
      }>
  selectedOption?: string | number | { label: string; value: string }
  onChange?: (value: { label: string; value: string } | string | number) => void
  menuPosition?: MenuPositions
  chevronLeft?: boolean
  chevronRight?: boolean
  dismissOnClick?: boolean
}

export type OptionObject = { label: string; value: string }

const menuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    x: 0,
    originX: 0,
    originY: 0,
    zIndex: -1000,
  },
  visible: {
    opacity: 1,
    height: "auto",
    zIndex: 30,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    height: 0,
    x: 0,
    originX: 0,
    originY: 0,
    zIndex: 30,
    transition: { duration: 0.2 },
  },
}

const LabelElement = ({
  onClick,
  label,
}: {
  onClick?: () => void
  label?: string | React.ReactNode
}) => {
  if (!label) return null
  if (typeof label === "string")
    return (
      <label className={`cursor-pointer`} onClick={onClick}>
        {label}
      </label>
    )
  if (typeof label === "object")
    return (
      <span className="cursor-pointer" onClick={onClick}>
        {label}
      </span>
    )
}

const DropdownMenu = ({ children }: { children?: React.ReactNode }) => {
  const { simpleTheme } = useMakUi()
  const { onChange, value, values, options, valueKey } = useDropdownContext()

  const isSelect = (option: any) => {
    if (typeof option === "string" && typeof value === "string") {
      console.log(1)
      return option.toLowerCase() === value.toLowerCase()
    } else if (typeof option === "number" && typeof value === "number") {
      console.log(2)
      return option === value
    } else if (isObject(option) && isObject(value)) {
      console.log(3)
      return JSON.stringify(option) === JSON.stringify(value)
    } else if (
      typeof option === "object" &&
      (typeof value === "string" || typeof value === "number")
    ) {
      return (
        option.label.toLowerCase() === value?.toString().toLowerCase() ||
        option.value.toLowerCase() === value?.toString().toLowerCase()
      )
    }

    return false
  }

  return (
    <>
      <span className="h-full">
        {!children && (
          <>
            <ul className="flex flex-col gap-2">
              {options?.map((option: any, i: number) => {
                if (!i) {
                  i = Math.random()
                }
                return (
                  <li
                    key={i}
                    className={`flex cursor-pointer select-none items-center space-x-2 text-sm font-semibold text-${simpleTheme.text.primary.base}`}
                  >
                    <span
                      className={`w-full rounded-md px-4 py-1.5 fade-in-out hover:bg-${
                        simpleTheme.color.primary.base
                      } hover:bg-opacity-50 ${
                        isSelect(option)
                          ? `bg-${simpleTheme.color.primary.base} bg-opacity-20 `
                          : " bg-opacity-20 hover:bg-opacity-30"
                      }`}
                      onClick={() => {
                        if (onChange) {
                          console.log("onChange", option)
                          if (valueKey && isObject(option)) {
                            onChange(option[valueKey])
                          } else {
                            onChange(option)
                          }
                          // onChange(option)
                        }
                      }}
                    >
                      {typeof option === "string" || typeof option === "number"
                        ? option
                        : option?.label}
                    </span>
                  </li>
                )
              })}
            </ul>
          </>
        )}
        {!!children && children}
      </span>
    </>
  )
}

DropdownMenu.displayName = "DropdownMenu"

const DropdownTrigger = ({
  icon,
  label,
  labelLeft,
  labelRight,
  chevronRight,
  chevronLeft,
}: DropdownElementTriggerProps) => {
  const { dropdownOpen, setDropdownOpen, triggerRef, simpleTheme } =
    useDropdownContext()

  const { text } = simpleTheme

  if (!labelLeft && !labelRight) {
    labelLeft = true
  }

  if (labelLeft && labelRight) {
    labelLeft = true
    labelRight = false
  }

  if (chevronLeft && chevronRight) {
    chevronLeft = true
    chevronRight = false
  }

  return (
    <div className="relative flex w-fit select-none" ref={triggerRef}>
      <div
        onClick={() => {
          setDropdownOpen(!dropdownOpen)
          console.log("click", dropdownOpen)
        }}
        className="relative flex h-fit items-center justify-center gap-1"
      >
        {chevronLeft && (
          <motion.span
            initial={{ rotate: 0 }}
            animate={{ rotate: dropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center"
          >
            <BiChevronUp className={`size-4 text-${text.primary.base}`} />
          </motion.span>
        )}
        {label && labelLeft && (
          <LabelElement
            onClick={() => {
              console.log("click", dropdownOpen)
              setDropdownOpen(!dropdownOpen)
            }}
            label={label}
          />
        )}
        <span className="flex cursor-pointer items-center gap-1">{icon}</span>
        {label && labelRight && (
          <LabelElement
            onClick={() => {
              console.log("click", dropdownOpen)
              setDropdownOpen(!dropdownOpen)
            }}
            label={label}
          />
        )}
        {chevronRight && (
          <motion.span
            initial={{ rotate: 0 }}
            animate={{ rotate: dropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center"
          >
            <BiChevronUp className={`size-4 text-${text.primary.base}`} />
          </motion.span>
        )}
      </div>
    </div>
  )
}

interface DropdownProps {
  children?: React.ReactNode
  options?:
    | Array<string | number>
    | Array<{
        label: string
        value: any
      }>
  value?: string | number | { label: string; value: string }
  values?: Array<string | number | { label: string; value: string }>
  onChange?: (value: string | number | { label: string; value: string }) => void
  menuPosition?: MenuPositions
  icon?: React.ReactNode
  label?: string | React.ReactNode
  labelLeft?: boolean
  labelRight?: boolean
  chevronLeft?: boolean
  chevronRight?: boolean
  dismissOnClick?: boolean
  valueKey?: string
}

interface DropdownContextValue extends DropdownProps {
  dropdownOpen: boolean
  setDropdownOpen: (value: boolean) => void
  position: Position
  setPosition?: (value: Position) => void
  triggerRef: React.RefObject<HTMLDivElement> | null
  dropdownRef: React.RefObject<HTMLDivElement> | null
  hiddenDropdownRef: React.RefObject<HTMLDivElement> | null
  simpleTheme: MakUiSimpleTheme
}

const DropdownContext = createContext<DropdownContextValue | undefined>(
  undefined
)

const useDropdownContext = () => {
  const context = useContext(DropdownContext)
  if (!context) {
    throw new Error(
      "Dropdown compound components cannot be rendered outside the Dropdown component"
    )
  }
  return context
}

const Dropdown = ({
  children,
  options,
  value,
  values,
  onChange,
  menuPosition = "bottom-right",
  icon,
  label,
  labelLeft,
  labelRight,
  chevronRight,
  chevronLeft,
  valueKey,
}: DropdownProps) => {
  const { simpleTheme } = useMakUi()

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const [position, setPosition] = useState<Position>({
    top: 0,
    right: 0,
  })

  const [dismissOnClick, setDismissOnClick] = useState<boolean>(true)
  const triggerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const hiddenDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!dropdownOpen) {
      return
    }
    const handleClickOutside = (event: any) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setDropdownOpen(false)
      }
    }
    const handleClickMenuItem = (event: any) => {
      if (
        dismissOnClick &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("click", handleClickMenuItem)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("click", handleClickMenuItem)
    }
  }, [dropdownOpen])

  useEffect(() => {
    if ((value || values) && dismissOnClick) {
      setDropdownOpen(false)
    }
  }, [value, values])

  const getDropdownPosition = () => {
    if (
      triggerRef.current &&
      dropdownRef.current &&
      hiddenDropdownRef.current
    ) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const hiddenDropdownRect =
        hiddenDropdownRef.current.getBoundingClientRect()
      const menuHeight = hiddenDropdownRect.height
      const menuWidth = hiddenDropdownRect.width
      console.log({ menuHeight, menuWidth })
      const triggerWidth = triggerRect.width
      const padding = 8
      let triggerLeft = triggerRect.left
      let triggerTop = triggerRect.top
      let triggerRight = triggerRect.right
      let triggerBottom = triggerRect.bottom
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      let menuTop = 0
      let menuLeft = 0
      console.log({ triggerLeft, triggerTop, triggerRight, triggerBottom })
      if (menuPosition.includes("top")) {
        menuTop = triggerTop - menuHeight - padding
      }
      if (menuPosition.includes("bottom")) {
        menuTop = triggerBottom + padding
      }
      if (menuPosition.includes("left") && !menuPosition.includes("align")) {
        menuLeft = triggerLeft - menuWidth
      }
      if (menuPosition.includes("left") && menuPosition.includes("align")) {
        menuLeft = triggerLeft
      }
      if (menuPosition.includes("right") && !menuPosition.includes("align")) {
        menuLeft = triggerRight
      }
      if (menuPosition.includes("right") && menuPosition.includes("align")) {
        menuLeft = triggerRight - menuWidth
      }
      if (menuPosition.includes("center")) {
        menuLeft = triggerLeft + triggerWidth / 2 - menuWidth / 2
      }
      if (menuLeft + menuWidth > viewportWidth) {
        menuLeft = triggerLeft - menuWidth + triggerWidth
      }
      if (menuPosition.includes("top") && menuTop - menuHeight < 0) {
        menuTop = triggerBottom + padding
      }
      if (
        menuPosition.includes("bottom") &&
        menuTop + menuHeight > viewportHeight
      ) {
        menuTop = triggerTop - menuHeight - padding
      }
      if (menuPosition.includes("left") && menuLeft < 0) {
        menuLeft = triggerLeft
      }
      const position = { top: menuTop, left: menuLeft }
      console.log({ position })
      setPosition(position)
    }
  }

  useEffect(() => {
    if (dropdownOpen) {
      getDropdownPosition()
    }
  }, [dropdownOpen])

  return (
    <DropdownContext.Provider
      value={{
        options,
        value,
        values,
        onChange,
        dropdownOpen,
        setDropdownOpen,
        position,
        triggerRef,
        dropdownRef,
        hiddenDropdownRef,
        simpleTheme,
        valueKey,
      }}
    >
      <DropdownTrigger
        icon={icon}
        label={label}
        labelLeft={labelLeft}
        labelRight={labelRight}
        chevronLeft={chevronLeft}
        chevronRight={chevronRight}
      />
      <AnimatePresence>
        {dropdownOpen && (
          <motion.span
            className={`fixed z-30 flex w-fit p-2 h-full overflow-hidden rounded-lg bg-${simpleTheme?.theme?.secondary}`}
            variants={menuVariants}
            initial="hidden"
            animate={dropdownOpen ? "visible" : "exit"}
            exit="exit"
            style={position}
            ref={dropdownRef}
            key={`dropdown`}
          >
            {children ? children : <DropdownMenu />}
          </motion.span>
        )}
      </AnimatePresence>
      <div
        className={`fixed left-[-9999px] top-[-9999px] z-[-1000] flex w-fit p-2 overflow-hidden rounded-lg`}
        ref={hiddenDropdownRef}
        key={"dropdown-hidden"}
      >
        {children && (
          <DropdownMenu key={"dropdown-children"}>{children}</DropdownMenu>
        )}
        {options && !children && <DropdownMenu key={"dropdown-options"} />}
      </div>
    </DropdownContext.Provider>
  )
}

export { DropdownMenu }
export default Dropdown
