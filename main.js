// Thêm nhiều ảnh cùng lúc vào các khung
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

    // Bước 1: Điền vào các khung chưa có ảnh trước
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

    // Bước 2: Nếu vẫn còn ảnh, ghi đè lên các ảnh đã có (từ đầu)
    if (fileIndex < files.length) {
      for (let i = 0; i < imgElements.length && fileIndex < files.length; i++) {
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


// Khởi tạo cropper và các biến
let cropper;
let currentTargetImg = null;
const imgSubs = document.querySelectorAll(".img-sub");

// Tạo modal crop bằng JS
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

// Tạo các nút
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

// Gắn các phần vào modal
modalContent.appendChild(cropImage);
modalContent.appendChild(cropConfirmBtn);
modalContent.appendChild(cropChangeBtn);
modalContent.appendChild(cropCancelBtn);
modal.appendChild(modalContent);
document.body.appendChild(modal);

// Gán sự kiện cho từng ảnh nhỏ
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

// Nút "Cắt ảnh"
cropConfirmBtn.addEventListener("click", () => {
  if (cropper && currentTargetImg) {
    const canvas = cropper.getCroppedCanvas();
    const croppedDataUrl = canvas.toDataURL("image/png");
    currentTargetImg.src = croppedDataUrl;
    closeCropModal();
  }
});

// Nút "Đổi ảnh"
cropChangeBtn.addEventListener("click", () => {
  selectAndSetImage(cropImage, true);
});

// Hàm chọn ảnh và gán vào img
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

// Đóng modal
function closeCropModal() {
  modal.style.display = "none";
  if (cropper) {
    cropper.destroy();
    cropper = null;
  }
  currentTargetImg = null;
}

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
    let expected = 0;

    imgElements.forEach((img, index) => {
      if (img.src && !img.src.endsWith('/') && img.src !== window.location.href) {
        expected++; // chỉ tính ảnh hợp lệ
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.src = img.src;

        image.onload = () => {
          const pos = positions[index];
          ctx.drawImage(image, pos.x, pos.y, 1415, 1115);
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

    // Nếu không ảnh nào hợp lệ, báo lỗi
    if (expected === 0) {
      alert("Bạn chưa chọn đủ ảnh để tải xuống!");
    }
  };

  background.onerror = () => {
    alert("Không thể tải ảnh nền. Kiểm tra đường dẫn ./picture/FRAMEPHOTOBOOTH304.png");
  };
});