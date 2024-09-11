import { NextResponse } from "next/server";
import { parseStringPromise } from "xml2js"; // Import xml2js

const DATA_SOURCE_URL = "https://www.lakt.de/api";
const API_KEY: string = process.env.DATA_API_KEY as string;

export async function GET() {
    const date = new Date();

    // Format start date as 'DD-MM-YYYY'
    const start = date.toLocaleDateString("de-DE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).replace(/[.,;]/g, "-");

    // Add 1 day to current date
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);

    // Format end date as 'DD-MM-YYYY'
    const end = nextDay.toLocaleDateString("de-DE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).replace(/[.,;]/g, "-");

    

    const params = { start, end };
    
    try {
        // Fetch API data (expecting XML format)
        const res = await fetch(`${DATA_SOURCE_URL}?number=10&begin=${params.start}&end=${params.end}&token=${API_KEY}`);
        
        // Ensure the fetch was successful
        if (!res.ok) {
            throw new Error(`Fetch error: ${res.status} ${res.statusText}`);
        }

        // Get response as text (XML format)
        const xmlData = await res.text();

        // Convert XML to JSON
        const jsonData = await parseStringPromise(xmlData);


        // Return JSON response
        return NextResponse.json(jsonData);
    } catch (error) {
        console.error("Error fetching or parsing data:", error);
        return NextResponse.json({ error: "Failed to fetch or parse data" }, { status: 500 });
    }
}