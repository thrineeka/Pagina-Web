// C:\xampp\htdocs\romina\Pagina-Web\Bakent\bd.js

require('dotenv').config(); 
const mysql = require('mysql2'); // Importa el módulo mysql2

const dbConfig = {
    host: process.env.DB_HOST || 'localhost', 
    user: process.env.DB_USER || 'root',    
    database: process.env.DB_NAME || 'ceinco' 
};


const pool = mysql.createPool(dbConfig);

// Intenta obtener una conexión del pool para verificar que la configuración es correcta
pool.getConnection((err, connection) => {
    if (err) {
        console.error('--- ERROR CRÍTICO DE CONEXIÓN A LA BASE DE DATOS ---');
        console.error('Por favor, verifica que tu servidor MySQL esté corriendo y que');
        console.error('las credenciales en tu archivo .env sean correctas.');
        console.error('Detalles del error:', err.message);
        // Aquí podrías decidir si el servidor debe salir o intentar reconectar
    } else {
        console.log('--- Conexión a la base de datos MySQL establecida correctamente. ---');
        console.log('ID de conexión:', connection.threadId);
        connection.release(); // Libera la conexión de vuelta al pool
    }
});


module.exports = pool.promise();