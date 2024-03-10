import express from "express";
import articleRouter from "./routes/articles.js";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/articles", articleRouter);

// Home Route
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
