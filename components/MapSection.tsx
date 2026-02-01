
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapSectionProps {
  koordinat: string;
  onChange?: (koordinat: string) => void;
}

// Fix untuk Leaflet icon di React
const defaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Component untuk handle map click events
const MapClickHandler: React.FC<{ onCoordinateChange: (lat: number, lng: number) => void }> = ({ onCoordinateChange }) => {
  useMapEvents({
    click: (e) => {
      onCoordinateChange(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const MapSection: React.FC<MapSectionProps> = ({ koordinat, onChange }) => {
  const [position, setPosition] = useState<[number, number]>([-6.2088, 106.8456]); // Default: Jakarta
  const [searchInput, setSearchInput] = useState('');

  // Parse koordinat dari string
  useEffect(() => {
    if (koordinat && koordinat.includes(',')) {
      const [lat, lng] = koordinat.split(',').map(coord => parseFloat(coord.trim()));
      if (!isNaN(lat) && !isNaN(lng)) {
        setPosition([lat, lng]);
      }
    }
  }, [koordinat]);

  const handleCoordinateChange = (lat: number, lng: number) => {
    setPosition([lat, lng]);
    const koordinatString = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    if (onChange) {
      onChange(koordinatString);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchInput)}&format=json&limit=1`
      );
      const data = await response.json();
      
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        setPosition([lat, lng]);
        setSearchInput('');
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 h-full flex flex-col">
      <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">map</span>
        Titik Lokasi (Pin Point)
      </h3>
      <p className="text-sm text-gray-500 mb-4">Klik pada peta atau cari lokasi untuk mendapatkan koordinat presisi.</p>
      
      {/* Map Container */}
      <div className="flex-1 min-h-[350px] relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 mb-4">
        {/* Search bar on map */}
        <form onSubmit={handleSearch} className="absolute top-4 left-4 right-4 z-10">
          <div className="flex items-center bg-white dark:bg-gray-900 rounded-lg shadow-lg px-3 py-2 border border-gray-200 dark:border-gray-700">
            <span className="material-symbols-outlined text-gray-400">search</span>
            <input 
              className="w-full border-none focus:ring-0 text-sm bg-transparent dark:text-white outline-none" 
              placeholder="Cari lokasi atau nama jalan..." 
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </form>

        {/* Leaflet Map */}
        <MapContainer 
          center={position} 
          zoom={15} 
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} icon={defaultIcon} />
          <MapClickHandler onCoordinateChange={handleCoordinateChange} />
        </MapContainer>
      </div>

      {/* Koordinat Display */}
      <div className="p-3 bg-primary/5 dark:bg-primary/10 rounded-lg flex items-center justify-between border border-primary/20">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-gray-500">Koordinat</span>
          <span className="text-sm font-mono">{position[0].toFixed(6)}, {position[1].toFixed(6)}</span>
        </div>
        <button 
          className="text-primary text-xs font-bold hover:underline"
          onClick={() => navigator.clipboard.writeText(`${position[0].toFixed(6)}, ${position[1].toFixed(6)}`)}
        >
          SALIN
        </button>
      </div>
    </div>
  );
};

export default MapSection;
