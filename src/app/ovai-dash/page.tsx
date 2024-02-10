"use client"
import { mak } from "@mak"
import { BiCog, BiSearch } from "react-icons/bi"
import ThemeButton from "../_components/ThemeButton"
import styled from "@emotion/styled"

const DarkButton = styled.button({
  '[data-theme="dark"] &': {
    "@media (min-width: 768px)": {
      "&:hover": { color: "rgba(239,68,68,0.5)" },
    },
  },
})

const OVAIDashPage = () => {
  return (
    <div className="p-8 gap-6 w-screen h-screen flex flex-col">
      <HeaderWithSearch />
      <Tabs />
    </div>
  )
}

const HeaderWithSearch = () => {
  return (
    <div className="flex gap-6">
      <span className="bg-purple-700 size-12 rounded-full flex-shrink-0" />
      <span className="relative flex gap-4 w-full items-center">
        <mak.span className="absolute ml-4" makClassName="text-primary-200">
          <BiSearch className="size-5" />
        </mak.span>
        <mak.input
          className="w-full rounded-md border-2 h-12 px-10 "
          makClassName="border-theme|secondary text-primary focus:border-primary"
          // makClassName="bg-theme|secondary border-theme|tertiary text-primary"
          placeholder="Search"
        />
        <mak.span className="flex-shrink-0" makClassName="text-primary-200">
          <BiCog className="size-6" />
        </mak.span>
        <span className="flex flex-shrink-0 bg-red-500 rounded-full size-8" />
      </span>
      <span className="absolute bottom-4 right-4">
        <ThemeButton />
      </span>
    </div>
  )
}

const Tabs = () => {
  const tabOptions = ["Overview", "Anomalies", "Buckets", "Objects", "Actions"]
  return (
    <div className="group flex gap-4">
      {tabOptions.map((tab, index) => (
        <mak.div
          key={index}
          className="flex flex-col gap-1 items-center justify-center group"
        >
          {/* <mak.button makClassName="dark:text-tertiary-300">{tab}</mak.button> */}
          <DarkButton className="dark:md:hover:text-danger-500/50">
            hi
          </DarkButton>
        </mak.div>
      ))}
    </div>
  )
}
export default OVAIDashPage
