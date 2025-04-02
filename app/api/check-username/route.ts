import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // Ensure you have a DB connection utility
import User from "@/models/User"; // Import your Mongoose user model

// GET handler to check username availability
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  // Validate the query parameter
  if (!username) {
    return NextResponse.json(
      { message: "Username is required" },
      { status: 400 }
    );
  }

  try {
    // Ensure database connection
    await dbConnect();

    // Check if the username exists
    const userExists = await User.findOne({ username });

    if (userExists) {
      return NextResponse.json({ available: false });
    }

    return NextResponse.json({ available: true });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { message: "An error occurred while checking username availability" },
      { status: 500 }
    );
  }
}
