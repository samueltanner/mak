"use client"
import { useEffect, useState } from "react"
import { constructTailwindObject } from "../_hooks/useMakUi/functions/helpers"

export const ColorGenerator = () => {
  const [selectedColor, setSelectedColor] = useState<string>("#00a7bd")
  const [step, setStep] = useState<number>(100)

  const [generatedColors, setGeneratedColors] = useState<
    Record<number, string>
  >({})
  useEffect(() => {
    if (selectedColor) {
      const genColors = constructTailwindObject({
        hex: selectedColor,
        step,
      })
      setGeneratedColors(genColors)
    }
  }, [selectedColor, step])
  return (
    <div className="h-screen w-screen bg-zinc-800">
      <h1>Color Generator</h1>
      <label>Select Middle Point</label>
      <input
        type="color"
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
      />
      <input
        type="text"
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
      />
      <label>Select Step</label>
      <select value={step} onChange={(e) => setStep(Number(e.target.value))}>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
      <div className="flex gap-2 w-full justify-around">
        {Object.entries(generatedColors).map(([number, color], index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 hover:scale-110 fade-in-out"
            onClick={() => setSelectedColor(color)}
          >
            <span
              className="size-12 rounded-md"
              style={{ backgroundColor: color }}
            />
            <span>{number}</span>
            <span>{color}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ColorGenerator
