<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="main.css">
    
    <title>Chào mừng Kỷ niệm 50 năm Ngày Giải phóng miền Nam, thống nhất đất nước</title>
</head>
<body>
    
    <div class = "container-box">
        <div class="background-box">
            <img src="./picture/FRAMEPHOTOBOOTH304.png" class="background-image" alt="frame" />
            <div class="picture-box">
                <img src="/picture/1.png" alt="" class="img-sub">
                <img src="/picture/2.png" alt="" class="img-sub">
                <img src="/picture/3.png" alt="" class="img-sub">
                <img src="/picture/4.png" alt="" class="img-sub">
            </div>
        </div>
        <div class="control-box">
            <button id="btn-add-picture" class=" btn-custom">
                Chọn 4 ảnh
            </button>
            <button id="btn-download" class="btn-custom">Tải xuống</button>
        </div>
    </div>
    <div id="crop-modal" style="display:none; position:fixed; top:0; left:0; 
    width:100vw; height:100vh; background:rgba(0,0,0,0.8); justify-content:center; align-items:center; z-index:1000;">
    <div style="background:white; padding:10px; border-radius:10px;">
        <img id="crop-image" style="max-width:90vw; max-height:80vh;">
        <div style="text-align:right; margin-top:10px;">
            <button id="crop-confirm">Cắt ảnh</button>
            <button onclick="closeCropModal()">Hủy</button>
        </div>
    </div>
</div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="main.js"></script>
</body>
</html>
