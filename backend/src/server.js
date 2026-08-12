import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./connection/db.js";
import registerRouter from "./routes/register.route.js";
import userRouter from "./routes/user.route.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use("/api/register", registerRouter);
app.use("/api/user", userRouter);

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
