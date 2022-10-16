import { useEffect, useRef, useState } from 'react'

import autoAnimate from '@formkit/auto-animate'

const Anime = () => {
  const [show, setShow] = useState(false)
  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  const reveal = () => setShow(!show)

  return (
    <div className="flex w-full">
      <div className="bg-red p-4 rounded">
        <div ref={parent}>
          <strong className="dropdown-label cursor-pointer" onClick={reveal}>
            Click me to open!
          </strong>
          {show && <p className="dropdown-content">Lorum ipsum...</p>}
        </div>
      </div>
    </div>
  )
}

export default Anime