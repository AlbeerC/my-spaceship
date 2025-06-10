import "./App.css";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import DotNav from "./components/DotNav";

function App() {

  return (
    <main
      className="h-screen w-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth outline-none"
      id="app-container"
    >
      <DotNav />
      <HomePage />
      <AboutPage />
      <SkillsPage />
      <ProjectsPage />
      <ContactPage />
    </main>
  );
}

export default App;
