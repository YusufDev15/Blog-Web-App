import express from "express";
import Article from "./../models/article.js";

const router = express.Router();

// Route for creating a new article (GET request)
router.get("/new", (req, res) => {
  try {
    res.render("articles/new.ejs", { article: new Article() });
  } catch (err) {
    console.error("Error fetching articles:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Route for viewing article details (GET REQUEST)
router.get("/:slug", async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) {
      return res.redirect("/");
    }
    res.render("articles/display.ejs", { article: article });
  } catch (err) {
    console.error("Error fetching articles:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Route for creating a new article (POST request)
router.post("/", async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    // Saving the new article to the database
    const savedArticle = await article.save();
    // redirects to the URL to view the newly created article
    res.redirect(`/articles/${savedArticle.slug}`);
  } catch (err) {
    console.error(err);
    res.render("articles/new.ejs", { article: article });
  }
});

export default router;
