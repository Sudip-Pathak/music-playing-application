# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Dependencise installation.

- npm install
- npm install axios (call API)
- npm i react-router-dom (create multiple routes on the admin pannel, using it add and display songs, albums ..)
- npm i react-toastify ( display toast notification)
- npm install tailwindcss @tailwindcss/vite (tailwind support)

## Install Tailwind CSS

### Terminal

npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

### Configure your template paths on tailwind.config.js

/** @type {import('tailwindcss').Config} \*/
export default {
content: [
"./index.html",
"./src/**/\*.{js,ts,jsx,tsx}",
],
theme: {
extend: {},
},
plugins: [],
}

### Add the Tailwind directives to your CSS ./src/index.css

@tailwind base;
@tailwind components;
@tailwind utilities;

### Guide link:

https://v3.tailwindcss.com/docs/guides/vite
