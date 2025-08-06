# cbw-task-ms  

  Microservicio de gestión de tareas desarrollado como parte de una prueba técnica. Permite crear tareas, consultarlas, actualizarlas, eliminarlas, filtrarlas por estado y programar acciones asíncronas mediante una cola de trabajos.  

  > Autor: **Luis Cortes**  
## 🚀 Tecnologías utilizadas 

  | Componente    | Descripción                      |
  |---------------|----------------------------------|
  | NestJS        | Framework backend (Node.js)      |
  | MongoDB       | Base de datos                    |
  | Redis         | Sistema de colas (Bull)          |
  | Bull          | Gestión de trabajos asíncronos   |
  | Docker        | Contenedores                     |
  | Docker Compose| Orquestación de servicios        |

## 📦 Instalación y ejecución 
### 🔧 Usando Docker (recomendado) 

  1. Clonar el repositorio: 

    git clone <url-del-repo> 
    cd cbw-task-ms  

  2. Crear un archivo `.env` con el siguiente contenido: 

    PORT=3000 
    DATABASE_URL=mongodb://mongo:27017/tasksdb 
    REDIS_HOST=redis 
    REDIS_PORT=6379  

  3. Levantar los servicios: 
    docker-compose --env-file .env up --build  

  4. La API estará disponible en: http://localhost:3000  

### 💻 Modo desarrollo (sin Docker) 
  Requiere MongoDB y Redis instalados localmente. 

  1. Configurar `.env`: 

    PORT=3000 
    DATABASE_URL=mongodb://localhost:27017/tasksdb 
    REDIS_HOST=localhost 
    REDIS_PORT=6379  

  2. Instalar dependencias: 
    npm install  

  3. Levantar el servidor: 
    npm run start:dev  
    
## 📚 Endpoints REST  

    Método	Ruta	Descripción
    POST	/tasks	Crea una nueva tarea
    GET	/tasks	Obtiene todas las tareas
    GET	/tasks/:id	Obtiene una tarea por ID
    PUT	/tasks/:id	Actualización completa de una tarea
    PATCH	/tasks/:id	Actualización parcial
    DELETE	/tasks/:id	Elimina una tarea por ID
    GET	/tasks/status/:status	Filtra tareas por estado (pending, in_progress, completed)
    POST	/tasks/:id/schedule	Agenda un trabajo asíncrono para esa tarea

## 🛠️ Ejemplo de creación de tarea 

    curl -X POST http://localhost:3000/tasks \
      -H 'Content-Type: application/json' \
      -d '{
        "title": "Preparar presentación",
        "description": "Hacer las diapositivas",
        "status": "pending",
        "assigned_to": "juan.perez",
        "due_date": "2025-08-10"
      }'


## ⏰ Programar notificación 

    curl -X POST http://localhost:3000/tasks/<ID>/schedule \
      -H 'Content-Type: application/json' \
      -d '{
        "runAt": "2025-08-06T22:00:00Z"
      }'
