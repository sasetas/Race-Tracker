// src/App.jsx
import { useEffect, useMemo, useState } from "react";
import Map from "./components/Map";
import Timeline from "./components/Timeline";
import useRaceData from "./utils/useRaceData";
import BoatsInfoPanel from "./components/BoatsInfoPanel";
import { MapContainer, TileLayer } from "react-leaflet";

function App() {
  const { raceData, minTime, maxTime } = useRaceData();
  const [currentTime, setCurrentTime] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [boatsVisible, setBoatsVisible] = useState({});
  const [boatColors, setBoatColors] = useState({});
  const [center, setCenter] = useState(null);

  useEffect(() => {
    if (raceData && raceData.boats) {
      const boatsIDs = Object.keys(raceData.boats);
      var acc = {};
      const colors = {};
      boatsIDs.forEach((id) => {
        acc[id] = true; // Default all boats to visible
        colors[id] = generateRandomColor();
      });
      setBoatsVisible(acc);
      setBoatColors(colors);

      // Calculate center and zoom based on bounds
      setCenter([
        (raceData.metadata.geographic_bounds.latitude.min +
          raceData.metadata.geographic_bounds.latitude.max) /
          2,
        (raceData.metadata.geographic_bounds.longitude.min +
          raceData.metadata.geographic_bounds.longitude.max) /
          2,
      ]);
    }
  }, [raceData]);

  const filteredBoats = useMemo(() => {
    if (!raceData || !currentTime) return {};
    const allDataFilterd = {};
    Object.keys(raceData.boats).forEach((id) => {
      allDataFilterd[id] = {...raceData.boats[id]}
      

      allDataFilterd[id].timepoints = raceData.boats[id].timepoints.filter(
        (timepoint) => Date.parse(timepoint.timestamp) <= Date.parse(currentTime)
      )
       
    });
    return allDataFilterd;
  }, [currentTime, raceData]);

  const currentTimeRaceData = useMemo(() => {
    if (!raceData || !currentTime) return {};
    const allCurrentTimeData = {};
    Object.keys(raceData.boats).forEach((id) => {
      allCurrentTimeData[id] = getBoatCurrentTimeData(raceData.boats[id]);
    });
    return allCurrentTimeData;
  }, [raceData, currentTime]);

  function getPositionAtTime(timepoints, targetTime) {
    // Find the closest timepoint
    const closestPoint = timepoints.reduce((prev, curr) => {
      const prevDiff = Math.abs(new Date(prev.timestamp) - targetTime);
      const currDiff = Math.abs(new Date(curr.timestamp) - targetTime);
      return currDiff < prevDiff ? curr : prev;
    });
    return closestPoint;
  }

  function getBoatCurrentTimeData(boat) {
    return currentTime
      ? getPositionAtTime(boat.timepoints, currentTime)
      : position;
  }

  // Function to generate random colors
  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const toggleBoatVisibility = (id) => {
    setBoatsVisible((prevBoats) => ({
      ...prevBoats,
      [id]: !prevBoats[id],
    }));
  };

  if (!raceData || !minTime || !maxTime || !center) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="text-xl">Loading race data...</div>
      </div>
    );
  } else {
    return (
      <div className="h-screen w-screen flex flex-col">
        <div className="p-4 bg-blue-900 text-white">
          <h1 className="text-2xl font-bold">Boat Race Tracker</h1>
        </div>
        <div className="flex-1 relative">
          <MapContainer center={center} zoom={12} className="w-full h-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Map
              boats={filteredBoats}
              boatsToDraw={Object.keys(boatsVisible).filter(
                (id) => boatsVisible[id] === true
              )}
              boatColors={boatColors}
              currentTimeRaceData={currentTimeRaceData}
            />
          </MapContainer>
          <BoatsInfoPanel
            boatColors={boatColors}
            visibleBoats={boatsVisible}
            onToggleBoat={toggleBoatVisibility}
            currentTimeRaceData={currentTimeRaceData}
            currentTime={currentTime}
          />
        </div>
        <div className="p-4 bg-gray-100">
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
}

export default App;
