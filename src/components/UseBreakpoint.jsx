import { useEffect, useState } from 'react'

function useBreakpoint(breakpoint = 1536) {
  const [is2XL, setIs2XL] = useState(false)

  useEffect(() => {
    const check = () => setIs2XL(window.innerWidth >= breakpoint)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [breakpoint])

  return is2XL
}

export default useBreakpoint
