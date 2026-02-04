import L from 'leaflet';
import { SnowfallData, getCategoryColor } from './data/snowfall';

let map: L.Map | null = null;
let marker: L.Marker | null = null;

// Initialize map centered on NC
export function initMap(): void {
  map = L.map('map').setView([35.5, -80.0], 8);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
}

interface GeocodingResult {
  lat: string;
  lon: string;
  display_name: string;
}

// Geocode zip code using Nominatim
export async function geocodeZipCode(zipCode: string): Promise<{ lat: number; lng: number; displayName: string } | null> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?postalcode=${zipCode}&country=US&format=json&limit=1`,
      {
        headers: {
          'User-Agent': 'NWS-Demo-Site/1.0'
        }
      }
    );

    const data: GeocodingResult[] = await response.json();

    if (data.length === 0) {
      return null;
    }

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
      displayName: data[0].display_name
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

// Show location on map with snowfall data
export function showLocationOnMap(
  lat: number,
  lng: number,
  snowfallData: SnowfallData,
  date: string
): void {
  if (!map) return;

  // Remove existing marker
  if (marker) {
    map.removeLayer(marker);
  }

  // Create custom icon based on category
  const color = getCategoryColor(snowfallData.category);
  const icon = L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color};
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 11px;
      color: ${color === '#ffcc00' ? '#333' : 'white'};
    ">${snowfallData.amount}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });

  // Add marker
  marker = L.marker([lat, lng], { icon }).addTo(map);

  // Add popup
  const popupContent = `
    <div class="popup-content">
      <h3>${snowfallData.areaName}</h3>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Snowfall:</strong> ${snowfallData.amount}</p>
      <p><strong>Category:</strong> <span style="color: ${color}; font-weight: bold;">${snowfallData.category}</span></p>
    </div>
  `;

  marker.bindPopup(popupContent).openPopup();

  // Pan to location
  map.setView([lat, lng], 11);
}
