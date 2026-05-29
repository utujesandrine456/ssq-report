"use client";

import React from "react";
import { useAttendanceStore } from "@/store/attendance-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

const fieldLabels: Record<string, string> = {
  abanditswe: "Abanditswe",
  abaje: "Abaje",
  abizeKarindwi: "Abize Karindwi",
  abatangiyeIsabato: "Abatangiye Isabato",
  abasuye: "Abasuye",
  abasuwe: "Abasuwe",
  abafashije: "Abafashije",
  abafashijwe: "Abafashijwe",
  abarwayi: "Abarwayi",
  abasibye: "Abasibye",
  abafiteImpamvu: "Abafite Impamvu",
  abashyitsi: "Abashyitsi",
};

const allFields = [
  "abanditswe",
  "abaje",
  "abizeKarindwi",
  "abatangiyeIsabato",
  "abasuye",
  "abasuwe",
  "abafashije",
  "abafashijwe",
  "abarwayi",
  "abasibye",
  "abafiteImpamvu",
  "abashyitsi",
];

export default function Home() {
  const router = useRouter();
  const {
    reportDate,
    families,
    setReportDate,
    updateFamilyData,
    getTransformedData,
    initializeFromStorage,
  } = useAttendanceStore();

  React.useEffect(() => {
    initializeFromStorage();
  }, [initializeFromStorage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const transformedData = getTransformedData();
    sessionStorage.setItem("attendanceData", JSON.stringify([transformedData]));
    sessionStorage.setItem("reportDate", reportDate);
    router.push("/generate");
  };

  
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto py-12 sm:py-24 px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="mx-auto w-full text-balance text-center font-semibold tracking-tight text-neutral-900 max-w-2xl text-2xl leading-[1.2]! sm:text-4xl md:text-5xl">
            RCA-SDA Sabbath School Report Generator
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-5 w-5 text-gray-600" />
                <div className="flex-1">
                  <Label htmlFor="reportDate" className="text-sm font-medium">
                    Report Date
                  </Label>
                  <Input
                    id="reportDate"
                    type="date"
                    value={reportDate}
                    onChange={(e) => setReportDate(e.target.value)}
                    className="mt-1 max-w-xs"
                    required
                  />
                </div>
              </div>
              <CardTitle className="text-2xl">Attendance Data</CardTitle>
              <CardDescription>
                Fill in the attendance data for all families
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {families.map((family, familyIndex) => (
                  <div key={familyIndex} className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                      {family.name}
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {allFields.map((field) => (
                        <div key={field} className="space-y-1">
                          <Label
                            htmlFor={`${familyIndex}-${field}`}
                            className="text-xs font-medium text-gray-700"
                          >
                            {fieldLabels[field]}
                          </Label>
                          <Input
                            id={`${familyIndex}-${field}`}
                            type="number"
                            min="0"
                            value={family[field as keyof typeof family] || 0}
                            onChange={(e) =>
                              updateFamilyData(
                                familyIndex,
                                field as keyof typeof family,
                                parseInt(e.target.value) || 0,
                              )
                            }
                            className="w-full h-8 text-sm"
                            required
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center pt-8">
                <Button
                  type="submit"
                  className="group relative flex items-center gap-3 px-8 py-6 text-lg font-medium bg-linear-to-br! from-gray-900! to-gray-950! text-white rounded-xl transition-all duration-200 hover:shadow-md overflow-hidden"
                >
                  <div className="absolute inset-0 bg-linear-to-b from-gray-900/30 to-transparent pointer-events-none" />
                  <span className="relative z-10 font-medium text-[16px]">
                    Generate Report
                  </span>
                  <div className="relative z-10 bg-white rounded-full flex items-center justify-center size-4 transition-all duration-200 group-hover:translate-x-1">
                    <ArrowRight color="black" className="size-3" />
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
