import "./App.css";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import DotNav from "./components/DotNav";
import LoadingPage from "./pages/LoadingPage";

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    setLoading(false)
  }
  return (
    <>
      {loading && (
        <LoadingPage
          onLoadingComplete={handleLoadingComplete}
          duration={2000}
        />
      )}

      <main
        className="h-screen w-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth outline-none"
        id="app-container"
      >
        <div className="max-w-[2300px] mx-auto h-full relative">
          <DotNav />
          <HomePage />
          <AboutPage />
          <SkillsPage />
          <ProjectsPage />
          <ContactPage />
        </div>
      </main>
    </>
  );
}

export default App;
