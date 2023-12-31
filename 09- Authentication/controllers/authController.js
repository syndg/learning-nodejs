const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ error: "Username and password are required" });

  // Check if user exists
  const foundUser = usersDB.users.find((person) => person.username === user);
  if (!foundUser) return res.sendStatus(401); // Unauthorized

  // Evaluate the password
  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    // create JWTs
    res.json({ success: `User ${user} logged in.` });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
