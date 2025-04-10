<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="main.css">
    <script src="main.js"></script>
    <title></title>
</head>
<body>
    <div class = "container-box">
        <div class="background-box grid grid-cols-2 gap-2 mt-4">
            <img src="/picture/1.png" alt="" class="img-sub w-full h-[150px] object-cover rounded">
            <img src="/picture/2.png" alt="" class="img-sub w-full h-[150px] object-cover rounded">
            <img src="" alt="" class="img-sub w-full h-[150px] object-cover rounded">
            <img src="" alt="" class="img-sub w-full h-[150px] object-cover rounded">
        </div>
        <div class="control-box">
            <button id="btn-add-picture" class=" btn-custom">
                Chọn 4 ảnh
            </button>
            <button class="btn-custom btn-dowload-picture">Tải xuống</button>
        </div>
    </div>
</body>
<script>
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
          imgElements[i].src = ""; // Nếu không có ảnh thì làm trống
        }
      }
    });

    document.body.appendChild(input);
    input.click();
    input.remove();
  });
</script>



</html>
