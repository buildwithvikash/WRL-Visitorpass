import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { connectToDB, dbConfig1, dbConfig2, dbConfig3 } from "./config/db.js";
import cookieParser from "cookie-parser";

// <------------------------------------------------------------- All API Routes ------------------------------------------------------------->
import authRoutes from "./routes/auth.route.js";
import visitorRoutes from "./routes/visitor.route.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.resolve("uploads"))); // Static files

// <------------------------------------------------------------- Connect to DB Servers ------------------------------------------------------------->
(async () => {
  try {
    global.pool1 = await connectToDB(dbConfig1);
    global.pool2 = await connectToDB(dbConfig2);
    global.pool3 = await connectToDB(dbConfig3);
  } catch (error) {}
})();

// <------------------------------------------------------------- APIs ------------------------------------------------------------->
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/visitor", visitorRoutes);

// <------------------------------------------------------------- Start server ------------------------------------------------------------->
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port:${PORT}`);
});
