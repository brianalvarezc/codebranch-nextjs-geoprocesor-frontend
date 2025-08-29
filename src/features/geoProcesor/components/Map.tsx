"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Polygon, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Point } from "../types";
import L from "leaflet";

function FitBounds({ bounds }: { bounds?: { north: number; south: number; east: number; west: number } }) {
  const map = useMap();
  React.useEffect(() => {
    if (bounds) {
      const leafletBounds = L.latLngBounds(
        [bounds.south, bounds.west],
        [bounds.north, bounds.east]
      );
      map.fitBounds(leafletBounds, { padding: [20, 20] });
    }
  }, [bounds, map]);
  return null;
}

// 🔧 Fix para los íconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

interface MapProps {
  points: Point[];
  centroid?: Point;
  bounds?: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}

export const Map: React.FC<MapProps> = ({ points, centroid, bounds }) => {
  const center = centroid || (points.length ? points[0] : { lat: 0, lng: 0 });
  const bbox = bounds
    ? [
        [bounds.north, bounds.west],
        [bounds.north, bounds.east],
        [bounds.south, bounds.east],
        [bounds.south, bounds.west],
      ]
    : undefined;

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={3}
      style={{ height: "400px", width: "100%" }}
      className="rounded shadow"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {points.map((p, idx) => (
        <Marker key={idx} position={[p.lat, p.lng]}>
          <Popup>
            Point {idx + 1} <br /> ({p.lat}, {p.lng})
          </Popup>
        </Marker>
      ))}

      {centroid && (
        <Marker position={[centroid.lat, centroid.lng]}>
          <Popup>Centroid</Popup>
        </Marker>
      )}

      {bbox && (
        <Polygon
          positions={bbox.map(
            ([lat, lng]) => [lat, lng] as [number, number]
          )}
          color="red"
        />
      )}

      {bounds && <FitBounds bounds={bounds} />}
    </MapContainer>
  );
};
