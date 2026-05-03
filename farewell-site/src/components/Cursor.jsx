import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursor, { x: mouseX - 4, y: mouseY - 4, duration: 0.1 });
    };

    const animateFollower = () => {
      followerX += (mouseX - followerX - 16) * 0.12;
      followerY += (mouseY - followerY - 16) * 0.12;
      gsap.set(follower, { x: followerX, y: followerY });
      requestAnimationFrame(animateFollower);
    };

    const onMouseEnterLink = () => {
      gsap.to(follower, { scale: 2, borderColor: 'rgba(212,175,55,0.8)', duration: 0.3 });
      gsap.to(cursor, { scale: 0, duration: 0.3 });
    };

    const onMouseLeaveLink = () => {
      gsap.to(follower, { scale: 1, borderColor: 'rgba(212,175,55,0.5)', duration: 0.3 });
      gsap.to(cursor, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove);
    animateFollower();

    const links = document.querySelectorAll('a, button, [data-cursor="pointer"]');
    links.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterLink);
      el.addEventListener('mouseleave', onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
}
