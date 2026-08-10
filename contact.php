<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

function responder(bool $ok, string $mensaje = ''): void
{
    echo json_encode(['ok' => $ok, 'mensaje' => $mensaje]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    responder(false, 'Método no permitido.');
}

$nombre = trim((string) filter_input(INPUT_POST, 'nombre', FILTER_UNSAFE_RAW));
$empresa = trim((string) filter_input(INPUT_POST, 'empresa', FILTER_UNSAFE_RAW));
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$telefono = trim((string) filter_input(INPUT_POST, 'telefono', FILTER_UNSAFE_RAW));
$servicio = trim((string) filter_input(INPUT_POST, 'servicio', FILTER_UNSAFE_RAW));
$mensaje = trim((string) filter_input(INPUT_POST, 'mensaje', FILTER_UNSAFE_RAW));

if ($nombre === '' || $email === false || $mensaje === '') {
    http_response_code(422);
    responder(false, 'Faltan campos obligatorios.');
}

$config = require __DIR__ . '/mail-config.php';

$cuerpo = "Nombre: {$nombre}\n"
    . "Empresa: {$empresa}\n"
    . "Correo: {$email}\n"
    . "Teléfono: {$telefono}\n"
    . "Servicio de interés: {$servicio}\n\n"
    . "Mensaje:\n{$mensaje}\n";

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = $config['smtp_host'];
    $mail->Port = $config['smtp_port'];
    $mail->SMTPSecure = $config['smtp_secure'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['smtp_user'];
    $mail->Password = $config['smtp_pass'];
    $mail->CharSet = 'UTF-8';

    $mail->setFrom($config['from_email'], $config['from_name']);
    $mail->addAddress($config['to_email'], $config['to_name']);
    $mail->addReplyTo($email, $nombre);

    $mail->Subject = 'Nuevo contacto desde el sitio web - Kontanos';
    $mail->Body = $cuerpo;
    $mail->isHTML(false);

    $mail->send();
    responder(true, 'Enviado.');
} catch (PHPMailerException $e) {
    error_log('Error al enviar correo de contacto: ' . $mail->ErrorInfo);
    responder(false, 'No se pudo enviar el correo.');
}
