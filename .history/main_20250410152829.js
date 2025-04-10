
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
    const image = new Image();
    image.crossOrigin = "anonymous"; // nếu ảnh từ server ngoài
    image.src = './picture/FRAMEPHOTOBOOTH304.png';
  
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
  
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0);
  
      const link = document.createElement("a");
      link.download = "KhungNen.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
  
    image.onerror = () => {
      alert("Không thể tải ảnh nền.");
    };
  });
  
  
  
  
  
  
  
    
