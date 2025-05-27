document.addEventListener("DOMContentLoaded", () => {
  fetch("data/sample_bird_data.csv")
    .then(response => response.text())
    .then(csvText => {
      const rows = csvText.trim().split("\n").slice(1); // Skip header
      const birds = rows.map(row => {
        const [species, lat, lon, date] = row.split(",");
        return { species, lat: parseFloat(lat), lon: parseFloat(lon), date: new Date(date) };
      });

      // Total birds
      document.getElementById("total-birds").textContent = `Total Birds Identified: ${birds.length}`;

      // Most common bird
      const counts = birds.reduce((acc, bird) => {
        acc[bird.species] = (acc[bird.species] || 0) + 1;
        return acc;
      }, {});
      const mostCommon = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
      document.getElementById("common-bird").textContent = `Most Common Bird: ${mostCommon}`;

      // Most recent sighting
      const latest = birds.sort((a, b) => b.date - a.date)[0];
      document.getElementById("latest-sighting").textContent = `Most Recent Sighting: ${latest.species} on ${latest.date.toLocaleString()}`;
    })
    .catch(error => {
      console.error("Error loading CSV:", error);
    });
});
