// src/utils/useRaceData.js
import { useState, useEffect } from 'react';

function useRaceData() {
  const [raceData, setRaceData] = useState(null);
  const [timeRange, setTimeRange] = useState({ min: null, max: null });

  useEffect(() => {
    fetch('src/utils/data.json')
      .then(response => response.json())
      .then(data => {
        setRaceData(data);
        
        // Extract time range from metadata
        const startTime = new Date(data.metadata.time_range.start);
        const endTime = new Date(data.metadata.time_range.end);
        setTimeRange({
          min: startTime,
          max: endTime
        });
      })
      .catch(error => console.error('Error loading race data:', error));
  }, []);

  return {
    raceData,
    minTime: timeRange.min,
    maxTime: timeRange.max,
  };
}

export default useRaceData;