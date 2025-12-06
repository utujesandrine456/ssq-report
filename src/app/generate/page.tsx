"use client";
import Image from "next/image";
import AttendanceTable, { familyData } from "@/components/AttendanceTable";
import CalendarCard from "@/components/CalendarCard";
import { useAttendanceStore } from "@/store/attendance-store";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { reportDate, initializeFromStorage } = useAttendanceStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [attendanceData, setAttendanceData] = useState<familyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    // Check URL parameters first (for PDF generation)
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get("data");
    const dateParam = urlParams.get("date");

    let dataLoaded = false;

    if (dataParam) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(dataParam));
        setAttendanceData([parsedData]);
        setIsDataReady(true);
        dataLoaded = true;
      } catch (error) {
        console.error("Error parsing URL data:", error);
      }
    }

    if (!dataLoaded) {
      // Fallback to sessionStorage
      const storedData = sessionStorage.getItem("attendanceData");
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setAttendanceData(parsedData);
          setIsDataReady(true);
        } catch (error) {
          console.error("Error parsing stored data:", error);
        }
      }
    }

    if (dateParam) {
      // Set date from URL parameter (for PDF generation)
      const { setReportDate } = useAttendanceStore.getState();
      setReportDate(decodeURIComponent(dateParam));
    } else {
      // Initialize the store with data from sessionStorage
      initializeFromStorage();
    }

    setIsLoading(false);
  }, [initializeFromStorage]);

  const handleGeneratePDF = async () => {
    if (!isDataReady || attendanceData.length === 0) {
      alert("Please wait for the data to load before generating PDF");
      return;
    }

    setIsGenerating(true);
    try {
      const dataParam = encodeURIComponent(JSON.stringify(attendanceData[0])); // Pass the first item, not the array
      const dateParam = encodeURIComponent(reportDate);
      const currentUrl = `${window.location.origin}${window.location.pathname}?data=${dataParam}&date=${dateParam}`;

      const response = await fetch(
        `${window.location.origin}/api/generate-pdf?url=${encodeURIComponent(
          currentUrl
        )}`,
        {
          method: "GET",
          headers: {
            Accept: "application/pdf",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `attendance-report-${reportDate}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 print:min-h-0">
      <div className="print:mx-0 print:my-0 mx-8 py-8 print:py-2">
        <style jsx global>{`
          @media print {
            @page {
              size: A4;
              margin: 0.3cm;
            }
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              background: white !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            .print\\:bg-white {
              background: white !important;
            }
            .print\\:compact {
              margin: 0 !important;
              padding: 0 !important;
            }
            .print\\:no-break {
              page-break-inside: avoid;
            }
            table td,
            table th {
              padding: 6px 8px !important;
              font-size: 14px !important;
              line-height: 1.4 !important;
            }
          }
        `}</style>

        <div className="print:hidden mb-8 flex gap-4 max-w-6xl mx-auto">
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Form
          </Button>
        </div>

        <div className="print:bg-white bg-white rounded-2xl shadow-lg print:shadow-none max-w-6xl mx-auto p-8 print:p-2">
          <div className="flex justify-between items-start mb-6 print:mb-2">
            <div className="flex gap-4 items-center">
              <CalendarCard date={reportDate} />
              <div>
                <h1 className="font-bold text-3xl print:text-3xl text-gray-900 tracking-tight">
                  ATTENDANCE REPORT
                </h1>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src="/sda_logo.svg"
                alt="SDA Logo"
                width={180}
                height={180}
                className="print:w-32 print:h-32"
              />
            </div>
          </div>

          <div className="print:break-inside-avoid print:no-break">
            {attendanceData.length > 0 ? (
              <AttendanceTable data={attendanceData[0]} />
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No attendance data available
                </h3>
                <p className="text-gray-600 mb-4">
                  Please go back and fill out the attendance forms.
                </p>
                <Button
                  onClick={() => router.push("/")}
                  className="group relative flex items-center gap-3 px-6 py-3 font-medium !bg-gradient-to-br !from-gray-900 !to-gray-950 text-white rounded-xl transition-all duration-200 hover:shadow-md overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 to-transparent pointer-events-none" />
                  <ArrowLeft className="h-4 w-4 relative z-10" />
                  <span className="relative z-10">Go Back to Form</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
