// Import Mongoose library
import mongoose from "mongoose";

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
});

export default mongoose.model("Article", articleSchema);
