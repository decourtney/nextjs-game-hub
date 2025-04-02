import { getServerSession } from "next-auth";
import { _nextAuthOptions } from "@/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import Game from "@/models/Game";
import { headers } from "next/headers";

interface GameStats {
  views: number;
  plays: number;
}

interface GameDocument {
  _id: string;
  title: string;
  stats?: GameStats;
}

// export const dynamic = "force-dynamic";
// export const revalidate = 0;

export const DashboardPage = async () => {
  const session = await getServerSession(_nextAuthOptions);
  console.log("Session:", session); // Debug log

  if (!session) {
    console.log("No session or user ID, redirecting to login"); // Debug log
    redirect("/login");
  }

  await dbConnect();
  const userGames = (await Game.find({
    userId: session.user.id,
  })
    .lean()
    .then((games) =>
      games.map((game) => ({
        _id: String(game._id),
        title: String(game.title),
        stats: game.stats
          ? {
              views: Number(game.stats.views || 0),
              plays: Number(game.stats.plays || 0),
            }
          : undefined,
      }))
    )) as GameDocument[];

  console.log("User games:", userGames); // Debug log

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-emerald-900 dark:text-emerald-100">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-emerald-50 dark:bg-emerald-950 p-6 rounded-lg shadow-md border border-emerald-200 dark:border-emerald-800">
          <h2 className="text-xl font-semibold mb-4 text-emerald-800 dark:text-emerald-200">
            Your Games
          </h2>
          <p className="text-emerald-700 dark:text-emerald-300">
            {userGames.length} games uploaded
          </p>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-950 p-6 rounded-lg shadow-md border border-emerald-200 dark:border-emerald-800">
          <h2 className="text-xl font-semibold mb-4 text-emerald-800 dark:text-emerald-200">
            Total Views
          </h2>
          <p className="text-emerald-700 dark:text-emerald-300">
            {userGames.reduce((acc, game) => acc + (game.stats?.views || 0), 0)}{" "}
            views
          </p>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-950 p-6 rounded-lg shadow-md border border-emerald-200 dark:border-emerald-800">
          <h2 className="text-xl font-semibold mb-4 text-emerald-800 dark:text-emerald-200">
            Total Plays
          </h2>
          <p className="text-emerald-700 dark:text-emerald-300">
            {userGames.reduce((acc, game) => acc + (game.stats?.plays || 0), 0)}{" "}
            plays
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-emerald-800 dark:text-emerald-200">
          Recent Games
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userGames.slice(0, 6).map((game) => (
            <div
              key={game._id}
              className="bg-emerald-50 dark:bg-emerald-950 p-4 rounded-lg shadow-md border border-emerald-200 dark:border-emerald-800"
            >
              <h3 className="font-medium text-emerald-800 dark:text-emerald-200">
                {game.title}
              </h3>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                {game.stats?.views || 0} views · {game.stats?.plays || 0} plays
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
