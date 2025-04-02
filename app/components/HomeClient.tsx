"use client";

import Link from "next/link";
import Image from "next/image";
import { Session } from "next-auth";

interface Game {
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
}

interface HomeClientProps {
  session: Session | null;
  featuredGames: Game[];
}

export default function HomeClient({
  session,
  featuredGames,
}: HomeClientProps) {
  return (
    <main className="min-h-screen bg-emerald-100 dark:bg-emerald-950">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-r from-emerald-600 to-emerald-800">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-6">Play Amazing Web Games</h1>
          <p className="text-xl mb-8">
            Discover and play the best web-based games from talented developers
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/games"
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
            >
              Browse Games
            </Link>
            {session ? (
              <Link
                href="/games/upload"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Upload Your Game
              </Link>
            ) : (
              <Link
                href="/register"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-16 px-4 bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950 dark:to-emerald-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-emerald-900 dark:text-emerald-100">
            Featured Games
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGames.map((game) => (
              <Link
                key={game._id}
                href={`/games/${game.slug}`}
                className="group bg-white dark:bg-emerald-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-emerald-100 dark:border-emerald-800"
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
                  <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-emerald-700 dark:text-emerald-300 text-sm mt-1 line-clamp-2">
                    {game.shortDescription || game.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-4 text-sm text-emerald-600 dark:text-emerald-400">
                    <span>{game.engine}</span>
                    <span>•</span>
                    <span>{game.stats.views} views</span>
                    <span>•</span>
                    <span>{game.stats.plays} plays</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-white dark:bg-emerald-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-emerald-900 dark:text-emerald-100">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { name: "Action", icon: "🎮" },
              { name: "Adventure", icon: "🗺️" },
              { name: "Puzzle", icon: "🧩" },
              { name: "Strategy", icon: "⚔️" },
              { name: "RPG", icon: "⚔️" },
              { name: "Sports", icon: "⚽" },
              { name: "Racing", icon: "🏎️" },
              { name: "Platform", icon: "🎯" },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/games?category=${category.name.toLowerCase()}`}
                className="group p-6 bg-emerald-50 dark:bg-emerald-800 rounded-lg text-center hover:bg-emerald-100 dark:hover:bg-emerald-700 transition-colors border border-emerald-100 dark:border-emerald-700"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-semibold text-emerald-900 dark:text-emerald-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-emerald-50 dark:from-emerald-900 dark:to-emerald-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-emerald-900 dark:text-emerald-100">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Instant Play",
                description:
                  "No downloads required. Play games directly in your browser.",
                icon: "⚡",
              },
              {
                title: "WebGL Support",
                description:
                  "Play games built with Godot, Unity, and other engines.",
                icon: "🎮",
              },
              {
                title: "Community Driven",
                description:
                  "Connect with developers and players from around the world.",
                icon: "🌍",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="text-center p-6 bg-white dark:bg-emerald-900 rounded-lg shadow-lg border border-emerald-100 dark:border-emerald-800"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-emerald-900 dark:text-emerald-100">
                  {feature.title}
                </h3>
                <p className="text-emerald-700 dark:text-emerald-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
