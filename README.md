# OBSIDIAN — E-commerce SPA

E-commerce SPA estilo **OBSIDIAN** (dark premium).

## Características
- Navegación SPA (React Router)
- Catálogo desde API (**FakeStore API**)
- Buscador en tiempo real
- Paginación (6–8 por página)
- Carrito funcional + previsualización de checkout
- Autenticación y órdenes: Firebase Auth + Firestore

## Tecnologías
- Runtime / package manager: **Bun**
- Frontend: **Vite + React + TypeScript**
- UI: **Tailwind CSS** (tema OBSIDIAN)
- Estado global: **Zustand** (con persistencia a localStorage)
- HTTP client: **Axios**
- Backend como servicio (BaaS): **Firebase Auth + Firestore**
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
Regla de oro: **negar por defecto**. Nunca usar `allow read, write: if true`.

## Requisitos
1) Instalar Bun (una vez)
   - Windows (PowerShell): `powershell -c "irm bun.sh/install.ps1|iex"`

2) Instalar dependencias
```bash
bun install
```

## Ejecutar en desarrollo
```bash
bun dev
```

## Variables de entorno (Firebase)
Crear un archivo `.env` (no se commitea) con las credenciales de tu proyecto Firebase.
Se documentará un `.env.example` cuando integremos Firebase.
