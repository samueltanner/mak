import { BiCheck, BiLoaderAlt, BiSolidErrorCircle } from "react-icons/bi"

type LoaderPropsType = {
  loading?: boolean
  success?: boolean
  error?: boolean
  children?: React.ReactNode
  inline?: boolean
}

export const InLineLoader = ({ loading, success, error }: LoaderPropsType) => {
  return (
    <span className="flex w-fit items-center justify-center">
      {loading && <BiLoaderAlt className="h-4 w-4 animate-spin" />}
      {error && <BiSolidErrorCircle className="h-4 w-4" />}
      {success && <BiCheck className="h-4 w-4" />}
    </span>
  )
}
