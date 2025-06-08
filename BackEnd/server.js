// C:\xampp\htdocs\romina\Pagina-Web\Bakent\server.js

//const express = require('express');
//const cors = require('cors');
//const db = require('./bd');                           rutas de oroginales
//const { exec } = require('child_process');




 //rutas de prueba 
const express = require('express');
const cors = require('cors');
const db = require('./bd');                     
const bcrypt = require('bcryptjs');            
const { exec } = require('child_process');
const path = require('path'); 
const fs = require('fs');






const app = express();
const PORT = process.env.PORT || 9000; // Puerto del servidor backend. ¡Asegúrate que tu frontend apunte a este!

// Middlewares
app.use(cors()); // Habilita CORS para permitir peticiones desde el frontend
app.use(express.json()); // Habilita el parseo de cuerpos de petición JSON

// --- RUTAS DE LA API ---

// Ruta de prueba general del servidor
app.get('/', (req, res) => {
    res.send('¡API de la Clínica funcionando!');
});

// =====================================
// RUTAS PARA USUARIOS
// =====================================

// GET: Obtener todos los usuarios (sin contraseñas)
// Ruta: /api/usuarios
app.get('/api/usuarios', async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT id_usuario, nombre_usuario, rol, primer_nombre, apellido_paterno, apellido_materno, telefono, tipo_documento, numero_documento, email, genero FROM Usuarios'
        );
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error al obtener usuarios:', err);
        res.status(500).json({ error: 'Error interno del servidor al obtener usuarios.' });
    }
});

// GET: Obtener un usuario por ID
// Ruta: /api/usuarios/:id
app.get('/api/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute(
            'SELECT id_usuario, nombre_usuario, rol, primer_nombre, apellido_paterno, apellido_materno, telefono, tipo_documento, numero_documento, email, genero FROM Usuarios WHERE id_usuario = ?',
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        console.error('Error al obtener usuario por ID:', err);
        res.status(500).json({ error: 'Error interno del servidor al obtener el usuario.' });
    }
});

// POST: Insertar un nuevo usuario
// Ruta: /api/usuarios
app.post('/api/usuarios', async (req, res) => {
    const { nombre_usuario, contrasena, rol, primer_nombre, apellido_paterno, apellido_materno, telefono, tipo_documento, numero_documento, email, genero } = req.body;

    if (!nombre_usuario || !contrasena || !rol || !primer_nombre || !apellido_paterno) {
        return res.status(400).json({ error: 'Faltan campos obligatorios para el registro.' });
    }

    try {
        // const salt = await bcrypt.genSalt(10); // Elimina esta línea
        // const contrasena_hash = await bcrypt.hash(contrasena, salt); // Elimina esta línea
        const contrasena_texto_plano = contrasena; // **NUEVO: Almacena la contraseña directamente**

        const sql = `
            INSERT INTO Usuarios (
                nombre_usuario, contrasena_hash, rol, primer_nombre, apellido_paterno,
                apellido_materno, telefono, tipo_documento, numero_documento, email, genero
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            nombre_usuario, contrasena_texto_plano, rol, primer_nombre, apellido_paterno, // Usa contrasena_texto_plano aquí
            apellido_materno, telefono, tipo_documento, numero_documento, email, genero
        ];

        const [result] = await db.execute(sql, values);
        res.status(201).json({ message: 'Usuario creado exitosamente', id_nuevo_usuario: result.insertId });

    } catch (err) {
        console.error('Error al insertar usuario:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'El nombre de usuario o correo electrónico ya existe.' });
        }
        res.status(500).json({ error: 'Error interno del servidor al insertar el usuario.' });
    }
});

// PUT: Actualizar un usuario existente (por ID)
// Ruta: /api/usuarios/:id
app.put('/api/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre_usuario, rol, primer_nombre, apellido_paterno, apellido_materno, telefono, tipo_documento, numero_documento, email, genero } = req.body;

    // Puedes añadir validaciones de campos obligatorios si son necesarios para la actualización
    if (!nombre_usuario || !rol || !primer_nombre || !apellido_paterno) {
        return res.status(400).json({ error: 'Faltan campos obligatorios para la actualización del usuario.' });
    }

    try {
        // No actualizamos la contraseña aquí por seguridad. Tendría una ruta separada o un campo específico
        const sql = `
            UPDATE Usuarios SET
                nombre_usuario = ?,
                rol = ?,
                primer_nombre = ?,
                apellido_paterno = ?,
                apellido_materno = ?,
                telefono = ?,
                tipo_documento = ?,
                numero_documento = ?,
                email = ?,
                genero = ?
            WHERE id_usuario = ?
        `;
        const values = [
            nombre_usuario, rol, primer_nombre, apellido_paterno, apellido_materno,
            telefono, tipo_documento, numero_documento, email, genero, id
        ];

        const [result] = await db.execute(sql, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado para actualizar.' });
        }
        res.status(200).json({ message: 'Usuario actualizado exitosamente.' });

    } catch (err) {
        console.error('Error al actualizar usuario:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'El nombre de usuario o correo electrónico ya existe.' });
        }
        res.status(500).json({ error: 'Error interno del servidor al actualizar el usuario.' });
    }
});

// DELETE: Eliminar un usuario (por ID)
// Ruta: /api/usuarios/:id
app.delete('/api/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.execute('DELETE FROM Usuarios WHERE id_usuario = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado para eliminar.' });
        }
        res.status(200).json({ message: 'Usuario eliminado exitosamente.' });
    } catch (err) {
        console.error('Error al eliminar usuario:', err);
        res.status(500).json({ error: 'Error interno del servidor al eliminar el usuario.' });
    }
});

// =====================================
// RUTA PARA LOGIN
// =====================================
// POST: Iniciar sesión
// Ruta: /api/login
app.post('/api/login', async (req, res) => {
    const { nombre_usuario, contrasena } = req.body; // 'contrasena' es la que ingresa el usuario

    if (!nombre_usuario || !contrasena) {
        return res.status(400).json({ error: 'Usuario y contraseña son requeridos.' });
    }

    try {
        // Cambia la columna seleccionada de 'contrasena_hash' a la columna real donde guardas la contraseña
        // En tu caso actual, es 'contrasena_hash', pero su contenido será texto plano.
        const [rows] = await db.execute(
            'SELECT id_usuario, nombre_usuario, contrasena_hash, rol, primer_nombre FROM Usuarios WHERE nombre_usuario = ?',
            [nombre_usuario]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        const user = rows[0];
        // const isMatch = await bcrypt.compare(contrasena, user.contrasena_hash); // Elimina esta línea
        const isMatch = (contrasena === user.contrasena_hash); // **NUEVO: Comparación directa**

        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        // Login exitoso
        res.status(200).json({
            message: 'Inicio de sesión exitoso.',
            user: {
                id_usuario: user.id_usuario,
                nombre_usuario: user.nombre_usuario,
                rol: user.rol,
                primer_nombre: user.primer_nombre
            }
        });

    } catch (err) {
        console.error('Error durante el inicio de sesión:', err);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

// =====================================
// RUTAS PARA CITAS
// =====================================

// GET: Obtener todas las citas
// Ruta: /api/citas
app.get('/api/citas', async (req, res) => {
    try {
        // Asegúrate de que los nombres de las columnas coincidan con tu tabla 'Citas'
        const [rows] = await db.execute('SELECT * FROM Citas');
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error al obtener citas:', err);
        res.status(500).json({ error: 'Error interno del servidor al obtener citas.' });
    }
});

// GET: Obtener una cita por ID
// Ruta: /api/citas/:id
app.get('/api/citas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM Citas WHERE id_cita = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Cita no encontrada.' });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        console.error('Error al obtener cita por ID:', err);
        res.status(500).json({ error: 'Error interno del servidor al obtener la cita.' });
    }
});

// POST: Crear una nueva cita
// Ruta: /api/citas
app.post('/api/citas', async (req, res) => {
    // Asegúrate de que los nombres de los campos coincidan con los de tu frontend y tu tabla 'Citas'
    const { id_paciente, id_especialista, fecha_cita, hora_cita, estado_cita, tipo_consulta } = req.body;

    if (!id_paciente || !id_especialista || !fecha_cita || !hora_cita || !tipo_consulta) {
        return res.status(400).json({ error: 'Faltan campos obligatorios para la creación de la cita.' });
    }

    try {
        const sql = `
            INSERT INTO Citas (id_paciente, id_especialista, fecha_cita, hora_cita, estado_cita, tipo_consulta)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [id_paciente, id_especialista, fecha_cita, hora_cita, estado_cita || 'Pendiente', tipo_consulta]; // 'Pendiente' como estado por defecto

        const [result] = await db.execute(sql, values);
        res.status(201).json({ message: 'Cita creada exitosamente', id_nueva_cita: result.insertId });
    } catch (err) {
        console.error('Error al crear cita:', err);
        res.status(500).json({ error: 'Error interno del servidor al crear la cita.' });
    }
});

// PUT: Actualizar una cita existente
// Ruta: /api/citas/:id
app.put('/api/citas/:id', async (req, res) => {
    const { id } = req.params;
    const { id_paciente, id_especialista, fecha_cita, hora_cita, estado_cita, tipo_consulta } = req.body;

    if (!id_paciente || !id_especialista || !fecha_cita || !hora_cita || !estado_cita || !tipo_consulta) {
        return res.status(400).json({ error: 'Faltan campos obligatorios para la actualización de la cita.' });
    }

    try {
        const sql = `
            UPDATE Citas SET
                id_paciente = ?,
                id_especialista = ?,
                fecha_cita = ?,
                hora_cita = ?,
                estado_cita = ?,
                tipo_consulta = ?
            WHERE id_cita = ?
        `;
        const values = [id_paciente, id_especialista, fecha_cita, hora_cita, estado_cita, tipo_consulta, id];

        const [result] = await db.execute(sql, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cita no encontrada para actualizar.' });
        }
        res.status(200).json({ message: 'Cita actualizada exitosamente.' });
    } catch (err) {
        console.error('Error al actualizar cita:', err);
        res.status(500).json({ error: 'Error interno del servidor al actualizar la cita.' });
    }
});

// DELETE: Eliminar una cita
// Ruta: /api/citas/:id
app.delete('/api/citas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.execute('DELETE FROM Citas WHERE id_cita = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cita no encontrada para eliminar.' });
        }
        res.status(200).json({ message: 'Cita eliminada exitosamente.' });
    } catch (err) {
        console.error('Error al eliminar cita:', err);
        res.status(500).json({ error: 'Error interno del servidor al eliminar la cita.' });
    }
});


// =====================================
// RUTAS PARA ESPECIALISTAS (Estructura de ejemplo)
// =====================================

// GET: Obtener todos los especialistas
// Ruta: /api/especialistas
app.get('/api/especialistas', async (req, res) => {
    try {
        // Asume una tabla 'Especialistas' con campos como id_especialista, nombre, especialidad, etc.
        const [rows] = await db.execute('SELECT id_especialista, primer_nombre, apellido_paterno, especialidad, telefono, email FROM Especialistas');
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error al obtener especialistas:', err);
        res.status(500).json({ error: 'Error interno del servidor al obtener especialistas.' });
    }
});

// GET: Obtener un especialista por ID
// Ruta: /api/especialistas/:id
app.get('/api/especialistas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute('SELECT id_especialista, primer_nombre, apellido_paterno, especialidad, telefono, email FROM Especialistas WHERE id_especialista = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Especialista no encontrado.' });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        console.error('Error al obtener especialista por ID:', err);
        res.status(500).json({ error: 'Error interno del servidor al obtener el especialista.' });
    }
});

// POST: Crear un nuevo especialista
// Ruta: /api/especialistas
app.post('/api/especialistas', async (req, res) => {
    // Aquí irían los campos para crear un especialista
    const { primer_nombre, apellido_paterno, especialidad, telefono, email } = req.body;

    if (!primer_nombre || !apellido_paterno || !especialidad) {
        return res.status(400).json({ error: 'Faltan campos obligatorios para crear el especialista.' });
    }

    try {
        const sql = `
            INSERT INTO Especialistas (primer_nombre, apellido_paterno, especialidad, telefono, email)
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [primer_nombre, apellido_paterno, especialidad, telefono, email];

        const [result] = await db.execute(sql, values);
        res.status(201).json({ message: 'Especialista creado exitosamente', id_nuevo_especialista: result.insertId });
    } catch (err) {
        console.error('Error al crear especialista:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'El email o algún otro campo único ya existe.' });
        }
        res.status(500).json({ error: 'Error interno del servidor al crear el especialista.' });
    }
});

// PUT: Actualizar un especialista
// Ruta: /api/especialistas/:id
app.put('/api/especialistas/:id', async (req, res) => {
    const { id } = req.params;
    const { primer_nombre, apellido_paterno, especialidad, telefono, email } = req.body;

    if (!primer_nombre || !apellido_paterno || !especialidad) {
        return res.status(400).json({ error: 'Faltan campos obligatorios para actualizar el especialista.' });
    }

    try {
        const sql = `
            UPDATE Especialistas SET
                primer_nombre = ?,
                apellido_paterno = ?,
                especialidad = ?,
                telefono = ?,
                email = ?
            WHERE id_especialista = ?
        `;
        const values = [primer_nombre, apellido_paterno, especialidad, telefono, email, id];

        const [result] = await db.execute(sql, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Especialista no encontrado para actualizar.' });
        }
        res.status(200).json({ message: 'Especialista actualizado exitosamente.' });
    } catch (err) {
        console.error('Error al actualizar especialista:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'El email o algún otro campo único ya existe.' });
        }
        res.status(500).json({ error: 'Error interno del servidor al actualizar el especialista.' });
    }
});

// DELETE: Eliminar un especialista
// Ruta: /api/especialistas/:id
app.delete('/api/especialistas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.execute('DELETE FROM Especialistas WHERE id_especialista = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Especialista no encontrado para eliminar.' });
        }
        res.status(200).json({ message: 'Especialista eliminado exitosamente.' });
    } catch (err) {
        console.error('Error al eliminar especialista:', err);
        res.status(500).json({ error: 'Error interno del servidor al eliminar el especialista.' });
    }
});


// Inicia el servidor de Express
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
    console.log(`--- Rutas de API disponibles ---`);
    console.log(`Usuarios:`);
    console.log(`  GET /api/usuarios - Obtener todos`);
    console.log(`  GET /api/usuarios/:id - Obtener por ID`);
    console.log(`  POST /api/usuarios - Crear nuevo`);
    console.log(`  PUT /api/usuarios/:id - Actualizar`);
    console.log(`  DELETE /api/usuarios/:id - Eliminar`);
    console.log(`Login:`);
    console.log(`  POST /api/login - Iniciar sesión`);
    console.log(`Citas:`);
    console.log(`  GET /api/citas - Obtener todas`);
    console.log(`  GET /api/citas/:id - Obtener por ID`);
    console.log(`  POST /api/citas - Crear nueva`);
    console.log(`  PUT /api/citas/:id - Actualizar`);
    console.log(`  DELETE /api/citas/:id - Eliminar`);
    console.log(`Especialistas:`);
    console.log(`  GET /api/especialistas - Obtener todos`);
    console.log(`  GET /api/especialistas/:id - Obtener por ID`);
    console.log(`  POST /api/especialistas - Crear nuevo`);
    console.log(`  PUT /api/especialistas/:id - Actualizar`);
    console.log(`  DELETE /api/especialistas/:id - Eliminar`);
});
















// =====================================
// RUTA PARA RESPALDO DE BASE DE DATOS
// =====================================
app.post('/api/backup-database', (req, res) => {
    const host_backup = "localhost";
    const user_backup = "root";
    const pass_backup = ""; // Vacío si no tienes contraseña
    const db_backup = "clinica"; // <-- ASEGÚRATE QUE ESTE ES EL NOMBRE CORRECTO DE TU BASE DE DATOS

    // Ruta completa a mysqldump en XAMPP
    const mysqldumpPath = "C:\\xampp\\mysql\\bin\\mysqldump";

    // Ruta donde se guardará el archivo de respaldo
    // C:\xampp\htdocs\romina\Pagina-Web\BackEnd\respaldo
    // Usamos `path.join` para asegurar que las barras se manejen correctamente en diferentes OS
    const path = require('path'); // Necesitarás importar el módulo 'path'
    const backupDir = path.join(__dirname, 'respaldo'); // `__dirname` es la carpeta actual del server.js
    const backupFileName = `clinica_backup_${new Date().toISOString().replace(/:/g, '-')}.sql`;
    const backupFile = path.join(backupDir, backupFileName);

    // Comando para mysqldump
    let command = `"<span class="math-inline">\{mysqldumpPath\}" \-h "</span>{host_backup}" -u "${user_backup}"`;
    if (pass_backup) { // Solo añadir la contraseña si no está vacía
        command += ` -p"${pass_backup}"`; // -p seguido DIRECTAMENTE de la contraseña
    }
    command += ` "<span class="math-inline">\{db\_backup\}" \> "</span>{backupFile}"`;

    // Para manejar posibles errores de escritura y asegurar que el directorio exista
    const fs = require('fs'); // Necesitarás importar el módulo 'fs'
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
    }

    console.log(`Ejecutando comando de respaldo: ${command}`);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al generar el respaldo: ${error.message}`);
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({
                success: false,
                message: 'Error al generar el respaldo de la base de datos.',
                error: error.message,
                details: stderr
            });
        }
        if (stderr) { // mysqldump a veces envía advertencias a stderr sin ser un error fatal
            console.warn(`Advertencias durante el respaldo: ${stderr}`);
        }

        console.log(`Respaldo exitoso: ${backupFile}`);
        res.status(200).json({
            success: true,
            message: 'Respaldo de la base de datos generado exitosamente.',
            filePath: backupFile
        });
    });
});


// Inicia el servidor de Express
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
    console.log(`--- Rutas de API disponibles ---`);
    // ... (tus rutas de consola existentes)
    console.log(`Respaldo:`);
    console.log(`   POST /api/backup-database - Generar respaldo de la base de datos`);
});