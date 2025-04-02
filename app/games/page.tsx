import dbConnect from "@/lib/dbConnect";
import Game from "@/models/Game";
import Link from "next/link";
import Image from "next/image";

export default async function GamesPage() {
  await dbConnect();

  const games = await Game.find({ status: "published" })
    .sort({ "stats.views": -1 })
    .limit(20);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Games</h1>
        <Link
          href="/games/upload"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Upload Game
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <Link
            key={game._id}
            href={`/games/${game.slug}`}
            className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="relative aspect-video">
              <Image
                src={game.thumbnail || "/placeholder-game.jpg"}
                alt={game.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold group-hover:text-blue-500 transition-colors">
                {game.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
                {game.shortDescription || game.description}
              </p>
              <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
                <span>{game.engine}</span>
                <span>•</span>
                <span>{game.stats.views} views</span>
                <span>•</span>
                <span>{game.stats.plays} plays</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {game.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
