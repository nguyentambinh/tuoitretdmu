
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

//   document.querySelector('.btn-dowload-picture').addEventListener('click', () => {
//     const elementToCapture = document.querySelector('.background-box');
  
//     // Đảm bảo tất cả ảnh đã load xong
//     Promise.all(
//       Array.from(elementToCapture.querySelectorAll("img")).map(img => {
//         if (img.complete) return Promise.resolve();
//         return new Promise(resolve => {
//           img.onload = img.onerror = resolve;
//         });
//       })
//     ).then(() => {
//       html2canvas(elementToCapture, {
//         scale: 3,            // Scale cao để ảnh rõ nét
//         useCORS: true,
//         allowTaint: false
//       }).then(canvas => {
//         const cropLeft = 300;     
//         const cropRight = 300;    
//         const cropTop = 20;     
//         const cropBottom = 20;   
  
//         const cropX = cropLeft;
//         const cropY = cropTop;
//         const cropWidth = canvas.width - cropLeft - cropRight;
//         const cropHeight = canvas.height - cropTop - cropBottom;
  
//         const croppedCanvas = document.createElement('canvas');
//         croppedCanvas.width = cropWidth;
//         croppedCanvas.height = cropHeight;
  
//         const ctx = croppedCanvas.getContext('2d');
//         ctx.drawImage(
//           canvas,
//           cropX, cropY,
//           cropWidth, cropHeight,
//           0, 0,
//           cropWidth, cropHeight
//         );
  
//         const link = document.createElement('a');
//         link.download = 'ChaoMungKyNiem50nam.png';
//         link.href = croppedCanvas.toDataURL();
//         link.click();
//       });
//     });
//   });
document.querySelector('.btn-dowload-picture').addEventListener('click', () => {
    const elementToCapture = document.querySelector('.background-box');
  
    // Chờ tất cả ảnh load xong
    Promise.all(
      Array.from(elementToCapture.querySelectorAll("img")).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = img.onerror = resolve;
        });
      })
    ).then(() => {
      const scale = 3; // scale độ phân giải cao hơn
  
      domtoimage.toPng(elementToCapture, {
        quality: 1,
        width: elementToCapture.offsetWidth * scale,
        height: elementToCapture.offsetHeight * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: 'top left'
        }
      }).then(function (dataUrl) {
        const link = document.createElement('a');
        link.download = 'ChaoMungKyNiem50nam.png';
        link.href = dataUrl;
        link.click();
      }).catch(function (error) {
        console.error('Lỗi khi tải ảnh:', error);
      });
    });
  });
  
  
    
