// MapControls.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
// import { ArrowsPointingInIcon, ArrowUpIcon } from '@heroicons/react/24/solid';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import "leaflet-rotate";

const MapControls = () => {
    const map = useMap();
  
    const handleRecenter = () => {
      if (map) {
        // Get the initial center from metadata
        const bounds = map.getBounds();
        const center = bounds.getCenter();
        map.setView(center, map.getZoom(), {
          animate: true,
          duration: 1
        });
        // Reset rotation
        map.setBearing(0);
      }
    };
  
    const handleCompassClick = () => {
      if (map) {
        // Smoothly animate back to 0° rotation
        const currentBearing = map.getBearing();
        const steps = 30;
        const stepSize = currentBearing / steps;
        let currentStep = 0;
  
        const rotateStep = () => {
          if (currentStep < steps) {
            map.setBearing(currentBearing - (stepSize * currentStep));
            currentStep++;
            requestAnimationFrame(rotateStep);
          }
        };
  
        rotateStep();
      }
    };
  
    return (
      <div className="absolute left-4 top-20 z-[1000] flex flex-col gap-2">
        <button
          onClick={handleCompassClick}
          className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
        //   style={{ transform: `rotate(${map?.getBearing() || 0}deg)` }}
        >
            <FontAwesomeIcon icon={faCoffee} className="h-6 w-6 text-gray-700" />
          {/* <ArrowUpIcon className="h-6 w-6 text-gray-700" /> */}
        </button>
        <button
          onClick={handleRecenter}
          className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
        >
            <FontAwesomeIcon icon={faCoffee} className="h-6 w-6 text-gray-700" />
          {/* <ArrowsPointingInIcon className="h-6 w-6 text-gray-700" /> */}
        </button>
      </div>
    );
  };
  
  export default MapControls;