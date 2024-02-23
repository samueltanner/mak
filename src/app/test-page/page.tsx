"use client"

import {
  MakUiPaletteKey,
  MakUiThemeKey,
  MakUiVariantKey,
  MakUiVerboseTheme,
  MakUiVerboseThemeVariant,
  Shade,
} from "../_hooks/useMakUi/types/ui-types"
import chroma from "chroma-js"
import styled from "@emotion/styled"
import {
  deepMerge,
  ensureNestedObject,
} from "@/globals/global-helper-functions"
import { useMakUi } from "../_hooks/useMakUi/context/MakUiContext"
import { twColors } from "../_hooks/useMakUi/constants/tailwind-colors"

export type ModifierProps = {
  selector?: string
  altSelector?: string
  n?: string
}

export const twModifierSet = new Set<string>([
  "hover",
  "focus",
  "focus-within",
  "focus-visible",
  "active",
  "visited",
  "target",
  "first",
  "last",
  "only",
  "odd",
  "even",
  "first-of-type",
  "last-of-type",
  "only-of-type",
  "empty",
  "disabled",
  "enabled",
  "checked",
  "indeterminate",
  "default",
  "required",
  "valid",
  "invalid",
  "in-range",
  "out-of-range",
  "placeholder-shown",
  "autofill",
  "read-only",
  "before",
  "after",
  "first-letter",
  "first-line",
  "marker",
  "selection",
  "file",
  "backdrop",
  "placeholder",
  "fullscreen",
  "last-child",
  "link",
  "not-checked",
  "only-child",
  "optional",
  "read-write",
  "first-child",
  "has",
  "is",
])

export const mediaQueries: {
  [key: string]: string
} = {
  dark: '[data-theme="dark"] &',
  light: '[data-theme="light"] &',
  custom: '[data-theme="custom"] &',
  "2xs": "@media (min-width: 320px)",
  xs: "@media (min-width: 480px)",
  sm: "@media (min-width: 640px)",
  md: "@media (min-width: 768px)",
  lg: "@media (min-width: 1024px)",
  xl: "@media (min-width: 1280px)",
  "2xl": "@media (min-width: 1536px)",
  "3xl": "@media (min-width: 1920px)",
  "4xl": "@media (min-width: 2560px)",
}

export const twToCssKeyMap: { [key: string]: string } = {
  bg: "backgroundColor",
  text: "color",
  border: "borderColor",
  theme: "backgroundColor",
  color: "backgroundColor",
  outline: "outlineColor",
  ring: "outlineColor",
  "ring-offset": "boxShadow",
  divide: "borderColor",
}

const separateTwModifiers = (className: string | undefined) => {
  if (!className || typeof className !== "string")
    return {
      modifiers: "",
      modifiersArray: [],
      mediaQueriesArray: [],
      relationalModifiersArray: [],
      className,
    }

  const hasSet = new Set<string>()

  if (className.includes("has-")) {
    const hasMatch = className.match(`^${"has-"}\\[(.+?)\\]`)
    if (hasMatch) {
      const pseudoClass = `has(${hasMatch[1]})`
      hasSet.add(pseudoClass)
    }
  }

  const regex = /^(.*?):([^:]+)$/
  const match = className.match(regex)
  const relationalModifiers = ["group-", "peer-", "parent-"]

  if (match) {
    const modifiers = match[1]
    const finalClassName = match[2]
    const modifiersSet = new Set(modifiers.split(/(?<!\[[^\]]*):/))
    const mediaQueriesSet = new Set()
    const relationalModifiersSet = new Set()

    modifiersSet.forEach((m) => {
      !twModifierSet.has(m) && modifiersSet.delete(m)
      mediaQueries?.[m] && modifiersSet.delete(m)
      mediaQueries?.[m] && mediaQueriesSet.add(m)

      if (relationalModifiers.some((rm) => m.includes(rm))) {
        modifiersSet.delete(m)

        let relation = findSubstring({
          string: m,
          substrings: relationalModifiers,
        })
        const modifier = m.split(relation || " ")[1]
        relation = relation?.replace("-", "")
        const hasMatch = modifier.match(`^${"has-"}\\[(.+?)\\]`)
        const peerTilde = relation === "peer" ? " ~ " : " "
        let parsedModifier = ""
        if (hasMatch) {
          parsedModifier = `.${relation}:has(${hasMatch[1]})${peerTilde}`
        } else {
          parsedModifier = `.${relation}:${modifier.replace(
            /[\[\]\:]/g,
            ""
          )}${peerTilde}`
        }
        relationalModifiersSet.add(parsedModifier)
      }
    })

    const modifiersArray = [...modifiersSet.values(), ...hasSet.values()]
    const mediaQueriesArray = [...mediaQueriesSet.values()]
    const relationalModifiersArray = [...relationalModifiersSet.values()]

    return {
      modifiers,
      modifiersArray,
      mediaQueriesArray,
      relationalModifiersArray,
      className: finalClassName,
    }
  } else {
    return {
      modifiers: "",
      modifiersArray: [...hasSet.values()],
      mediaQueriesArray: [],
      relationalModifiersArray: [],
      className,
    }
  }
}

export const extractMakVars = ({
  className,
  activeTheme,
}: {
  className?: string
  activeTheme: MakUiVerboseTheme
}) => {
  let paletteVariant: MakUiPaletteKey | undefined = undefined
  let variant: MakUiVariantKey = "primary"
  let shade: Shade | undefined = undefined
  let mcn: string | undefined
  let opacity = undefined
  let color
  let altPaletteVariant: MakUiPaletteKey | undefined = undefined
  mcn = className
  opacity = mcn?.split("/")[1]
  mcn = mcn?.split("/")[0]

  variant =
    (mcn?.split(`${paletteVariant}-`)?.[1] as MakUiVariantKey) || "primary"
  paletteVariant =
    (mcn?.split("-")[0] as MakUiPaletteKey) || ("bg" as MakUiPaletteKey)
  variant =
    (mcn?.split("-")[1] as MakUiVariantKey) || ("primary" as MakUiVariantKey)

  if (variant.includes("|")) {
    const splitVariant = variant.split("|")
    variant = splitVariant[1] as MakUiVariantKey
    altPaletteVariant = splitVariant[0] as MakUiPaletteKey
  }

  let shadeString = mcn?.split("-")[2]
  if (!shadeString) {
    if (variant === "light") {
      shadeString = "100"
    } else if (variant === "dark") {
      shadeString = "900"
    } else {
      shadeString = "500"
    }
  }
  shade = Number(shadeString) as Shade

  let resolvedVariant = altPaletteVariant || paletteVariant

  if (resolvedVariant !== "theme") {
    color = activeTheme?.[resolvedVariant]?.[variant]?.[shade]
    if (!color) {
      let twKey = mcn
      twKey = twKey!.split("-").slice(1).join("-")
      if (twKey.charAt(0) === "#") {
        color = twKey
      } else {
        const twColor = twColors[twKey]
        color = twColor
      }
    }
  } else {
    color = activeTheme.theme?.[variant as keyof MakUiVerboseThemeVariant]
  }

  if (opacity && color) {
    color = chroma(color)
      .alpha(Number(opacity) / 100)
      .css()
  }
  return {
    paletteVariant,
    mcn,
    opacity,
    shade,
    color,
    altPaletteVariant,
  }
}

const findSubstring = ({
  string,
  substrings,
}: {
  string?: string
  substrings: string[]
}): string | undefined => {
  if (!string) return undefined

  for (let substring of substrings) {
    if (string.includes(substring)) {
      return substring
    }
  }
  return undefined
}

const constructCSSClassNameObject = ({
  makClassName,
  activeTheme,
  rootClassObject,
  returnAllVars,
}: {
  makClassName: string
  activeTheme: MakUiVerboseTheme
  rootClassObject?: GenericObject
  returnAllVars?: boolean
}) => {
  let {
    className,
    modifiersArray,
    mediaQueriesArray,
    relationalModifiersArray,
  } = separateTwModifiers(makClassName)
  let { paletteVariant, color } = extractMakVars({ className, activeTheme })

  let joinedRelationalModifiers = relationalModifiersArray.length
    ? relationalModifiersArray.join(" ")
    : "&"
  let joinedModifiers = modifiersArray.length
    ? `:${modifiersArray.join(":")}`
    : ""

  const escapedClassName = makClassName.replace(
    /([:\|\[\]{}()+>~!@#$%^&*=/"'`;,\\])/g,
    "\\$&"
  )

  const classNameString = `${joinedRelationalModifiers}.${escapedClassName}${joinedModifiers}`

  const mediaQueryKeys: string[] = []

  mediaQueriesArray.forEach((mq) => {
    mediaQueryKeys.push(mediaQueries[mq as string])
  })

  const cssKey = twToCssKeyMap?.[paletteVariant] || "backgroundColor"

  const classNameObject = {}

  ensureNestedObject({
    parent: classNameObject,
    keys: [
      ...mediaQueryKeys,
      classNameString,
      rootClassObject ? undefined : cssKey,
    ],
    value: rootClassObject || color,
  })

  if (returnAllVars) {
    return {
      className,
      modifiersArray,
      mediaQueriesArray,
      relationalModifiersArray,
      paletteVariant,
      color,
      classNameObject,
    }
  }
  return classNameObject
}

const parseGradientClassNames = ({
  makClassName,
  activeTheme,
}: {
  makClassName: string
  activeTheme: MakUiVerboseTheme
}) => {
  const gradientModifiers =
    makClassName.match(
      /([^ ]+:)?(bg-((linear-)|(conic-)|(radial-))?gradient-?[^ ]*)|(([^ ]+:)?((from)|(to)|(via))-[^ ]+)/g
    ) || []

  const linearGradientDirections: { [key: string]: string } = {
    "to-t": "to top",
    "to-tr": "to top right",
    "to-r": "to right",
    "to-br": "to bottom right",
    "to-b": "to bottom",
    "to-bl": "to bottom left",
    "to-l": "to left",
    "to-tl": "to top left",
  }

  const gradientModifierObject: {
    [key: string]: string[]
  } = {
    instructions:
      makClassName?.match(
        /([^ ]+:)?(bg-((linear-)|(conic-)|(radial-))?gradient-?[^ ]*)/g
      ) || [],
    fromPositions:
      makClassName?.match(/([^ ]+:)?((from))-\[?[^\s\]]+((%)|(deg)){1}\]?/g) ||
      [],
    fromColors:
      makClassName?.match(
        /(?<=^|\s)(?![^ ]*bg-gradient-)([^ ]+:)?(?:from)-[a-z0-9-]+(?:\/[0-9]+)?(?=\s|$)/g
      ) || [],
    viaPositions:
      makClassName?.match(/([^ ]+:)?via-\[?[^\s\]]+((%)|(deg)){1}\]?/g) || [],
    viaColors:
      makClassName?.match(
        /(?<=^|\s)(?![^ ]*bg-gradient-)([^ ]+:)?(?:via)-[a-z0-9-]+(?:\/[0-9]+)?(?=\s|$)/g
      ) || [],
    toPositions:
      makClassName?.match(/([^ ]+:)?to-\[?[^\s\]]+((%)|(deg)){1}\]?/g) || [],
    toColors:
      makClassName?.match(
        /(?<=^|\s)(?![^ ]*bg-gradient-)([^ ]+:)?(?:to)-[a-z0-9-]+(?:\/[0-9]+)?(?=\s|$)/g
      ) || [],
  }

  for (const gm of gradientModifiers) {
    makClassName = makClassName?.replace(gm, "").trim()
  }

  const gradientClassSet = new Set<GenericObject>()

  for (let instruction of gradientModifierObject.instructions) {
    const gradientType =
      instruction.match(/(linear|conic|radial)/)?.[0] || "linear"
    const direction =
      instruction.match(
        /((to-t)|(to-tr)|(to-r)|(to-br)|(to-b)|(to-bl)|(to-l)|(to-tl))/g
      )?.[0] || "to-b"
    const gradientDirection =
      gradientType === "linear"
        ? `${linearGradientDirections?.[direction]}, `
        : gradientType === "radial, "
        ? "circle, "
        : ""
    const gradientInstruction = `${gradientType}-gradient(${gradientDirection}var(--gradient-stops))`

    const instructionClassObject = constructCSSClassNameObject({
      makClassName: instruction,
      activeTheme,
      rootClassObject: {
        backgroundImage: gradientInstruction,
      },
    })

    gradientClassSet.add(instructionClassObject)
  }

  const hasViaValues =
    gradientModifierObject.viaColors.length > 0 ||
    gradientModifierObject.viaPositions.length > 0

  for (let terminus of ["from", "via", "to"]) {
    for (let twPosition of gradientModifierObject[`${terminus}Positions`]) {
      if (!gradientModifierObject[`${terminus}Positions`].length) continue
      const positionLocation = twPosition
        .replace(/[\[\]]/g, "")
        .replace("to-", "")
      const positionClassObject = constructCSSClassNameObject({
        makClassName: twPosition,
        activeTheme,
        rootClassObject: {
          [`--gradient-${terminus}-position`]: positionLocation,
        },
      })

      gradientClassSet.add(positionClassObject)
    }
  }

  for (let terminus of ["from", "via", "to"]) {
    for (let twColor of gradientModifierObject[`${terminus}Colors`]) {
      let { className } = separateTwModifiers(twColor)
      className = className?.replace(terminus, "bg")
      const { color } = extractMakVars({ className, activeTheme })
      let rootClassObject: GenericObject = {}
      if (terminus === "from") {
        rootClassObject = {
          "--gradient-stops": `var(--gradient-${terminus}),${
            hasViaValues ? " var(--gradient-via)," : ""
          } var(--gradient-to)`,
          "--gradient-from": `${color} var(--gradient-from-position, 0%)`,
          "--gradient-to": `var(--gradient-to-color, rgb(0,0,0,0)) var(--gradient-to-position, 100%)`,
        }

        if (hasViaValues) {
          rootClassObject = {
            ...rootClassObject,
            "--gradient-via": `var(--gradient-via-color) var(--gradient-via-position, 50%)`,
          }
        }
      } else {
        rootClassObject = {
          [`--gradient-${terminus}-color`]: color,
        }
      }
      const colorClassObject = constructCSSClassNameObject({
        makClassName: twColor,
        activeTheme,
        rootClassObject,
      })

      gradientClassSet.add(colorClassObject)
    }
  }

  return {
    gradientClassSet,
    makClassName,
  }
}

export const parseMakClassNames = ({
  makClassName,
  activeTheme,
}: {
  makClassName?: string
  activeTheme: MakUiVerboseTheme
}) => {
  makClassName = makClassName?.replace(/\s+/g, " ").trim()
  if (!makClassName || makClassName === "") return {}

  const resp = parseGradientClassNames({ makClassName, activeTheme })
  makClassName = resp.makClassName
  const gradientClassSet = resp.gradientClassSet
  let makClassNamesArray =
    makClassName === "" ? [] : makClassName?.split(" ") || []

  let cssObjectSet = new Set<GenericObject | string>(gradientClassSet)

  if (makClassNamesArray.length > 0) {
    for (const makClassName of makClassNamesArray) {
      const classNameObj = constructCSSClassNameObject({
        makClassName,
        activeTheme,
      })
      cssObjectSet.add(classNameObj)
    }
  }

  const cssObjectArray = Array.from(cssObjectSet)

  const makCSSObject = deepMerge(...(cssObjectArray as GenericObject[]))

  console.log(JSON.stringify(makCSSObject, null, 2))

  return makCSSObject
}

const StyledInput = styled.input({
  "&.placeholder-shown\\:bg-primary:placeholder-shown": {
    backgroundColor: "#731AFF",
  },
})

const StyledText = styled.p({
  "&.first-letter\\:text-tertiary-500:first-letter": {
    color: "#eab308",
  },
})
const StyledButton = styled.button({
  ".peer:hover ~ &.peer-hover\\:bg-secondary-500": {
    backgroundColor: "#00EAB3",
  },
})

const StyledGradient = styled.div({
  ".group:hover .group-hover\\:bg-primary-500": {
    backgroundColor: "#731AFF",
  },
})

const StyledGroup = styled.div()

const TestPage = () => {
  const { verboseTheme } = useMakUi()
  const makClassName = "*:flex"
  // "bg-gradient-to-r from-primary-500 from-60% light:from-20%"
  parseMakClassNames({
    makClassName,
    activeTheme: verboseTheme,
  })
  return (
    <StyledGroup className="p-4 group border-2 w-fit h-fit">
      <span className="flex size-10 bg-red-500 peer" />
      <span className="flex size-10 bg-red-500 peer" />
      <span className="flex size-10 bg-red-500 peer" />
      <span className="flex size-10 bg-red-500 peer" />
    </StyledGroup>
  )
}

export default TestPage
