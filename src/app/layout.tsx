"use client"
import "./globals.css"
import { Inter } from "next/font/google"
import {
  MakUiComponentConfig,
  MakUiPaletteInput,
} from "./_hooks/useMakUi/types/default-types"
import { MakUiProvider } from "./_hooks/useMakUi/context/MakUiContext"

const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// }
const palette: MakUiPaletteInput = {
  primary: "mak-teal-400 hover:red dark:hover:mak-teal-800",
}

const componentConfig: MakUiComponentConfig = {
  buttonConfig: {
    className:
      "px-2 py-1.5 h-fit w-fit text-sm rounded-md font-semibold border border-[3px]",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MakUiProvider palette={palette} componentConfig={componentConfig}>
          {children}
        </MakUiProvider>
      </body>
    </html>
  )
}
