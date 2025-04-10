
document.getElementById("btn-add-picture").addEventListener("click", function () {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.multiple = true;
  input.style.display = "none";

  input.addEventListener("change", function (e) {
    const files = e.target.files;
    const imgElements = document.querySelectorAll(".background-box .img-sub");

    let imgIndex = 0;
    for (let i = 0; i < files.length; i++) {
      // Tìm ảnh .img-sub đầu tiên chưa có ảnh (src == "" hoặc chưa được gán src)
      while (imgIndex < imgElements.length && imgElements[imgIndex].src) {
        imgIndex++;
      }

      if (imgIndex < imgElements.length) {
        const reader = new FileReader();
        const currentImg = imgElements[imgIndex];

        reader.onload = function (event) {
          currentImg.src = event.target.result;
        };

        reader.readAsDataURL(files[i]);
        imgIndex++;
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
  
    const canvasWidth = 3000;
    const canvasHeight = 3750;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  
    const backgroundSrc = './picture/FRAMEPHOTOBOOTH304.png';
    const imgElements = document.querySelectorAll(".img-sub");
  
    const background = new Image();
    background.src = backgroundSrc;
    background.onload = () => {
      ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
  
      const positions = [
        { x: 80, y: 680 },
        { x: 1505, y: 680 },
        { x: 80, y: 1867 },
        { x: 1505, y: 1867 }
      ];
      let loaded = 0;
      imgElements.forEach((img, index) => {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.src = img.src;
  
        image.onload = () => {
          const pos = positions[index];
          ctx.drawImage(image, pos.x, pos.y, 1415, 1115); 
          loaded++;
          if (loaded === imgElements.length) {
            const link = document.createElement("a");
            link.download = "ChaoMungKyNiem50nam.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
          }
        };
      });
    };
  });
  let cropper;
const modal = document.getElementById("crop-modal");
const cropImage = document.getElementById("crop-image");
const imgSubs = document.querySelectorAll(".img-sub");

// Khi click vào từng ảnh nhỏ
imgSubs.forEach((img) => {
    img.addEventListener("click", () => {
        cropImage.src = img.src;
        modal.style.display = "flex";

        // Chờ ảnh load xong mới gắn cropper
        cropImage.onload = () => {
            if (cropper) {
                cropper.destroy();
            }
            cropper = new Cropper(cropImage, {
                viewMode: 1,
                aspectRatio: 1, // Tùy chỉnh tỉ lệ cắt (1:1, 4:3, v.v.)
                autoCropArea: 0.8,
                movable: true,
                zoomable: true,
                scalable: true,
                cropBoxResizable: true,
            });
        };
    });
});

// Khi bấm nút "Cắt ảnh"
document.getElementById("crop-confirm").addEventListener("click", () => {
    if (cropper) {
        const canvas = cropper.getCroppedCanvas();
        const croppedDataUrl = canvas.toDataURL("image/png");

        // Thay đổi ảnh đã chọn
        const targetImg = Array.from(imgSubs).find(i => i.src === cropImage.src);
        if (targetImg) {
            targetImg.src = croppedDataUrl;
        }

        closeCropModal();
    }
});

// Hàm đóng modal
function closeCropModal() {
    modal.style.display = "none";
    if (cropper) {
        cropper.destroy();
        cropper = null;
    }
}

  
  
  
  
    
