import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { router } from "./routes";
import { errorHandler } from "./middleware/error";
import { env } from "./config/env";

export const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

// Auth is handled by Supabase on the client. Backend only validates the
// Bearer JWT per request (see middleware/requireAuth.ts).
app.use("/api/v1", router);

app.use(errorHandler);
