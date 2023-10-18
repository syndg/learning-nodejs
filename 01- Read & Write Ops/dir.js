const fs = require("fs");

fs.rm("./files/starterCopy.txt", (err) => {
  if (err) throw err;
  console.log("Folder deleted.");
});

console.log("This is the end of the script.");
