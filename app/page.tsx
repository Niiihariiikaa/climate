import { ThreeDCardDemo } from "./ThreeDCardDemo";
import { BackgroundLines } from "@/components/ui/BackgroundLines";
import { HoverEffect } from "@/components/ui/hover-effect";
import PredictForm from "./Predictor";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  const hoverItems = [
    {
      title: "Sustainable Farming",
      description: "Implement AI-driven analytics for precision agriculture.",
      link: "/sustainable-farming",
    },
    {
      title: "Rainfall Predictions",
      description: "Optimize water usage through smart irrigation.",
      link: "/water-conservation",
    },
    {
      title: "Crop Monitoring",
      description: "Use ML models to detect crop diseases early.",
      link: "/crop-monitoring",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-green-900 text-white flex flex-col justify-between">
      {/* Navbar */}
      <nav className="w-full bg-transparent p-4 flex justify-between items-center shadow-lg fixed top-0 z-50">
        <h1 className="text-xl font-bold text-teal-400"></h1>
        <a
          href="https://github.com/Niiihariiikaa/climate-smart-agriculture"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-2xl hover:text-teal-400"
        >
          <FaGithub />
        </a>
      </nav>

      {/* Landing Section */}
      <div className="relative flex justify-center items-center min-h-screen">
        <BackgroundLines />
        <h1 className="absolute z-10 text-5xl font-bold bg-gradient-to-r from-teal-400 via-green-300 to-blue-400 text-transparent bg-clip-text text-center top-1/4 left-1/2 transform -translate-x-1/2">
  Climate Smart Agriculture
</h1>
<p className="absolute z-10 text-xl font-medium text-white mt-8 text-center px-6 max-w-2xl left-1/2 transform -translate-x-1/2">
  Harnessing the power of AI, machine learning, and advanced data analytics, our platform delivers predictive models for crop damage, water usage optimization, and real-time monitoring. By leveraging cutting-edge technologies, we enable precision agriculture that adapts to environmental conditions, enhances yield prediction, and promotes sustainable farming practices at scale.
</p>
        </div>


      {/* Section for 3D Card & Hover Effect */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 py-16 px-8">
        <div className="w-full md:w-1/2 flex justify-center">
          <ThreeDCardDemo />
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <HoverEffect items={hoverItems} />
        </div>
      </div>

      {/* Prediction Form Section */}
      <div className="flex justify-center items-center p-10">
        <div className="w-full max-w-4xl bg-gradient-to-r from-gray-800 via-green-800 to-gray-700 shadow-xl rounded-lg p-8 border border-gray-600">
          <h2 className="text-2xl font-semibold text-center text-teal-300 mb-4">
            Predict Crop Damage
          </h2>
          <PredictForm />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 bg-transparent text-teal-400">
        Made with ❤️ by Niharika
      </footer>
    </div>
  );
}
