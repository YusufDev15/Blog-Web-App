import express from "express";
import Article from "./../models/article.js";

// Create a router instance
const router = express.Router();

// Route for displaying the form to create a new article
router.get("/new", (req, res) => {
  try {
    res.render("articles/new.ejs", { article: new Article() });
  } catch (err) {
    console.error("Error fetching articles:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Route for displaying the form to edit an existing article
router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/edit.ejs", { article: article });
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

// Middleware function to save an article and redirect
function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    try {
      // Saving the new article to the database
      const savedArticle = await article.save();
      // redirects to the URL to view the newly created article
      res.redirect(`/articles/${savedArticle.slug}`);
    } catch (err) {
      console.error("Error saving article:", err);
      res.render(`articles/${path}`, { article: article });
    }
  };
}

// Route for creating a new article (POST request)
router.post(
  "/",
  async (req, res, next) => {
    req.article = new Article();
    next();
  },
  saveArticleAndRedirect("new")
);

// Route for updating a new article (PUT request)
router.put(
  "/:id",
  async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
  },
  saveArticleAndRedirect("edit")
);

// Route for deleting an article
router.delete("/:id", async (req, res) => {
  try {
    // delete the article with the specified ID
    await Article.findByIdAndDelete(req.params.id);
    // Redirect the homepage
    res.redirect("/");
    res.status(204).end();
  } catch (err) {
    console.error("Error deleting article:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Export the router for use in other modules
export default router;
