import { mak } from "../_hooks/useMakUi/elements/ts/mak"

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <mak.main themeTertiary className="flex flex-col">
      {children}
    </mak.main>
  )
}

export default ThemeWrapper
