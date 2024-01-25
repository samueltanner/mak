"use client"
import { forwardRef, useEffect, useMemo, useState } from "react"
import { InLineLoader } from "./InLineLoader"
import { MakUiClassNameHelper, useMakUi } from "../context/MakUiContext"
import {
  MakUiInteraction,
  MakUiState,
  MakUiVariant,
} from "../types/default-types"
import { MakUiSimpleTheme, MakUiVerboseTheme } from "../types/ui-types"

import { MakUiRootComponentConfig } from "../types/component-types"

interface ButtonProps {
  text?: string

  primary?: boolean
  secondary?: boolean
  tertiary?: boolean
  success?: boolean
  error?: boolean
  warning?: boolean
  danger?: boolean
  info?: boolean
  custom?: boolean
  buttonType?: MakUiVariant | undefined

  textPrimary?: boolean
  textSecondary?: boolean
  textTertiary?: boolean
  textSuccess?: boolean
  textError?: boolean
  textWarning?: boolean
  textDanger?: boolean
  textInfo?: boolean
  textCustom?: boolean
  textType?: MakUiVariant | undefined

  borderPrimary?: boolean
  borderSecondary?: boolean
  borderTertiary?: boolean
  borderSuccess?: boolean
  borderError?: boolean
  borderWarning?: boolean
  borderDanger?: boolean
  borderInfo?: boolean
  borderCustom?: boolean
  borderType?: MakUiVariant | undefined

  active?: boolean
  disabled?: boolean
  focus?: boolean
  buttonState?: MakUiState | undefined

  textClassName?: string
  border?: boolean

  isLoading?: boolean
  isError?: boolean
  isSuccess?: boolean

  className?: string

  onClick?: () => void
  children?: React.ReactNode
  type?: "button" | "submit" | "reset" | undefined
  outline?: boolean
  fill?: boolean
  width?: "full" | "fit" | undefined
  selected?: boolean
  id?: string
  buttonKey?: string
  statusIconSide?: "left" | "right"
  icon?: React.ReactNode
  iconSide?: "left" | "right"
  wrapButtonText?: boolean
  keepStatusVisible?: boolean
  showFocusRing?: boolean
}

type ButtonStates = {
  state: MakUiState
  interaction: ButtonInteractions
  disabled: boolean
  loading: boolean
  selected: boolean
  success: boolean
  error: boolean
  active: boolean
  focus: boolean
  click: boolean
  hover: boolean
}

type ButtonInteractions = {
  [Key in MakUiInteraction]: boolean
}

const buttonClassName = ({
  text,
  buttonStyle,
  textStyle = "primary",
  borderStyle = buttonStyle,
  buttonStates,
  width = "fit",
  outlined,
  border,
  customClassName,
  customTextClassName,
  buttonConfig,
  theme,
  showFocusRing = true,
  mcn,
}: {
  text: boolean
  buttonStyle: MakUiVariant
  textStyle: MakUiVariant
  borderStyle: MakUiVariant
  buttonStates: ButtonStates
  width: string
  outlined?: boolean
  border?: boolean
  customClassName?: string
  customTextClassName?: string
  buttonConfig: MakUiRootComponentConfig
  theme: MakUiSimpleTheme
  showFocusRing?: boolean
  mcn: MakUiClassNameHelper
}) => {
  const textPalette = theme.text
  const colorPalette = theme.color
  const borderPalette = theme.border
  const themePalette = theme.theme

  // console.log({
  //   mcn: mcn("dark:text-primary", {
  //     type: "button",
  //     states: ["disabled", "hover", "focus"],
  //     theme: "light",
  //   }),
  // })

  // const className = mcn(
  //   `mak(dark:text-${textStyle} bg-${buttonStyle} border-${borderStyle} focus:focus-ring-primary focus:ring-offset-theme-primary) focus:ring-2 focus:ring-offset-2 border-4`,
  //   {
  //     type: "button",
  //     states: ["disabled", "hover", "focus"],
  //     theme: "light",
  //   }
  // )

  // return className

  const { state: buttonState, disabled, selected, active, focus } = buttonStates

  const buttonWidth = width === "full" ? "w-full" : "w-fit"
  const cursorAction = disabled ? "cursor-not-allowed" : "cursor-pointer"
  const outlinedOrFilled = outlined ? "border" : "bg"

  const variantObject = colorPalette?.[buttonStyle]
  const textVariantObject = textPalette?.[textStyle]
  const borderVariantObject = borderPalette?.[borderStyle]

  const baseClass = `${buttonConfig.className} ${
    disabled && "cursor-not-allowed"
  }`
  const textClass = `text-${textVariantObject?.base} hover:text-${textVariantObject?.hover}`
  const backgroundClass = `${outlinedOrFilled}-${variantObject?.base} hover:${outlinedOrFilled}-${variantObject?.hover}`
  const borderClass = `border-${borderVariantObject?.base} border-[3px] hover:border-${borderVariantObject?.hover}`
  const selectedClass =
    selected && showFocusRing && !disabled
      ? `ring-2 ring-${variantObject?.base}/50 outline-none ring-offset-2`
      : ""
  const focusedClass =
    focus && showFocusRing && !disabled
      ? `focus:ring-2 focus:ring-${variantObject?.base} focus:outline-none ring-offset-2`
      : ""
  return `${baseClass} ${textClass} ${backgroundClass} ${borderClass} ${focusedClass} ${selectedClass} ${buttonWidth}`
}

const Button = forwardRef(
  (buttonProps: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
    let {
      text,
      textClassName = undefined,

      // Button Background Colors
      primary = true,
      secondary = false,
      tertiary = false,
      success = false,
      error = false,
      danger = false,
      warning = false,
      info = false,
      custom = false,
      buttonType = undefined,

      // Button Border Colors
      borderPrimary = false,
      borderSecondary = false,
      borderTertiary = false,
      borderSuccess = false,
      borderError = false,
      borderDanger = false,
      borderWarning = false,
      borderInfo = false,
      borderCustom = false,
      borderType = undefined,

      // Button Text Colors
      textPrimary = false,
      textSecondary = false,
      textTertiary = false,
      textSuccess = false,
      textError = false,
      textDanger = false,
      textWarning = false,
      textInfo = false,
      textCustom = false,
      textType = undefined,

      // Button MakUiStates
      active = false,
      selected = false,
      disabled = false,
      focus = false,
      buttonState = "default",

      isLoading = false,
      isError = false,
      isSuccess = false,
      className = undefined,
      onClick = undefined,
      children = undefined,
      type = undefined,
      outline = false,
      border = true,
      fill = true,
      width = "fit",
      id = undefined,
      buttonKey = undefined,
      statusIconSide = "right",
      icon = undefined,
      iconSide = "left",
      wrapButtonText = false,
      keepStatusVisible = false,
      showFocusRing = false,
    } = buttonProps

    const { simpleTheme, componentConfig, mcn } = useMakUi()

    const status = isLoading || isError || isSuccess
    const [showStatus, setShowStatus] = useState<boolean>(!!status)
    const [buttonInteractions, setButtonInteractions] =
      useState<ButtonInteractions>({
        base: true,
        hover: false,
        click: false,
        focus: false,
      })

    useEffect(() => {
      if (status) {
        setShowStatus(true)
        const timer = setTimeout(() => {
          return (
            (isError || isSuccess) && !keepStatusVisible && setShowStatus(false)
          )
        }, 2000)
        return () => clearTimeout(timer)
      }
    }, [isLoading, isError, isSuccess])

    const buttonStyle = useMemo(() => {
      if (buttonType) return buttonType
      if (secondary) return "secondary"
      if (tertiary) return "tertiary"
      if (success) return "success"
      if (error) return "error"
      if (danger) return "danger"
      if (warning) return "warning"
      if (info) return "info"
      if (custom) return "custom"
      if (primary) return "primary"
      return "primary"
    }, [buttonProps])

    const textStyle = useMemo(() => {
      if (textType) return textType
      if (textSecondary) return "secondary"
      if (textTertiary) return "tertiary"
      if (textSuccess) return "success"
      if (textError) return "error"
      if (textWarning) return "warning"
      if (textDanger) return "danger"
      if (textInfo) return "info"
      if (textCustom) return "custom"
      if (textPrimary) return "primary"
      return "primary"
    }, [buttonProps])

    const borderStyle = useMemo(() => {
      if (borderType) return borderType
      if (borderSecondary) return "secondary"
      if (borderTertiary) return "tertiary"
      if (borderSuccess) return "success"
      if (borderError) return "error"
      if (borderWarning) return "warning"
      if (borderDanger) return "danger"
      if (borderInfo) return "info"
      if (borderCustom) return "custom"
      if (borderPrimary) return "primary"
      return buttonStyle
    }, [buttonProps])

    const isDisabled = disabled || isLoading

    const currentButtonState = (): ButtonStates => {
      return {
        state: buttonState,
        interaction: buttonInteractions,
        disabled: isDisabled || buttonState === "disabled",
        loading: isLoading,
        success: isSuccess,
        error: isError,
        selected: selected || buttonState === "selected",
        active: active || buttonState === "active",
        focus: focus || buttonInteractions.focus,
        click: buttonInteractions.click,
        hover: buttonInteractions.hover,
      }
    }

    const outlined = outline || !fill

    const displayTextOrChildren = () => {
      if (children) return children
      if (text && text !== "" && text !== undefined) return text
      if (text === "" || text === undefined) return null
      return "Submit"
    }

    const computedButtonClassName = buttonClassName({
      text: !!displayTextOrChildren(),
      buttonStyle: buttonStyle,
      textStyle: textStyle,
      borderStyle: borderStyle,
      buttonStates: currentButtonState(),
      width,
      outlined,
      border,
      customClassName: className,
      customTextClassName: textClassName,
      buttonConfig: componentConfig.buttonConfig,
      theme: simpleTheme,
      showFocusRing,
      mcn: mcn,
    })

    const handleClick = () => {
      if (!isDisabled && onClick) {
        onClick()
      }
    }

    // const focusClassNames = useMemo(() => {
    //   let makClassName
    //   let className
    //   if (showFocusRing) {
    //     makClassName = `focus:focus-ring-${buttonStyle} focus:ring-offset-theme-primary`
    //     className = `focus:ring-2 focus:ring-offset-2`
    //     return mcn("", {
    //       makClassName,
    //       className,
    //       type: "button",
    //       states: ["hover"],
    //     })
    //   }
    // }, [showFocusRing])

    // const borderBgClassNames = useMemo(() => {
    //   let makClassName
    //   let className
    //   if (outlined) {
    //     makClassName = `border-${buttonStyle}`
    //     className = `border-[3px]`
    //     return mcn("", {
    //       makClassName,
    //       className,
    //       type: "button",
    //       states: ["focus", "hover", "group-hover"],
    //     })
    //   } else {
    //     makClassName = `bg-${buttonStyle}`
    //     return mcn("", {
    //       makClassName,
    //       states: ["focus", "hover", "group-hover"],
    //     })
    //   }
    // }, [outlined])

    // const textClassNames = useMemo(() => {
    //   let makClassName
    //   let className
    //   makClassName = `text-${textStyle}`
    //   className = `text-sm`
    //   return mcn("", {
    //     makClassName,
    //     className,
    //     type: "button",
    //     states: ["focus", "hover", "group-hover"],
    //   })
    // }, [textStyle])

    return (
      <button
        ref={ref}
        onClick={handleClick}
        onPointerDown={() => {
          setButtonInteractions({
            ...buttonInteractions,
            base: false,
            hover: false,
            click: true,
          })
        }}
        onPointerUp={() => {
          setButtonInteractions({
            ...buttonInteractions,
            base: true,
            click: false,
          })
        }}
        onPointerEnter={() => {
          setButtonInteractions({
            ...buttonInteractions,
            base: false,
            hover: true,
          })
        }}
        onPointerLeave={() => {
          setButtonInteractions({
            ...buttonInteractions,
            base: true,
            hover: false,
          })
        }}
        onFocus={() => {
          setButtonInteractions({
            ...buttonInteractions,
            focus: true,
          })
        }}
        onBlur={() => {
          setButtonInteractions({
            ...buttonInteractions,
            focus: false,
          })
        }}
        className={`group flex items-center justify-center gap-1 ${computedButtonClassName}`}
        disabled={isDisabled}
        type={type}
        id={id}
        key={buttonKey}
        autoFocus={currentButtonState().focus}
      >
        {showStatus && status && statusIconSide === "left" && (
          <InLineLoader loading={isError} error={isError} success={isSuccess} />
        )}
        {icon && iconSide === "left" && icon}
        {children ? (
          // <span className={`group ${wrapButtonText ? "" : "whitespace-nowrap"}`}>
          children
        ) : (
          // </span>
          <p
            className={`${textClassName} ${
              wrapButtonText ? "" : "whitespace-nowrap"
            }`}
          >
            {displayTextOrChildren()}
          </p>
        )}
        {icon && iconSide === "right" && icon}
        {showStatus && status && statusIconSide === "right" && (
          <InLineLoader
            loading={isLoading}
            error={isError}
            success={isSuccess}
          />
        )}
      </button>
    )
  }
)

Button.displayName = "Button"

export default Button
