import React, { useEffect, useState } from 'react'
import './Loader.css'

interface LoaderProps {
  active: boolean
}

const Loader: React.FC<LoaderProps> = ({ active }) => {
  const [visible, setVisible] = useState<boolean>(active)
  const mountedAt = React.useRef<number | null>(null)
  const EXIT_MS = 480
  const MIN_VISIBLE_MS = 800

  useEffect(() => {
    if (active) {
      mountedAt.current = performance.now()
      setVisible(true)
      return
    }

    const now = performance.now()
    const mounted = mountedAt.current ?? now
    const elapsed = Math.max(0, now - mounted)
    const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed)
    const total = remaining + EXIT_MS
    const t = setTimeout(() => setVisible(false), total)
    return () => clearTimeout(t)
  }, [active])

  if (!visible) return null

  return (
    <div className={`app-loader-overlay ${active ? 'is-active' : 'is-exiting'}`} aria-hidden={!active}>
      <div className="loader-inner">
        <div className="loader-logo-wrap">
          <img src="https://deeptech.doo.ee/assets/logo2.png" alt="Deep Tech" className="loader-logo" />
        </div>
        <div className="loader-ring" aria-hidden="true" />
      </div>
    </div>
  )
}

export default Loader
