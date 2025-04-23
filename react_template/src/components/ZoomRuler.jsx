// ZoomRuler.jsx
import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';

const ZoomRuler = () => {
  const map = useMap();
  const [scale, setScale] = useState({
    width: 100,
    distance: 0
  });

  useEffect(() => {
    const updateScale = () => {
      const center = map.getCenter();
      const centerPoint = map.project(center);
      const targetPoint = centerPoint.add([100, 0]);
      const targetLatLng = map.unproject(targetPoint);
      const distance = center.distanceTo(targetLatLng);
      
      // Round to a nice number
      let roundedDistance;
      if (distance >= 1000) {
        roundedDistance = Math.round(distance / 1000) + ' km';
      } else {
        roundedDistance = Math.round(distance) + ' m';
      }

      setScale({
        width: 100,
        distance: roundedDistance
      });
    };

    updateScale();
    map.on('zoomend', updateScale);
    
    return () => {
      map.off('zoomend', updateScale);
    };
  }, [map]);

  return (
    <div className="absolute bottom-8 left-4 z-[1000] bg-white px-2 py-1 rounded-md shadow-lg">
      <div className="flex flex-col items-center">
        <div className="w-[100px] h-1 bg-gray-800" />
        <div className="text-sm text-gray-700 mt-1">{scale.distance}</div>
      </div>
    </div>
  );
};

export default ZoomRuler;