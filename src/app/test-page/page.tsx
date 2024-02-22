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
export const tailwindToCssModifierObject: {
  [key: string]:
    | string
    | (({
        className,
        pseudoClasses,
        selector,
        altSelector,
        n,
      }: ModifierProps) => string)
} = {
  hover: "&:hover",
  focus: "&:focus",
  "focus-within": "&:focus-within",
  "focus-visible": "&:focus-visible",
  active: "&:active",
  visited: "&:visited",
  target: "&:target",
  first: "&:first-child",
  last: "&:last-child",
  only: "&:only-child",
  odd: "&:nth-child(odd)",
  even: "&:nth-child(even)",
  "first-of-type": "&:first-of-type",
  "last-of-type": "&:last-of-type",
  "only-of-type": "&:only-of-type",
  empty: "&:empty",
  disabled: "&:disabled",
  enabled: "&:enabled",
  checked: "&:checked",
  indeterminate: "&:indeterminate",
  default: "&:default",
  required: "&:required",
  valid: "&:valid",
  invalid: "&:invalid",
  "in-range": "&:in-range",
  "out-of-range": "&:out-of-range",
  "placeholder-shown": "&:placeholder-shown",
  autofill: "&:autofill",
  "read-only": "&:read-only",
  before: "&::before",
  after: "&::after",
  "first-letter": "&::first-letter",
  "first-line": "&::first-line",
  marker: "&::marker",
  selection: "&::selection",
  file: "&::file-selector-button",
  backdrop: "&::backdrop",
  placeholder: "&::placeholder",
  fullscreen: ":fullscreen",
  "last-child": ":last-child",
  link: ":link",
  "not-checked": ":not(:checked)",
  "only-child": ":only-child",
  optional: ":optional",
  "read-write": ":read-write",
  "first-child": ":first-child",

  has: ({ selector }) => `:has(:${selector})`,
  "has-not": ({ selector }) => `:not(has:(:${selector}))`,
  is: ({ selector }) => `:is(${selector})`,
  "is-not": ({ selector }) => `:not(:is(${selector}))`,
  "is-has": ({ selector, altSelector }) =>
    `:is(${selector}):has(~ ${altSelector})`,
  "is-has-not": ({ selector, altSelector }) =>
    `:is(${selector}):not(:has(~ ${altSelector}))`,

  //applies styles to parent if child has a certain state or element
  "parent-has": ({ selector }) => `:has(${selector})`,
  "parent-has-not": ({ selector }) => `:not(:has(${selector}))`,
  "parent-is": ({ selector }) => `:is(${selector})`,
  "parent-is-not": ({ selector }) => `:not(:is(${selector}))`,
  "parent-is-has": ({ selector, altSelector }) =>
    `:is(${selector}):has(${altSelector})`,
  "parent-is-has-not": ({ selector, altSelector }) =>
    `:is(${selector}):not(:has(${altSelector}))`,

  //styles applied to child of a group
  //tw eg. group-hover:bg-red-500
  "group-hover": ({ selector }) => `.group:hover ${selector}`,
  "group-focus": ({ selector }) => `.group:focus ${selector}`,
  "group-focus-within": ({ selector }) => `.group:focus-within ${selector}`,
  "group-focus-visible": ({ selector }) => `.group:focus-visible ${selector}`,
  "group-active": ({ selector }) => `.group:active ${selector}`,
  "group-visited": ({ selector }) => `.group:visited ${selector}`,
  "group-target": ({ selector }) => `.group:target ${selector}`,
  "group-has": ({ selector }) => `.group:has(${selector})`,
  "group-has-not": ({ selector }) => `.group:not(:has(${selector}))`,
  "group-is": ({ selector }) => `.group:is(${selector})`,
  "group-is-not": ({ selector }) => `.group:not(:is(${selector}))`,
  "group-is-has": ({ selector, altSelector }) =>
    `.group:is(${selector}):has(${altSelector})`,
  "group-is-has-not": ({ selector, altSelector }) =>
    `.group:is(${selector}):not(:has(${altSelector}))`,
  "group-first": ({ selector }) => `.group:first-child ${selector}`,
  "group-last": ({ selector }) => `.group:last-child ${selector}`,
  "group-only-child": ({ selector }) => `.group:only-child ${selector}`,
  "group-odd": ({ selector }) => `.group:nth-child(odd) ${selector}`,
  "group-even": ({ selector }) => `.group:nth-child(even) ${selector}`,
  "group-first-of-type": ({ selector }) => `.group:first-of-type ${selector}`,
  "group-last-of-type": ({ selector }) => `.group:last-of-type ${selector}`,
  "group-only-of-type": ({ selector }) => `.group:only-of-type ${selector}`,
  "group-empty": ({ selector }) => `.group:empty ${selector}`,
  "group-disabled": ({ selector }) => `.group:disabled ${selector}`,
  "group-enabled": ({ selector }) => `.group:enabled ${selector}`,
  "group-checked": ({ selector }) => `.group:checked ${selector}`,
  "group-indeterminate": ({ selector }) => `.group:indeterminate ${selector}`,
  "group-default": ({ selector }) => `.group:default ${selector}`,
  "group-required": ({ selector }) => `.group:required ${selector}`,
  "group-valid": ({ selector }) => `.group:valid ${selector}`,
  "group-invalid": ({ selector }) => `.group:invalid ${selector}`,
  "group-in-range": ({ selector }) => `.group:in-range ${selector}`,
  "group-out-of-range": ({ selector }) => `.group:out-of-range ${selector}`,
  "group-placeholder-shown": ({ selector }) =>
    `.group:placeholder-shown ${selector}`,
  "group-autofill": ({ selector }) => `.group:autofill ${selector}`,
  "group-read-only": ({ selector }) => `.group:read-only ${selector}`,
  "group-before": ({ selector }) => `.group::before ${selector}`,
  "group-after": ({ selector }) => `.group::after ${selector}`,
  "group-first-letter": ({ selector }) => `.group::first-letter ${selector}`,
  "group-first-line": ({ selector }) => `.group::first-line ${selector}`,
  "group-marker": ({ selector }) => `.group::marker ${selector}`,
  "group-selection": ({ selector }) => `.group::selection ${selector}`,
  "group-file": ({ selector }) => `.group::file-selector-button ${selector}`,
  "group-backdrop": ({ selector }) => `.group::backdrop ${selector}`,
  "group-placeholder": ({ selector }) => `.group::placeholder ${selector}`,
  "group-fullscreen": ({ selector }) => `.group:fullscreen ${selector}`,
  "group-last-child": ({ selector }) => `.group:last-child ${selector}`,
  "group-link": ({ selector }) => `.group:link ${selector}`,
  "group-not-checked": ({ selector }) => `.group:not(:checked) ${selector}`,
  "group-optional": ({ selector }) => `.group:optional ${selector}`,
  "group-read-write": ({ selector }) => `.group:read-write ${selector}`,
  "group-first-child": ({ selector }) => `.group:first-child ${selector}`,

  //styles applied from parent element to children
  //tw eg. *-hover:bg-red-500
  "*": "& > *",
  "*-hover": "& > *:hover",
  "*-focus": "& > *:focus",
  "*-focus-within": "& > *:focus-within",
  "*-focus-visible": "& > *:focus-visible",
  "*-active": "& > *:active",
  "*-visited": "& > *:visited",
  "*-target": "& > *:target",
  "*-first": "& > *:first-child",
  "*-last": "& > *:last-child",
  "*-only": "& > *:only-child",
  "*-odd": "& > *:nth-child(odd)",
  "*-even": "& > *:nth-child(even)",
  "*-has": ({ selector }) => `& > *:has(~ ${selector})`,
  "*-has-not": ({ selector }) => `& > *:not(:has(~ ${selector}))`,
  "*-is": ({ selector }) => `& > *:is(${selector})`,
  "*-is-not": ({ selector }) => `& > *:not(:is(${selector}))`,
  "*-is-has": ({ selector, altSelector }) =>
    `& > *:is(${selector}):has(~ ${altSelector})`,
  "*-is-has-not": ({ selector, altSelector }) =>
    `& > *:is(${selector}):not(:has(~ ${altSelector}))`,
  "*-first-of-type": "& > *:first-of-type",
  "*-last-of-type": "& > *:last-of-type",
  "*-only-of-type": "& > *:only-of-type",
  "*-empty": "& > *:empty",
  "*-disabled": "& > *:disabled",
  "*-enabled": "& > *:enabled",
  "*-checked": "& > *:checked",
  "*-indeterminate": "& > *:indeterminate",
  "*-default": "& > *:default",
  "*-required": "& > *:required",
  "*-valid": "& > *:valid",
  "*-invalid": "& > *:invalid",
  "*-in-range": "& > *:in-range",
  "*-out-of-range": "& > *:out-of-range",
  "*-placeholder-shown": "& > *:placeholder-shown",
  "*-autofill": "& > *:autofill",
  "*-read-only": "& > *:read-only",
  "*-before": "& > *::before",
  "*-after": "& > *::after",
  "*-first-letter": "& > *::first-letter",
  "*-first-line": "& > *::first-line",
  "*-marker": "& > *::marker",
  "*-selection": "& > *::selection",
  "*-file": "& > *::file-selector-button",
  "*-backdrop": "& > *::backdrop",
  "*-placeholder": "& > *::placeholder",
  "*-fullscreen": "& > *fullscreen",
  "*-last-child": "& > *last-child",
  "*-link": "& > *link",
  "*-not-checked": "& > *not(:checked)",
  "*-only-child": "& > *only-child",
  "*-optional": "& > *optional",
  "*-read-write": "& > *read-write",
  "*-first-child": "& > *first-child",
  "*-all": "& > *",
  "*-nth-child": ({ n }) => `& > *:nth-child(${n})`,
  "*-nth-last-child": ({ n }) => `& > *:nth-last-child(${n})`,
  "*-nth-of-type": ({ n }) => `& > *:nth-of-type(${n})`,
  "*-nth-last-of-type": ({ n }) => `& > *:nth-last-of-type(${n})`,

  //styles applied to peer elements that come after the affected peer
  //tw eg. 1st element input is checked, 2nd element peer-checked:bg-red-500
  "peer-hover": ({ selector }) => `.peer:hover ~ ${selector}`,
  "peer-focus": ({ selector }) => `.peer:focus ~ ${selector}`,
  "peer-focus-within": ({ selector }) => `.peer:focus-within ~ ${selector}`,
  "peer-focus-visible": ({ selector }) => `.peer:focus-visible ~ ${selector}`,
  "peer-active": ({ selector }) => `.peer:active ~ ${selector}`,
  "peer-visited": ({ selector }) => `.peer:visited ~ ${selector}`,
  "peer-target": ({ selector }) => `.peer:target ~ ${selector}`,
  "peer-has": ({ selector }) => `.group:has(~ ${selector})`,
  "peer-has-not": ({ selector }) => `:not(:has(~ ${selector}))`,
  "peer-is": ({ selector }) => `:is(${selector})`,
  "peer-is-not": ({ selector }) => `:not(:is(${selector}))`,
  "peer-is-has": ({ selector, altSelector }) =>
    `:is(${selector}):has(~ ${altSelector})`,
  "peer-is-has-not": ({ selector, altSelector }) =>
    `:is(${selector}):not(:has(~ ${altSelector}))`,
  "peer-first": ({ selector }) => `.peer:first-child ~ ${selector}`,
  "peer-last": ({ selector }) => `.peer:last-child ~ ${selector}`,
  "peer-only": ({ selector }) => `.peer:only-child ~ ${selector}`,
  "peer-odd": ({ selector }) => `.peer:nth-child(odd) ~ ${selector}`,
  "peer-even": ({ selector }) => `.peer:nth-child(even) ~ ${selector}`,
  "peer-first-of-type": ({ selector }) => `.peer:first-of-type ~ ${selector}`,
  "peer-last-of-type": ({ selector }) => `.peer:last-of-type ~ ${selector}`,
  "peer-only-of-type": ({ selector }) => `.peer:only-of-type ~ ${selector}`,
  "peer-empty": ({ selector }) => `.peer:empty ~ ${selector}`,
  "peer-disabled": ({ selector }) => `.peer:disabled ~ ${selector}`,
  "peer-enabled": ({ selector }) => `.peer:enabled ~ ${selector}`,
  "peer-checked": ({ selector }) => `.peer:checked ~ ${selector}`,
  "peer-indeterminate": ({ selector }) => `.peer:indeterminate ~ ${selector}`,
  "peer-default": ({ selector }) => `.peer:default ~ ${selector}`,
  "peer-required": ({ selector }) => `.peer:required ~ ${selector}`,
  "peer-valid": ({ selector }) => `.peer:valid ~ ${selector}`,
  "peer-invalid": ({ selector }) => `.peer:invalid ~ ${selector}`,
  "peer-in-range": ({ selector }) => `.peer:in-range ~ ${selector}`,
  "peer-out-of-range": ({ selector }) => `.peer:out-of-range ~ ${selector}`,
  "peer-placeholder-shown": ({ selector }) =>
    `.peer:placeholder-shown ~ ${selector}`,
  "peer-autofill": ({ selector }) => `.peer:autofill ~ ${selector}`,
  "peer-read-only": ({ selector }) => `.peer:read-only ~ ${selector}`,
  "peer-fullscreen": ({ selector }) => `.peer:fullscreen ~ ${selector}`,
  "peer-last-child": ({ selector }) => `.peer:last-child ~ ${selector}`,
  "peer-link": ({ selector }) => `.peer link ~ ${selector}`,
  "peer-not-checked": "&:not(:has(~ .peer:checked))",
  "peer-only-child": ({ selector }) => `.peer:only-child) ~ ${selector}`,
  "peer-optional": ({ selector }) => `.peer:optional) ~ ${selector}`,
  "peer-read-write": ({ selector }) => `.peer:read-write) ~ ${selector}`,
  "peer-first-child": ({ selector }) => `.peer:first-child) ~ ${selector}`,
}

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
      !tailwindToCssModifierObject?.[m] && modifiersSet.delete(m)
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
    console.log({
      modifiers,
      modifiersArray,
      mediaQueriesArray,
      relationalModifiersArray,
      className: finalClassName,
    })
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

const extractGradientInstruction = (gradientInstructions: string[]) => {
  const instructionsSet: Set<GenericObject> = new Set()
  const linearGradientDirections: { [key: string]: string } = {
    t: "to top,",
    tr: "to top right,",
    r: "to right,",
    br: "to bottom right,",
    b: "to bottom,",
    bl: "to bottom left,",
    l: "to left,",
    tl: "to top left,",
  }

  for (const gradientInstruction of gradientInstructions) {
    const classNameObj = {}
    const { modifiersArray, className: demodifiedInstruction } =
      separateTwModifiers(gradientInstruction)
    const gradientType =
      findSubstring({
        string: demodifiedInstruction,
        substrings: ["linear", "conic", "radial"],
      }) || "linear"
    let direction: string | undefined = undefined
    const utilityKey = "background-image"
    const namespace = `--gradient-stops`

    if (demodifiedInstruction?.includes("deg")) {
      direction = demodifiedInstruction
        .split("-")
        ?.find((substring) => substring.includes("deg"))
        ?.replace(/[\[\]{}]/g, "")
    }
    if (demodifiedInstruction && !direction && gradientType === "linear") {
      const splitInstruction = demodifiedInstruction?.split("-")
      const twDirection = splitInstruction[splitInstruction.length - 1]
      direction = linearGradientDirections?.[twDirection]
    }
    const rootCSS = `${gradientType}-gradient(${direction} var(${namespace}))`
    let modifierCSSKeysArray: string[] = []

    modifiersArray.forEach((modifier) => {
      let modifierKey = tailwindToCssModifierObject?.[modifier]
      if (typeof modifierKey === "string") {
        modifierCSSKeysArray.push(modifierKey)
      }
      if (typeof modifierKey === "function") {
        const className = demodifiedInstruction?.split("bg-")[1]
        let resolvedModifierFn = modifierKey({ selector: className })
        modifierCSSKeysArray.push(resolvedModifierFn)
      }
    })
    ensureNestedObject({
      parent: classNameObj,
      keys: [...modifierCSSKeysArray, utilityKey],
      value: rootCSS,
    })

    instructionsSet.add(classNameObj)
  }
  return instructionsSet
}

const extractGradientModifiers = ({
  gradientModifiers,
  activeTheme,
}: {
  gradientModifiers: string[]
  activeTheme: MakUiVerboseTheme
}) => {
  const gradientModifierOptions = ["bg-gradient", "from-", "to-", "via-"]

  const gradientModifiersSet = new Set(gradientModifiers)

  const fromColorModifiers = gradientModifiers.filter((modifier) => {
    return modifier.includes("from-") && !modifier.includes("%")
  })

  const orderedModifierArray = [...gradientModifiersSet, ...fromColorModifiers]

  let rootCSSObj = {}
  const parsedModifierSet = new Set()
  const colorNamespaceSet: Set<string> = new Set()
  for (const twGradientModifier of orderedModifierArray) {
    let { className, modifiersArray } = separateTwModifiers(twGradientModifier)
    const classNameObj = {} as GenericObject
    let gradientModifier =
      findSubstring({
        string: className,
        substrings: gradientModifierOptions,
      }) || ""
    const demodifiedClassName = className?.split(gradientModifier)[1]
    className = `bg-${demodifiedClassName}`
    gradientModifier = gradientModifier.split("-")[0]
    let { color } = extractMakVars({ className, activeTheme })
    let position: string | undefined = demodifiedClassName?.includes("%")
      ? demodifiedClassName
      : undefined
    position = position?.replace(/[\[\]]/g, "")
    const namespace = `--gradient-${gradientModifier}${
      position ? "-position" : ""
    }`
    const originalModifier = `${gradientModifier}-${demodifiedClassName}`
    let namespaceValue: string | GenericObject = position
      ? position
      : `${color} var(--gradient-${gradientModifier}-position, ${
          gradientModifier === "from"
            ? "0%"
            : gradientModifier === "to"
            ? "100%"
            : ""
        })`
    if (!position) colorNamespaceSet.add(gradientModifier)

    const rootCSS = { [namespace]: namespaceValue }
    if (!position) {
      rootCSSObj = {
        ...rootCSSObj,
        ...rootCSS,
      }
    }
    let modifierCSSKeysArray: string[] = []

    modifiersArray.forEach((modifier) => {
      let modifierKey = tailwindToCssModifierObject?.[modifier]
      if (typeof modifierKey === "string") {
        modifierCSSKeysArray.push(modifierKey)
      }
      if (typeof modifierKey === "function") {
        const escapedOriginalModifier = originalModifier.replace(
          /([:\|\[\]{}()+>~!@#$%^&*=/"'`;,\\])/g,
          "\\$&"
        )
        const resolvedModifierFn = modifierKey({
          selector: escapedOriginalModifier,
        })
        modifierCSSKeysArray.push(resolvedModifierFn)
      }
    })

    const escapedClassName = `&.${twGradientModifier.replace(
      /([:\|\[\]{}()+>~!@#$%^&*=/"'`;,\\])/g,
      "\\$&"
    )}`

    if (fromColorModifiers.includes(twGradientModifier)) {
      const gradientStops = `var(--gradient-from),${
        colorNamespaceSet.has("via") ? "var(--gradient-via)," : ""
      } var(--gradient-to)`
      if (!Object.keys(rootCSSObj).includes("--gradient-to")) {
        const gradientTo = {
          ["--gradient-to"]: "rgba(0,0,0,0) var(--gradient-to-position, 100%)",
        }
        rootCSSObj = {
          ...rootCSSObj,
          ...gradientTo,
        }
      }

      const fromNameSpace = {
        "--gradient-stops": gradientStops,
        ...rootCSSObj,
      }

      ensureNestedObject({
        parent: classNameObj,
        keys: modifiersArray.length
          ? [...modifierCSSKeysArray]
          : [escapedClassName],
        value: fromNameSpace,
      })

      parsedModifierSet.add(classNameObj)

      continue
    }
    if (modifiersArray.length) {
      ensureNestedObject({
        parent: classNameObj,
        keys: [...modifierCSSKeysArray, namespace],
        value: namespaceValue,
      })
    } else {
      ensureNestedObject({
        parent: classNameObj,
        keys: [...modifierCSSKeysArray, escapedClassName, namespace],
        value: namespaceValue,
      })
    }

    parsedModifierSet.add(classNameObj)
  }
  return parsedModifierSet
}

const constructCSSClassNameObject = ({
  makClassName,
  activeTheme,
}: {
  makClassName: string
  activeTheme: MakUiVerboseTheme
}) => {
  let {
    className,
    modifiersArray,
    mediaQueriesArray,
    relationalModifiersArray,
  } = separateTwModifiers(makClassName)
  let { paletteVariant, color } = extractMakVars({ className, activeTheme })

  console.log({
    makClassName,
    modifiersArray,
    mediaQueriesArray,
    paletteVariant,
    color,
    relationalModifiersArray,
  })

  const keyMap: { [key: string]: string } = {
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
    console.log({ mq })
    mediaQueryKeys.push(mediaQueries[mq as string])
  })

  const cssKey = keyMap?.[paletteVariant] || "backgroundColor"

  const classNameObject = {}

  ensureNestedObject({
    parent: classNameObject,
    keys: [...mediaQueryKeys, classNameString, cssKey],
    value: color,
  })
  console.log(mediaQueryKeys)

  console.log(JSON.stringify(classNameObject, null, 2))
}

export const parseMakClassNames = ({
  makClassName,
  activeTheme,
  currentThemeMode,
}: {
  makClassName?: string
  activeTheme: MakUiVerboseTheme
  currentThemeMode: MakUiThemeKey
}) => {
  makClassName = makClassName?.replace(/\s+/g, " ").trim()
  if (!makClassName || makClassName === "") return {}

  let makClassNamesArray = makClassName?.split(" ") || []
  const makClassNamesSet = new Set(makClassNamesArray)
  const styleMap = new Map<string, string | GenericObject>()
  const modifierSet = new Set<GenericObject | string>()
  const unresolvedClasses: string[] = []

  const gradientModifierOptions = ["bg-gradient", "from-", "to-", "via-"]

  if (makClassNamesArray.length > 0) {
    const gradientInstructions: string[] = makClassNamesArray.filter((cn) =>
      cn.includes("bg-gradient")
    )
    gradientInstructions.forEach((i) => makClassNamesSet.delete(i))

    const parsedGradientInstructions =
      extractGradientInstruction(gradientInstructions)

    Array.from(parsedGradientInstructions).forEach((instruction) =>
      modifierSet.add(instruction)
    )

    const gradientModifiers = makClassNamesArray.filter((cn) => {
      return (
        !gradientInstructions.includes(cn) &&
        findSubstring({ string: cn, substrings: gradientModifierOptions })
      )
    })
    gradientModifiers.forEach((m) => makClassNamesSet.delete(m))

    const parsedGradientModifiers = extractGradientModifiers({
      gradientModifiers,
      activeTheme,
    })

    Array.from(parsedGradientModifiers).forEach((parsedModifier) =>
      modifierSet.add(parsedModifier as string)
    )

    for (const makClassName of Array.from(makClassNamesSet)) {
      constructCSSClassNameObject({ makClassName, activeTheme })
      // let { className, modifiersArray, mediaQueriesArray } =
      //   separateTwModifiers(makClassName)
      // const classNameObj = {} as GenericObject
      // let key: string = "backgroundColor"
      // let { paletteVariant, color } = extractMakVars({
      //   className,
      //   activeTheme,
      // })
      // if (modifiersArray.length) {
      //   let modifierCSSKeysArray: string[] = []
      //   const utilityKey = keyMap[paletteVariant]
      //   const rootCSS = { [utilityKey]: color }
      //   constructCSSClassNameObject({ makClassName, activeTheme })
      //   modifiersArray.forEach((modifier) => {
      //     let modifierKey = tailwindToCssModifierObject?.[modifier]
      //     if (typeof modifierKey === "string") {
      //       modifierCSSKeysArray.push(modifierKey)
      //     }
      //     if (typeof modifierKey === "function") {
      //       let modifierAndClassNameString = `${modifiersArray.join(
      //         ":"
      //       )}:${className}`
      //       const escapedClassName = modifierAndClassNameString
      //       const selector = `${escapedClassName}`
      //       const resolvedModifierFn = modifierKey({ selector: className })
      //       modifierCSSKeysArray.push(resolvedModifierFn)
      //     }
      //   })
      //   ensureNestedObject({
      //     parent: classNameObj,
      //     keys: modifierCSSKeysArray,
      //     value: rootCSS,
      //   })
      //   modifierSet.add(classNameObj)
      // } else if (paletteVariant && color) {
      //   key = keyMap[paletteVariant]
      //   styleMap.set(key, color)
      // } else {
      //   unresolvedClasses.push(makClassName)
      // }
    }
  }

  const modifierArray = Array.from(modifierSet)

  const mergedModifiers = deepMerge(...(modifierArray as GenericObject[]))

  const pseudoClassObject = mergedModifiers
  const baseClassObject = Object.fromEntries(styleMap)
  const unresolved = unresolvedClasses.length
    ? unresolvedClasses.join(" ")
    : undefined

  console.log(JSON.stringify(pseudoClassObject, null, 2))
  // return {
  //   pseudoClassObject,
  //   baseClassObject,
  //   unresolved,
  // }
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

const StyledGroup = styled.div()

import { mak } from "@mak"

const TestPage = () => {
  const { verboseTheme } = useMakUi()
  const makClassName = "hover:bg-primary-500"
  // "bg-gradient-to-r from-primary-500 from-60% light:from-20%"
  parseMakClassNames({
    makClassName,
    currentThemeMode: "dark",
    activeTheme: verboseTheme,
  })
  return (
    <StyledGroup className="p-4 group border-2 w-fit h-fit">
      <span className="flex size-10 bg-red-500 peer" />
      <StyledButton className={`flex w-80 h-20 ${makClassName}`}>
        button
      </StyledButton>
    </StyledGroup>
  )
}

export default TestPage
