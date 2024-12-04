import { useCallback, useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
}

export function useSnowfall(isActive: boolean, count: number = 50) {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  const createSnowflake = useCallback((id: number): Snowflake => ({
    id,
    x: Math.random() * 100,
    y: -10,
    size: Math.random() * 3 + 2,
    speed: Math.random() * 2 + 1,
  }), []);

  const updateSnowflakes = useCallback(() => {
    setSnowflakes(prev => 
      prev.map(flake => ({
        ...flake,
        y: flake.y + flake.speed,
        x: flake.x + Math.sin(flake.y * 0.02) * 0.5,
      })).filter(flake => flake.y < 110)
    );
  }, []);

  useEffect(() => {
    if (!isActive) {
      setSnowflakes([]);
      return;
    }

    const interval = setInterval(() => {
      if (snowflakes.length < count) {
        setSnowflakes(prev => [...prev, createSnowflake(Date.now())]);
      }
      updateSnowflakes();
    }, 50);

    return () => clearInterval(interval);
  }, [isActive, count, createSnowflake, updateSnowflakes, snowflakes.length]);

  return snowflakes;
}