import { mak } from "../_hooks/useMakUi/elements/ts/mak"

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      // themePrimary
      // textPrimary
      // className="flex flex-col w-screen h-screen"
    >
      {children}
    </main>
  )
}

export default ThemeWrapper
