
# Blog Web Application

A simple blog web application built with Node.js, Express, MongoDB, and EJS templating engine. Users can create, edit, and delete articles, view article details, and navigate through the blog.


## Features

- **Create Articles:** Users can create new articles by providing a title, description, and markdown content.
- **Edit Articles:** Existing articles can be edited to update the title, description, and markdown content.
- **Delete Articles:** Users can delete articles from the blog.
- **View Article Details:** Users can view detailed information about each article, including the title, creation date, description, and content.
- **Responsive Design:** The application is responsive and works well on various devices and screen sizes.


## Installation
1. Clone Repository:

```bash
git clone <repository-url>
```
2. Install Dependencies
```bash
npm install

```
3. Set up environment variables:
```bash
MONGODB_URI=mongodb://localhost/blog
```
Replace mongodb://localhost/blog with your MongoDB connection URL.

4. Start the server
```bash
npm start
```

5. Access the application in your browser 
- Open http://localhost:3000 to view the blog application.
## Usage/Examples

- Navigate to http://localhost:3000/articles/new to create a new article.
- Click on an article title to view its details.
- Use the "New Article" button to create a new article.
- Click on the "Edit" button next to an article to edit it.
- Use the "Delete" button to delete an article.


## Technology Used

- **Node.js:** Backend JavaScript runtime environment.
- **Express.js:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for storing articles.
- **Mongoose:** MongoDB object modeling for Node.js.
- **EJS:** Embedded JavaScript templates for rendering views.
- **Bootstrap:** Frontend CSS framework for styling.
- **Marked:** Markdown parser and compiler for converting markdown to HTML.
- **DOMPurify:** DOM sanitizer for preventing XSS attacks.
- **JSDOM:** JavaScript implementation of the DOM and HTML standards for server-side rendering.


## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. For major changes, please open an issue first to discuss the changes.


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Acknowledgements

- https://expressjs.com/
- https://nodejs.org/en
- https://www.mongodb.com/
- https://getbootstrap.com/
- https://www.npmjs.com/
