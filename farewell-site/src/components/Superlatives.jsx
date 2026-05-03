const SUPERLATIVES = [
  { award: "Most Likely To",  title: "Become a Startup CEO",     emoji: "🚀" },
  { award: "Most Likely To",  title: "Still Be on Instagram Live", emoji: "📱" },
  { award: "Most Likely To",  title: "Forget Everyone's Name",    emoji: "😅" },
  { award: "Most Likely To",  title: "Show Up Late to Own Wedding", emoji: "💍" },
  { award: "Most Likely To",  title: "Sleep Through an Exam",     emoji: "😴" },
  { award: "Most Likely To",  title: "Write a Bestseller",        emoji: "📚" },
  { award: "Most Likely To",  title: "Travel Every Country",      emoji: "🌍" },
  { award: "Most Likely To",  title: "Make Us All Proud",         emoji: "🏆" },
];

export default function Superlatives() {
  return (
    <section id="fun" className="superlatives-section" style={{ padding: 'clamp(3rem, 6vw, 6rem) clamp(1rem, 2vw, 2rem)', overflow: 'hidden' }}>
      <style>{`
        .sup-scroll-container {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          padding-bottom: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          scrollbar-width: thin;
          scrollbar-color: #f5c518 transparent;
        }
        .sup-scroll-container::-webkit-scrollbar {
          display: block;
          height: 4px;
        }
        .sup-scroll-container::-webkit-scrollbar-thumb {
          background: #f5c518;
          border-radius: 10px;
        }
        .sup-card {
          flex: 0 0 200px;
          height: 240px;
          background: linear-gradient(135deg, #111 0%, #1a1a0a 100%);
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          transition: all 0.3s ease;
          cursor: default;
        }
        .sup-card:hover {
          box-shadow: 0 0 20px rgba(245, 197, 24, 0.2);
          transform: translateY(-5px);
        }
        .sup-emoji {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .sup-award {
          font-size: 0.65rem;
          color: #f5c518;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
        }
        .sup-title {
          color: #ffffff;
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.3;
        }
        @media (min-width: 1024px) {
          .sup-scroll-container {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            overflow-x: visible;
          }
          .sup-card {
            flex: auto;
            width: 100%;
          }
        }
      `}</style>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span style={{ fontSize: '0.85rem', color: '#f5c518', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>YEARBOOK</span>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#ffffff', margin: 0 }}>Class Superlatives</h2>
      </div>
      <div className="sup-scroll-container">
        {SUPERLATIVES.map((item, i) => (
          <div className="sup-card" key={i}>
            <div className="sup-emoji">{item.emoji}</div>
            <div className="sup-award">{item.award}</div>
            <div className="sup-title">{item.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
