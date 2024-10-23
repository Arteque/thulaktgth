import { NextResponse } from "next/server";
import { parseStringPromise } from "xml2js"; // Import xml2js

const DATA_SOURCE_URL = "https://www.lakt.de/api";
const API_KEY: string = process.env.DATA_API_KEY as string;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    
    // Extract 'begin' and 'end' parameters from query string
    const begin = searchParams.get('begin');
    const end = searchParams.get('end');
// 
    if (!begin || !end) {
        return NextResponse.json({ error: "Missing 'begin' or 'end' query parameters" }, { status: 400 });
    }

    try {
        // Fetch API data (expecting XML format)
        const res = await fetch(
            `${DATA_SOURCE_URL}?number=1&begin=${begin}&end=${end}&token=${API_KEY}`,
        );

        // Ensure the fetch was successful
        if (!res.ok) {
            throw new Error(`Fetch error: ${res.status} ${res.statusText}`);
        }

        // Get response as text (XML format)
        const xmlData = await res.text();

        // Convert XML to JSON
        const jsonData = await parseStringPromise(xmlData);

        // Add CORS headers to allow requests from your frontend
        const response = NextResponse.json(jsonData);
        response.headers.set('Access-Control-Allow-Origin', 'https://dev.stadt-apotheke-gotha.de');
        response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
        
        return response;

    } catch (error) {
        console.error("Error fetching or parsing data:", error);
        const errorResponse = NextResponse.json({ error: "Failed to fetch or parse data" }, { status: 500 });
        errorResponse.headers.set('Access-Control-Allow-Origin', 'https://dev.stadt-apotheke-gotha.de');
        return errorResponse;
    }
}
