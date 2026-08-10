<?php
// Configuración de envío de correo del formulario de contacto.
// Reemplaza estos valores por los datos reales de tu cuenta SMTP antes de publicar el sitio.
// Puedes usar el SMTP de tu propio correo (Gmail, Zoho, Hostinger, etc.) o un servicio
// transaccional como Brevo, SendGrid o Mailgun.

return [
    'smtp_host' => 'smtp.tuproveedor.com',   // ej. smtp.gmail.com, smtp.zoho.com, smtp-relay.brevo.com
    'smtp_port' => 587,                       // 587 (TLS) o 465 (SSL)
    'smtp_secure' => 'tls',                   // 'tls' o 'ssl'
    'smtp_user' => 'usuario@tudominio.com',   // usuario de la cuenta SMTP
    'smtp_pass' => 'REEMPLAZAR_CONTRASENA',   // contraseña o API key (usa "contraseña de aplicación" en Gmail)

    'from_email' => 'usuario@tudominio.com',  // correo remitente ("From")
    'from_name' => 'Sitio web Kontanos',
    'to_email' => 'contacto@kontanos.com',    // correo donde Kontanos recibe los mensajes
    'to_name' => 'Kontanos',
];
