import './App.css'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import SkillsPage from './pages/SkillsPage'
import ProjectsPage from './pages/Projects'
import ContactPage from './pages/ContactPage'
import DotNav from './components/DotNav'
import KeyBoardNavigation from './components/KeyBoardNavigation'

function App() {

  return (
    <main className='h-screen w-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth' id='app-container'>
      <KeyBoardNavigation />
      <DotNav />
      <HomePage />
      <AboutPage />
      <SkillsPage />
      <ProjectsPage />
      <ContactPage />
    </main>
  )
}

export default App
