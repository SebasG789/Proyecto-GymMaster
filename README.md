# GymMaster Frontend

# Autor

Sebastián Rendón Giraldo
Mariana Villegas

## Descripción

GymMaster Frontend es una **Single Page Application (SPA)** desarrollada con **Angular**, diseñada para ofrecer una experiencia moderna, rápida e intuitiva en la gestión de gimnasios.

La aplicación permite que **administradores, entrenadores y clientes** interactúen con el sistema a través de interfaces adaptadas a su rol, garantizando un acceso seguro mediante autenticación con JWT y protección de rutas.

Su objetivo es facilitar la administración de usuarios, rutinas de entrenamiento, ejercicios y seguimiento del progreso físico desde una plataforma web sencilla y eficiente.

---

## Características

* Interfaz moderna desarrollada con Angular.
* Sistema de autenticación basado en JWT.
* Gestión de usuarios según su rol.
* Administración de rutinas y ejercicios.
* Registro y seguimiento del progreso físico.
* Protección de rutas mediante Guards.
* Comunicación segura con la API mediante Interceptors.
* Arquitectura modular utilizando componentes Standalone y Lazy Loading.

---

## Tecnologías Utilizadas

* Angular 21
* TypeScript
* Reactive Forms
* JWT Authentication
* HTTP Interceptors
* Lazy Loading
* Standalone Components

---

## Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

* Node.js 18 o superior
* npm
* Angular CLI
* GymMaster API ejecutándose correctamente

Puedes verificar las versiones instaladas con:

```bash
node -v
npm -v
ng version
```

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/GymMaster.git
cd GymMaster
```

---

## 2. Instalar las dependencias

Dentro de la carpeta del proyecto ejecuta:

```bash
npm install
```

Este comando descargará automáticamente todas las librerías necesarias para el funcionamiento de la aplicación.

---

## 3. Verificar la conexión con el Backend

Antes de iniciar el proyecto, asegúrate de que la API de GymMaster esté en ejecución.

Por defecto, el frontend consume el backend desde:

```text
https://localhost:7086
```

Si utilizas otra dirección o puerto, modifica la URL correspondiente dentro de los servicios ubicados en:

```text
src/app/core/services/
```

Por ejemplo:

```typescript
private apiUrl = 'https://localhost:7086/api/...';
```

Una configuración correcta permitirá que el frontend se comunique sin problemas con la API.

---

## 4. Ejecutar la aplicación

Inicia el servidor de desarrollo con:

```bash
ng serve
```

Una vez compilado el proyecto, podrás acceder desde tu navegador en:

```text
http://localhost:4200
```

---

# Credenciales de Prueba

Si restauraste la base de datos incluida en el proyecto, puedes utilizar las siguientes cuentas para probar las funcionalidades de cada rol.

| Rol           | Correo electrónico                  |              Contraseña    |
| ------------- | ----------------------------------------------- | --------------------------------|
| Administrador | [Admin@gym.com]        |            Admin1234       |
| Entrenador    | [Pablo@gym.com]            |            456789           | 
| Cliente       | [sara@gym.com]                   |            123456           |

---

# Estructura del Proyecto

```text
src/
└── app/
    ├── core/
    │   ├── services/
    │   ├── guards/
    │   ├── interceptors/
    │   └── models/
    │
    ├── features/
    │   ├── landing/
    │   ├── auth/
    │   ├── dashboard/
    │   ├── rutinas/
    │   ├── ejercicios/
    │   ├── progreso/
    │   ├── usuarios/
    │   └── perfil/
    │
    └── shared/
        └── components/
```

### Descripción de las carpetas

| Carpeta             | Función                                                          |
| ------------------- | ---------------------------------------------------------------- |
| `core/services`     | Servicios encargados de la comunicación con la API.              |
| `core/guards`       | Protección de rutas mediante AuthGuard y RoleGuard.              |
| `core/interceptors` | Interceptores HTTP para agregar automáticamente el token JWT.    |
| `core/models`       | Interfaces y modelos TypeScript utilizados por la aplicación.    |
| `features`          | Módulos funcionales organizados por características del sistema. |
| `shared/components` | Componentes reutilizables utilizados en diferentes vistas.       |

---

# Roles y Funcionalidades

## Administrador

El administrador dispone de control total sobre el sistema y puede:

* Crear, editar y eliminar usuarios.
* Cambiar roles de los usuarios.
* Consultar el progreso físico de todos los clientes.
* Visualizar los perfiles registrados.

---

## Entrenador

El entrenador cuenta con herramientas para gestionar el entrenamiento de sus clientes:

* Crear rutinas personalizadas.
* Administrar ejercicios asociados a cada rutina.
* Consultar el perfil y progreso de los clientes asignados.

---

## Cliente

Los clientes pueden acceder a su información personal y realizar seguimiento de su evolución:

* Visualizar y editar su perfil.
* Consultar las rutinas asignadas.
* Revisar los ejercicios correspondientes.
* Registrar y visualizar su progreso físico.

---

# Seguridad Implementada

Para garantizar una navegación segura, la aplicación incorpora:

* Autenticación basada en JWT.
* Almacenamiento del token en `localStorage`.
* HTTP Interceptor que añade automáticamente el token a cada petición.
* AuthGuard para proteger rutas privadas.
* RoleGuard para restringir funcionalidades según el rol del usuario.
* Redirección automática al inicio de sesión cuando el token expira.
* Página de acceso denegado para intentos de acceso no autorizados.

---

# Funcionalidades Implementadas

El proyecto incorpora, entre otras, las siguientes características:

* Encriptación segura de contraseñas utilizando BCrypt.
* Diferentes interfaces según el rol del usuario.
* Perfil editable para los clientes.
* Manejo automático del cierre de sesión cuando el token expira.
* Paginación en el listado de ejercicios.
* Búsqueda y filtrado de usuarios.
* Búsqueda y filtrado de rutinas.
* Búsqueda y filtrado de ejercicios.

---

# Verificación

Una vez iniciado el proyecto correctamente:

* La aplicación debe abrir en `http://localhost:4200`.
* El inicio de sesión debe funcionar con las credenciales configuradas.
* La comunicación con la API debe realizarse sin errores.
* Cada usuario debe visualizar únicamente las funcionalidades correspondientes a su rol.
* Las rutas protegidas deben impedir el acceso a usuarios no autorizados.

---

# Solución de Problemas

## La aplicación no inicia

Verifica que todas las dependencias estén instaladas ejecutando nuevamente:

```bash
npm install
```

---

## Error al conectar con la API

Comprueba que:

* El backend esté ejecutándose.
* La URL configurada en los servicios sea correcta.
* El puerto coincida con el configurado por la API.
* No existan bloqueos por CORS o certificados locales.

---

## Error de autenticación

Si el token almacenado expiró o es inválido:

1. Cierra la sesión.
2. Borra el almacenamiento local del navegador.
3. Inicia sesión nuevamente.

---

# Licencia

Este proyecto fue desarrollado con fines educativos y de aprendizaje. Puedes utilizarlo, modificarlo y adaptarlo según las necesidades de tu implementación, respetando las condiciones establecidas por su autor.
