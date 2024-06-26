import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import mongoose from "mongoose";

export const User = mongoose.model(
  "users",
  new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      token: {
        type: String,
      },
    },
    { timestamps: true }
  )
);

export const Session = mongoose.model(
  "sessions",
  new mongoose.Schema(
    {
      user_id: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true,
      },
      expires_at: {
        type: Date,
        required: true,
      },
    },
    { timestamps: true }
  )
);

export const adapter = new MongodbAdapter(
  mongoose.connection.collection("sessions"),
  mongoose.connection.collection("users")
);
