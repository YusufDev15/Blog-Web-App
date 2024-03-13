import express from "express";
import Article from "./../models/article.js";
const router = express.Router();

// Route for creating a new article (GET request)
router.get("/new", (req, res) => {
  res.render("articles/new.ejs", { article: new Article() });
});

// Route for viewing article details (GET REQUEST)
router.get("/:id", (req, res) => {});

// Route for creating a new article (POST request)
router.post("/", async (req, res) => {
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    // Saving the new article to the database
    const savedArticle = await article.save();
    // redirects to the URL to view the newly created article
    res.redirect(`/articles/${savedArticle.id}`);
  } catch (err) {
    res.render("articles/new.ejs", { article: article });
  }
});

export default router;
