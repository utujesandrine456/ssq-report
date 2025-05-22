import Image from "next/image";
import { familyData } from "../data/data";
import { calculatePercentage } from "../util/calculations";

export default function AttendanceTable({ data }: { data: familyData }) {
  if (!data) return null;

  // church totals
  const churchTotals: familyData[string] = {
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

  // calculate totals from all families
  if (data["ebenezer"]) {
    Object.keys(churchTotals).forEach((key) => {
      churchTotals[key as keyof typeof churchTotals] +=
        data["ebenezer"][key as keyof typeof churchTotals];
    });
  }
  if (data["salvSibs"]) {
    Object.keys(churchTotals).forEach((key) => {
      churchTotals[key as keyof typeof churchTotals] +=
        data["salvSibs"][key as keyof typeof churchTotals];
    });
  }
  if (data["jehovahNissi"]) {
    Object.keys(churchTotals).forEach((key) => {
      churchTotals[key as keyof typeof churchTotals] +=
        data["jehovahNissi"][key as keyof typeof churchTotals];
    });
  }

  // type-safe access to family data
  const families: Record<string, familyData[string]> = {
    ebenezer: data["ebenezer"] || {
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
    },
    salvSibs: data["salvSibs"] || {
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
    },
    jehovahNissi: data["jehovahNissi"] || {
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
    },
    church: churchTotals || {
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
    },
  };

  return (
    <div className="w-full overflow-x-auto space-y-4 print:space-y-2">
      {/* attendance table */}
      <table className="w-full border-separate border-spacing-1 print:break-inside-avoid">
        <thead>
          <tr>
            <th className="border border-black bg-black text-white p-2 print:p-1 print:text-sm">
              FEATURES
            </th>
            <th className="border border-black bg-black text-white p-2 print:p-1 print:text-sm">
              EBENEZER
            </th>
            <th className="border border-black bg-black text-white p-2 print:p-1 print:text-sm">
              SALV SIBS
            </th>
            <th className="border border-black bg-black text-white p-2 print:p-1 print:text-sm">
              JEHOVAH-NISSI
            </th>
            <th className="border border-black bg-black text-white p-2 print:p-1 print:text-sm">
              CHURCH
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(families.ebenezer).map(([key]) => (
            <tr key={key} className="print:text-sm">
              <td className="border border-black p-2 print:p-1 uppercase">
                {key}
              </td>
              <td
                className={`border border-black p-2 print:p-1 text-center ${
                  key !== "abanditswe" &&
                  [
                    "abaje",
                    "abizeKarindwi",
                    "abatangiyeIsabato",
                    "abasuye",
                    "abafashije",
                  ].includes(key) &&
                  families.ebenezer[key as keyof typeof families.ebenezer] <
                    families.ebenezer.abanditswe / 2
                    ? "text-red-500"
                    : ""
                }`}
              >
                {families.ebenezer[key as keyof typeof families.ebenezer] === 0
                  ? "-"
                  : families.ebenezer[key as keyof typeof families.ebenezer]}
              </td>
              <td
                className={`border border-black p-2 print:p-1 text-center ${
                  key !== "abanditswe" &&
                  [
                    "abaje",
                    "abizeKarindwi",
                    "abatangiyeIsabato",
                    "abasuye",
                    "abafashije",
                  ].includes(key) &&
                  families.salvSibs[key as keyof typeof families.salvSibs] <
                    families.salvSibs.abanditswe / 2
                    ? "text-red-500"
                    : ""
                }`}
              >
                {families.salvSibs[key as keyof typeof families.salvSibs] === 0
                  ? "-"
                  : families.salvSibs[key as keyof typeof families.salvSibs]}
              </td>
              <td
                className={`border border-black p-2 print:p-1 text-center ${
                  key !== "abanditswe" &&
                  [
                    "abaje",
                    "abizeKarindwi",
                    "abatangiyeIsabato",
                    "abasuye",
                    "abafashije",
                  ].includes(key) &&
                  families.jehovahNissi[
                    key as keyof typeof families.jehovahNissi
                  ] <
                    families.jehovahNissi.abanditswe / 2
                    ? "text-red-500"
                    : ""
                }`}
              >
                {families.jehovahNissi[
                  key as keyof typeof families.jehovahNissi
                ] === 0
                  ? "-"
                  : families.jehovahNissi[
                      key as keyof typeof families.jehovahNissi
                    ]}
              </td>
              <td
                className={`border border-black p-2 print:p-1 text-center ${
                  key !== "abanditswe" &&
                  [
                    "abaje",
                    "abizeKarindwi",
                    "abatangiyeIsabato",
                    "abasuye",
                    "abafashije",
                  ].includes(key) &&
                  families.church[key as keyof typeof families.church] <
                    families.church.abanditswe / 2
                    ? "text-red-500"
                    : ""
                }`}
              >
                {families.church[key as keyof typeof families.church] === 0
                  ? "-"
                  : families.church[key as keyof typeof families.church]}
              </td>
            </tr>
          ))}
          <tr className="print:text-sm">
            <td className="border border-black p-2 print:p-1 uppercase">
              TOTAL PERCENT (%)
            </td>
            <td
              className={`border border-black p-2 print:p-1 text-center ${
                calculatePercentage(families.ebenezer) < 50
                  ? "text-red-500"
                  : ""
              }`}
            >
              {calculatePercentage(families.ebenezer).toFixed(2)}%
            </td>
            <td
              className={`border border-black p-2 print:p-1 text-center ${
                calculatePercentage(families.salvSibs) < 50
                  ? "text-red-500"
                  : ""
              }`}
            >
              {calculatePercentage(families.salvSibs).toFixed(2)}%
            </td>
            <td
              className={`border border-black p-2 print:p-1 text-center ${
                calculatePercentage(families.jehovahNissi) < 50
                  ? "text-red-500"
                  : ""
              }`}
            >
              {calculatePercentage(families.jehovahNissi).toFixed(2)}%
            </td>
            <td
              className={`border border-black p-2 print:p-1 text-center ${
                calculatePercentage(families.church) < 50 ? "text-red-500" : ""
              }`}
            >
              {calculatePercentage(families.church).toFixed(2)}%
            </td>
          </tr>
        </tbody>
      </table>

      {/* ranking table with church percentage */}
      <div className="pt-20">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <h1 className="font-bold text-2xl print:text-xl underline">
              RANKING
            </h1>
          </div>
          <div>
            <Image src="/sda_logo.svg" alt="logo" width={180} height={180} />
          </div>
        </div>
        <div className="flex gap-1 print:break-inside-avoid">
          <table className="w-[500px] border-separate border-spacing-1">
            <thead>
              <tr>
                <th className="border border-black bg-black text-white p-2 print:p-1 print:text-sm">
                  FAMILY
                </th>
                <th className="border border-black bg-black text-white p-2 print:p-1 print:text-sm">
                  PERCENTAGE
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(families)
                .filter(([key]) => key !== "church")
                .map(([family, stats]) => ({
                  name: family.toUpperCase(),
                  percentage: calculatePercentage(stats),
                }))
                .sort((a, b) => b.percentage - a.percentage)
                .map(({ name, percentage }) => (
                  <tr key={name} className="print:text-sm">
                    <td className="border border-black p-2 print:p-1">
                      {name}
                    </td>
                    <td
                      className={`border border-black p-2 print:p-1 text-center ${
                        percentage < 50 ? "text-red-500" : ""
                      }`}
                    >
                      {percentage.toFixed(2)}%
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <table className="border-separate border-spacing-1">
            <thead>
              <tr>
                <th className="border border-black bg-black text-white p-2 print:p-1 print:text-sm">
                  CHURCH
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="print:text-sm">
                <td
                  className={`border border-black p-2 print:p-1 text-center ${
                    calculatePercentage(families.church) < 50
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  {calculatePercentage(families.church).toFixed(2)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
