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
        <img src="" alt="" class="img-sub w-full h-[150px] object-cover rounded">
        <img src="" alt="" class="img-sub w-full h-[150px] object-cover rounded">
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

      for (let i = 0; i < 4; i++) {
        const img = document.getElementById(`img-choosen-${i + 1}`);

        if (files[i]) {
          const reader = new FileReader();
          reader.onload = function (event) {
            img.src = event.target.result;
          };
          reader.readAsDataURL(files[i]);
        } else {
          img.src = "./data/placeholder.jpg";
        }
      }
    });

    // Gắn vào body và click ẩn
    document.body.appendChild(input);
    input.click();

    // Xóa input sau khi chọn để tránh bug khi chọn cùng ảnh lại
    input.remove();
  });
</script>


</html>
