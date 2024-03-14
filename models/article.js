// Import Mongoose library
import mongoose from "mongoose";
// import marked from "marked";
import slugify from "slugify";

// Define the schema for articles
const articleSchema = new mongoose.Schema({
  // Title of the article, required field
  title: {
    type: String,
    required: true,
  },
  //   description of the article
  description: {
    type: String,
  },
  //   Markdown content of the article
  markdown: {
    type: String,
    required: true,
  },
  //   date when the article was created, defaults to current date
  created: {
    type: Date,
    default: Date.now,
  },
  // slug for the article
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

// Middleware to automatically generate a slug from the title before validation
articleSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model("Article", articleSchema);
