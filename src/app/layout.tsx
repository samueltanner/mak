"use client"
import "./globals.css"
import { Inter } from "next/font/google"

import { MakUiProvider } from "./_hooks/useMakUi/context/MakUiContext"
import { MakUiFlexiblePaletteInput } from "./_hooks/useMakUi/types/ui-types"
import { MakUiComponentConfigInput } from "./_hooks/useMakUi/types/component-types"
import ThemeWrapper from "./_views/ThemeWrapper"

const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// }
const palette: MakUiFlexiblePaletteInput = {
  primary: "dark:mak-teal-500 light:mak-teal-400",
  secondary: "dark:sky-800 light:sky-500",
  tertiary: "dark:fuchsia-800 light:fuchsia-500",
  custom: "dark:zinc-600 light:zinc-500",
  success: "dark:emerald-600 light:emerald-500",
  error: "dark:red-600 light:red-500",
  danger: "dark:red-600 light:red-500",
  warning: "dark:yellow-600 light:yellow-500",
  info: "dark:blue-600 light:blue-500",
  text: "light:zinc-900 dark:zinc-50",
  theme: {
    primary: "light:zinc-50 dark:zinc-800",
    secondary: "light:zinc-200 dark:zinc-700",
    tertiary: "light:zinc-300 dark:zinc-600",
    custom: "light:mak-teal-500 dark:mak-teal-700",
    light: "light:white dark:zinc-50",
    dark: "light:zinc-900 dark:zinc-950",
  },
}

const componentConfig: MakUiComponentConfigInput = {
  buttonConfig: {
    className:
      "px-2.5 py-1 h-fit w-fit text-sm rounded-md fade-in-out font-semibold",
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
        <MakUiProvider
          paletteGenProps={{
            palette,
            enableDarkMode: true,
            blackHex: "#242424",
            whiteHex: "#e6e6e6",
          }}
          componentConfig={componentConfig}
          enableSystem
        >
          <ThemeWrapper>{children}</ThemeWrapper>
        </MakUiProvider>
      </body>
    </html>
  )
}
