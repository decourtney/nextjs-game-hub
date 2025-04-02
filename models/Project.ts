// models/Project.ts
import { Types, Schema, Document, model, models } from "mongoose";

export interface IProject extends Document {
  userId: Types.ObjectId; // References a User
  title: string;
  projectURL: string;
  shortDescription?: string;
  category: "games" | "game assets" | "tools" | "other";
  type: "Unity" | "Godot";
  status: "released" | "in development" | "canceled";
  price: number;
  description: string;
  tags: Types.ObjectId[]; // References Tag model(s)
  media: {
    coverImage?: string;
    screenshots?: string[];
  };
}

const ProjectSchema = new Schema<IProject>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    projectURL: {
      type: String,
      required: true,
      unique: true,
    },
    shortDescription: {
      type: String,
    },
    category: {
      type: String,
      enum: ["games", "game assets", "tools", "other"],
      required: true,
    },
    type: {
      type: String,
      enum: ["Unity", "Godot"],
      required: true,
    },
    status: {
      type: String,
      enum: ["released", "in development", "canceled"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    media: {
      coverImage: { type: String },
      screenshots: [{ type: String }],
    },
  },
  {
    timestamps: true,
  }
);

export default models.Project || model<IProject>("Project", ProjectSchema);
