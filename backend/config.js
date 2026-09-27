import dotenv from "dotenv";

dotenv.config();

export const config = {
    db: {
        URI: process.env.DB_URI
    },
    server: {
        PORT: process.env.PORT || 4000
    },
    jwt:{
        secret: process.env.JWT_SECRET_KEY
    },
    mailjet:{
        api_key: process.env.MAILJET_API_KEY,
        secret_key: process.env.MAILJET_SECRET_KEY,
        sender_email: process.env.MAILJET_SENDER_EMAIL
    },
    cloudinary:{
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    },
    wompi: {
        grant_type: process.env.GRANT_TYPE,
        audience: process.env.AUDIENCE,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
    },
    frontend:{
        url: process.env.FRONTEND_URL
    }
}

// En producción (Render, HTTPS) la web y el API viven en dominios distintos:
// el navegador solo manda la cookie si es Secure + SameSite=None.
// En local (http) se dejan las opciones por defecto para no romper el desarrollo.
export const cookieOptions = process.env.NODE_ENV === "production"
    ? { httpOnly: true, secure: true, sameSite: "none" }
    : {};
