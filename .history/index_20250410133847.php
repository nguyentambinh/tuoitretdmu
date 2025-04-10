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
        <div class="background-box">
            <img src="" alt="" class="img-sub">
            <img src="" alt="" class="img-sub">
            <img src="" alt="" class="img-sub">
            <img src="" alt="" class="img-sub"><img src="" alt="" class="img-sub">
        </div>
        <div class="control-box">
        <div class="input-group mb-[10px] btn-custom">
            <button id="btn-add-picture" class="text-white font-bold custom-cursor-on-hover">
                Chọn 4 ảnh
            </button>
            <input >
        </div>
            <button class="btn-custom btn-dowload-picture">Tải xuống</button>
        </div>
    </div>
</body>
<script>
  // Khi nhấn nút "Chọn 4 ảnh" thì click vào input hidden
  document.getElementById("btn-add-picture").addEventListener("click", function () {
    document.getElementById("image-choose").click();
  });

  // Khi người dùng chọn ảnh
  document.getElementById("image-choose").addEventListener("change", function (e) {
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
        // Nếu thiếu ảnh thì giữ placeholder
        img.src = "./data/placeholder.jpg";
      }
    }
  });
</script>

</html>
