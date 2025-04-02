"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface GameUploadProps {
  onSuccess?: () => void;
}

export default function GameUpload({ onSuccess }: GameUploadProps) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gameType, setGameType] = useState<"webgl" | "html5" | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Determine game type based on files
    const hasIndexHtml = Array.from(files).some(
      (file) => file.name === "index.html"
    );
    const hasGameHtml = Array.from(files).some(
      (file) => file.name === "game.html"
    );

    if (hasIndexHtml) {
      setGameType("webgl");
    } else if (hasGameHtml) {
      setGameType("html5");
    } else {
      setError(
        "Please upload a valid web-based game (must include index.html or game.html)"
      );
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });
      formData.append("gameType", gameType!);

      const response = await fetch("/api/games/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      router.push(`/games/${data.slug}`);
      onSuccess?.();
    } catch (err) {
      setError("Failed to upload game. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Upload Your Game</h2>

        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
            <input
              type="file"
              multiple
              accept=".html,.js,.wasm,.data,.pck,.png,.jpg,.jpeg"
              onChange={handleFileSelect}
              className="hidden"
              id="game-upload"
            />
            <label htmlFor="game-upload" className="cursor-pointer block">
              <div className="space-y-2">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Click to upload</span> or drag
                  and drop
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Upload your game files (HTML, JS, assets, etc.)
                </p>
              </div>
            </label>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 p-4 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          {isUploading && (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
              <span>Uploading...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
