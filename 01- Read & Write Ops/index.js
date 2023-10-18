const path = require("path");

const fsPromises = require("fs").promises;

// fs.readFile("./files/starter.txt", (err, data) => {
//   if (err) throw err;
//   console.log(data.toString());
// });

// fs.readdir("./files", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// fs.appendFile("./files/starter.txt", "\n Hello World", (err) => {
//   if (err) throw err;
//   console.log("Append Completed.");
// });

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf-8"
    );
    console.log(data);
    await fsPromises.writeFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      data
    );

    await fsPromises.appendFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      "\n\nNice to meet you"
    );

    await fsPromises.rename(
      path.join(__dirname, "files", "promiseWrite.txt"),
      path.join(__dirname, "files", "promiseComplete.txt")
    );

    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "promiseComplete.txt"),
      "utf-8"
    );

    console.log(newData);
  } catch (err) {
    console.log(err);
  }
};

fileOps();
