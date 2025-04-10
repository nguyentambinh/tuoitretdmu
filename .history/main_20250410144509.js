
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
        const cropMargin = 200; // 👈 Cắt mỗi bên 200px (bạn có thể chỉnh)
        const cropX = cropMargin;
        const cropY = 0;
        const cropWidth = canvas.width - cropMargin * 2;
        const cropHeight = canvas.height;
      
        const croppedCanvas = document.createElement('canvas');
        croppedCanvas.width = cropWidth;
        croppedCanvas.height = cropHeight;
      
        const ctx = croppedCanvas.getContext('2d');
        ctx.drawImage(
          canvas,
          cropX, cropY,               // Bắt đầu cắt từ đâu trên canvas gốc
          cropWidth, cropHeight,     // Diện tích cần cắt
          0, 0,                       // Vẽ bắt đầu ở đâu trên canvas mới
          cropWidth, cropHeight      // Kích thước cần vẽ lại
        );
      
        const link = document.createElement('a');
        link.download = 'ChaoMungKyNiem50nam.png';
        link.href = croppedCanvas.toDataURL();
        link.click();
      });
      
      
    
});
