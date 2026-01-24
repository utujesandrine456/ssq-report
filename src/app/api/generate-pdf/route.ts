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
    await page.setDefaultNavigationTimeout(30000);
    await page.goto(url, { waitUntil: "networkidle0" });
    await page.waitForSelector(".print\\:break-inside-avoid", {
      timeout: 5000,
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const hasTable = await page.evaluate(() => {
      const table = document.querySelector("table");
      return table && table.rows.length > 0;
    });

    if (!hasTable) {
      throw new Error("No data table found on the page");
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
