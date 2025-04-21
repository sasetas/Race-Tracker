// src/components/Map.jsx
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import { Icon } from "leaflet";

function Map({ boats, bounds, currentTime }) {
  // Calculate center and zoom based on bounds
  const center = [
    (bounds.latitude.min + bounds.latitude.max) / 2,
    (bounds.longitude.min + bounds.longitude.max) / 2,
  ];
  const boatsIDs = Object.keys(boats);

  // Convert coordinates for Leaflet (swap lat/lng)
  // const pathPositions = path.map((coord) => [coord[1], coord[0]]);
  // const markerPosition = currentPosition
  //   ? [currentPosition[1], currentPosition[0]]
  //   : null;

  return (
    <MapContainer center={center} zoom={12} className="w-full h-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {boatsIDs.map((id) => (
        <DrawBoatCourse
          boatData={boats[id]} currentTime={currentTime}
        />
      ))}
    </MapContainer>
  );
}

function DrawBoatCourse({ boatData, currentTime }) {
  const boatIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1785/1785210.png",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
  const path=boatData.track.coordinates.map((coord) => [
    coord[1],
    coord[0],
  ]);
  const position=boatData.timepoints[0].position
  // Function to draw the boat's course on the map
  // This function will be called when the boat's position is updated
  // You can use the Polyline component from react-leaflet to draw the path
  const currentPosition = currentTime
    ? getPositionAtTime(boatData.timepoints, currentTime)
    : position;
    const markerPosition = currentPosition ? [currentPosition[1], currentPosition[0]] : null;

  // Function to generate random colors
  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    console.log(color);
    return color;
  };
  function getPositionAtTime(timepoints, targetTime) {
    // Find the closest timepoint
    const closestPoint = timepoints.reduce((prev, curr) => {
      const prevDiff = Math.abs(new Date(prev.timestamp) - targetTime);
      const currDiff = Math.abs(new Date(curr.timestamp) - targetTime);
      return currDiff < prevDiff ? curr : prev;
    });

    return closestPoint.position;
  }

  return (
    <>
      {/* <div key={boatData.boatID}> */}
        {/* Draw the boat's path */}
        <Polyline positions={path} color={generateRandomColor()} />
        {/* Mark the boat's current position */}
        <Marker
          position={markerPosition}
          icon={boatIcon}
        />
          {/* <div
            style={{
              backgroundColor: generateRandomColor(),
              padding: "5px",
              borderRadius: "50%",
            }}
          >
            {boatData.boatID}
          </div> */}
      {/* </div> */}
    </>
  );
}

export default Map;
