# Instrucciones para ejecutar el programa

Este README proporciona las instrucciones necesarias para ejecutar el programa correctamente. Asegúrese de seguir los pasos a continuación:

## Requisitos previos

Antes de ejecutar el programa, asegúrese de tener instalado lo siguiente:

- Node.js
- PostgreSQL

## Pasos para instalar la base de datos de Prisma

1. Asegúrese de tener PostgreSQL instalado en su máquina local.
2. Cree una nueva base de datos en PostgreSQL para su proyecto de Prisma.
3. Abra una terminal y navegue hasta el directorio raíz de su proyecto.
4. Ejecute el siguiente comando para instalar las dependencias de Prisma:
   ```
   npm install @prisma/cli
   ```
5. Ejecute el siguiente comando para inicializar Prisma en su proyecto:
   ```
   npx prisma init
   ```
6. Ejecute el siguiente comando para migrar el modelo de Prisma a la base de datos PostgreSQL:
   ```
   npx prisma migrate dev
   ```
7. ¡Ahora está listo para utilizar Prisma con su base de datos PostgreSQL!

Recuerde que estos pasos son adicionales a los mencionados anteriormente.

## Pasos para ejecutar el programa

1. Clonar el repositorio en su máquina local.
2. Navegar hasta el directorio raíz del proyecto.
3. Ejecutar el siguiente comando para instalar las dependencias del proyecto:
   ```
   npm install
   ```
4. Configurar la conexión a la base de datos PostgreSQL en el archivo `.env`.

5. Ejecutar el siguiente comando para iniciar el programa:
   ```
   npm start
   ```

## Tecnologías utilizadas

El programa utiliza las siguientes tecnologías:

- Node.js: un entorno de ejecución de JavaScript basado en el motor V8 de Google Chrome.
- PostgreSQL: un sistema de gestión de bases de datos relacional de código abierto.

¡Una vez que haya seguido estos pasos, el programa debería ejecutarse correctamente en su máquina local!
