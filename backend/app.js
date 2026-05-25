import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors"
import limiter from './src/middlewares/rateLimiter.js';
import { config } from './config.js';

const app = express();

app.use(limiter);

app.use(cors({
    origin: [config.frontend.url],
    credentials: true
}))
app.use(cookieParser());

//que acepte json desde postman
app.use(express.json());

//endpoints

export default app;