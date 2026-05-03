import { useEffect, useRef } from 'react';

const STATS = [
  { number: "4",     label: "Years of Chaos" },
  { number: "∞",     label: "Memories Made" },
  { number: "0",     label: "Syllabus Completed" },
  { number: "100%",  label: "Attendance... just kidding" },
  { number: "2AM",   label: "Average Study Start Time" },
  { number: "1",     label: "Last Bench Reserved Forever" },
  { number: "47",    label: "Cancelled Plans" },
  { number: "🎓",    label: "Finally Done" },
];

export default function BatchStats() {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    const cards = containerRef.current.querySelectorAll('.stat-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="batch-stats-section" style={{ padding: 'clamp(3rem, 6vw, 6rem) clamp(1rem, 2vw, 2rem)' }}>
      <style>{`
        .stat-card {
          border: 1px solid #2a2a2a;
          background: #111;
          padding: 2rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(30px);
        }
        .stat-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        .stat-card:hover {
          border-color: #f5c518;
          transform: scale(1.03);
          z-index: 1;
        }
        .stat-number {
          font-size: 3rem;
          color: #f5c518;
          font-weight: bold;
          line-height: 1.1;
        }
        .stat-label {
          font-size: 0.85rem;
          color: #888;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 0.5rem;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
        }
      `}</style>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span style={{ fontSize: '0.85rem', color: '#f5c518', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>BY THE NUMBERS</span>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#ffffff', margin: 0 }}>Our Batch, Statistically Speaking</h2>
      </div>
      <div className="stats-grid" ref={containerRef}>
        {STATS.map((stat, i) => (
          <div className="stat-card" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
