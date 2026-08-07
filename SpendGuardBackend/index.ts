import express from "express";
import { CONFIG } from "./src/config/CONFIG";

const app = express();

app.get("/", (req, res) => {
    res.send("SpendGuard Backend Running 🚀");
});

app.listen(CONFIG.PORT, () => {
    console.log(`Server running on http://localhost:${CONFIG.PORT}`);
});