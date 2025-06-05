# Guía de Configuración - Quiz Interactivo

## 1. Configuración Inicial

### Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/quiz-procedimientos-operativos.git
cd quiz-procedimientos-operativos
```

### Instalar dependencias
```bash
npm install
```

## 2. Configurar Firebase (Base de datos gratuita)

- Ir a Firebase Console
- Crear nuevo proyecto
- Ir a "Realtime Database" y crear base de datos
- En "Reglas", usar estas para desarrollo:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

- Copiar configuración desde Project Settings
- Crear archivo .env basado en .env.example

## 3. Desarrollo Local
```bash
npm start
```
La app estará en http://localhost:3000

## 4. Desplegar en Netlify (Gratis)
Opción A: Arrastrar y soltar

- Ejecutar `npm run build`
- Arrastrar carpeta build a Netlify Drop

Opción B: Despliegue automático

- Subir a GitHub
- Conectar repo en Netlify
- Configurar variables de entorno en Netlify

## 5. Uso en Clase
Como Profesor:
- Entrar a la app
- Click en "Iniciar Sesión"
- Mostrar QR en pantalla
- Ver resultados en tiempo real

Como Estudiante:
- Escanear QR o entrar a la URL
- Ingresar nombre
- Responder preguntas
- Enviar respuestas

## 6. Alternativas sin Firebase
Opción 1: Google Sheets
- Usar Google Forms para recolectar
- Google Sheets API para mostrar resultados
- Ver carpeta /examples/google-sheets

Opción 2: Almacenamiento Local
- Solo funciona en mismo dispositivo
- Útil para demos
- Ver carpeta /examples/local-storage

## 🚀 Scripts de inicio rápido

### **create-quiz.sh** (Para Linux/Mac)
```bash
#!/bin/bash
echo "🚀 Creando Quiz Interactivo..."

# Crear estructura
mkdir -p quiz-procedimientos-operativos/{src/{components,hooks,utils,config,styles},public,docs}

# Clonar archivos base
curl -o quiz-procedimientos-operativos/package.json https://raw.githubusercontent.com/...

echo "✅ Proyecto creado!"
echo "📝 Siguiente paso: cd quiz-procedimientos-operativos && npm install"
```

### create-quiz.bat (Para Windows)
```batch
@echo off
echo 🚀 Creando Quiz Interactivo...

mkdir quiz-procedimientos-operativos\src\components
mkdir quiz-procedimientos-operativos\src\hooks
mkdir quiz-procedimientos-operativos\src\utils
mkdir quiz-procedimientos-operativos\src\config
mkdir quiz-procedimientos-operativos\src\styles
mkdir quiz-procedimientos-operativos\public
mkdir quiz-procedimientos-operativos\docs

echo ✅ Proyecto creado!
echo 📝 Siguiente paso: cd quiz-procedimientos-operativos && npm install
```

---

💡 Ventajas de esta solución:
- Sin costos: Firebase gratuito hasta 100 conexiones simultáneas
- Sin límites: No hay restricciones de Mentimeter
- Personalizable: Diseño propio con la estética de Apple
- Escalable: Puede crecer según necesidades
- Reutilizable: Para futuras clases
- Open source: Los estudiantes pueden aprender del código

🎯 Para empezar rápidamente:

Opción más simple:
- Usar el template en CodeSandbox
- No requiere instalación local
- URL: codesandbox.io/s/quiz-gretel

Opción con control total:
- Seguir la guía de setup
- Personalizar según necesidades
