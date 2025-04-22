// src/components/Timeline.jsx
import { useEffect, useRef } from 'react';

function Timeline({
  minTime,
  maxTime,
  currentTime,
  onTimeChange,
  isPlaying,
  onPlayPause,
}) {
  const animationRef = useRef();
  const speed = 20; // seconds
  const fps = 60;
  useEffect(() => {
    onTimeChange(minTime);
  }, [minTime]);

  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        onTimeChange(time => {
          if (!time) return minTime;
          const newTime = new Date(time.getTime() + (speed*1000/fps)); // Update every 1000ms
          if (newTime > maxTime) {
            onPlayPause();
            return maxTime;
          }
          return newTime;
        });
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationRef.current);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying, minTime, maxTime, onTimeChange, onPlayPause]);

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    const time = new Date(minTime.getTime() + value * 1000);
    onTimeChange(time);
  };

  const totalSeconds = Math.floor((maxTime - minTime) / 1000);
  const currentSeconds = currentTime ? Math.floor((currentTime - minTime) / 1000) : 0;

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onPlayPause}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      <input
        type="range"
        min={0}
        max={totalSeconds}
        value={currentSeconds}
        onChange={handleSliderChange}
        className="flex-1"
      />
      <div className="w-32 text-sm">
        {currentTime ? currentTime.toLocaleTimeString() : '--:--:--'}
      </div>
    </div>
  );
}

export default Timeline;