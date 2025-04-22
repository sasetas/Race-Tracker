// components/BoatsInfoPanel.jsx
import React from 'react';

function BoatsInfoPanel({boatColors, visibleBoats, onToggleBoat, currentTimeRaceData }) {
//   const calculateSpeed = (boat) => {
//     const currentPositionIndex = boat.positions.findIndex(pos => pos.timestamp > currentTime) - 1;
//     if (currentPositionIndex < 0) return 0;
    
//     const currentPos = boat.positions[currentPositionIndex];
//     const prevPos = boat.positions[Math.max(0, currentPositionIndex - 1)];
    
//     if (!currentPos || !prevPos) return 0;

//     const distance = calculateDistance(
//       prevPos.latitude, prevPos.longitude,
//       currentPos.latitude, currentPos.longitude
//     );
//     const timeDiff = currentPos.timestamp - prevPos.timestamp;
//     return ((distance / timeDiff) * 3600).toFixed(1); // Convert to km/h
//   };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const toRad = (value) => value * Math.PI / 180;

  return (
    <div className="absolute z-[1001] top-4 right-4 bg-white p-4 rounded shadow-lg max-h-[80vh] overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Boats Information</h2>
      <div className="space-y-4">
        {Object.keys(currentTimeRaceData)?.map(id => (
          <div key={id} className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={visibleBoats[id]}
              onClick={() => onToggleBoat(id)}
            />
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: boatColors[id] }}
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">{id}</span>
                <span className="text-sm text-gray-600">
                  {currentTimeRaceData[id].speed} km/h
                </span>
              </div>
              
              {/* <button
                onClick={() => onToggleBoat(boat)}
                className={`text-sm ${
                  visibleBoats[boat] ? 'text-blue-500' : 'text-gray-400'
                }`}
              >
                {visibleBoats[boat] ? 'Hide' : 'Show'}
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoatsInfoPanel;