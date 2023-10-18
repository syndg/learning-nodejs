// This is for larger files. It reads the file in chunks.

const fs = require("fs");

const rs = fs.createReadStream("./files/starter.txt", { encoding: "utf-8" });

const ws = fs.createWriteStream("./files/starterCopy.txt");

rs.pipe(ws);
