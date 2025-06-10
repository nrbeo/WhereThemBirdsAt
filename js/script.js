document.addEventListener("DOMContentLoaded", () => {
  const map = L.map('map-container').setView([55.5, 21.0], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  fetch("data/bird_data.csv")
    .then(response => response.text())
    .then(csvText => {
      const rows = csvText.trim().split("\n").slice(1);
      const birds = [];

      rows.forEach(row => {
        const [species, latStr, lonStr, dateStr] = row.split(",").map(cell => cell.trim());

        const lat = parseFloat(latStr);
        const lon = parseFloat(lonStr);
        const date = new Date(dateStr);

        if (!isNaN(lat) && !isNaN(lon)) {
          birds.push({ species, lat, lon, date });
          L.marker([lat, lon])
            .addTo(map)
            .bindPopup(`<strong>${species}</strong><br>${date.toLocaleString()}`);
        }
      });

      document.getElementById("total-birds").textContent = `Total Birds Identified: ${birds.length}`;

      const counts = birds.reduce((acc, bird) => {
        acc[bird.species] = (acc[bird.species] || 0) + 1;
        return acc;
      }, {});

      const mostCommon = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
      const latest = birds.sort((a, b) => b.date - a.date)[0];

      document.getElementById("common-bird").textContent = `Most Common Bird: ${mostCommon}`;
      document.getElementById("latest-sighting").textContent = `Last Sighting: ${latest?.species} on ${latest?.date.toLocaleString()}`;
    })
    .catch(error => console.error("Error loading CSV:", error));
});
