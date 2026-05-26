import express from 'express';
//importar routes
import clientsRouter from './src/routes/clientsRoute.js';
import registerClientRoute from './src/routes/registerClientsRoute.js';
import logInClientsRoute from './src/routes/logInClientsRoute.js';
import recoveryPasswordClientRoute from './src/routes/recoveryPasswordClientRoute.js';
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
app.use("/apiActiveLife/clients", clientsRouter);
app.use("/apiActiveLife/registerClients", registerClientRoute);
app.use("/apiActiveLife/logInClients", logInClientsRoute);
app.use("/apiActiveLife/recoveryPasswordClient", recoveryPasswordClientRoute);

export default app;