import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Game from "@/models/Project";

export async function GET() {
  await dbConnect();
  const games = await Game.find({});
  return NextResponse.json({ games });
}

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const body = await req.json();

    // Create a new game document in MongoDB
    const game = await Game.create(body);

    // Respond with the created game
    return NextResponse.json({ success: true, game });
  } catch (error) {
    console.error("Error creating game:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create game" },
      { status: 500 }
    );
  }
}