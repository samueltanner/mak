import { TypeProps } from "../types/component-types"
import ComponentWrapper from "./ComponentWrapper"
import { BiCheckCircle, BiErrorCircle, BiLoaderCircle } from "react-icons/bi"
import { mak } from "../elements/ts/mak"
import { use, useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
type LoaderProps = TypeProps & {
  children?: React.ReactNode
  makClassName?: string
  className?: string
  loading?: boolean
  error?: boolean
  success?: boolean
  persistState?: boolean
  size?: "inline" | "screen" | "full"
  loadingIcon?: React.ReactNode
  errorIcon?: React.ReactNode
  successIcon?: React.ReactNode
  loadingState?: "default" | "loading" | "error" | "success" | undefined

  showIcon?: boolean
}

const iconVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}

export const LoaderComponent = ({
  children,
  loading,
  error,
  success,
  loadingIcon = <BiLoaderCircle className="animate-spin size-4" />,
  errorIcon = <BiErrorCircle className="size-4" />,
  successIcon = <BiCheckCircle className="size-4" />,
  className,
  makClassName,
  persistState = false,
  showIcon = true,
  loadingState,
  ...computedProps
}: LoaderProps) => {
  const [state, setState] = useState<
    "default" | "loading" | "error" | "success" | undefined
  >(undefined)

  useEffect(() => {
    if (loadingState) {
      setState(loadingState)
    } else {
      if (loading) {
        setState("loading")
      }
      if (error) {
        setState("error")
      }
      if (success) {
        setState("success")
      }
    }
  }, [loadingState, loading, error, success])

  useEffect(() => {
    if (state === "loading" || persistState) return
    console.log(`state is not loading or persisted: ${state}`)

    const timeoutId = setTimeout(() => {
      setState(undefined)
    }, 4000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [state])

  const iconMap = {
    loading: loadingIcon,
    error: errorIcon,
    success: successIcon,
  }

  useEffect(() => {
    console.log(`state: ${state}`)
  }, [state])

  const Icon = (
    <AnimatePresence mode="wait">
      {state && state !== "default" && (
        <mak.span
          key={`${state}`}
          className="flex"
          motion={{
            variants: iconVariants,
            initial: "hidden",
            animate: "visible",
            exit: "exit",
            transition: { duration: 0.5, delay: 0.5 },
          }}
        >
          {state === "loading" && loadingIcon}
          {state === "error" && errorIcon}
          {state === "success" && successIcon}
        </mak.span>
      )}
    </AnimatePresence>
  )

  return (
    <mak.span className={className} makClassName={makClassName}>
      {children && children}
      {showIcon && Icon}
    </mak.span>
  )
}

const Loader = (props: LoaderProps) => {
  return (
    <ComponentWrapper {...props}>
      {(computedProps) => (
        <LoaderComponent
          {...computedProps}
          children={props.children}
          makClassName={props.makClassName}
          className={props.className}
        />
      )}
    </ComponentWrapper>
  )
}

export default Loader
