// Import Mongoose library
import mongoose from "mongoose";
import slugify from "slugify";
// import marked from "marked";
import { marked } from "marked";
import createDomPurify from "dompurify";
import { JSDOM } from "jsdom";

// Initialising DOMPurify
const domPurify = createDomPurify(new JSDOM().window);

// Define the schema for articles
const articleSchema = new mongoose.Schema({
  // Title of the article, required field
  title: {
    type: String,
    required: true,
    maxLength: 100,
  },
  //   description of the article
  description: String,

  //   Markdown content of the article
  markdown: {
    type: String,
    required: true,
  },
  // date when the article was created, defaults to current date
  created: {
    type: Date,
    default: Date.now,
  },
  // slug for the article, automatically generated from the title
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  // Sanitized HTML content generated from Markdown
  sanitisedHtml: {
    type: String,
    required: true,
  },
});

// Middleware to automatically generate a slug from the title before validation
articleSchema.pre("validate", async function (next) {
  if (this.title) {
    // Generate a slug from the title using slugify
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  // if the article has markdown content
  if (this.markdown) {
    // Asynchronously convert markdown to HTML using the marked library
    try {
      const html = await marked(this.markdown);
      // sanitise the HTML content to prevent cross-site scripting attacks using DOMPurify
      this.sanitisedHtml = domPurify.sanitize(html);
    } catch (err) {
      // if an error occurs durng markdown to HTML conversion or sanitisation
      console.error("Error sanitising HTML:", err);
      this.sanitisedHtml = "";
    }
  }
  // continue with the validation process
  next();
});

export default mongoose.model("Article", articleSchema);
