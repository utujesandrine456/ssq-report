import { familyData } from "../data/data";

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
    (stats.abafashije / stats.abanditswe) * 100,
  ];

  const sumOfPercentages = percentages.reduce(
    (sum, percentage) => sum + percentage,
    0
  );
  return (sumOfPercentages / 500) * 100;
};

export const calculateChurchTotals = (data: familyData[]): familyData[] => {
  return data.map((weekData) => {
    const churchTotals = {
      abanditswe: 0,
      abaje: 0,
      abizeKarindwi: 0,
      abatangiyeIsabato: 0,
      abasuye: 0,
      abasuwe: 0,
      abafashijwe: 0,
      abafashije: 0,
      abarwayi: 0,
      abasibye: 0,
      abafiteImpamvu: 0,
      abashyitsi: 0,
    };

    // the family totals
    Object.values(weekData).forEach((familyStats) => {
      Object.keys(churchTotals).forEach((key) => {
        churchTotals[key as keyof typeof churchTotals] +=
          familyStats[key as keyof typeof familyStats];
      });
    });

    // return the original data with church totals added
    return {
      ...weekData,
      church: churchTotals,
    };
  });
};
