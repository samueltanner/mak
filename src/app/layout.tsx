"use client"

import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { MakUiPaletteInput } from "./_hooks/useMakUi/types/default-types"
import { MakUiProvider } from "./_hooks/useMakUi/context/MakUiContext"

const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// }
const palette: MakUiPaletteInput = {
  primary: "mak-teal-500",
  secondary: "teal",
  secondaryBorder: "teal-400",
  tertiary: "zinc-800",
  tertiaryBorder: "zinc-600",
  success: "blue",
  successBorder: "blue-300",
  danger: "red",
  dangerBorder: "red-300",
  primaryText: "zinc-900",
  secondaryText: "zinc-50",
  theme: {
    dark: {
      primary: "zinc-950",
    },
    light: {
      primary: "zinc-50",
    },
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
        <MakUiProvider palette={palette}>{children}</MakUiProvider>
      </body>
    </html>
  )
}
