const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./Config/.env" });
const connectDB = require('./config/connect')
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");

const app = express();
const cors = require('cors')
app.use(cors({
    origin: process.env.CORS_URL,
    credentials: true
}))
const PORT = process.env.PORT || 8001;

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/url", urlRoute);
app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
