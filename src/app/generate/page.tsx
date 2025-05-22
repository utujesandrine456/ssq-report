"use client";
import Image from "next/image";
import AttendanceTable from "@/components/AttendanceTable";
import CalendarCard from "@/components/CalendarCard";
import { familyData } from "@/data/data";
import { useState, useEffect } from "react";

export default function Page() {
  const reportDate = "2024-05-17";
  const [isGenerating, setIsGenerating] = useState(false);
  const [attendanceData, setAttendanceData] = useState<familyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    // Get data from sessionStorage
    const storedData = sessionStorage.getItem("attendanceData");
    console.log("Stored data:", storedData); // Debug log

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        console.log("Parsed data:", parsedData); // Debug log
        setAttendanceData(parsedData);
        setIsDataReady(true);
      } catch (error) {
        console.error("Error parsing stored data:", error);
      }
    } else {
      console.log("No data found in sessionStorage"); // Debug log
    }
    setIsLoading(false);
  }, []);

  const handleGeneratePDF = async () => {
    if (!isDataReady || attendanceData.length === 0) {
      alert("Please wait for the data to load before generating PDF");
      return;
    }

    setIsGenerating(true);
    try {
      // Create a URL with the data as a parameter
      const dataParam = encodeURIComponent(JSON.stringify(attendanceData));
      const currentUrl = `${window.location.origin}${window.location.pathname}?data=${dataParam}`;

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
      link.download = "attendance.pdf";

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="print:mx-0 print:my-0 mx-20 my-10">
      {/* print styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 1cm;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>

      {/* generate pdf button */}
      <div className="print:hidden mb-4">
        <button
          onClick={handleGeneratePDF}
          disabled={isGenerating || !isDataReady || attendanceData.length === 0}
          className={`${
            isGenerating || !isDataReady || attendanceData.length === 0
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2`}
        >
          {isGenerating ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating...
            </>
          ) : (
            "Generate PDF Report"
          )}
        </button>
      </div>

      {/* the header with data && logo */}
      <div className="flex justify-between">
        {/* the date && heading */}
        <div className="flex gap-3 items-center justify-center">
          <CalendarCard date={reportDate} />
          <div>
            <h1 className="font-bold text-2xl underline">ATTENDANCE LIST</h1>
          </div>
        </div>
        {/* the SDA logo */}
        <div>
          <Image src="/sda_logo.svg" alt="logo" width={200} height={200} />
        </div>
      </div>

      <div className="print:break-inside-avoid my-10">
        {attendanceData.length > 0 ? (
          <AttendanceTable data={attendanceData[0]} />
        ) : (
          <div className="text-center text-red-500 mt-4">
            No attendance data available. Please go back and fill out the forms.
            <div className="mt-2">
              <button
                onClick={() => (window.location.href = "/")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Go Back to Forms
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
