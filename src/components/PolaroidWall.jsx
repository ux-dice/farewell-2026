import { useGalleryImages } from '../hooks/useGalleryImages';

const LABELS = ["2021", "Our Gang", "Last Day", "Canteen Days", "Never Forget"];
const ROTATIONS = ["rotate(-3deg)", "rotate(2deg)", "rotate(-4deg)", "rotate(3deg)", "rotate(-1deg)"];

export default function PolaroidWall() {
  const images = useGalleryImages();
  const polaroids = LABELS.map((label, i) => ({
    label,
    src: images[i] ? images[i].src : null,
    rotation: ROTATIONS[i]
  }));

  return (
    <section className="polaroid-wall" style={{ padding: 'clamp(3rem, 6vw, 6rem) clamp(1rem, 2vw, 2rem)', overflow: 'hidden' }}>
      <style>{`
        .polaroid-container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          padding: 2rem 0;
        }
        .polaroid-card {
          background: #ffffff;
          padding: 10px 10px 40px 10px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.5);
          width: 200px;
          height: 240px;
          margin: -10px; /* Negative margin for overlap */
          transition: all 0.3s ease;
          position: relative;
          cursor: pointer;
        }
        .polaroid-card:hover {
          transform: rotate(0deg) scale(1.05) !important;
          z-index: 10;
          box-shadow: 0 10px 25px rgba(0,0,0,0.7);
        }
        .polaroid-img-box {
          width: 100%;
          height: 100%;
          background: #e0e0e0;
          overflow: hidden;
        }
        .polaroid-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .polaroid-label {
          position: absolute;
          bottom: 10px;
          left: 0;
          right: 0;
          text-align: center;
          font-family: 'Caveat', cursive, sans-serif;
          color: #d4af37; /* gold text */
          font-size: 1.2rem;
          font-weight: bold;
        }
        @media (max-width: 768px) {
          .polaroid-container {
            gap: 2rem;
            margin: 0;
          }
          .polaroid-card {
            margin: 0;
          }
        }
      `}</style>
      
      <div className="polaroid-container">
        {polaroids.map((p, i) => (
          <div 
            className="polaroid-card" 
            key={i} 
            style={{ 
              transform: p.rotation,
              zIndex: 5 - Math.abs(i - 2) // Middle ones slightly higher initially
            }}
          >
            <div className="polaroid-img-box">
              {p.src ? (
                <img src={p.src} alt={p.label} className="polaroid-img" loading="lazy" />
              ) : (
                <div style={{ width: '100%', height: '100%', background: '#f5f5f5' }} />
              )}
            </div>
            <div className="polaroid-label">{p.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
