export default function FutureTicket() {
  return (
    <section className="future-ticket-section" style={{ padding: 'clamp(3rem, 6vw, 6rem) clamp(1rem, 2vw, 2rem)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <style>{`
        .ticket-wrapper {
          perspective: 1000px;
          width: 100%;
          max-width: 800px;
        }
        .ticket {
          display: flex;
          background: linear-gradient(135deg, #111 0%, #0a0a0a 100%);
          border-radius: 16px;
          border: 1px solid rgba(212, 175, 55, 0.3);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(212, 175, 55, 0.05);
          position: relative;
          overflow: hidden;
          transition: transform 0.5s ease, box-shadow 0.5s ease;
        }
        .ticket:hover {
          transform: translateY(-5px) rotateX(2deg) rotateY(2deg);
          box-shadow: 0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(212, 175, 55, 0.15);
          border-color: rgba(212, 175, 55, 0.6);
        }
        .ticket-left {
          flex: 1;
          padding: 2.5rem;
          position: relative;
        }
        .ticket-right {
          width: 200px;
          padding: 2.5rem;
          border-left: 2px dashed rgba(212, 175, 55, 0.3);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          position: relative;
          background: rgba(212, 175, 55, 0.03);
        }
        /* Perforated cutouts */
        .ticket-right::before, .ticket-right::after {
          content: '';
          position: absolute;
          left: -16px;
          width: 30px;
          height: 30px;
          background: #0a0a0a; /* Matches page background */
          border-radius: 50%;
          border: 1px solid rgba(212, 175, 55, 0.3);
        }
        .ticket-right::before {
          top: -16px;
          border-bottom-color: transparent;
          border-left-color: transparent;
          transform: rotate(45deg);
        }
        .ticket-right::after {
          bottom: -16px;
          border-top-color: transparent;
          border-left-color: transparent;
          transform: rotate(-45deg);
        }

        .t-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding-bottom: 1rem;
        }
        .t-brand {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          color: #fff;
          font-style: italic;
        }
        .t-class {
          font-family: 'DM Mono', monospace;
          color: #d4af37;
          letter-spacing: 0.2em;
          font-size: 0.8rem;
          text-transform: uppercase;
        }
        
        .t-row {
          display: flex;
          gap: 2rem;
          margin-bottom: 1.5rem;
        }
        .t-col {
          display: flex;
          flex-direction: column;
        }
        .t-label {
          font-size: 0.65rem;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.3rem;
        }
        .t-value {
          font-size: 1.25rem;
          color: #fff;
          font-family: 'Playfair Display', serif;
        }
        .t-value.large {
          font-size: 2rem;
          color: #d4af37;
        }
        
        .barcode {
          height: 40px;
          width: 100%;
          background: repeating-linear-gradient(
            90deg,
            #fff,
            #fff 2px,
            transparent 2px,
            transparent 4px,
            #fff 4px,
            #fff 5px,
            transparent 5px,
            transparent 8px,
            #fff 8px,
            #fff 12px,
            transparent 12px,
            transparent 14px
          );
          opacity: 0.5;
          margin-top: 2rem;
        }
        .stub-text {
          transform: rotate(90deg);
          transform-origin: center;
          font-family: 'DM Mono', monospace;
          color: #d4af37;
          letter-spacing: 0.3em;
          font-size: 1.5rem;
          white-space: nowrap;
          margin-top: 4rem;
        }
        .flight-icon {
          color: #d4af37;
          font-size: 1.5rem;
          transform: rotate(45deg);
        }

        @media (max-width: 768px) {
          .ticket {
            flex-direction: column;
          }
          .ticket-right {
            width: 100%;
            border-left: none;
            border-top: 2px dashed rgba(212, 175, 55, 0.3);
            flex-direction: row;
            padding: 1.5rem;
          }
          .ticket-right::before, .ticket-right::after {
            left: auto;
            top: -16px;
          }
          .ticket-right::before {
            left: -16px;
            transform: rotate(-45deg);
          }
          .ticket-right::after {
            right: -16px;
            transform: rotate(45deg);
          }
          .stub-text {
            transform: none;
            margin-top: 0;
            font-size: 1.2rem;
          }
          .t-row {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>

      <div className="ticket-wrapper">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.85rem', color: '#f5c518', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>THE NEXT CHAPTER</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#ffffff', margin: 0, fontFamily: '"Playfair Display", serif' }}>Boarding Pass</h2>
        </div>

        <div className="ticket">
          <div className="ticket-left">
            <div className="t-header">
              <div className="t-brand">Forever Remembered</div>
              <div className="t-class">ONE WAY TICKET</div>
            </div>
            
            <div className="t-row" style={{ alignItems: 'center' }}>
              <div className="t-col" style={{ flex: 1 }}>
                <div className="t-label">Departing From</div>
                <div className="t-value large">The Best Days</div>
              </div>
              <div className="flight-icon">✈</div>
              <div className="t-col" style={{ flex: 1, textAlign: 'right' }}>
                <div className="t-label">Arriving At</div>
                <div className="t-value large">The Real World</div>
              </div>
            </div>

            <div className="t-row">
              <div className="t-col">
                <div className="t-label">Passenger</div>
                <div className="t-value">The Graduating Class</div>
              </div>
              <div className="t-col">
                <div className="t-label">Date</div>
                <div className="t-value">Today</div>
              </div>
              <div className="t-col">
                <div className="t-label">Gate</div>
                <div className="t-value">Unknown</div>
              </div>
              <div className="t-col">
                <div className="t-label">Seat</div>
                <div className="t-value">1A</div>
              </div>
            </div>

            <div className="barcode"></div>
            <div style={{ textAlign: 'center', fontSize: '0.6rem', color: '#888', marginTop: '0.5rem', letterSpacing: '0.3em' }}>
              01101000 01101111 01110000 01100101
            </div>
          </div>
          
          <div className="ticket-right">
            <div className="flight-icon" style={{ transform: 'rotate(90deg)' }}>✈</div>
            <div className="stub-text">ADMIT ONE</div>
            <div className="t-col" style={{ textAlign: 'center', marginTop: '1rem' }}>
              <div className="t-label">Class</div>
              <div className="t-value" style={{ color: '#d4af37', fontSize: '1rem' }}>FIRST CLASS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
