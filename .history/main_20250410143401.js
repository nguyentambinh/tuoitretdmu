
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
        scale: 6, 
        useCORS: true  
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'ChaoMungKyNiem50nam.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
});
