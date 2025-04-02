import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import Game from "@/models/Game";
import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const gameType = formData.get("gameType") as "webgl" | "html5";

    if (!files.length) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    // Connect to database
    await dbConnect();

    // Create unique game ID
    const gameId = uuidv4();
    const uploadDir = join(process.cwd(), "public", "uploads", "games", gameId);

    // Process and save files
    const fileUrls: string[] = [];
    let mainFileUrl = "";

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename
      const uniqueFilename = `${uuidv4()}-${file.name}`;
      const filePath = join(uploadDir, uniqueFilename);

      // Save file
      await writeFile(filePath, buffer);

      // Create URL
      const fileUrl = `/uploads/games/${gameId}/${uniqueFilename}`;
      fileUrls.push(fileUrl);

      // Check if this is the main game file
      if (file.name === "index.html" || file.name === "game.html") {
        mainFileUrl = fileUrl;
      }
    }

    // Create game document
    const game = await Game.create({
      userId: session.user.id,
      title: "Untitled Game", // Can be updated later
      slug: `game-${gameId}`,
      description: "No description yet", // Can be updated later
      gameType,
      engine: gameType === "webgl" ? "godot" : "other",
      status: "draft",
      price: 0,
      files: {
        main: mainFileUrl,
        assets: fileUrls.filter((url) => url !== mainFileUrl),
      },
      thumbnail:
        fileUrls.find((url) => url.match(/\.(jpg|jpeg|png|gif)$/i)) || "",
      settings: {
        allowFullscreen: true,
        allowAutoplay: true,
        width: 800,
        height: 600,
      },
    });

    return NextResponse.json(game);
  } catch (error) {
    console.error("Game upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload game" },
      { status: 500 }
    );
  }
}
