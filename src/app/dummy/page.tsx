"use client"
import { useEffect, useState } from "react"
import { constructTailwindObject } from "../_hooks/useMakUi/functions/helpers"

export const ColorGenerator = () => {
  const [selectedColor, setSelectedColor] = useState<string>("#00a7bd")

  const [step, setStep] = useState<number>(100)
  const [hexPosition, setHexPosition] = useState<number>(500)
  const [blackHex, setBlackHex] = useState<string>("#000000")
  const [whiteHex, setWhiteHex] = useState<string>("#ffffff")
  const [includeBlackAndWhite, setIncludeBlackAndWhite] =
    useState<boolean>(true)
  const [includeNearAbsolutes, setIncludeNearAbsolutes] =
    useState<boolean>(true)

  const [generatedColors, setGeneratedColors] = useState<
    Record<number, string>
  >({})
  useEffect(() => {
    console.log({
      selectedColor,
      step,
      hexPosition,
      blackHex,
      whiteHex,
      includeBlackAndWhite,
      includeNearAbsolutes,
    })
    if (selectedColor) {
      const genColors = constructTailwindObject({
        hex: selectedColor,
        step,
        hexPosition,
        blackHex,
        whiteHex,
        includeBlackAndWhite,
        includeNearAbsolutes,
      })
      setGeneratedColors(genColors)
    }
  }, [
    selectedColor,
    step,
    hexPosition,
    blackHex,
    whiteHex,
    includeBlackAndWhite,
    includeNearAbsolutes,
  ])
  return (
    <div className="h-screen w-screen bg-zinc-800">
      <div className="flex flex-col *:flex *:gap-2 *:w-fit gap-4">
        <span>
          <h1>Color Generator</h1>
          <label>Select Middle Point Color</label>
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
          <label>Select Hex Position</label>
          <select
            onChange={(e) => setHexPosition(Number(e.target.value))}
            value={hexPosition}
          >
            {Array.from({ length: 1000 }, (_, i) => i)
              .filter((i: number) => i % step === 0 && i > 0)
              .map((i: number) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
          </select>
        </span>
        <span>
          <label>Select Step</label>
          <select
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
          >
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </span>
        <span>
          <label> Include Black and White</label>
          <input
            type="checkbox"
            checked={includeBlackAndWhite}
            onChange={() => setIncludeBlackAndWhite(!includeBlackAndWhite)}
          />
        </span>
        <span>
          <label> Include Near Absolutes</label>
          <input
            type="checkbox"
            checked={includeNearAbsolutes}
            onChange={() => setIncludeNearAbsolutes(!includeNearAbsolutes)}
          />
        </span>
        <span>
          <label>Black Hex</label>
          <input
            type="color"
            value={blackHex}
            onChange={(e) => setBlackHex(e.target.value)}
          />
          <input
            type="text"
            value={blackHex}
            onChange={(e) => setBlackHex(e.target.value)}
          />
        </span>
        <span>
          <label>White Hex</label>
          <input
            type="color"
            value={whiteHex}
            onChange={(e) => setWhiteHex(e.target.value)}
          />
          <input
            type="text"
            value={whiteHex}
            onChange={(e) => setWhiteHex(e.target.value)}
          />
        </span>
      </div>

      <div className="flex gap-2 w-full justify-around mt-4">
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
