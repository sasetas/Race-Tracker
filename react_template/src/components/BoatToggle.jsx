import React from 'react';

function BoatToggle({ boats, toggleBoatVisibility }) {
  return (
    <div>
      <h2>Toggle Boats</h2>
      {boats?.map(({boatID, isVisible}) => (
        <div key={boatID}>
          <label>
            <input
              type="checkbox"
              checked={isVisible}
              onChange={() => toggleBoatVisibility(Number(boatID))}
            />
            Boat {boatID}
          </label>
        </div>
      ))}
    </div>
  );
}

export default BoatToggle;