
  document.getElementById("btn-add-picture").addEventListener("click", function () {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.style.display = "none";
    input.addEventListener("change", function (e) {
      const files = e.target.files;
      const imgElements = document.querySelectorAll(".background-box .img-sub");

      for (let i = 0; i < imgElements.length; i++) {
        if (files[i]) {
          const reader = new FileReader();
          reader.onload = function (event) {
            imgElements[i].src = event.target.result;
          };
          reader.readAsDataURL(files[i]);
        } else {
          imgElements[i].src = ""; 
        }
      }
    });

    document.body.appendChild(input);
    input.click();
    input.remove();
  });
  document.getElementById("btn-download").addEventListener("click", async () => {
    const backgroundSrc = './picture/FRAMEPHOTOBOOTH304.png';
  
    const canvas = document.createElement('canvas');
    canvas.width = 900;  // Khớp với .background-box
    canvas.height = 500;
    const ctx = canvas.getContext('2d');
  
    // Hàm load ảnh nền
    const loadImage = src => new Promise(resolve => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.src = src;
    });
  
    // Vẽ ảnh nền
    const backgroundImg = await loadImage(backgroundSrc);
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  
    // Tải ảnh xuống
    const link = document.createElement('a');
    link.download = 'ChaoMung50Nam.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
  
  
  
  
  
    
