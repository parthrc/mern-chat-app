import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
require("dotenv").config();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());

app.listen(8000, () => {
  console.log("Server running on 8000");
});

export default app;
