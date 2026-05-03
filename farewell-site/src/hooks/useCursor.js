import { useEffect } from 'react'
import { gsap } from 'gsap'

export function useCursor() {
  useEffect(() => {
    const cursor = document.querySelector('.cursor')
    const follower = document.querySelector('.cursor-follower')

    if (!cursor || !follower) return

    // Hide custom cursor on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) {
      cursor.style.display = 'none'
      follower.style.display = 'none'
      document.body.style.cursor = 'auto'
      return
    }

    let mouseX = 0, mouseY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(cursor, { x: mouseX - 6, y: mouseY - 6, duration: 0.1 })
      gsap.to(follower, { x: mouseX - 18, y: mouseY - 18, duration: 0.45 })
    }

    const onEnter = () => {
      gsap.to(cursor, { scale: 2.5, duration: 0.3 })
      gsap.to(follower, { scale: 0.5, opacity: 0.5, duration: 0.3 })
    }

    const onLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 })
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3 })
    }

    window.addEventListener('mousemove', onMove)

    // Use event delegation for dynamic elements
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) {
        onEnter()
      }
    }
    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) {
        onLeave()
      }
    }

    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])
}
