import express from "express";
import mongoose from "mongoose";
import articleRouter from "./routes/articles.js";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Database
mongoose.connect("mongodb://localhost/blog");

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/articles", articleRouter);

// Home Route
app.get("/", (req, res) => {
  const articles = [
    {
      title: "Dummy Article",
      created: new Date(),
      description: "Dummy Description for this whole article",
    },
    {
      title: "Dummy Article 2",
      created: new Date(),
      description: "Dummy Description 2 for this whole article",
    },
  ];
  res.render("articles/index.ejs", { article1: articles });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
