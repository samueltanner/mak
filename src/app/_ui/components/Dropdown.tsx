"use client"
import { forwardRef, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { BiChevronUp } from "react-icons/bi"
import { useMakUi } from "../context/MakUiContext"

export const rootLevelBackgroundStyling = ""
export const rootLevelMenuStyling =
  "rounded-lg border-2" + rootLevelBackgroundStyling

export const textThemeStyling = "text-zinc-800 dark:text-zinc-100"

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
    const {
      palette: { theme },
    } = useMakUi()
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
        {!children && (
          <>
            <ul className="flex flex-col gap-2 ">
              {options?.map((option: any, i: number) => {
                if (!i) {
                  i = Math.random()
                }
                return (
                  <li
                    key={i}
                    className={`flex cursor-pointer select-none items-center space-x-2 text-sm ${textThemeStyling} ${
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
                          ? " bg-opacity-20 hover:bg-opacity-30"
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
            </ul>
          </>
        )}
        {!!children && children}
      </span>
    )
  }
)

DropdownElement.displayName = "DropdownElement"

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
  children?: React.ReactNode
  options?: Array<string | number> | Array<{ label: string; value: string }>
  selectedOption?: string | number | { label: string; value: string }
  capitalize?: boolean
  nowrap?: boolean
  setSelectedOption?: (
    value: { label: string; value: string } | string | number
  ) => void
  menuPosition?: MenuPositions
  chevronLeft?: boolean
  chevronRight?: boolean
  dismissOnClick?: boolean
}

export type OptionObject = { label: string; value: string }

const Dropdown = ({
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
  chevronRight,
  chevronLeft,
  dismissOnClick = true,
}: DropdownElementTriggerProps) => {
  const triggerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const hiddenDropdownRef = useRef<HTMLDivElement>(null)
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const [position, setPosition] = useState<Position>({
    top: 0,
    right: 0,
  })
  const { palette, activePalette } = useMakUi()
  const { text } = palette

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

  if (!chevronLeft && !chevronRight) {
    chevronRight = true
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
    if (selectedOption && dismissOnClick) {
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
        <label
          className={`${textThemeStyling} cursor-pointer`}
          onClick={onClick}
        >
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
        ref={triggerRef}
        className="relative flex h-fit items-center justify-center gap-1"
      >
        {chevronLeft && (
          <motion.span
            initial={{ rotate: 0 }}
            animate={{ rotate: dropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center"
          >
            <BiChevronUp
              className={`size-4 text-${text.primary.default.base}`}
            />
          </motion.span>
        )}
        {label && labelLeft && <LabelElement onClick={toggleDropdown} />}
        <span className="flex cursor-pointer items-center gap-1">{icon}</span>
        {label && labelRight && <LabelElement onClick={toggleDropdown} />}
        {chevronRight && (
          <motion.span
            initial={{ rotate: 0 }}
            animate={{ rotate: dropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center"
          >
            <BiChevronUp
              className={`size-4 text-${text.primary.default.base}`}
            />
          </motion.span>
        )}
      </div>
      <AnimatePresence>
        <motion.div
          className={`fixed z-30 flex w-fit p-2 ${rootLevelMenuStyling} overflow-hidden rounded-lg bg-${activePalette?.theme?.secondary}`}
          variants={menuVariants}
          initial="hidden"
          animate={dropdownOpen ? "visible" : "exit"}
          exit="exit"
          style={position}
          ref={dropdownRef}
          key={`dropdown`}
        >
          {children && (
            <DropdownElement
              key={"dropdown-children"}
              options={options}
              selectedOption={selectedOption}
              capitalize={capitalize}
              nowrap={nowrap}
              setSelectedOption={setSelectedOption}
            >
              {children}
            </DropdownElement>
          )}
          {options && !children && (
            <DropdownElement
              key={"dropdown-options"}
              options={options}
              selectedOption={selectedOption}
              capitalize={capitalize}
              nowrap={nowrap}
              setSelectedOption={setSelectedOption}
            />
          )}
        </motion.div>

        <div
          className={`fixed left-[-9999px] top-[-9999px] z-[-1000] flex w-fit p-2 ${rootLevelMenuStyling} overflow-hidden rounded-lg`}
          ref={hiddenDropdownRef}
          key={"dropdown-hidden"}
        >
          {children && (
            <DropdownElement
              key={"dropdown-children"}
              options={options}
              selectedOption={selectedOption}
              capitalize={capitalize}
              nowrap={nowrap}
              setSelectedOption={setSelectedOption}
            >
              {children}
            </DropdownElement>
          )}
          {options && !children && (
            <DropdownElement
              key={"dropdown-options"}
              options={options}
              selectedOption={selectedOption}
              capitalize={capitalize}
              nowrap={nowrap}
              setSelectedOption={setSelectedOption}
            />
          )}
        </div>
      </AnimatePresence>
    </div>
  )
}

export { DropdownElement, Dropdown }
