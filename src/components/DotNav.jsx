import { Link, Events, scrollSpy } from 'react-scroll'
import { useEffect, useState } from 'react'

const sections = ['home', 'about', 'skills', 'projects', 'contact']

export default function DotNav() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    Events.scrollEvent.register('begin', () => {})
    Events.scrollEvent.register('end', () => {})
    scrollSpy.update()

    return () => {
      Events.scrollEvent.remove('begin')
      Events.scrollEvent.remove('end')
    }
  }, [])

  return (
    <div className='fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50 max-md:right-2'>
      {sections.map((id) => (
        <Link
          key={id}
          to={id}
          spy={true}
          smooth={true}
          duration={500}
          containerId="app-container"
          onSetActive={() => setActive(id)}
          className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
            active === id ? 'bg-[#0FDDCE] opacity-100 scale-110' : 'bg-[#0FDDCE] opacity-50'
          }`}
        />
      ))}
    </div>
  )
}