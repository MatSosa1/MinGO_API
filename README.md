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

{
  user_id,
  user_name,
  user_password,
  user_birth_date,
  user_knowledge_level,
  role_id
}

#### POST

/
: Crear Usuario

/login
: Comprobar el ingreso de Usuario

#### GET

/all
: Obtener toda la información de todos los usuarios (develop)

### Signs

> /signs

{
  sign_id,
  sign_title,
  sign_video_url,
  sign_image_url,
  sign_section,
  tag_id
}

#### POST

/
: Crear una seña nueva

#### GET

/
: Obtener todas las señas

/?section=:section
: Obtiene todas las señas de cierta sección (Principiante, Intermedio, Avanzado, Frases Comunes)

/:id
: Obtener la seña de id especificada

### Synonyms

> /signs/:signId/synonyms

{
  synonym_id,
  synonym_word,
  sign_id
}

#### POST

/
: Crea un nuevo sinónimo para la seña de id especificada

#### GET

/
: Obtener todos los sinónimos de todas las señas.

/:id
: Obtiene todas los sinónimos de la seña de id especificada.

### Tags

> /tags

#### POST

/
: Crea una nueva etiqueta

#### GET

/
: Obtener todas las etiquetas
