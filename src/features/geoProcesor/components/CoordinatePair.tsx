import React from 'react';
import { Input } from '@/src/components/Input';

interface CoordinatePairProps {
  lat: number;
  lng: number;
  onLatChange: (value: number) => void;
  onLngChange: (value: number) => void;
  onRemove?: () => void;
  removable?: boolean;
}

export const CoordinatePair: React.FC<CoordinatePairProps> = ({ lat, lng, onLatChange, onLngChange, onRemove, removable }) => (
  <div className="flex items-center gap-2 mb-2">
    <Input
      value={lat}
      onChange={e => onLatChange(Number(e.target.value))}
      placeholder="Latitude"
      className="w-28"
    />
    <Input
      value={lng}
      onChange={e => onLngChange(Number(e.target.value))}
      placeholder="Longitude"
      className="w-28"
    />
    {removable && (
      <button
        type="button"
        className="ml-2 text-red-500 hover:text-red-700 text-xl font-bold"
        onClick={onRemove}
        aria-label="Remove coordinate"
      >
        &times;
      </button>
    )}
  </div>
);
