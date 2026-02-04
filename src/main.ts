import './style.css';
import { initMap, geocodeZipCode, showLocationOnMap } from './map';
import { getSnowfallData, getCategoryColor } from './data/snowfall';

// Initialize map when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initMap();
  setDefaultDate();
  setupFormHandler();
});

function setDefaultDate(): void {
  const dateInput = document.getElementById('date') as HTMLInputElement;
  if (dateInput) {
    // Default to today's date
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
  }
}

function setupFormHandler(): void {
  const form = document.getElementById('lookup-form') as HTMLFormElement;
  const resultDiv = document.getElementById('result') as HTMLDivElement;
  const resultContent = document.getElementById('result-content') as HTMLDivElement;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const zipcodeInput = document.getElementById('zipcode') as HTMLInputElement;
    const dateInput = document.getElementById('date') as HTMLInputElement;

    const zipCode = zipcodeInput.value.trim();
    const date = dateInput.value;

    if (!zipCode || !date) {
      showError('Please enter both zip code and date');
      return;
    }

    // Show loading state
    resultDiv.classList.remove('hidden');
    resultContent.innerHTML = '<p class="loading">Looking up snowfall data...</p>';

    // Get snowfall data
    const snowfallData = getSnowfallData(zipCode);

    // Geocode the zip code
    const location = await geocodeZipCode(zipCode);

    if (!location) {
      showError(`Could not find location for zip code ${zipCode}`);
      return;
    }

    // Format the date for display
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Show on map
    showLocationOnMap(location.lat, location.lng, snowfallData, formattedDate);

    // Display result
    const color = getCategoryColor(snowfallData.category);
    resultContent.innerHTML = `
      <div class="result-card" style="border-left-color: ${color}">
        <h2>${snowfallData.areaName}</h2>
        <div class="result-details">
          <div class="result-item">
            <span class="label">Date</span>
            <span class="value">${formattedDate}</span>
          </div>
          <div class="result-item snowfall">
            <span class="label">Snowfall Amount</span>
            <span class="value large" style="color: ${color}">${snowfallData.amount}</span>
          </div>
          <div class="result-item">
            <span class="label">Category</span>
            <span class="value category" style="background-color: ${color}; color: ${color === '#ffcc00' ? '#333' : 'white'}">${snowfallData.category}</span>
          </div>
        </div>
      </div>
    `;
  });
}

function showError(message: string): void {
  const resultDiv = document.getElementById('result') as HTMLDivElement;
  const resultContent = document.getElementById('result-content') as HTMLDivElement;

  resultDiv.classList.remove('hidden');
  resultContent.innerHTML = `<p class="error">${message}</p>`;
}
