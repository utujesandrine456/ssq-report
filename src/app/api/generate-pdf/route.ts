import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing URL" }, { status: 400 });
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    // Set a longer timeout for page load
    await page.setDefaultNavigationTimeout(30000);

    // Navigate to the page
    await page.goto(url, { waitUntil: "networkidle0" });

    // Wait for the attendance table container
    await page.waitForSelector(".print\\:break-inside-avoid", {
      timeout: 5000,
    });

    // Add a small delay to ensure all content is rendered
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Check if the table is actually rendered with data
    const hasTable = await page.evaluate(() => {
      const table = document.querySelector("table");
      return table && table.rows.length > 0;
    });

    if (!hasTable) {
      // If no table is found, try to get the data from URL
      const urlParams = new URL(url);
      const dataParam = urlParams.searchParams.get("data");

      if (!dataParam) {
        throw new Error("No data available for PDF generation");
      }

      // Set the data in sessionStorage
      await page.evaluate((data) => {
        sessionStorage.setItem("attendanceData", data);
        // Reload the page to trigger the data loading
        window.location.reload();
      }, dataParam);

      // Wait for the page to reload and render
      await page.waitForNavigation({ waitUntil: "networkidle0" });
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "1cm",
        right: "1cm",
        bottom: "1cm",
        left: "1cm",
      },
    });

    await browser.close();

    const blob = new Blob([Buffer.from(pdfBuffer)], {
      type: "application/pdf",
    });
    return new NextResponse(blob, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=attendance.pdf",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    await browser.close();
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
