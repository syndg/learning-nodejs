const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

// Custom middleware logger
app.use(logger);

// Third-party Middleware
// Cross-Origin Resource Sharing (CORS)
const whiteList = ["https://www.syndg.vercel.app"];
const corsOptions = {
  origin: (origin, callback) => {
    // !origin only for development
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Built-in Middleware to handle urlencoded data
// in other words, form data
// content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Built-in Middleware to handle json data
// content-type: application/json
app.use(express.json());

// Built-in Middleware to handle static files
app.use(express.static(path.join(__dirname, "public")));

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
// app.get("/*", (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
// });

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "Not found" });
  } else {
    res.type("txt").send("Not found");
  }
});

// Error Handler
app.use(errorHandler);

// Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
