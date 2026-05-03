const TICKER_ITEMS = [
  "\"Bhai notes de de\" — Every exam season 🙏",
  "\"Proxy laga dena\" — The classic request 😂",
  "\"Last bench zindabad\" ✊",
  "\"Kal pakka padhunga\" — Famous last words 📚",
  "\"Sir abhi toh 5 minute hue hain\" ⏰",
  "\"Free period!\" — Best 2 words ever 🎉",
  "\"Canteen chal?\" — Always yes 🍕",
  "\"We will meet again\" — Promise 💛",
];

export default function MemoryTicker() {
  const content = TICKER_ITEMS.join("  ✦  ") + "  ✦  ";

  return (
    <section className="memory-ticker" style={{ padding: 'clamp(3rem, 6vw, 6rem) 0' }}>
      <style>{`
        .ticker-strip {
          background: #111;
          border-top: 1px solid #2a2a2a;
          border-bottom: 1px solid #2a2a2a;
          overflow: hidden;
          white-space: nowrap;
          display: flex;
          align-items: center;
          padding: 1rem 0;
          position: relative;
        }
        .ticker-track {
          display: inline-flex;
          white-space: nowrap;
          animation: ticker-scroll 30s linear infinite;
        }
        .ticker-track.reverse {
          animation: ticker-scroll-reverse 30s linear infinite;
        }
        .ticker-strip:hover .ticker-track {
          animation-play-state: paused;
        }
        .ticker-text {
          font-style: italic;
          color: #f5c518;
          font-size: 1.1rem;
          padding-right: 2rem;
          white-space: pre;
        }
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes ticker-scroll-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
      
      <div className="ticker-strip" style={{ marginBottom: '1px' }}>
        <div className="ticker-track">
          <div className="ticker-text">{content}{content}</div>
        </div>
      </div>
      
      <div className="ticker-strip">
        <div className="ticker-track reverse">
          <div className="ticker-text">{content}{content}</div>
        </div>
      </div>
    </section>
  );
}
