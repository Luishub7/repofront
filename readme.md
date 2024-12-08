Sistema de Gestión de Herramientas
Este proyecto es una aplicación web full-stack desarrollada como parte de un trabajo práctico. Permite la gestión de herramientas con funcionalidades como autenticación, CRUD (crear, leer, actualizar y eliminar), y soporte para usuarios autenticados.

Características Principales
Autenticación: Registro, inicio de sesión, recuperación de contraseña y verificación por correo.
Gestión de Herramientas: CRUD protegido por JWT.
Rutas Protegidas: Acceso solo a usuarios autenticados.
Responsividad: Compatible con dispositivos móviles, tabletas y computadoras.
Accesibilidad: Estilos diseñados para facilitar el uso y lectura.
Frontend
Tecnologías y Librerías Usadas

React.js: Framework para construir la interfaz de usuario.
react-router-dom: Para el enrutamiento de la aplicación.
axios: Cliente HTTP para la comunicación con el backend.
yup: Validaciones de formularios.
Bootstrap: Librería CSS para un diseño moderno y responsivo.
FontAwesome: Iconos para botones de acción.
Estructura

Componentes Reutilizables: Navbar, ToolFormModal, ConfirmModal, entre otros.
Hooks Personalizados: useAuth, useTools para manejar lógica común.
Context API: Manejo de estado global para autenticación (AuthContext).
Backend
Tecnologías y Librerías Usadas

Node.js: Entorno de ejecución para JavaScript en el backend.
Express.js: Framework web para manejar rutas y middlewares.
jsonwebtoken (JWT): Autenticación basada en tokens.
bcrypt: Encriptación de contraseñas.
mysql2/promise: Interacción con la base de datos MySQL.
dotenv: Manejo de variables de entorno.
Nodemailer: Envío de correos electrónicos para verificación y recuperación de contraseñas.
Características

Rutas Protegidas: CRUD de herramientas solo accesible con tokens válidos.
Middleware Personalizado:
Manejo de errores.
Protección de rutas (verifyToken).
Seguridad: Contraseñas encriptadas y configuración sensible protegida en .env.
Despliegue
Frontend: Deploy en Vercel.
Backend: Deploy en Render (u otra plataforma compatible).