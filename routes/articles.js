import express from "express";
import Article from "./../models/article.js";
const router = express.Router();

// Route for new article
router.get("/new", (req, res) => {
  res.render("articles/new.ejs");
});

// Route for viewing details 
router.get("/:id", (req, res) => {});

// POST route for creating a new article
router.post("/", async (req, res) => {
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
  });
  try {
    article = await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch (err) {
    res.render("articles/new.ejs", { article: article });
  }
});

export default router;
