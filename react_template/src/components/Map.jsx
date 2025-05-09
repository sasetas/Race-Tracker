// src/components/Map.jsx
import {Polyline, Marker } from "react-leaflet";

import MapControls from "./MapControls";
import ZoomRuler from "./ZoomRuler";
import { useEffect } from "react";

function Map({ boats, boatsToDraw, boatColors, currentTimeRaceData }) {

  useEffect(() => {
    // Enable rotation on the map
    const map = document.querySelector('.leaflet-container')?._leaflet_map;
    if (map) {
      map.getBearing(0);
      map.rotate = true;
    }
  }, []);


  return (
    <>
    
      {boatsToDraw.map((id) => (
          <DrawBoatCourse
          boatData={boats[id]} boatColor={boatColors[id]} currentTimeBoatData={currentTimeRaceData[id]}
        />
      ))}
      <MapControls />
      <ZoomRuler />
    </>
  );
}

function DrawBoatCourse({ boatData, boatColor, currentTimeBoatData  }) {    
  const path=boatData.timepoints.map((timepoint) => [
    timepoint.position[1],
    timepoint.position[0],
  ]);
  
  const markerPosition = currentTimeBoatData && currentTimeBoatData.position
    ? [currentTimeBoatData.position[1], currentTimeBoatData.position[0]]
    : null;

  // A function that returns a DivIcon with a colored SVG canoe
const getBoatIcon = (color, direction) => {
  return L.divIcon({
    className: '', // Prevent Leaflet's default marker styling
    html: `
    <svg width="32" height="32" fill="${color}" style="
    transform: rotate(${direction-48}deg)" 
height="200px" width="200px" stroke="#000000" stroke-width="5" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 481.894 481.894" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M414.532,349.765l-53.934-10.38l-40.671-40.671c79.24-83.337,127.72-182.789,143.519-280.268 c-97.479,15.799-196.93,64.279-280.267,143.52l-40.671-40.671l-10.38-53.934L64.767,0L0,64.768l67.362,67.361l53.934,10.381 l40.671,40.671c-79.24,83.337-127.721,182.788-143.52,280.267c97.479-15.799,196.93-64.279,280.268-143.52l40.671,40.671 l10.381,53.934l67.361,67.361l64.767-64.767L414.532,349.765z M244.237,306.021c-9.13,9.13-21.269,14.159-34.179,14.159 c-12.917-0.001-25.056-5.029-34.185-14.159c-9.13-9.13-14.159-21.27-14.159-34.182s5.028-25.052,14.159-34.182l20.285-20.285 l21.213,21.213l-20.285,20.285c-3.464,3.464-5.372,8.07-5.372,12.969c0,4.899,1.908,9.505,5.372,12.969 c3.464,3.463,8.07,5.371,12.97,5.372c4.899,0,9.503-1.908,12.968-5.372l20.285-20.285l21.213,21.213L244.237,306.021z M285.735,264.523l-21.213-21.213l20.285-20.285c3.464-3.464,5.372-8.07,5.372-12.969c0-4.899-1.908-9.505-5.372-12.969 c-3.464-3.464-8.07-5.372-12.969-5.372c-4.898,0-9.504,1.908-12.969,5.372l-20.285,20.285l-21.213-21.213l20.285-20.285 c9.13-9.13,21.27-14.159,34.182-14.159c12.913,0,25.052,5.028,34.182,14.159s14.159,21.27,14.159,34.182 c0,12.912-5.029,25.051-14.159,34.182L285.735,264.523z"></path> </g></svg>
    `,
    iconAnchor: [20, 20] 
  });
};

  return (
    <>
        {/* Draw the boat's path */}
        <Polyline positions={path} color={boatColor} />
        {/* Mark the boat's current position */}
        <Marker
          position={markerPosition}
          icon={getBoatIcon(boatColor, currentTimeBoatData.direction)
          }
        />
    </>
  );
}

export default Map;
