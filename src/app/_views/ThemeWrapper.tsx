import { mak } from "../_hooks/useMakUi/elements/ts/mak"

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <mak.main
      themePrimary
      className="flex flex-col w-screen h-screen"
    >
      {children}
    </mak.main>
  )
}

export default ThemeWrapper
