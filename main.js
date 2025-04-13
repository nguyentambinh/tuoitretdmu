
// Tải ảnh lên và gán cho các khung trống
// =============================
document.getElementById("btn-add-picture").addEventListener("click", function () {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.multiple = true;
  input.style.display = "none";

  input.addEventListener("change", function (e) {
    const files = e.target.files;
    const imgElements = document.querySelectorAll(".img-sub");
    let fileIndex = 0;

    for (let i = 0; i < imgElements.length && fileIndex < files.length; i++) {
      if (!imgElements[i].src || imgElements[i].src.endsWith("/") || imgElements[i].src === window.location.href) {
        const reader = new FileReader();
        const currentImg = imgElements[i];
        reader.onload = function (event) {
          currentImg.src = event.target.result;
        };
        reader.readAsDataURL(files[fileIndex]);
        fileIndex++;
      }
    }
  });

  document.body.appendChild(input);
  input.click();
  input.remove();
});

// Tạo modal cropper
let cropper;
let currentTargetImg = null;
const imgSubs = document.querySelectorAll(".img-sub");

const modal = document.createElement("div");
modal.id = "crop-modal";
modal.style = `
  display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.6); justify-content: center; align-items: center; z-index: 9999;
`;

const modalContent = document.createElement("div");
modalContent.style = `
  background: white; padding: 20px; border-radius: 10px; text-align: center;
  max-width: 90%; max-height: 90%;
`;

const cropImage = document.createElement("img");
cropImage.id = "crop-image";
cropImage.style = "max-width: 100%; max-height: 400px; display: block; margin-bottom: 10px;";

const cropConfirmBtn = document.createElement("button");
cropConfirmBtn.id = "crop-confirm";
cropConfirmBtn.innerText = "Cắt ảnh";
cropConfirmBtn.style = "margin: 5px; padding: 8px 16px;";

const cropChangeBtn = document.createElement("button");
cropChangeBtn.id = "crop-change";
cropChangeBtn.innerText = "Đổi ảnh";
cropChangeBtn.style = "margin: 5px; padding: 8px 16px;";

const cropCancelBtn = document.createElement("button");
cropCancelBtn.innerText = "Hủy";
cropCancelBtn.style = "margin: 5px; padding: 8px 16px;";
cropCancelBtn.addEventListener("click", closeCropModal);

modalContent.appendChild(cropImage);
modalContent.appendChild(cropConfirmBtn);
modalContent.appendChild(cropChangeBtn);
modalContent.appendChild(cropCancelBtn);
modal.appendChild(modalContent);
document.body.appendChild(modal);

imgSubs.forEach((img) => {
  img.addEventListener("click", () => {
    if (!img.src || img.src.endsWith("/") || img.src === window.location.href) {
      selectAndSetImage(img);
    } else {
      currentTargetImg = img;
      cropImage.src = img.src;
      modal.style.display = "flex";
      cropImage.onload = () => {
        if (cropper) cropper.destroy();
        cropper = new Cropper(cropImage, {
          viewMode: 1,
          aspectRatio: 1,
          autoCropArea: 0.8,
          movable: true,
          zoomable: true,
          scalable: true,
          cropBoxResizable: true,
        });
      };
    }
  });
});

cropConfirmBtn.addEventListener("click", () => {
  if (cropper && currentTargetImg) {
    const canvas = cropper.getCroppedCanvas();
    const croppedDataUrl = canvas.toDataURL("image/png");
    currentTargetImg.src = croppedDataUrl;
    closeCropModal();
  }
});

cropChangeBtn.addEventListener("click", () => {
  selectAndSetImage(cropImage, true);
});

function selectAndSetImage(targetImg, updateCropper = false) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.style.display = "none";

  input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        targetImg.src = event.target.result;
        if (updateCropper) {
          cropImage.onload = () => {
            if (cropper) cropper.destroy();
            cropper = new Cropper(cropImage, {
              viewMode: 1,
              aspectRatio: 1,
              autoCropArea: 0.8,
              movable: true,
              zoomable: true,
              scalable: true,
              cropBoxResizable: true,
            });
          };
        }
      };
      reader.readAsDataURL(file);
    }
  });

  document.body.appendChild(input);
  input.click();
  document.body.removeChild(input);
}

function closeCropModal() {
  modal.style.display = "none";
  if (cropper) {
    cropper.destroy();
    cropper = null;
  }
  currentTargetImg = null;
}

// Nút tải ảnh cuối cùng
// =====================
document.getElementById("btn-download").addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const canvasWidth = 3000;
  const canvasHeight = 3750;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const imgWidth = 1315;
  const imgHeight = 1023;

  const background = new Image();
  background.src = './picture/FRAMEPHOTOBOOTH304.png';
  const imgElements = document.querySelectorAll(".img-sub");

  background.onload = () => {
    ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);

    const positions = [
      { x: 125, y: 790 },
      { x: 1560, y: 790 },
      { x: 125, y: 1935 },
      { x: 1560, y: 1935 }
    ];

    let loaded = 0;
    let expected = 0;

    const cornerRadius = 30; // Kích thước bo góc

imgElements.forEach((img, index) => {
  if (img.src && !img.src.endsWith('/') && img.src !== window.location.href) {
    expected++;
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = img.src;

    image.onload = () => {
      const pos = positions[index];
      ctx.save();
      ctx.beginPath();
      
      // Vẽ các góc bo tròn với radius là `cornerRadius`
      ctx.moveTo(pos.x + cornerRadius, pos.y);
      ctx.lineTo(pos.x + imgWidth - cornerRadius, pos.y);
      ctx.quadraticCurveTo(pos.x + imgWidth, pos.y, pos.x + imgWidth, pos.y + cornerRadius);
      ctx.lineTo(pos.x + imgWidth, pos.y + imgHeight - cornerRadius);
      ctx.quadraticCurveTo(pos.x + imgWidth, pos.y + imgHeight, pos.x + imgWidth - cornerRadius, pos.y + imgHeight);
      ctx.lineTo(pos.x + cornerRadius, pos.y + imgHeight);
      ctx.quadraticCurveTo(pos.x, pos.y + imgHeight, pos.x, pos.y + imgHeight - cornerRadius);
      ctx.lineTo(pos.x, pos.y + cornerRadius);
      ctx.quadraticCurveTo(pos.x, pos.y, pos.x + cornerRadius, pos.y);

      ctx.closePath();
      ctx.clip();
      ctx.drawImage(image, pos.x, pos.y, imgWidth, imgHeight); // Vẽ ảnh vào canvas
      ctx.restore();

      loaded++;
      if (loaded === expected) {
        const link = document.createElement("a");
        link.download = "ChaoMungKyNiem50nam.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
    };
  }
});


    if (expected === 0) {
      alert("Bạn chưa chọn đủ ảnh để tải xuống!");
    }
  };

  background.onerror = () => {
    alert("Không thể tải ảnh nền. Kiểm tra đường dẫn ./picture/FRAMEPHOTOBOOTH304.png");
  };
});