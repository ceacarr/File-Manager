const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '..', 'uploads');

// Yükleme klasörü yoksa oluştur
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// multer ayarları
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

// Dosya yükleme endpointi
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Dosya yüklenmedi.' });
  res.json({ message: 'Dosya yüklendi.', filename: req.file.filename });
});

// Dosya listeleme endpointi
router.get('/', (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).json({ message: 'Dosyalar listelenemedi.' });
    res.json(files);
  });
});

// Dosya silme endpointi
router.delete('/:filename', (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);
  fs.unlink(filePath, err => {
    if (err) return res.status(500).json({ message: 'Dosya silinemedi.' });
    res.json({ message: 'Dosya silindi.' });
  });
});

module.exports = router;
