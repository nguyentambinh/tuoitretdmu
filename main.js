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
      if (!imgElements[i].src || imgElements[i].src.endsWith("/")) {
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



// Cropper cho từng ảnh
let cropper;
const modal = document.getElementById("crop-modal");
const cropImage = document.getElementById("crop-image");
const imgSubs = document.querySelectorAll(".img-sub");

imgSubs.forEach((img) => {
  img.addEventListener("click", () => {
    if (!img.src || img.src.endsWith("/") || img.src === window.location.href) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.style.display = "none";

      input.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (event) {
            img.src = event.target.result;
          };
          reader.readAsDataURL(file);
        }
      });

      document.body.appendChild(input);
      input.click();
      input.remove();
    } else {
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

document.getElementById("crop-confirm").addEventListener("click", () => {
  if (cropper) {
    const canvas = cropper.getCroppedCanvas();
    const croppedDataUrl = canvas.toDataURL("image/png");

    const targetImg = Array.from(imgSubs).find(i => i.src === cropImage.src);
    if (targetImg) {
      targetImg.src = croppedDataUrl;
    }

    closeCropModal();
  }
});

function closeCropModal() {
  modal.style.display = "none";
  if (cropper) {
    cropper.destroy();
    cropper = null;
  }
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
