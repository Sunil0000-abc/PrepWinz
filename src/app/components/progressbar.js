'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import NProgress from 'nprogress'
import '../style/progress.css'

export default function ProgressBar() {
  const pathname = usePathname()

  useEffect(() => {
    NProgress.configure({ showSpinner: false })
    NProgress.start()

    const timer = setTimeout(() => {
      NProgress.done()
    }, 500) 

    return () => {
      clearTimeout(timer)
      NProgress.done()
    }
  }, [pathname])

  return null
}
