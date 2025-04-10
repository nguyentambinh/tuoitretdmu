
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

  document.querySelector('.btn-dowload-picture').addEventListener('click', () => {
    const elementToCapture = document.querySelector('.background-box');

    .background-box {
        outline: 3px dashed red;
      }
      
    html2canvas(elementToCapture, {
        scale: 3
      }).then(canvas => {
        const cropX = 200; // chỉnh lại tuỳ theo dư bao nhiêu
        const cropY = 0;
        const cropWidth = canvas.width - 400; // crop 100px mỗi bên
        const cropHeight = canvas.height;
      
        const croppedCanvas = document.createElement('canvas');
        croppedCanvas.width = cropWidth;
        croppedCanvas.height = cropHeight;
      
        const ctx = croppedCanvas.getContext('2d');
        ctx.drawImage(canvas, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
      
        const link = document.createElement('a');
        link.download = 'ChaoMungKyNiem50nam.png';
        link.href = croppedCanvas.toDataURL();
        link.click();
      });
      
    
});
