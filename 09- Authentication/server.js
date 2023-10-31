const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

// Custom middleware logger
app.use(logger);

// Third-party Middleware
// Cross-Origin Resource Sharing (CORS)
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

// Routes
app.use("/", require("./routes/root"));
app.use("/employees", require("./routes/api/employees"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));

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
