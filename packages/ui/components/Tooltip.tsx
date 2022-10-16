import * as RadixTooltip from '@radix-ui/react-tooltip';

type Props = {
  children: React.ReactNode
  direction?: 'top' | 'right' | 'bottom' | 'left'
  text: string
}

export const Tooltip = ({ children, text, direction }: Props) => {
  return (
    <RadixTooltip.Provider delayDuration={800} skipDelayDuration={500}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger>
          {children}
        </RadixTooltip.Trigger>
        <RadixTooltip.Content side={direction}>
          <div className="tooltip">{text}</div>
        </RadixTooltip.Content>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
