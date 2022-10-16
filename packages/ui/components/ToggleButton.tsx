import { ReactElement, useCallback, useEffect, useState } from "react"

type Props = {
  checked?: boolean
  className?: string
  trueElement: ReactElement
  falseElement: ReactElement
  onChange?: (value: boolean) => void
}

export const ToggleButton = ({ checked, className, trueElement, falseElement, onChange}: Props) => {
  const [value, setValue] = useState(checked)

  const toggle = () => {
    setValue(!value)
    if(onChange) {
      onChange(!value)
    }
  }

  return (
    <button type="button" className={className} onClick={toggle}>
      {value ? trueElement : falseElement}
    </button>
  );
}