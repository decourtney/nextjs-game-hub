import { notFound } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import Game from "@/models/Game";
import GameViewer from "@/app/components/GameViewer";

interface GamePageProps {
  params: {
    slug: string;
  };
}

export default async function GamePage({ params }: GamePageProps) {
  await dbConnect();

  const game = await Game.findOne({ slug: params.slug });

  if (!game) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <GameViewer game={game} />
    </main>
  );
}
