import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { CredentialsUser } from "@/models/BaseUserSchema";

// Validation function (replace with a library like Yup or Zod)
function validateData(data: any) {
  if (!data.email || !data.password || !data.username) {
    throw new Error("Username, email, and password are required.");
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    console.log("Data:", data);
    // Validate input data
    validateData(data);

    // Connect to the database
    await dbConnect();

    // Check if the user already exists by email or username
    const existingUser = await CredentialsUser.findOne({
      $or: [{ email: data.email.toLowerCase() }, { username: data.username }],
    });
    if (existingUser) {
      throw new Error("User with this email or username already exists.");
    }

    // Create a new user
    const newUser = new CredentialsUser({
      username: data.username,
      email: data.email.toLowerCase(),
      password: data.password,
      provider: "credentials",
      newsletter: data.newsletter,
      button1: data.button1,
      button2: data.button2,
    });

    // Save the user to the database
    await newUser.save();

    // Return success response
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      return NextResponse.json(
        { status: "error", message: error.message },
        { status: 400 }
      );
    }

    // Fallback for unknown errors
    console.error("Unknown error:", error);
    return NextResponse.json(
      { status: "error", message: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
