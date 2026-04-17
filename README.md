# OBSIDIAN — Fullstack Challenge (Entrega 2 · React)

E-commerce SPA estilo **OBSIDIAN** (dark premium) para el diplomado Fullstack (UPB).

## Objetivo (según la guía)
- SPA con navegación (React Router)
- Galería de productos desde API (**FakeStore API**)
- Buscador en tiempo real
- Paginación (6–8 por página)
- Carrito funcional + previsualización de checkout
- **Bonus**: Firebase Auth + Firestore

## Stack
- Runtime / package manager: **Bun**
- Frontend: **Vite + React + TypeScript**
- UI: **Tailwind CSS** (tema OBSIDIAN)
- Estado global: **Zustand** (con persistencia a localStorage)
- HTTP client: **Axios**
- Backend-as-a-service: **Firebase Auth + Firestore**
- API de productos: https://fakestoreapi.com/

## Arquitectura de carpetas
Seguimos Atomic Design + colocation por componente (para no sobrecargar `App.tsx`).

Cada componente vive en su propia carpeta y separa:
- `Component.tsx`
- `Component.types.ts`
- `Component.constants.ts`
- `index.ts`
- (opcional) `Component.module.css` solo si Tailwind no alcanza para algún efecto específico.

## Importante: sin backend separado
Este proyecto **NO** tiene backend propio.
El frontend se conecta directo a Firebase (Auth/Firestore) y a FakeStore API.
No se usan **Firebase Functions**.

## Seguridad (Firebase)
Como el cliente habla directo con Firestore, la seguridad depende 100% de **Security Rules**.
Regla de oro: **deny by default**. Nunca usar `allow read, write: if true`.

## Requisitos de instalación
1) Instalar Bun (una vez)
   - Windows (PowerShell): `powershell -c "irm bun.sh/install.ps1|iex"`

2) Instalar dependencias
```bash
bun install
```

## Scripts
```bash
bun dev
```

## Variables de entorno (Firebase)
Crear un archivo `.env` (no se commitea) con las credenciales de tu proyecto Firebase.
Se documentará un `.env.example` cuando integremos Firebase.
