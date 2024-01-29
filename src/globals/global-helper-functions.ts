export const isEmptyObject = (obj: GenericObject) =>
  isObject(obj) && Object.keys(obj).length === 0

export const isNestedObject = (obj: GenericObject) =>
  isObject(obj) && Object.values(obj).some(isObject)

export const isObject = (v: any): v is GenericObject =>
  v !== null &&
  typeof v === "object" &&
  !Array.isArray(v) &&
  typeof v !== "string"

export const deepMerge = (...objects: (GenericObject | undefined)[]) => {
  const result = {}

  const merge = (target: GenericObject, source: GenericObject) => {
    Object.keys(source).forEach((key) => {
      if (source[key] && typeof source[key] === "object") {
        target[key] = target[key] || {}
        merge(target[key], source[key])
      } else {
        target[key] = source[key]
      }
    })
  }

  for (const obj of objects) {
    if (!isObject(obj)) continue
    merge(result, obj)
  }

  return result
}

export const setLocalStorage = (key: string, value: any) => {
  if (typeof window === "undefined") return
  if (typeof value === "object") {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

export const getLocalStorage = (key: string): string | null | undefined => {
  if (typeof window === "undefined") return
  return window.localStorage.getItem(key)
}

export const removeLocalStorage = (key: string) => {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(key)
}

export const mergeWithFallback = (
  primary: Record<string, any>,
  ...fallbacks: Array<Record<string, any> | undefined>
): Record<string, any> => {
  let result: Record<string, any> = {}

  fallbacks.forEach((fallback) => {
    if (isObject(fallback) && !isEmptyObject(fallback))
      Object.keys(fallback).forEach((key) => {
        if (result[key] === undefined) {
          result[key] = fallback[key]
        }
      })
  })

  return { ...result, ...primary }
}

export const nearestMultiple = (
  num: number,
  multiple: number,
  roundDir: "up" | "down" | "nearest" = "nearest"
) => {
  const delta =
    roundDir === "up" ? multiple : roundDir === "down" ? -multiple : 0
  const remainder = num % multiple
  return remainder === 0 ? num + delta : num + multiple - remainder + delta
}

export const ensureNestedObject = <T>({
  parent,
  keys,
  value,
}: {
  parent: T
  keys?: (keyof T | string | number | undefined)[]
  value?: any
}) => {
  keys = keys ? keys.filter((k) => k) : []
  let current: any = parent

  if (!keys || keys.length === 0) return current

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]

    if (i === keys.length - 1 && value !== undefined) {
      current[key] = value
    } else {
      current[key] = current[key] || {}
    }
    current = current[key]
  }

  return current
}

export const allowFalsyFallback = <T>(value: T, fallback: T) => {
  return value ||
    value === 0 ||
    value === false ||
    value === null ||
    value === undefined
    ? value
    : fallback
}
