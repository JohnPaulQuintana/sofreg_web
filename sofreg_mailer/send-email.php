<?php
// Include PHPMailer files
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Define your security code (this could be stored in a more secure location like a database)
$valid_code = '123456'; // This is the valid code for the request

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validate required fields
    if (
        !isset($_POST['name'], $_POST['email'], $_POST['address'], $_POST['contact'], 
               $_POST['subject'], $_POST['body'], $_POST['security_code']) || 
        // Either portfolio_pdf or portfolio_url must be provided
        (empty($_FILES['portfolio_pdf']['tmp_name']) && empty($_POST['portfolio_url'])) || 
        empty($_FILES['resume_pdf']['tmp_name'])
    ) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields: name, email, address, contact, portfolioPdf (or portfolioUrl), resumePdf, subject, body, securityCode']);
        exit;
    }
    
    // Extract the form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $address = $_POST['address'];
    $contact = $_POST['contact'];
    $portfolioPdf = isset($_FILES['portfolio_pdf']) ? $_FILES['portfolio_pdf'] : null;;  // Assuming base64 or file path
    $portfolioUrl = $_POST['portfolio_url'];  // Assuming base64 or file path
    $resumePdf = $_FILES['resume_pdf'];        // Assuming base64 or file path
    $subject = $_POST['subject'];
    $body = $_POST['body'];
    $securityCode = $_POST['security_code'];

    // Validate the security code
    if ($securityCode !== $valid_code) {
        http_response_code(403); // Forbidden - Invalid security code
        echo json_encode(['error' => 'Invalid security code']);
        exit;
    }

    // Validate that the email, subject, and body are not empty
    if (empty($email) || empty($subject) || empty($body)) {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'Missing required fields: email, subject, body']);
        exit;
    }

    // Get the temporary paths of the uploaded files
    $portfolioPdfPath = $portfolioPdf ? $_FILES['portfolio_pdf']['tmp_name'] : null;
    $resumePdfPath = $_FILES['resume_pdf']['tmp_name'];

    // Initialize PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();                          // Send using SMTP
        $mail->Host = 'smtp.gmail.com';           // Set your SMTP server (e.g., Gmail, SendGrid)
        $mail->SMTPAuth = true;                   // Enable SMTP authentication
        $mail->Username = 'jpquintana2024@gmail.com'; // SMTP username
        $mail->Password = 'feumefisevzihwth';   // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption
        $mail->Port = 587;                        // TCP port to connect to

        // Recipients
        $mail->setFrom('jpquintana2024@gmail.com', 'Mailer'); // Actual sender
        $mail->addAddress($email, $name);        // Add recipient email and name

        // Attach the PDFs if they exist
        if ($portfolioPdfPath) {
            $mail->addAttachment($portfolioPdfPath, 'portfolio.pdf');  // Attach the portfolio PDF
        }
        $mail->addAttachment($resumePdfPath, 'resume.pdf');        // Attach the resume PDF


        // Format the email body in HTML
        $htmlContent = "
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        color: #333;
                        background-color: #f4f4f4;
                        padding: 20px;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    h2 {
                        color: #333;
                    }
                    .info {
                        margin-bottom: 15px;
                    }
                    .info span {
                        font-weight: bold;
                    }
                    .footer {
                        margin-top: 20px;
                        font-size: 12px;
                        color: #777;
                    }
                </style>
            </head>
            <body>
                <div class='container'>
                    <h2>Application for Position: $subject</h2>
                    <p>Hello,</p>
                    <p>You have received an application from the following user:</p>
                    <div class='info'>
                        <span>Name:</span> $name<br>
                        <span>Email:</span> $email<br>
                        <span>Address:</span> $address<br>
                        <span>Contact:</span> $contact<br>
                        <span>Portfolio:</span> $portfolioUrl<br>
                    </div>
                    <br/>
                    <p>Dear Hiring Manager,</p>
                    <p>I hope this message finds you well. My name is <strong>$name</strong>, and I am writing to express my interest in the <strong>$subject</strong> position at your esteemed company. I am excited about the opportunity to contribute my skills and experience to your team.</p>
                    <p>Please find the details of my application below:</p>
                    <div class='footer'>
                        <p>Best regards,<br>$name</p>
                    </div>
                </div>
            </body>
            </html>
        ";

        // Email content
        $mail->isHTML(true);                      // Set email format to HTML
        $mail->Subject = "Job Application: $subject";
        $mail->Body    = $htmlContent;

        // Send email
        $mail->send();
        echo json_encode(['success' => 'Email sent successfully']);
    } catch (Exception $e) {
        // Error handling if email sending fails
        http_response_code(500);
        echo json_encode(['error' => 'Mailer Error: ' . $mail->ErrorInfo]);
    }
}
?>
