import { useState } from 'react';
import { Link } from 'react-router-dom';
import FlappyBot from '../components/FlappyBot';
import GlitchText from '../components/GlitchText';
import './NotFoundPage.css';
import '../styles/pages.css';

export default function NotFoundPage() {
  const [showGame, setShowGame] = useState(false);

  const handleStartGame = () => {
    if (!showGame) {
      setShowGame(true);
    }
  };

  return (
    <section className="page-section not-found-page">
      <div className="page-content not-found-content">
        <GlitchText
          speed={0.5}
          enableShadows={true}
          enableOnHover={false}
          className={`not-found-title ${!showGame ? 'clickable' : ''}`}
          onClick={handleStartGame}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleStartGame()}
          role="button"
          tabIndex={!showGame ? 0 : -1}
          aria-label="404, click to start a game"
        >
          404
        </GlitchText>

        {showGame ? (
          <FlappyBot />
        ) : (
          <p className="not-found-text">Page not found. Want to play a game?</p>
        )}

        <Link to="/" className="cta-button cursor-target">
          Return to Base
        </Link>
      </div>
    </section>
  );
}