# 🎵 Spotify Music Explorer

Aplicación web desarrollada en React que permite buscar artistas en Spotify, visualizar sus álbumes y marcar favorito y explorar detalles de artistas. Se utiliza la API REST de Spotify para obtener toda la información musical.

## 🚀 Características principales

- Búsqueda de artistas por nombre.
- Visualización de artistas con imagen y nombre.
- Detalle de artista: nombre, imagen, álbumes publicados (nombre, portada, año).
- Navegación entre vistas mediante React Router.
- Favoritos: posibilidad de marcar artistas como favoritos.
- Almacenamiento de favoritos en `localStorage`.
- Detalle de álbum: nombre y artista.
- Sistema de login para gestionar CLIENT_ID y CLIENT_SECRET de forma segura.

## ✨ Power Ups implementados

✅ Volver desde detalle de artista a la búsqueda  
✅ Marcar artistas como favoritos y listado lateral con acceso rápido  
✅ Login seguro con almacenamiento de credenciales en `localStorage`  


## 🛠️ Tecnologías utilizadas

- React + Vite
- React Router
- CSS Modules
- Spotify Web API
- localStorage

## 📦 Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/blangetti1/Reproductor.git
cd Reproductor

2. Instalar dependencias:

```bash
npm install

Iniciar el servidor de desarrollo:

bash
npm run dev

🔑 Autenticación con Spotify

Crear una cuenta en Spotify Developer.

Crear una aplicación para obtener CLIENT_ID y CLIENT_SECRET.

En la aplicación, completar la pantalla de login con esas credenciales.

El token de autenticación se generará automáticamente y será utilizado para realizar las consultas a la API.


## 🧑‍💻 Autor
Proyecto realizado por @blangetti1 y @FranMonzoni como parte de un trabajo práctico de desarrollo de software.


