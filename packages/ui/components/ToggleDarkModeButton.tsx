import { useEffect } from 'react'
import { useLocalStorageState } from 'ahooks'

export const ToggleDarkModeButton = () => {
  const [isDark, setDarkMode] = useLocalStorageState<boolean>('dark-mode', {
    defaultValue: false,
  })

  useEffect(() => {
    const bodyEl = document.body
    if(isDark) {
      bodyEl.classList.add('dark')
      bodyEl.classList.add('sl-theme-dark')
    } else {
      bodyEl.classList.remove('dark')
      bodyEl.classList.remove('sl-theme-dark')
    }
  }, [isDark])

  return (
    <button className="btn btn-icon" onClick={() => setDarkMode(!isDark)}>
      <span className={isDark ? 'i-tabler-moon' : 'i-tabler-sun'}></span>
    </button>
  )
}
