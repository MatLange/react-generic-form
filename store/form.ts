import { create } from "zustand"

type FormStore = {
  title: string
  setTitle: (value: string) => void
  selectedDropdownElement: { id: number; name: string }
  setSelectedDropdownElement: ({
    id,
    name,
  }: {
    id: number
    name: string
  }) => void
  radioOption: string
  setRadioOption: (value: string) => void
  inputTextArea: string
  setInputTextArea: (value: string) => void
}

const useFormStore = create<FormStore>()((set) => ({
  title: "",
  setTitle: (value) => set({ title: value }),
  selectedDropdownElement: { id: 0, name: "Pick one!" },
  setSelectedDropdownElement: ({ id, name }) =>
    set({ selectedDropdownElement: { id, name } }),
  radioOption: "no",
  setRadioOption: (value) => set({ radioOption: value }),
  inputTextArea: "",
  setInputTextArea: (value) => set({ inputTextArea: value }),
}))

export default useFormStore
