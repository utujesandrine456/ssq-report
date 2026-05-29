export const calculatePercentage = (stats: {
  abanditswe: number;
  abaje: number;
  abizeKarindwi: number;
  abatangiyeIsabato: number;
  abasuye: number;
  abasuwe: number;
  abafashijwe: number;
  abafashije: number;
  abarwayi: number;
  abasibye: number;
  abafiteImpamvu: number;
  abashyitsi: number;
}): number => {
  if (stats.abanditswe === 0) return 0;

  const percentages = [
    (stats.abaje / stats.abanditswe) * 100,
    (stats.abizeKarindwi / stats.abanditswe) * 100,
    (stats.abatangiyeIsabato / stats.abanditswe) * 100,
    (stats.abasuye / stats.abanditswe) * 100,
    (stats.abasuwe / stats.abanditswe) * 100,
    (stats.abafashije / stats.abanditswe) * 100,
    (stats.abafashijwe / stats.abanditswe) * 100,
  ];

  const sumOfPercentages = percentages.reduce(
    (sum, percentage) => sum + percentage,
    0
  );
  return (sumOfPercentages / 700) * 100;
};
