import { createContext } from "react"

type Props = {
  greeting?: string
  name?: string
}

export const GreetingContext = createContext({message: ''})

export const Hello = ({greeting, name}: Props) => {
  return (
    <div className="font-mono text-xs">{greeting || 'Hi'}, {name || 'world'}!</div>
  )
}