import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
require("dotenv").config();

import authRoutes from "./routes/authRoutes";
import messageRoutes from "./routes/messageRoutes";
import connectToMongoDB from "./db/connection";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json()); // to parse json payload from request body

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});

export default app;
