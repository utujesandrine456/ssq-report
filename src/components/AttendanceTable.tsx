import Image from "next/image";
import { calculatePercentage } from "../util/calculations";

export interface familyData {
  [key: string]: {
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
  };
}

const fieldLabels: Record<string, string> = {
  abanditswe: "Abanditswe",
  abaje: "Abaje",
  abizeKarindwi: "Abize Karindwi",
  abatangiyeIsabato: "Abatangiye Isabato",
  abasuye: "Abasuye",
  abafashije: "Abafashije",
  abasuwe: "Abasuwe",
  abafashijwe: "Abafashijwe",
  abarwayi: "Abarwayi",
  abasibye: "Abasibye",
  abafiteImpamvu: "Abafite Impamvu",
  abashyitsi: "Abashyitsi",
};

export default function AttendanceTable({ data }: { data: familyData }) {
  if (!data) return null;

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

  const defaultFamilyData = {
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

  const families: Record<string, familyData[string]> = {
    ebenezer: data["ebenezer"] || defaultFamilyData,
    salvSibs: data["salvSibs"] || defaultFamilyData,
    jehovahNissi: data["jehovahNissi"] || defaultFamilyData,
    church: churchTotals,
  };

  return (
    <div className="w-full space-y-6 print:space-y-2">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden print:shadow-none print:text-base">
          <thead>
            <tr className="bg-linear-to-r from-gray-900 to-gray-950">
              <th className="border border-gray-300 text-white p-4 print:p-3 print:text-base font-semibold text-left">
                FEATURES
              </th>
              <th className="border border-gray-300 text-white p-4 print:p-3 print:text-base font-semibold text-center">
                EBENEZER
              </th>
              <th className="border border-gray-300 text-white p-4 print:p-3 print:text-base font-semibold text-center">
                SALVATION SIBLINGS
              </th>
              <th className="border border-gray-300 text-white p-4 print:p-3 print:text-base font-semibold text-center">
                JEHOVAH-NISSI
              </th>
              <th className="border border-gray-300 text-white p-4 print:p-3 print:text-base font-semibold text-center">
                CHURCH TOTAL
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {Object.entries(families.ebenezer)
              .filter(([key]) => key !== "name")
              .map(([key], index) => (
                <tr
                  key={key}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 print:hover:bg-transparent transition-colors`}
                >
                  <td className="border border-gray-300 p-4 print:p-2 print:text-sm font-medium text-gray-900">
                    {fieldLabels[key] || key.toUpperCase()}
                  </td>
                  <td
                    className={`border border-gray-300 p-4 print:p-2 print:text-sm text-center font-medium ${
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
                        ? "text-red-600 bg-red-50"
                        : "text-gray-900"
                    }`}
                  >
                    {families.ebenezer[
                      key as keyof typeof families.ebenezer
                    ] === 0
                      ? "—"
                      : families.ebenezer[
                          key as keyof typeof families.ebenezer
                        ]}
                  </td>
                  <td
                    className={`border border-gray-300 p-4 print:p-2 print:text-sm text-center font-medium ${
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
                        ? "text-red-600 bg-red-50"
                        : "text-gray-900"
                    }`}
                  >
                    {families.salvSibs[
                      key as keyof typeof families.salvSibs
                    ] === 0
                      ? "—"
                      : families.salvSibs[
                          key as keyof typeof families.salvSibs
                        ]}
                  </td>
                  <td
                    className={`border border-gray-300 p-4 print:p-2 print:text-sm text-center font-medium ${
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
                        ? "text-red-600 bg-red-50"
                        : "text-gray-900"
                    }`}
                  >
                    {families.jehovahNissi[
                      key as keyof typeof families.jehovahNissi
                    ] === 0
                      ? "—"
                      : families.jehovahNissi[
                          key as keyof typeof families.jehovahNissi
                        ]}
                  </td>
                  <td
                    className={`border border-gray-300 p-4 print:p-2 print:text-sm text-center font-bold ${
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
                        ? "text-red-600 bg-red-50"
                        : "text-gray-900"
                    }`}
                  >
                    {families.church[key as keyof typeof families.church] === 0
                      ? "—"
                      : families.church[key as keyof typeof families.church]}
                  </td>
                </tr>
              ))}
            <tr className="bg-linear-to-r from-gray-100 to-gray-200 font-bold">
              <td className="border border-gray-300 p-4 print:p-2 print:text-sm font-bold text-gray-900">
                TOTAL PERCENTAGE (%)
              </td>
              <td
                className={`border border-gray-300 p-4 print:p-2 print:text-sm text-center font-bold ${
                  calculatePercentage(families.ebenezer) < 50
                    ? "text-red-600"
                    : "text-gray-900"
                }`}
              >
                {calculatePercentage(families.ebenezer).toFixed(1)}%
              </td>
              <td
                className={`border border-gray-300 p-4 print:p-2 print:text-sm text-center font-bold ${
                  calculatePercentage(families.salvSibs) < 50
                    ? "text-red-600"
                    : "text-gray-900"
                }`}
              >
                {calculatePercentage(families.salvSibs).toFixed(1)}%
              </td>
              <td
                className={`border border-gray-300 p-4 print:p-2 print:text-sm text-center font-bold ${
                  calculatePercentage(families.jehovahNissi) < 50
                    ? "text-red-600"
                    : "text-gray-900"
                }`}
              >
                {calculatePercentage(families.jehovahNissi).toFixed(1)}%
              </td>
              <td
                className={`border border-gray-300 p-4 print:p-2 print:text-sm text-center font-bold ${
                  calculatePercentage(families.church) < 50
                    ? "text-red-600"
                    : "text-gray-900"
                }`}
              >
                {calculatePercentage(families.church).toFixed(1)}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="pt-6 print:pt-2">
        <div className="flex justify-between items-center mb-4 print:mb-1">
          <div>
            <h2 className="font-bold text-2xl print:text-xl text-gray-900 tracking-tight">
              FAMILY RANKING
            </h2>
          </div>
          <div className="shrink-0">
            <Image
              src="/sda_logo.svg"
              alt="SDA Logo"
              width={120}
              height={120}
              className="print:w-16 print:h-16"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="overflow-hidden rounded-lg shadow-lg print:shadow-none">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-linear-to-r from-gray-900 to-gray-950">
                  <th className="border border-gray-300 text-white p-4 print:p-3 print:text-base font-semibold text-left">
                    FAMILY
                  </th>
                  <th className="border border-gray-300 text-white p-4 print:p-3 print:text-base font-semibold text-center">
                    PERCENTAGE
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {Object.entries(families)
                  .filter(([key]) => key !== "church")
                  .map(([family, stats]) => ({
                    name:
                      family === "salvSibs"
                        ? "SALVATION SIBLINGS"
                        : family.toUpperCase(),
                    percentage: calculatePercentage(stats),
                  }))
                  .sort((a, b) => b.percentage - a.percentage)
                  .map(({ name, percentage }, index) => (
                    <tr
                      key={name}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100 print:hover:bg-transparent transition-colors`}
                    >
                      <td className="border border-gray-300 p-4 print:p-2 print:text-sm font-medium text-gray-900">
                        {name}
                      </td>
                      <td
                        className={`border border-gray-300 p-4 print:p-2 print:text-sm text-center font-bold ${
                          percentage < 50 ? "text-red-600" : "text-gray-900"
                        }`}
                      >
                        {percentage.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="overflow-hidden rounded-lg shadow-lg print:shadow-none">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-linear-to-r from-gray-900 to-gray-950">
                  <th className="border border-gray-300 text-white p-4 print:p-3 print:text-base font-semibold text-center">
                    CHURCH OVERALL
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td
                    className={`border border-gray-300 p-8 print:p-4 text-center font-bold text-2xl print:text-xl ${
                      calculatePercentage(families.church) < 50
                        ? "text-red-600 bg-red-50"
                        : "text-gray-900 bg-gray-50"
                    }`}
                  >
                    {calculatePercentage(families.church).toFixed(1)}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
