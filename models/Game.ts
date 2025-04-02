import { Types, Schema, Document, model, models } from "mongoose";

export interface IGame extends Document {
  userId: Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  gameType: "webgl" | "html5";
  engine: "godot" | "unity" | "other";
  status: "published" | "draft" | "archived";
  price: number;
  files: {
    main: string; // URL to the main game file (index.html for WebGL, game.html for HTML5)
    assets: string[]; // URLs to game assets
    dependencies?: string[]; // URLs to any external dependencies
  };
  thumbnail: string;
  screenshots: string[];
  tags: string[];
  stats: {
    views: number;
    plays: number;
    favorites: number;
  };
  settings: {
    allowFullscreen: boolean;
    allowAutoplay: boolean;
    width: number;
    height: number;
  };
}

const GameSchema = new Schema<IGame>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
    },
    gameType: {
      type: String,
      enum: ["webgl", "html5"],
      required: true,
    },
    engine: {
      type: String,
      enum: ["godot", "unity", "other"],
      required: true,
    },
    status: {
      type: String,
      enum: ["published", "draft", "archived"],
      default: "draft",
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    files: {
      main: { type: String, required: true },
      assets: [{ type: String }],
      dependencies: [{ type: String }],
    },
    thumbnail: {
      type: String,
      required: true,
    },
    screenshots: [{ type: String }],
    tags: [{ type: String }],
    stats: {
      views: { type: Number, default: 0 },
      plays: { type: Number, default: 0 },
      favorites: { type: Number, default: 0 },
    },
    settings: {
      allowFullscreen: { type: Boolean, default: true },
      allowAutoplay: { type: Boolean, default: true },
      width: { type: Number, default: 800 },
      height: { type: Number, default: 600 },
    },
  },
  {
    timestamps: true,
  }
);

export default models.Game || model<IGame>("Game", GameSchema);
