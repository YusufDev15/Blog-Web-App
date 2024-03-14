import express from "express";
import mongoose from "mongoose";
import Article from "./models/article.js";
import articleRouter from "./routes/articles.js";
import methodOverride from "method-override";
// import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Mongo Database
mongoose.connect("mongodb://localhost/blog");

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
// app.use(bodyParser.urlencoded({ extended: true }));

// Home Route
app.get("/", async (req, res) => {
  try {
    const articles = await Article.find().sort({
      created: "desc",
    });
    res.render("articles/index.ejs", { articles: articles });
  } catch (err) {
    console.error("Error fetching articles:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.use("/articles", articleRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
