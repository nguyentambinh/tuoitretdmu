
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
let currentTargetImg = null;

document.querySelectorAll('.img-sub').forEach(img => {
    img.addEventListener('click', () => {
        currentTargetImg = img;
        cropImage.src = img.src;
        cropModal.style.display = 'flex';

        cropImage.onload = () => {
            if (cropper) cropper.destroy();
            cropper = new Cropper(cropImage, {
                viewMode: 1
            });
        };
    });
});

cropConfirm.addEventListener('click', () => {
    if (!currentTargetImg || !cropper) return;

    const data = cropper.getData(); 
    currentTargetImg.style.objectFit = 'none';
    currentTargetImg.style.objectPosition = `-${data.x}px -${data.y}px`;
    currentTargetImg.style.width = `${cropImage.naturalWidth}px`;
    currentTargetImg.style.height = `${cropImage.naturalHeight}px`;
    currentTargetImg.style.clipPath = `inset(${data.y}px ${cropImage.naturalWidth - data.x - data.width}px ${cropImage.naturalHeight - data.y - data.height}px ${data.x}px)`;

    closeCropModal();
});


  
  
  
  
    
