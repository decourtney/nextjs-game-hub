import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Game from "@/models/Game";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const game = await Game.findByIdAndUpdate(
      params.id,
      { $inc: { "stats.views": 1 } },
      { new: true }
    );

    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    return NextResponse.json(game);
  } catch (error) {
    console.error("Error updating game views:", error);
    return NextResponse.json(
      { error: "Failed to update game views" },
      { status: 500 }
    );
  }
}
