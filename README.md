# MinGO API

Esta API hará la conexión con la base de datos relacional de PostgreSQL para el manejo y registro de datos.

## Instalación

### Prerequisitos

- Instalar Docker
- Descargar la imagen de [PostgreSQL](https://hub.docker.com/_/postgres) para Docker.
- Generar el contenedor de PostgreSQL.

### Inicialización

1. El [archivo de inicialización de la base de datos](db/init.sql) tiene la información necesaria para generar las tablas de la base de datos. Dentro de esta se encuentran también datos de prueba que pueden modificarse. Ejecutar el _script_ en el contenedor para iniciar la tabla de la API.

## Ejecución

1. Descargar las dependencias necesarias:

```sh
npm install
```

2. Ejecutar el archivo [_index_](src/index.ts):

```sh
npm start
```

Debería visualizarse una ejecución similar:

```sh
$ npm start

> mingo_api@1.0.0 start
> ts-node src/index.ts

Servidor corriendo en http://localhost:3000
```

## Rutas

Las rutas existentes están ubicadas en el [archivo de rutas](src/routes/user.routes.ts), las cuales son:

### Users

> /users

#### POST

/
: Crear Usuario

/login
: Comprobar el ingreso de Usuario

#### GET

/all
: Obtener toda la información de todos los usuarios (develop)
