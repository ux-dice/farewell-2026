export default function RunningAnimation() {
  return (
    <section className="arcade-runner-section" style={{ padding: '4rem 0 0 0', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        /* Arcade Fonts & Text */
        .arcade-title-group {
          text-align: center;
          margin-bottom: 3rem;
          position: relative;
          z-index: 2;
        }
        .arcade-score {
          font-family: 'DM Mono', monospace;
          color: #fff;
          font-size: 1.2rem;
          letter-spacing: 0.2em;
          margin-bottom: 1rem;
        }
        .arcade-score span {
          color: #f5c518;
          text-shadow: 0 0 10px rgba(245, 197, 24, 0.5);
        }
        .arcade-title {
          font-family: 'DM Mono', monospace;
          font-size: clamp(2.5rem, 6vw, 5rem);
          color: transparent;
          -webkit-text-stroke: 2px #f5c518;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0;
          text-shadow: 0 0 30px rgba(245, 197, 24, 0.4);
        }
        .blinking-btn {
          animation: blink 1.5s step-end infinite;
          font-family: 'DM Mono', monospace;
          font-size: 0.9rem;
          letter-spacing: 0.3em;
          margin-top: 2rem;
          text-transform: uppercase;
          background: #f5c518;
          color: #000;
          display: inline-block;
          padding: 0.75rem 2rem;
          font-weight: bold;
          border-radius: 4px;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }

        /* Game Screen */
        .game-screen {
          width: 100%;
          height: 250px;
          position: relative;
          border-top: 1px solid rgba(245, 197, 24, 0.1);
          border-bottom: 1px solid rgba(245, 197, 24, 0.1);
          background: linear-gradient(to bottom, #050505, #0a0a0a 70%, #111);
          overflow: hidden;
        }

        /* Scrolling Background Grid */
        .scrolling-grid {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100px;
          background-image: 
            linear-gradient(to right, rgba(245, 197, 24, 0.15) 1px, transparent 1px),
            linear-gradient(to top, rgba(245, 197, 24, 0.15) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: scrollBg 2.5s linear infinite;
          transform-origin: bottom;
          transform: perspective(300px) rotateX(70deg);
        }
        @keyframes scrollBg {
          0% { background-position: 0px 0px; }
          100% { background-position: -400px 40px; } 
        }

        /* The Ground Line */
        .ground-line {
          position: absolute;
          bottom: 30px;
          width: 100%;
          height: 3px;
          background: #f5c518;
          box-shadow: 0 0 10px #f5c518, 0 0 20px #f5c518;
          z-index: 2;
        }

        /* The Player (Glowing Cube) */
        .player-cube {
          position: absolute;
          bottom: 33px; /* Resting on the ground line */
          left: 20%;
          width: 30px;
          height: 30px;
          background: #0a0a0a;
          border: 3px solid #f5c518;
          box-shadow: 0 0 15px rgba(245, 197, 24, 0.8), inset 0 0 10px rgba(245, 197, 24, 0.5);
          z-index: 3;
          animation: jump 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes jump {
          0%, 55% { transform: translateY(0) rotate(0deg); }
          72% { transform: translateY(-100px) rotate(90deg); }
          85% { transform: translateY(0) rotate(180deg); }
          100% { transform: translateY(0) rotate(180deg); }
        }

        /* Obstacles (Spikes) */
        .obstacle {
          position: absolute;
          bottom: 33px;
          width: 0;
          height: 0;
          border-left: 12px solid transparent;
          border-right: 12px solid transparent;
          border-bottom: 25px solid #fff;
          filter: drop-shadow(0 0 8px rgba(255,255,255,0.8));
          z-index: 2;
          animation: slideLeft 2.5s linear infinite;
        }

        @keyframes slideLeft {
          0% { left: 100%; }
          100% { left: -10%; }
        }

        /* Parallax Pixel Stars */
        .pixel-star {
          position: absolute;
          background: #fff;
          width: 3px;
          height: 3px;
          opacity: 0.6;
          animation: slideLeft var(--speed) linear infinite;
        }
      `}</style>
      
      <div className="arcade-title-group">
        <div className="arcade-score">HIGH SCORE: <span>999,999</span></div>
        <h2 className="arcade-title">STAGE CLEARED</h2>
        <div className="blinking-btn">PRESS START</div>
      </div>

      <div className="game-screen">
        {/* Parallax Stars */}
        <div className="pixel-star" style={{ top: '30px', left: '100%', '--speed': '8s', animationDelay: '-2s' }}></div>
        <div className="pixel-star" style={{ top: '70px', left: '100%', '--speed': '12s', animationDelay: '-5s' }}></div>
        <div className="pixel-star" style={{ top: '40px', left: '100%', '--speed': '6s', animationDelay: '-1s' }}></div>
        <div className="pixel-star" style={{ top: '100px', left: '100%', '--speed': '10s', animationDelay: '-7s' }}></div>
        <div className="pixel-star" style={{ top: '130px', left: '100%', '--speed': '9s', animationDelay: '-3s' }}></div>
        <div className="pixel-star" style={{ top: '50px', left: '100%', '--speed': '14s', animationDelay: '-8s' }}></div>
        <div className="pixel-star" style={{ top: '150px', left: '100%', '--speed': '7s', animationDelay: '-4s' }}></div>
        
        {/* 3D Scrolling Grid & Ground */}
        <div className="scrolling-grid"></div>
        <div className="ground-line"></div>
        
        {/* Game Entities */}
        <div className="player-cube"></div>
        <div className="obstacle"></div>
      </div>
    </section>
  );
}
