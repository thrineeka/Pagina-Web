// server.js
require('dotenv').config(); // Carga las variables de entorno al inicio

const express = require('express');
const mysql = require('mysql2/promise'); // Usamos mysql2/promise para async/await
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000; // Puedes cambiar el puerto si es necesario

// Middlewares
app.use(cors()); // Habilita CORS para permitir peticiones desde tu frontend React
app.use(express.json()); // Permite a Express parsear cuerpos de solicitud JSON

// Configuración de la conexión a la base de datos
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false // Esto puede ser necesario para algunos entornos de hosting, pero se recomienda true en producción si el certificado lo permite
    }
};

let pool; // Usaremos un pool de conexiones para mejor rendimiento

async function connectToDatabase() {
    try {
        pool = mysql.createPool(dbConfig);
        console.log('Conexión a MariaDB establecida exitosamente.');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
        process.exit(1); // Salir si no se puede conectar a la base de datos
    }
}

// Llama a la función de conexión al iniciar el servidor
connectToDatabase();

// Middleware para verificar el token JWT (Protección de rutas)
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. No se proporcionó token.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido o expirado.' });
        }
        req.user = user; // Guarda los datos del usuario decodificados en el request
        next();
    });
};

// --- Rutas del API ---

// 1. Ruta para REGISTRAR NUEVO USUARIO
// MÉTODO: POST
// ENDPOINT: http://localhost:5000/api/usuarios/registro
app.post('/api/usuarios/registro', async (req, res) => {
    const {
        nombre_usuario,
        contrasena,
        rol,
        primer_nombre,
        apellido_paterno,
        apellido_materno, // Campo opcional según tu DB
        email,
        telefono,         // Campo opcional según tu DB
        tipo_documento,   // Campo opcional según tu DB
        numero_documento, // Campo opcional según tu DB
    } = req.body;

    // Validación básica de campos requeridos (basado en tu tabla: nombre_usuario, contrasena, rol, primer_nombre, apellido_paterno, email son NO NULL)
    if (!nombre_usuario || !contrasena || !rol || !primer_nombre || !apellido_paterno || !email) {
        return res.status(400).json({ error: 'Por favor, complete todos los campos obligatorios: nombre de usuario, contraseña, rol, primer nombre, apellido paterno, y email.' });
    }

    try {
        const [rows] = await pool.execute(
            'SELECT id_usuario FROM usuarios WHERE nombre_usuario = ? OR email = ?',
            [nombre_usuario, email]
        );

        if (rows.length > 0) {
            return res.status(400).json({ error: 'El nombre de usuario o el correo electrónico ya están registrados.' });
        }

        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contrasena, salt);

        // Convertir `undefined` o cadenas vacías a `null` para campos opcionales que SÍ existen en tu DB
        const finalApellidoMaterno = (apellido_materno === undefined || apellido_materno === '') ? null : apellido_materno;
        const finalTelefono = (telefono === undefined || telefono === '') ? null : telefono;
        const finalTipoDocumento = (tipo_documento === undefined || tipo_documento === '') ? null : tipo_documento;
        const finalNumeroDocumento = (numero_documento === undefined || numero_documento === '') ? null : numero_documento;

        const [result] = await pool.execute(
            `INSERT INTO usuarios (nombre_usuario, contrasena, rol, primer_nombre, apellido_paterno, apellido_materno, email, telefono, tipo_documento, numero_documento)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, // 10 columnas y 10 '?'
            [
                nombre_usuario,
                hashedPassword,
                rol,
                primer_nombre,
                apellido_paterno,
                finalApellidoMaterno,
                email,
                finalTelefono,
                finalTipoDocumento,
                finalNumeroDocumento,
            ]
        );

        res.status(201).json({ mensaje: 'Usuario registrado exitosamente', id_usuario: result.insertId });

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor al registrar el usuario.' });
    }
});

// 2. Ruta para INICIAR SESIÓN
// MÉTODO: POST
// ENDPOINT: http://localhost:5000/api/auth/login
app.post('/api/auth/login', async (req, res) => {
    const { nombre_usuario, contrasena } = req.body;

    if (!nombre_usuario || !contrasena) {
        return res.status(400).json({ error: 'Por favor, ingrese su nombre de usuario y contraseña.' });
    }

    try {
        const [rows] = await pool.execute(
            'SELECT id_usuario, nombre_usuario, contrasena, rol, primer_nombre, email FROM usuarios WHERE nombre_usuario = ?',
            [nombre_usuario]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        const user = rows[0];

        // Comparar la contraseña hasheada
        const isMatch = await bcrypt.compare(contrasena, user.contrasena);

        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        // Generar un token JWT
        const token = jwt.sign(
            { id: user.id_usuario, rol: user.rol, nombre_usuario: user.nombre_usuario },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // El token expira en 1 hora
        );

        res.status(200).json({
            mensaje: 'Inicio de sesión exitoso.',
            token,
            usuario: {
                id_usuario: user.id_usuario,
                nombre_usuario: user.nombre_usuario,
                rol: user.rol,
                primer_nombre: user.primer_nombre,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor al iniciar sesión.' });
    }
});

// 3. Ruta para RECUPERAR CONTRASEÑA (Placeholder)
// MÉTODO: POST
// ENDPOINT: http://localhost:5000/api/auth/recuperar-contrasena
// NOTA: Esta es una implementación básica. Una implementación real requeriría envío de correos.
app.post('/api/auth/recuperar-contrasena', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Por favor, ingrese su correo electrónico.' });
    }

    console.log(`Simulando envío de enlace de recuperación a: ${email}`);

    res.status(200).json({ mensaje: 'Si el correo electrónico está registrado, se le ha enviado un enlace para restablecer su contraseña.' });
});

// 4. Ruta para OBTENER UN USUARIO POR ID (Ruta Protegida)
// Requiere JWT en el header de autorización (Bearer Token)
// MÉTODO: GET
// ENDPOINT: http://localhost:5000/api/usuarios/:id (ej. http://localhost:5000/api/usuarios/123)
app.get('/api/usuarios/:id', verifyToken, async (req, res) => {
    const userId = req.params.id;

    // Opcional: Asegúrate de que el usuario que hace la petición tenga permisos
    // Por ejemplo, solo puede ver su propio perfil o un administrador puede ver cualquier perfil
    if (req.user.id !== parseInt(userId) && req.user.rol !== 'Administrador') {
        return res.status(403).json({ error: 'Acceso denegado. No tiene permisos para ver este perfil.' });
    }

    try {
        // Consulta SELECT que coincide con las columnas existentes en tu tabla 'usuarios'
        const [rows] = await pool.execute(
            'SELECT id_usuario, nombre_usuario, rol, primer_nombre, apellido_paterno, apellido_materno, email, telefono, tipo_documento, numero_documento, fecha_creacion, fecha_actualizacion FROM usuarios WHERE id_usuario = ?',
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        res.status(200).json(rows[0]);

    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener el usuario.' });
    }
});

// 5. Ruta para EDITAR USUARIO (Ruta Protegida)
// Requiere JWT en el header de autorización (Bearer Token)
// MÉTODO: PUT
// ENDPOINT: http://localhost:5000/api/usuarios/:id (ej. http://localhost:5000/api/usuarios/123)
app.put('/api/usuarios/:id', verifyToken, async (req, res) => {
    const userId = req.params.id;
    const {
        nombre_usuario,
        contrasena, // Opcional para actualizar
        rol,        // Solo administrador puede cambiar el rol
        primer_nombre,
        apellido_paterno,
        apellido_materno,
        email,
        telefono,
        tipo_documento,
        numero_documento,
    } = req.body;

    // Solo un administrador puede editar cualquier usuario, o el usuario puede editar su propio perfil
    if (req.user.id !== parseInt(userId) && req.user.rol !== 'Administrador') {
        return res.status(403).json({ error: 'Acceso denegado. No tiene permisos para editar este perfil.' });
    }

    try {
        let updateQuery = `UPDATE usuarios SET `;
        const updateParams = [];
        const fieldsToUpdate = [];

        // Construir dinámicamente la consulta de actualización, asegurando que los campos opcionales manejen null
        // Se añade `!== undefined` y `!== ''` para campos que no deben ser NULL si se envían.
        // Para los que SÍ pueden ser NULL, solo se comprueba `!== undefined` y se convierte `''` a `null`.
        if (nombre_usuario !== undefined && nombre_usuario !== '') {
            fieldsToUpdate.push('nombre_usuario = ?');
            updateParams.push(nombre_usuario);
        }
        if (contrasena !== undefined && contrasena !== '') {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(contrasena, salt);
            fieldsToUpdate.push('contrasena = ?');
            updateParams.push(hashedPassword);
        }
        if (primer_nombre !== undefined && primer_nombre !== '') {
            fieldsToUpdate.push('primer_nombre = ?');
            updateParams.push(primer_nombre);
        }
        if (apellido_paterno !== undefined && apellido_paterno !== '') {
            fieldsToUpdate.push('apellido_paterno = ?');
            updateParams.push(apellido_paterno);
        }
        // Campos que pueden ser NULL en la DB si están vacíos o no se envían
        if (apellido_materno !== undefined) {
            fieldsToUpdate.push('apellido_materno = ?');
            updateParams.push(apellido_materno === '' ? null : apellido_materno);
        }
        if (email !== undefined && email !== '') { // Email es UNI y NO NULL, así que validar como requerido
            fieldsToUpdate.push('email = ?');
            updateParams.push(email);
        }
        if (telefono !== undefined) {
            fieldsToUpdate.push('telefono = ?');
            updateParams.push(telefono === '' ? null : telefono);
        }
        if (tipo_documento !== undefined) {
            fieldsToUpdate.push('tipo_documento = ?');
            updateParams.push(tipo_documento === '' ? null : tipo_documento);
        }
        if (numero_documento !== undefined) {
            fieldsToUpdate.push('numero_documento = ?');
            updateParams.push(numero_documento === '' ? null : numero_documento);
        }

        // Solo un administrador puede cambiar el rol de un usuario
        if (req.user.rol === 'Administrador' && rol !== undefined && rol !== '') {
            fieldsToUpdate.push('rol = ?');
            updateParams.push(rol);
        } else if (rol !== undefined && rol !== '' && req.user.rol !== 'Administrador') {
            return res.status(403).json({ error: 'No tiene permisos para cambiar el rol de un usuario.' });
        }

        if (fieldsToUpdate.length === 0) {
            return res.status(400).json({ error: 'No hay datos para actualizar.' });
        }

        // Añadir fecha_actualizacion automáticamente
        fieldsToUpdate.push('fecha_actualizacion = CURRENT_TIMESTAMP()'); // Tu DB ya maneja esto con ON UPDATE
        // updateParams.push(new Date()); // No es necesario si la columna tiene ON UPDATE CURRENT_TIMESTAMP()

        updateQuery += fieldsToUpdate.join(', ') + ' WHERE id_usuario = ?';
        updateParams.push(userId);

        const [result] = await pool.execute(updateQuery, updateParams);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado o no se realizaron cambios.' });
        }

        // Obtener el usuario actualizado para devolverlo en la respuesta
        const [updatedUserRows] = await pool.execute(
            'SELECT id_usuario, nombre_usuario, rol, primer_nombre, apellido_paterno, apellido_materno, email, telefono, tipo_documento, numero_documento, fecha_creacion, fecha_actualizacion FROM usuarios WHERE id_usuario = ?',
            [userId]
        );

        res.status(200).json({ mensaje: 'Usuario actualizado exitosamente', usuario: updatedUserRows[0] });

    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor al actualizar el usuario.' });
    }
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});