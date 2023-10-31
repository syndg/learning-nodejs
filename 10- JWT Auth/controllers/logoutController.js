const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  // On client, delete the accessToken.
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content.
  const refreshToken = cookies.jwt;

  // Check if user exists
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }
  // Delete refreshToken from usersDB.
  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );

  const currentUser = { ...foundUser, refreshToken: "" };
  usersDB.setUsers([...otherUsers, currentUser]);

  await fsPromises.writeFile(
    path.join(__dirname, "../model/users.json"),
    JSON.stringify(usersDB.users)
  );
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // secure: true for https in production.
  res.sendStatus(204);
};

module.exports = { handleLogout };
