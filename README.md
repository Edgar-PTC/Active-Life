# 🏋️ Active Life

Plataforma web full-stack para la gestión de un gimnasio: tienda de productos, membresías, reseñas y un panel de administración completo. El frontend está construido con **React + Vite** y el backend con **Node.js + Express + MongoDB**.

## Descripción

**Active Life** es una aplicación web pensada para la administración integral de un gimnasio. Permite a los **clientes** explorar gimnasios, comprar productos, pagar membresías y dejar reseñas; y permite a los **administradores** gestionar productos, proveedores, pedidos, membresías y gimnasios desde un panel dedicado.

El repositorio está dividido en dos proyectos independientes que se ejecutan por separado:

| Carpeta | Contenido |
|---|---|
| [`empaquetacion/`](empaquetacion) | Frontend en React (Vite) |
| [`backend/`](backend) | API REST en Node.js/Express |

## Tecnologías utilizadas

### Frontend (`empaquetacion/`)

| Tecnología | Uso |
|---|---|
| [React 19](https://react.dev/) | Librería de UI basada en componentes |
| [Vite](https://vite.dev/) | Bundler y servidor de desarrollo |
| [React Router DOM](https://reactrouter.com/) | Enrutamiento y rutas protegidas |
| [Tailwind CSS 4](https://tailwindcss.com/) | Estilos utilitarios |
| [Lucide / Lucide React](https://lucide.dev/) | Íconos |
| [SweetAlert2](https://sweetalert2.github.io/) | Alertas y confirmaciones |
| [ESLint](https://eslint.org/) | Linter de código |

### Backend (`backend/`)

| Tecnología | Uso |
|---|---|
| [Express 5](https://expressjs.com/) | Framework del servidor HTTP |
| [Mongoose](https://mongoosejs.com/) | ODM para MongoDB |
| [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken) | Autenticación por token |
| [bcryptjs](https://www.npmjs.com/package/bcryptjs) | Hash de contraseñas |
| [Cloudinary](https://cloudinary.com/) + [Multer](https://www.npmjs.com/package/multer) | Almacenamiento y subida de imágenes |
| [Nodemailer](https://nodemailer.com/) | Envío de correos (verificación / recuperación de contraseña) |
| [cookie-parser](https://www.npmjs.com/package/cookie-parser) | Manejo de cookies (sesión) |
| [cors](https://www.npmjs.com/package/cors) | Control de acceso entre orígenes |
| [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) | Limitación de peticiones |
| [dotenv](https://www.npmjs.com/package/dotenv) | Variables de entorno |
| [nodemon](https://nodemon.io/) | Recarga automática en desarrollo |

## Estructura del proyecto

<details>
<summary><strong>📁 backend/</strong> (click para expandir)</summary>

```
backend/
├── app.js                 # Configuración de Express y montaje de rutas
├── index.js                # Punto de entrada (levanta el servidor)
├── database.js              # Conexión a MongoDB
├── config.js                # Carga centralizada de variables de entorno
└── src/
    ├── controller/           # Lógica de negocio por entidad
    ├── models/               # Esquemas de Mongoose
    ├── routes/               # Definición de endpoints Express
    ├── middlewares/          # Middlewares (rate limiter, etc.)
    └── utils/                # Utilidades (Cloudinary, correos)
```

</details>

<details>
<summary><strong>📁 empaquetacion/</strong> (click para expandir)</summary>

```
empaquetacion/
└── src/
    ├── App.jsx                # Definición de rutas y layouts
    ├── main.jsx                # Punto de entrada de React
    ├── Components/             # Componentes reutilizables (navs, tablas, modales, cards)
    ├── Context/                # Contexto de autenticación del cliente
    ├── hooks/                  # Hooks personalizados (carrito, productos, perfil, recuperación)
    ├── Pages/
    │   ├── Web - Client/        # Vistas públicas y de cliente
    │   └── Admin/                # Vistas del panel de administración
    └── assets/                 # Imágenes e íconos estáticos
```

</details>

## Requisitos previos

- [Node.js](https://nodejs.org/) 20 o superior y npm
- Una base de datos [MongoDB](https://www.mongodb.com/) (Atlas o local)
- Una cuenta de [Cloudinary](https://cloudinary.com/) para el manejo de imágenes
- Una cuenta de correo (Gmail) con [contraseña de aplicación](https://support.google.com/accounts/answer/185833) para el envío de correos

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Edgar-PTC/Active-Life.git
cd Active-Life
```

### 2. Levantar el backend

```bash
cd backend
npm install
```

Crea un archivo `backend/.env` (ver [Variables de entorno](#variables-de-entorno-backendenv)) y luego inicia el servidor:

```bash
npm run dev
```

El servidor quedará disponible en `http://localhost:4000`.

### 3. Levantar el frontend

En otra terminal:

```bash
cd empaquetacion
npm install
npm run dev
```

El frontend quedará disponible en `http://localhost:5173`.

> ⚠️ El backend debe estar corriendo antes de usar el frontend, ya que las páginas consumen la API directamente en `http://localhost:4000/apiActiveLife`.

## Scripts disponibles

| Ubicación | Comando | Descripción |
|---|---|---|
| `backend/` | `npm run dev` | Inicia el servidor con recarga automática (`node --watch`) |
| `empaquetacion/` | `npm run dev` | Inicia el servidor de desarrollo de Vite |
| `empaquetacion/` | `npm run build` | Genera el build de producción |
| `empaquetacion/` | `npm run preview` | Sirve el build de producción localmente |
| `empaquetacion/` | `npm run lint` | Ejecuta ESLint sobre el proyecto |

## Endpoints principales de la API

Todos los endpoints están montados bajo el prefijo `/apiActiveLife`:

| Recurso | Ruta base | Descripción |
|---|---|---|
| Clientes | `/clients` | CRUD de clientes |
| Registro / login de clientes | `/registerClients`, `/logInClients` | Alta e inicio de sesión de clientes |
| Recuperación de contraseña | `/recoveryPasswordClient`, `/recoveryPasswordAdmin` | Flujo de recuperación por correo |
| Administradores | `/admins`, `/registerAdmin`, `/loginAdmin` | Gestión y autenticación de administradores |
| Empleados | `/employees`, `/registerEmployee`, `/loginEmployee` | Gestión y autenticación de empleados |
| Productos | `/products` | CRUD de productos de la tienda |
| Carrito | `/carShop` | Gestión del carrito de compras |
| Pedidos | `/sales` | Gestión de pedidos/ventas |
| Gimnasios | `/gyms` | CRUD de gimnasios |
| Reseñas | `/gymComments` | Comentarios/reseñas de gimnasios |
| Autenticación | `/auth` | Verificación de sesión (cliente/admin) |

## Funcionalidades

### 👤 Cliente
- Inicio de sesión, registro y verificación de correo
- Exploración de gimnasios y detalle de cada uno
- Tienda de productos con detalle de producto
- Carrito de compras y pago
- Pago de membresías
- Reseñas de gimnasios
- Perfil y dashboard personal

### 🛠️ Administrador
- Dashboard con métricas generales (productos, clientes, pedidos, ingresos)
- Gestión de productos y proveedores
- Gestión de gimnasios y membresías
- Gestión de pedidos con cambio de estado (aprobar/rechazar)
- Gestión de perfil propio
- Registro, verificación e inicio de sesión de administradores

## Equipo de desarrollo

| Integrante | Carnet | Interfaces realizadas |
|---|---|---|
| **Edgar Pineda** | 202030280 | Inicio (página principal), Nosotros, Carrito - Cliente, Pago de carrito - Cliente, Dashboard - Cliente, Registro, Gimnasio - Admin, Inicio de sesión - Cliente, Agregar proveedores - Admin, Agregar gimnasios - Admin |
| **Christopher Sanchez** | 20230062 | Gimnasios - Cliente, Detalle de gimnasio - Cliente, Reseñas, Pago de membresía, Inicio de sesión - Admin, Agregar productos - Admin |
| **Emilio Cruz** | 20230294 | Tienda - Cliente, Detalle de producto - Cliente, Inicio de sesión - Admin, Productos - Admin |
| **Juan Burgos** | 20240126 | Agregar membresías - Admin, Pedidos - Admin, Primer uso (mensaje), Verificación de correo |

## Notas de mantenimiento

- El backend valida la sesión de administrador mediante cookies + JWT (`/apiActiveLife/auth/admin`); en el frontend, `App.jsx` mantiene una bandera `isAdmin` temporal para simular el acceso al panel mientras se termina de integrar el control de rutas protegidas del lado del admin.
- Las imágenes de productos y gimnasios se suben directamente a Cloudinary a través de Multer; asegúrate de que las credenciales configuradas tengan permisos de escritura.
- El límite de peticiones (`express-rate-limit`) está activo globalmente en `app.js`; ajústalo si necesitas soportar más tráfico en desarrollo.
- Corre `npm run lint` en `empaquetacion/` antes de subir cambios de frontend para mantener el estilo de código consistente.
