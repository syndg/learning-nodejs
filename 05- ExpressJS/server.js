const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

// Route Handlers
app.get("^/$|/index(.html)?", (req, res) => {
  // res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html"); // 302 by default
});

// Chained Route Handlers
// Method-1
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("Attempted to access hello.html");
    next();
  },
  (req, res) => {
    res.send("Hello World!");
  }
);

// Method-2
const one = (req, res, next) => {
  console.log("one");
  next();
};

const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res) => {
  console.log("three");
  res.send("Finished!");
};

app.get("/chained(.html)?", [one, two, three]);

// Catch-all Route Handler
app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
