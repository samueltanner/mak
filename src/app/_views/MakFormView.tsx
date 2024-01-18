import useMakForm from "../_hooks/useMakForm/useMakForm"
import { useMakUi } from "../_hooks/useMakUi/context/MakUiContext"

const formConfig = {
  first_name: {
    type: "text",
    label: "First Name",
    placeholder: "Enter first name",
    required: true,
  },
  last_name: {
    type: "text",
    label: "First Name",
    placeholder: "Enter first name",
    required: true,
  },
  pick: {
    type: "select",
    label: "Pick",
    placeholder: "Select pick",
    required: true,
    options: [
      { label: "one", value: 1 },
      { label: "two", value: 2 },
      { label: "three", value: 3 },
    ],
  },
}

const MakFormView = () => {
  const { activePalette } = useMakUi()

  const {
    form,
    components: { FirstName, Pick },
  } = useMakForm({ formConfig })
  return (
    <div>
      <FirstName
        className={`p-2 text-${activePalette.text.primary.default.base}`}
      />
      <Pick />
    </div>
  )
}

export default MakFormView
