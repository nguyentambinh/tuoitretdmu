
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
// document.getElementById("btn-download").addEventListener("click", async function () {
//     const imgElements = document.querySelectorAll(".background-box .img-sub");
//     const width = 800;
//     const height = 600;
//     const rows = 2;
//     const cols = 2;
//     const padding = 10;
  
//     const canvas = document.createElement("canvas");
//     canvas.width = width;
//     canvas.height = height;
//     const ctx = canvas.getContext("2d");
  
//     const loadedImages = await Promise.all(
//       Array.from(imgElements).map((img, i) => {
//         return new Promise((resolve) => {
//           const image = new Image();
//           image.crossOrigin = "anonymous";
//           image.onload = () => resolve(image);
//           image.onerror = () => resolve(null);
//           image.src = img.src;
//         });
//       })
//     );
  
//     loadedImages.forEach((img, i) => {
//       if (!img) return;
//       const x = (i % cols) * (width / cols) + padding;
//       const y = Math.floor(i / cols) * (height / rows) + padding;
//       const w = (width / cols) - padding * 2;
//       const h = (height / rows) - padding * 2;
//       ctx.drawImage(img, x, y, w, h);
//     });
  
//     const link = document.createElement("a");
//     link.download = "ghep-anh.png";
//     link.href = canvas.toDataURL("image/png");
//     link.click();
//   });
  
  
  
  
  
    
