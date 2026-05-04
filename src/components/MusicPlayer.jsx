import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import content from '../data/content.json'

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(false)
  const audioRef = useRef(null)
  const btnRef = useRef(null)
  const ringsRef = useRef([])

  useEffect(() => {
    // Show player after delay
    setTimeout(() => setVisible(true), 4000)
    if (audioRef.current) {
      audioRef.current.volume = 0.6
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    
    if (audio.paused) {
      audio.play()
      setPlaying(true)
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  // Pulse rings when playing
  useEffect(() => {
    if (playing) {
      ringsRef.current.forEach((ring, i) => {
        if (!ring) return
        gsap.to(ring, {
          scale: 2.5,
          opacity: 0,
          duration: 1.5,
          delay: i * 0.5,
          repeat: -1,
          ease: 'power2.out',
        })
      })
    } else {
      ringsRef.current.forEach(ring => {
        if (!ring) return
        gsap.killTweensOf(ring)
        gsap.to(ring, { scale: 1, opacity: 0, duration: 0.3 })
      })
    }
  }, [playing])

  if (!visible) return null

  const musicUrl = content.music.url.startsWith('http') 
    ? content.music.url 
    : `${import.meta.env.BASE_URL}${content.music.url}`

  return (
    <div className="fixed bottom-8 right-8 z-[1001] flex items-center gap-4">
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        src={musicUrl} 
        loop 
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {/* Song Info (Premium Glass Panel) */}
      <div className="glass px-4 py-2 rounded-2xl border border-gold/20 flex flex-col items-end">
        <p className="font-sans text-sm text-white/90 truncate max-w-[150px] sm:max-w-[200px]">
          {content.music.title}
        </p>
        <p className="font-mono text-[10px] text-gold/70 tracking-wider">
          {content.music.artist}
        </p>
      </div>

      <div className="relative">
        {/* Pulse rings */}
        {[0, 1, 2].map(i => (
          <div
            key={i}
            ref={el => ringsRef.current[i] = el}
            className="absolute inset-0 rounded-full border border-gold/30 opacity-0 pointer-events-none"
          />
        ))}

        {/* Button */}
        <button
          ref={btnRef}
          onClick={toggle}
          className="music-btn glass border border-gold/30 hover:border-gold/60 gold-glow relative z-10"
          title={playing ? 'Pause Music' : 'Play Music'}
        >
          {playing ? (
            // Pause icon
            <div className="flex gap-1">
              <div className="w-1 h-4 bg-gold rounded-full" />
              <div className="w-1 h-4 bg-gold rounded-full" />
            </div>
          ) : (
            // Play icon
            <div
              className="w-0 h-0 ml-1"
              style={{
                borderTop: '7px solid transparent',
                borderBottom: '7px solid transparent',
                borderLeft: '12px solid #d4af37',
              }}
            />
          )}
        </button>
      </div>
    </div>
  )
}
