"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IGame } from "@/models/Game";

interface GameViewerProps {
  game: IGame;
}

export default function GameViewer({ game }: GameViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Track game view
    fetch(`/api/games/${game._id}/view`, { method: "POST" });
  }, [game._id]);

  const handlePlay = () => {
    setIsPlaying(true);
    // Track game play
    fetch(`/api/games/${game._id}/play`, { method: "POST" });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      gameContainerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Game Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold">{game.title}</h1>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span>
              {game.engine} {game.gameType}
            </span>
            <span>•</span>
            <span>{game.stats.views} views</span>
            <span>•</span>
            <span>{game.stats.plays} plays</span>
          </div>
        </div>

        {/* Game Container */}
        <div
          ref={gameContainerRef}
          className="relative bg-black"
          style={{
            width: game.settings.width,
            height: game.settings.height,
            maxWidth: "100%",
            aspectRatio: `${game.settings.width} / ${game.settings.height}`,
          }}
        >
          {!isPlaying ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePlay}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium"
              >
                Play Game
              </motion.button>
            </div>
          ) : (
            <iframe
              src={game.files.main}
              className="w-full h-full"
              allow={`${game.settings.allowFullscreen ? "fullscreen;" : ""} ${
                game.settings.allowAutoplay ? "autoplay;" : ""
              }`}
              style={{ border: "none" }}
            />
          )}

          {/* Controls */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleFullscreen}
              className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg"
            >
              {isFullscreen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 9h6v6M15 9l-6 6"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              )}
            </motion.button>
          </div>
        </div>

        {/* Game Info */}
        <div className="p-4">
          <div className="prose dark:prose-invert max-w-none">
            <p>{game.description}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {game.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
