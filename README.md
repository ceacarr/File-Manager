 File Manager – Dosya Yükleme ve Yönetimi Uygulaması
Basit bir full-stack dosya yönetim sistemi. Kullanıcılar sisteme giriş yaptıktan sonra PDF, JPG veya PNG dosyalarını yükleyebilir, listeleyebilir ve silebilir.

-Özellikler
Kullanıcı kayıt ve giriş sistemi (JWT doğrulamalı)

PDF/JPG/PNG dosyası yükleme
Yüklenen dosyaların ön izlemesi
Dosya listeleme ve silme
Frontend & Backend ayrımı
Sunucuda dosya saklama


-Kullanılan Teknolojiler
Frontend:

HTML, CSS, JavaScript

Backend:

Node.js
Express.js
Multer (dosya yükleme)
JSON Web Token (JWT)
CORS

-Proje Yapısı
file-manager-app/
├── backend/
│   ├── server.js
│   ├── routes/
│   └── uploads/
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   ├── upload.html
│   └── styles/
│       └── style.css


 -Kurulum Talimatları
 git clone https://github.com/ceacarr/file-manager.git

 Backend kurulumu:
cd file-manager/backend
npm install
npm run dev


Giriş Bilgileri
Kendi kullanıcı hesabını kayıt olarak oluşturabilirsin.



 
