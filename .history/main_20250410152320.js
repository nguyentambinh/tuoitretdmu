
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
  


  document.getElementById("btn-download").addEventListener("click", () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    const canvasWidth = 395;
    const canvasHeight = 475;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  
    const backgroundSrc = './picture/FRAMEPHOTOBOOTH304.png';
    const imgElements = document.querySelectorAll(".img-sub");
  
    const background = new Image();
    background.src = backgroundSrc;
    background.onload = () => {
      ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
  
      // Tính toán vị trí ảnh con — bạn chỉnh toạ độ theo thiết kế của bạn
      const positions = [
        { x: 250, y: 130 },
        { x: 460, y: 130 },
        { x: 250, y: 300 },
        { x: 460, y: 300 }
      ];
  
      let loaded = 0;
  
      imgElements.forEach((img, index) => {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.src = img.src;
  
        image.onload = () => {
          const pos = positions[index];
          ctx.drawImage(image, pos.x, pos.y, 190, 150);
  
          loaded++;
          if (loaded === imgElements.length) {
            // Khi vẽ xong hết -> tải
            const link = document.createElement("a");
            link.download = "ChaoMungKyNiem50nam.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
          }
        };
      });
    };
  });
  
  
  
  
  
    
