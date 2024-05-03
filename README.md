# Roadmapp
Roadmapp es una aplicación web que te permite registrar y consultar de forma rápida el avance de tus proyectos y tareas.
Pensada para aquellas personas que trabajan en más de un proyecto a la vez y que prefieren tener centralizado el registro de avances.

## Arquitectura
La aplicación está compuesta por un front end desarrollado con React, un back end desarrollado con Springboot y una base de datos SQLite

El **front end** incorpora:
* Tailwind para el diseño de pantallas
* Patron Flux para el manejo de estados (implementado con Redux + Redux Thunk)

El **back end** esta conformado por:
* Estilo de arquitectura REST
* Maven
* Hibernate
* Patrones singleton y builder

## ¿Como correr la app en mi máquina?

### Paso 1: Corremos el back end

1. Una vez clonado el repositorio, abrimos una consola en la carpeta del proyecto
2. cd api
3. mvn spring-boot:run
4. Listo!

### Paso 2: Corremos el front end
1. Abrimos una consola en la carpeta del proyecto
2. cd ui
3. npm start
4. Listo!

Si nos dirigimos a http://localhost:8751, vamos a poder utilizar la app.
