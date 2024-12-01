import express from "express";
import cors from "cors";
import "dotenv/config";

// app config
const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json()); // after getting any request, this json parse that request.
app.use(cors()); // this method connects frontend to the bacckend.

// initializing routes
app.get("/", (req, res) => res.send("API Working"));
app.listen(port, () => console.log(`Server is runing on ${port}`));
