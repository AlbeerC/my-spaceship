import {
  Github,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import SnapSection from "../components/SnapSection";
import CommunicationPanel from "../components/CommunicationPanel";
import contactbg from "../assets/contact-bg.png";

export default function ContactPage() {

  const stations = [
    {
      id: "linkedin",
      icon: Linkedin,
      name: "LinkedIn Outpost",
      frequency: "192.168.1.1",
      status: "ONLINE",
      color: "text-blue-400",
      position: { x: 30, y: 30 }, // Cuadrante superior izquierdo
      url: "https://www.linkedin.com/in/alberto-caminos/",
    },
    {
      id: "twitter",
      icon: Twitter,
      name: "Twitter Satellite",
      frequency: "10.0.0.1",
      status: "ONLINE",
      color: "text-cyan-400",
      position: { x: 70, y: 30 }, // Cuadrante superior derecho
      url: "https://x.com/AlberCaminos03",
    },
    {
      id: "github",
      icon: Github,
      name: "GitHub Station",
      frequency: "127.0.0.1",
      status: "ONLINE",
      color: "text-purple-400",
      position: { x: 30, y: 70 }, // Cuadrante inferior izquierdo
      url: "https://github.com/AlbeerC",
    },
    {
      id: "email",
      icon: Mail,
      name: "Email Beacon",
      frequency: "255.255.255.0",
      status: "ONLINE",
      color: "text-green-400",
      position: { x: 70, y: 70 }, // Cuadrante inferior derecho
      url: "mailto:caminosalbertodev@gmail.com",
    },
  ];

  return (
    <SnapSection id="contact" background={contactbg}>
      <div className="min-h-screen  p-4 flex items-center justify-center">
        <CommunicationPanel stations={stations} />
      </div>
    </SnapSection>
  );
}
