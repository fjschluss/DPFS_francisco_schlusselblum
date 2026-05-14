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
| Datos | JSON (products.json, users.json) |
| Autenticación | express-session + bcryptjs |
| Cookies | cookie-parser |
| Upload de imagen | multer |
| ORM (próximo) | Sequelize |
| Base de datos (próximo) | MySQL |
| Frontend framework (próximo) | React |

---

## 📁 Estructura del proyecto

```bash
DPFS_francisco_schlusselblum/
├── src/
│   ├── controllers/
│   │   ├── main.controller.js
│   │   ├── products.controller.js
│   │   └── users.controller.js
│   ├── data/
│   │   ├── products.json
│   │   └── users.json
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
│       │   └── register.ejs
│       ├── index.ejs
│       ├── cart.ejs
│       └── 404.ejs
├── design/
├── wireframes/
├── app.js
├── package.json
├── retro.md
└── README.md
```

---

## 🔗 Rutas del sitio

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | / | Home con productos destacados |
| GET | /products | Listado de productos con filtro |
| GET | /products/create | Formulario de creación |
| POST | /products | Acción de creación |
| GET | /products/:id | Detalle de producto |
| GET | /products/:id/edit | Formulario de edición |
| PUT | /products/:id | Acción de edición |
| DELETE | /products/:id | Acción de eliminación |
| GET | /users/login | Formulario de login |
| POST | /users/login | Acción de login |
| GET | /users/register | Formulario de registro |
| POST | /users/register | Acción de registro |
| GET | /cart | Carrito de compras |
| GET | /users/profile | Perfil del usuario autenticado |
| POST | /users/logout | Cierre de sesión |

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