
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

    
    html2canvas(elementToCapture, {
        scale: 3
      }).then(canvas => {
        const cropLeft = 300;     // Cắt bên trái
        const cropRight = 200;    // Cắt bên phải
        const cropTop = 100;      // Cắt phía trên
        const cropBottom = 100;   // Cắt phía dưới
      
        const cropX = cropLeft;
        const cropY = cropTop;
        const cropWidth = canvas.width - cropLeft - cropRight;
        const cropHeight = canvas.height - cropTop - cropBottom;
      
        const croppedCanvas = document.createElement('canvas');
        croppedCanvas.width = cropWidth;
        croppedCanvas.height = cropHeight;
      
        const ctx = croppedCanvas.getContext('2d');
        ctx.drawImage(
          canvas,
          cropX, cropY,
          cropWidth, cropHeight,
          0, 0,
          cropWidth, cropHeight
        );
      
        const link = document.createElement('a');
        link.download = 'ChaoMungKyNiem50nam.png';
        link.href = croppedCanvas.toDataURL();
        link.click();
      });
      
      
      
    
});
