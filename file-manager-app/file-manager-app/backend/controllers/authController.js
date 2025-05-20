const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

require("dotenv").config();

const usersFilePath = path.join(__dirname, "..", "users.json");
const secret = process.env.JWT_SECRET || "defaultsecret";

function readUsers() {
  const data = fs.readFileSync(usersFilePath, "utf8");
  return JSON.parse(data);
}

function writeUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf-8");
}


// Kayıt işlemi
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const users = readUsers();

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: "Kullanıcı zaten var." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, email, password: hashedPassword });
  writeUsers(users);

  res.status(201).json({ message: "Kayıt başarılı." });
};

// Giriş işlemi
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "E-mail ve password gerekli." });
  }

  const users = readUsers();
 const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ message: "Kullanıcı bulunamadı." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Şifre yanlış." });
  }

  const token = jwt.sign({ email: user.email }, secret, { expiresIn: "1h" });
  res.status(200).json({ message: "Giriş başarılı.", token });
};
