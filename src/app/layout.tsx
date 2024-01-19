"use client"

import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import {
  MakUiComponentConfig,
  MakUiPaletteInput,
} from "./_hooks/useMakUi/types/default-types"
import { MakUiProvider } from "./_hooks/useMakUi/context/MakUiContext"
import { ThemeProvider } from "next-themes"
import { uiThemes } from "./_hooks/useMakUi/constants/defaults/default-constants"

const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// }
const palette: MakUiPaletteInput = {
  primary: "mak-teal-500 dark:mak-teal-100",
  secondary: "mak-teal-900 dark:mak-teal-100",
  secondaryBorder: "teal-400",
  tertiary: "zinc-800",
  tertiaryBorder: "zinc-600",
  success: "blue",
  successBorder: "blue-300",
  danger: "red",
  dangerBorder: "red-300",
  primaryText: "zinc-900 dark:zinc-50",
  secondaryText: "blue-50 dark:blue-700",
  warningText: "red-50",
  theme: {
    dark: "zinc-950",
    light: "zinc-50",
  },
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
        <ThemeProvider
          storageKey="mak-ui-theme"
          enableSystem={false}
          themes={uiThemes}
        >
          <MakUiProvider palette={palette} componentConfig={componentConfig}>
            {children}
          </MakUiProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
