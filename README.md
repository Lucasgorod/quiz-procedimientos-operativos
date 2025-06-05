# Quiz Interactivo - Procedimientos Operativos

Una aplicación web para crear quizzes interactivos en tiempo real sin necesidad de Mentimeter.

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 14 o superior
- npm o yarn

### Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/quiz-procedimientos-operativos.git
cd quiz-procedimientos-operativos
```
2. Instalar dependencias:
```bash
npm install
```
3. Configurar Firebase:
- Crear un proyecto en Firebase
- Crear una base de datos Realtime Database
- Copiar la configuración en un archivo `.env` basado en `.env.example`

4. Iniciar la app:
```bash
npm start
```

 La app estará disponible en http://localhost:3000

### Despliegue

- Puedes desplegar en Netlify, Vercel o cualquier hosting estático.
- Recuerda configurar las variables de entorno en el panel del hosting.

## 🛠 Panel de Administración

1. Accede a `/admin` e inicia sesión con Google.
2. Podrás ver la lista de quizzes guardados en la base de datos.
3. Usa **Nuevo Quiz** para crear uno o **Editar** para modificar un existente.
4. Completa el título, un slug opcional y las preguntas. Marca las respuestas correctas con `*` al inicio de la línea.
5. Al guardar se mostrará la URL resultante (`/quiz/<quizId>`). Comparte esa dirección con tus estudiantes.

---

¡Listo para usar en clase!
