import { getServerSession } from "next-auth";
import { _nextAuthOptions } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Game from "@/models/Game";
import HomeClient from "./components/HomeClient";

type GamePreview = {
  _id: string;
  title: string;
  slug: string;
  thumbnail?: string;
  shortDescription?: string;
  description: string;
  engine: string;
  stats: {
    views: number;
    plays: number;
  };
};

async function getFeaturedGames(): Promise<GamePreview[]> {
  try {
    await dbConnect();
    const games = await Game.find({ status: "published" })
      .sort({ "stats.views": -1 })
      .limit(6)
      .lean();
    return games.map((game) => ({
      _id: String(game._id),
      title: String(game.title),
      slug: String(game.slug),
      thumbnail: game.thumbnail ? String(game.thumbnail) : undefined,
      shortDescription: game.shortDescription
        ? String(game.shortDescription)
        : undefined,
      description: String(game.description),
      engine: String(game.engine),
      stats: {
        views: Number(game.stats?.views || 0),
        plays: Number(game.stats?.plays || 0),
      },
    }));
  } catch (error) {
    console.error("Error fetching featured games:", error);
    return [];
  }
}

export default async function Home() {
  const session = await getServerSession(_nextAuthOptions);
  const featuredGames = await getFeaturedGames();

  return <HomeClient session={session} featuredGames={featuredGames} />;
}
