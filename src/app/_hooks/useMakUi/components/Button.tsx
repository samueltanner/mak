"use client"
import { forwardRef, useEffect, useMemo, useState } from "react"
import { InLineLoader } from "./InLineLoader"
import { useMakUi } from "../context/MakUiContext"
import {
  MakUiSimpleTheme,
  MakUiStateKey,
  MakUiVariantKey,
  MakUiVerboseTheme,
} from "../types/ui-types"

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
  light?: boolean
  dark?: boolean
  buttonType?: MakUiVariantKey | undefined

  textPrimary?: boolean
  textSecondary?: boolean
  textTertiary?: boolean
  textSuccess?: boolean
  textError?: boolean
  textWarning?: boolean
  textDanger?: boolean
  textInfo?: boolean
  textCustom?: boolean
  textLight?: boolean
  textDark?: boolean
  textType?: MakUiVariantKey | undefined

  borderPrimary?: boolean
  borderSecondary?: boolean
  borderTertiary?: boolean
  borderSuccess?: boolean
  borderError?: boolean
  borderWarning?: boolean
  borderDanger?: boolean
  borderInfo?: boolean
  borderCustom?: boolean
  borderLight?: boolean
  borderDark?: boolean
  borderType?: MakUiVariantKey | undefined

  active?: boolean
  disabled?: boolean
  focus?: boolean
  buttonState?: MakUiStateKey | undefined

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
  state: MakUiStateKey
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
  base: boolean
  hover: boolean
  click: boolean
  focus: boolean
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
}: {
  text: boolean
  buttonStyle: MakUiVariantKey
  textStyle: MakUiVariantKey
  borderStyle: MakUiVariantKey
  buttonStates: ButtonStates
  width: string
  outlined?: boolean
  border?: boolean
  customClassName?: string
  customTextClassName?: string
  buttonConfig: MakUiRootComponentConfig
  theme: MakUiSimpleTheme
  showFocusRing?: boolean
}) => {
  const textPalette = theme.text
  const colorPalette = theme.color
  const borderPalette = theme.border
  const themePalette = theme.theme

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
      light = false,
      dark = false,
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
      borderLight = false,
      borderDark = false,
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
      textLight = false,
      textDark = false,
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

    const { simpleTheme, componentConfig } = useMakUi()

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
      if (light) return "light"
      if (dark) return "dark"
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
      if (textLight) return "light"
      if (textDark) return "dark"
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
      if (borderLight) return "light"
      if (borderDark) return "dark"
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
        className={`group flex items-center justify-center gap-1 ${computedButtonClassName} ${className}`}
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
