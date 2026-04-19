# OBSIDIAN — E-commerce SPA

Entrega 2 — Proyecto de Taller de Desarrollo Web (UPB)

## Caracteristicas

### Vistas requeridas
- Home — Catalogo con buscador, paginacion, filtros
- Detalle — Pagina de producto individual
- Carrito — Carrito de compras con gestion de items
- Checkout — Formulario de envio y confirmacion
- Autenticacion — Login/Register con Firebase Auth

### Tecnologias
- Frontend: React.js + Vite.js + TypeScript
- Estilos: Tailwind CSS (tema OBSIDIAN dark premium)
- Estado: Zustand con persistencia localStorage
- Backend: Firebase Auth + Firestore (BaaS)
- API: FakeStore API (productos)

### Funcionalidades implementadas
- Navegacion SPA (React Router)
- Catalogo desde API (FakeStore API)
- Buscador en tiempo real
- Paginacion (6-8 productos por pagina)
- Vista grid/list de productos
- Pagina de productos destacados (5 aleatorios)
- Diseno responsive (mobile-first)
- Menu movil desplegable
- Carrito persistente
- Checkout con validacion de envio
- Ordenes guardadas en Firestore
- Tema oscuro premium con glows animados
- Icono de obsidiana (SVG) en Hero y favicon

## Arquitectura

Atomic Design + colocation por componente:
- components/atoms/ — Button, Input, Badge, IconButton, Container
- components/molecules/ — ProductCard, SearchBar, AuthGuard
- components/organisms/ — TopNavBar, Footer, HeroSection, ProductGrid
- components/templates/ — MainLayout
- pages/ — HomePage, ProductDetailPage, CartPage, CheckoutPage, LoginPage, RegisterPage, OrdersPage, FeaturedPage
- store/ — Zustand stores (cart, session, ui, products)
- services/ — Firebase, Orders, Slugify
- styles/ — Utilities (cn, formatPrice)

## Deploy

### Cloudflare Pages (recomendado)
1. Conectar repositorio GitHub
2. Build command: bun run build
3. Output: dist
4. Agregar variables de entorno en Production:

VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

### Firebase Hosting (alternativo)
firebase init hosting
firebase deploy

## Requisitos para ejecutar

# Instalar Bun
powershell -c "irm bun.sh/install.ps1|iex"

# Instalar dependencias
bun install

# Configurar variables de entorno
cp .env.example .env

# Ejecutar
bun dev

## Build para produccion

bun run build
# Output en dist/

## Seguridad

Firestore Security Rules configur el acceso a datos. Regla base: denegar por defecto.

## Capturas de pantalla

El proyecto incluye tema oscuro premium con:
- Glows violetas animados en el fondo
- Icono de obsidiana en el Hero
- Botones responsive para movil (+ en vez de texto)
- Menu desplegable en movil
- Diseno consistente en todas las paginas