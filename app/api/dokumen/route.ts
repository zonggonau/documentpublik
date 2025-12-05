import { fetchDokumen } from "../../../lib/api";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const items = await fetchDokumen();
        return NextResponse.json(items);
    } catch (error) {
        console.error('Error fetching documents:', error);
        return NextResponse.json([], { status: 500 });
    }
}
