import dotenv from "dotenv";

dotenv.config();

export const config = {
    db: {
        URI: process.env.DB_URI
    },
    server: {
        PORT: process.env.PORT
    },
    jwt:{
        secret: process.env.JWT_SECRET_KEY
    },
    email:{
        user_email: process.env.USER_EMAIL,
        user_password: process.env.USER_PASSWORD
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