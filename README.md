# 📚 Biblioteca UI

Frontend para el sistema de gestión de biblioteca, desarrollado con React + Vite como proyecto de aprendizaje.

---

## 🚀 Tecnologías

- **React 18**
- **Vite**
- **JavaScript (JSX)**
- **Fetch API** (para llamadas al backend)
- **CSS**

---

## ✨ Funcionalidades

- ✅ CRUD completo de **Libros**
- ✅ CRUD completo de **Autores**
- ✅ CRUD completo de **Categorías**
- ✅ Formularios para crear y editar registros
- ✅ Consumo de REST API con Fetch API

---

## 📁 Estructura del proyecto

```
src/
├── assets/
├── App.jsx       # Componente principal con toda la lógica
├── App.css       # Estilos
├── index.css
└── main.jsx      # Punto de entrada
```

---

## ⚙️ Cómo correrlo localmente

### Requisitos previos
- Node.js 18 o superior
- El backend [`biblioteca-api`](https://github.com/kevinramos10/biblioteca-api) corriendo en `localhost:8080`

### Pasos

1. Clona el repositorio:
```bash
git clone https://github.com/TU_USUARIO/biblioteca-ui.git
cd biblioteca-ui
```

2. Instala las dependencias:
```bash
npm install
```

3. Corre el proyecto:
```bash
npm run dev
```

La app estará disponible en `http://localhost:5173`

> ⚠️ Asegúrate de tener el backend corriendo antes de usar la app.

---

## 🔗 Conexión con el backend

La app consume la API en `http://localhost:8080`. Los endpoints que utiliza son:

| Recurso | URL base |
|---------|----------|
| Libros | `http://localhost:8080/libros` |
| Autores | `http://localhost:8080/autores` |
| Categorías | `http://localhost:8080/categorias` |

---

## 🧠 Lo que aprendí haciendo este proyecto

- Fundamentos de React (componentes, estado con `useState`)
- Consumo de una REST API con `fetch`
- Operaciones CRUD desde el frontend
- Manejo de formularios en React

---

## 👨‍💻 Autor

Desarrollado como proyecto de práctica para aprender React y consumo de APIs REST.
