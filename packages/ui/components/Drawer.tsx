import { screenSmall } from "../consts"
import { useMediaQuery } from "../hooks/useMediaQuery"

type Props = {
  className?: string
  children?: React.ReactNode
}

export const Drawer = ({className, children}: Props) => {
  const isSmallScreen = useMediaQuery(screenSmall)
  const getDrawerClassName = () => {
    return "flex flex-col items-center pb-2 pt-0 gap-4"
  }

  return (
    <div className={className}>
      {isSmallScreen}
      {children}
    </div>
  )
}
