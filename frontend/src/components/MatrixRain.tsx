import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.15;
`;

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<number[]>([]);
  const columnsRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Matrix characters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;

    // Set canvas size and initialize drops
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.offsetHeight;

      // Recalculate columns
      const newColumns = Math.ceil(window.innerWidth / fontSize);
      
      // If we need more columns, add new drops
      if (newColumns > columnsRef.current) {
        for (let i = columnsRef.current; i < newColumns; i++) {
          dropsRef.current[i] = 1;
        }
      }
      
      columnsRef.current = newColumns;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize drops if not already initialized
    if (dropsRef.current.length === 0) {
      for (let i = 0; i < columnsRef.current; i++) {
        dropsRef.current[i] = 1;
      }
    }

    const draw = () => {
      // Semi-transparent black background for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Green text
      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      // Draw characters
      for (let i = 0; i < columnsRef.current; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = dropsRef.current[i] * fontSize;

        ctx.fillText(char, x, y);

        // Reset drop when it reaches bottom or randomly
        if (y > canvas.height && Math.random() > 0.99) { // Reduced probability for slower reset
          dropsRef.current[i] = 0;
        }

        // Slow down the drop speed
        if (Math.random() > 0.975) { // Reduced probability for slower movement
          dropsRef.current[i]++;
        }
      }
    };

    // Animation loop with slower interval
    const interval = setInterval(draw, 50); // Increased interval for slower animation

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default MatrixRain;
