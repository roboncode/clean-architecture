type Props = {
  className?: string,
  contentClass?: string,
  children?: React.ReactNode,
}
export const Container = ({className, contentClass, children}: Props) => {
  const containerStyles = `flex flex-col overflow-hidden ${className}`
  const contentStyles = `flex flex-col flex-grow h-0 overflow-auto ${contentClass}`

  return (
    <div className={containerStyles}>
      <div className={contentStyles}>
        {children}
      </div>
    </div>
  );
};
