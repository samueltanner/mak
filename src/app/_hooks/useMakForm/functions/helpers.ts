import { isEmptyObject } from "@/globals/global-helper-functions"
import { MakForm, MakFormComponentOutputType } from "../types/form-types"
import { getComponentName } from "./componentFactory"

const isObject = (v: any): v is GenericObject =>
  v !== null && typeof v === "object" && !Array.isArray(v)

function getDifference(
  x: GenericObject | any[],
  y: GenericObject | any[] = x,
  isRoot: boolean = true
): any {
  if (Array.isArray(x) && Array.isArray(y)) {
    // Handle array comparison
    const temp: any[] = []
    let allEqual = true
    for (let i = 0; i < Math.max(x.length, y.length); i++) {
      const diff = getDifference(x[i], y[i], false)
      if (diff !== true) {
        allEqual = false
        temp[i] = diff
      }
    }
    return isRoot
      ? allEqual
        ? { isEqual: true }
        : { isEqual: false, object: temp }
      : allEqual
      ? true
      : temp
  } else if (isObject(x) && isObject(y)) {
    // Handle object comparison
    const temp: GenericObject = {}
    let allEqual = true
    for (const key of new Set([...Object.keys(x), ...Object.keys(y)])) {
      if (typeof key === "string") {
        const val1 = (x as GenericObject)[key]
        const val2 = (y as GenericObject)[key]
        if (key in x && key in y) {
          const diff = getDifference(val1, val2, false)
          if (diff !== true) {
            allEqual = false
            temp[key] = diff
          }
        } else {
          allEqual = false
          temp[key] = false
        }
      }
    }
    return isRoot
      ? allEqual
        ? { isEqual: true }
        : { isEqual: false, object: temp }
      : allEqual
      ? true
      : temp
  } else {
    // Direct value comparison
    return x === y
  }
}

const isEqual = (x: any, y: any): boolean => {
  const diffResult = getDifference(x, y, true)

  if (typeof diffResult === "boolean") {
    // Directly return the boolean result
    return diffResult
  } else if (diffResult && typeof diffResult === "object") {
    // Return the isEqual property if it exists
    return diffResult.isEqual
  } else {
    // Default case if the result is unexpected
    return false
  }
}

const mergeWithFallback = (primary: any, fallback: any) => {
  const result = { ...fallback, ...primary }
  Object.keys(fallback).forEach((key) => {
    if (primary[key] === undefined) {
      result[key] = fallback[key]
    }
  })
  return result
}

export const ensureSingleElementType = ({
  useMakElements = true,
  useHTMLComponents = false,
  useMakComponents = false,
}: {
  useMakElements?: boolean
  useHTMLComponents?: boolean
  useMakComponents?: boolean
}): MakFormComponentOutputType => {
  let elementTypeObject: { [Key in MakFormComponentOutputType]: boolean } = {
    makElements: useMakElements,
    htmlElements: useHTMLComponents,
    makComponents: useMakComponents,
  }
  if (useMakElements) {
    elementTypeObject["htmlElements"] = false
    elementTypeObject["makComponents"] = false
  } else if (useHTMLComponents) {
    elementTypeObject["makElements"] = false
  }

  if (!useMakComponents && !useHTMLComponents && !useMakElements) {
    elementTypeObject["makElements"] = true
  }

  return Object.keys(elementTypeObject).find(
    (key) => elementTypeObject[key as MakFormComponentOutputType]
  ) as MakFormComponentOutputType
}

export { isEqual, isObject, mergeWithFallback, getDifference }
