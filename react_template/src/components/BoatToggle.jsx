import React from 'react';

function BoatToggle({ boats, onToggle}) {
  console.log(boats);
  return (
    <div>
      <h2>Toggle Boats</h2>
      {Object.keys(boats)?.map((id) => (
        <div key={id}>
          <label>
            <input
              type="checkbox"
              checked={boats[id]}
              onChange={() => onToggle(id)}
            />
            Boat {id}
          </label>
        </div>
      ))}
    </div>
  );
}

export default BoatToggle;