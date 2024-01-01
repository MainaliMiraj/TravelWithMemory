import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeoLocation } from "../hooks/useGeolocation";
import useUrlPosition from "../hooks/useUrlPosition";

function Map() {
  const [mapLat,mapLng]=useUrlPosition()
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: GeoLocationPosition,
    getPosition,
  } = useGeoLocation();
  
  

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (GeoLocationPosition)
        setMapPosition([GeoLocationPosition.lat, GeoLocationPosition.lng]);
    },
    [GeoLocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!GeoLocationPosition&&<button type="position" onClick={getPosition} style={{ padding: "1%" }}>
        {isLoadingPosition ? "Loading..." : "Use your position"}
      </button>}
      <MapContainer
        center={mapPosition}
        // center={[mapLat,mapLng]}
        zoom={13}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });
}

export default Map;
