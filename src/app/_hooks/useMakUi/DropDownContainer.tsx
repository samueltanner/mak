import { forwardRef, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

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
    zIndex: -1000,
    transition: { duration: 0.2 },
  },
}

const DropdownElement = forwardRef(
  (
    {
      children,
      options,
      selectedOption,
      capitalize,
      nowrap,
      setSelectedOption,
    }: {
      children?: React.ReactNode
      options?: Array<string | number> | Array<{ label: string; value: string }>
      selectedOption?: string | number | { label: string; value: string }
      capitalize?: boolean
      nowrap?: boolean
      setSelectedOption?: (
        value: string | number | { label: string; value: string }
      ) => void
    },
    ref: React.Ref<HTMLSpanElement>
  ) => {
    const isSelect = (
      option: string | number | { label: string; value: string }
    ) => {
      if (typeof option === "string" && typeof selectedOption === "string") {
        return option.toLowerCase() === selectedOption.toLowerCase()
      } else if (
        typeof option === "number" &&
        typeof selectedOption === "number"
      ) {
        return option === selectedOption
      } else if (
        typeof option === "object" &&
        typeof selectedOption === "object"
      ) {
        return (
          option.label.toLowerCase() === selectedOption.label.toLowerCase() ||
          option.value.toLowerCase() === selectedOption.value.toLowerCase()
        )
      } else if (
        typeof option === "object" &&
        (typeof selectedOption === "string" ||
          typeof selectedOption === "number")
      ) {
        return (
          option.label.toLowerCase() ===
            selectedOption?.toString().toLowerCase() ||
          option.value.toLowerCase() ===
            selectedOption?.toString().toLowerCase()
        )
      }

      return false
    }
    return (
      <span ref={ref}>
        <ul className="flex flex-col gap-2 ">
          {options?.map((option, i) => {
            return (
              <li
                key={i}
                className={`flex cursor-pointer select-none items-center space-x-2 text-sm ${
                  capitalize ? "capitalize" : ""
                } ${
                  nowrap
                    ? "overflow-hidden overflow-ellipsis whitespace-nowrap"
                    : ""
                }`}
              >
                <span
                  className={`w-full rounded-sm px-4 py-1.5 fade-in-out  ${
                    isSelect(option)
                      ? "bg-sniprBlue-500 bg-opacity-20 hover:bg-opacity-30"
                      : "hover:bg-zinc-500 hover:bg-opacity-20"
                  }`}
                  onClick={() => {
                    if (setSelectedOption) {
                      setSelectedOption(option)
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
          {children}
        </ul>
      </span>
    )
  }
)

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

interface DropdownElementTriggerProps {
  icon?: React.ReactNode
  label?: string | React.ReactNode
  labelLeft?: boolean
  labelRight?: boolean
  children?: React.ReactNode
  options?: Array<string | number> | Array<{ label: string; value: string }>
  selectedOption?: string | number | { label: string; value: string }
  capitalize?: boolean
  nowrap?: boolean
  setSelectedOption?: (
    value: { label: string; value: string } | string | number
  ) => void
  menuPosition?: MenuPositions
}

export type OptionObject = { label: string; value: string }

const DropdownElementTrigger = ({
  icon,
  label,
  labelLeft,
  labelRight,
  options,
  selectedOption,
  capitalize = true,
  nowrap = true,
  setSelectedOption,
  menuPosition = "bottom-right",
  children,
}: DropdownElementTriggerProps) => {
  const triggerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const hiddenDropdownRef = useRef<HTMLDivElement>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [position, setPosition] = useState<Position>({
    top: 0,
    right: 0,
  })

  if (!labelLeft && !labelRight) {
    labelLeft = true
  }

  useEffect(() => {
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
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownOpen])

  useEffect(() => {
    if (selectedOption) {
      setDropdownOpen(false)
    }
  }, [selectedOption])

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const LabelElement = ({ onClick }: { onClick?: () => void }) => {
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

      if (menuPosition.includes("top")) {
        menuTop = triggerTop - menuHeight - padding
      }
      if (menuPosition.includes("bottom")) {
        menuTop = triggerBottom + padding
      }
      if (menuPosition.includes("left")) {
        menuLeft = triggerLeft - menuWidth + triggerWidth
      }
      if (menuPosition.includes("right")) {
        menuLeft = triggerRight - triggerWidth
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

      setPosition(position)
    }
  }

  useEffect(() => {
    if (dropdownOpen) {
      getDropdownPosition()
    }
  }, [dropdownOpen])

  return (
    <div className="relative flex w-fit select-none">
      <div
        onClick={toggleDropdown}
        className="relative flex h-fit items-center justify-center gap-2 "
      >
        {label && labelLeft && <LabelElement onClick={toggleDropdown} />}
        <span ref={triggerRef} className="cursor-pointer">
          {icon}
        </span>
        {label && labelRight && <LabelElement onClick={toggleDropdown} />}
      </div>
      <AnimatePresence>
        <motion.div
          className={`fixed z-30 flex w-fit overflow-hidden rounded-lg p-2 drop-shadow-md`}
          variants={menuVariants}
          initial="hidden"
          animate={dropdownOpen ? "visible" : "exit"}
          exit="exit"
          style={position}
          ref={dropdownRef}
        >
          {children ? (
            <>
              <DropdownElement
                options={options}
                selectedOption={selectedOption}
                capitalize={capitalize}
                nowrap={nowrap}
                setSelectedOption={setSelectedOption}
              >
                {children}
              </DropdownElement>
            </>
          ) : (
            <>
              <DropdownElement
                options={options}
                selectedOption={selectedOption}
                capitalize={capitalize}
                nowrap={nowrap}
                setSelectedOption={setSelectedOption}
              />
            </>
          )}
        </motion.div>

        <div
          className={`fixed left-[-9999px] top-[-9999px] z-[-1000] flex w-fit overflow-hidden rounded-lg p-2 drop-shadow-md`}
          ref={hiddenDropdownRef}
        >
          <DropdownElement
            options={options}
            selectedOption={selectedOption}
            capitalize={capitalize}
            nowrap={nowrap}
            setSelectedOption={setSelectedOption}
          />
        </div>
      </AnimatePresence>
    </div>
  )
}

DropdownElement.displayName = "DropdownElement"
export { DropdownElement, DropdownElementTrigger }
