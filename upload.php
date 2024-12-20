php
<?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $file = $_FILES['file'];
        $targetPath = 'inventory.json'; // Where to store the uploaded file
        if (move_uploaded_file($file['tmp_name'], $targetPath)) {
            echo 'File uploaded successfully!';
        } else {
            echo 'Error uploading file.';
        }
    }
?>
