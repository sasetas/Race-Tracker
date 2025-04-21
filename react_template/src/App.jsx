// src/App.jsx
import { useEffect, useMemo, useState } from 'react';
import Map from './components/Map';
import Timeline from './components/Timeline';
import useRaceData from './utils/useRaceData';
import BoatToggle from './components/BoatToggle';

function App() {
  const { raceData, minTime, maxTime } = useRaceData();
  const [currentTime, setCurrentTime] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [boatsVisible, setBoatsVisible] = useState({});
  
  useEffect(() => {
    if (raceData && raceData.boats) {
      const boatsIDs = Object.keys(raceData.boats);
      var acc = {};
      boatsIDs.forEach((id) => {
        acc[id] = true; // Default all boats to visible
      });
      setBoatsVisible(acc);
    }
  }, [raceData]);
  
  const toggleBoatVisibility = (id) => {
    setBoatsVisible((prevBoats) => ({
      ...prevBoats,
      [id]: !prevBoats[id],
    }));
  };

  if (!raceData || !minTime || !maxTime) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="text-xl">Loading race data...</div>
      </div>
    );
  }

  // Get the boat ID (using the first one in the data)
  const boatId = Object.keys(raceData.boats)[0];
  const boatData = raceData.boats;

  // Get position at current time
  // const currentPosition = currentTime 
  //   ? getPositionAtTime(boatData.timepoints, currentTime)
  //   : boatData.timepoints[0].position;

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="p-4 bg-blue-900 text-white">
        <h1 className="text-2xl font-bold">Boat Race Tracker</h1>
      </div>
      <div className="flex-1 relative">
        <Map
          boats={raceData.boats}
          boatsToDraw={Object.keys(boatsVisible).filter((id) => boatsVisible[id] === true)}
          bounds={raceData.metadata.geographic_bounds}
          currentTime={currentTime}
        />
      </div>
      <div className="p-4 bg-gray-100">
        <BoatToggle boats={boatsVisible} onToggle={toggleBoatVisibility} />
        <Timeline
          minTime={minTime}
          maxTime={maxTime}
          currentTime={currentTime}
          onTimeChange={setCurrentTime}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
        />
      </div>
    </div>
  );
}

export default App;