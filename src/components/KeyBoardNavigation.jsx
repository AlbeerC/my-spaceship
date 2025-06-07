import { useEffect } from 'react'
import { scroller } from 'react-scroll'

function KeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact']
      const currentSection = sections.findIndex(id => {
        const el = document.getElementById(id)
        return window.scrollY >= el.offsetTop - 10 && window.scrollY < el.offsetTop + el.offsetHeight - 10
      })

      if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
        scroller.scrollTo(sections[currentSection + 1], { smooth: true, duration: 500 })
      } else if (e.key === 'ArrowUp' && currentSection > 0) {
        scroller.scrollTo(sections[currentSection - 1], { smooth: true, duration: 500 })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return null
}

export default KeyboardNavigation
