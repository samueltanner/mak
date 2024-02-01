import {
  MakUiComponentConfigInput,
  MakUiRootComponentConfigInput,
} from "../types/component-types"
import {
  HtmlElementKey,
  MakUiCustomInteractionStateKey,
  MakUiDefaultColors,
  MakUiDefaultPalette,
  MakUiDefaultStateColors,
  MakUiInteractionStateKey,
  MakUiPaletteKey,
  MakUiStateKey,
  MakUiStateShades,
  MakUiThemeKey,
  MakUiThemeShades,
  MakUiThemeVariantKey,
  MakUiVariantKey,
  Shade,
  TailwindUtilityClass,
} from "../types/ui-types"

export const tailwindVariants: TailwindUtilityClass[] = [
  "bg",
  "text",
  "border",
  "ring",
  "outline",
  "ring-offset",
  "fill",
  "stroke",
  "divide",
  "placeholder",
  "decoration",
  "accent",
  "caret",
  "shadow",
]

export const htmlElements: HtmlElementKey[] = [
  "button",
  "input",
  "text",
  "form",
  "dialog",
  "select",
  "textarea",
]

export const tailwindVariantsSet: Set<TailwindUtilityClass> = new Set(
  tailwindVariants
)

export const makUiThemes: MakUiThemeKey[] = ["dark", "light", "custom"]

export const makUiThemesSet: Set<MakUiThemeKey> = new Set(makUiThemes)

export const makUiPalettes: MakUiPaletteKey[] = [
  "color",
  "text",
  "border",
  "theme",
]

export const makUiPalettesSet: Set<MakUiPaletteKey> = new Set(makUiPalettes)

export const makUiThemeVariants: MakUiThemeVariantKey[] = [
  "primary",
  "secondary",
  "tertiary",
  "custom",
  "light",
  "dark",
  "white",
  "black",
]

export const makUiThemeVariantsSet: Set<MakUiThemeVariantKey> = new Set(
  makUiThemeVariants
)

export const makUiVariants: MakUiVariantKey[] = [
  "primary",
  "secondary",
  "tertiary",
  "custom",
  "success",
  "error",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
]

export const makUiVariantsSet: Set<MakUiVariantKey> = new Set(makUiVariants)

export const makUiInteractionStates: MakUiInteractionStateKey[] = [
  "active",
  "autofill",
  "checked",
  "closed",
  "default",
  "disabled",
  "empty",
  "enabled",
  "focus",
  "focus-visible",
  "focus-within",
  "hover",
  "in-range",
  "indeterminate",
  "invalid",
  "open",
  "out-of-range",
  "placeholder-shown",
  "read-only",
  "required",
  "selected",
  "selection",
  "target",
  "valid",
  "visited",
]

export const makUiCustomInteractionStates: MakUiCustomInteractionStateKey[] = [
  "base",
  "click",
]

export const makUiStates: MakUiStateKey[] = [
  ...makUiCustomInteractionStates,
  ...makUiInteractionStates,
]

export const makUiShades = [
  0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750,
  800, 850, 900, 950, 1000,
] as Shade[]

export const makUiShadesSet: Set<Shade> = new Set(makUiShades)

export const makUiStatesSet: Set<MakUiStateKey> = new Set(makUiStates)

export const makUiDefaultColors: MakUiDefaultColors = {
  primary: "mak-teal",
  secondary: "green",
  tertiary: "yellow",
  success: "green",
  error: "red",
  danger: "red",
  warning: "yellow",
  info: "blue",
  custom: "zinc",
  light: "white",
  dark: "black",
  white: "white",
  black: "black",
}

export const makUiDefaultPalette: MakUiDefaultPalette = {
  light: {
    color: makUiDefaultColors,
    text: "zinc-50",
    border: "mak-teal-300",
    theme: {
      primary: "zinc-50",
      secondary: "zinc-100",
      tertiary: "zinc-200",
      custom: "zinc-950",
      light: "white",
      white: "white",
      dark: "black",
      black: "black",
    },
  },
  dark: {
    color: makUiDefaultColors,
    text: "zinc-950",
    border: "mak-teal-600",
    theme: {
      primary: "zinc-950",
      secondary: "zinc-900",
      tertiary: "zinc-800",
      custom: "zinc-700",
      light: "white",
      dark: "black",
      white: "white",
      black: "black",
    },
  },
  custom: {
    color: makUiDefaultColors,
    text: "zinc-900",
    border: "zinc-900",
    theme: {
      primary: "zinc-50",
      secondary: "zinc-100",
      tertiary: "zinc-200",
      custom: "zinc-950",
      light: "white",
      dark: "black",
      white: "white",
      black: "black",
    },
  },
}

export const makUiDefaultThemeShades: MakUiThemeShades = {
  light: {
    primary: 50,
    secondary: 100,
    tertiary: 200,
    custom: 950,
    light: 50,
    dark: 950,
    white: 0,
    black: 1000,
  },
  dark: {
    primary: 950,
    secondary: 900,
    tertiary: 800,
    custom: 700,
    light: 50,
    dark: 950,
    white: 0,
    black: 1000,
  },
  custom: {
    primary: 50,
    secondary: 100,
    tertiary: 200,
    custom: 950,
    light: 50,
    dark: 950,
    white: 0,
    black: 1000,
  },
}

export const makUiDefaultStateShades: MakUiStateShades = {
  base: 500,
  hover: 400,
  active: 600,
  autofill: 500,
  click: 400,
  checked: 600,
  closed: 500,
  default: 400,
  disabled: 300,
  empty: 500,
  enabled: 500,
  focus: 500,
  "focus-visible": 500,
  "focus-within": 500,
  "in-range": 500,
  indeterminate: 500,
  invalid: 500,
  open: 500,
  "out-of-range": 500,
  "placeholder-shown": 500,
  "read-only": 500,
  required: 500,
  selected: 500,
  selection: 500,
  target: 500,
  valid: 500,
  visited: 500,
}

export const makUiDefaultStates: MakUiDefaultStateColors = {
  base: "zinc-500",
  click: "zinc-600",
  active: "zinc-600",
  autofill: "zinc-500",
  checked: "zinc-700",
  closed: "zinc-500",
  default: "zinc-500",
  disabled: "zinc-500",
  empty: "zinc-500",
  enabled: "zinc-500",
  focus: "zinc-500",
  "focus-visible": "zinc-500",
  "focus-within": "zinc-500",
  hover: "zinc-300",
  "in-range": "zinc-500",
  indeterminate: "zinc-500",
  invalid: "zinc-500",
  open: "zinc-500",
  "out-of-range": "zinc-500",
  "placeholder-shown": "zinc-500",
  "read-only": "zinc-500",
  required: "zinc-500",
  selected: "zinc-500",
  selection: "zinc-500",
  target: "zinc-500",
  valid: "zinc-500",
  visited: "zinc-500",
}

export const defaultButtonConfig: MakUiRootComponentConfigInput = {
  className:
    "h-fit w-fit px-2 py-1 text-sm rounded-md font-semibold fade-in-out",
  enabledStates: ["hover", "focus", "disabled"],
}

export const defaultInputConfig: MakUiRootComponentConfigInput = {
  className: "h-fit w-fit px-2 py-1 text-sm rounded-md font-semibold",
  enabledStates: ["hover", "focus", "disabled"],
}

export const defaultComponentConfig: MakUiComponentConfigInput = {
  buttonConfig: defaultButtonConfig,
  inputConfig: defaultInputConfig,
}

export const tailwindToCssModifierObject: {
  [key: string]:
    | string
    | ((selector: string) => string)
    | ((selector: string, altSelector: string) => string)
    | ((n: string) => string)
} = {
  //styles applied directly to element
  //tw eg. hover:bg-red-500
  hover: "&:hover",
  focus: "&:focus",
  "focus-within": "&:focus-within",
  "focus-visible": "&:focus-visible",
  active: "&:active",
  visited: "&:visited",
  target: "&:target",
  has: (selector: string) => `:has(:${selector})`,
  "has-not": (selector: string) => `:not(has:(:${selector}))`,
  is: (selector: string) => `:is(${selector})`,
  "is-not": (selector: string) => `:not(:is(${selector}))`,
  "is-has": (selector: string, altSelector: string) =>
    `:is(${selector}):has(~ ${altSelector})`,
  "is-has-not": (selector: string, altSelector: string) =>
    `:is(${selector}):not(:has(~ ${altSelector}))`,
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

  //applies styles to parent if child has a certain state or element
  "parent-has": (selector: string) => `:has(${selector})`,
  "parent-has-not": (selector: string) => `:not(:has(${selector}))`,
  "parent-is": (selector: string) => `:is(${selector})`,
  "parent-is-not": (selector: string) => `:not(:is(${selector}))`,
  "parent-is-has": (selector: string, altSelector: string) =>
    `:is(${selector}):has(${altSelector})`,
  "parent-is-has-not": (selector: string, altSelector: string) =>
    `:is(${selector}):not(:has(${altSelector}))`,

  //styles applied to child of a group
  //tw eg. group-hover:bg-red-500
  "group-hover": ".group &:hover",
  "group-focus": ".group &:focus",
  "group-focus-within": ".group &:focus-within",
  "group-focus-visible": ".group &:focus-visible",
  "group-active": ".group &:active",
  "group-visited": ".group &:visited",
  "group-target": ".group &:target",
  "group-has": (selector: string) => `.group &:has(${selector})`,
  "group-has-not": (selector: string) => `.group &:not(has:(${selector}))`,
  "group-is": (selector: string) => `.group &:is(${selector})`,
  "group-is-not": (selector: string) => `.group &:not(:is(${selector}))`,
  "group-is-has": (selector: string, altSelector: string) =>
    `.group &:is(${selector}):has(~ ${altSelector})`,
  "group-is-has-not": (selector: string, altSelector: string) =>
    `.group &:is(${selector}):not(:has(~ ${altSelector}))`,
  "group-first": ".group &:first-child",
  "group-last": ".group &:last-child",
  "group-only": ".group &:only-child",
  "group-odd": ".group &:nth-child(odd)",
  "group-even": ".group &:nth-child(even)",
  "group-first-of-type": ".group &:first-of-type",
  "group-last-of-type": ".group &:last-of-type",
  "group-only-of-type": ".group &:only-of-type",
  "group-empty": ".group &:empty",
  "group-disabled": ".group &:disabled",
  "group-enabled": ".group &:enabled",
  "group-checked": ".group &:checked",
  "group-indeterminate": ".group &:indeterminate",
  "group-default": ".group &:default",
  "group-required": ".group &:required",
  "group-valid": ".group &:valid",
  "group-invalid": ".group &:invalid",
  "group-in-range": ".group &:in-range",
  "group-out-of-range": ".group &:out-of-range",
  "group-placeholder-shown": ".group &:placeholder-shown",
  "group-autofill": ".group &:autofill",
  "group-read-only": ".group &:read-only",
  "group-before": ".group &::before",
  "group-after": ".group &::after",
  "group-first-letter": ".group &::first-letter",
  "group-first-line": ".group &::first-line",
  "group-marker": ".group &::marker",
  "group-selection": ".group &::selection",
  "group-file": ".group &::file-selector-button",
  "group-backdrop": ".group &::backdrop",
  "group-placeholder": ".group &::placeholder",
  "group-fullscreen": ".group :fullscreen",
  "group-last-child": ".group :last-child",
  "group-link": ".group :link",
  "group-not-checked": ".group :not(:checked)",
  "group-only-child": ".group :only-child",
  "group-optional": ".group :optional",
  "group-read-write": ".group :read-write",
  "group-first-child": ".group :first-child",

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
  "*-has": (selector: string) => `& > *:has(~ ${selector})`,
  "*-has-not": (selector: string) => `& > *:not(:has(~ ${selector}))`,
  "*-is": (selector: string) => `& > *:is(${selector})`,
  "*-is-not": (selector: string) => `& > *:not(:is(${selector}))`,
  "*-is-has": (selector: string, altSelector: string) =>
    `& > *:is(${selector}):has(~ ${altSelector})`,
  "*-is-has-not": (selector: string, altSelector: string) =>
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
  "*-nth-child": (n: string) => `& > *:nth-child(${n})`,
  "*-nth-last-child": (n: string) => `& > *:nth-last-child(${n})`,
  "*-nth-of-type": (n: string) => `& > *:nth-of-type(${n})`,
  "*-nth-last-of-type": (n: string) => `& > *:nth-last-of-type(${n})`,

  //styles applied to peer elements that come after the affected peer
  //tw eg. 1st element input is checked, 2nd element peer-checked:bg-red-500
  "peer-hover": ".peer :hover",
  "peer-focus": ".peer :focus",
  "peer-focus-within": ".peer :focus-within",
  "peer-focus-visible": ".peer :focus-visible",
  "peer-active": ".peer :active",
  "peer-visited": ".peer :visited",
  "peer-target": ".peer :target",
  "peer-has": (selector: string) => `&:has(~ ${selector})`,
  "peer-has-not": (selector: string) => `:not(:has(~ ${selector}))`,
  "peer-is": (selector: string) => `:is(${selector})`,
  "peer-is-not": (selector: string) => `:not(:is(${selector}))`,
  "peer-is-has": (selector: string, altSelector: string) =>
    `:is(${selector}):has(~ ${altSelector})`,
  "peer-is-has-not": (selector: string, altSelector: string) =>
    `:is(${selector}):not(:has(~ ${altSelector}))`,
  "peer-first": ".peer :first-child",
  "peer-last": ".peer :last-child",
  "peer-only": ".peer :only-child",
  "peer-odd": ".peer :nth-child(odd)",
  "peer-even": ".peer :nth-child(even)",
  "peer-first-of-type": ".peer :first-of-type",
  "peer-last-of-type": ".peer :last-of-type",
  "peer-only-of-type": ".peer :only-of-type",
  "peer-empty": ".peer :empty",
  "peer-disabled": ".peer :disabled",
  "peer-enabled": ".peer :enabled",
  "peer-checked": ".peer :checked",
  "peer-indeterminate": ".peer :indeterminate",
  "peer-default": ".peer :default",
  "peer-required": ".peer :required",
  "peer-valid": ".peer :valid",
  "peer-invalid": ".peer :invalid",
  "peer-in-range": ".peer :in-range",
  "peer-out-of-range": ".peer :out-of-range",
  "peer-placeholder-shown": ".peer :placeholder-shown",
  "peer-autofill": ".peer :autofill",
  "peer-read-only": ".peer :read-only",
  "peer-fullscreen": ".peer fullscreen",
  "peer-last-child": ".peer last-child",
  "peer-link": ".peer link",
  "peer-not-checked": ".peer not(:checked)",
  "peer-only-child": ".peer only-child",
  "peer-optional": ".peer optional",
  "peer-read-write": ".peer read-write",
  "peer-first-child": ".peer first-child",
}
