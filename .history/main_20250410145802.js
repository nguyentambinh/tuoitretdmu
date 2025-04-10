
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
  
    if (!elementToCapture) {
      console.error("Không tìm thấy phần tử để chụp!");
      return;
    }
  
    // Chờ tất cả ảnh load xong
    Promise.all(
      Array.from(elementToCapture.querySelectorAll("img")).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = img.onerror = resolve;
        });
      })
    ).then(() => {
      const scale = 3;
  
      // Tạo bản sao DOM để scale mà không phá layout thật
      const clone = elementToCapture.cloneNode(true);
      clone.style.transform = `scale(${scale})`;
      clone.style.transformOrigin = 'top left';
      clone.style.width = `${elementToCapture.offsetWidth * scale}px`;
      clone.style.height = `${elementToCapture.offsetHeight * scale}px`;
      clone.style.position = 'absolute';
      clone.style.left = '-9999px'; // ẩn khỏi màn hình
  
      document.body.appendChild(clone);
  
      domtoimage.toPng(clone)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'ChaoMungKyNiem50nam.png';
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          link.remove();
          clone.remove(); // Xóa bản clone
        })
        .catch((error) => {
          console.error("Lỗi khi tải ảnh:", error);
          clone.remove();
        });
    });
  });
  console.log("JS đã chạy"); // Kiểm tra script có load không
const btn = document.querySelector('.btn-dowload-picture');
if (btn) {
  console.log("Tìm thấy nút tải");
  btn.addEventListener('click', () => {
    console.log("Đã nhấn nút tải");
  });
} else {
  console.warn("Không tìm thấy nút .btn-dowload-picture");
}

  
  
  
  
    
