import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import './FlappyBot.css';

// Game Constants
const GAME_WIDTH = 600;
const GAME_HEIGHT = 400;
const BOT_SIZE = 30;
const GRAVITY = 0.22; // Reduced gravity for easier control
const JUMP_STRENGTH = -5.5; // Adjusted jump to match new gravity
const OBSTACLE_WIDTH = 60;
const OBSTACLE_GAP = 140;
const OBSTACLE_SPEED = 2.5;
const OBSTACLE_INTERVAL = 2000; // ms

const FlappyBot: React.FC = () => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameOver'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const [obstacles, setObstacles] = useState<{ x: number; topHeight: number }[]>([]);

  const gameLoopRef = useRef<number>();
  const botVelocityRef = useRef(0);
  const botPositionRef = useRef(GAME_HEIGHT / 2);
  const botElRef = useRef<HTMLDivElement>(null);
  const lastObstacleTimeRef = useRef(0);
  const obstaclesRef = useRef(obstacles);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScale = () => {
      const { clientWidth } = container;
      setScale(clientWidth / GAME_WIDTH);
    };

    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(container);
    updateScale(); // Set initial scale

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    obstaclesRef.current = obstacles;
  }, [obstacles]);

  useEffect(() => {
    const storedHighScore = localStorage.getItem('flappyBotHighScore');
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore, 10));
    }
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    botPositionRef.current = GAME_HEIGHT / 2;
    if (botElRef.current) {
      botElRef.current.style.top = `${GAME_HEIGHT / 2 - BOT_SIZE / 2}px`;
    }
    botVelocityRef.current = 0;
    setObstacles([]);
    lastObstacleTimeRef.current = performance.now();
    setGameState('playing');
  }, []);

  const jump = useCallback(() => {
    if (gameState === 'playing') {
      botVelocityRef.current = JUMP_STRENGTH;
    } else if (gameState === 'idle' || gameState === 'gameOver') {
      startGame();
    }
  }, [gameState, startGame]);

  useEffect(() => {
    if (gameState !== 'playing') {
      return;
    }

    const gameLoop = (timestamp: number) => {
      // --- Bot Physics & Direct DOM Update ---
      botVelocityRef.current += GRAVITY;
      botPositionRef.current += botVelocityRef.current;
      if (botElRef.current) {
        botElRef.current.style.top = `${botPositionRef.current - BOT_SIZE / 2}px`;
      }

      // --- Obstacle Logic ---
      let currentObstacles = [...obstaclesRef.current];
      if (timestamp - lastObstacleTimeRef.current > OBSTACLE_INTERVAL) {
        lastObstacleTimeRef.current = timestamp;
        const topHeight = Math.random() * (GAME_HEIGHT - OBSTACLE_GAP - 80) + 40;
        currentObstacles.push({ x: GAME_WIDTH, topHeight });
      }

      let passedObstacle = false;
      const updatedObstacles = currentObstacles.map(obstacle => {
        const newX = obstacle.x - OBSTACLE_SPEED;
        if (obstacle.x >= GAME_WIDTH / 2 - BOT_SIZE / 2 && newX < GAME_WIDTH / 2 - BOT_SIZE / 2) {
          passedObstacle = true;
        }
        return { ...obstacle, x: newX };
      }).filter(obstacle => obstacle.x > -OBSTACLE_WIDTH);
      
      if (passedObstacle) {
        setScore(prev => prev + 1);
      }
      setObstacles(updatedObstacles);

      // --- Collision Detection ---
      const botTop = botPositionRef.current - BOT_SIZE / 2;
      const botBottom = botPositionRef.current + BOT_SIZE / 2;

      if (botBottom > GAME_HEIGHT || botTop < 0) {
        setGameState('gameOver');
        return;
      }

      for (const obstacle of updatedObstacles) {
        const botLeft = GAME_WIDTH / 2 - BOT_SIZE / 2;
        const botRight = GAME_WIDTH / 2 + BOT_SIZE / 2;
        if (
          botRight > obstacle.x &&
          botLeft < obstacle.x + OBSTACLE_WIDTH &&
          (botTop < obstacle.topHeight || botBottom > obstacle.topHeight + OBSTACLE_GAP)
        ) {
          setGameState('gameOver');
          return;
        }
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'gameOver' && score > highScore) {
      setHighScore(score);
      localStorage.setItem('flappyBotHighScore', score.toString());
    }
  }, [gameState, score, highScore]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    jump();
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [jump]);

  return (
    <div 
      ref={containerRef}
      className="flappy-bot-container" 
      onMouseDown={jump}
      onTouchStart={handleTouchStart}
    >
      <div className="game-world" style={{ transform: `scale(${scale})` }}>
        {gameState === 'idle' && (
          <div className="game-overlay">
            <p className="game-message">Flappy Bot</p>
            <p className="game-instruction">Click or Press Space to Start</p>
          </div>
        )}
        {gameState === 'gameOver' && (
          <div className="game-overlay">
            <p className="game-message">Game Over</p>
            <p className="game-score-final">Score: {score}</p>
            <p className="game-score-final">High Score: {highScore}</p>
            <p className="game-instruction">Click to Play Again</p>
          </div>
        )}

        {gameState === 'playing' && (
          <>
            <div className="game-score-display">Score: {score}</div>
            <div className="game-highscore-display">Best: {highScore}</div>
          </>
        )}

        <div 
          ref={botElRef}
          className="flappy-bot" 
          style={{ top: GAME_HEIGHT / 2 - BOT_SIZE / 2, left: GAME_WIDTH / 2 - BOT_SIZE / 2 }}
        >
          <div className="bot-body" />
        </div>

        {obstacles.map((obstacle, i) => (
          <React.Fragment key={i}>
            <div 
              className="obstacle-pipe" 
              style={{ left: obstacle.x, top: 0, height: obstacle.topHeight }} 
            />
            <div 
              className="obstacle-pipe" 
              style={{ left: obstacle.x, top: obstacle.topHeight + OBSTACLE_GAP, bottom: 0 }} 
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FlappyBot;