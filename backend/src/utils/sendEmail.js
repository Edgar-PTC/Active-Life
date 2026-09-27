import { config } from "../../config.js";

// Envía un correo con la API HTTP de Mailjet (v3.1).
// Se usa HTTP y no SMTP porque el plan gratuito de Render bloquea los puertos SMTP.
// El remitente (MAILJET_SENDER_EMAIL) debe estar verificado en la cuenta de Mailjet.
const sendEmail = async ({ to, subject, html }) => {
    const auth = Buffer
        .from(`${config.mailjet.api_key}:${config.mailjet.secret_key}`)
        .toString("base64");

    const response = await fetch("https://api.mailjet.com/v3.1/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${auth}`
        },
        body: JSON.stringify({
            Messages: [
                {
                    From: { Email: config.mailjet.sender_email, Name: "ActiveLife" },
                    To: [{ Email: to }],
                    Subject: subject,
                    HTMLPart: html
                }
            ]
        })
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Mailjet respondio ${response.status}: ${error}`);
    }

    return response.json();
};

export default sendEmail;
