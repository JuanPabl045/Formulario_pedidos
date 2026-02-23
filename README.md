# 🥩 Molino Viejo — Formulario de Pedidos Online

Sitio web estático para **Molino Viejo**, negocio peruano de carnes frescas y lácteos artesanales con presencia en Lima (San Borja y Magdalena del Mar). Permite a los clientes explorar el catálogo de productos y realizar pedidos en línea que se envían por **WhatsApp** y se registran automáticamente en **Firebase Firestore**.

## ¿Qué hace este proyecto?

| Funcionalidad | Descripción |
|---|---|
| 🏠 Landing page | Presentación de la marca, categorías y productos destacados |
| 🥩 Catálogo de carnes | Lista de cortes de res, cerdo, aves, pescados y cuy con precios aproximados |
| 🧀 Catálogo de lácteos | Quesos, mantequilla, requesón y otros productos frescos |
| 🛒 Formulario de pedidos | El cliente selecciona productos, cantidades y método de entrega |
| 📍 Integración con Google Maps | Para pedidos con delivery, el cliente marca su dirección en un mapa interactivo |
| 📲 Envío por WhatsApp | El pedido se formatea y se abre directamente en WhatsApp con el número de la tienda |
| 💾 Registro en Firestore | Cada pedido se guarda en Firebase Firestore como respaldo |
| 🔒 Panel de administración | Vista protegida con login para gestionar los pedidos recibidos y exportarlos a Excel |

## Stack tecnológico

- **Frontend:** HTML5 + CSS3 + JavaScript vanilla (sin framework)
- **UI:** Bootstrap 5.3 + Font Awesome 6.4
- **Backend/Base de datos:** Firebase Firestore (NoSQL)
- **Hosting:** Firebase Hosting
- **Mapas:** Google Maps JavaScript API (Places + Geocoder)
- **Notificaciones:** WhatsApp API (`wa.me`)
- **Exportación:** SheetJS (xlsx) para exportar pedidos a Excel desde el panel admin

## Estructura del código

```
Formulario_pedidos/
├── public/                        # Archivos publicados por Firebase Hosting
│   ├── index.html                 # Página principal / landing page
│   ├── nosotros.html              # Catálogo de carnes
│   ├── lacteos.html               # Catálogo de lácteos
│   ├── pedidos.html               # Formulario de pedido (flujo principal)
│   ├── admin.html                 # Panel de administración (requiere login)
│   ├── catalogo.html              # Catálogo general
│   ├── landing.html               # Página de aterrizaje alternativa
│   ├── config.js                  # Configuración de Firebase y Google Maps
│   ├── env-loader.js              # Cargador de variables de entorno (solo desarrollo)
│   ├── productos.json             # Catálogo de productos con precios
│   ├── productos_con_imagenes.json # Catálogo de productos con URLs de imágenes
│   └── img/                       # Imágenes de la tienda
├── img/                           # Imágenes adicionales
├── firebase.json                  # Configuración de Firebase Hosting y Firestore
├── firestore.rules                # Reglas de seguridad de Firestore
├── firestore.indexes.json         # Índices de Firestore
├── .env.example                   # Plantilla de variables de entorno
├── package.json                   # Metadatos del proyecto
└── index.html                     # Redirección raíz (apunta a public/)
```

## Flujo principal del pedido

1. El cliente visita la web (`index.html`) y navega al catálogo o hace clic en **"Hacer Pedido"**.
2. En `pedidos.html` selecciona uno o más productos del desplegable (cargado desde `productos.json`), indica la cantidad y notas.
3. Elige el método de entrega: **Delivery** (con selección en mapa de Google Maps) o **Recojo en tienda**.
4. Pulsa **"Enviar Pedido"**:
   - El pedido se guarda en Firestore (`/pedidos/{id}`).
   - Se abre WhatsApp con el mensaje formateado listo para enviar al negocio.

## Requisitos previos

- Cuenta en [Firebase](https://firebase.google.com/) con un proyecto creado (Firestore + Hosting habilitados).
- Clave de API de [Google Maps](https://developers.google.com/maps) con los servicios **Maps JavaScript API**, **Places API** y **Geocoding API** activos.
- [Node.js](https://nodejs.org/) (para usar la CLI de Firebase).
- [Firebase CLI](https://firebase.google.com/docs/cli): `npm install -g firebase-tools`.

## Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/JuanPabl045/Formulario_pedidos.git
cd Formulario_pedidos
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` y rellena con tus credenciales reales:

```env
FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
FIREBASE_PROJECT_ID=tu_proyecto
FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abcdef
GOOGLE_MAPS_API_KEY=tu_clave_google_maps
WHATSAPP_NUMBER=51XXXXXXXXX
```

> ⚠️ **Nunca subas el archivo `.env` real a Git.** Ya está incluido en `.gitignore`.

### 3. Vincular con Firebase

```bash
firebase login
firebase use --add   # selecciona o crea tu proyecto
```

## Ejecución local

Como es un sitio estático, puedes abrirlo directamente en el navegador o usar el emulador de Firebase:

```bash
# Opción A: abrir directamente (sin backend)
open public/index.html

# Opción B: emulador de Firebase (recomendado para probar Firestore)
firebase emulators:start
```

Con la opción B, el sitio quedará disponible en `http://localhost:5000` y Firestore en `http://localhost:4000`.

## Despliegue en producción

```bash
firebase deploy
```

Esto publica la carpeta `public/` en Firebase Hosting y aplica las reglas de Firestore.

## Seguridad de Firestore

Las reglas en `firestore.rules` aplican la siguiente política:

| Operación | Permiso |
|---|---|
| Crear pedido | Cualquier usuario (clientes anónimos) |
| Leer / Eliminar pedido | Solo usuarios autenticados (admin) |
| Actualizar pedido | Nadie (inmutabilidad del pedido) |

## Panel de administración

Accede a `admin.html` e inicia sesión con las credenciales de Firebase Authentication. Desde ahí puedes:

- Ver todos los pedidos recibidos en una tabla.
- Filtrar por estado o fecha.
- Exportar los pedidos a un archivo Excel (`.xlsx`) usando SheetJS.

## Contacto del negocio

| Canal | Dato |
|---|---|
| Teléfono / WhatsApp | +51 989 719 386 |
| Tienda San Borja | Av. Principal San Borja, Lima |
| Tienda Magdalena del Mar | Av. Principal Magdalena, Lima |
| Horario (Lun–Sáb) | 8:00 AM – 7:00 PM |
| Horario (Dom) | 8:00 AM – 2:00 PM |
