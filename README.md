# Roadmapp
Roadmapp is a webapp that allows you to record and query in a simple way the latest updates of your tasks and projects. It is thought for all those who work on more than a project at the same time and prefer to centralize the progress record

## Architecture/Arquitectura
The app is formed by a React front end, a Springboot backend and an SQLite databse

The **front end** incorporates
* Tailwind for page desing
* Flux pattern for state management

The **back end** is formed by
* RESTful architecture style
* Maven
* Hibernate
* Singleton and Builder pattern

## How do I run the app on my machine?

### Step 1: Executing the backend

1. Once we have cloned the repo, we open a terminal standing on the project folder
2. cd api
3. mvn spring-boot:run
4. Ready!

### Step 2: Executing the front end
1. We open our terminal standing on the proyect directory
2. cd ui
3. npm start
4. Ready!

If you enter to http://localhost:8751, you will be able to use the app
