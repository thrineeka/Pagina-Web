// src/types/index.ts

export interface User {
    id: number;
    nombre: string;
    apellidos: string;
    documento_identidad: string;
    telefono: string;
    correo: string;
    rol: 'admin' | 'usuario'; // Asegúrate de que los roles coincidan con tu backend
}

export interface Doctor {
    id: number;
    nombre: string;
    apellidos: string;
    especialidad: string;
    usuario_id?: number; // Opcional, si un doctor también es un usuario en tu sistema
}

export interface Appointment {
    id: number;
    usuario_id: number;
    doctor_id: number;
    doctor_nombre: string; // Asume que el backend envía el nombre del doctor
    fecha_cita: string; // Formato ISO 8601 (ej. "2025-06-15T00:00:00.000Z")
    hora_cita: string; // Formato "HH:MM"
    estado: 'pendiente' | 'confirmada' | 'cancelada' | string;
    notas: string | null;
}

export interface DoctorSchedule {
    id: number;
    doctor_id: number;
    doctor_nombre: string; // Asume que el backend envía el nombre del doctor
    dia_semana: string; // Ej. "Lunes", "Martes"
    hora_inicio: string; // Formato "HH:MM"
    hora_fin: string;   // Formato "HH:MM"
    disponible: boolean;
}

// Tipos para el JWT Decodificado
export interface DecodedToken {
    userId: number;
    userEmail: string;
    userRole: 'admin' | 'usuario';
    userName?: string; // Nombre del usuario, si lo incluyes en el token
    iat: number;
    exp: number;
}