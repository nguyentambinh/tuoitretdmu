
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
    const backgroundSrc = 'image/background.png'; // ảnh nền của bạn (có thể là base64 hoặc URL)
    const imgElements = document.querySelectorAll('.background-box .img-sub'); // 4 ảnh người chọn
  
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 1200;
    const ctx = canvas.getContext('2d');
  
    // Load ảnh nền
    const loadImage = src => new Promise(resolve => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.src = src;
    });
  
    const backgroundImg = await loadImage(backgroundSrc);
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  
    // Load và vẽ từng ảnh người dùng đã chọn
    for (let i = 0; i < 4; i++) {
      if (imgElements[i]?.src) {
        const userImg = await loadImage(imgElements[i].src);
        const x = i % 2 === 0 ? 90 : 530;
        const y = i < 2 ? 150 : 590;
        ctx.drawImage(userImg, x, y, 350, 350); // Resize ảnh theo layout
      }
    }
  
    // Tải ảnh kết quả
    const link = document.createElement('a');
    link.download = 'ghep-anh-canvas.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
  
  
  
  
  
    
