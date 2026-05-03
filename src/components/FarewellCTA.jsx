export default function FarewellCTA() {
  return (
    <section className="farewell-cta" style={{ padding: 'clamp(3rem, 6vw, 8rem) clamp(1rem, 2vw, 2rem)', background: 'radial-gradient(ellipse at center, #1a1500 0%, #0a0a0a 70%)', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .cta-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 2;
        }
        .cta-label {
          color: #f5c518;
          letter-spacing: 0.3em;
          font-size: 0.75rem;
          margin-bottom: 2rem;
          display: inline-block;
        }
        .cta-heading {
          font-size: clamp(2.5rem, 6vw, 5rem);
          line-height: 1.1;
          margin-bottom: 2rem;
          font-family: serif;
        }
        .cta-heading-white {
          color: #ffffff;
          display: block;
        }
        .cta-heading-gold {
          color: #f5c518;
          font-style: italic;
          display: block;
        }
        .cta-paragraph {
          color: #888;
          max-width: 500px;
          margin: 0 auto 3rem auto;
          line-height: 1.8;
          font-size: 1.1rem;
        }
        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn-primary {
          background: #f5c518;
          color: #000;
          padding: 0.875rem 2rem;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .btn-primary:hover {
          background: #ffe066;
          transform: translateY(-2px);
        }
        .btn-secondary {
          background: transparent;
          color: #ffffff;
          border: 1px solid #ffffff;
          padding: 0.875rem 2rem;
          border-radius: 4px;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }
        .sparkle {
          position: absolute;
          color: #f5c518;
          font-size: 1.5rem;
          opacity: 0;
          animation: float 4s ease-in-out infinite;
          z-index: 1;
        }
        @keyframes float {
          0%   { transform: translateY(0); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(-80px); opacity: 0; }
        }
      `}</style>
      
      <div className="cta-content">
        <span className="cta-label">CHAPTER ENDS  ✦  STORY CONTINUES</span>
        <h2 className="cta-heading">
          <span className="cta-heading-white">Not Goodbye.</span>
          <span className="cta-heading-gold">Just See You Later.</span>
        </h2>
        <p className="cta-paragraph">
          Four years of shared stories, inside jokes, and memories that will outlast every textbook. This isn't the end — it's just the first page of everything that comes next.
        </p>
        <div className="cta-buttons">
          <a href="#memories" className="btn-primary">View All Memories</a>
          <a href="#tributes" className="btn-secondary">Leave a Message</a>
        </div>
      </div>
      
      {/* Floating sparkles */}
      <div className="sparkle" style={{ bottom: '20%', left: '15%', animationDelay: '0s' }}>✦</div>
      <div className="sparkle" style={{ bottom: '10%', left: '35%', animationDelay: '1.5s', fontSize: '1rem' }}>✦</div>
      <div className="sparkle" style={{ bottom: '30%', left: '55%', animationDelay: '0.8s' }}>✦</div>
      <div className="sparkle" style={{ bottom: '15%', left: '75%', animationDelay: '2.2s', fontSize: '2rem' }}>✦</div>
      <div className="sparkle" style={{ bottom: '25%', left: '85%', animationDelay: '3.1s' }}>✦</div>
    </section>
  );
}
