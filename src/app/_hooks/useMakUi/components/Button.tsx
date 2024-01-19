"use client"
import { forwardRef, useEffect, useState } from "react"
import { InLineLoader } from "./InLineLoader"
import { useMakUi } from "../context/MakUiContext"
import {
  MakUiNestedPalette,
  MakUiPalette,
  MakUiState,
  MakUiStates,
  MakUiVariant,
  MakUiVariants,
  MakUiVerboseTheme,
} from "../types/default-types"
import { MakUiButtonConfig } from "../types/button-types"

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
  focused?: boolean
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
}

type ButtonStates = {
  state: MakUiState
  disabled: boolean
  loading: boolean
  selected: boolean
  success: boolean
  error: boolean
  active: boolean
  focused: boolean
}

const buttonClassName = ({
  text,
  buttonStyle,
  textStyle = "secondary",
  borderStyle = buttonStyle,
  buttonStates,
  width = "fit",
  outlined,
  border,
  customClassName,
  customTextClassName,
  buttonConfig,
  palette,
  showFocusRing = true,
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
  buttonConfig: MakUiButtonConfig
  palette: MakUiVerboseTheme
  showFocusRing?: boolean
}) => {
  const textPalette = palette.text
  const colorPalette = palette.color
  const borderPalette = palette.border
  const themePalette = palette.theme

  const {
    state: buttonState,
    disabled,
    selected,
    active,
    focused,
  } = buttonStates

  const buttonWidth = width === "full" ? "w-full" : "w-fit"
  const cursorAction = disabled ? "cursor-not-allowed" : "cursor-pointer"
  const outlinedOrFilled = outlined ? "border" : "bg"

  const variantObject = colorPalette?.[buttonStyle]?.[buttonState]
  const textVariantObject = textPalette?.[textStyle]?.[buttonState]
  const borderVariantObject = borderPalette?.[borderStyle]?.[buttonState]

  const baseClass = `${buttonConfig.className} fade-in-out ${
    disabled && "cursor-not-allowed"
  }`
  const textClass = `font-semibold text-${textVariantObject?.base} text-sm hover:text-${textVariantObject?.hover}`
  const backgroundClass = `${outlinedOrFilled}-${variantObject?.base} hover:${outlinedOrFilled}-${variantObject?.hover}`
  const borderClass = `border-${borderVariantObject?.base} border-2 hover:border-${borderVariantObject?.hover}`
  const selectedClass =
    selected && showFocusRing && !disabled
      ? `ring-2 ring-${variantObject?.baseRoot}/50 outline-none ring-offset-2`
      : ""
  const focusedClass =
    focused && showFocusRing && !disabled
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
      focused = false,
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
    } = buttonProps

    const { t, buttonConfig } = useMakUi()

    const status = isLoading || isError || isSuccess
    const [showStatus, setShowStatus] = useState<boolean>(!!status)

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

    const buttonStyle = () => {
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
    }

    const textStyle = () => {
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
      return "secondary"
    }

    const borderStyle = () => {
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
      return buttonStyle()
    }

    const isDisabled = disabled || isLoading

    const currentButtonState = (): ButtonStates => {
      return {
        state: buttonState,
        disabled: isDisabled || buttonState === "disabled",
        loading: isLoading,
        success: isSuccess,
        error: isError,
        selected: selected || buttonState === "selected",
        active: active || buttonState === "active",
        focused: focused || buttonState === "focused",
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
      buttonStyle: buttonStyle(),
      textStyle: textStyle(),
      borderStyle: borderStyle(),
      buttonStates: currentButtonState(),
      width,
      outlined,
      border,
      customClassName: className,
      customTextClassName: textClassName,
      buttonConfig,
      palette: t,
    })

    const handleClick = () => {
      if (!isDisabled && onClick) {
        onClick()
      }
    }

    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={`flex items-center justify-center gap-1 ${computedButtonClassName} `}
        disabled={isDisabled}
        type={type}
        id={id}
        key={buttonKey}
        autoFocus={currentButtonState().focused}
      >
        {showStatus && status && statusIconSide === "left" && (
          <InLineLoader loading={isError} error={isError} success={isSuccess} />
        )}
        {icon && iconSide === "left" && icon}
        {children ? (
          <span
            className={`${textClassName} ${
              wrapButtonText ? "" : "whitespace-nowrap"
            }`}
          >
            {children}
          </span>
        ) : (
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
