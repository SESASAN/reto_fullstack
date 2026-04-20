# OBSIDIAN E-commerce

E-commerce SPA desarrollado con React, TypeScript y Firebase. Tema oscuro premium con Tailwind CSS.

## Características

### Core
- Catálogo de productos desde FakeStore API
- Buscador en tiempo real
- Filtros por categoría
- Paginación
- Carrito de compras persistente (Zustand + localStorage)
- Checkout con validación en tiempo real
- Autenticación con Firebase (Google, GitHub, Email)
- Historial de pedidos en Firestore
- Perfil de usuario

### UX
- Diseño responsive para móvil
- Menu móvil desplegable
- Skeleton loaders estados de carga
- Empty states
- Micro-interacciones y animaciones
- Tema oscuro premium OBSIDIAN

### Páginas
- Home (catálogo)
- Productos destacadas
- Detalle de producto
- Carrito
- Checkout
- Éxito de orden
- Historial de pedidos
- Detalle de orden
- Perfil (configuración de cuenta)
- Login / Registro

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS
- Zustand (estado global)
- Firebase Auth + Firestore
- FakeStore API

## Requisitos

- Node.js 18+
- Bun (opcional)

## Setup

```bash
# Instalar dependencias
bun install

# Desarrollo
bun run dev

# Build
bun run build
```

## Deploy

Output: `dist/`

Listo para Cloudflare Pages o Firebase Hosting.