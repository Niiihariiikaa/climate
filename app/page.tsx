"use client"
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import { ThreeDCardDemo } from "./ThreeDCardDemo";
import { HoverEffect } from "@/components/ui/hover-effect";
import PredictForm from "./Predictor";
import { FaGithub, FaLeaf, FaTractor, FaCloudSunRain, FaChartLine } from "react-icons/fa";
import WeatherApp from "@/components/ui/WeatherApp";
import { BackgroundGradientAnimation } from '@/components/ui/BackgroundGradient';
import PredictionForm from './YieldPredict';
import MarketTrends from '@/components/ui/MarketTrend';

const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 60 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  },
  slideIn: {
    initial: { x: -60, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  },
  scaleUp: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  },
  floating: {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
};

export default function Home() {
  const hoverItems = [
    {
      title: "Yeild Prediction",
      description: "This version will make use of Random Forest Classifier algorithm",
      link: "/sustainable-farming",
      icon: <FaLeaf className="text-green-400 text-2xl" />
    },
    {
      title: "Predict Crop Damage",
      description: "This version will estimate the quantity of crop damage based totally on more than one factor",
      link: "/water-conservation",
      icon: <FaCloudSunRain className="text-blue-400 text-2xl" />
    },
    {
      title: "Weather Analytics",
      description: "Helps farmers adapt their strategies based on current and forecasted climatic conditions.",
      link: "/crop-monitoring",
      icon: <FaTractor className="text-yellow-500 text-2xl" />
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 z-0">
        <BackgroundGradientAnimation 
          gradientBackgroundStart="rgb(0, 10, 5)" 
          gradientBackgroundEnd="rgb(0, 34, 17)"
          firstColor="18, 113, 255"
          secondColor="0, 255, 128"
          thirdColor="0, 82, 41"
          fourthColor="0, 51, 25"
          pointerColor="0, 102, 51"
          size="100%"
          blendingValue={40}
        />
      </div>

      <div className="relative z-10">
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed top-0 left-0 right-0 z-50 px-8 py-6 bg-transparent backdrop-blur-xl border-b border-white/10"
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <motion.div 
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: 30 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <FaLeaf className="text-4xl text-green-400" />
              </motion.div>
              
            </motion.div>
            <motion.a 
              href="https://github.com/Niiihariiikaa/climate-smart-agriculture"
              className="text-white/80 hover:text-green-400 transition-colors"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              <FaGithub className="text-3xl" />
            </motion.a>
          </div>
        </motion.nav>

        <section className="relative pt-32 pb-16 px-8">
          <motion.div 
            className="max-w-6xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={animations.scaleUp}
          >
            <motion.h1 
              variants={animations.fadeInUp}
              className="text-8xl font-bold mb-8 bg-gradient-to-r from-green-400 via-teal-300 to-blue-500 bg-clip-text text-transparent leading-tight"
            >
              Climate Smart Agriculture
            </motion.h1>
            <motion.p 
              variants={animations.fadeInUp}
              className="text-3xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-light mb-12"
            >
              Revolutionizing farming through AI-powered precision, sustainable technologies, and intelligent ecosystem management.
            </motion.p>
            <p className='text-1xl text-gray-500'>Our innovative machine learning model is designed to predict the most suitable crops for specific terrains while simultaneously assessing potential damage risks. By leveraging data from multiple sources, including government websites and live weather analytics, this model aims to revolutionize agricultural decision-making and optimize crop yield.</p>

            <motion.div variants={animations.scaleUp}>
              <HoverEffect 
                items={hoverItems} 
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              />
            </motion.div>
          </motion.div>
        </section>

        <section className="px-8 py-16">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 transform hover:translate-y-[-4px] transition-transform duration-300"
                variants={animations.slideIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <motion.h2 
                  className="text-4xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
                  variants={animations.floating}
                  animate="animate"
                >
                  AI-Powered Insights
                </motion.h2>
                <motion.div 
                  className="mb-8"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <ThreeDCardDemo />
                </motion.div>
                <motion.div
                  variants={animations.fadeInUp}
                  className="transform hover:scale-102 transition-transform duration-300"
                >
                  <PredictForm />
                </motion.div>
              </motion.div>

              <motion.div 
                className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 transform hover:translate-y-[-4px] transition-transform duration-300"
                variants={animations.slideIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <div className="p-8 space-y-8">
                  <motion.h2 
                    className="text-4xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
                    variants={animations.floating}
                    animate="animate"
                  >
                    Weather & Yield Analytics
                  </motion.h2>
                  
                  <motion.div 
                    className="bg-black/30 rounded-2xl p-6 backdrop-blur-lg border border-white/5"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <WeatherApp />
                  </motion.div>
                  
                  <motion.div 
                    className="mt-8 bg-black/30 rounded-2xl p-6 backdrop-blur-lg border border-white/5"
                    variants={animations.fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <FaChartLine className="text-2xl text-green-400" />
                      <h3 className="text-xl font-semibold text-white">Crop Yield Prediction</h3>
                    </div>
                    <PredictionForm className="bg-black/20 p-6 rounded-xl shadow-xl" />
                  </motion.div>
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 transform hover:translate-y-[-4px] transition-transform duration-300"
              variants={animations.scaleUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-4xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
                variants={animations.floating}
                animate="animate"
              >
                Know Your Market
              </motion.h2>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <MarketTrends />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-black/30 backdrop-blur-xl border-t border-white/10 py-8 mt-16"
        >
          <div className="max-w-7xl mx-auto px-8">
            <motion.p 
              whileHover={{ scale: 1.1 }}
              className="text-center text-gray-400 text-lg"
            >
              Made with{' '}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block text-red-500"
              >
                ❤️
              </motion.span>
              {' '}by Niharika
            </motion.p>
          </div>
        </motion.footer>
      </div>
    </main>
  );
}