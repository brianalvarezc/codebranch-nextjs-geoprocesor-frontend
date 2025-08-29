import React, { useState } from 'react';
import { CoordinatePair } from './CoordinatePair';
import { Button } from '@/src/components/Button';
import { Point } from '../types';

interface CoordinateListProps {
  onProcess: (points: Point[]) => void;
  loading: boolean;
}

export const CoordinateList: React.FC<CoordinateListProps> = ({ onProcess, loading }) => {
  const [coordinates, setCoordinates] = useState<Point[]>([
    { lat: 0, lng: 0 },
  ]);

  const handleLatChange = (idx: number, value: number) => {
    const updated = [...coordinates];
    updated[idx].lat = value;
    setCoordinates(updated);
  };

  const handleLngChange = (idx: number, value: number) => {
    const updated = [...coordinates];
    updated[idx].lng = value;
    setCoordinates(updated);
  };

  const addPair = () => {
    setCoordinates([...coordinates, { lat: 0, lng: 0 }]);
  };

  const removePair = (idx: number) => {
    setCoordinates(coordinates.filter((_, i) => i !== idx));
  };

  const canProcess = coordinates.length >= 1 && coordinates.every(c => c.lat !== 0 && c.lng !== 0);

  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded shadow min-w-[250px]">
      <h2 className="text-lg font-semibold mb-2">Coordinates</h2>
      {coordinates.map((coord, idx) => (
        <CoordinatePair
          key={idx}
          lat={coord.lat}
          lng={coord.lng}
          onLatChange={val => handleLatChange(idx, val)}
          onLngChange={val => handleLngChange(idx, val)}
          removable={idx >= 1}
          onRemove={() => removePair(idx)}
        />
      ))}
      <Button type="button" onClick={addPair} className="w-full bg-green-500 hover:bg-green-600 mt-2">
        + Add point
      </Button>
      <Button
        type="button"
        onClick={() => onProcess(coordinates)}
        disabled={!canProcess || loading}
        className={`w-full mt-2 ${canProcess ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
      >
        {loading ? 'Processing...' : 'Process'}
      </Button>
    </div>
  );
};
