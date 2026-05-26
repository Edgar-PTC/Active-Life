const registerEmail = (code, email) => {
  return(
    `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            @media only screen and (max-width: 600px) {
            .responsive-table {
                width: 100% !important;
            }
            .inner-padding {
                padding: 20px !important;
            }
            .code-text {
                font-size: 32px !important;
            }
            }
        </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #66a181; font-family: Arial, sans-serif;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #66a181;">
            <tr>
            <td align="center" style="padding: 20px;">

                <table class="responsive-table" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <tr>
                    <td class="inner-padding" style="padding: 30px;">
                    <h1 style="color: #333333; text-align: center; margin-top: 0; font-size: 24px;">¿No recuerdas tu contraseña?</h1>
                    
                    <p style="color: #666666; line-height: 1.6;">Hola <strong>${email}</strong>,</p>
                    
                    <p style="color: #666666; line-height: 1.6;">Tranquilo ya crearemos una nueva contraseña para ti. A continuación se te presenta el código de verificación. Favor de digitarlo para completar el proceso.</p>
                    
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8f9fa; border-radius: 5px; margin: 20px 0;">
                        <tr>
                        <td align="center" style="padding: 15px;">
                            <p style="margin: 0; color: #333333; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; font-size: 40px; font-weight: bold; letter-spacing: 2px;" class="code-text">${code}</p>
                        </td>
                        </tr>
                    </table>
                    
                    <hr style="margin: 20px 0; border: none; border-top: 1px solid #eeeeee;">
                    
                    <p style="color: #999999; font-size: 12px; text-align: center; margin-bottom: 0;">Este es un correo automático, por favor no responder.</p>
                    </td>
                </tr>
                </table>
            </td>
            </tr>
        </table>
        </body>
        </html>`
)};

export default registerEmail;