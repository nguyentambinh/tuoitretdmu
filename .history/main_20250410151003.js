
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
    const imgElements = document.querySelectorAll('.picture-box .img-sub');

    const canvas = document.createElement('canvas');
    canvas.width = 900;    // Kích thước của .background-box hoặc theo FRAMEPHOTOBOOTH304.png
    canvas.height = 500;
    const ctx = canvas.getContext('2d');

    // Hàm load ảnh
    const loadImage = src => new Promise(resolve => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.src = src;
    });

    // 1. Vẽ ảnh nền
    const backgroundImg = await loadImage(backgroundSrc);
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

    // 2. Vị trí của 4 ảnh con giống layout thật
    const positions = [
      { x: 100, y: 100 }, // ảnh 1
      { x: 370, y: 100 }, // ảnh 2
      { x: 100, y: 270 }, // ảnh 3
      { x: 370, y: 270 }  // ảnh 4
    ];

    for (let i = 0; i < 4; i++) {
      if (imgElements[i]?.src) {
        const userImg = await loadImage(imgElements[i].src);
        const { x, y } = positions[i];
        ctx.drawImage(userImg, x, y, 190, 150); // dùng đúng kích thước CSS
      }
    }

    // 3. Tải xuống ảnh
    const link = document.createElement('a');
    link.download = 'ChaoMung50Nam.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });

  
  
  
  
  
    
