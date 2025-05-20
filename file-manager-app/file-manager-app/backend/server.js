const cors = require("cors");
const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const fileRoutes = require('./routes/files');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/uploads", express.static(path.join(__dirname,"uploads")));
app.use(express.static(path.join(__dirname, "../frontend")));


const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Dosya Yükleme Uygulamasına Hoşgeldiniz");

});
const verifyToken = require("./middleware/authMiddleware");
app.use('/api/files', fileRoutes);


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/api/protected", verifyToken, (req, res) => {
    res.json({ message: `Merhaba ${req.user.username}, bu korumalı alandasın.` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor.`);
})