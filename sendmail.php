<?php
if ($_POST) {
    $to_Email       = "contacto@etfla.com"; // Replace with recipient email address
    $subject        = 'Message from my website'; // Subject line for emails
     
    $host           = "smtp.hostinger.mx."; // Your SMTP server. For example, smtp.mail.yahoo.com
    $username       = "ana@soygirlpower.com"; //For example, your.email@yahoo.com
    $password       = "wavegroup1"; // Your password
    $SMTPSecure     = "tsl"; // For example, ssl or tls
    $port           = 587; // For example, 465
    
    
    //check if its an ajax request, exit if not
    if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) and strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
        //exit script outputting json data
        $output = json_encode(
        array(
            'type'=>'error',
            'text' => 'Request must come from Ajax'
        )
        );
        
        die($output);
    }
    
    //check $_POST vars are set, exit if any missing
    //En esta parte yace el error
    if (!isset($_POST["Ana"]) || !isset($_POST["soygirlpower.com"]) || !isset($_POST["message"])) {
        $output = json_encode(array('type'=>'error', 'text' => 'Input fields are empty!'));
        die($output);
    }

    //Sanitize input data using PHP filter_var().
    $user_Name        = filter_var($_POST["Ana"], FILTER_SANITIZE_STRING);
    $user_Email       = filter_var($_POST["ana@soygirlpower.com"], FILTER_SANITIZE_EMAIL);
    $user_Message     = filter_var($_POST["message"], FILTER_SANITIZE_STRING);
    
    $user_Message = str_replace("\&#39;", "'", $user_Message);
    $user_Message = str_replace("&#39;", "'", $user_Message);
    
    //additional php validation
    if (strlen($user_Name)<4) { // If length is less than 4 it will throw an HTTP error.
        $output = json_encode(array('type'=>'error', 'text' => 'Name is too short or empty!'));
        die($output);
    }
    if (!filter_var($user_Email, FILTER_VALIDATE_EMAIL)) { //email validation
        $output = json_encode(array('type'=>'error', 'text' => 'Please enter a valid email!'));
        die($output);
    }
    if (strlen($user_Message)<5) { //check emtpy message
        $output = json_encode(array('type'=>'error', 'text' => 'Too short message! Please enter something.'));
        die($output);
    }
    
    //proceed with PHP email.
    //you have to upload class files "class.phpmailer.php" and "class.smtp.php"
    require 'PHPMailer/class.pop3.php';
    require 'PHPMailer/class.phpmailer.php';
    require 'PHPMailer/class.smtp.php';
 
    $mail = new PHPMailer();
     
    $mail->IsSMTP();
    $mail->SMTPAuth = true;
    
    $mail->Host = $host;
    $mail->Username = $username;
    $mail->Password = $password;
    $mail->SMTPSecure = $SMTPSecure;
    $mail->Port = $port;
    
     
    $mail->setFrom($username);
    $mail->addReplyTo($user_Email);
     
    $mail->AddAddress($to_Email);
    $mail->Subject = $subject;
    $mail->Body = $user_Message. "\r\n\n"  .'Name: '.$user_Name. "\r\n" .'Email: '.$user_Email;
    $mail->WordWrap = 200;
    $mail->IsHTML(false);

    if (!$mail->send()) {
        $output = json_encode(array('type'=>'error', 'text' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo));
        die($output);
    } else {
        $output = json_encode(array('type'=>'message', 'text' => 'Hi '.$user_Name .'! Thank you for your email'));
        die($output);
    }
}
?>