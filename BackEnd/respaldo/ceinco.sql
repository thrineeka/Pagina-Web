-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-06-2025 a las 05:27:03
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ceinco`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialistas`
--

CREATE TABLE `especialistas` (
  `id_especialista` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `especialidad` varchar(100) NOT NULL,
  `numero_licencia_medica` varchar(50) DEFAULT NULL,
  `direccion_clinica` varchar(255) DEFAULT NULL,
  `biografia` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `informe_sistema`
--

CREATE TABLE `informe_sistema` (
  `id_informe` int(11) NOT NULL,
  `generado_por_id_usuario` int(11) NOT NULL,
  `tipo_informe` varchar(100) NOT NULL,
  `fecha_generacion` datetime DEFAULT current_timestamp(),
  `parametros_usados` text DEFAULT NULL,
  `ruta_salida_informe` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id_paciente` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `genero` enum('Masculino','Femenino','Otro') DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_medicos`
--

CREATE TABLE `registro_medicos` (
  `id_registro` int(11) NOT NULL,
  `id_paciente` int(11) NOT NULL,
  `id_especialista` int(11) DEFAULT NULL,
  `fecha_registro` datetime NOT NULL DEFAULT current_timestamp(),
  `tipo_registro` enum('Consulta','Receta','Resultado de Examen','Otro') NOT NULL,
  `diagnostico` text DEFAULT NULL,
  `tratamiento` text DEFAULT NULL,
  `detalles_receta` text DEFAULT NULL,
  `resultados_examen` text DEFAULT NULL,
  `ruta_documento` varchar(255) DEFAULT NULL,
  `notas` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `contrasena_hash` varchar(255) NOT NULL,
  `rol` enum('Administrador','Especialista','Paciente') NOT NULL,
  `primer_nombre` varchar(100) NOT NULL,
  `apellido_paterno` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `apellido_materno` varchar(100) DEFAULT NULL,
  `tipo_documento` enum('DNI','Pasaporte','Carnet de Extranjería','Otro') DEFAULT NULL,
  `numero_documento` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre_usuario`, `contrasena_hash`, `rol`, `primer_nombre`, `apellido_paterno`, `email`, `telefono`, `fecha_creacion`, `fecha_actualizacion`, `apellido_materno`, `tipo_documento`, `numero_documento`) VALUES
(1, 'admin', 'romina', 'Administrador', 'Ana', 'Martínez', 'ana.martinez@clinic.com', '987654321', '2025-06-07 20:01:03', '2025-06-07 20:01:03', 'García', 'DNI', '12345678'),
(2, 'kat', 'romina', 'Paciente', 'Carlos', 'Paz', 'carlos.paz@mail.com', '912345678', '2025-06-07 20:02:53', '2025-06-07 20:02:53', 'Soto', 'DNI', '87654321');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `especialistas`
--
ALTER TABLE `especialistas`
  ADD PRIMARY KEY (`id_especialista`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`),
  ADD UNIQUE KEY `numero_licencia_medica` (`numero_licencia_medica`);

--
-- Indices de la tabla `informe_sistema`
--
ALTER TABLE `informe_sistema`
  ADD PRIMARY KEY (`id_informe`),
  ADD KEY `generado_por_id_usuario` (`generado_por_id_usuario`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id_paciente`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `registro_medicos`
--
ALTER TABLE `registro_medicos`
  ADD PRIMARY KEY (`id_registro`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_especialista` (`id_especialista`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`),
  ADD UNIQUE KEY `correo_electronico` (`email`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `especialistas`
--
ALTER TABLE `especialistas`
  MODIFY `id_especialista` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `informe_sistema`
--
ALTER TABLE `informe_sistema`
  MODIFY `id_informe` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id_paciente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `registro_medicos`
--
ALTER TABLE `registro_medicos`
  MODIFY `id_registro` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `especialistas`
--
ALTER TABLE `especialistas`
  ADD CONSTRAINT `especialistas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `informe_sistema`
--
ALTER TABLE `informe_sistema`
  ADD CONSTRAINT `informe_sistema_ibfk_1` FOREIGN KEY (`generado_por_id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD CONSTRAINT `pacientes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `registro_medicos`
--
ALTER TABLE `registro_medicos`
  ADD CONSTRAINT `registro_medicos_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_paciente`),
  ADD CONSTRAINT `registro_medicos_ibfk_2` FOREIGN KEY (`id_especialista`) REFERENCES `especialistas` (`id_especialista`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
