document.addEventListener("DOMContentLoaded", () => {
  const birds = [
    { species: "Erithacus rubecula", date: "2025-05-25 09:15" },
    { species: "Erithacus rubecula", date: "2025-05-25 10:30" },
    { species: "Circus aeruginosus", date: "2025-05-26 14:30" }
  ];

  document.getElementById("total-birds").textContent = `Total Birds Identified: ${birds.length}`;
  
  const counts = birds.reduce((acc, bird) => {
    acc[bird.species] = (acc[bird.species] || 0) + 1;
    return acc;
  }, {});

  const mostCommon = Object.entries(counts).sort((a,b) => b[1]-a[1])[0][0];
  document.getElementById("common-bird").textContent = `Most Common Bird: ${mostCommon}`;

  const latest = birds.sort((a,b) => new Date(b.date) - new Date(a.date))[0];
  document.getElementById("latest-sighting").textContent = `Most Recent Sighting: ${latest.species} on ${latest.date}`;
});
