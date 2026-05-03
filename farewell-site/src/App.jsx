import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Hooks
import { useLenis } from './hooks/useLenis'
import { useCursor } from './hooks/useCursor'

// Components
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import MusicPlayer from './components/MusicPlayer'
import AnimatedDoodles from './components/AnimatedDoodles'

// Sections
import HeroSection from './sections/HeroSection'
import MemoriesSection from './sections/MemoriesSection'
import GallerySection from './sections/GallerySection'
import MemoryTicker from './components/MemoryTicker'
import RunningAnimation from './components/RunningAnimation'
import Superlatives from './components/Superlatives'
import FarewellCTA from './components/FarewellCTA'
import VideoSection from './sections/VideoSection'
import InteractiveGallerySection from './sections/InteractiveGallerySection'
import QuotesSection from './sections/QuotesSection'
import FooterSection from './sections/FooterSection'
import BatchStats from './components/BatchStats'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useLenis()
  useCursor()

  const handlePreloadComplete = () => {
    setLoaded(true)
    // Refresh ScrollTrigger after load
    setTimeout(() => ScrollTrigger.refresh(), 100)
  }

  return (
    <div className="grain">
      {/* Custom Cursor */}
      <div className="cursor" />
      <div className="cursor-follower" />

      {/* Preloader */}
      {!loaded && <Preloader onComplete={handlePreloadComplete} />}

      {/* GSAP Animated Background Doodles */}
      {loaded && (
        <>
          <AnimatedDoodles />
        </>
      )}

      {/* Main Content */}
      <div className={`relative z-10 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />

        <main>
          <HeroSection />

          {/* Separator */}
          <div className="flex justify-center py-4">
            <div className="w-px h-24 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
          </div>

          <MemoriesSection />

          {/* Separator */}
          <div className="flex justify-center py-4">
            <div className="w-px h-24 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
          </div>

          <GallerySection />

          {/* Separator */}
          <div className="flex justify-center py-4">
            <div className="w-px h-24 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
          </div>

          <MemoryTicker />
          <RunningAnimation />
          <BatchStats />
          <Superlatives />
          <FarewellCTA />

          {/* Separator */}
          <div className="flex justify-center py-4">
            <div className="w-px h-24 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
          </div>

          <VideoSection />

          {/* Separator */}
          <div className="flex justify-center py-4">
            <div className="w-px h-24 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
          </div>

          <InteractiveGallerySection />

          {/* Separator */}
          <div className="flex justify-center py-4">
            <div className="w-px h-24 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
          </div>

          <QuotesSection />
        </main>

        <FooterSection />
      </div>
      <MusicPlayer />
    </div>
  )
}
