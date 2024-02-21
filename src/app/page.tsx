"use client"
import ThemeButton from "./_components/ThemeButton"
import { mak } from "@mak"
import Button from "./_hooks/useMakUi/components/Button"
import Toggle from "./_hooks/useMakUi/components/Toggle"

export default function Home() {
  return (
    <mak.div
      className="flex flex-col relative h-screen w-screen"
      makClassName="bg-gradient-to-b from-theme|secondary dark:to-dark"
    >
      {/* <Header />
      <div className="size-full p-12 flex flex-col gap-12">
        <div className="w-full flex flex-col items-center gap-2">
          <mak.span makClassName="light:text-primary-400 dark:text-transparent bg-gradient-to-r from-primary from-[-50%] to-secondary-550 h-fit w-fit flex bg-clip-text">
            <p className="capitalize font-extrabold text-3xl ">
              A uI package built for developers
            </p>
          </mak.span>
          <mak.p
            className="text-lg font-extralight"
            makClassName="dark:text-primary-600 text-primary-400"
          >
            Complexity enabled. Simplicity by default
          </mak.p>
        </div>
        <DemoComponentContainer />

        <div className="absolute bottom-4 right-4">
          <ThemeButton />
        </div>
      </div> */}
    </mak.div>
  )
}

const Header = () => {
  return (
    <div className="top-0 left-0 w-full h-16">
      <mak.span
        className="flex text-3xl py-3 px-4 cursor-default"
        makClassName="dark:text-primary-600 text-primary-400"
      >
        <p className="font-extrabold">Mak</p>
        <p>UI</p>
      </mak.span>
      <mak.hr makClassName="border-light-500 border-[1px]" />
    </div>
  )
}

const DemoComponentContainer = () => {
  return (
    <div className="flex h-1/2 w-full items-center justify-center">
      <mak.div
        className="border-2 h-full w-full rounded-xl p-4 drop-shadow-hard-sm"
        makClassName="border-theme|tertiary bg-theme|primary"
      >
        <Button
          borderLight={400}
          textPrimary
          makClassName="hover:bg-text|primary-50"
        >
          Button
        </Button>
        {/* <Toggle /> */}
      </mak.div>
    </div>
  )
}
