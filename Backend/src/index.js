import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import todoRoutes from "./routes/todo.route.js";
import { connectdb } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://starlit-stationary-frontend.vercel.app",
];

app.use(cookieParser());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json({ limit: "5mb" }));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

connectdb().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on port", PORT);
  });
});
