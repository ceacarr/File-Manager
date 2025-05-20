const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");

fileInput.addEventListener("change", () => {
  preview.innerHTML = ""; // önceki önizlemeleri temizle
  const file = fileInput.files[0];

  if (!file) return;

  const fileType = file.type;

  // Görselse: img olarak göster
  if (fileType.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.style.width = "200px";
      img.style.height = "auto";
      img.style.marginTop = "10px";
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  } 
  // PDF ise
  else if (fileType === "application/pdf") {
    const object = document.createElement("object");
    object.data = URL.createObjectURL(file);
    object.type = "application/pdf";
    object.width = "300px";
    object.height = "400px";
    preview.appendChild(object);
  } 
  // Diğer dosyalar
  else {
    const p = document.createElement("p");
    p.textContent = "Ön izleme desteklenmiyor: " + file.name;
    preview.appendChild(p);
  }
});
