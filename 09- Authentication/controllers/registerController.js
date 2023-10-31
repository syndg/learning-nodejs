const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }
  // Check if user exists
  const userExists = usersDB.users.find((person) => person.username === user);
  if (userExists) return res.status(409); // Conflict
  try {
    // Encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // Store the user in the DB
    const newUser = { username: user, password: hashedPwd };

    usersDB.setUsers([...usersDB.users, newUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "../model/users.json"),
      JSON.stringify(usersDB.users)
    );

    console.log(usersDB.users);
    res.status(201).json({ success: `New user ${user} created.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { handleNewUser };
