"use client";
import React, { useState } from 'react';
import { CoordinateList } from '@/src/features/geoProcesor/components/CoordinateList';
import { Loading } from '@/src/features/geoProcesor/components/Loading';
import { Point } from '@/src/features/geoProcesor/types';
import { geoProcesorService } from '@/src/features/geoProcesor/services/geoProcesorService';

import dynamic from "next/dynamic";

const Map = dynamic(
  () => import("@/src/features/geoProcesor/components/Map").then(mod => mod.Map),
  { ssr: false }
);

export default function GeoProcesorPage() {
  const [points, setPoints] = useState<Point[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    centroid?: Point;
    bounds?: {
      north: number;
      south: number;
      east: number;
      west: number;
    };
  }>({});

  const handleProcess = async (coords: Point[]) => {
    setLoading(true);
    setPoints(coords);
    try {
      const data = await geoProcesorService.processPoints(coords) as { centroid: Point; bounds: { north: number; south: number; east: number; west: number } };
      setResult({ centroid: data.centroid, bounds: data.bounds });
    } catch (err) {
      setResult({});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex flex-row w-full h-full">
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="flex flex-row w-full h-screen">
            {/* Panel izquierdo */}
            <aside className="w-1/4 h-full px-8 py-10 bg-white border-r border-gray-200 flex items-center justify-center shadow-lg">
              <CoordinateList onProcess={handleProcess} loading={loading} />
            </aside>

            {/* Panel derecho */}
            <main className="w-3/4 h-full flex items-center justify-center p-10">
              <div className="w-full h-full flex items-center justify-center rounded-xl shadow-xl bg-white">
                {loading ? (
                  <Loading />
                ) : (
                  <Map points={points} centroid={result.centroid} bounds={result.bounds} />
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );

}
