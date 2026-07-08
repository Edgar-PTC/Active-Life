import express from 'express';
//importar routes
import clientsRouter from './src/routes/clientsRoute.js';
import registerClientRoute from './src/routes/registerClientsRoute.js';
import logInClientsRoute from './src/routes/logInClientsRoute.js';
import recoveryPasswordClientRoute from './src/routes/recoveryPasswordClientRoute.js';
import productRoute from './src/routes/productsRoute.js';
import carShopRoute from './src/routes/carShopRoute.js';
import authRoute from './src/routes/authRoute.js'
import cookieParser from 'cookie-parser';
import cors from "cors"
import limiter from './src/middlewares/rateLimiter.js';
import { config } from './config.js';
import registerEmployeesRoute from "./src/routes/registerEmployeesRoute.js";
import loginEmployeesRoute from "./src/routes/loginEmployeesRoute.js";
import employeesRoute from "./src/routes/employeesRoute.js";
import adminsRoute from "./src/routes/adminsRoute.js";
import registerAdminRoute from "./src/routes/registerAdminsRoute.js";
import loginAdminRoute from "./src/routes/loginAdminRoute.js";

const app = express();

app.use(limiter);

app.use(cors({
    origin: [config.frontend.url],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))
app.use(cookieParser());

//que acepte json desde postman
app.use(express.json());

//endpoints
app.use("/apiActiveLife/clients", clientsRouter);
app.use("/apiActiveLife/registerClients", registerClientRoute);
app.use("/apiActiveLife/registerAdmin",registerAdminRoute);
app.use("/apiActiveLife/loginAdmin",loginAdminRoute);
app.use("/apiActiveLife/loginEmployee",loginEmployeesRoute);
app.use("/apiActiveLife/employees",employeesRoute);
app.use("/apiActiveLife/registerEmployee",registerEmployeesRoute);
app.use("/apiActiveLife/logInClients", logInClientsRoute);
app.use("/apiActiveLife/recoveryPasswordClient", recoveryPasswordClientRoute);
app.use("/apiActiveLife/products", productRoute);
app.use("/apiActiveLife/carShop", carShopRoute);
app.use("/apiActiveLife/auth", authRoute);

export default app;