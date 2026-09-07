import dotenv from "dotenv";
dotenv.config();

import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./connection/db.js";
import registerRouter from "./routes/register.route.js";
// import userRouter from "./routes/user.route.js";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set("trust proxy", true);
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

// API routes
app.use("/api/register", registerRouter);
// app.use("/api/user", userRouter);

// Serve frontend static files in production
if (process.env.NODE_ENV === "production") {
    const frontendDist = path.join(__dirname, "../../frontend/dist");
    app.use(express.static(frontendDist));

    // All non-API routes serve index.html (SPA client-side routing)
    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendDist, "index.html"));
    });
}

app.use((err, req, res, next) => {
    console.log(err)
    return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: err.message,
    })
})

app.listen(PORT, async () => {
    try {
        console.log(`Server started at http://localhost:${PORT}`);
        await connectDB();
    } catch (error) {
        console.log(`Failed to start server`, error);
        throw error;
    }
});
