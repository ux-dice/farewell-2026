import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const navLinks = [
  { label: 'Memories', href: '#memories' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Videos', href: '#videos' },
  { label: 'Fun', href: '#fun' },
  { label: 'Quotes', href: '#quotes' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 3.5 }
    )

    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-700 ${
          scrolled
            ? 'py-3 glass border-b border-gold/10'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border border-gold/60 rotate-45 flex items-center justify-center">
              <div className="w-2 h-2 bg-gold rotate-45" />
            </div>
            <span className="font-display text-lg text-white tracking-wider">
              Forever <span className="text-gold italic">Remembered</span>
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-mono text-xs tracking-[0.15em] text-white/50 hover:text-gold transition-colors duration-300 uppercase"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`block w-5 h-px bg-white transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-px bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-white transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[999] glass-dark transition-all duration-500 flex flex-col items-center justify-center gap-8 ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {navLinks.map((link, i) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className="font-display text-4xl text-white hover:text-gold transition-colors duration-300"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            {link.label}
          </button>
        ))}
      </div>
    </>
  )
}
