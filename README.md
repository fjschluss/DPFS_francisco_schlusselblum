# LuBo — Marketplace de recursos para diseño de indumentaria

**Desafío Profesional Full Stack — Digital House**  
Alumno: Francisco Schlusselblum

---

## 🗂 Tablero de trabajo

📋 [Ver tablero en GitHub Projects](https://github.com/users/fjschluss/projects/16/views/1)

---

## Temática del sitio

LuBo es un marketplace de recursos digitales creado por la diseñadora de indumentaria Ludmila Borrelli.
El sitio ofrece productos descargables orientados al desarrollo y producción de prendas:

- Fichas técnicas (tech packs)
- Diseños técnicos (flats)
- Moldes y patrones
- Recursos digitales para diseñadores y emprendimientos de moda

## Público objetivo

Diseñadores de indumentaria, estudiantes de diseño, talleres y pequeños emprendimientos que buscan profesionalizar sus procesos.

---

## 🛠 Tecnologías utilizadas

| Capa | Tecnología |
|------|-----------|
| Markup | HTML5 semántico |
| Estilos | CSS3 (variables, grid, flexbox) |
| Tipografías | Google Fonts: Cormorant Garamond + Inter |
| Backend | Node.js + Express.js |
| Template Engine | EJS |
| HTTP Methods | method-override (PUT/DELETE) |
| Base de datos | MySQL |
| ORM | Sequelize |
| Autenticación | express-session + bcryptjs |
| Cookies | cookie-parser |
| Upload de imagen | multer |
| Frontend framework (próximo) | React |

---

## ⚙️ Instalación y configuración

### 1. Clonar el repositorio e instalar dependencias

```bash
git clone https://github.com/fjschluss/DPFS_francisco_schlusselblum.git
cd DPFS_francisco_schlusselblum
npm install
```

### 2. Crear la base de datos

Desde MySQL Workbench o la terminal de MySQL, ejecutar en orden:

```sql
source database/structure.sql
source database/data.sql
```

### 3. Configurar la conexión

Editar `database/config/config.js` y reemplazar la contraseña con la de tu entorno local:

```js
development: {
    username: 'root',
    password: 'TU_CONTRASEÑA',   // ← modificar acá
    database: 'lubo_db',
    host: '127.0.0.1',
    dialect: 'mysql',
}
```

### 4. Iniciar el servidor

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:3000`.

**Credenciales de prueba** (usuarios del seed):  
- Email: `ludmila@lubo.com` · Contraseña: `password123` (admin)  
- Email: `valentina.martinez@gmail.com` · Contraseña: `password123` (cliente)

---

## 📁 Estructura del proyecto

```bash
DPFS_francisco_schlusselblum/
├── app.js
├── package.json
├── .sequelizerc
├── retro.md
├── README.md
├── database/
│   ├── config/
│   │   └── config.js
│   ├── models/
│   │   ├── index.js
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Category.js
│   │   └── Brand.js
│   ├── structure.sql
│   ├── data.sql
│   └── der.pdf
├── src/
│   ├── controllers/
│   │   ├── main.controller.js
│   │   ├── products.controller.js
│   │   └── users.controller.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   ├── public/
│   │   ├── css/
│   │   │   └── style.css
│   │   └── images/
│   │       ├── logo.svg
│   │       └── carrito.svg
│   ├── routes/
│   │   ├── main.routes.js
│   │   ├── products.routes.js
│   │   └── users.routes.js
│   └── views/
│       ├── partials/
│       │   ├── head.ejs
│       │   ├── header.ejs
│       │   ├── footer.ejs
│       │   └── product-card.ejs
│       ├── products/
│       │   ├── list.ejs
│       │   ├── detail.ejs
│       │   ├── create.ejs
│       │   └── edit.ejs
│       ├── users/
│       │   ├── login.ejs
│       │   ├── register.ejs
│       │   └── profile.ejs
│       ├── index.ejs
│       ├── cart.ejs
│       └── 404.ejs
├── design/
└── wireframes/
```

---

## 🔗 Rutas del sitio

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | / | Home con productos destacados | — |
| GET | /products | Listado con filtro por categoría y búsqueda | — |
| GET | /products/create | Formulario de creación | ✅ |
| POST | /products | Acción de creación | ✅ |
| GET | /products/:id | Detalle de producto | — |
| GET | /products/:id/edit | Formulario de edición | ✅ |
| PUT | /products/:id | Acción de edición | ✅ |
| DELETE | /products/:id | Acción de eliminación | ✅ |
| GET | /users/register | Formulario de registro | — |
| POST | /users/register | Acción de registro | — |
| GET | /users/login | Formulario de login | — |
| POST | /users/login | Acción de login | — |
| GET | /users/profile | Perfil del usuario autenticado | ✅ |
| POST | /users/logout | Cierre de sesión | ✅ |
| GET | /cart | Carrito de compras | — |

---

## 🗄 Base de datos

El proyecto usa **MySQL** como motor de base de datos y **Sequelize** como ORM.

### Diagrama de entidades

Ver `database/der.pdf` para el diagrama completo de entidad-relación.

### Tablas

| Tabla | Descripción |
|-------|-------------|
| `users` | Usuarios registrados (clientes y admins) |
| `categories` | Categorías de productos |
| `brands` | Marcas/sellos de productos |
| `products` | Recursos digitales a la venta |

### Relaciones

- `categories` → `products`: una categoría tiene muchos productos (1:N)
- `brands` → `products`: una marca tiene muchos productos (1:N)

---

## 🎨 Diseño visual

Paleta editorial minimalista con acentos cálidos, accesible para daltonismo.  
Tipografía: **Cormorant Garamond** (display) + **Inter** (body).

---

## 📌 Referentes

1. [hydnstudio.com](https://hydnstudio.com/) — Estética minimalista, venta de recursos digitales
2. [techpacker.com](https://techpacker.com/) — Concepto de tech packs
3. [theassemblylineshop.com](https://theassemblylineshop.com/collections/digital-patterns) — Patrones digitales
4. [thefoldline.com](https://thefoldline.com/) — UX de marketplace
5. [jpfashionstudio.com](https://jpfashionstudio.com/collections/tech-pack) — Fichas técnicas

---

## 👤 Autor

Francisco Schlusselblum · Digital House · Certificado Full Stack