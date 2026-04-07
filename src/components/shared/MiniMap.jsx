import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for Leaflet's default marker icon not showing in React
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect } from "react";
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function ChangeView({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center[0] && center[1]) {
      map.setView(center, 16);

      map.invalidateSize();
    }
  }, [center, map]);

  return null;
}
function LocationMarker({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });
  return null;
}
const MiniMap = ({ position, setPosition }) => {
  if (!position.lat) return null;

  return (
    <div className="h-48 w-full rounded-xl overflow-hidden border border-slate-200 mb-6 shadow-inner">
      <MapContainer
        center={[position.lat, position.lng]}
        zoom={16}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker setPosition={setPosition} />

        <Marker position={[position.lat, position.lng]} />
        <ChangeView center={[position.lat, position.lng]} />
      </MapContainer>
    </div>
  );
};
export default MiniMap;
